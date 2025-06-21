
// 1. Mostrar un listado de los productos más vendidos (suma total de unidades vendidas por producto)
const productosMasVendidos = db.ventas.aggregate([
  // Desenrollar el array de productos
  { $unwind: "$productos" },
  // Agrupar por producto y sumar cantidades
  {
    $group: {
      _id: "$productos.productoId",
      totalVendido: { $sum: "$productos.cantidad" },
      numeroVentas: { $sum: 1 }
    }
  },
  // Hacer lookup para obtener información del producto
  {
    $lookup: {
      from: "productos",
      localField: "_id",
      foreignField: "_id",
      as: "infoProducto"
    }
  },
  // Desenrollar la información del producto
  { $unwind: "$infoProducto" },
  // Proyectar campos útiles
  {
    $project: {
      _id: 1,
      nombre: "$infoProducto.nombre",
      categoria: "$infoProducto.categoria",
      precio: "$infoProducto.precio",
      totalVendido: 1,
      numeroVentas: 1,
      ingresoTotal: { $multiply: ["$totalVendido", "$infoProducto.precio"] }
    }
  },
  // Ordenar por total vendido descendente
  { $sort: { totalVendido: -1 } }
]).toArray();

productosMasVendidos.forEach((producto, index) => {
  print(`${index + 1}. ${producto.nombre} (${producto.categoria})`);
  print(`   Unidades vendidas: ${producto.totalVendido}`);
  print(`   Número de ventas: ${producto.numeroVentas}`);
  print(`   Ingreso total: $${producto.ingresoTotal}`);
});

// 2. Agrupar clientes por cantidad de compras realizadas
const clientesPorCompras = db.clientes.aggregate([
  // Proyectar cliente y cantidad de compras
  {
    $project: {
      nombre: 1,
      email: 1,
      cantidadCompras: { $size: "$compras" }
    }
  },
  // Agrupar por cantidad de compras
  {
    $group: {
      _id: "$cantidadCompras",
      clientes: {
        $push: {
          nombre: "$nombre",
          email: "$email"
        }
      },
      totalClientes: { $sum: 1 }
    }
  },
  // Ordenar por cantidad de compras
  { $sort: { _id: 1 } }
]).toArray();

clientesPorCompras.forEach(grupo => {
  print(`Clientes con ${grupo._id} compras (Total: ${grupo.totalClientes}):`);
  grupo.clientes.forEach(cliente => {
    print(`  - ${cliente.nombre} (${cliente.email})`);
  });
});

// 3. Mostrar el total de ventas por mes (usar $group y $month)
const ventasPorMes = db.ventas.aggregate([
  // Agrupar por mes
  {
    $group: {
      _id: { $month: "$fecha" },
      totalVentas: { $sum: "$total" },
      numeroTransacciones: { $sum: 1 },
      ventaPromedio: { $avg: "$total" }
    }
  },
  // Agregar nombre del mes
  {
    $project: {
      mes: {
        $switch: {
          branches: [
            { case: { $eq: ["$_id", 1] }, then: "Enero" },
            { case: { $eq: ["$_id", 2] }, then: "Febrero" },
            { case: { $eq: ["$_id", 3] }, then: "Marzo" },
            { case: { $eq: ["$_id", 4] }, then: "Abril" },
            { case: { $eq: ["$_id", 5] }, then: "Mayo" },
            { case: { $eq: ["$_id", 6] }, then: "Junio" },
            { case: { $eq: ["$_id", 7] }, then: "Julio" },
            { case: { $eq: ["$_id", 8] }, then: "Agosto" },
            { case: { $eq: ["$_id", 9] }, then: "Septiembre" },
            { case: { $eq: ["$_id", 10] }, then: "Octubre" },
            { case: { $eq: ["$_id", 11] }, then: "Noviembre" },
            { case: { $eq: ["$_id", 12] }, then: "Diciembre" }
          ],
          default: "Desconocido"
        }
      },
      totalVentas: 1,
      numeroTransacciones: 1,
      ventaPromedio: { $round: ["$ventaPromedio", 2] }
    }
  },
  // Ordenar por mes
  { $sort: { _id: 1 } }
]).toArray();

ventasPorMes.forEach(mes => {
  print(`${mes.mes}:`);
  print(`  Total ventas: $${mes.totalVentas}`);
  print(`  Número de transacciones: ${mes.numeroTransacciones}`);
  print(`  Venta promedio: $${mes.ventaPromedio}`);
});

// 4. Calcular el promedio de precios por categoría de producto
const promedioPorCategoria = db.productos.aggregate([
  {
    $group: {
      _id: "$categoria",
      precioPromedio: { $avg: "$precio" },
      precioMinimo: { $min: "$precio" },
      precioMaximo: { $max: "$precio" },
      totalProductos: { $sum: 1 }
    }
  },
  {
    $project: {
      categoria: "$_id",
      precioPromedio: { $round: ["$precioPromedio", 2] },
      precioMinimo: 1,
      precioMaximo: 1,
      totalProductos: 1,
      _id: 0
    }
  },
  { $sort: { precioPromedio: -1 } }
]).toArray();

promedioPorCategoria.forEach(categoria => {
  print(`${categoria.categoria}:`);
  print(`  Precio promedio: $${categoria.precioPromedio}`);
  print(`  Rango: $${categoria.precioMinimo} - $${categoria.precioMaximo}`);
  print(`  Total productos: ${categoria.totalProductos}`);
});

// 5. Mostrar los 3 productos con mayor stock (orden descendente con $sort y $limit)
const top3Stock = db.productos.aggregate([
  {
    $project: {
      nombre: 1,
      categoria: 1,
      precio: 1,
      stock: 1,
      valorInventario: { $multiply: ["$precio", "$stock"] }
    }
  },
  { $sort: { stock: -1 } },
  { $limit: 3 }
]).toArray();

top3Stock.forEach((producto, index) => {
  print(`${index + 1}. ${producto.nombre}`);
  print(`   Categoría: ${producto.categoria}`);
  print(`   Stock: ${producto.stock} unidades`);
  print(`   Precio unitario: $${producto.precio}`);
  print(`   Valor total en inventario: $${producto.valorInventario}`);
});


// 6. Análisis de clientes por preferencias
const analisisPreferencias = db.clientes.aggregate([
  { $unwind: "$preferencias" },
  {
    $group: {
      _id: "$preferencias",
      clientes: { $push: "$nombre" },
      totalClientes: { $sum: 1 }
    }
  },
  { $sort: { totalClientes: -1 } }
]).toArray();

analisisPreferencias.forEach(pref => {
  print(`${pref._id}: ${pref.totalClientes} clientes`);
  print(`  Clientes: ${pref.clientes.join(", ")}`);
});

// 7. Productos por rango de precio
const productosPorRango = db.productos.aggregate([
  {
    $bucket: {
      groupBy: "$precio",
      boundaries: [0, 5000, 10000, 15000, 20000],
      default: "Más de $20000",
      output: {
        productos: { $push: "$nombre" },
        cantidad: { $sum: 1 },
        precioPromedio: { $avg: "$precio" }
      }
    }
  }
]).toArray();

productosPorRango.forEach(rango => {
  const rangoTexto = typeof rango._id === 'number' ? 
    `$${rango._id} - $${rango._id + 4999}` : rango._id;
  print(`${rangoTexto}:`);
  print(`  Cantidad: ${rango.cantidad} productos`);
  print(`  Precio promedio: $${Math.round(rango.precioPromedio)}`);
  print(`  Productos: ${rango.productos.join(", ")}`);
});

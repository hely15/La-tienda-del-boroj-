// system_functions.js - Funciones definidas en system.js

// 1. Definir una función calcularDescuento(precio, porcentaje) que devuelva el precio con descuento aplicado

db.system.js.save({
  _id: "calcularDescuento",
  value: function(precio, porcentaje) {
    // Validar parámetros
    if (typeof precio !== 'number' || typeof porcentaje !== 'number') {
      throw new Error("Los parámetros deben ser números");
    }
    if (precio < 0) {
      throw new Error("El precio no puede ser negativo");
    }
    if (porcentaje < 0 || porcentaje > 100) {
      throw new Error("El porcentaje debe estar entre 0 y 100");
    }
    
    // Calcular descuento
    const descuento = precio * (porcentaje / 100);
    const precioFinal = precio - descuento;
    
    return {
      precioOriginal: precio,
      porcentajeDescuento: porcentaje,
      montoDescuento: Math.round(descuento),
      precioFinal: Math.round(precioFinal)
    };
  }
});


// 2. Definir una función clienteActivo(idCliente) que devuelva true si el cliente tiene más de 3 compras
db.system.js.save({
  _id: "clienteActivo",
  value: function(idCliente) {
    // Validar parámetro
    if (typeof idCliente !== 'number') {
      throw new Error("El ID del cliente debe ser un número");
    }
    
    // Buscar cliente
    const cliente = db.clientes.findOne({ _id: idCliente });
    
    if (!cliente) {
      return {
        existe: false,
        activo: false,
        mensaje: "Cliente no encontrado"
      };
    }
    
    // Verificar si tiene más de 3 compras
    const totalCompras = cliente.compras ? cliente.compras.length : 0;
    const esActivo = totalCompras > 3;
    
    return {
      existe: true,
      clienteId: idCliente,
      nombre: cliente.nombre,
      totalCompras: totalCompras,
      activo: esActivo,
      mensaje: esActivo ? "Cliente activo" : "Cliente no activo (≤3 compras)"
    };
  }
});


// 3. Definir una función verificarStock(productoId, cantidadDeseada) que retorne si hay suficiente stock
db.system.js.save({
  _id: "verificarStock",
  value: function(productoId, cantidadDeseada) {
    // Validar parámetros
    if (typeof productoId !== 'number' || typeof cantidadDeseada !== 'number') {
      throw new Error("Los parámetros deben ser números");
    }
    if (cantidadDeseada <= 0) {
      throw new Error("La cantidad deseada debe ser mayor a 0");
    }
    
    // Buscar producto
    const producto = db.productos.findOne({ _id: productoId });
    
    if (!producto) {
      return {
        existe: false,
        disponible: false,
        mensaje: "Producto no encontrado"
      };
    }
    
    // Verificar stock
    const stockDisponible = producto.stock;
    const tieneStock = stockDisponible >= cantidadDeseada;
    
    return {
      existe: true,
      productoId: productoId,
      nombre: producto.nombre,
      stockDisponible: stockDisponible,
      cantidadDeseada: cantidadDeseada,
      disponible: tieneStock,
      faltante: tieneStock ? 0 : cantidadDeseada - stockDisponible,
      mensaje: tieneStock ? 
        "Stock suficiente" : 
        `Stock insuficiente. Faltan ${cantidadDeseada - stockDisponible} unidades`
    };
  }
});


// Probar función calcularDescuento
print("Pruebas de calcularDescuento:");
try {
  const descuento1 = calcularDescuento(10000, 15);
  print(`Descuento 15% sobre $10000:`);
  printjson(descuento1);
  
  const descuento2 = calcularDescuento(7000, 20);
  print(`Descuento 20% sobre $7000:`);
  printjson(descuento2);
  
  const descuento3 = calcularDescuento(5000, 0);
  print(`Sin descuento sobre $5000:`);
  printjson(descuento3);
  
} catch (error) {
  print("Error en calcularDescuento:", error.message);
}

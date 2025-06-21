

// 1. Buscar clientes que tengan "natural" en sus preferencias
const clientesNatural = db.clientes.find({
  "preferencias": "natural"
}).toArray();

if (clientesNatural.length > 0) {
  clientesNatural.forEach(cliente => {
    print(`- ID: ${cliente._id}, Nombre: ${cliente.nombre}`);
    print(`  Email: ${cliente.email}`);
    print(`  Preferencias: [${cliente.preferencias.join(", ")}]`);
    print(`  Total compras: ${cliente.compras.length}`);
  });
} else {
  print("No se encontraron clientes con preferencia 'natural'");
}

// 2. Encontrar productos que tengan al menos los tags "natural" y "orgánico" (usar $all)
const productosNaturalOrganico = db.productos.find({
  "tags": { $all: ["natural", "orgánico"] }
}).toArray();

if (productosNaturalOrganico.length > 0) {
  productosNaturalOrganico.forEach(producto => {
    print(`- ID: ${producto._id}, Nombre: ${producto.nombre}`);
    print(`  Categoría: ${producto.categoria}, Precio: $${producto.precio}`);
    print(`  Tags: [${producto.tags.join(", ")}]`);
    print(`  Stock: ${producto.stock} unidades`);
  });
} else {
  print("No se encontraron productos con ambos tags 'natural' y 'orgánico'");
}

// 3. Listar productos que tienen más de un tag (usar $size)
// Primero, veamos cuántos tags tiene cada producto
const todosProductos = db.productos.find({}).toArray();
print("Análisis de tags por producto:");
todosProductos.forEach(producto => {
  print(`- ${producto.nombre}: ${producto.tags.length} tags [${producto.tags.join(", ")}]`);
});

// Ahora buscar productos con más de un tag
const productosMultiplesTags = db.productos.find({
  "tags": { $exists: true },
  $expr: { $gt: [{ $size: "$tags" }, 1] }
}).toArray();

if (productosMultiplesTags.length > 0) {
  productosMultiplesTags.forEach(producto => {
    print(`- ID: ${producto._id}, Nombre: ${producto.nombre}`);
    print(`  Cantidad de tags: ${producto.tags.length}`);
    print(`  Tags: [${producto.tags.join(", ")}]`);
    print(`  Categoría: ${producto.categoria}`);
  });
} else {
  print("No se encontraron productos con más de un tag");
}


// 4. Clientes que tienen exactamente 2 compras
print("4. Clientes que tienen exactamente 2 compras (usando $size):");
const clientesDosCompras = db.clientes.find({
  "compras": { $size: 2 }
}).toArray();

clientesDosCompras.forEach(cliente => {
  print(`- ${cliente.nombre}: ${cliente.compras.length} compras [${cliente.compras.join(", ")}]`);
});

// 5. Productos que contengan cualquiera de estos tags: "dulce", "energético", "frío"
print("\n5. Productos con tags 'dulce' O 'energético' O 'frío' (usando $in):");
const productosTagsEspecificos = db.productos.find({
  "tags": { $in: ["dulce", "energético", "frío"] }
}).toArray();

productosTagsEspecificos.forEach(producto => {
  const tagsCoincidentes = producto.tags.filter(tag => ["dulce", "energético", "frío"].includes(tag));
  print(`- ${producto.nombre}: Tags coincidentes = [${tagsCoincidentes.join(", ")}]`);
});

// 6. Clientes que NO tengan la preferencia "dulce"
print("\n6. Clientes que NO tengan la preferencia 'dulce' (usando $nin):");
const clientesSinDulce = db.clientes.find({
  "preferencias": { $nin: ["dulce"] }
}).toArray();

clientesSinDulce.forEach(cliente => {
  print(`- ${cliente.nombre}: Preferencias = [${cliente.preferencias.join(", ")}]`);
});

// 7. Productos con arrays de tags vacíos o que no existen
print("\n7. Productos sin tags o con array vacío:");
const productosSinTags = db.productos.find({
  $or: [
    { "tags": { $exists: false } },
    { "tags": { $size: 0 } }
  ]
}).toArray();

if (productosSinTags.length > 0) {
  productosSinTags.forEach(producto => {
    print(`- ${producto.nombre}: Tags = ${producto.tags || "No existe"}`);
  });
} else {
  print("Todos los productos tienen tags");
}

// 8. Usar $elemMatch para buscar en arrays de objetos (ventas)
print("\n8. Ventas que incluyan el producto ID 2 con cantidad mayor a 1 (usando $elemMatch):");
const ventasProducto2 = db.ventas.find({
  "productos": {
    $elemMatch: {
      "productoId": 2,
      "cantidad": { $gt: 1 }
    }
  }
}).toArray();

ventasProducto2.forEach(venta => {
  const producto = venta.productos.find(p => p.productoId === 2);
  print(`- Venta ID: ${venta._id}, Cliente: ${venta.clienteId}`);
  print(`  Producto 2 - Cantidad: ${producto.cantidad}`);
  print(`  Total venta: $${venta.total}`);
});

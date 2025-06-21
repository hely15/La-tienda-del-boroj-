// crud_operations.js - Operaciones CRUD
// La tienda del borojó


// 1. Consultar todos los productos que tengan stock mayor a 20 unidades
db.productos.find({ "stock": { $gt: 20 } }).toArray();


// 2. Encontrar los clientes que no han comprado aún ningún producto
db.clientes.find({
  $or: [
    { "compras": { $exists: false } },
    { "compras": { $size: 0 } }
  ]
}).toArray();


// 1. Aumentar en 10 unidades el stock del producto "Borojó deshidratado"
db.productos.findOne({ "nombre": "Borojó deshidratado" });

db.productos.updateOne(
  { "nombre": "Borojó deshidratado" },
  { $inc: { "stock": 10 } }
);

db.productos.findOne({ "nombre": "Borojó deshidratado" });

// 2. Añadir el tag "bajo azúcar" a todos los productos de la categoría "Bebida"
const bebidasAntes = db.productos.find({ "categoria": "Bebida" }).toArray();
bebidasAntes.forEach(bebida => {
  print(`- ${bebida.nombre}: tags = [${bebida.tags.join(", ")}]`);
});

const actualizacionTags = db.productos.updateMany(
  { "categoria": "Bebida" },
  { $addToSet: { "tags": "bajo azúcar" } }
);

const bebidasDespues = db.productos.find({ "categoria": "Bebida" }).toArray();
bebidasDespues.forEach(bebida => {
  print(`- ${bebida.nombre}: tags = [${bebida.tags.join(", ")}]`);
});


// 1. Eliminar el cliente que tenga el correo "juan@email.com"
print("1. Eliminando cliente con email 'juan@email.com':");
const clienteJuan = db.clientes.findOne({ "email": "juan@email.com" });
if (clienteJuan) {
  print(`Cliente encontrado: ${clienteJuan.nombre}`);
  const eliminacionJuan = db.clientes.deleteOne({ "email": "juan@email.com" });
  print(`Documentos eliminados: ${eliminacionJuan.deletedCount}`);
} else {
  print("Cliente no encontrado");
}

// Verificar eliminación
const verificacionJuan = db.clientes.findOne({ "email": "juan@email.com" });
print(`Cliente después de eliminación: ${verificacionJuan ? "Existe" : "No existe"}`);

// 2. Eliminar todos los productos con stock menor a 5
const productosStockBajo = db.productos.find({ "stock": { $lt: 5 } }).toArray();
if (productosStockBajo.length > 0) {
  productosStockBajo.forEach(producto => {
    print(`- ${producto.nombre}: stock = ${producto.stock}`);
  });
  
  const eliminacionStock = db.productos.deleteMany({ "stock": { $lt: 5 } });
  print(`Documentos eliminados: ${eliminacionStock.deletedCount}`);
} else {
  print("No hay productos con stock menor a 5");
}

// Verificar eliminación
const productosStockBajoDespues = db.productos.find({ "stock": { $lt: 5 } }).toArray();


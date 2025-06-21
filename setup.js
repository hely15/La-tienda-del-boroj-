// setup.js
// 1. Insertar nuevo producto: Chocolatina de borojó
print("1. Insertando nuevo producto: Chocolatina de borojó");
db.productos.insertOne({
  "_id": 11,
  "nombre": "Chocolatina de borojó",
  "categoria": "Snack",
  "precio": 4000,
  "stock": 35,
  "tags": ["dulce", "energía"]
});
print("Producto insertado:", nuevoProducto.insertedId);

// 2. Insertar nuevo cliente: Mario Mendoza
print("2. Insertando nuevo cliente: Mario Mendoza");
db.clientes.insertOne({
  "_id": 11,
  "nombre": "Mario Mendoza",
  "email": "mario@email.com",
  "compras": [],
  "preferencias": ["energético", "natural"]
});
print("Cliente insertado:", nuevoCliente.insertedId);

// Verificar inserciones

print("Total productos:", db.productos.countDocuments());
print("Total clientes:", db.clientes.countDocuments());
print("Total ventas:", db.ventas.countDocuments());
print("Total proveedores:", db.proveedores.countDocuments());
print("Total inventario:", db.inventario.countDocuments());

print("\nConfiguración inicial completada exitosamente!");
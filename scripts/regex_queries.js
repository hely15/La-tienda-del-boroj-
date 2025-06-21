
// 1. Buscar productos cuyo nombre empiece por "Boro"
const productosEmpiezanBoro = db.productos.find({
  "nombre": { $regex: /^Boro/, $options: "i" }
}).toArray();

if (productosEmpiezanBoro.length > 0) {
  productosEmpiezanBoro.forEach(producto => {
    print(`- ID: ${producto._id}, Nombre: ${producto.nombre}, Categoría: ${producto.categoria}, Precio: $${producto.precio}`);
  });
} else {
  print("No se encontraron productos que empiecen por 'Boro'");
}

// 2. Encontrar productos cuyo nombre contenga la palabra "con"
const productosContienenCon = db.productos.find({
  "nombre": { $regex: /con/i }
}).toArray();

if (productosContienenCon.length > 0) {
  productosContienenCon.forEach(producto => {
    print(`- ID: ${producto._id}, Nombre: ${producto.nombre}, Categoría: ${producto.categoria}`);
    // Resaltar donde aparece "con"
    const nombreResaltado = producto.nombre.replace(/con/gi, "**CON**");
    print(`  Resaltado: ${nombreResaltado}`);
  });
} else {
  print("No se encontraron productos que contengan 'con'");
}

// 3. Encontrar clientes cuyo nombre tenga la letra "z" (insensible a mayúsculas/minúsculas)
const clientesConZ = db.clientes.find({
  "nombre": { $regex: /z/i }
}).toArray();

if (clientesConZ.length > 0) {
  clientesConZ.forEach(cliente => {
    print(`- ID: ${cliente._id}, Nombre: ${cliente.nombre}, Email: ${cliente.email}`);
    print(`  Preferencias: [${cliente.preferencias.join(", ")}]`);
    print(`  Compras realizadas: ${cliente.compras.length}`);
    // Resaltar donde aparece "z"
    const nombreResaltado = cliente.nombre.replace(/z/gi, "**Z**");
    print(`  Resaltado: ${nombreResaltado}`);
  });
} else {
  print("No se encontraron clientes con la letra 'z' en su nombre");
}


// 4. Productos que terminen en "borojó"
const productosTerminanBorojo = db.productos.find({
  "nombre": { $regex: /borojó$/i }
}).toArray();

productosTerminanBorojo.forEach(producto => {
  print(`- ${producto.nombre} (${producto.categoria})`);
});
print(`Total: ${productosTerminanBorojo.length}`);

// 5. Clientes con emails que contengan números
const clientesEmailNumeros = db.clientes.find({
  "email": { $regex: /\d/ }
}).toArray();

if (clientesEmailNumeros.length > 0) {
  clientesEmailNumeros.forEach(cliente => {
    print(`- ${cliente.nombre}: ${cliente.email}`);
  });
} else {
  print("No se encontraron clientes con números en el email");
}
print(`Total: ${clientesEmailNumeros.length}`);

// 6. Productos con tags que empiecen por vocal
const productosTagsVocal = db.productos.find({
  "tags": { $regex: /^[aeiouAEIOU]/ }
}).toArray();

productosTagsVocal.forEach(producto => {
  const tagsVocal = producto.tags.filter(tag => /^[aeiouAEIOU]/.test(tag));
  print(`- ${producto.nombre}: Tags con vocal = [${tagsVocal.join(", ")}]`);
});
print(`Total: ${productosTagsVocal.length}`);

// 7. Proveedores con nombres que contengan "S.A." o "Ltda"
const proveedoresRazonSocial = db.proveedores.find({
  "nombre": { $regex: /(S\.A\.|Ltda)/i }
}).toArray();

if (proveedoresRazonSocial.length > 0) {
  proveedoresRazonSocial.forEach(proveedor => {
    print(`- ${proveedor.nombre} - Contacto: ${proveedor.contacto}`);
  });
} else {
  print("No se encontraron proveedores con razón social");
}

print("\n=== PATRONES REGEX UTILIZADOS ===");
print("^ - Inicio de cadena");
print("$ - Final de cadena");
print("i - Insensible a mayúsculas/minúsculas");
print("\\d - Dígitos");
print("[aeiou] - Conjunto de caracteres");
print("| - OR lógico");
print("\nConsultas con expresiones regulares completadas exitosamente!");
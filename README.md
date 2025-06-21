# La tienda del borojó - MongoDB

## Descripción del proyecto

Este proyecto simula una tienda especializada en productos derivados del borojó, una fruta tropical del Pacífico colombiano. La base de datos MongoDB contiene información sobre productos, clientes, ventas, proveedores e inventario, permitiendo realizar operaciones CRUD completas, consultas avanzadas con agregaciones, transacciones y optimización con índices.

## Escenario

La tienda del borojó maneja:
- **Productos**: 10 diferentes productos derivados del borojó (frutas, bebidas, snacks, cosméticos)
- **Clientes**: 10 clientes registrados con sus preferencias y historial de compras
- **Ventas**: Registro de transacciones realizadas en junio 2025
- **Proveedores**: 7 proveedores especializados por tipo de producto
- **Inventario**: Control de lotes y cantidades disponibles

## Instrucciones para ejecutar

### Prerrequisitos
- MongoDB instalado y en ejecución
- MongoDB Shell (mongosh) o MongoDB Compass
- Conexión a una base de datos MongoDB

### Configuración inicial
```bash
# Conectar a MongoDB
mongosh

# Crear y usar la base de datos
use tienda_borojo

# Ejecutar los scripts en el siguiente orden:
# 1. setup.js - Inserción de datos iniciales
# 2. crud_operations.js - Operaciones CRUD
# 3. regex_queries.js - Consultas con expresiones regulares
# 4. array_operators.js - Operadores de arrays
# 5. aggregation_pipelines.js - Agregaciones
# 6. system_functions.js - Funciones del sistema
# 7. transactions.js - Transacciones
# 8. indexing.js - Creación de índices
```

## Ejercicios desarrollados

### 1. Inserción (setup.js)
- Inserción de datos iniciales de todas las colecciones
- Inserción de nuevo producto "Chocolatina de borojó"
- Inserción de nuevo cliente "Mario Mendoza"

### 2. Operaciones CRUD (crud_operations.js)
- **Lectura**: Productos con stock > 20, clientes sin compras
- **Actualización**: Incremento de stock, adición de tags
- **Eliminación**: Cliente por email, productos con stock < 5

### 3. Consultas con Expresiones Regulares (regex_queries.js)
- Productos que empiecen por "Boro"
- Productos que contengan "con"
- Clientes con letra "z" (insensible a mayúsculas)

### 4. Operadores de Arrays (array_operators.js)
- Clientes con preferencia "natural"
- Productos con tags "natural" Y "orgánico"
- Productos con más de un tag

### 5. Aggregation Framework (aggregation_pipelines.js)
- Productos más vendidos
- Clientes agrupados por cantidad de compras
- Ventas totales por mes
- Promedio de precios por categoría
- Top 3 productos con mayor stock

### 6. Funciones del Sistema (system_functions.js)
- `calcularDescuento(precio, porcentaje)`
- `clienteActivo(idCliente)`
- `verificarStock(productoId, cantidadDeseada)`

### 7. Transacciones (transactions.js)
- Simulación de venta con descuento de stock
- Entrada de nuevo inventario
- Operación de devolución

### 8. Indexación (indexing.js)
- Índice en nombre de productos
- Índice compuesto categoria-precio
- Índice en email de clientes
- Análisis con explain()

## Estructura de archivos

```
tienda-borojo/
├── README.md
├── scripts/
│   ├── setup.js
│   ├── crud_operations.js
│   ├── regex_queries.js
│   ├── array_operators.js
│   ├── aggregation_pipelines.js
│   ├── system_functions.js
│   ├── transactions.js
│   └── indexing.js

```

## Capturas de resultados

Todas las consultas han sido probadas y documentadas con sus respectivos resultados en el archivo `docs/consultas_resultados.md`. Las capturas de pantalla se encuentran en la carpeta `docs/capturas/`.

## Notas técnicas

- Se utilizan fechas ISODate para compatibilidad con MongoDB
- Las transacciones requieren MongoDB 4.0+ con replica set
- Los índices mejoran significativamente el rendimiento de consultas
- Las funciones del sistema permiten reutilizar lógica de negocio

## Autor

Desarrollo realizado para el curso de Bases de Datos NoSQL - MongoDB
Fecha de entrega: 21 de Junio 2025
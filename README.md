# Bonita Maquillaje

Página web de Bonita Maquillaje, tienda virtual y física en la ciudad de Cúcuta. Te ofrecemos los productos más TOP de marcas Colombianas en maquillaje, skincare y accesorios.

La página web tiene en su home page su Linkstree con sus redes sociales, ubicacion y enlace para el catalogo de productos (Por ahora en PDF).

## Próximamente

- Catalogos de productos para que los usuarios puedan hacer sus pedidos y contactar directamente a la empresa para comprar un producto.

### TODO

[x] Conectar con firebase para la base de datos

- Hacer funciones para el manejo de la base de datos en la pagina de administrador 
  [x] Crear los tipos de la base de datos
  [x] Poblar base de datos con datos de prueba
  [x] Metodos para traer datos de firebase y mostrarlos en la pagina
  [x] Metodos para crear, actualizar y borrar datos de firebase en cada coleccion necesaria

[x] Crear la navegacion para el administrador
[x] Conectar con firebase para la autenticacion (login, cerrar sesion, contexto, hooks)

- Crear cada vista para el administrador segun el figma
  [x] Actualizar reglas de firebase para que solo pueda agregar a la bd el usuario administrador
  [x] Crear componentes para la pagina de productos
  [x] Acomplar componentes para la pagina de productos
  [x] Crear los estilos para la pagina de productos

- Crear pagina de productos (agregar producto)
  [x] pagina para crear producto
  [x] Componente para subir imagenes del producto
  [x] Endpoint donde llegaran las imagenes y mandarlas a firebase despues de validarlas
  [x] campos del formulario validados 
  [x] Conectar con firebase para subir el producto creado
  [x] Pruebas

- Crear pagina de productos (Editar producto)
  [x] pagina para editar producto
  [x] campos del formulario usando el de crear producto (Pasarle los valores que tiene por defecto) 
  [x] componente para subir imagenes de la producto (que pese por mucho 3Mb. Que cargue las imagenes que ya tenia el producto en firebase)
  [x] Conectar con firebase para subir el producto editado
  [x] Pruebas

- Crear pagina de categorias (Crear categoria)
  [x] pagina para crear categoria
  [x] campos del formulario validados 
  [x] componente para subir imagenes de la categoria [que pese por mucho 500Kb]
  [x] Conectar con firebase para subir la categoria creada
  [x] Pruebas

- Crear pagina de categorias (Editar categoria)
  [x] pagina para editar categoria
  [x] campos del formulario validados (al pasarle los valores que tiene por defecto)
  [x] componente para subir imagenes de la categoria [que pese por mucho 500Kb]
  [x] Conectar con firebase para subir la categoria creada
  [x] Pruebas

- Crear pagina de los pedidos (Ver pedidos)
  [x] pagina para ver pedidos
  [x] Conectar con firebase para traer los pedidos
  [x] Conectar componentes para mostrar los pedidos (Con sus funcionalidades de borrar y link a pagina editar)
  [x] Paginacion de los pedidos (que solo aparezcan 20 ultimos pedidos por pagina)
  [] Buscador por nombre del cliente  

- Crear pagina de los pedidos (Editar pedido)
  [x] pagina para ver pedido
  [x] Conectar con firebase para traer el pedido
  [x] Tabla de resumen de la compra
  [] Componentes del formulario 
  [] Conectar con hook del formularios para los errorres
  [] Pruebas
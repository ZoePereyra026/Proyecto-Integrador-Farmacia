# 💊 Farmacia San Martín – E-Commerce

## 👥 Integrantes del Grupo

- Aguirre Matias
- Pereyra Zoe
- Sadir Martin 

---

## Proyecto: Página web para Farmacia San Martín

### 📍 Descripción del local comercial

Farmacia San Martín es una farmacia ubicada en **Gral. San Martín 244, San Salvador de Jujuy**, conocida por su atención cercana, su compromiso con la salud comunitaria y su enfoque en productos de venta libre que promueven el bienestar diario.  
A diferencia de las grandes cadenas, esta farmacia se destaca por su trato personalizado y su relación directa con cada cliente. 

---

### Diseño

El prototipo fue diseñado para reflejar esa identidad local con una estética **limpia, funcional y cálida**. Se priorizó la accesibilidad, la simplicidad y la comodidad del usuario. Algunas decisiones claves:
- Uso de tipografía clara y legible para facilitar la lectura.
- Paleta de colores suave (verde y celeste) que transmite bienestar y confianza.
- Imágenes de productos bien definidas y organizadas.
- Selector de cantidad con botones más intuitivo que el tradicional `<select>`.
- Botones de acción (comprar, agregar al carrito) con un efecto hover para mayor interacción.
- Navegación clara con una **barra de acceso** a distintas secciones y redes sociales.

La **página de inicio** resume la esencia del comercio, incluye información de contacto y una presentación clara de productos destacados. Otras vistas como el **detalle de producto** o el **carrito** mantienen coherencia visual y están optimizadas para una experiencia amigable.

---

## Tecnologías utilizadas

- HTML5 y CSS3
- JavaScript para interacción del carrito y cantidades
- Bootstrap 5.3 (utilizado en la página principal)
- Markdown para documentación (`README.md`)
- Diseño responsive

---

## Instrucciones para visualizar el prototipo

No requiere conexión a internet ni instalación de servidores. Solo:

1. Descargar o clonar este repositorio:

```bash
https://github.com/martinSadir21/Proyecto-Integrador-Farmacia.git

```
2. Abrir el archivo index.html en cualquier navegador web.

> El sitio funciona en forma local porque todos los recursos (imágenes, hojas de estilo, íconos) están integrados en las carpetas del proyecto.

## Funcionalidades principales

- Inicio (index.html): presentación de la farmacia, productos destacados e información general.

- Detalle de producto: descripción, imágenes, selector de cantidad mejorado y botón de compra.

- Carrito: lista de productos seleccionados, selector de cantidad por producto, cálculo de totales y opción de pago.

- Interacción fluida, organización clara de elementos y accesibilidad visual.

## Estructura del proyecto

/Proyecto-Integrador-Farmacia/
│
├── config/
│   └── database.js
│
├── controllers/
│   ├── productoController.js 
│   └── userController.js
│
├── data/
│   ├── producto.json
│   └── user.json
│
├── middleware/
│
├── models/
│   ├── productoModels.js
│   └── userModels.js
│
├── node_modules/
│   └── (dependencias instaladas)
│
├── routes/
│   ├── productoRoutes.js
│   └── userRoutes.js
│
├── .env
├── package-lock.json
├── package.json
├── productoApi.http
├── server.js
└── userApi.http
│
├── index.html                # Página principal (Inicio)
├── productos.html            # Catálogo general de productos
├── producto.html             # Detalle de un producto
├── carrito.html              # Carrito de compras
├── login.html                # Inicio de sesión
├── README.md                 # Documentación del proyecto
│
├── /css/                     # Estilos CSS por sección
│   ├── style_index.css       # Estilos para index.html
│   ├── style_producto.css    # Estilos para producto.html
│   └── style_carrito.css     # Estilos para carrito.html
│
└── /img/                     # Imágenes generales y de productos
    └── logo.png              # (y otros recursos visuales)

## Comentario final

Este proyecto es una muestra de cómo una pequeña farmacia local puede llevar su identidad al entorno digital, manteniendo su esencia humana y cercana. El prototipo es simple, claro y listo para crecer en funcionalidades más avanzadas como un catálogo dinámico, backend conectado o pasarela de pago.

> Gracias por visitar nuestro trabajo.
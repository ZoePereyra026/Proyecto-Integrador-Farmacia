# Feedback Proyecto Integrador "Farmacia" 

Hola equipo,

Felicitaciones por la entrega de su prototipo estático! Han construido una base sólida que cumple con los requisitos iniciales y han implementado varias funcionalidades adicionales. Este documento ofrece un feedback detallado para ayudarles a refinar su trabajo.

---

## 1. Análisis General y Puntos Fuertes

-   **Cumplimiento de Requisitos:** Han entregado todas las vistas solicitadas con buena funcionalidad básica.
-   **Identidad Visual:** Buena selección de paleta de colores (verde #61c286, celeste #00AEEF, y variaciones) que transmite confianza, con logo profesional bien integrado.
-   **Framework:** Buena implementación de Bootstrap 5.3 en varias páginas.
-   **Funcionalidad Básica:** Buena navegación entre páginas y estructura funcional.
-   **README Completo:** Documentación detallada con integrantes, descripción del negocio y tecnologías.

---

## 2. Estructura de Archivos y Organización

**Observaciones:**

-   **Positivo:** Buena separación de archivos en carpetas organizadas.
-   **A mejorar:** 
    -   Referencias inconsistentes a `css/style.css` que no existe.
    -   Múltiples archivos CSS con potencial duplicación de estilos comunes.
    -   **Inconsistencia en navegación:** Headers/navbar y footers varían entre páginas, dificultando el mantenimiento.
    -   **Sugerencia:** Crear un archivo CSS base con estilos comunes (header, footer, variables de color) y archivos específicos solo para estilos únicos. Unificar la estructura de navegación en todas las páginas.

---

## 3. Revisión de Vistas (Archivos HTML)

### `index.html` (Página de Inicio)

-   **Bien logrado:**
    -   Excelente implementación de Bootstrap con navbar responsive.
    -   Sección hero atractiva con logo y mensaje claro.
    -   Cards de productos destacados bien estructuradas.
-   **A mejorar:**
    -   En la sección de productos destacados se podría reutilizar el componente de productos que permite ir a ver el detalle del producto y que además tiene el formato de tarjeta que permite distinguir diferencias entre tarjetas de diferentes productos.
    -   Hacer mención a las secciones o categorías de productos para mejorar la UX.



### `productos.html` (Listado de Productos)

-   **Bien logrado:**
    -   **Navegación funcional:** Los productos SÍ son clickeables con enlaces "Ver más".
    -   Barra lateral con filtros por categoría y precio bien estructurada.
    -   Layout organizado y claro.
-   **A mejorar:**
    -   Estilos inline en `<style>` dentro del HTML - mover al archivo CSS.
    -   Referencia a archivo CSS inexistente.

### `producto.html` (Detalle del Producto)

-   **Bien logrado:**
    -   **Galería implementada:** Imagen principal + miniaturas funcionando.
    -   Controles de cantidad (+/-) bien ubicados.
    -   Información completa: precio, descripción, stock, categoría.
-   **A mejorar:**
    -   Agregar cálculo de totales por cantidad cuando esta cambie para mejorar la UX.
    -   **Botones de cantidad:** Los botones de agregar (+) y quitar (-) tienen problemas de visibilidad y estilo que dificultan su uso.

### `carrito.html` (Carrito de Compras)

-   **Bien logrado:**
    -   Cálculo de totales por producto y general.
    -   Estructura de carrito organizada.
-   **A mejorar:**
    -   **Botones de cantidad:** Los botones de agregar (+) y quitar (-) tienen problemas de visibilidad y estilo que dificultan su uso.
    -   **Confusión Total vs Subtotal:** No está clara la diferencia entre "Total" y "Subtotal", generando confusión para el usuario.
    -   Inconsistencia en precios (ej: un producto muestra $500 unitario pero $1.000 total para cantidad 1, otro producto muestra $2200 unitario pero $44.000 total para cantidad 1).
    -   Inconsistencia en imagenes (ej: se muestra un alcohol en gel y se describe un protector solar)

### `login.html` y `registro.html`

-   **Bien logrado:**
    -   **Formularios accesibles:** Etiquetas `<label>` correctamente asociadas con `for="id"`.
    -   Navegación clara entre login y registro.

---

## 4. Diseño y CSS 

-   **Fortalezas:**
    -   Paleta de colores consistente y profesional.
    -   Uso efectivo de Bootstrap para layout responsive.
    -   Buenos efectos hover y transiciones.
-   **A mejorar:**
    -   **Organización CSS:** Consolidar estilos comunes en un archivo principal.
    -   **Imágenes externas:** Muchas imágenes son enlaces externos que pueden fallar - consideren almacenarlas localmente:
        -   farmaciassanchezantoniolli.com.ar (Tafirol)
        -   farmacialeloir.com.ar (Protector solar)
        -   farmacityar.vtexassets.com (Curitas)
        -   ardiaprod.vtexassets.com (Shampoo)
        -   media-amazon.com (Vitamina C)
        -   anikashop.com.ar (Miniaturas de producto)
        -   mitiendanube.com (Alcohol en gel)

---

## 5. Navegación y Usabilidad

-   **Bien implementado:**
    -   Navegación clara entre páginas.
    -   Enlaces funcionales y bien organizados.
    -   Estructura de formularios básica correcta.
-   **Oportunidades de mejora:**
    -   Mejorar visibilidad de botones interactivos.
    -   Clarificar información mostrada al usuario.

---

## 6. HTML Semántico y Estructura

-   **Bien logrado:**
    -   **Estructura de carpetas:** Siguen perfectamente la estructura sugerida (css/, img/, archivos HTML en raíz).
    -   **Organización CSS:** Buenos archivos separados por página (style_index.css, style_producto.css, etc.).
-   **A mejorar:**
    -   **Etiquetas semánticas:** Aunque usan algunas como `<section>` y `<nav>`, podrían implementar más etiquetas HTML5 como `<header>`, `<main>`, `<footer>`, `<article>` para mejor estructura semántica.

---

## 7. Documentación y Guía de Estilo

-   **Excelente trabajo:**
    -   **README completo:** Documentación muy detallada con integrantes, descripción del negocio, tecnologías y estructura del proyecto.
    -   **Formato de código:** La estructura del proyecto en el README debe formatearse como bloque de código usando ``` para mejor legibilidad.
    -   **Justificación de diseño:** Explicaron claramente por qué eligieron colores suaves (verde y celeste) que transmiten bienestar y confianza, alineándose perfectamente con la identidad de una farmacia.
    -   **Descripción del local:** Excelente contexto sobre Farmacia San Martín en Jujuy, destacando su trato personalizado vs. grandes cadenas.
-   **Variables CSS bien implementadas:**
    -   Ya utilizan variables CSS en algunos archivos: `--celeste: #00AEEF`, `--azul-profundo: #0098d3`, `--verde-suave: #61c286`.
-   **A mejorar y documentar:**
    -   **Sección de integrantes básica:** La lista de integrantes es muy simple (solo nombres). Considerar agregar enlaces a LinkedIn/GitHub y avatares para un toque más profesional.
    -   **Inconsistencia en variables:** Solo style_producto.css y style_carrito.css usan variables CSS, mientras que style_index.css y style_logreg.css usan colores directos.
    -   **Colores adicionales sin variables:** Detectamos más colores usados: `#36C48E`, `#198754`, `#157347`, `#146c43`, `#0a3622`, `#05361d`.
    -   **Unificar variables CSS:** Crear un archivo de variables común o incluir todas las variables en cada archivo CSS.
    -   **Variables para tamaños:** Considerar agregar variables para espaciados y tamaños comunes.
    -   **Documentar paleta completa:** Incluir todos los códigos hexadecimales en el README.md.
    -   **Tipografía:** Especificar las fuentes utilizadas para títulos y texto.

**Ejemplo de variables CSS unificadas recomendadas:**

```css
:root {
  /* Colores principales */
  --celeste: #00AEEF;
  --azul-profundo: #0098d3;
  --verde-suave: #61c286;
  --verde-acento: #36C48E;
  --verde-bootstrap: #198754;
  --verde-hover: #157347;
  --verde-border: #146c43;
  --verde-oscuro: #0a3622;
  --verde-muy-oscuro: #05361d;
  
  /* Espaciados comunes */
  --padding-small: 8px;
  --padding-medium: 16px;
  --padding-large: 24px;
  --margin-section: 2rem;
  
  /* Tamaños de fuente */
  --font-size-small: 0.875rem;
  --font-size-base: 1rem;
  --font-size-large: 1.25rem;
  --font-size-xl: 1.5rem;
  
  /* Bordes y sombras */
  --border-radius: 8px;
  --box-shadow-light: 0 0 10px rgba(0, 0, 0, 0.05);
  --box-shadow-medium: 0 2px 8px rgba(0, 0, 0, 0.15);
}
```

**Ejemplo de sección de integrantes mejorada:**

```markdown
## 👥 Integrantes del Grupo

| Integrante | LinkedIn |
|------------|----------|
| [![Aguirre Matias](https://github.com/matiasaguirre.png?size=50)](https://github.com/matiasaguirre) **Aguirre Matias** | [LinkedIn](https://linkedin.com/in/matiasaguirre) |
| [![Pereyra Zoe](https://github.com/zoepereyra.png?size=50)](https://github.com/zoepereyra) **Pereyra Zoe** | [LinkedIn](https://linkedin.com/in/zoepereyra) |
| [![Sadir Martin](https://github.com/martinSadir21.png?size=50)](https://github.com/martinSadir21) **Sadir Martin** | [LinkedIn](https://linkedin.com/in/martinsadir) | 
```

---

## 8. SEO y Accesibilidad

-   **Bien logrado:**
    -   **Formularios accesibles:** Etiquetas `<label>` correctamente asociadas con `for="id"` en login y registro.
    -   **Meta viewport:** Correctamente implementado para responsividad.
    -   **Atributos alt:** Presente en todas las imágenes.
-   **A mejorar:**
    -   **Meta descriptions:** Ninguna página tiene meta description específica.
    -   **Atributos alt más descriptivos:** Algunos son genéricos (ej: "Protector" podría ser "Protector solar FPS 50").

---

## 9. Conclusión y Próximos Pasos

Excelente trabajo que supera las expectativas básicas. **Destacan especialmente en:**

- **Documentación excepcional:** Su README.md es uno de los más completos y bien justificados que he revisado.
- **Organización de archivos:** Siguen perfectamente la estructura sugerida y tienen CSS bien organizado por páginas.
- **Identidad visual coherente:** Logran transmitir la calidez y confianza de una farmacia local.
- **Accesibilidad:** Formularios correctamente implementados con labels asociadas.

**Áreas de mejora principales:** Principalmente correcciones técnicas menores (referencias CSS, responsividad) y completar algunos aspectos de documentación.

**Tareas Prioritarias:**

1.  **Unificar navegación:** Estandarizar headers/navbar y footers en todas las páginas para mantener consistencia.
2.  **Unificar variables CSS:** Implementar todas las variables CSS en todos los archivos para mantener consistencia (actualmente solo 2 de 4 archivos las usan).
3.  **Consolidar CSS:** Corregir referencia a `css/style.css` inexistente en login.html - usar `style_logreg.css`.
4.  **Mejorar botones del carrito:** Corregir estilos de los botones de cantidad para mejor visibilidad.
5.  **Clarificar totales:** Distinguir claramente entre subtotal y total en el carrito.
6.  **Corrección de inconsistencias:** Revisar cálculos de precios y descripción de productos en carrito.
7.  **Mejorar Responsividad:** Ajustar producto.html y carrito.html para móviles.
8.  **Imágenes locales:** Mover las 7 imágenes externas identificadas a la carpeta img/.
9.  **HTML semántico:** Implementar `<header>`, `<main>`, `<footer>`, `<article>` en todas las páginas.
10. **Completar documentación:** Agregar todos los códigos hexadecimales detectados y especificar tipografía en README.md.
11. **SEO básico:** Agregar meta descriptions específicas y mejorar atributos alt descriptivos.

¡Felicitaciones por el excelente trabajo realizado!

**Atentamente,**
El equipo docente. 
# EStructura del proyecto

- Proyecto JS vanilla moderno, ESM, legible, librerías pequeñas (a ser posible sin dependencias).
- Créame un package.json del proyecto y asegúrate que sea type module.
- Uso de WebComponents nativos, nada de otros componentes provenientes de frameworks. Con APIs modernas como CSSStyleSheet, setHTMLUnsafe() e imports attributes con `with`.
- Utilizamos `servor`, última versión, como servidor local de desarrollo con `pnpm run dev`.
- Los archivos fuentes, incluidos el punto de entrada `index.html` deben estar dentro de `src/`.
- La carpeta `src/components/` incluirá los componentes. Si son varios archivos, los guardaremos en subcarpetas relacionadas.
- Los estilos globales y clases de utilidad se guardan en una carpeta `src/css` y un fichero `index.css`. Se preferirá estilos locales al componente siempre que se pueda.
- Ni se te ocurra meter en el proyecto TailwindCSS 😤. Ya sabes que es vanilla, pero por si alucinas.
- Intentar evitar uso de carpeta `src/utils`. Usar `src/modules` para módulos JS globales o de utilidad.
- La ruta de `assets` se llamará `public`.
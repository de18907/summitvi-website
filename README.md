# SummitVI Website

Un sitio web moderno y sofisticado para la firma de Venture Capital SummitVI de Puerto Rico, con animaciones 3D impresionantes y un diseño profesional.

## Características

- **Diseño 3D Interactivo**: Partículas flotantes con Three.js que reaccionan al mouse
- **Animaciones de Scroll**: Efectos 3D con GSAP y ScrollTrigger
- **Tarjetas 3D Tilt**: Efecto de inclinación en 3D usando Vanilla-Tilt.js
- **Diseño Responsive**: Adaptado para móvil, tablet y desktop
- **Paleta de Colores Personalizada**: Azul corporativo oscuro (#0A1628), azul eléctrico (#00D4FF), dorado/naranja (#FFB800)
- **Optimizado para Rendimiento**: Animaciones eficientes, lazy loading de imágenes
- **Accesible**: Soporte para reduced motion, focus visible, semántica HTML5

## Estructura del Proyecto

```
summitvi-website/
├── index.html          # Página principal con toda la estructura
├── css/
│   └── styles.css      # Estilos CSS con efectos 3D
├── js/
│   └── main.js         # JavaScript con Three.js, GSAP, Vanilla-Tilt
└── README.md           # Este archivo
```

## Tecnologías Utilizadas

- **HTML5 Semántico**: Estructura limpia y accesible
- **Tailwind CSS**: Utilidades rápidas vía CDN
- **CSS3 Personalizado**: Transforms 3D, animaciones, gradientes
- **Three.js**: Sistema de partículas 3D interactivo
- **GSAP + ScrollTrigger**: Animaciones de scroll fluidas
- **Vanilla-Tilt.js**: Efectos 3D en tarjetas
- **Lucide Icons**: Iconos modernos y ligeros

## Despliegue en GitHub Pages

Sigue estos pasos para publicar tu sitio en GitHub Pages:

### Paso 1: Crear un repositorio en GitHub

1. Ve a [github.com](https://github.com) e inicia sesión con tu cuenta `de18907`
2. Haz clic en el botón verde "+" y selecciona "New repository"
3. Nombre del repositorio: `summitvi-website`
4. Selecciona "Public" (GitHub Pages requiere repositorios públicos)
5. Haz clic en "Create repository"

### Paso 2: Subir los archivos

#### Opción A: Usando la interfaz web (Recomendado para principiantes)

1. En tu nuevo repositorio, haz clic en "uploading an existing file"
2. Arrastra y suelta todos los archivos de la carpeta `summitvi-website`:
   - `index.html`
   - Carpeta `css/` con `styles.css`
   - Carpeta `js/` con `main.js`
3. Escribe un mensaje de commit: "Initial commit - SummitVI website"
4. Haz clic en "Commit changes"

#### Opción B: Usando Git en tu computadora

```bash
# Abre terminal y navega a la carpeta del proyecto
cd Documents/summitvi-website

# Inicializa el repositorio Git
git init

# Agrega todos los archivos
git add .

# Crea el primer commit
git commit -m "Initial commit - SummitVI website"

# Conecta con el repositorio remoto (reemplaza con tu URL)
git remote add origin https://github.com/de18907/summitvi-website.git

# Sube los archivos
git branch -M main
git push -u origin main
```

### Paso 3: Configurar GitHub Pages

1. Ve a tu repositorio en GitHub: `https://github.com/de18907/summitvi-website`
2. Haz clic en la pestaña "Settings" (arriba a la derecha)
3. En el menú lateral izquierdo, busca y haz clic en "Pages"
4. En "Source", selecciona "Deploy from a branch"
5. Selecciona la rama "main" y la carpeta "/ (root)"
6. Haz clic en "Save"

### Paso 4: Ver tu sitio publicado

1. Espera 1-2 minutos mientras GitHub compila tu sitio
2. La URL de tu sitio será: `https://de18907.github.io/summitvi-website/`
3. Verás un mensaje "Your site is published at..." en la página de GitHub Pages
4. ¡Haz clic en el enlace para ver tu sitio!

## Personalización

### Cambiar colores

Edita el archivo `css/styles.css` y modifica las variables CSS:

```css
:root {
  --summit-dark: #0A1628;      /* Fondo principal */
  --summit-electric: #00D4FF;  /* Acento azul */
  --summit-gold: #FFB800;      /* Acento dorado */
  --summit-light: #F0F4F8;     /* Fondo claro */
}
```

### Cambiar información de contacto

Edita `index.html` y busca la sección "Contact Info" (línea ~600):

```html
<!-- Actualiza dirección, email y teléfono -->
<p class="text-summit-dark/60">
    Tu Nueva Dirección<br>
    Ciudad, País
</p>
```

### Actualizar el Portfolio

Para agregar o modificar empresas del portfolio, edita la sección Portfolio en `index.html`. Cada tarjeta tiene esta estructura:

```html
<div class="portfolio-card group relative">
    <div class="relative rounded-2xl overflow-hidden...">
        <img src="URL_DE_LA_IMAGEN" alt="Nombre Empresa">
        <!-- Contenido... -->
    </div>
</div>
```

### Cambiar textos

Todos los textos están directamente en `index.html`. Simplemente busca y reemplaza:

- Título principal: Busca `SUMMITVI` en el hero section
- Descripción: Busca `Elevamos startups tecnológicas...`
- Servicios: Busca la sección `Nuestros Servicios`

## Rendimiento y Optimización

El sitio incluye varias optimizaciones:

1. **Lazy Loading**: Las imágenes se cargan cuando son visibles
2. **Animaciones suaves**: Usando `requestAnimationFrame`
3. **Detección de dispositivos táctiles**: Animaciones simplificadas en móvil
4. **Intersection Observer**: Animaciones solo cuando son visibles
5. **Reduced Motion**: Respeta las preferencias del usuario

## Solución de Problemas

### El sitio no se ve bien en GitHub Pages

- Asegúrate de que `index.html` esté en la raíz del repositorio (no en subcarpeta)
- Verifica que las rutas a CSS y JS sean correctas (usamos rutas relativas `./`)
- Limpia la caché del navegador (Ctrl+F5 o Cmd+Shift+R)

### Las animaciones 3D no funcionan

- Verifica que JavaScript esté habilitado
- Revisa la consola del navegador (F12) para errores
- Three.js requiere WebGL - verifica que tu navegador lo soporte

### El formulario de contacto no envía

- El formulario es un demo - no envía datos reales
- Para hacerlo funcional, necesitas conectarlo a un backend (Formspree, Netlify Forms, etc.)
- Ejemplo con Formspree: Cambia `<form action="https://formspree.io/f/YOUR_FORM_ID">`

## Recursos Adicionales

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Three.js Documentation](https://threejs.org/docs/)
- [GSAP Documentation](https://greensock.com/docs/)
- [Tailwind CSS](https://tailwindcss.com/)

## Licencia

Este proyecto está creado para uso personal y comercial de SummitVI.

## Contacto

Para soporte o preguntas sobre este proyecto, contacta al desarrollador.

---

**SummitVI** - Elevando startups al siguiente nivel 🏔️

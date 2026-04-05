# 🎙️ Instrucciones para Actualizar el Hero
## Radio Conexión Latina Edmonton

---

## 📦 Archivos que necesitas:

1. `animaciones-hero.css` - El CSS con las animaciones
2. `hero-cinematic.png` - Tu imagen de los audífonos (la que me enviaste)

---

## 🔧 PASO 1: Subir la imagen

1. Descarga la imagen de los audífonos que me enviaste
2. Renómbrala a: `hero-cinematic.png`
3. Súbela a tu carpeta: `assets/brand/hero-cinematic.png`

---

## 🎨 PASO 2: Agregar el CSS

1. Abre tu archivo `index.html`
2. Busca el cierre de la etiqueta `</style>` (está cerca del inicio del archivo)
3. **ANTES** de `</style>`, pega TODO el contenido del archivo `animaciones-hero.css`

---

## 🖼️ PASO 3: Cambiar la imagen en el HTML

1. En tu `index.html`, busca esta línea (aproximadamente línea 1956):

```html
<img src="assets/brand/logo-master-clean.png" alt="Logo maestro Radio Conexión Latina Edmonton">
```

2. Cámbiala por:

```html
<img src="assets/brand/hero-cinematic.png" alt="Radio Conexión Latina Edmonton - La voz que conecta">
```

---

## ✨ PASO 4: Agregar elementos de animación

1. Busca el div `hero-logo-stage` (aproximadamente línea 1942):

```html
<div class="hero-logo-stage parallax-layer">
```

2. DENTRO de ese div, DESPUÉS del `radio-wave-stack` y ANTES del `hero-logo-hero`, agrega:

```html
<!-- Ondas de radio cinematográficas -->
<div class="radio-wave-extra" aria-hidden="true"></div>
<div class="radio-wave-extra" aria-hidden="true"></div>
<div class="radio-wave-extra" aria-hidden="true"></div>

<!-- Notas musicales flotantes -->
<span class="floating-note" aria-hidden="true">♪</span>
<span class="floating-note" aria-hidden="true">♫</span>
<span class="floating-note" aria-hidden="true">♬</span>
<span class="floating-note" aria-hidden="true">♩</span>
<span class="floating-note" aria-hidden="true">♪</span>
<span class="floating-note" aria-hidden="true">♫</span>
```

---

## ✅ PASO 5: Guardar y verificar

1. Guarda el archivo `index.html`
2. Haz commit y push a GitHub
3. Vercel desplegará automáticamente
4. Verifica en tu sitio que todo funcione

---

## 🎬 Lo que verás:

- ✨ Partículas/estrellas viajando alrededor del logo
- 🌊 Ondas de radio pulsantes (naranja, cyan, amarillo)
- 🎵 Notas musicales flotando
- 💫 Efecto de brillo rotatorio
- 🚀 Sensación de viajar por el espacio
- 📱 Todo responsive para móvil

---

## ⚠️ IMPORTANTE:

- NO modifiques nada más del archivo
- Solo agrega el CSS y cambia la imagen
- Si algo sale mal, puedes revertir fácilmente en GitHub

---

## 🆘 Si necesitas ayuda:

Vuelve a contactarme y te ayudo a resolver cualquier problema.

¡Éxito con el lanzamiento de Radio Conexión Latina Edmonton! 🎙️🇨🇦

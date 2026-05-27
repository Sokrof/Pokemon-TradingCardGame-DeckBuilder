# 🃏 Pokémon TCG - Deck Builder

Aplicación web para crear y gestionar mazos de cartas del juego de cartas coleccionables de Pokémon (Pokémon TCG).

Hecha con **Angular**, **Tailwind CSS** y la API gratuita de **TCGdex**.

![Angular](https://img.shields.io/badge/Angular-14-red?logo=angular)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-blue?logo=tailwindcss)
![TCGdex](https://img.shields.io/badge/API-TCGdex-green)

---

## ✨ Funcionalidades

- **Buscar cartas** por nombre o filtrar por tipo de energía (Fuego, Agua, Planta, etc.)
- **Crear mazos** con entre 2 y 60 cartas, con un máximo de 4 copias por carta
- **Editar y eliminar** mazos existentes
- **Vista detallada** de cada carta: HP, ataques, debilidades, tipo, imagen...
- **Añadir y quitar cartas** del mazo de forma rápida con botones +/− directamente sobre las cartas, o desde la ficha de detalle
- **Infinite scroll**: las cartas se cargan progresivamente conforme haces scroll, sin tener que paginar manualmente
- **Chips de tipo** con colores e iconos de energía, traducidos al español
- **Validación en tiempo real**: no puedes añadir cartas sin ponerle nombre al mazo, ni superar el límite de 4 copias

---

## 🛠️ Tecnologías

- **Angular 14** — Framework principal
- **Tailwind CSS** — Estilos y diseño responsive
- **TCGdex API** — API gratuita y sin autenticación para obtener datos de las cartas ([tcgdex.dev](https://tcgdex.dev))
- **UUID** — Generación de identificadores únicos para los mazos
- **RxJS** — Programación reactiva para la gestión de estado y peticiones HTTP

---

## 🚀 Instalación y ejecución

### Requisitos previos

- **Node.js** (v18 o superior) — [Descargar aquí](https://nodejs.org)
- **Angular CLI** (opcional, se puede usar npx)

### Pasos

1. **Clona el repositorio:**

```bash
git clone https://github.com/Sokrof/Pokemon-TradingCardGame-DeckBuilder.git
```

2. **Entra en la carpeta del proyecto:**

```bash
cd Pokemon-TradingCardGame-DeckBuilder
```

3. **Instala las dependencias:**

```bash
npm install
```

4. **Arranca la aplicación:**

```bash
ng serve
```

Si no tienes Angular CLI instalado globalmente, puedes usar:

```bash
npx ng serve
```

5. **Abre el navegador** en [http://localhost:4200](http://localhost:4200) y listo.

> **Nota para Windows:** Si al ejecutar `npm install` te da un error de permisos con PowerShell, ejecuta primero:
> ```bash
> Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
> ```

---

## 📋 Cómo funciona

### Crear un mazo

1. Haz clic en **"Nuevo Mazo"**
2. Escribe un nombre para el mazo
3. Pulsa **"Añadir Cartas"** para abrir el catálogo
4. Busca cartas por nombre o filtra por tipo de energía
5. Usa los botones **+** / **−** sobre cada carta para añadirlas o quitarlas (máximo 4 copias de cada una)
6. Haz scroll para cargar más cartas automáticamente
7. Cierra el catálogo y pulsa **"Guardar"**

### Validaciones

- El mazo debe tener **entre 2 y 60 cartas**
- No se pueden tener **más de 4 copias** de una misma carta
- Es **obligatorio** poner un nombre al mazo antes de añadir cartas

### Almacenamiento

Los mazos se guardan **en memoria** (no persisten entre sesiones). Se usa un `BehaviorSubject` de RxJS para mantener el estado reactivo entre componentes — cualquier cambio en un mazo se refleja automáticamente en las vistas que lo consumen.

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── _core/            # Servicios y lógica base
│   ├── _helpers/         # Validadores personalizados
│   ├── _models/          # Modelos (Card, Deck)
│   ├── _services/        # Servicios (Cards, Deck, Type, Base)
│   ├── components/       # Componentes generales (Login, Inicio, Registro)
│   └── modules/
│       ├── deck-create-update/   # Crear/editar mazos
│       └── deck-list/            # Lista de mazos
├── assets/               # Imágenes y recursos
├── environments/         # Configuración de entorno (URL de la API)
└── shared/               # Componentes compartidos (Loading, TitlePage)
```

---

## 🔌 API

Este proyecto usa [TCGdex](https://tcgdex.dev), una API gratuita y open source para el Pokémon TCG. No requiere registro ni API key.

Endpoints principales utilizados:
- `GET /v2/en/cards` — Listado de cartas (con paginación)
- `GET /v2/en/cards/{id}` — Detalle de una carta
- `GET /v2/en/types` — Tipos de energía disponibles

---

## 📝 Notas

- Originalmente el proyecto usaba la API de [pokemontcg.io](https://pokemontcg.io), pero tras su migración a Scrydex (de pago), se migró a TCGdex como alternativa gratuita.
- Algunas cartas pueden no tener imagen disponible en la API; estas se filtran automáticamente.
- El proyecto no tiene backend — todo el almacenamiento es en el cliente.

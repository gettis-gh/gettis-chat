# 📦 Aplicación: StePanel — v0.1.2
- 📝 Descripción: StePanel es un panel inteligente e intuitivo de gestión empresarial.
- 🕒 Última actualización: [2025-05-23]
- 🚧 Estado: En desarrollo — **No disponible aún**

---

## 🧩 Módulo: Core — v0.1.1
Lógica principal del sistema.

### 🔧 Servicio: Database — v0.1.1
- Estado: ✅ Up
- Cambios:
  - Estructura inicial de base de datos implementada con Sequelize.
  - Archivo `sequelize.js` y base `database.sqlite`.

#### 📄 Modelos:
- `user.model.js` — ✅ Up
- `user/profile.model.js` — ⬇️ Down
- `user/security.model.js` — ⬇️ Down
- `user/inventory.model.js` — ✅ Up
- `user/inventory/product.model.js` — ✅ Up

### 🔧 Servicio: Controllers — v0.1.0
- Estado: ✅ Up
- Archivos:
  - `user.controller.js`
  - `inventory.controller.js`
- Cambios:
  - Implementación de funciones para crear usuarios, inventario y productos.

---

## 🧩 Módulo: Router — v0.1.0
Encargado de gestionar las rutas HTTP.

### 🌐 API Router — v0.1.0
- Archivo: `api.router.js`
- Estado: ✅ Up
- Cambios:
  - `POST /api/users` — Crear usuario
  - `POST /api/inventory/:userId` — Crear inventario para usuario
  - `POST /api/inventory/:userId/product` — Agregar producto

### 🌐 HTML Router — v0.1.0
- Archivo: `html.router.js`
- Estado: ✅ Up
- Cambios:
  - `GET /` — Entrega la interfaz web renderizada

---

## 🧩 Módulo: View — v0.1.1
Generación de contenido HTML para UI.

### 🖼️ Vista: Home — v0.1.1
- Archivo: `home.view.js`
- Estado: ✅ Up
- Cambios:
  - Vista modular `renderHome()`
  - Formularios y scripts para interactuar con la API
  - Organización del HTML en secciones: usuarios, inventario, productos

---

## 🧩 Módulo: Services — v0.1.0
Lógica auxiliar reutilizable.

- Archivos:
  - `response.service.js`
  - `security.service.js`
  - `validation.service.js`
- Submódulo:
  - `/validation` — Utilidades de validación

---

✅ = Activo  
⬇️ = En espera / Incompleto  
🚧 = En desarrollo  

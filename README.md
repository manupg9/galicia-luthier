# 🎸 Galicia-Luthier

Tienda online de instrumentos artesanales elaborados en Galicia. Proyecto Final de Ciclo de Desarrollo de Aplicaciones Web.

## Tecnologías utilizadas

- React + Vite
- Firebase (Authentication, Firestore)
- Stripe (pagos)
- React Router DOM

## Instalación y ejecución

1. Clona el repositorio:
   git clone https://github.com/manupg9/galicia-luthier.git

2. Instala las dependencias:
   npm install

3. Inicia el servidor de desarrollo:
   npm run dev

4. Abre el navegador en http://localhost:5173

## Funcionalidades

- Registro y login con email/contraseña
- Email de confirmación al registrarse
- Catálogo de productos con filtros y paginación
- Detalle de producto
- Carrito de compra
- Favoritos
- Lista de deseos (productos sin stock)
- Proceso de pago con Stripe
- Panel de administración (CRUD de productos)

## Credenciales de prueba

- Admin: admin@galicialuthier.com
- Tarjeta de prueba Stripe: 4242 4242 4242 4242 | 12/29 | 123

## Estructura del proyecto

src/
├── components/   → Navbar
├── context/      → AuthContext, CartContext
├── pages/        → Todas las páginas
└── firebase.js   → Configuración de Firebase

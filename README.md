# 🏢 ERP Client Practice
 
> React + TypeScript frontend for a business management (ERP) system. Consumes a REST API to manage clients, suppliers, articles, and purchase/sales invoicing. Secured with Auth0.
 
![Status](https://img.shields.io/badge/status-completed%20%7C%20open%20to%20changes-brightgreen)
![Version](https://img.shields.io/badge/version-0.0.1-green)
 
---
 
## 📋 Table of Contents
 
- [Description](#-description)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [License](#-license)
- [Contact](#-contact)
 
---
 
## 📖 Description
 
ERP Client Practice is a single-page application (SPA) that serves as the frontend layer of an ERP system. It communicates with a REST API to perform full CRUD operations across the following business modules:
 
- **Clients** — manage customer records
- **Suppliers** — manage vendor information
- **Articles** — manage product/article catalogue
- **Purchase Invoices** — create and track incoming invoices
- **Sales Invoices** — create and track outgoing invoices
 
Authentication is handled via **Auth0**, protecting all routes and ensuring only authorized users can access the application.
 
---
 
## 🛠 Tech Stack
 
| Category       | Technology                                                                 |
|----------------|----------------------------------------------------------------------------|
| UI Library     | [React 18](https://react.dev/)                                             |
| Language       | [TypeScript](https://www.typescriptlang.org/)                              |
| Build Tool     | [Vite](https://vitejs.dev/)                                                |
| Styling        | [Tailwind CSS](https://tailwindcss.com/)                                   |
| Routing        | [React Router v7](https://reactrouter.com/)                                |
| Authentication | [Auth0 React SDK](https://auth0.com/docs/libraries/auth0-react)            |
 
---
 
## ✅ Prerequisites
 
- [Node.js](https://nodejs.org/) `>= 18.x`
- [npm](https://www.npmjs.com/) `>= 9.x`
- An [Auth0](https://auth0.com/) account with a configured Single Page Application
 
---
 
## 🚀 Installation
 
```bash
# 1. Clone the repository
git clone https://github.com/lucia-zurdo/ERP-Client-Practice.git
 
# 2. Navigate into the folder
cd ERP-Client-Practice
 
# 3. Install dependencies
npm install
 
# 4. Create a .env file and fill in your credentials (see Environment Variables section)
```
 
Then fill in your Auth0 credentials and API URL in the `.env` file (see [Environment Variables](#-environment-variables)).
 
---
 
## 💡 Usage
 
```bash
# Start in development mode
npm run dev
```
 
Open [http://localhost:5173](http://localhost:5173) in your browser. You will be redirected to the Auth0 login page on your first visit.
 
---
 
## 📁 Project Structure
 
```
src/
├── core/
│   ├── auth/          # Auth0 setup and auth utilities
│   ├── http/          # Axios/fetch base client and interceptors
│   └── router/        # Route definitions and protected route logic
├── modules/
│   ├── articulos/         # Articles module
│   ├── clientes/          # Clients module
│   ├── facturas-compra/   # Purchase invoices module
│   ├── facturas-venta/    # Sales invoices module
│   └── proveedores/       # Suppliers module
├── pages/
│   ├── Home.tsx
│   └── Unauthorized.tsx
├── shared/
│   ├── components/    # Reusable UI components
│   ├── constants/     # App-wide constants
│   ├── hooks/         # Custom React hooks
│   ├── styles/        # Global styles and Tailwind utilities
│   ├── types/         # Shared TypeScript interfaces and types
│   └── utils/         # Helper functions
├── App.tsx
├── main.tsx
└── index.css
```
 
---
 
## 🔐 Environment Variables
 
Create a `.env` file at the project root:
 
| Variable                        | Description                                | Required |
|---------------------------------|--------------------------------------------|:--------:|
| `VITE_AUTH0_DOMAIN`             | Your Auth0 domain                          | ✅       |
| `VITE_AUTH0_CLIENT_ID`          | Your Auth0 application client ID           | ✅       |
| `VITE_AUTH0_AUDIENCE`           | Auth0 API audience (for access tokens)     | ✅       |
| `VITE_API_BASE_URL`             | Base URL of the backend REST API           | ✅       |
 
> ⚠️ Never commit your `.env` file. Make sure it is listed in `.gitignore`.
 
---
 
## 📜 Available Scripts
 
| Script            | Description                              |
|-------------------|------------------------------------------|
| `npm run dev`     | Starts the Vite development server       |
| `npm run build`   | Type-checks and builds for production    |
| `npm run preview` | Previews the production build locally    |
 
---
 
## 📬 Contact
 
**Lucía Zurdo** — [@lucia-zurdo](https://github.com/lucia-zurdo) — [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/luc%C3%ADa-zurdo-928390370/)
 
🔗 Project link: [https://github.com/lucia-zurdo/ERP-Client-Practice](https://github.com/lucia-zurdo/ERP-Client-Practice)

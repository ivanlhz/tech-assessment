# Prueba Técnica - Sistema de Gestión de Usuarios

## 📋 Contexto y Requerimientos

Estamos desarrollando software para academias. Para estas la gestión de usuarios es primordial.
Las listas de usuarios son grandes y contienen muchísimos datos sobre el usuario,
por lo que deben ser muy performantes. En la prueba técnica deberás implementar la interfaz proporcionada y
usar los datos del JSON como base de datos, este JSON esta situado en la raíz del repositorio (DB.json)

Proporcionamos en este repositorio un boilerplate con un stack similar al utilizado en Ucademy, NestJS para el backend y React para
el frontend.

## 🔗 Enlaces

[Interfaz de usuario](https://www.figma.com/file/r1zwsMJU7IAsBJVuFLZHPK/Technical-Assessment?type=design&node-id=0%3A1&mode=design&t=tubwoMUyG8Lc4z9F-1)

- El uso de Styled components será valorado positivamente.

PD: El objetivo de la prueba es simplemente valorar las desiciones que toma el candidato a la hora de realizar la implementación. Hay muchas soluciones válidas a lo que aquí se plantea.

## 📦 Entrega

Una vez finalizada la prueba se deberá entregar en un archivo comprimido (zip, tar.gz, etc) con el nombre del candidato.

## 🏗️ Estructura del Proyecto

Este es un monorepo basado en **Nx** con la siguiente estructura:

```
tech-assessment/
├── apps/
│   ├── backend/          # API NestJS
│   │   ├── src/
│   │   │   ├── users/    # Módulo de usuarios
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   ├── .env.example  # Variables de entorno
│   │   └── project.json  # Configuración Nx
│   └── frontend/         # Aplicación React
│       ├── src/
│       │   ├── app/      # Componente principal
│       │   ├── components/ # Componentes UI (Atomic Design)
│       │   ├── core/     # Arquitectura limpia (casos de uso, repositorios)
│       │   ├── hooks/    # Custom hooks
│       │   ├── theme/    # Configuración de tema
│       │   └── utils/    # Utilidades
│       ├── index.html
│       └── vite.config.ts
├── DB.json              # Base de datos inicial
├── docker-compose.yml   # Configuración MongoDB
├── package.json         # Dependencias del workspace
└── nx.json             # Configuración Nx
```

## 🛠️ Tecnologías Utilizadas

### Backend
- **NestJS** - Framework Node.js
- **MongoDB** con **Mongoose** - Base de datos
- **Class Validator** - Validación de DTOs
- **Jest** - Testing

### Frontend
- **React 18** - Librería UI
- **TypeScript** - Tipado estático
- **Styled Components** - Estilos CSS-in-JS
- **React Query** - Gestión de estado servidor
- **React Hook Form** - Gestión de formularios
- **React Router** - Enrutado
- **Vitest** - Testing
- **Vite** - Build tool

### Herramientas de Desarrollo
- **Nx** - Monorepo y build system
- **ESLint** - Linting
- **Prettier** - Formateo de código
- **Docker** - Containerización

## 🚀 Comandos de Ejecución

### Instalar dependencias:
```bash
npm install
```

### Levantar la base de datos MongoDB:
```bash
docker-compose up -d
```

### Configurar las variables de entorno del backend:
```bash
cp apps/backend/.env.example apps/backend/.env
```

### Levantar el backend:
```bash
npm run start:backend
```
El backend estará disponible en `http://localhost:3000`

### Levantar el frontend:
```bash
npm run start:frontend
```
El frontend estará disponible en `http://localhost:4200`

### 🗄️ Estructura de la Base de Datos

La base de datos se inicializa automáticamente con los datos del archivo `DB.json` ubicado en la raíz del proyecto. Este archivo contiene una colección de usuarios con la siguiente estructura:

```json
{
  "_id": { "$oid": "..." },
  "name": "Nombre del usuario",
  "email": "email@ejemplo.com",
  "isActive": true,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### 🧪 Testing

El proyecto incluye tests unitarios y de integración:

- **Frontend**: Tests con Vitest y Testing Library
- **Backend**: Tests con Jest

```bash
# Ejecutar todos los tests
npm run test:frontend
npm run test:backend

# Tests en modo watch
nx test frontend --watch
nx test backend --watch
```
Aunque en la prueba tecnica no se explica explicitamente que el archivo DB.json son datos exportados de una base de datos MongoDB, al ver que este contenido oid, decidi crear un contenedor de MongoDB con el archivo DB.json importado.

## Paginación y Mejoras de Rendimiento en el Backend

Para optimizar la consulta de usuarios y asegurar que la aplicación sea escalable, se ha implementado una paginación en el endpoint `GET /users`. A continuación, se detallan las decisiones tomadas:

1.  **Paginación del Lado del Servidor:**
    - Se modificó el endpoint para que acepte los parámetros de consulta `page` y `limit` (ej: `/users?page=1&limit=10`).
    - Esto evita cargar la lista completa de usuarios en una sola petición, reduciendo el consumo de memoria y mejorando drásticamente los tiempos de respuesta, especialmente con grandes volúmenes de datos.

2.  **Indexación Automática con Timestamps:**
    - En el esquema de Mongoose para la entidad `User` (`user.entity.ts`), se ha añadido la opción `{ timestamps: true }`.
    - Esta configuración instruye a Mongoose para que añada y gestione automáticamente los campos `createdAt` y `updatedAt` en cada documento.
    - **Decisión Clave:** Mongoose, por defecto, crea un índice en el campo `createdAt`. Al ordenar los resultados de la paginación por este campo, nos beneficiamos de este índice, lo que resulta en consultas de ordenación mucho más rápidas y eficientes a nivel de base de datos.


## Arquitectura del Frontend (Core)

Para el frontend, se ha implementado una arquitectura limpia (`Clean Architecture`) en el directorio `apps/frontend/src/core`. El objetivo es separar la lógica de negocio de los detalles de la interfaz de usuario (UI) y de las fuentes de datos, logrando un código más mantenible, escalable y fácil de testear.

La estructura se divide en dos capas principales:

### 1. Capa de Dominio (`/domain`)

Esta capa es el corazón de la lógica de negocio y no tiene dependencias externas (no sabe nada de React, APIs, etc.).

- **`entities`**: Contiene las definiciones de las estructuras de datos principales de la aplicación (ej: `user.entity.ts`). Son objetos de negocio puros.
- **`repositories`**: Define las interfaces (`contratos`) que describen las operaciones que se pueden realizar con los datos (ej: `user.repository.ts`). No se preocupa de *cómo* se obtienen los datos, solo de *qué* operaciones existen.
- **`use-cases`**: Orquesta la lógica de negocio. Cada caso de uso representa una acción específica del usuario (ej: `get-users.use-case.ts`, `create-user.use-case.ts`). La UI solo interactuará con estos casos de uso.

### 2. Capa de Datos (`/data`)

Esta capa es la responsable de implementar los contratos definidos en el dominio y de gestionar las fuentes de datos.

- **`data-sources`**: Contiene la implementación concreta para acceder a los datos. En este caso, `user.api.datasource.ts` utiliza `axios` para comunicarse con la API REST del backend.
- **`mappers`**: Se encarga de transformar los datos que vienen de la API a las `entidades` del dominio, y viceversa. Esto desacopla nuestra aplicación de la estructura de datos de la API.
- **`repositories`**: Implementa las interfaces del repositorio del dominio (ej: `user.repository.impl.ts`), utilizando el `DataSource` y los `Mappers` para cumplir con el contrato.

### Flujo de Dependencias y Conexión (`dependencies.ts`)

El fichero `core/dependencies.ts` actúa como un inyector de dependencias simple. Crea una única instancia de las implementaciones de los repositorios y las "inyecta" en los casos de uso. Finalmente, exporta las instancias de los casos de uso para que puedan ser consumidos por la capa de UI (React, `React Query`) de una manera limpia y desacoplada.

Este enfoque asegura que la UI solo conozca los casos de uso, manteniendo la lógica de negocio y el acceso a datos completamente aislados.

## 🎨 Decisiones de Diseño e Implementación

### Simplificación de la Interfaz de Usuario

Se tomó la decisión de **simplificar el diseño original** para mejorar la experiencia de usuario y optimizar el flujo de trabajo:

- **Edición inline**: En lugar de tener modales separados para ver y editar usuarios, se implementó un sistema donde al hacer clic en una fila de la tabla, se permite **modificar el usuario directamente** mientras se visualizan sus datos.
- **Flujo unificado**: Esta decisión elimina la necesidad de múltiples ventanas modales y reduce la fricción en el proceso de edición de usuarios.
- **Mejor UX**: Los usuarios pueden ver y editar la información de forma más fluida y natural.

### Navegación y Estructura

- **Barra lateral expandida**: Se agregó un **elemento adicional a la barra lateral** para implementar un sistema de navegación más robusto.
- **Preparación para escalabilidad**: Esta decisión prepara la aplicación para futuras funcionalidades y secciones adicionales.

### Limitaciones por Tiempo

Debido a las restricciones temporales del proyecto, se tomaron las siguientes decisiones pragmáticas:

1. **Testing parcial**: 
   - No se implementaron tests para toda la aplicación
   - Se priorizaron los tests más críticos (componentes base y lógica de negocio)
   - Los tests existentes cubren las funcionalidades principales

2. **Custom Hooks**: 
   - No se crearon custom hooks específicos para encapsular la lógica de componentes
   - La lógica se mantuvo directamente en los componentes por simplicidad
   - Esta decisión permite un desarrollo más rápido aunque sacrifica algo de reutilización

3. **Enfoque MVP**: 
   - Se priorizó entregar una aplicación funcional y bien estructurada
   - Las optimizaciones y refactorizaciones avanzadas se dejaron para iteraciones futuras

### Justificación Técnica

Estas decisiones se basaron en:
- **Tiempo disponible** para la prueba técnica
- **Priorización de funcionalidades core** sobre optimizaciones avanzadas
- **Equilibrio entre calidad de código y entrega funcional**
- **Experiencia de usuario** como factor principal en las decisiones de diseño

## 🔧 Configuración del Entorno

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm
- Docker y Docker Compose

### Configuración Inicial

**Requisitos:**
- Tener [Docker](https://www.docker.com/get-started/) instalado y en ejecución en tu sistema.

**Pasos:**

1.  **Instalar dependencias:**

    ```bash
    npm install
    ```

2.  **Configurar las variables de entorno:**
    En el directorio `apps/backend`, encontrarás un archivo llamado `.env.example`. Crea una copia de este archivo en el mismo directorio y renómbrala a `.env`.

    ```bash
    # Desde la raíz del proyecto, puedes usar este comando:
    cp apps/backend/.env.example apps/backend/.env
    ```
    Este archivo contiene la cadena de conexión a la base de datos y es ignorado por Git por seguridad.

3.  **Iniciar el contenedor de la base de datos:**
    Abre una terminal en la raíz del proyecto y ejecuta el siguiente comando:

    ```bash
    docker-compose up -d
    ```
    Este comando leerá el archivo `docker-compose.yml`, descargará la imagen de MongoDB (solo la primera vez) e iniciará el contenedor. Además, ejecutará un script para importar automáticamente los datos del archivo `DB.json` a la base de datos.

4.  **Iniciar los servicios:**
    Una vez que el contenedor esté en funcionamiento, puedes iniciar el backend y el frontend.

    ```bash
    # Iniciar el backend
    npm run start:backend
    ```

    ```bash
    # Iniciar el frontend
    npm run start:frontend
    ```


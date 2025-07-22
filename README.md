# Prueba técnica

## Contexto y requerimientos:

Estamos desarrollando software para academias. Para estas la gestión de usuarios es primordial.
Las listas de usuarios son grandes y contienen muchísimos datos sobre el usuario,
por lo que deben ser muy performantes. En la prueba técnica deberás implementar la interfaz proporcionada y
usar los datos del JSON como base de datos, este JSON esta situado en la raíz del repositorio (DB.json)

Proporcionamos en este repositorio un boilerplate con un stack similar al utilizado en Ucademy, NestJS para el backend y React para
el frontend.

## Enlaces:

[Interfaz de usuario](https://www.figma.com/file/r1zwsMJU7IAsBJVuFLZHPK/Technical-Assessment?type=design&node-id=0%3A1&mode=design&t=tubwoMUyG8Lc4z9F-1)

- El uso de Styled components será valorado positivamente.

PD: El objetivo de la prueba es simplemente valorar las desiciones que toma el candidato a la hora de realizar la implementación. Hay muchas soluciones válidas a lo que aquí se plantea.

## Entrega:

Una vez finalizada la prueba se deberá entregar en un archivo comprimido (zip, tar.gz, etc) con el nombre del candidato.

# Notas del candidato:
Estas son las notas de Ivan Llorente sobre la prueba técnica y del porque de ciertas decisiones.

## Sobre DOCKER y la Base de Datos
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

### Cómo levantar el entorno

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


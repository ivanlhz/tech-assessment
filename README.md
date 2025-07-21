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

A continuacion se explica el proceso de creacion del contenedor de MongoDB para que pueda ser utilizado en el proyecto de manera local:

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


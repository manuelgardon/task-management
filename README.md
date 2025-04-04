# Task Management API

API REST para gestión de tareas, desarrollada con **NestJS**, **TypeORM**, y **SQLite**. Incluye autenticación JWT, paginación, y soporte para poblar tareas desde una API externa.

## Requisitos Previos
- Node.js (v20.x o superior)
- npm (v10.x o superior)
- Docker (opcional, para contenedores)
- Postman (para pruebas)

## Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/manuelgardon/task-management.git
   cd task-management
   ```

2. **Instalar dependencias**:

    ```bash
    npm install
    ```

3. **Configurar variables de entorno:**

    Crea un archivo .env en la raíz con:
    
    - **PORT**=3000
    
    - **JWT_SECRET**=mySecretKey

4. **Iniciar la aplicación:**
    ```bash
      npm run start:dev
      ```

    La API estará disponible en http://localhost:3000.

5. **(Opcional) Usar Docker:**

      ```bash
        docker-compose up --build
      ```

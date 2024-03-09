# Library Management System

### Project Links
- [Frontend](https://library-management-system-drab.vercel.app)
- [API](https://library-management-system-crh5.onrender.com)

### Overview
- This project creates a library management system where the librarian can import books, add users, issue books, view analytics and more.

## How to Run this Project ?
### Mandatory Steps
1. Ensure you have a MYSQL instance (Local/Remote) running.
2. Use the provided `db-setup.sql` script to set up the db, tables and a few sample members.
3. Configure environment variables for the API/server:
   - Create a `.env` file in the server folder.
   - Refer to `.env.local.bak` and fill in required values for:
     - DATABASE_URI - the connection string for MYSQL. Replace "mysql://..." with "mysql+pymysql://..."
4. Configure environment variables for the client:
   - Create a `.env` file in the client folder.
   - Set `VITE_BASEAPI_URL` equal to the URL of the API.
5. Proceed to any of the deployment options below.

- ### Locally using Docker Compose
    Prerequisites:
  - Docker engine installed and running
  - Steps:
    - Navigate to the root folder.
    - Configure host ports if required.
    - Execute the following command:
        ``` bash
        docker-compose -f "docker-compose.yaml" up -d --build
        ```

- ### Locally using npm and python
  - Refer Readme's in `client` and `server` folder respectively

<details>
  <summary>Screenshots</summary>
</details>

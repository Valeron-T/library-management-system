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

## Screenshots

<details>
  <summary>Click to View</summary>
   
   ![Screenshot 2024-03-09 225936](https://github.com/Valeron-T/library-management-system/assets/32789691/2155b8d8-2ffe-485a-a8bc-c979fa008dbd)
   ![Screenshot 2024-03-09 225945](https://github.com/Valeron-T/library-management-system/assets/32789691/64383062-5064-44a0-95c5-132e0c9080c3)
   ![Screenshot 2024-03-09 230000](https://github.com/Valeron-T/library-management-system/assets/32789691/3b321d73-6b90-4e77-afd7-5296a51006de)
   ![Screenshot 2024-03-09 225953](https://github.com/Valeron-T/library-management-system/assets/32789691/9963fb6b-fe28-4d3b-85ee-509f854b5f87)
   ![Screenshot 2024-03-09 230024](https://github.com/Valeron-T/library-management-system/assets/32789691/71828749-6492-4585-a32c-bf9573fe495b)
   ![Screenshot 2024-03-09 230440](https://github.com/Valeron-T/library-management-system/assets/32789691/0c43d081-bbc1-4d28-9c11-faa0878b4fc6)
   ![Screenshot 2024-03-09 230449](https://github.com/Valeron-T/library-management-system/assets/32789691/18a3411f-bc2f-4479-a361-7b9bfbd233f5)
   ![Screenshot 2024-03-09 230534](https://github.com/Valeron-T/library-management-system/assets/32789691/0ee5d46f-2c05-4069-9b17-9ece7b4f9835)
   ![Screenshot 2024-03-09 230625](https://github.com/Valeron-T/library-management-system/assets/32789691/77e5c8c9-9237-449a-98fa-3d188dc9e771)

   <img src="https://github.com/Valeron-T/library-management-system/assets/32789691/a38f2505-a9bb-4833-b937-2582c85b985b" width="30%" >

</details>

# Blog API

A RESTful API for managing blog posts and users, built with NestJS and PostgreSQL. 
This API supports CRUD operations for articles and users, complete with authentication, authorization, and error handling.

## Features
- <p align="left"><strong> Authentication & Authorization: </strong> Sign up and login. JWT-based authentication with role-based access control</p>
- <p align="left"><strong> User Roles: </strong>Users and Admins with different access permissions.</p>
- <p align="left"><strong> CRUD Operations: </strong>Full CRUD for articles and users.</p>
- <p align="left"><strong> Validations: </strong>Input validation for all API requests to ensure data integrity.</p>
- <p align="left"><strong> Error Handling: </strong>Comprehensive error handling with descriptive messages.</p>

## Technologies Used
- <p align="left"><strong> Backend: </strong>NestJS, NodeJS</p>
- <p align="left"><strong> Database: </strong>PostgreSQL, TypeORM</p>
- <p align="left"><strong>Authentication: </strong>JSON Web Tokens (JWT), Passport Strategy.</p>

## Run
  To run this project locally, follow these steps:
  
    git clone https://github.com/Mostafamaag/blog-api-nestjs
    cd blog-api-nestjs
    npm install

  Create a .env file in the root directory and add the following:

    DB_HOST = 'your-database-host'
    DB_DATABASE = 'database-nestjs'
    DB_USERNAME ='database-user'
    DB_PASSWORD ='database-password'
    DB_PORT = 3000
    JWT_SECRET = 'secret'


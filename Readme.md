# Inventory Management System

An API built with Express and PostgreSQL for managing customers within an inventory system. This application allows you to create, read, update, and delete (CRUD) customer information.

## Features

- Add new customers
- Retrieve all customers
- Retrieve a customer by ID
- Update customer information
- Delete a customer

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- pg (node-postgres) for PostgreSQL connection
- dotenv for environment variable management

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/No-bodyq/Inventory-Management-System.git
   cd inventory-system
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup the postgres database**
   _Run the SQL commands in schema.sql_

4. **Configure environment variables**
   Create a .env file in the project root directory with the following variables:

   ```makefile
    DB_USER=your_db_user
    DB_HOST=localhost
    DB_NAME=your_db_name
    DB_PASS=your_db_password
    DB_PORT=5432
    PORT=3000
   ```

5. **Running the Application**

   ```bash
    npm start
   ```

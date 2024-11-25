CREATE DATABASE inventory

-- Create Users Table
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Create Categories Table
CREATE TABLE Categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Create Suppliers Table
CREATE TABLE Suppliers (
    supplier_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255),
    phone VARCHAR(20),
    email VARCHAR(255),
    address TEXT
);

-- Create Products Table
CREATE TABLE Products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category_id INT REFERENCES Categories(category_id) ON DELETE SET NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT DEFAULT 0,
    supplier_id INT REFERENCES Suppliers(supplier_id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Customers Table
CREATE TABLE Customers (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Orders Table
CREATE TABLE Orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES Customers(customer_id) ON DELETE SET NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'Pending'
);

-- Create Order_Items Table
CREATE TABLE Order_Items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES Orders(order_id) ON DELETE CASCADE,
    product_id INT REFERENCES Products(product_id) ON DELETE SET NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL
);

-- Create Inventory_Movements Table
CREATE TABLE Inventory_Movements (
    movement_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES Products(product_id) ON DELETE CASCADE,
    movement_type VARCHAR(3) CHECK (movement_type IN ('IN', 'OUT')) NOT NULL,
    quantity INT NOT NULL,
    movement_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    remarks TEXT
);

-- Insert categories
INSERT INTO Categories (name, description) VALUES 
    ('Electronics', 'Electronic items and gadgets'),
    ('Furniture', 'Household furniture');

-- Insert suppliers
INSERT INTO Suppliers (name, contact_name, phone, email, address) VALUES 
    ('TechSupplier', 'Alice Smith', '123456789', 'alice@techsupplier.com', '123 Tech Street'),
    ('FurnitureCo', 'Bob Brown', '987654321', 'bob@furnitureco.com', '456 Furniture Ave');

-- Insert products
INSERT INTO Products (name, description, category_id, price, quantity, supplier_id) VALUES 
    ('Laptop', 'High-performance laptop', 1, 1500.00, 10, 1),
    ('Office Chair', 'Ergonomic office chair', 2, 120.00, 20, 2);

-- Insert a customer
INSERT INTO Customers (name, email, phone, address) VALUES 
    ('John Doe', 'john@example.com', '1112223333', '789 Customer Blvd');

-- Insert an order
INSERT INTO Orders (customer_id, status) VALUES 
    (1, 'Completed');

-- Insert order items
INSERT INTO Order_Items (order_id, product_id, quantity, unit_price) VALUES 
    (1, 1, 1, 1500.00);

-- Insert inventory movements
INSERT INTO Inventory_Movements (product_id, movement_type, quantity, remarks) VALUES 
    (1, 'OUT', 1, 'Sold 1 unit in order #1');

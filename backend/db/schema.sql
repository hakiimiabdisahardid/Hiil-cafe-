-- HIIL CAFE — Core Database Schema (MySQL 8+)
-- Covers the operational core: menu, tables, orders, reservations, users.
-- Extend with inventory/employees/loyalty tables following the same pattern.

CREATE DATABASE IF NOT EXISTS hiil_cafe CHARACTER SET utf8mb4;


CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin','manager','cashier','waiter','chef','kitchen') NOT NULL DEFAULT 'waiter',
  status ENUM('on_shift','off') DEFAULT 'off',
  phone VARCHAR(40),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  category VARCHAR(80) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url VARCHAR(500),
  is_popular BOOLEAN DEFAULT FALSE,
  is_new BOOLEAN DEFAULT FALSE,
  discount_percent DECIMAL(5,2) DEFAULT 0,
  is_available BOOLEAN DEFAULT TRUE,
  rating DECIMAL(2,1) DEFAULT 5.0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE restaurant_tables (
  id INT AUTO_INCREMENT PRIMARY KEY,
  number INT NOT NULL UNIQUE,
  area VARCHAR(60) DEFAULT 'Main Hall',
  status ENUM('available','occupied','reserved','cleaning') DEFAULT 'available',
  qr_code VARCHAR(255)
);

CREATE TABLE customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(40) UNIQUE,
  email VARCHAR(160),
  loyalty_points INT DEFAULT 0,
  status VARCHAR(40) DEFAULT 'Member',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_no VARCHAR(30) UNIQUE NOT NULL,
  table_id INT,
  customer_id INT NULL,
  status ENUM('New','Preparing','Ready','Served','Cancelled') DEFAULT 'New',
  subtotal DECIMAL(10,2) NOT NULL,
  tax DECIMAL(10,2) NOT NULL DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (table_id) REFERENCES restaurant_tables(id),
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  menu_item_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

CREATE TABLE reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(120) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  guests INT NOT NULL DEFAULT 2,
  area VARCHAR(60) DEFAULT 'Main Hall',
  notes TEXT,
  status ENUM('confirmed','cancelled','completed') DEFAULT 'confirmed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  unit VARCHAR(20) NOT NULL,
  quantity DECIMAL(10,2) NOT NULL DEFAULT 0,
  min_quantity DECIMAL(10,2) NOT NULL DEFAULT 0,
  supplier VARCHAR(150),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  role ENUM('manager','cashier','waiter','chef','kitchen') NOT NULL,
  phone VARCHAR(40),
  status ENUM('on_shift','off') DEFAULT 'off',
  salary DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE discounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  type ENUM('percentage','fixed') DEFAULT 'percentage',
  value DECIMAL(10,2) NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  starts_at DATE NULL,
  ends_at DATE NULL
);

-- seed a few rows so the API returns real data immediately
INSERT INTO restaurant_tables (number, area) VALUES (1,'Main Hall'),(2,'Main Hall'),(3,'VIP'),(4,'Family');
INSERT INTO menu_items (name, category, description, price, image_url, is_popular)
VALUES ('Golden Saffron Latte','Coffee','Espresso, steamed milk, saffron, honey.',4.50,'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800', TRUE),
       ('Smoked Beef Burger','Burger','Charred patty, smoked gouda, brioche bun.',9.50,'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800', TRUE);

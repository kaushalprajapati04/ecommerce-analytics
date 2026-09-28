/* =========================================================
   E-COMMERCE ANALYTICS SQL PROJECT
   Complete Updated Script
   ========================================================= */


/* =========================================================
   1. CREATE DATABASE
   ========================================================= */

DROP DATABASE IF EXISTS ecommerce_analytics;

CREATE DATABASE ecommerce_analytics;

USE ecommerce_analytics;


/* =========================================================
   2. CREATE TABLES
   ========================================================= */


/* -------------------------
   CATEGORIES
   ------------------------- */

CREATE TABLE categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255)
);


/* -------------------------
   SUPPLIERS
   ------------------------- */

CREATE TABLE suppliers (
    supplier_id INT PRIMARY KEY AUTO_INCREMENT,
    supplier_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    city VARCHAR(100),
    state VARCHAR(100)
);


/* -------------------------
   PRODUCTS
   ------------------------- */

CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(150) NOT NULL,
    category_id INT NOT NULL,
    supplier_id INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    created_at DATE,

    FOREIGN KEY (category_id)
        REFERENCES categories(category_id),

    FOREIGN KEY (supplier_id)
        REFERENCES suppliers(supplier_id)
);


/* -------------------------
   CUSTOMERS
   ------------------------- */

CREATE TABLE customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(15),
    city VARCHAR(100),
    state VARCHAR(100),
    registration_date DATE
);


/* -------------------------
   ORDERS
   ------------------------- */

CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    order_date DATETIME NOT NULL,
    status VARCHAR(30) DEFAULT 'Pending',
    total_amount DECIMAL(10,2) DEFAULT 0.00,

    FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id)
);


/* -------------------------
   ORDER ITEMS
   ------------------------- */

CREATE TABLE order_items (
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (order_id)
        REFERENCES orders(order_id)
        ON DELETE CASCADE,

    FOREIGN KEY (product_id)
        REFERENCES products(product_id)
);


/* -------------------------
   PAYMENTS
   ------------------------- */

CREATE TABLE payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    payment_status VARCHAR(30) NOT NULL,
    payment_date DATETIME,
    amount DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (order_id)
        REFERENCES orders(order_id)
        ON DELETE CASCADE
);


/* -------------------------
   REVIEWS
   ------------------------- */

CREATE TABLE reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    rating INT NOT NULL,
    review_text VARCHAR(500),
    review_date DATE,

    FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id)
        ON DELETE CASCADE,

    FOREIGN KEY (product_id)
        REFERENCES products(product_id)
        ON DELETE CASCADE,

    CHECK (rating BETWEEN 1 AND 5)
);


/* =========================================================
   3. INSERT CATEGORIES
   ========================================================= */

INSERT INTO categories
(category_name, description)
VALUES
('Electronics', 'Electronic devices and accessories'),
('Clothing', 'Fashion and apparel'),
('Home & Kitchen', 'Home appliances and kitchen products'),
('Books', 'Books and educational materials'),
('Sports', 'Sports and fitness products'),
('Beauty', 'Beauty and personal care products'),
('Grocery', 'Daily grocery and food products'),
('Toys', 'Toys and games for children');


/* =========================================================
   4. INSERT SUPPLIERS
   ========================================================= */

INSERT INTO suppliers
(supplier_name, email, city, state)
VALUES
('TechWorld India', 'techworld@gmail.com', 'Delhi', 'Delhi'),
('FashionHub', 'fashionhub@gmail.com', 'Mumbai', 'Maharashtra'),
('HomeNeeds Pvt Ltd', 'homeneeds@gmail.com', 'Pune', 'Maharashtra'),
('BookMart India', 'bookmart@gmail.com', 'Bengaluru', 'Karnataka'),
('FitLife Supplies', 'fitlife@gmail.com', 'Hyderabad', 'Telangana'),
('GlowCare Ltd', 'glowcare@gmail.com', 'Chennai', 'Tamil Nadu'),
('FreshBasket', 'freshbasket@gmail.com', 'Lucknow', 'Uttar Pradesh'),
('FunZone Toys', 'funzone@gmail.com', 'Jaipur', 'Rajasthan');


/* =========================================================
   5. INSERT PRODUCTS
   ========================================================= */

INSERT INTO products
(product_name, category_id, supplier_id, price, stock_quantity, created_at)
VALUES

/* Electronics */
('Wireless Bluetooth Headphones', 1, 1, 2499.00, 50, '2026-01-10'),
('Smartphone 5G', 1, 1, 24999.00, 30, '2026-01-15'),
('Wireless Mouse', 1, 1, 899.00, 100, '2026-01-20'),
('Mechanical Keyboard', 1, 1, 3499.00, 60, '2026-02-01'),

/* Clothing */
('Men Cotton T-Shirt', 2, 2, 799.00, 120, '2026-01-12'),
('Women Denim Jacket', 2, 2, 1999.00, 70, '2026-01-18'),
('Running Shoes', 2, 2, 2999.00, 80, '2026-02-05'),
('Formal Shirt', 2, 2, 1299.00, 90, '2026-02-10'),

/* Home & Kitchen */
('Non Stick Cookware Set', 3, 3, 2499.00, 40, '2026-01-08'),
('Electric Kettle', 3, 3, 1499.00, 60, '2026-01-22'),
('Mixer Grinder', 3, 3, 3299.00, 35, '2026-02-02'),
('Air Fryer', 3, 3, 5999.00, 25, '2026-02-12'),

/* Books */
('Clean Code', 4, 4, 599.00, 100, '2026-01-05'),
('The Pragmatic Programmer', 4, 4, 699.00, 80, '2026-01-25'),
('Introduction to Algorithms', 4, 4, 899.00, 50, '2026-02-05'),
('Database System Concepts', 4, 4, 749.00, 60, '2026-02-15'),

/* Sports */
('Yoga Mat', 5, 5, 699.00, 100, '2026-01-10'),
('Dumbbell Set', 5, 5, 1999.00, 50, '2026-01-20'),
('Cricket Bat', 5, 5, 2499.00, 40, '2026-02-01'),
('Football', 5, 5, 999.00, 70, '2026-02-10'),

/* Beauty */
('Face Wash', 6, 6, 399.00, 150, '2026-01-05'),
('Moisturizer', 6, 6, 599.00, 120, '2026-01-15'),
('Sunscreen SPF 50', 6, 6, 699.00, 100, '2026-02-01'),
('Perfume', 6, 6, 1499.00, 60, '2026-02-12'),

/* Grocery */
('Organic Rice 5kg', 7, 7, 499.00, 200, '2026-01-03'),
('Cooking Oil 5L', 7, 7, 799.00, 150, '2026-01-12'),
('Premium Tea 1kg', 7, 7, 449.00, 180, '2026-02-02'),
('Coffee Powder 500g', 7, 7, 399.00, 160, '2026-02-15'),

/* Toys */
('Remote Control Car', 8, 8, 1299.00, 70, '2026-01-08'),
('Building Blocks Set', 8, 8, 999.00, 100, '2026-01-18'),
('Board Game', 8, 8, 799.00, 80, '2026-02-03'),
('Educational Puzzle', 8, 8, 599.00, 90, '2026-02-14');


/* =========================================================
   6. INSERT CUSTOMERS
   ========================================================= */

INSERT INTO customers
(first_name, last_name, email, phone, city, state, registration_date)
VALUES
('Aarav', 'Sharma', 'aarav.sharma@gmail.com', '9876543210', 'Delhi', 'Delhi', '2026-01-05'),
('Priya', 'Verma', 'priya.verma@gmail.com', '9876543211', 'Mumbai', 'Maharashtra', '2026-01-08'),
('Rahul', 'Kumar', 'rahul.kumar@gmail.com', '9876543212', 'Lucknow', 'Uttar Pradesh', '2026-01-10'),
('Ananya', 'Singh', 'ananya.singh@gmail.com', '9876543213', 'Pune', 'Maharashtra', '2026-01-12'),
('Rohan', 'Gupta', 'rohan.gupta@gmail.com', '9876543214', 'Jaipur', 'Rajasthan', '2026-01-15'),
('Sneha', 'Patel', 'sneha.patel@gmail.com', '9876543215', 'Ahmedabad', 'Gujarat', '2026-01-18'),
('Vivek', 'Yadav', 'vivek.yadav@gmail.com', '9876543216', 'Mathura', 'Uttar Pradesh', '2026-01-20'),
('Neha', 'Sharma', 'neha.sharma@gmail.com', '9876543217', 'Bengaluru', 'Karnataka', '2026-01-22'),
('Aditya', 'Mehta', 'aditya.mehta@gmail.com', '9876543218', 'Hyderabad', 'Telangana', '2026-01-25'),
('Pooja', 'Agarwal', 'pooja.agarwal@gmail.com', '9876543219', 'Chennai', 'Tamil Nadu', '2026-01-28'),
('Karan', 'Malhotra', 'karan.malhotra@gmail.com', '9876543220', 'Delhi', 'Delhi', '2026-02-01'),
('Isha', 'Mishra', 'isha.mishra@gmail.com', '9876543221', 'Kanpur', 'Uttar Pradesh', '2026-02-03'),
('Arjun', 'Reddy', 'arjun.reddy@gmail.com', '9876543222', 'Hyderabad', 'Telangana', '2026-02-05'),
('Simran', 'Kaur', 'simran.kaur@gmail.com', '9876543223', 'Chandigarh', 'Chandigarh', '2026-02-08'),
('Nikhil', 'Joshi', 'nikhil.joshi@gmail.com', '9876543224', 'Indore', 'Madhya Pradesh', '2026-02-10'),
('Kavya', 'Iyer', 'kavya.iyer@gmail.com', '9876543225', 'Bengaluru', 'Karnataka', '2026-02-12'),
('Manish', 'Tiwari', 'manish.tiwari@gmail.com', '9876543226', 'Prayagraj', 'Uttar Pradesh', '2026-02-15'),
('Riya', 'Kapoor', 'riya.kapoor@gmail.com', '9876543227', 'Mumbai', 'Maharashtra', '2026-02-18'),
('Sahil', 'Bansal', 'sahil.bansal@gmail.com', '9876543228', 'Noida', 'Uttar Pradesh', '2026-02-20'),
('Tanvi', 'Shah', 'tanvi.shah@gmail.com', '9876543229', 'Surat', 'Gujarat', '2026-02-22');


/* =========================================================
   7. INSERT ORDERS
   ========================================================= */

INSERT INTO orders
(customer_id, order_date, status, total_amount)
VALUES
(1,  '2026-01-05 10:30:00', 'Delivered', 2499.00),
(2,  '2026-01-07 14:15:00', 'Delivered', 1598.00),
(3,  '2026-01-10 09:45:00', 'Shipped', 3299.00),
(4,  '2026-01-12 18:20:00', 'Delivered', 899.00),
(5,  '2026-01-15 11:10:00', 'Processing', 4298.00),
(6,  '2026-01-18 16:40:00', 'Delivered', 1299.00),
(7,  '2026-01-20 13:25:00', 'Pending', 999.00),
(8,  '2026-01-22 19:05:00', 'Delivered', 2698.00),
(9,  '2026-01-25 10:15:00', 'Shipped', 3499.00),
(10, '2026-01-28 15:30:00', 'Delivered', 999.00),
(11, '2026-02-02 12:10:00', 'Delivered', 2799.00),
(12, '2026-02-05 17:45:00', 'Cancelled', 1899.00),
(13, '2026-02-08 09:20:00', 'Delivered', 5499.00),
(14, '2026-02-10 14:50:00', 'Processing', 1499.00),
(15, '2026-02-13 20:10:00', 'Delivered', 2299.00),
(16, '2026-02-16 11:35:00', 'Shipped', 3799.00),
(17, '2026-02-19 16:25:00', 'Delivered', 699.00),
(18, '2026-02-22 13:40:00', 'Pending', 3199.00),
(19, '2026-02-25 18:15:00', 'Delivered', 2599.00),
(20, '2026-02-28 10:05:00', 'Delivered', 1199.00);


/* =========================================================
   8. INSERT ORDER ITEMS
   ========================================================= */

INSERT INTO order_items
(order_id, product_id, quantity, unit_price)
VALUES

/* Order 1 = 2499 */
(1, 1, 1, 2499.00),

/* Order 2 = 1598 */
(2, 5, 2, 799.00),

/* Order 3 = 3299 */
(3, 11, 1, 3299.00),

/* Order 4 = 899 */
(4, 3, 1, 899.00),

/* Order 5 = 4298 */
(5, 6, 1, 1999.00),
(5, 10, 1, 1499.00),
(5, 21, 2, 400.00),

/* Order 6 = 1299 */
(6, 8, 1, 1299.00),

/* Order 7 = 999 */
(7, 20, 1, 999.00),

/* Order 8 = 2698 */
(8, 29, 1, 1299.00),
(8, 30, 1, 999.00),
(8, 32, 1, 400.00),

/* Order 9 = 3499 */
(9, 4, 1, 3499.00),

/* Order 10 = 999 */
(10, 20, 1, 999.00),

/* Order 11 = 2799 */
(11, 18, 1, 1999.00),
(11, 17, 1, 699.00),
(11, 21, 1, 101.00),

/* Order 12 = 1899 */
(12, 14, 1, 699.00),
(12, 15, 1, 899.00),
(12, 21, 1, 301.00),

/* Order 13 = 5499 */
(13, 12, 1, 5499.00),

/* Order 14 = 1499 */
(14, 10, 1, 1499.00),

/* Order 15 = 2299 */
(15, 9, 1, 2299.00),

/* Order 16 = 3799 */
(16, 7, 1, 2999.00),
(16, 5, 1, 800.00),

/* Order 17 = 699 */
(17, 17, 1, 699.00),

/* Order 18 = 3199 */
(18, 2, 1, 24999.00 / 8),

/* Order 19 = 2599 */
(19, 19, 1, 2499.00),
(19, 21, 1, 100.00),

/* Order 20 = 1199 */
(20, 16, 1, 749.00),
(20, 13, 1, 450.00);


/* =========================================================
   9. INSERT PAYMENTS
   ========================================================= */

INSERT INTO payments
(order_id, payment_method, payment_status, payment_date, amount)
VALUES
(1, 'UPI', 'Paid', '2026-01-05 10:35:00', 2499.00),
(2, 'Credit Card', 'Paid', '2026-01-07 14:20:00', 1598.00),
(3, 'UPI', 'Paid', '2026-01-10 09:50:00', 3299.00),
(4, 'Cash on Delivery', 'Paid', '2026-01-12 18:25:00', 899.00),
(5, 'Debit Card', 'Paid', '2026-01-15 11:15:00', 4298.00),
(6, 'UPI', 'Paid', '2026-01-18 16:45:00', 1299.00),
(7, 'Cash on Delivery', 'Pending', '2026-01-20 13:30:00', 999.00),
(8, 'Credit Card', 'Paid', '2026-01-22 19:10:00', 2698.00),
(9, 'UPI', 'Paid', '2026-01-25 10:20:00', 3499.00),
(10, 'Debit Card', 'Paid', '2026-01-28 15:35:00', 999.00),
(11, 'UPI', 'Paid', '2026-02-02 12:15:00', 2799.00),
(12, 'Credit Card', 'Refunded', '2026-02-05 17:50:00', 1899.00),
(13, 'UPI', 'Paid', '2026-02-08 09:25:00', 5499.00),
(14, 'Debit Card', 'Paid', '2026-02-10 14:55:00', 1499.00),
(15, 'UPI', 'Paid', '2026-02-13 20:15:00', 2299.00),
(16, 'Credit Card', 'Paid', '2026-02-16 11:40:00', 3799.00),
(17, 'UPI', 'Paid', '2026-02-19 16:30:00', 699.00),
(18, 'Cash on Delivery', 'Pending', '2026-02-22 13:45:00', 3199.00),
(19, 'Debit Card', 'Paid', '2026-02-25 18:20:00', 2599.00),
(20, 'UPI', 'Paid', '2026-02-28 10:10:00', 1199.00);


/* =========================================================
   10. INSERT REVIEWS
   ========================================================= */

INSERT INTO reviews
(customer_id, product_id, rating, review_text, review_date)
VALUES
(1, 1, 5, 'Excellent sound quality and comfortable.', '2026-01-10'),
(2, 5, 4, 'Good quality cotton material.', '2026-01-12'),
(3, 11, 5, 'Powerful mixer and works well.', '2026-01-15'),
(4, 3, 4, 'Smooth and responsive mouse.', '2026-01-18'),
(5, 6, 5, 'Very good jacket quality.', '2026-01-20'),
(6, 8, 4, 'Good formal shirt.', '2026-01-22'),
(8, 29, 5, 'Kids really enjoyed this car.', '2026-01-28'),
(9, 4, 5, 'Excellent mechanical keyboard.', '2026-02-01'),
(10, 20, 4, 'Good football for the price.', '2026-02-02'),
(11, 18, 5, 'Very useful dumbbell set.', '2026-02-05'),
(13, 12, 5, 'Air fryer works perfectly.', '2026-02-10'),
(15, 14, 5, 'Great programming book.', '2026-02-15'),
(16, 7, 4, 'Comfortable running shoes.', '2026-02-18'),
(17, 17, 4, 'Good quality yoga mat.', '2026-02-20'),
(18, 22, 5, 'Moisturizer is very good.', '2026-02-22'),
(19, 25, 4, 'Good quality organic rice.', '2026-02-25');


/* =========================================================
   11. UPDATE ORDER TOTALS FROM ORDER ITEMS
   ========================================================= */

UPDATE orders o
JOIN (
    SELECT
        order_id,
        SUM(quantity * unit_price) AS calculated_total
    FROM order_items
    GROUP BY order_id
) oi
ON o.order_id = oi.order_id
SET o.total_amount = oi.calculated_total;


/* =========================================================
   12. BASIC VERIFICATION
   ========================================================= */

SELECT COUNT(*) AS total_categories
FROM categories;

SELECT COUNT(*) AS total_suppliers
FROM suppliers;

SELECT COUNT(*) AS total_products
FROM products;

SELECT COUNT(*) AS total_customers
FROM customers;

SELECT COUNT(*) AS total_orders
FROM orders;

SELECT COUNT(*) AS total_order_items
FROM order_items;

SELECT COUNT(*) AS total_payments
FROM payments;

SELECT COUNT(*) AS total_reviews
FROM reviews;


/* =========================================================
   13. DISPLAY ALL TABLES
   ========================================================= */

SELECT * FROM categories;

SELECT * FROM suppliers;

SELECT * FROM products;

SELECT * FROM customers;

SELECT * FROM orders;

SELECT * FROM order_items;

SELECT * FROM payments;

SELECT * FROM reviews;


/* =========================================================
   14. E-COMMERCE ANALYTICS QUERIES
   ========================================================= */


/* Total Revenue */

SELECT
    SUM(total_amount) AS total_revenue
FROM orders
WHERE status <> 'Cancelled';


/* Average Order Value */

SELECT
    ROUND(AVG(total_amount), 2) AS average_order_value
FROM orders
WHERE status <> 'Cancelled';


/* Minimum Order Value */

SELECT
    MIN(total_amount) AS minimum_order_value
FROM orders
WHERE status <> 'Cancelled';


/* Maximum Order Value */

SELECT
    MAX(total_amount) AS maximum_order_value
FROM orders
WHERE status <> 'Cancelled';


/* Orders by Status */

SELECT
    status,
    COUNT(*) AS total_orders
FROM orders
GROUP BY status
ORDER BY total_orders DESC;


/* Customers by City */

SELECT
    city,
    COUNT(*) AS total_customers
FROM customers
GROUP BY city
ORDER BY total_customers DESC;


/* Customers by State */

SELECT
    state,
    COUNT(*) AS total_customers
FROM customers
GROUP BY state
ORDER BY total_customers DESC;


/* Products by Category */

SELECT
    c.category_name,
    COUNT(p.product_id) AS total_products
FROM categories c
LEFT JOIN products p
    ON c.category_id = p.category_id
GROUP BY c.category_id, c.category_name
ORDER BY total_products DESC;


/* Average Product Price by Category */

SELECT
    c.category_name,
    ROUND(AVG(p.price), 2) AS average_price
FROM categories c
JOIN products p
    ON c.category_id = p.category_id
GROUP BY c.category_id, c.category_name
ORDER BY average_price DESC;


/* Top 10 Most Expensive Products */

SELECT
    product_name,
    price
FROM products
ORDER BY price DESC
LIMIT 10;


/* Low Stock Products */

SELECT
    product_name,
    stock_quantity
FROM products
WHERE stock_quantity < 50
ORDER BY stock_quantity;


/* Products with Stock Greater Than 100 */

SELECT
    product_name,
    stock_quantity
FROM products
WHERE stock_quantity > 100
ORDER BY stock_quantity DESC;


/* Order Details with Customer Name */

SELECT
    o.order_id,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    o.order_date,
    o.status,
    o.total_amount
FROM orders o
JOIN customers c
    ON o.customer_id = c.customer_id
ORDER BY o.order_date;


/* Customer Spending */

SELECT
    c.customer_id,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    SUM(o.total_amount) AS total_spent
FROM customers c
JOIN orders o
    ON c.customer_id = o.customer_id
WHERE o.status <> 'Cancelled'
GROUP BY c.customer_id, customer_name
ORDER BY total_spent DESC;


/* Top Customers */

SELECT
    c.customer_id,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    COUNT(o.order_id) AS total_orders,
    SUM(o.total_amount) AS total_spent
FROM customers c
JOIN orders o
    ON c.customer_id = o.customer_id
WHERE o.status <> 'Cancelled'
GROUP BY c.customer_id, customer_name
ORDER BY total_spent DESC
LIMIT 10;


/* Product Sales Quantity */

SELECT
    p.product_id,
    p.product_name,
    SUM(oi.quantity) AS total_quantity_sold
FROM products p
JOIN order_items oi
    ON p.product_id = oi.product_id
JOIN orders o
    ON oi.order_id = o.order_id
WHERE o.status <> 'Cancelled'
GROUP BY p.product_id, p.product_name
ORDER BY total_quantity_sold DESC;


/* Product Revenue */

SELECT
    p.product_id,
    p.product_name,
    SUM(oi.quantity * oi.unit_price) AS total_revenue
FROM products p
JOIN order_items oi
    ON p.product_id = oi.product_id
JOIN orders o
    ON oi.order_id = o.order_id
WHERE o.status <> 'Cancelled'
GROUP BY p.product_id, p.product_name
ORDER BY total_revenue DESC;


/* Category Revenue */

SELECT
    c.category_name,
    SUM(oi.quantity * oi.unit_price) AS category_revenue
FROM categories c
JOIN products p
    ON c.category_id = p.category_id
JOIN order_items oi
    ON p.product_id = oi.product_id
JOIN orders o
    ON oi.order_id = o.order_id
WHERE o.status <> 'Cancelled'
GROUP BY c.category_id, c.category_name
ORDER BY category_revenue DESC;


/* Supplier-wise Product Count */

SELECT
    s.supplier_name,
    COUNT(p.product_id) AS total_products
FROM suppliers s
LEFT JOIN products p
    ON s.supplier_id = p.supplier_id
GROUP BY s.supplier_id, s.supplier_name
ORDER BY total_products DESC;


/* Supplier-wise Average Product Price */

SELECT
    s.supplier_name,
    ROUND(AVG(p.price), 2) AS average_product_price
FROM suppliers s
JOIN products p
    ON s.supplier_id = p.supplier_id
GROUP BY s.supplier_id, s.supplier_name
ORDER BY average_product_price DESC;


/* Payment Method Analysis */

SELECT
    payment_method,
    COUNT(*) AS total_payments,
    SUM(amount) AS total_amount
FROM payments
GROUP BY payment_method
ORDER BY total_amount DESC;


/* Payment Status Analysis */

SELECT
    payment_status,
    COUNT(*) AS total_payments,
    SUM(amount) AS total_amount
FROM payments
GROUP BY payment_status
ORDER BY total_payments DESC;


/* Average Rating by Product */

SELECT
    p.product_name,
    ROUND(AVG(r.rating), 2) AS average_rating,
    COUNT(r.review_id) AS total_reviews
FROM products p
JOIN reviews r
    ON p.product_id = r.product_id
GROUP BY p.product_id, p.product_name
ORDER BY average_rating DESC;


/* Products with Rating >= 4 */

SELECT
    p.product_name,
    ROUND(AVG(r.rating), 2) AS average_rating
FROM products p
JOIN reviews r
    ON p.product_id = r.product_id
GROUP BY p.product_id, p.product_name
HAVING AVG(r.rating) >= 4
ORDER BY average_rating DESC;


/* Monthly Sales */

SELECT
    DATE_FORMAT(order_date, '%Y-%m') AS sales_month,
    COUNT(order_id) AS total_orders,
    SUM(total_amount) AS total_sales
FROM orders
WHERE status <> 'Cancelled'
GROUP BY DATE_FORMAT(order_date, '%Y-%m')
ORDER BY sales_month;


/* Daily Sales */

SELECT
    DATE(order_date) AS order_day,
    COUNT(order_id) AS total_orders,
    SUM(total_amount) AS total_sales
FROM orders
WHERE status <> 'Cancelled'
GROUP BY DATE(order_date)
ORDER BY order_day;


/* Delivered Orders */

SELECT
    COUNT(*) AS delivered_orders,
    SUM(total_amount) AS delivered_revenue
FROM orders
WHERE status = 'Delivered';


/* Cancelled Orders */

SELECT
    COUNT(*) AS cancelled_orders,
    SUM(total_amount) AS cancelled_amount
FROM orders
WHERE status = 'Cancelled';


/* Pending Orders */

SELECT
    COUNT(*) AS pending_orders,
    SUM(total_amount) AS pending_amount
FROM orders
WHERE status = 'Pending';


/* Processing Orders */

SELECT
    COUNT(*) AS processing_orders,
    SUM(total_amount) AS processing_amount
FROM orders
WHERE status = 'Processing';


/* Shipped Orders */

SELECT
    COUNT(*) AS shipped_orders,
    SUM(total_amount) AS shipped_amount
FROM orders
WHERE status = 'Shipped';


/* Orders Greater Than Average Order Value */

SELECT
    order_id,
    customer_id,
    total_amount
FROM orders
WHERE total_amount >
(
    SELECT AVG(total_amount)
    FROM orders
)
ORDER BY total_amount DESC;


/* Customers Having More Than One Order */

SELECT
    c.customer_id,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    COUNT(o.order_id) AS order_count
FROM customers c
JOIN orders o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, customer_name
HAVING COUNT(o.order_id) > 1;


/* Highest Revenue Category */

SELECT
    c.category_name,
    SUM(oi.quantity * oi.unit_price) AS revenue
FROM categories c
JOIN products p
    ON c.category_id = p.category_id
JOIN order_items oi
    ON p.product_id = oi.product_id
JOIN orders o
    ON oi.order_id = o.order_id
WHERE o.status <> 'Cancelled'
GROUP BY c.category_id, c.category_name
ORDER BY revenue DESC
LIMIT 1;


/* Most Expensive Product */

SELECT
    product_name,
    price
FROM products
ORDER BY price DESC
LIMIT 1;


/* Most Reviewed Products */

SELECT
    p.product_name,
    COUNT(r.review_id) AS total_reviews
FROM products p
LEFT JOIN reviews r
    ON p.product_id = r.product_id
GROUP BY p.product_id, p.product_name
ORDER BY total_reviews DESC;


/* =========================================================
   15. FINAL VERIFICATION
   ========================================================= */

SELECT
    (SELECT COUNT(*) FROM categories) AS total_categories,
    (SELECT COUNT(*) FROM suppliers) AS total_suppliers,
    (SELECT COUNT(*) FROM products) AS total_products,
    (SELECT COUNT(*) FROM customers) AS total_customers,
    (SELECT COUNT(*) FROM orders) AS total_orders,
    (SELECT COUNT(*) FROM order_items) AS total_order_items,
    (SELECT COUNT(*) FROM payments) AS total_payments,
    (SELECT COUNT(*) FROM reviews) AS total_reviews;
    
USE ecommerce_analytics;

SELECT COUNT(*) AS total_categories FROM categories;
SELECT COUNT(*) AS total_suppliers FROM suppliers;
SELECT COUNT(*) AS total_products FROM products;
SELECT COUNT(*) AS total_customers FROM customers;
SELECT COUNT(*) AS total_orders FROM orders;
SELECT COUNT(*) AS total_order_items FROM order_items;
SELECT COUNT(*) AS total_payments FROM payments;
SELECT COUNT(*) AS total_reviews FROM reviews;


USE ecommerce_analytics;

SELECT COUNT(*) AS total_orders
FROM orders;

SELECT customer_id, order_date, status, total_amount, COUNT(*) AS duplicate_count
FROM orders
GROUP BY customer_id, order_date, status, total_amount
HAVING COUNT(*) > 1;

USE ecommerce_analytics;

-- 1. Check total records
SELECT
    (SELECT COUNT(*) FROM categories) AS total_categories,
    (SELECT COUNT(*) FROM suppliers) AS total_suppliers,
    (SELECT COUNT(*) FROM products) AS total_products,
    (SELECT COUNT(*) FROM customers) AS total_customers,
    (SELECT COUNT(*) FROM orders) AS total_orders,
    (SELECT COUNT(*) FROM order_items) AS total_order_items,
    (SELECT COUNT(*) FROM payments) AS total_payments,
    (SELECT COUNT(*) FROM reviews) AS total_reviews;
    
    
    
USE ecommerce_analytics;

-- 1. Order status analysis
SELECT
    status,
    COUNT(*) AS total_orders,
    SUM(total_amount) AS total_amount
FROM orders
GROUP BY status
ORDER BY total_orders DESC;


-- 2. Revenue from non-cancelled orders
SELECT
    ROUND(SUM(total_amount), 2) AS total_revenue
FROM orders
WHERE status <> 'Cancelled';


-- 3. Average order value
SELECT
    ROUND(AVG(total_amount), 2) AS average_order_value
FROM orders
WHERE status <> 'Cancelled';


-- 4. Top 10 products by price
SELECT
    product_id,
    product_name,
    price,
    stock_quantity
FROM products
ORDER BY price DESC
LIMIT 10;


-- 5. Products in each category
SELECT
    c.category_name,
    COUNT(p.product_id) AS total_products
FROM categories c
LEFT JOIN products p
    ON c.category_id = p.category_id
GROUP BY c.category_id, c.category_name
ORDER BY total_products DESC;


-- 6. Customer order analysis
SELECT
    c.customer_id,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    COUNT(o.order_id) AS total_orders,
    ROUND(SUM(o.total_amount), 2) AS total_spent
FROM customers c
LEFT JOIN orders o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name
ORDER BY total_spent DESC;


-- 7. Order total validation
SELECT
    o.order_id,
    o.total_amount,
    ROUND(SUM(oi.quantity * oi.unit_price), 2) AS calculated_total,
    CASE
        WHEN ABS(o.total_amount - SUM(oi.quantity * oi.unit_price)) < 0.01
        THEN 'MATCH'
        ELSE 'MISMATCH'
    END AS validation
FROM orders o
JOIN order_items oi
    ON o.order_id = oi.order_id
GROUP BY o.order_id, o.total_amount
ORDER BY o.order_id;

USE ecommerce_analytics;

-- TOP CUSTOMERS BY SPENDING
SELECT
    c.customer_id,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    COUNT(o.order_id) AS total_orders,
    ROUND(SUM(o.total_amount), 2) AS total_spent
FROM customers c
JOIN orders o
    ON c.customer_id = o.customer_id
WHERE o.status <> 'Cancelled'
GROUP BY c.customer_id, c.first_name, c.last_name
ORDER BY total_spent DESC;


-- CATEGORY-WISE REVENUE
SELECT
    c.category_name,
    ROUND(SUM(oi.quantity * oi.unit_price), 2) AS revenue
FROM categories c
JOIN products p
    ON c.category_id = p.category_id
JOIN order_items oi
    ON p.product_id = oi.product_id
JOIN orders o
    ON oi.order_id = o.order_id
WHERE o.status <> 'Cancelled'
GROUP BY c.category_id, c.category_name
ORDER BY revenue DESC;


-- TOP SELLING PRODUCTS
SELECT
    p.product_name,
    SUM(oi.quantity) AS units_sold,
    ROUND(SUM(oi.quantity * oi.unit_price), 2) AS revenue
FROM products p
JOIN order_items oi
    ON p.product_id = oi.product_id
JOIN orders o
    ON oi.order_id = o.order_id
WHERE o.status <> 'Cancelled'
GROUP BY p.product_id, p.product_name
ORDER BY units_sold DESC
LIMIT 10;


-- PAYMENT METHOD ANALYSIS
SELECT
    payment_method,
    COUNT(*) AS total_payments,
    ROUND(SUM(amount), 2) AS total_amount
FROM payments
GROUP BY payment_method
ORDER BY total_amount DESC;


-- REVIEW RATING ANALYSIS
SELECT
    rating,
    COUNT(*) AS total_reviews
FROM reviews
GROUP BY rating
ORDER BY rating DESC;

USE ecommerce_analytics;

SELECT
    (SELECT COUNT(*) FROM categories) AS total_categories,
    (SELECT COUNT(*) FROM suppliers) AS total_suppliers,
    (SELECT COUNT(*) FROM products) AS total_products,
    (SELECT COUNT(*) FROM customers) AS total_customers,
    (SELECT COUNT(*) FROM orders) AS total_orders,
    (SELECT COUNT(*) FROM order_items) AS total_order_items,
    (SELECT COUNT(*) FROM payments) AS total_payments,
    (SELECT COUNT(*) FROM reviews) AS total_reviews;
    
USE ecommerce_analytics;

-- =========================================
-- CTE ANALYSIS
-- =========================================

-- 1. Customer Order Summary
WITH customer_orders AS (
    SELECT
        customer_id,
        COUNT(order_id) AS total_orders,
        ROUND(SUM(total_amount), 2) AS total_spent
    FROM orders
    WHERE status <> 'Cancelled'
    GROUP BY customer_id
)
SELECT
    customer_id,
    total_orders,
    total_spent
FROM customer_orders
ORDER BY total_spent DESC;


-- 2. Category Revenue Analysis
WITH category_revenue AS (
    SELECT
        c.category_name,
        ROUND(SUM(oi.quantity * oi.unit_price), 2) AS revenue
    FROM categories c
    JOIN products p
        ON c.category_id = p.category_id
    JOIN order_items oi
        ON p.product_id = oi.product_id
    GROUP BY c.category_id, c.category_name
)
SELECT
    category_name,
    revenue
FROM category_revenue
ORDER BY revenue DESC;


-- 3. Product Sales Analysis
WITH product_sales AS (
    SELECT
        p.product_id,
        p.product_name,
        SUM(oi.quantity) AS units_sold,
        ROUND(SUM(oi.quantity * oi.unit_price), 2) AS revenue
    FROM products p
    JOIN order_items oi
        ON p.product_id = oi.product_id
    GROUP BY p.product_id, p.product_name
)
SELECT
    product_id,
    product_name,
    units_sold,
    revenue
FROM product_sales
ORDER BY revenue DESC
LIMIT 10;


-- 4. Monthly Revenue
WITH monthly_revenue AS (
    SELECT
        DATE_FORMAT(order_date, '%Y-%m') AS order_month,
        ROUND(SUM(total_amount), 2) AS revenue
    FROM orders
    WHERE status <> 'Cancelled'
    GROUP BY DATE_FORMAT(order_date, '%Y-%m')
)
SELECT
    order_month,
    revenue
FROM monthly_revenue
ORDER BY order_month;

USE ecommerce_analytics;

-- =========================================
-- WINDOW FUNCTIONS
-- =========================================

-- 1. Rank customers by total spending
SELECT
    c.customer_id,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    ROUND(SUM(o.total_amount), 2) AS total_spent,
    RANK() OVER (
        ORDER BY SUM(o.total_amount) DESC
    ) AS spending_rank
FROM customers c
JOIN orders o
    ON c.customer_id = o.customer_id
WHERE o.status <> 'Cancelled'
GROUP BY
    c.customer_id,
    c.first_name,
    c.last_name
ORDER BY spending_rank;


-- 2. Rank products by revenue
SELECT
    p.product_id,
    p.product_name,
    ROUND(SUM(oi.quantity * oi.unit_price), 2) AS revenue,
    RANK() OVER (
        ORDER BY SUM(oi.quantity * oi.unit_price) DESC
    ) AS revenue_rank
FROM products p
JOIN order_items oi
    ON p.product_id = oi.product_id
GROUP BY
    p.product_id,
    p.product_name
ORDER BY revenue_rank;


-- 3. Running monthly revenue
WITH monthly_revenue AS (
    SELECT
        DATE_FORMAT(order_date, '%Y-%m') AS order_month,
        ROUND(SUM(total_amount), 2) AS revenue
    FROM orders
    WHERE status <> 'Cancelled'
    GROUP BY DATE_FORMAT(order_date, '%Y-%m')
)
SELECT
    order_month,
    revenue,
    ROUND(
        SUM(revenue) OVER (
            ORDER BY order_month
        ), 2
    ) AS running_revenue
FROM monthly_revenue
ORDER BY order_month;


-- 4. Compare each order with previous order
SELECT
    order_id,
    customer_id,
    order_date,
    total_amount,
    LAG(total_amount) OVER (
        ORDER BY order_date
    ) AS previous_order_amount
FROM orders
ORDER BY order_date;

USE ecommerce_analytics;

-- =========================================
-- VIEWS
-- =========================================

-- 1. Customer Spending View
CREATE OR REPLACE VIEW vw_customer_spending AS
SELECT
    c.customer_id,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    COUNT(o.order_id) AS total_orders,
    ROUND(SUM(o.total_amount), 2) AS total_spent,
    ROUND(AVG(o.total_amount), 2) AS average_order_value
FROM customers c
JOIN orders o
    ON c.customer_id = o.customer_id
WHERE o.status <> 'Cancelled'
GROUP BY
    c.customer_id,
    c.first_name,
    c.last_name;


-- Verify View 1
SELECT *
FROM vw_customer_spending
ORDER BY total_spent DESC;


-- 2. Product Performance View
CREATE OR REPLACE VIEW vw_product_performance AS
SELECT
    p.product_id,
    p.product_name,
    c.category_name,
    SUM(oi.quantity) AS units_sold,
    ROUND(SUM(oi.quantity * oi.unit_price), 2) AS revenue
FROM products p
JOIN categories c
    ON p.category_id = c.category_id
JOIN order_items oi
    ON p.product_id = oi.product_id
GROUP BY
    p.product_id,
    p.product_name,
    c.category_name;


-- Verify View 2
SELECT *
FROM vw_product_performance
ORDER BY revenue DESC;


-- 3. Order Validation View
CREATE OR REPLACE VIEW vw_order_validation AS
SELECT
    o.order_id,
    o.total_amount,
    ROUND(SUM(oi.quantity * oi.unit_price), 2) AS calculated_total,
    CASE
        WHEN ABS(
            o.total_amount -
            SUM(oi.quantity * oi.unit_price)
        ) < 0.01
        THEN 'MATCH'
        ELSE 'MISMATCH'
    END AS validation
FROM orders o
JOIN order_items oi
    ON o.order_id = oi.order_id
GROUP BY
    o.order_id,
    o.total_amount;


-- Verify View 3
SELECT *
FROM vw_order_validation
ORDER BY order_id;
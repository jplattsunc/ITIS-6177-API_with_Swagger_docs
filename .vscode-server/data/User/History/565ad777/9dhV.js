const express = require('express');
const mariadb = require('mariadb');
const { body, param, validationResult } = require('express-validator');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

app.use(express.json());

// Create a connection pool to MariaDB using your credentials
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'myapp',
    password: 'mysecret',
    database: 'sample',
    port: 3306,
    connectionLimit: 20,
    acquireTimeout: 30000,
    idleTimeout: 10000      
});

// Only force JSON Content-Type for non-Swagger routes
app.use((req, res, next) => {
    if (!req.path.startsWith('/api-docs')) {
      res.header("Content-Type", "application/json");
    }
    next();
});

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'REST API',
            version: '1.0.0',
            description: 'REST API for managing customers, orders, and products',
        },
        servers: [{ url: "http://104.236.37.149:3000" }]
    },
    apis: ['./app_correct.js'], // Adjust path if this file is named differently
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers
 *     responses:
 *       200:
 *         description: List of customers.
 */
app.get('/customers', async (req, res) => {
    let conn;
    try {
        console.log("Fetching customers...");
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM customer');
        res.json(rows);
    } catch (err) {
        console.error("Error fetching customers:", err);
        res.status(500).json({ error: err.message });
    } finally {
        if (conn) {
            conn.release();
            conn.destroy();
        }
    }
});

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get a customer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Customer ID (CUST_CODE)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer details.
 *       404:
 *         description: Customer not found.
 */
app.get('/customers/:id', async (req, res) => {
    const customerId = req.params.id;
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM customer WHERE CUST_CODE = ?', [customerId]);
        if (rows.length) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (conn) {
            conn.release();
            conn.destroy();
        }
    }
});

/**
 * @swagger
 * /customers/{id}/orders:
 *   get:
 *     summary: Get orders for a specific customer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Customer ID (CUST_CODE)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of orders.
 *       404:
 *         description: No orders found for this customer.
 */
app.get('/customers/:id/orders', async (req, res) => {
    const customerId = req.params.id;
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM orders WHERE CUST_CODE = ?', [customerId]);
        if (rows.length) {
            res.json(rows);
        } else {
            res.status(404).json({ message: 'No orders found for this customer' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (conn) {
            conn.release();
            conn.destroy();
        }
    }
});

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products (foods)
 *     responses:
 *       200:
 *         description: List of products.
 */
app.get('/products', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM foods');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (conn) {
            conn.release();
            conn.destroy();
        }
    }
});

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details.
 *       404:
 *         description: Order not found.
 */
app.get('/orders/:id', async (req, res) => {
    const orderId = req.params.id;
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM orders WHERE order_id = ?', [orderId]);
        if (rows.length) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (conn) {
            conn.release();
            conn.destroy();
        }
    }
});

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       description: Customer object to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - CUST_CODE
 *               - CUST_NAME
 *             properties:
 *               CUST_CODE:
 *                 type: string
 *               CUST_NAME:
 *                 type: string
 *     responses:
 *       201:
 *         description: Customer created successfully.
 *       400:
 *         description: Invalid input.
 */
app.post('/customers', [
    body('CUST_CODE').isLength({ min: 1, max: 6 }).withMessage('CUST_CODE must be between 1 and 6 characters'),
    body('CUST_NAME').trim().notEmpty().withMessage('CUST_NAME is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
    }
    
    const custCode = req.body.CUST_CODE;
    const custName = req.body.CUST_NAME.trim();
    
    let conn;
    try {
         conn = await pool.getConnection();
         const result = await conn.query(
             'INSERT INTO customer (CUST_CODE, CUST_NAME) VALUES (?, ?)',
             [custCode, custName]
         );
         res.status(201).json({ message: 'Customer created', id: result.insertId });
    } catch (err) {
         res.status(500).json({ error: err.message });
    } finally {
         if (conn) conn.release();
    }
});

/**
 * @swagger
 * /customers/{id}:
 *   patch:
 *     summary: Partially update a customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Customer ID (CUST_CODE)
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Fields to update for the customer
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CUST_NAME:
 *                 type: string
 *     responses:
 *       200:
 *         description: Customer updated successfully.
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Customer not found.
 */
app.patch('/customers/:id', [
    param('id').isLength({ min: 1, max: 6 }).withMessage('ID must be between 1 and 6 characters'),
    body('CUST_NAME').optional().trim().notEmpty().withMessage('CUST_NAME cannot be empty')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
    }
    
    const customerId = req.params.id;
    const fields = [];
    const values = [];
    
    if (req.body.CUST_NAME) {
        fields.push("CUST_NAME = ?");
        values.push(req.body.CUST_NAME.trim());
    }
    if (fields.length === 0) {
        return res.status(400).json({ error: "No valid fields provided for update" });
    }
    
    values.push(customerId);
    let conn;
    try {
         conn = await pool.getConnection();
         const result = await conn.query(
             `UPDATE customer SET ${fields.join(', ')} WHERE CUST_CODE = ?`,
             values
         );
         if (result.affectedRows === 0) {
             res.status(404).json({ message: 'Customer not found' });
         } else {
             res.json({ message: 'Customer updated' });
         }
    } catch (err) {
         res.status(500).json({ error: err.message });
    } finally {
         if (conn) conn.release();
    }
});

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Completely update a customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Customer ID (CUST_CODE)
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Customer object to replace the existing record
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - CUST_NAME
 *             properties:
 *               CUST_NAME:
 *                 type: string
 *     responses:
 *       200:
 *         description: Customer updated successfully.
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Customer not found.
 */
app.put('/customers/:id', [
    param('id').isLength({ min: 1, max: 6 }).withMessage('ID must be between 1 and 6 characters'),
    body('CUST_NAME').trim().notEmpty().withMessage('CUST_NAME is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
    }
    
    const customerId = req.params.id;
    const custName = req.body.CUST_NAME.trim();
    
    let conn;
    try {
         conn = await pool.getConnection();
         const result = await conn.query(
             'UPDATE customer SET CUST_NAME = ? WHERE CUST_CODE = ?',
             [custName, customerId]
         );
         if (result.affectedRows === 0) {
             res.status(404).json({ message: 'Customer not found' });
         } else {
             res.json({ message: 'Customer updated' });
         }
    } catch (err) {
         res.status(500).json({ error: err.message });
    } finally {
         if (conn) conn.release();
    }
});

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete a customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Customer ID (CUST_CODE)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer deleted successfully.
 *       404:
 *         description: Customer not found.
 */
app.delete('/customers/:id', [
    param('id').isLength({ min: 1, max: 6 }).withMessage('ID must be between 1 and 6 characters')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
    }
    
    const customerId = req.params.id;
    let conn;
    try {
         conn = await pool.getConnection();
         const result = await conn.query(
             'DELETE FROM customer WHERE CUST_CODE = ?',
             [customerId]
         );
         if (result.affectedRows === 0) {
             res.status(404).json({ message: 'Customer not found' });
         } else {
             res.json({ message: 'Customer deleted' });
         }
    } catch (err) {
         res.status(500).json({ error: err.message });
    } finally {
         if (conn) conn.release();
    }
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Default endpoint
 *     responses:
 *       200:
 *         description: Welcome message and list of endpoints.
 */
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to my API!',
        endpoints: {
            '/customers': 'GET all customers / POST to create a new customer',
            '/customers/:id': 'GET, PUT, PATCH, DELETE customer by ID',
            '/customers/:id/orders': 'GET orders for a customer',
            '/products': 'GET all foods (used as products)',
            '/orders/:id': 'GET order by ID',
            '/api-docs': 'Access Swagger UI'
        }
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://104.236.37.149:${port}`);
});


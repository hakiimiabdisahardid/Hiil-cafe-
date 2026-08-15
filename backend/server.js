const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { router: authRouter } = require('./routes/auth');
const menuRouter = require('./routes/menu');
const ordersRouter = require('./routes/orders');
const reservationsRouter = require('./routes/reservations');
const inventoryRouter = require('./routes/inventory');
const customersRouter = require('./routes/customers');
const employeesRouter = require('./routes/employees');
const discountsRouter = require('./routes/discounts');
const reportsRouter = require('./routes/reports');
const notificationsRouter = require('./routes/notifications');
const paymentsRouter = require('./routes/payments');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true, service: 'HIIL CAFE API' }));

app.use('/api/auth', authRouter);
app.use('/api/menu', menuRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/reservations', reservationsRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/customers', customersRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/discounts', discountsRouter);
app.use('/api/reports', reportsRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/payments', paymentsRouter);

app.use(express.static(path.join(__dirname, './frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`HIIL CAFE API running on http://localhost:${PORT}`));
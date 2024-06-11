const express = require('express');

const app = express();

app.use(express.json());

const port = 3000;

// Basis test request
app.get('/api/info', (req, res) => {
    logger.trace('idex -> /api/info');
    res.json({
        status: 200,
        message: 'This is the API for the book tracking system of the Droomvallei Uitgeverij.',
        data: {}
    });
});

// Route not found error handler
app.use((req, res, next) => {
    next({
        status: 404,
        message: 'Route not found',
        data: {}
    });
});

// Error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        status: error.status || 500,
        message: error.message || 'Internal Server Error',
        data: {}
    });
});

// Activate the API
app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});

// This export is needed for the tests
module.exports = app;
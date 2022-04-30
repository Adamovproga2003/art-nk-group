const express = require('express');

// import controllers
const { testOfConnect } = require('../controllers/test.controller');

// import validators
const router = express.Router();

router.get('/connect-test', (request, response) => {
    return response.status(200).json({
        message: 'Connected successfully'
    })
});

module.exports = router;
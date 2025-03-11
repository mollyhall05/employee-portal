const pool = require('../config');

pool.connect()
    .then(() => console.log('Connected to database'))
    .catch(err => console.error('Error connecting to database', err.stack));
const router = require('express').Router();
const pool = require('../modules/pool');

// Get route all to-dos
router.get('/', (req, res) => {
    let queryText = 'SELECT * from "todos" ORDER BY "id";';
    pool.query(queryText).then(result => {
        // Sends back results in an object
        res.send(result.rows);
    })
    .catch(error => {
        console.log('Error retrieving tasks', error);
        res.sendStatus(500);
    })
})


module.exports = router;

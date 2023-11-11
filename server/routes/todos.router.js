const router = require('express').Router();
const pool = require('../modules/pool');

// Get route all to-dos
router.get('/', (req, res) => {
    let queryText = 'SELECT * from "todos" ORDER BY "id";';
    pool
    .query(queryText).then(result => {
        // Sends back results in an object
        res.send(result.rows);
    })
    .catch(error => {
        console.log('Error retrieving tasks', error);
        res.sendStatus(500);
    })
})

// DELETE item
router.delete('/:id', (req, res) => {
    let idOfTask = req.params.id;
    const sqlText = `
    DELETE from "todos"
    WHERE "id" = $1;
    `
    const sqlValues = [idOfTask];

    pool
    .query(sqlText, sqlValues)
    .then((dbResult) => {
        res.sendStatus(200)
    })
    .catch((dbError) => {
        console.log('DELETE /todos/:id failed', dbError);
        res.sendStatus(500)

    })
})

module.exports = router;

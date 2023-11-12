const router = require('express').Router();
const pool = require('../modules/pool');

// GET all to-dos
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

// POST new to-do
router.post('/', (req, res) => {
    let newItem = req.body;
    console.log('New task: ', newItem)

    let queryText = `
    INSERT INTO "todos" ("text", "isComplete")
    VALUES
    ($1, $2);
    `
    pool
    .query(queryText, [newItem.text, newItem.isComplete])
    .then((result) => {
        res.sendStatus(201)
    })
    .catch((error) => {
        console.log('Error adding new to-do', error);
        res.sendStatus(500);
    })
})

// PUT route to update isComplete
router.put('/:id', (req, res) => {
    let itemID = req.params.id;
    // NOT changes the boolean value to the opposite of whatever it is
    const sqlText = `
    UPDATE "todos"
        SET "isComplete" = NOT "isComplete"
        WHERE "id" = $1;
        `
    const sqlValues = [itemID]

    pool
    .query(sqlText, sqlValues)
    .then((dbResult) => {
        res.sendStatus(200)
    })
    .catch((dbError) => {
        console.log('PUT /todos/:id failed: ', dbError);
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

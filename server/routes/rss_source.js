const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
let sourceFeed = require('../modules/rss.js');


router.get('/', (req, res) => {
    console.log('getting feed');

    if (req.isAuthenticated()) {
        const idToGet = req.user.id; 
        const queryText = `SELECT * FROM feeds
                           JOIN rss_sources ON feeds.rss_id = rss_sources.rss_id
                           WHERE user_id = $1
                           ORDER BY post_id ASC;`;
        pool.query(queryText, [idToGet])
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('error with query', queryText, error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

router.get('/saves', (req, res) => {
    console.log('getting saves');

    if (req.isAuthenticated()) {
        const idToGet = req.user.id; 
        const queryText = `SELECT * FROM feeds
                           JOIN rss_sources ON feeds.rss_id = rss_sources.rss_id
                           WHERE user_id = $1 AND issaved = true
                           ORDER BY post_id ASC;`;
        pool.query(queryText, [idToGet])
        .then(results => {
            res.send(results.rows);
        }).catch(error => {
            console.log('error with query', queryText, error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

//router to update read state in the db
router.put('/read/:id', (req, res) => {
    console.log('put read');
    if (req.isAuthenticated()) {
        const idToUpdate = req.params.id;
        const state = req.body.state;
        console.log(state, idToUpdate);
        const queryText =`UPDATE feeds SET isread = $1 WHERE post_id=$2;`;
        pool.query(queryText, [state, idToUpdate])
        .then(results => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('error with query', queryText, error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

//router to update save state in the db
router.put('/save/:id', (req, res) => {
    console.log('put save');
    if (req.isAuthenticated()) {
        const idToUpdate = req.params.id;
        const state = req.body.state;
        console.log(state, idToUpdate);
        const queryText =`UPDATE feeds SET issaved = $1 WHERE post_id=$2;`;
        pool.query(queryText, [state, idToUpdate])
        .then(results => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('error with query', queryText, error);
            res.sendStatus(500);
        });


    } else {
        res.sendStatus(403);
    }
});

//router to delete a users source
//add authorization check to delete query
router.delete('/:id', async (req, res) => {
    console.log('in delete');
    if (req.isAuthenticated()) {
        const user_id = req.user.id;
        const client = await pool.connect();
        try {
            const idToDelete = req.params.id;
            const queryStuff = `UPDATE feeds SET rss_id = NULL WHERE rss_id = $1;`;
            await client.query(queryStuff, [idToDelete]);
            const queryText =`DELETE FROM rss_sources WHERE rss_id=$1;`;
            await client.query(queryText, [idToDelete]);
        } catch (error) {
            console.log(error);
        } finally {
            console.log('success');
            client.release();
            sourceFeed(user_id);
        }

    } else {
        res.sendStatus(403);
    }
});


module.exports = router;






















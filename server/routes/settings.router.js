const express = require('express');
const pool = require('../modules/pool');
const sourceFetch = require('../modules/rss.js');
const router = express.Router();

router.get('/sources', (req, res) => {
    console.log('getting sources for settings');
    
    if (req.isAuthenticated()) {
        const idToGet = req.user.id; 
        const queryText = `SELECT * FROM rss_sources 
                           WHERE user_id=$1
                           ORDER BY rss_id;`;
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

router.post('/', (req, res) => {
    console.log('posting hit');

    if (req.isAuthenticated()) {
        console.log(req.body); 
        const queryText = `INSERT INTO rss_sources (source_name, source_url, user_id)
                           VALUES($1,$2,$3);`;
        const values = [req.body.name, req.body.url, req.user.id];
        pool.query(queryText, values)
        .then(results => {
            res.sendStatus(201);
            sourceFetch(req.user.id);
        }).catch(error => {
            console.log('error with query', queryText, error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});


router.put('/:id', (req, res) => {
    console.log('put read');
    if (req.isAuthenticated()) {
        const idToUpdate = req.params.id;
        const state = !req.body.ismute;
        console.log(state, idToUpdate);
        const queryText =`UPDATE rss_sources SET ismute = $1 WHERE rss_id = $2;`;
        pool.query(queryText, [state, idToUpdate])
        .then(results => {
            res.sendStatus(200);
            sourceFetch(req.user.id);
        }).catch(error => {
            console.log('error with query', queryText, error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});
module.exports = router;

const express = require('express');
const pool = require('../modules/pool');
const sourceFetch = require('../modules/rss.js');
const router = express.Router();
let sourceFeed = require('../modules/rss.js');

router.get('/sources', (req, res) => {
    console.log('getting sources for settings');
    
    if (req.isAuthenticated()) {
        const idToGet = req.user.id; 
        const queryText = `SELECT * FROM rss_sources WHERE user_id=$1`;
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


module.exports = router;

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

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




module.exports = router;

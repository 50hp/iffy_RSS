const express = require('express');
const { Prompt } = require('react-router-dom/cjs/react-router-dom.min');
const pool = require('../modules/pool');
const router = express.Router();
// const rssSource =  require('../modules/rss.js');


router.get('/', (req, res) => {
    console.log('getting feed');

    if (req.isAuthenticated()) {
        const idToGet = req.user.id; 
        const queryText = `SELECT * FROM feeds
                           JOIN rss_sources ON feeds.rss_id = rss_sources.id
                           WHERE user_id = $1;`;
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

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;






















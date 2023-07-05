const express = require('express');
const pool = require('../modules/pool');
const sourceFetch = require('../modules/rss.js');
const router = express.Router();



router.get('/', (req, res) => {
    console.log('getting saves');

    if (req.isAuthenticated()) {
        const idToGet = req.user.id; 
        const queryText = `SELECT * FROM saves
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


router.post('/', (req, res) => {
    console.log('put save');
    if (req.isAuthenticated()) {
        const user_id = req.user.id;
        const item = req.body;
        console.log(user_id, item);
        const queryStuff = `
                    INSERT INTO saves (user_id, creator, title, link, pubDate, content, contentSnippet, guid, isoDate, author)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
        const values =[user_id,
                    item.creator,
                    item.title, 
                    item.link, 
                    item.pubdate,
                    item.content,
                    item.contentsnippet,
                    item.guid,
                    item.isodate,
                    item.author];
        pool.query(queryStuff, values)
        .then(results => {
            console.log(results.rows);
            res.sendStatus(200);
        }).catch(error => {
            res.sendStatus(500);
            console.log('error with queryText', queryText, error);
        });

    } else {
        res.sendStatus(403);
    }
});















module.exports = router;

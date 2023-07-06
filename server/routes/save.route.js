const express = require('express');
const pool = require('../modules/pool');
const sourceFetch = require('../modules/rss.js');
const router = express.Router();


//route to sendd user archived posts
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

//route to add user posts
router.post('/', async (req, res) => {
    console.log('post save');
    if (req.isAuthenticated()) {
        const client = await pool.connect();
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
        try { 
        await client.query(queryStuff, values);
        await client.query('UPDATE feeds SET issaved = true WHERE post_id = $1', [item.post_id]);
        res.sendStatus(200);
        }
        catch {
            console.log('error with updatating save')
            res.sendStatus(500);
        }
        finally {
            console.log('finished saving'); 
            client.release();
        }

    } else {
        res.sendStatus(403);
    }
});

//updates archived posts read state
router.put("/:id", (req, res) => {
    console.log('put save read');
    if (req.isAuthenticated()) {
        const idToUpdate = req.params.id;
        const state = req.body.state;
        console.log(state, idToUpdate);
        const queryText =`UPDATE saves SET isread = $1 WHERE post_id=$2;`;
        pool.query(queryText, [state, idToUpdate])
        .then(results => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('error with query', queryText, error);
            res.sendStatus(500);
        });
    }
     else {
        res.sendStatus(403);
     } 

});

//route to unsave a post
router.delete("/:id", (req, res) => {
    console.log('in delete');
    if (req.isAuthenticated()) {
        const user_id = req.user.id;
        const idToDelete = req.params.id;
        const body = req.body.user_id;
        console.log(user_id, idToDelete, body);
        if (user_id === body ) {
            const queryWords = `DELETE FROM saves WHERE post_id = $1;`;
            pool.query(queryWords, [idToDelete])
            .then(results => {
                res.sendStatus(200);
            }).catch(error => {
                console.log('error with query', queryWords, error);
                res.sendStatus(500);
            });
        } else {
            res.sendStatus(403);
        }

    } else {
        res.sendStatus(403);
    }
});










module.exports = router;

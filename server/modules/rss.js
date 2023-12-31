const pool = require('../modules/pool');
const Parser = require('rss-parser');
const parser = new Parser();


//maintains the users feed
async function sourceFetch(user_id) {
     console.log('sourceFetch');
    //clears the db of old posts
     const client = await pool.connect()
     try {
         await client.query('BEGIN');
         const updateTime = await client.query('UPDATE "user" SET feedgentime = CURRENT_TIMESTAMP WHERE id=$1;',[user_id]);
         const deletStatus = await client.query(`DELETE FROM feeds
                             USING rss_sources
                             WHERE feeds.rss_id = rss_sources.rss_id 
                             AND rss_sources.user_id = $1;`, [user_id]); 
         console.log(deletStatus);
         const commitStatus = await client.query('COMMIT');
         console.log(commitStatus);
    } catch (error) {
         await client.query('ROLLBACK')
         console.log('Error with delete of', error);
    }
    //Grabs the rss information and puts it into the db 
     try {
         await client.query('BEGIN');
         const dbRows = await client.query(`SELECT * FROM rss_sources WHERE user_id = $1 AND ismute = false`, [user_id]);
         console.log(dbRows.rows);
         for ( row of dbRows.rows ) {
             //RSS Parser call
             let feed = await parser.parseURL(row.source_url);
             console.log(feed.title);
             for ( item of feed.items ) {
                 console.log(item.title);
                 let queryStuff = `
                     INSERT INTO feeds (rss_id, creator, title, link, pubDate, content, contentSnippet, guid, isoDate, author, parsDate)
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`;
                 let values =[row.rss_id,
                             item.creator,
                             item.title, 
                             item.link, 
                             item.pubDate,
                             item.content,
                             item.contentSnippet,
                             item.guid,
                             item.isoDate,
                             item.author,
                             Date.parse(item.pubDate)];
                 pool.query(queryStuff, values)
                 .then(results =>{})
                 .catch(error =>{
                     console.log(error);
                 });
             }
         }
         const commitStatus = await client.query('COMMIT');
         console.log(`finished`, commitStatus); 
    } catch (error) {
            await client.query('ROLLBACK');
         console.log('error with adslkjadslkj;dsaklj;', error);
     } finally {
         client.release();
         return;
     }
 }


// console.log(sourceFetch(1));

module.exports = sourceFetch;













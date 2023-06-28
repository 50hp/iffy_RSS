const pool = require('../modules/pool');
const Parser = require('rss-parser');
const parser = new Parser();


async function sourceFetch(user_id) {
    console.log('sourceFetch');    
    const client = await pool.connect()
   try {
    await client.query('BEGIN');
    await client.query(`DELETE FROM feeds
                        USING rss_sources
                        WHERE feeds.rss_id = rss_sources.rss_id 
                        AND rss_sources.user_id = ${user_id} 
                        AND feeds.issaved = false;`); 

    const dbRows = await client.query(`SELECT * FROM rss_sources WHERE user_id = $1`, [user_id]);
    console.log(dbRows.rows);
        for ( row of dbRows.rows ) {
            let feed = await parser.parseURL(row.source_url);
            console.log(feed.title);
            for ( item of feed.items ) {
                console.log(item.title);
                let queryStuff = `
                    INSERT INTO feeds (rss_id, creator, title, link, pubDate, content, contentSnippet, guid, isoDate, author)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
                let values =[row.rss_id,
                            item.creator,
                            item.title, 
                            item.link, 
                            item.pubDate,
                            item.content,
                            item.contentSnippet,
                            item.guid,
                            item.isoDate,
                            item.author];
                pool.query(queryStuff, values)
                .then(results =>{})
                .catch(error =>{
                    console.log(error);
                });

            }
        }
        console.log(`finished parsing user:${user_id} sources`);
   } catch (error) {
        console.log('error with adslkjadslkj;dsaklj;', error);
    } finally {
        client.release();
    }
}

// console.log(sourceFetch(1));

module.exports = sourceFetch;













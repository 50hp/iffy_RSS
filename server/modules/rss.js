const pool = require('../modules/pool');
const Parser = require('rss-parser');
const parser = new Parser();


function sourceFetch() {
    console.log('sourceFetch');    
   
    let dbRows = [];
    let queryText =`SELECT * FROM rss_sources`;

    pool.query(queryText)
    .then(results => {
        dbRows.push(...results.rows);
        console.log(dbRows);
            (async () => {
                
                for ( row of dbRows ) {
                    let feed = await parser.parseURL(row.source_url);
                    for ( item of feed.items ) {

                        let queryStuff = `
                            INSERT INTO feeds (rss_id, creator, date, title, link, pubDate, content, contentSnippet, guid, isoDate, author, categories)
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`;
                        let values =[row.id,
                                    item.creator,
                                    item.date,
                                    item.title, 
                                    item.link, 
                                    item.pubDate,
                                    item.content,
                                    item.contentSnippet,
                                    item.guid,
                                    item.isoDate,
                                    item.author,
                                    item.catagories]
                        pool.query(queryStuff, values)
                        .then(results => {
                            console.log('succes', results);
                        }).catch(error => {
                            console.log('error with query', queryStuff, error);
                        });
                    }
                }

                console.log('end');
             
            })();    
    }).catch(error => {
        console.log('error with query', queryText, error);
    });
}




module.exports = sourceFetch();













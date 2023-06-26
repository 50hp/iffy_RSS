const pool = require('../modules/pool');
const Parser = require('rss-parser');
const parser = new Parser();

//
//
// function sourceFetch(user) {
//   console.log('sourceFetch');    
//   let dbRows = [];
//   let feedReturn = Object;
//   let queryText =`SELECT * FROM rss_sources WHERE user_id=1;`;
//
//   pool.query(queryText)
//   .then(results => {
//       dbRows.push(...results.rows);
//         console.log(dbRows);
//       let feedData = dbRows[0].source_url;
//         (async () => {
//
//             let feed = await parser.parseURL(feedData);
//             feedReturn = feed;
//             console.log(feed);
//               
//                 let queryStuff = `UPDATE rss_sources SET output = $1 WHERE id=$2`;
//                 pool.query(queryStuff, [feed, dbRows[0].user_id])
//                 .then(results => {
//                   console.log('success',results); 
//                 }).catch(error => {
//                   console.log('errror with query', queryStuff, error);
//                 });
//          })();    
//
//   }).catch(error => {
//       console.log('error with query', queryText, error);
//   });
//   
// }
//

function sourceFetch(user) {
    console.log('sourceFetch');    
   
    let dbRows = [];
    let queryText =`SELECT * FROM rss_sources WHERE user_id=$1`;

    pool.query(queryText, [user])
    .then(results => {
        dbRows.push(...results.rows);
        console.log(dbRows);
            (async () => {
                
                for ( row of dbRows ) {
                        let feed = await parser.parseURL(row.source_url);
                            
                        console.log(feed, row.id);

                         let queryStuff = `UPDATE rss_sources SET output = $1 WHERE id=$2`;
                             pool.query(queryStuff, [feed, row.id])
                             .then(results => {
                                 console.log('success',results); 
                             }).catch(error => {
                                 console.log('errror with query', queryStuff, error);
                             });
                }

                console.log('end');
             
            })();    
    }).catch(error => {
        console.log('error with query', queryText, error);
    });
}




module.exports = sourceFetch();













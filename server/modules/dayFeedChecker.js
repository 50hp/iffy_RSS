const pool = require("./pool");


//checks the last time the feed was updated
//if the time is greater than lower limit return false.
async function dayFeedChecker(user_id) {
    console.log('dayFeedChecker', user_id);
    const date = Date(); 
    const client = await pool.connect();
    const results = await client.query('SELECT "feedgentime" FROM "user" WHERE id=$1;', [user_id]);
    const feedGen = results.rows[0].feedgentime;
    // console.log('user tracked time', feedGen, "current time",date)
    if (Math.round(Date.parse(date)/86400000) === Math.round(Date.parse(feedGen)/86400000)) {
        return true;
    } else {
        return false;
    }
    

}

module.exports = dayFeedChecker;

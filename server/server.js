const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const serverStatus = require('./modules/serverStatus.js');
const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const rssSourceRouter = require('./routes/rss_source.js');
const settingsRouter = require('./routes/settings.router.js');
const savesRouter = require('./routes/save.route.js');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/rss', rssSourceRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/saves', savesRouter);


// Serve static files
app.use(express.static('build'));

serverStatus();





// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

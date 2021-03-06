require('dotenv').config();

let path = require('path');

let express = require('express');
let app = express();
const PORT = process.env.PORT || 3000;

let compression = require('compression');
let helmet = require('helmet');
app.use(compression());
app.use(helmet());

const bcrypt = require('bcrypt');
const initializeDB = require('./models/db');
initializeDB();

const User = require('./models/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
app.use(flash());

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, async (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      let passwordMatches = await bcrypt.compare(password, user.passwordHash);

      if (!passwordMatches)
        return done(null, false, { message: 'Incorrect password.' });

      return done(null, user);
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

let store = new MongoDBStore({
  uri: process.env.DB_STRING,
  collection: 'sessions',
  connectionOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.error = req.flash('error');
  res.locals.messages = [];
  next();
});

let logger = require('morgan');
app.use(logger('tiny'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/static', express.static(path.join(__dirname, 'static')));

//Locals
app.locals.siteName = 'Private Club????';

/*******************************************/
/*-----------------Routes-----------------*/
/*****************************************/
let indexRoute = require('./routes/indexRoute');
let authRoute = require('./routes/authRoute');
let messageRoute = require('./routes/messageRoute');

app.use(indexRoute);
app.use(authRoute);
app.use(messageRoute);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

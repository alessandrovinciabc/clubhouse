let path = require('path');

let express = require('express');
let app = express();
const PORT = process.env.PORT || 3000;

let logger = require('morgan');

app.use(logger('tiny'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/static', express.static(path.join(__dirname, 'static')));

/*******************************************/
/*-----------------Routes-----------------*/
/*****************************************/
let indexRoute = require('./routes/indexRoute');

app.use(indexRoute);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

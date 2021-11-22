const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const logger = require('./middleware/logger');
const engine = require('express-handlebars').engine;
const members = require('./Data/membersData')


app.engine('handlebars', engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set("views", "./views");

app.get('/', (req, res) =>  res.render('index', {
   title: 'Member Application',
   members,
}));

app.use(express.json()); // integrated body parser

app.use(express.urlencoded({extended: false}));

app.use(express.static(__dirname +'/public'));

// app.use(logger);  // init middleware on any route of the API

app.use('/api/members', require('./routes/api/members'));


app.listen(PORT,() => {
   console.log(`Server listening on port ${PORT}`);
})

const express =  require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const bookRoutes = require('./server/routes/BookRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/books', bookRoutes);

const port = process.env.PORT || 80;

app.get("*", (req, res) => res.status(200).send({
    message: 'Welcome to Book App API.'
}));

app.listen(port, () => {
    console.log('server is running on port ' + port);
});

module.exports = app;
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const user = require('./routes/user.routes');
const post = require('./routes/post.routes');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// set our port
const port = process.env.PORT || 8080;

// routes
app.use('/user', user);
app.use('/post', post);

app.use((req, res) => {
  res.status(404).send({
    status: 404,
    message: 'Not Found',
    documentation_url: `http://${req.get('host')}`
  });
});

// start app at localhost:8080
app.listen(port);

console.log(`Listening on ${port}`);
module.exports = app;
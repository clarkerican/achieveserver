import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import sequelize from './db/sequelize';
import UserService from './services/user.service';
import PostService from './services/post.service';
import FriendshipService from './services/friendship.service';

import * as user from './routes/user.routes';
import * as post from './routes/post.routes';


const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// set our port
const port = process.env.PORT || 8080;

// routes
app.use('/user', user.router);
app.use('/post', post.router);

const userService = new UserService(sequelize.User);
const postService = new PostService(sequelize.Post, sequelize.Comment);
const friendshipService = new FriendshipService(sequelize.Friendship);
user.setDependencies(userService, friendshipService);
post.setDependencies(postService, friendshipService);

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
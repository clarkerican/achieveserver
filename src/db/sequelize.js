import Sequelize from 'sequelize';

// eslint-disable-next-line import/no-unresolved
import dbConfig from '../../dbConfig.json';

const STRING = Sequelize.DataTypes.STRING;
const INTEGER = Sequelize.DataTypes.INTEGER;

const model = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig.options
);

const User = model.define('user', {
  username: { type: STRING, unique: true },
  email: STRING,
  firstName: STRING,
  lastName: STRING
});

const Post = model.define('post', {
  title: STRING,
  content: STRING,
  likes: { type: INTEGER, defaultValue: 0}
});

Post.belongsTo(User, { as: 'author', through: 'id' });

const Comment = model.define('comment', {
  content: STRING,
  likes: { type: INTEGER, defaultValue: 0}
});

Comment.belongsTo(User, { as: 'author', through: 'id' });
Comment.belongsTo(Post, { as: 'postid', through: 'id' });

const Friendship = model.define('friendship', {});

Friendship.belongsTo(User, { as: 'id1', through: 'id'});
Friendship.belongsTo(User, { as: 'id2', through: 'id'});


module.exports.User = User;
module.exports.Post = Post;
module.exports.Comment = Comment;
module.exports.Friendship = Friendship;

module.exports.DataTypes = Sequelize.DataTypes;
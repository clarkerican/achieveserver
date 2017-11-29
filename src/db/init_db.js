import sequelize from './sequelize';

async function main() {
  try {
    // Make all calls to initialize tables here!
    await sequelize.User.sync({ force: true });
    await sequelize.Post.sync({ force: true });
    await sequelize.Comment.sync({ force: true });
    await sequelize.Friendship.sync({ force: true });

  } catch (err) {
    console.error('Database did not initialize correctly:', err);
    process.exit(1);
  }

  console.log('Database was successfully initialized!');
  process.exit(0);
}

main();

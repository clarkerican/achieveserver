import sequelize from 'sequelize';

const OR = sequelize.Op.or;

export default class UserService {
  constructor(userRepository){
    this.userRepository = userRepository;
  }

  async createUser(user) {
    console.log(`UserService: Creating User ${user}`);
    const newUser = await this.userRepository.create(user);
    return newUser;
  }

  async getUserByUsername(username) {
    console.log(`UserService: Retrieving User ${username}`);
    const user = await this.userRepository.findOne({
      where: {
        username
      }
    });
    return user;
  }

  async findUsersById(userIds) {
    console.log(`UserService: Retrieving all users with the given ids ${userIds}`);
    const users = await this.userRepository.findAll({
      where: {
        id: {
          [OR]: userIds
        }
      }
    });
    return users;
  }

  async getUserById(userId){
    console.log(`UserService: Retrieving User ${userId}`);
    const user = await this.userRepository.findOne({
      where: {
        id: userId
      }
    });
    return user;
  }

  async getUsernameFromId(userId){
    console.log(`UserService: Retrieving User ${userId}`);
    const user = await this.userRepository.findOne({
      where: {
        id: userId
      }
    });
    return user.username;
  }

  async getNameFromId(userId){
    console.log(`UserService: Retrieving User's name for ${userId}`);
    const user = await this.userRepository.findOne({
      where: {
        id: userId
      }
    });
    return `${user.firstName} ${user.lastName}`;
  }

  async getIdFromUsername(username){
    console.log(`UserService: Retrieving User ${username}`);
    const user = await this.userRepository.findOne({
      where: {
        username: username
      }
    });
    return user.id;
  }



}
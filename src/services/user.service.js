export default class UserService {
  constructor(userRepository, log){
    this.userRepository = userRepository;
    this.log = log;
  }

  async createUser(user) {
    this.log(`UserService: Creating User ${user}`);
    const user = await this.userRepository.create(user);
    return user;
  }

  async getUserByUsername(username) {
    this.log(`UserService: Retrieving User ${username}`);
    const user = await this.userRepository.findOne({
      where: {
        username
      }
    });
    return user;
  }

  async getUserById(userId){
    this.log(`UserService: Retrieving User ${userId}`);
    const user = await this.userRepository.findOne({
      where: {
        id: userId
      }
    });
    return user;
  }

  async getUsernameFromId(userId){
    this.log(`UserService: Retrieving User ${username}`);
    const user = await this.userRepository.findOne({
      where: {
        id: userId
      }
    });
    return user.username;
  }



}
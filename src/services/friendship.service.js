export default class Friendship {
  constructor(friendshipRepository, log){
    this.friendshipRepository = friendshipRepository;
    this.log = log;
  }

  async getUsersFriends(userid) {
    this.log(`FriendshipService: Retrieving friends of user ${username}`);
    const friends = await this.friendshipRepository.findAll({
      where: {
        id1: userid
      }
    });
    return friends;
  }

  async addFriends(id1, id2) {
    this.log(`FriendshipService: Adding ${id1} and ${id2} as friends`);
    const friendship1 = await this.friendshipRepository.create({
        id1,
        id2
      }
    );
    const friendship2 = await this.friendshipRepository.create({
      id1: id2,
      id2: id1
    });

    return friendship1 && friendship2;
  }


}
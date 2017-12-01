export default class Friendship {
  constructor(friendshipRepository){
    this.friendshipRepository = friendshipRepository;
  }

  async getUsersFriends(userid) {
    console.log(`FriendshipService: Retrieving friends of user ${userid}`);
    if(userid.length > 0) {
      const friends = await this.friendshipRepository.findAll({
        attributes: ['id2Id'],
        where: {
          id1Id: userid
        }
      });
      if (friends && friends.length > 0) {
        return friends;
      } else {
        return [];
      }
    }
    return [];
  }

  async addFriends(id1, id2) {
    console.log(`FriendshipService: Adding ${id1} and ${id2} as friends`);
    const friendship1 = await this.friendshipRepository.create({
        id1Id: id1,
        id2Id: id2
      }
    );
    const friendship2 = await this.friendshipRepository.create({
      id1Id: id2,
      id2Id: id1
    });

    return friendship1 && friendship2;
  }


}
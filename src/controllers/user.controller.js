let userService = {};
let friendshipService = {};

export async function getUser(req, res, next) {
  userService.getUserByUsername(req.params.username)
    .then((user) => {
      if(!user){
        res.sendStatus(404);
      }
      res.send(user);
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
}

export async function getFriends(req, res, next) {
  friendshipService.getUsersFriends(req.params.userId)
    .then((friends) =>{
      const ids = [];
      friends.forEach((friend) => {
        ids.push(friend.id2Id);
      });

      userService.findUsersById(ids)
        .then((friendsObjects) => {
          res.json({ friends: friendsObjects });
        })
        .catch((err) => {
          res.json({ success: false, err });
        });
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
}

export async function addFriends(req, res, next) {
  friendshipService.addFriends(req.body.id1, req.body.id2)
    .then((bool) => {
      if(bool) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
}

export async function createUser(req, res, next) {
  userService.createUser(req.body.user)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
}

export function setDependencies(newUserService, newFriendshipService){
  userService = newUserService;
  friendshipService = newFriendshipService;
}
let userService = {};
let friendshipService = {};

export async function getUser(req, res, next) {
  userService.getUserById(req.params.userId)
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

export async function getUserByUsername(req, res, next) {
  userService.getUserByUsername(req.body.username)
    .then((user) => {
      if(!user){
        const newUser = {
          username: req.body.username,
          firstName: req.body.firstName,
          lastName: req.body.lastName
        };
        userService.createUser(newUser)
          .then((createdUser) => {
            res.json({ user: createdUser });
          })
          .catch((err) => {
            res.json({ success: false, err });
          })
      } else {
        res.json({ user });
      }
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
      if(ids.length > 0) {
        userService.findUsersById(ids)
          .then((friendsObjects) => {
            res.json({ friends: friendsObjects });
          })
          .catch((err) => {
            res.json({ success: false, err });
          });
      } else {
        res.json({ friends: [] });
      }
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
}

export async function addFriends(req, res, next) {

  userService.getIdFromUsername(req.body.username).then((id2) => {
    friendshipService.addFriends(req.body.id1, id2)
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
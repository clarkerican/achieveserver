let friendshipService = {};
let postService = {};

export async function likePost(req, res, next) {
  postService.likePost(req.params.postid)
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      res.json({ success: false, err })
    });
}

export async function createPost(req, res, next) {
  const post = req.body.post;
  postService.createPost(post)
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
}

export async function getUsersFeed(req, res, next) {
  const userId = req.params.userid;
  friendshipService.getUsersFriends(userId)
    .then((friends) => {
      postService.getPostsByAuthors(friends)
        .then((posts) => {
          res.json(posts);
        })
        .catch((err) => {
          res.json({ success: false, err });
        });
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
}

export async function getPost(req, res, next) {
  const postId = req.params.postid;
  postService.getPostById(postId)
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
}

export async function getPostsComments(req, res, next) {
  const postId = req.params.postid;
  postService.getCommentsByPost(postId)
    .then((comments) => {
      res.json(comments);
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
}

export async function createComment(req, res, next) {
  const postId = req.params.postid;
  const comment = req.body.comment;
  postService.createComment(comment, postId)
    .then((comment) => {
      res.json(comment);
    })
    .catch((err) => {
      res.json({ success: false, err });
    })
}



export function setDependencies(newPostService, newFriendshipService){
  friendshipService = newFriendshipService;
  postService = newPostService;
}
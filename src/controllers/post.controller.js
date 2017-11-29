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
  const authorId = req.body.author;
  postService.createPost(post, authorId)
    .then((newPost) => {
      res.json(newPost);
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
}

export async function getUsersFeed(req, res, next) {
  const userId = req.params.userid;
  friendshipService.getUsersFriends(userId)
    .then((friends) => {
      const ids = [ userId ];
      friends.forEach((friend) => {
        ids.push(friend.id2Id);
      });

      postService.getPostsByAuthors(ids)
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
      postService.getCommentsByPost(postId)
        .then((comments) => {
          res.json({ post, comments });
        })
        .catch((err) => {
          res.json({ success: false, err });
        });
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
  const author = req.body.author;
  postService.createComment(comment, postId, author)
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
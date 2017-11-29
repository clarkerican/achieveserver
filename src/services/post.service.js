import sequelize from 'sequelize';

const OR = sequelize.Op.or;

export default class PostService {
  constructor(postRepository, commentRepository){
    this.postRepository = postRepository;
    this.commentRepository = commentRepository;
  }

  async createPost(post, authorId) {
    console.log(`PostService: Creating post ${post}`);
    const newPost = await this.postRepository.create(post);
    newPost.setAuthor(authorId);
    return newPost;
  }

  async createComment(comment, postId, authorId) {
    console.log(`PostService: Creating a comment ${comment} for post ${postId} and author ${authorId}`);
    const newComment = await this.commentRepository.create(comment);
    newComment.setPostid(postId); // This may or may not work revisit and test
    newComment.setAuthor(authorId);
    return newComment;
  }

  async getPostById(postId) {
    console.log(`PostService: Retrieving post ${postId}`);
    const post = await this.postRepository.findOne({
      where: {
        id: postId
      }
    });

    return post;
  }

  async getPostsByAuthor(authorId) {
    console.log(`PostService: Retrieving posts by author ${authorId}`);
    const posts = await this.postRepository.findAll({
      where: {
        authorId: authorId
      }
    });
    return posts;
  }

  async getPostsByAuthors(authors) {
    console.log(`PostService: Retrieving posts by authors ${authors}`);

    const posts = await this.postRepository.findAll({
      order: [
        ['createdAt', 'DESC']
      ],
      where: {
        authorId: {
          [OR]: authors
        }
      }
    });
    return posts;
  }

  async getCommentsByPost(postId){
    console.log(`PostService: Retrieve comments by post ${postId}`);

    const comments = await this.commentRepository.findAll({
      where: {
        postidId: postId
      }
    });
    return comments;
  }

  async likePost(postId) {
    console.log(`Post Service: Liking post ${postId}`);

    const post = await this.postRepository.findOne({
      where: {
          id: postId
        }
    });

    if(post) {
      const postLikes = post.likes;
      await post.updateAttributes({
        likes: postLikes + 1
      });
      return true;
    }
    return false;
  }


}
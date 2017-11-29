import sequelize from 'sequelize';

const OR = sequelize.Op.or;

export default class PostService {
  constructor(postRepository, commentRepository, log){
    this.postRepository = postRepository;
    this.commentRepository = commentRepository;
    this.log = log;
  }

  async createPost(post) {
    this.log(`PostService: Creating post ${post}`);
    const newPost = await this.postRepository.create(post);
    return newPost;
  }

  async createComment(postId, comment) {
    this.log(`PostService: Creating a comment ${comment} for post ${postId}`);
    const newComment = await this.commentRepository.create(comment);
    newComment.setPost(postId); // This may or may not work revisit and test
    return newComment;
  }

  async getPostById(postId) {
    this.log(`PostService: Retrieving post ${postId}`);
    const post = await this.postRepository.findOne({
      where: {
        id: postId
      }
    });

    return post;
  }

  async getPostsByAuthor(authorId) {
    this.log(`PostService: Retrieving posts by author ${authorId}`);
    const posts = await this.postRepository.findAll({
      where: {
        author: authorId
      }
    });
    return posts;
  }

  async getPostsByAuthors(authors) {
    this.log(`PostService: Retrieving posts by authors ${authors}`);

    const posts = await this.postRepository.findAll({
      where: {
          [OR]: authors
        }
    });
    return posts;
  }

  async getCommentsByPost(postId){
    this.log(`PostService: Retrieve comments by post ${postId}`);

    const comments = await this.commentRepository.findAll({
      where: {
        postid: postId
      }
    });
    return comments;
  }

  async likePost(postId) {
    this.log(`Post Service: Liking post ${postId}`);

    const post = await this.postRepository.findAll({
      where: {
          id: postId
        }
    });

    if(post) {
      await post.updateAttributes({
        likes: post.likes + 1
      });
      return true;
    }
    return false;
  }


}
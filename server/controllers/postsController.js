const db = require('../models/socialModels');

const postsController = {};

postsController.getFeedPosts = async (req, res, next) => {
  try {
    /* All posts without parents will be assigned a parent_id of 0 in the db
            --> That means to get all feedPosts
    */
    const query = `
    SELECT * FROM posts p
    WHERE p.parent_id = 0
    ORDER BY p.createdat DESC`;
    const response = await db.query(query);
      res.locals.feedPosts = response.rows;
      console.log('Rows is', response)
      return next();

  } catch (err) {
    return next({
      log: 'error at postController.getFeedPosts',
      status: 401,
      message: `failed to retrieve posts ${err.message}`,
    });
  }
};
/*  Called in routes/posts.js on router.get('/thread-posts',...)
       -->Gets all child comments on a post  */
postsController.getThreadPosts = async (req, res, next) => {
  try {
    const { number } = req.params;
    // postId = req.params.number
    // console.log('PostId is', number)
    // console.log('Request.params is', req.params);
    const query = `
  SELECT * FROM posts p
  WHERE p.parent_id = $1
  ORDER BY p.createdat`;
  
    const response = await db.query(query, [number]) 
      res.locals.threadPosts = response.rows;
      // console.log('Res obj', response.rows)
      // console.log('This is the params.number', params.number);
      return next();
    
  } catch (err) {
    return next({
      log: 'error at postController.getThreadPosts',
      status: 401,
      message: `failed to retrieve thread posts ${err.message}`,
    });
  }
};

postsController.createPost = async (req, res, next) => {
  /*  Check if a parent_id is in the req body */
  if (req.body.parent_id) {
    try {
      /* If parent_id is present then the post is a thread post */
      const { user_id, alias, body, parent_id } = req.body;

      const query = `
        INSERT INTO posts(user_id, alias, createdat, body, parent_id)
        VALUES($1, $2, NOW(), $3, $4)
        RETURNING *`;

      const { rows } = await db.query(query, [user_id, alias, body, parent_id])
        res.locals.newPost = rows[0];
        return next();

      /* Error handler for creating a comment ie thread post */
    } catch (err) {
      return next({
        log: 'error at postsController.createPost when creating a thread post',
        status: 401,
        message: `failed to create comment, error: ${err.message}`,
      });
    }
    /* If parent_id is not present then the post is a feed post */
  } else {
    try {
      const { user_id, alias, body } = req.body;

      const query = `
          INSERT INTO posts(user_id, alias, createdat, body)
          VALUES($1, $2, NOW(), $3)
          RETURNING *`;

      const { rows } = await db.query(query, [user_id, alias, body]) 
        res.locals.newPost = rows[0];
        return next();
      
      /* Error handling for creating a feed post */
    } catch (err) {
      return next({
        log: 'error at postsController.createPost when creating a feed post',
        status: 401,
        message: `failed to create post, error: ${err.message}`,
      });
    }
  }
};

module.exports = postsController;

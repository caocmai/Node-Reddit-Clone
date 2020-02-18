const Post = require('../models/post');
const User = require('../models/user');

module.exports = (app) => {

  // // CREATE
  // app.post('/posts/new', (req, res) => {
  //   console.log("NEW POST\n\n")
  //   // INSTANTIATE INSTANCE OF POST MODEL
  //   const post = new Post(req.body);

  //   // SAVE INSTANCE OF POST MODEL TO DB
  //   post.save((err, post) => {
  //     // REDIRECT TO THE ROOT
  //     return res.redirect('/');
  //   })
  // });

  app.get("/", (req, res) => {
    var currentUser = req.user;
    console.log("this is the current user\n\n\n\n")
    console.log(currentUser)
    console.log(req)

    Post.find().populate('author')
      .then(posts => {
        res.render("posts-index", { posts, currentUser });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  app.get("/posts/new", (req, res) => res.render("posts-new"));


  // CREATE
  app.post("/posts/new", (req, res) => {
    if (req.user) {
        var post = new Post(req.body);
        post.author = req.user._id;

        post
            .save()
            .then(post => {
                return User.findById(req.user._id);
            })
            .then(user => {
                user.posts.unshift(post);
                user.save();
                // REDIRECT TO THE NEW POST
                res.redirect(`/posts/${post._id}`);
            })
            .catch(err => {
                console.log(err.message);
            });
    } else {
        return res.status(401); // UNAUTHORIZED
    }
  });

  
  // SUBREDDIT
  app.get("/n/:subreddit", function(req, res) {
    Post.find({ subreddit: req.params.subreddit })
      .then(posts => {
        res.render("posts-index", { posts });
      })
      .catch(err => {
        console.log(err);
      });
  });



  app.get('/posts/:id', function (req, res) {
    // LOOK UP THE POST
    Post.findById(req.params.id).populate('comments').then((post) => {
        res.render('posts-show', {
            post
        })
    }).catch((err) => {
        console.log(err.message)
    })
  });

};


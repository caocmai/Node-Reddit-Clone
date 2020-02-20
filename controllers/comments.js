const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports = function (app) {
    // CREATE Comment - OLD before chapter 10
    // app.post("/posts/:postId/comments", function (req, res) {
    //     // INSTANTIATE INSTANCE OF MODEL
    //     const comment = new Comment(req.body);
    //     comment.author = req.user._id;
    //     console.log('///////')

    //     // SAVE INSTANCE OF Comment MODEL TO DB
    //     comment
    //         .save()
    //         .then(comment => {
    //             console.log(req.params.postId)
    //             return Post.findById(req.params.postId);
    //         })
    //         .then(post => {
    //             post.comments.unshift(comment);
    //             console.log(comment)
    //             return post.save();

    //         })
    //         .then(post => {
    //             res.redirect(`/`);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // });


    // CREATE Comment
    app.post("/posts/:postId/comments", function (req, res) {
        const comment = new Comment(req.body);
        comment.author = req.user._id;
        comment
            .save()
            .then(comment => {
                return Promise.all([
                    Post.findById(req.params.postId)
                ]);
            })
            .then(([post, user]) => {
                post.comments.unshift(comment);
                return Promise.all([
                    post.save()
                ]);
            })
            .then(post => {
                res.redirect(`/posts/${req.params.postId}`);
            })
            .catch(err => {
                console.log(err);
            });
    });
};

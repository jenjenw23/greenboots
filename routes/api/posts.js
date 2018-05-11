//what this file for?
//users are going to be able to create posts/comments
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//bring in post model
const Post = require("../../models/Post");
//bring in the Profle model
const Profile = require("../../models/Profile");

// Validation
const validatePostInput = require("../../validation/post");

//@route            GET api/posts/test
//what this does... Tests posts route
//@access           Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

//@route            GET api/posts
//what this does... Get post
//@access           Public
router.get("/"),
  (req, res) => {
    Post.find()
      .sort({ date: -1 })
      .then(posts => res.json(posts))
      .catch(err => res.status(404).json({ nopostsfound: "no posts found" }));
  };

//@route            GET api/posts/:id
//what this does... Get post by id
//@access           Public
router.get("/:id"),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => res.json(post))
      .catch(err =>
        res.status(404).json({ nopostfound: "no post found with that ID" })
      );
  };

//@route            POST api/posts
//what this does... Create post
//@access           Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //Check our validation
    if (!isValid) {
      // if any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);

//@route            DELETE api/posts/:id
//what this does... Delete post
//@access           Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            res.status(401).json({ notauthorized: "user not authorized" });
          }

          //Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "no post found" }));
    });
  }
);

//@route            POST api/posts/like/:id
//what this does... lets user like a post
//@access           Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //if they already like the post don't allow them to do another
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res.json(400).json({ alreadylike: "Post already liked" });
          }
        })
        .catch(err => res.status(404).json({ postnotfound: "no post found" }));
      // add users like
      post.likes.unshift({ user: req.user.id });
      //post.save() saves to the database
      post.save().then(post => res.json(post));
    });
  }
);

//@route            POST api/posts/unlike/:id
//what this does... lets user unlike a post
//@access           Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //find the user with findOne
    Profile.findOne({ user: req.user.id })
      //get the profile with the then promise
      .then(profile => {
        //find the profile by id
        Post.findById(req.params.id)
          .then(post => {
            //if they already like the post don't allow them to do another
            if (
              post.likes.filter(like => like.user.toString() === req.user.id)
                .length === 0
            ) {
              return res.json(400).json({ notlike: "Quit being a hater!" });
            }
          })
          .catch(err =>
            res.status(404).json({ postnotfound: "no post found" })
          );

        //get remove index
        const removeIndex = post.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);

        // Splice out of array
        post.likes.splice(removeIndex, 1);
        //Save to database
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        // Add to comments array
        post.comments.unshift(newComment);

        // Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check to see if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

module.exports = router;

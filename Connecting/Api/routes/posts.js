const express = require("express");
const {createPostWithImagesController_V2,
    createPostWithImagesController_V3,
    getPostController,
    getSinglePostController,
    getUserPostsController,
    generateFileName,
    generateFileNameMultiple,
    deletePostController,
    liekePostController,
    dislikePostController,} = require("../controllers/postController");
const router = express.Router();


router.post("/create/v3/:userId",createPostWithImagesController_V3);

router.post("/create/v2/:userId",createPostWithImagesController_V2);

router.get("/all",getPostController);

router.get("/single/:postId",getSinglePostController);

router.get("/user/:userId", getUserPostsController);

router.delete("/user/:userId", deletePostController);

router.post("/like/:postId", liekePostController);

router.post("/dislike/:postId", dislikePostController);

module.exports = router; 

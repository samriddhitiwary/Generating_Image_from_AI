const axios = require("axios");
const fs = require("fs");
const sharp = require("sharp");
const path = require("path");
const Post = require("../models/Post");
const User = require("../models/User");
const {CustomError} = require("../middlewares/error");

const generateFileName = (userId, allPostsLength) =>{
    const date = new Date().toDateString().replace(/:/g, "-");
    return `${userId}-${allPostsLength}-${date}.png`;

};


const createPostWithImagesController_V3 = async(req,res,next) =>{
    const {userId} = req.params;
    const {prompt, negativePrompt, size,style,imageURL, revisedPrompt} = req.body;

    const allPosts = await Post.find();
    const allPostsLength = allPosts.length;
    const fileName = generateFileName(serId, allPostsLength);
    const filePath = path.join(__dirname, "../..","uploads",fileName);

    try{
        const user = await User.findById(userId);
        if(!user){
            throw new CustomError("User not found!",404);
        }
        const response = await axios({
            url: imageURL,
            responseType: "arraybuffer",
            maxRedirects: 5,
        });
        const imageBuffer = Buffer.from(response.data);
        await sharp(imageBuffer).png().toFile(filePath);

        const newPost = new Post({
            user: userId,
            aiModel: "AI Image Art Dall-e-v3",
            prompt:negativePrompt,
            revisedPromptL:revisedPrompt,
            size:size,
            quality:"HD",
            quantity:1,
            style:style,
            images:fileName,
            aiMage:imageURL,

        });
        await newPost.save();
        user.posts.push(newPost._id);
        await user.save();

        res.status(201).json({message:"Post created successfully", post: newPost});

    }catch(error){
        next(error);
    }
};

const generateFileNameMultiple = (userId,index) => {
    const date = new Date().toDateString.replace(/:/g, "-");
    return `${userId}-${index}-${date}.png`;
};

const createPostWithImagesController_V2 = async(req,res,next) => {
    const {userId} = req.params;
    const {prompt, negativePrompt, size,n,imageURLs} = req.body;

    try{
        const user = await User.findById(userId);
        if(!user){
            throw new CustomError("User not found!",404);
        }
        // const downloadAndCovertImages = awair Promise.all(
        //     imageURLs.map(async(imageURL, index) => {

        //     }))
        const response = await axios({
            url: imageURL,
            responseType: "arraybuffer",
            maxRedirects: 5,
        });
        const imageBuffer = Buffer.from(response.data);
        await sharp(imageBuffer).png().toFile(filePath);

        const newPost = new Post({
            user: userId,
            aiModel: "AI Image Art Dall-e-v3",
            prompt:negativePrompt,
            revisedPromptL:revisedPrompt,
            size:size,
            quality:"HD",
            quantity:1,
            style:style,
            images:fileName,
            aiMage:imageURL,

        });
        await newPost.save();
        user.posts.push(newPost._id);
        await user.save();

        res.status(201).json({message:"Post created successfully", post: newPost});

    }catch(error){
        next(error);
    }

   
};  

const getPostController = async (req,res,next) => {
    
}

const getSinglePostController = async(req,res,next) => {};

const getUserPostsController = async(req,res,next) => {};

const deletePostController = async(req,res,next) => {};

const liekePostController = async(req,res,next) => {};

const dislikePostController = async(req,res,next) => {};

module.exports = {
    createPostWithImagesController_V2,
    createPostWithImagesController_V3,
    getPostController,
    getSinglePostController,
    getUserPostsController,
    generateFileName,
    generateFileNameMultiple,
    deletePostController,
    liekePostController,
    dislikePostController,
}
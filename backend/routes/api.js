const express = require('express')
const router = express.Router()
const {createPost, allPosts, getPost, updatePost, deletePost} = require('../controllers/blogController')
const {protect} = require('../middleware/authMiddleware')
const {upload} = require('../config/multerConfig');

router.route('/create').post(protect,upload.single('image'),createPost);
  
router.route('/').get(allPosts);

router.route('/read/:id').get(getPost)
  

router.route('/update/:id').put(protect,updatePost);
router.route('/delete/:id').delete(protect,deletePost);
 

module.exports = router


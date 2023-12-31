const express = require('express')
const router = express.Router()
const {createPost, allPosts, getPost, updatePost, deletePost} = require('../controllers/blogController')
const {protect} = require('../middleware/authMiddleware')


router.route('/create').post(protect,createPost);
  
router.route('/read').get(allPosts);

router.route('/read/:id').get(getPost)
  

router.route('/update/:id').put(protect,updatePost);
router.route('/delete/:id').delete(protect,deletePost);
 

module.exports = router


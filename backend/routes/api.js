const express = require('express')
const router = express.Router()
const BlogPost = require('../models/BlogPost')


router.post('/create', async (req, res) => {
    const { title, content } = req.body;
    console.log('Received data:', title, content);
    if (title !== undefined && title !== null && title !== ''){

      const newPost = new BlogPost({ title, content });
      try {
        await newPost.save();
        console.log('Post saved:', newPost);
    
        res.send(newPost._id);
      } catch (error) {
        console.error('Error saving post:', error);
        res.status(500).send('Internal Server Error');
      }
    }
  
    
  });
  
  router.get('/read', async (req, res) => {
    try {
      const posts = await BlogPost.find();
      console.log('Retrieved posts:', posts);
  
      res.send(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  router.get('/read/:id', async (req, res) => {
    try {
      const {id} = req.params
      const post = await BlogPost.findById(id)
      res.send(post)
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).send('Internal Server Error');
    }
  })
  

  router.put('/update/:id', async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;
    console.log(req.body)
    try {
      const updatedPost = await BlogPost.findByIdAndUpdate(
        id,
        { title, content },
        { new: true }
      );
  
      if (!updatedPost) {
        return res.status(404).send('Post not found');
      }
  
      res.send(updatedPost);
    } catch (error) {
      console.log(req.body)
      console.error('Error updating post:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPost = await BlogPost.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).send("Post not found");
        }
        res.send("Deleted Successfully");
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).send("Internal Server Error");
    }
});
 

module.exports = router


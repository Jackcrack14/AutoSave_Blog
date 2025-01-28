const BlogPost = require('../models/BlogPost')


const createPost = async (req,res) => {
    const { title, content } = req.body;
    console.log('Received data:', title, content);
    

    try {
      if (!title?.trim()) {
        return res.status(400).json({ error: "Title is required" });
      }
      
      if (!content?.trim()) {
        return res.status(400).json({ error: "Content is required" });
      }
      
      
      const newPost = new BlogPost({ title: title.trim(), content:content.trim(),image:req.file.buffer, owner:req.user._id });
        await newPost.save();
        console.log('Post saved:', newPost);
    
        res.send(newPost._id);
      } catch (error) {
        console.error('Error saving post:', error);
        res.status(500).send('Internal Server Error');
      }
    
}


const allPosts = async (req,res) => {
    try {
        const posts = await BlogPost.find();
        // console.log('Retrieved posts:', posts);
    
        res.send(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Internal Server Error');
      }
}

const getPost = async (req, res) => {
    try {
      const {id} = req.params
      const post = await BlogPost.findById(id)
      res.send(post)
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).send('Internal Server Error');
    }

}

const updatePost = async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;
    // console.log(req.body)
    try {
      let updatedPost
      const user = req.user._id
      const post_owner = await BlogPost.findById(id).select('owner');
      console.log(post_owner)
      if (user.toString() === post_owner.owner[0]._id.toString()){
        updatedPost = await BlogPost.findByIdAndUpdate(id,
          {title, content})

          if (!updatedPost) {
            return res.status(404).send('Post not found');
          }
      } 
  
      
  
      res.send(updatedPost);
    } catch (error) {
      console.log(req.body)
      console.error('Error updating post:', error);
      res.status(500).send('Internal Server Error');
    }
  }

const deletePost = async (req, res) => {
    const { id} = req.params;
    try {
      const user = req.user._id
      const post_owner = await BlogPost.findById(id).select('owner');
      let deletedPost
      // console.log(user.toString() === post_owner.owner[0]._id.toString())
      // console.log(user)
      if (user.toString() === post_owner.owner[0]._id.toString()){
        deletedPost = await BlogPost.findByIdAndDelete(id)
        // console.log("deleted Posts")
        if (!deletedPost) {
          return res.status(404).send("Post not found");
      }
      };
      // console.log(id)
        res.send(deletedPost);
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {createPost, allPosts, getPost, updatePost, deletePost }
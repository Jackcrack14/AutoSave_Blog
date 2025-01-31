// PostList.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, updatePost } from "../redux/reducers/blogReducer";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { logout } from "../redux/reducers/authReducer";
import MainLayout from "./layout/MainLayout";

const PostView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const posts = useSelector((state) => state.blog.posts);
  const post = posts.find((p) => p._id === id);
  const user = useSelector((state) => state.auth.user);
  console.log(user._id, post);

  const handleDelete = async (postId) => {
    console.log(postId);
    try {
      dispatch(deletePost(postId));
      const response = await fetch(
        `http://localhost:5000/blogs/delete/${postId}`,
        {
          method: "DELETE",
          headers: {
            ownerization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response)
      if (!response.ok) {
        throw new Error("Failed to delete post from the backend");
      }

      // Handle success, e.g., log the response
      const data = await response;
      console.log("Post deleted from backend:", data);
      navigate("/posts");
    } catch (error) {
      console.error("Error saving post to backend:", error);
      // Handle error, e.g., show an error message to the user
    }
  };
  const handleEdit = (postId) => {
    navigate(`/edit/${postId}`);
  };
  const navigatePost = () => {
    navigate("/posts");
  };
  const handleLogout = () => {
    navigate("/login");
    dispatch(logout());
  };

  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="w-1/2 space-y-10">
          <div className="space-y-5">
            <div className="space-y-3">
              <h1 className="text-4xl ">{post.title}</h1>
              <h2 className="text-3xl">{post.excerpt}</h2>
            </div>
            <div className="flex space-x-5">
              <img
                className="rounded-full object-cover aspect-square w-12 h-12"
                src={post?.owner[0]?.avatar}
              ></img>
              <div>
                <h4 className="text-sm">{post?.owner[0]?.name}</h4>
                <h6 className="text-xs">{post?.readTime}</h6>
              </div>
              <div>
                <h4 className="text-sm">Follow</h4>
                <h6 className="text-xs">{post?.date}</h6>
              </div>
            </div>
          </div>
          <div>
            <figure>
              <img src={post?.coverImage}></img>
            </figure>
          </div>
          <div>{parse(post.content)}</div>
          {user._id === post.owner[0]._id ? (
            <button
              onClick={() => handleDelete(post._id)}
              className=" py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              Delete
            </button>
          ) : null}
          {/* Add an Edit button with a link to the edit route */}
          <Link to={`/edit/${post._id}`}>
            {user._id === post.owner[0]._id ? (
              <button
                onClick={() => handleEdit(post._id)}
                className="mx-5 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                Edit
              </button>
            ) : null}
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default PostView;

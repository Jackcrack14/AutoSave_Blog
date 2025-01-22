import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, updatePost } from "../redux/reducers/blogReducer";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/reducers/authReducer";
import { Clock, MessageCircle, Trash2, Edit } from "lucide-react";

export default function PostList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const posts = useSelector((state) => state.blog.posts); // Assuming you fetch posts from Redux store

  const handleDelete = async (postId) => {
    try {
      dispatch(deletePost(postId)); // Redux dispatch to remove post
      const response = await fetch(
        `http://localhost:5000/blogs/delete/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete post from the backend");
      }

      const data = await response.json();
      console.log("Post deleted from backend:", data);
      navigate("/posts");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleLogout = () => {
    navigate("/login");
    dispatch(logout());
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-6">Blog Posts</h2>
      <button
        onClick={() => navigate("/posts")}
        className="mb-6 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
      >
        View All Posts
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post._id}
            className="group bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300"
          >
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                <span>{post.owner}</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comments}</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {post.title}
              </h3>
              <p className="text-gray-300 mb-4">{post.excerpt}</p>

              <div className="flex space-x-3">
                {user._id === post.owner && (
                  <>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="text-red-500 hover:text-red-400 flex items-center space-x-1"
                    >
                      <Trash2 className="w-5 h-5" />
                      <span>Delete</span>
                    </button>
                    <Link
                      to={`/edit/${post._id}`}
                      className="text-yellow-500 hover:text-yellow-400 flex items-center space-x-1"
                    >
                      <Edit className="w-5 h-5" />
                      <span>Edit</span>
                    </Link>
                  </>
                )}
                <Link
                  to={`/view/${post._id}`}
                  className="text-blue-500 hover:text-blue-400 flex items-center space-x-1"
                >
                  <span>View</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

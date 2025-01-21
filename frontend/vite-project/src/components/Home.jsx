import React from "react";
import PostList from "./PostList";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TrendingUp, Bookmark, ThumbsUp, MessageCircle } from "lucide-react";
import { logout } from "../redux/reducers/authReducer";
import MainLayout from "./layout/MainLayout";
export default function Home({ posts }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    navigate("/login");
    dispatch(logout());
  };
  // console.log(user)
  const featuredPosts = [
    {
      id: 1,
      title: "The Future of Web Development in 2024",
      excerpt:
        "Exploring the latest trends and technologies shaping modern web development...",
      author: {
        name: "Sarah Chen",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      date: "Mar 15, 2024",
      readTime: "5 min read",
      likes: 234,
      comments: 45,
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
    },
    // Add more featured posts...
  ];
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-up">
            Discover stories that inspire
          </h1>
          <p className="text-xl text-gray-400 mb-8 animate-fade-up animation-delay-100">
            Join a community of writers and readers sharing their passion
          </p>
          <div className="flex space-x-4 animate-fade-up animation-delay-200">
            <a
              href="/explore"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Start Reading
            </a>
            <a
              href="/add"
              className="px-6 py-3 border border-purple-500 text-purple-400 rounded-lg hover:bg-purple-500 hover:text-white transition-colors"
            >
              Start Writing
            </a>
          </div>
        </section>

        {/* Trending Section */}
        <section className="mb-16">
          <div className="flex items-center space-x-2 mb-8">
            <TrendingUp className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-bold text-white">Trending Now</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-white font-medium">
                        {post.author.name}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {post.date} · {post.readTime}
                      </p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-gray-400">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 hover:text-purple-400">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-purple-400">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </button>
                    </div>
                    <button className="hover:text-purple-400">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

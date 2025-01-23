import React from "react";
import { Clock, MessageCircle, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ArticleCard({ article }) {
  const navigate = useNavigate();
  return (
    <article className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300" style={{cursor:'pointer'}} onClick={() => navigate(`/blogs/${article?.id}`)}>
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-white font-medium">{article.author.name}</p>
            <p className="text-gray-400 text-sm">{article.date}</p>
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
        <p className="text-gray-400 mb-4">{article.excerpt}</p>
        <div className="flex items-center justify-between text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>{article.comments}</span>
            </div>
          </div>
          <button className="hover:text-purple-400 transition-colors">
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

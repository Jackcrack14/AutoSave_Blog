import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { SearchBar } from "../components/explore/SearchBar";
import { CategoryTabs } from "../components/explore/CategoryTabs";
import { FilterDropdown } from "../components/explore/FilterDropdown";
import { ArticleCard } from "../components/explore/ArticleCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const categories = [
  "All",
  "Technology",
  "Design",
  "Development",
  "Business",
  "Lifestyle",
  "Writing",
];

const filterOptions = [
  { label: "Most Recent", value: "recent" },
  { label: "Most Popular", value: "popular" },
  { label: "Most Discussed", value: "discussed" },
];

const sampleArticles = [
  {
    id: 1,
    title: "The Future of Web Development",
    excerpt:
      "Exploring the latest trends and technologies shaping the web development landscape in 2024 and beyond.",
    author: {
      name: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    coverImage:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    readTime: "5 min read",
    comments: 12,
    date: "Mar 15, 2024",
  },
  {
    id: 2,
    title: "Mastering TypeScript in 2024",
    excerpt:
      "Essential tips and tricks for becoming a TypeScript expert and writing better code.",
    author: {
      name: "Michael Ross",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    readTime: "7 min read",
    comments: 8,
    date: "Mar 14, 2024",
  },
  {
    id: 3,
    title: "Design Systems in Practice",
    excerpt:
      "Building scalable and maintainable design systems for modern applications.",
    author: {
      name: "Emma Wilson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    coverImage:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    readTime: "6 min read",
    comments: 15,
    date: "Mar 13, 2024",
  },
];

export function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFilter, setSelectedFilter] = useState("recent");
  const blogs = useSelector(state => state.blog.posts);
  
  const navigate = useNavigate();


  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Explore Articles
          </h1>
          <p className="text-gray-400 text-lg">
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <FilterDropdown
            options={filterOptions}
            selectedFilter={selectedFilter}
            onSelect={setSelectedFilter}
          />
        </div>

        <div className="mb-8">
          <CategoryTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
          
        <div className="mt-12 flex justify-center">
          <button className="px-6 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
            Load More Articles
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

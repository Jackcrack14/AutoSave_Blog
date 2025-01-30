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



export function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFilter, setSelectedFilter] = useState("recent");
  const blogs = useSelector(state => state.blog.posts);
  
  const navigate = useNavigate();

  if(!blogs) {
    return <div>Loading!!!</div>
  }
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

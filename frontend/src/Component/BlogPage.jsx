import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import api from "../Api/Api";
import toast from "react-hot-toast";
import {
  CalendarDays,
  User,
  Tag,
  Eye,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  const fetchBlog = async () => {
    try {
      const res = await api.get(`/blogs/blog/${id}`, {
        withCredentials: true,
      });

      setBlog(res.data);
      console.log(res.data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.message
      );
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  if (!blog) {
    return (
      <>
        <Nav />
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
          <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
            <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading blog...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }
const formatTags = (tags) => {
  try {
    let parsed = tags;

    
    while (typeof parsed === "string") {
      parsed = JSON.parse(parsed);
    }

    
    return Array.isArray(parsed)
      ? parsed.flat(Infinity).map(tag => String(tag).replace(/"/g, "")).join(", ")
      : parsed;
  } catch (err) {
    return tags;
  }
};
  return (
    <>
      <Nav />

      <section className="bg-slate-100 min-h-screen py-10">
        <div className="max-w-6xl mx-auto px-4">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800 font-medium transition"
          >
            <ArrowLeft size={18} />
            Back to Blogs
          </Link>

          {/* Main Card */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
            {/* Image */}
            <div className="relative">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-[280px] md:h-[500px] object-cover"
              />

              <div className="absolute inset-0 bg-black/35"></div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-blue-600 px-4 py-1 rounded-full text-sm font-medium inline-block mb-4">
                  {blog.category || "Travel"}
                </span>

                <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
                  {blog.title}
                </h1>
              </div>
            </div>

            {/* Blog Details */}
            <div className="p-6 md:p-10">
              {/* Meta Info */}
              <div className="flex flex-wrap gap-5 border-b border-gray-200 pb-6 mb-8 text-gray-600">
                <div className="flex items-center gap-2">
                  <User size={18} className="text-blue-600" />
                  <span>{blog.author || "Admin"}</span>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays size={18} className="text-blue-600" />
                  <span>
                    {blog.createdAt
                      ? new Date(blog.createdAt).toLocaleDateString()
                      : "Recently Posted"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Eye size={18} className="text-blue-600" />
                  <span>{blog.views || 0} Views</span>
                </div>

                {blog.tags && (
                  <div className="flex items-center gap-2">
                    <Tag size={18} className="text-blue-600" />
                    <span>{formatTags(blog.tags)}</span>
                  </div>
                )}
              </div>

              {/* Short Description */}
              {blog.shortDescription && (
                <div className="bg-blue-50 border-l-4 border-blue-600 rounded-xl p-5 mb-8">
                  <p className="text-lg text-gray-700 italic leading-8">
                    {blog.shortDescription}
                  </p>
                </div>
              )}

              {/* Content */}
              <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-8 prose-img:rounded-2xl">
                {blog.content ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                ) : (
                  <p className="text-gray-600 text-lg">
                    No content available for this blog.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BlogPage;
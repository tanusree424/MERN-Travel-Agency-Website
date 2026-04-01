import React, { useState, useContext } from "react";
import { FaCamera, FaXmark } from "react-icons/fa6";
import { UserContext } from "../../Context/UserContext";
import api from "../../Api/Api";
import toast from "react-hot-toast";

const BlogAddModal = ({ onClose, refreshBlogs, EditBlogData , viewBlogData }) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userData } = useContext(UserContext);

  const [form, setForm] = useState({
    title: EditBlogData?.title || "",
    slug: EditBlogData?.slug || "",
    short_description: EditBlogData?.shortDescription ||"",
    author: userData?.name || "",
    content: EditBlogData?.content  || "",
    category: EditBlogData?.category ||  "",
    tags: Array.isArray(EditBlogData?.tags)
  ? EditBlogData.tags.join(", ")
  : EditBlogData?.tags
  ? JSON.parse(EditBlogData.tags).join(", ")
  : "",
    featured: EditBlogData?.featured ||  false,
    image: EditBlogData?.image || null,
  });

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setForm({
        ...form,
        image: file,
      });

      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (EditBlogData) {
      try {
        setLoading(true)
        const formData = new FormData();
        const tagsArray = form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
      formData.append("title", form.title);
      formData.append("slug", form.slug);
      formData.append("shortDescription", form.short_description);
      formData.append("author", form.author);
      formData.append("content", form.content);
      formData.append("category", form.category);
      formData.append("tags", JSON.stringify(tagsArray))
      formData.append("image" , form.image)

      const response = await api.put(`/blogs/edit-blog/${EditBlogData?._id}`, formData , 
        {
          withCredentials:true , 
          headers:{"Content-Type":"multipart/form-data"}
        });
        toast.success(response?.data?.message)
        refreshBlogs()
        onClose();
      
      } catch (error) {
        toast.error(error?.response?.data?.message || error?.message)
        setLoading(false)

      }finally{
        setLoading(false)
      }
    }else{

    if (!form.image) {
      return toast.error("Please upload a blog image");
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("slug", form.slug);
      formData.append("shortDescription", form.short_description);
      formData.append("author", form.author);
      formData.append("content", form.content);
      formData.append("category", form.category);

      
      const tagsArray = form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      formData.append("tags", JSON.stringify(tagsArray));
      formData.append("featured", form.featured);
      formData.append("image", form.image);

      const response = await api.post("/blogs/create", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response?.data?.message || "Blog Created Successfully");

      if (refreshBlogs) {
        refreshBlogs();
      }

      onClose();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to create blog"
      );
    } finally {
      setLoading(false);
    }
  }
};

if (viewBlogData) {
  return <>
   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6">
      <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-500">
          <h4 className="text-2xl font-bold text-white">{ `View Blog - ${viewBlogData?.title}`  ||"Add New Blog" }</h4>
           <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white hover:text-black"
          >
            <FaXmark size={18} />
          </button>
          </div>
           <div className="max-h-[85vh] overflow-y-auto px-6 py-6">
         
            {/* Image Upload */}
            <div className="flex flex-col items-center">
              <div className="relative mb-2">
                <img
                  src={
                    preview || viewBlogData?.image || 
                    "https://placehold.co/180x180/e5e7eb/6b7280?text=Upload"
                  }
                  alt="preview"
                  className="h-44 w-44 mx-auto rounded-2xl border-4 border-gray-200 object-cover shadow-md"
                />
                <div className="border-2 flex flex-col gap-[10px] px-[15px] py-[12px] border-gray-400 max-h-60vh">
                  
                <div className="grid grid-cols-2 border border-gray-100 p-2  justify-center items-center">
                  <h6>Blog Title:</h6>  <span>{viewBlogData?.title}</span>
                </div>
                <div className="grid grid-cols-2 border border-gray-100 p-2  justify-center items-center">
                  <h6>Blog Category:</h6>  <span>{viewBlogData?.category}</span>
                </div>
                <div className="grid grid-cols-2 border border-gray-100 p-2  justify-center items-center">
                  <h6>Blog Tags:</h6>  <span>{Array.isArray(viewBlogData?.tags) ? viewBlogData.tags.join(",") : JSON.parse(viewBlogData.tags)  }</span>
                </div>

                <div className="grid grid-cols-2 border border-gray-100 p-2  justify-center items-center">
                  <h6>Blog is Featured:</h6>  <span>{viewBlogData?.Featured}</span>
                </div>
                 <div className="grid grid-cols-2 border border-gray-100 p-2  justify-center items-center">
                  <h6>Blog Content:</h6>  <span>{viewBlogData?.content}</span>
                </div>

                 </div>

</div>
</div>
  </div>
  </div>
  </div>
  </>
}else{


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6">
      <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-500">
          <h4 className="text-2xl font-bold text-white">{ `Edit Blog - ${EditBlogData?.title}`  ||"Add New Blog" }</h4>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white hover:text-black"
          >
            <FaXmark size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[85vh] overflow-y-auto px-6 py-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={
                    preview || EditBlogData?.image || 
                    "https://placehold.co/180x180/e5e7eb/6b7280?text=Upload"
                  }
                  alt="preview"
                  className="h-44 w-44 rounded-2xl border-4 border-gray-200 object-cover shadow-md"
                />

                <label className="absolute bottom-2 right-2 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-blue-700">
                  <FaCamera size={18} />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="hidden"
                  />
                </label>
              </div>

              <p className="mt-3 text-sm text-gray-500">
                Upload blog cover image
              </p>
            </div>

            {/* Title + Slug */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Blog Title
                </label>

                <input
                  type="text"
                  placeholder="Enter blog title"
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Blog Slug
                </label>

                <input
                  type="text"
                  placeholder="enter-blog-slug"
                  value={form.slug}
                  onChange={(e) =>
                    setForm({ ...form, slug: e.target.value })
                  }
                  className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>
            </div>

            {/* Short Description */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Short Description
              </label>

              <textarea
                value={form.short_description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    short_description: e.target.value,
                  })
                }
                rows="3"
                placeholder="Write a short description..."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>

            {/* Category + Author */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Category
                </label>

                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Beach">Beach</option>
                  <option value="Hill">Hill</option>
                  <option value="Travel Tips">Travel Tips</option>
                  <option value="Family Trip">Family Trip</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Author
                </label>

                <input
                  type="text"
                  value={form.author}
                  readOnly
                  className="h-12 w-full rounded-xl border border-gray-300 bg-gray-100 px-4 outline-none"
                />
              </div>
            </div>

            {/* Tags + Featured */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Tags
                </label>

                <input
                  type="text"
                  placeholder="darjeeling, mountain, travel"
                  value={form.tags}
                  onChange={(e) =>
                    setForm({ ...form, tags: e.target.value })
                  }
                  className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />

                <p className="mt-1 text-xs text-gray-500">
                  Separate tags with commas
                </p>
              </div>

              <div className="flex items-end">
                <label className="flex h-12 w-full cursor-pointer items-center gap-3 rounded-xl border border-gray-300 px-4 transition hover:border-blue-500">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        featured: e.target.checked,
                      })
                    }
                    className="h-5 w-5 accent-blue-600"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    Mark as Featured Blog
                  </span>
                </label>
              </div>
            </div>

            {/* Blog Content */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Blog Content
              </label>

              <textarea
                rows="8"
                value={form.content}
                onChange={(e) =>
                  setForm({ ...form, content: e.target.value })
                }
                placeholder="Write your full blog content here..."
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:from-blue-700 hover:to-cyan-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Publishing..." : "Publish Blog"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
};

export default BlogAddModal;
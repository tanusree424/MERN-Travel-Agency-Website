
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import BlogAddModal from "./BlogAddModal";
import api from "../../Api/Api";
import { FaCircle, FaEye, FaPencil, FaPlugCirclePlus, FaPlus, FaTrash } from "react-icons/fa6";
import toast from "react-hot-toast";


const Blogs = () => {
  const [addBlogModal, setAddBlogModal] = useState(false);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [EditBlog, setEditBlog] = useState(false);
  const [EditBlogData, setEditBlogData] = useState(null)
  const [viewBlog, setViewBlog] = useState(false)
  const [viewBlogData, setviewBlogData] = useState(null)
 // const DataTable = DataTableModule.default;
  // console.log(DataTable)

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const response = await api.get("/blogs/all-blogs", {
        withCredentials: true,
      });

      // backend direct array return করছে
      setAllBlogs(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log(
        error?.response?.data?.message || error?.message
      );
      setAllBlogs([]);
    } finally {
      setLoading(false);
    }
  };
 const handleEdit = async (row) => {
  setEditBlog(true)
  setEditBlogData(row)

 }
  const handleDelete = async (row) => {
    if (window.confirm(`Are you sure want to delete ${row?.title}?`)) {
      try {
        const response =  await api.delete(`/blogs/delete/${row?._id}` , {withCredentials:true});
        toast.success(response?.data?.message);
        fetchBlogs()
      } catch (error) {
        console.log(error?.response?.data?.message || error?.message)
        toast.error(error?.response?.data?.message || error?.message)
      }
    }
  } 
 const handleView = (row)=>{
  setViewBlog(true);
  setviewBlogData(row)

 }
  useEffect(() => {
    fetchBlogs();
  }, []);

  const columns = [
    {
      name: "Image",
      cell: (row) => (
        <div className="py-2">
          <img
            src={row.image}
            alt={row.title}
            className="w-14 h-14 rounded-full object-cover border border-gray-300"
          />
        </div>
      ),
      width: "100px",
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      grow: 2,
    },
    
    
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            row.status === "published"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
       <div className="flex justify-center items-center gap-[10px]">
       <button onClick={()=>handleDelete(row)} title="delete" className="px-3 py-2 rounded bg-yellow-300 font-semibold cursor-pointer text-red-700 hover:bg-yellow-500 hover:transition-all"><FaTrash/></button>
       <button title="View" onClick={()=>handleView(row)} className="px-3 py-2 rounded bg-sky-300 font-semibold cursor-pointer text-green-700 hover:bg-sky-500 hover:transition-all"><FaEye/></button>
       <button title="Edit" onClick={()=>handleEdit(row)} className="px-3 py-2 rounded bg-orange-500 font-semibold cursor-pointer text-blue-700 hover:bg-orange-700 hover:transition-all"><FaPencil/></button>
       </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">All Blogs</h1>
          <p className="text-gray-500 text-sm mt-1">
            Total Blogs: {allBlogs.length}
          </p>
        </div>

        <button
          onClick={() => setAddBlogModal(true)}
          className="bg-green-600 flex justify-center text-white items-center gap-[10px] rounded hover:bg-green-700  px-3 py-2  font-medium transition"
        >
          <FaPlus/> Add Blog
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200">
        <DataTable.default
          columns={columns}
          data={allBlogs}
          progressPending={loading}
          pagination
          highlightOnHover
          responsive
          striped
          persistTableHead
          noDataComponent={
            <div className="py-6 text-gray-500">No Blogs Found</div>
          }
        />
      </div>

      {addBlogModal && (
        <BlogAddModal
          onClose={() => setAddBlogModal(false)}
          refreshBlogs={fetchBlogs}
        />
      )}
      {EditBlog && (
        <BlogAddModal
          onClose={() => setEditBlog(false)}
          EditBlogData={EditBlogData}
          refreshBlogs={fetchBlogs}
        />
      )}
       {viewBlog && (
        <BlogAddModal
          onClose={() => setViewBlog(false)}
          viewBlogData={viewBlogData}
         
        />
      )}
    </div>
  );
};

export default Blogs;



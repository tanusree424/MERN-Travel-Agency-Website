import React,{useState, useEffect} from 'react'
import DataTable from 'react-data-table-component'
import api from '../../Api/Api';
import toast from 'react-hot-toast';
import { FaStar, FaTrash } from 'react-icons/fa6';

const Feedback = () => {
    const [Feedback, setFeedback] = useState([]);
    const handleDelete = async (rowId) => {
        if (window.confirm("Are you sure want to delete?")) {
            
        
        try {
            const response = await api.delete(`/review/delete/${rowId}`, {withCredentials:true});
            console.log(response?.data)
            toast.success(response?.data?.message)
            fetchFeddback()

        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message);
        }
    }else return;
}
    const columns = [
   {
    name:"name",
    selector:(row)=>row.userId.name,
    sortable:true
   },
   {
    name:"Package Name",
    selector:(row)=>row.packageId.title,
    sortable:true
   },
   {
    name:"loaction",
    selector:(row)=>row.packageId.location
   },
  {
  name: "Rating",
  selector: (row) => (
    <div className="flex items-center gap-1 text-yellow-500">
      {[...Array(row.rating)].map((_, index) => (
        <FaStar key={index} />
      ))}
    </div>
  )
},
   {
    name:"comment",
    selector:(row)=>row.comment
   },
   {
    name:"Action",
    selector:(row)=>(<>
    <button onClick={()=>handleDelete(row._id)} className='px-2 py-2 flex justify-center items-center gap-2  bg-red-600 rounded text-white'><FaTrash/>Delete</button>
    </>)
   }
];
const fetchFeddback = async () => {
    try {
        const response = await api.get("/reviews/get-feedback",{withCredentials:true});
        console.log(response.data.reviews)
        setFeedback(response.data?.reviews)

    } catch (error) {
        toast.error(error?.response?.data?.message || error?.message)
    }
}
useEffect(() => {
  fetchFeddback()
}, [])

  return (
    <>
     {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className='text-xl font-bold'>Feedbacks</h2>

        
      </div>
      <DataTable.default
      columns={columns}
      data={Feedback}
      />
    </>
  )
}

export default Feedback
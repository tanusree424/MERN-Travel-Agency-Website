import React ,{useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel, Card } from "react-bootstrap";
import api from "../Api/Api";
import toast from "react-hot-toast";

// const testimonials = [
//   {
//     name: "Tanusree B.",
//     photo: "/images/user1.jpg",
//     rating: 5,
//     comment: "Amazing experience! Highly recommended.",
//   },
//   {
//     name: "Rahul S.",
//     photo: "/images/user2.jpg",
//     rating: 4,
//     comment: "Great service, will travel again!",
//   },
//   {
//     name: "Anita D.",
//     photo: "/images/user3.jpg",
//     rating: 5,
//     comment: "Loved the package and the support was awesome!",
//   },
// ];

const Testimonials = () => {
  const [testimonials, settestimonials] = useState([]);
  const fetchReviewData = async () => {
    try {
      const response = await api.get("/reviews/get-feedback", {withCredentials:true});
      
      console.log(response.data.reviews);
      settestimonials(response?.data.reviews)
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message)
    }
  }
  useEffect(() => {
   fetchReviewData()
  }, [])
  
  return (
    <section className="testimonials py-5" style={{ backgroundColor: "#f9f9f9" }}>
      <div className="container">
        <h2 className="text-center mb-4">What Our Customers Say</h2>
        <Carousel indicators={false} interval={4000}>
          {testimonials?.map((t, idx) => (
            <Carousel.Item key={idx}>
              <div className="d-flex justify-content-center">
                <Card className="shadow-sm rounded text-center p-4" style={{ maxWidth: "450px" }}>
                  <img
                    src={t?.userId?.userImg}
                    alt={t.name}
                    className="rounded-circle mx-auto object-cover"
                    width="100"
                    height={"100"}
                  />
                  <h5 className="mt-3">{t.name}</h5>
                  <p className="text-warning">{Array(t.rating).fill("★").join("")}</p>
                  <p>{t.comment}</p>
                </Card>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
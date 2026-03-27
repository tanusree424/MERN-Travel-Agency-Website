import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel, Card } from "react-bootstrap";

const testimonials = [
  {
    name: "Tanusree B.",
    photo: "/images/user1.jpg",
    rating: 5,
    comment: "Amazing experience! Highly recommended.",
  },
  {
    name: "Rahul S.",
    photo: "/images/user2.jpg",
    rating: 4,
    comment: "Great service, will travel again!",
  },
  {
    name: "Anita D.",
    photo: "/images/user3.jpg",
    rating: 5,
    comment: "Loved the package and the support was awesome!",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials py-5" style={{ backgroundColor: "#f9f9f9" }}>
      <div className="container">
        <h2 className="text-center mb-4">What Our Customers Say</h2>
        <Carousel indicators={false} interval={4000}>
          {testimonials.map((t, idx) => (
            <Carousel.Item key={idx}>
              <div className="d-flex justify-content-center">
                <Card className="shadow-sm rounded text-center p-4" style={{ maxWidth: "400px" }}>
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="rounded-circle mx-auto"
                    width="80"
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
const BlogSection = ({ posts }) => {
  return (
    <section className="blog-section py-5 bg-light">
      <div className="container">
        <h2 className="text-center fw-bold mb-5">Travel Tips & Stories</h2>

        <div className="row g-4">
          {posts?.map((post) => (
            <div className="col-md-4 d-flex" key={post.id}>
              <div className="card shadow-sm border-0 w-100 h-100 blog-card">
                <div className="blog-image-wrapper">
                  <img
                    src={post.image}
                    className="card-img-top blog-image"
                    alt={post.title}
                  />
                </div>

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-semibold mb-3">
                    {post.title}
                  </h5>

                  <p className="card-text text-muted flex-grow-1">
                    {post.excerpt}
                  </p>

                  <a
                    href={`/blog/${post._id}`}
                    className="btn btn-primary btn-sm mt-auto align-self-start"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .blog-card {
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .blog-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.12) !important;
        }

        .blog-image-wrapper {
          width: 100%;
          height: 240px;
          overflow: hidden;
        }

        .blog-image {
          width:100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .blog-card:hover .blog-image {
          transform: scale(1.05);
        }

        .card-title {
          font-size: 1.3rem;
          line-height: 1.4;
        }

        .card-text {
          font-size: 0.95rem;
        }

        @media (max-width: 768px) {
          .blog-image-wrapper {
            height: 220px;
          }
        }
      `}</style>
    </section>
  );
};

export default BlogSection;
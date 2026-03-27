const BlogSection = ({ posts }) => {
  return (
    <section className="blog-section py-5">
      <div className="container">
        <h2 className="text-center mb-5">Travel Tips & Stories</h2>
        <div className="row g-4">
          {posts?.map(post => (
            <div className="col-md-4" key={post.id}>
              <div className="card shadow-sm">
                <img src={post.image} className="card-img-top" alt={post.title} />
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.excerpt}</p>
                  <a href={`/blog/${post.id}`} className="btn btn-primary btn-sm">Read More</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default BlogSection;
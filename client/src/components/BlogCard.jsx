import "./BlogCard.css";

import expo from "../assets/expo.jpg";
import supply from "../assets/supply-chain.jpg";
import exportsImg from "../assets/exports.jpg";
import ai from "../assets/ai-manufacturing.jpg";

const images = {
  1: expo,
  2: supply,
  3: exportsImg,
  4: ai,
};

function BlogCard({ post }) {
  return (
    <div className="blog-card" data-aos="fade-up">
      <img src={images[post.id]} alt={post.title} />

      <div className="blog-content">
        <span className="blog-date">{post.date}</span>

        <h3>{post.title}</h3>

        <p>{post.excerpt}</p>

        <button>Read More →</button>
      </div>
    </div>
  );
}

export default BlogCard;
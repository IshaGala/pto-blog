import { useEffect, useState } from "react";
import axios from "axios";

import Header from "./components/Header";
import BlogCard from "./components/BlogCard";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

import "./App.css";

function App() {

  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  axios
    .get("http://localhost:5000/api/posts")
    .then((response) => {
      setPosts(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setLoading(false);
    });
}, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>

      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <main className="hero">

        <h1>Pharma Trade Promotion Organization</h1>

        <p>
          Stay updated with the latest pharmaceutical trade news,
          innovations and global market insights.
        </p>

        <button className="hero-btn">
          Explore Articles
        </button>

      </main>


      <section className="blog-grid">
        
        {loading ? (
          <h2>Loading blog posts...</h2>
        ) : filteredPosts.length > 0 ? (
          
          filteredPosts.map((post) => (
          
          <BlogCard
          key={post.id}
          post={post}
          />
        ))
      ) : (
      <h2>No blog posts found.</h2>
      )}
      </section>
      
      <Newsletter />
      
      <BackToTop />

      <Footer />

    </>
  );
}

export default App;
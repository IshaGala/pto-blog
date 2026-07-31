import { useState } from "react";
import axios from "axios";
import "./Newsletter.css";

function Newsletter() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {

    e.preventDefault();

    setMessage("");

    // Frontend Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/subscribe",
        { email }
      );

      setMessage(response.data.message);
      setEmail("");

    } catch (error) {

      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Something went wrong.");
      }

    } finally {

      setLoading(false);

    }

  };

  return (

    <section className="newsletter" data-aos="zoom-in">

      <h2>Stay Updated</h2>

      <p>
        Subscribe to receive the latest pharmaceutical trade
        news and industry insights.
      </p>

      <form onSubmit={handleSubscribe}>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <button type="submit">

          {loading ? "Subscribing..." : "Subscribe"}

        </button>

      </form>

      {message &&

      <p className="message">

        {message}

      </p>

      }

    </section>

  );

}

export default Newsletter;
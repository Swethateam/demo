
import { useState } from "react";

export default function DreamWorld({ next }) {
  const [wishMade, setWishMade] = useState(false);

  return (
    <section className="page">
      <p className="eyebrow">SOMEWHERE IN OUR IMAGINATION</p>
      <h1>Our Dream World 🌙</h1>
      <p>A place where little dreams become beautiful memories.</p>

      {!wishMade ? (
        <button
          className="primary-button"
          onClick={() => setWishMade(true)}
        >
          Make a Wish ✨
        </button>
      ) : (
        <>
          <h2>May all your dreams find their way to you.</h2>
          <button className="primary-button" onClick={next}>
            Explore More →
          </button>
        </>
      )}
    </section>
  );
}

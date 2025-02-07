import React, { useEffect, useState } from "react";
import "./LandingPage.css";

const LandingPage = () => {
  const [content, setContent] = useState(null);
  const baseUrl = "https://recipe-be-45si.onrender.com";
  useEffect(() => {
    fetch("https://recipe-be-45si.onrender.com/api/landing-page-content/")
      .then((response) => response.json())
      .then((data) => setContent(data))
      .catch((error) => console.error("Error fetching content:", error));
  }, []);

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>{content.hero_title}</h1>
          <p>{content.hero_description}</p>
          <button className="cta-button">{content.hero_button_text}</button>
        </div>
        {content.hero_image && (
          <div className="hero-image">
            <img  src={`${baseUrl}${content.hero_image}`} alt="Hero" />
          </div>
        )}
      </section>

      {/* About Section */}
      <section className="about">
        <div className="about-content">
          <h2>{content.about_title}</h2>
          <p>{content.about_description}</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>{content.feature_title}</h2>
        <pre>{content.features}</pre>
      </section>
    </div>
  );
};

export default LandingPage;

import React, { useState, useEffect } from "react";
import RecipeList from "../components/RecipeList";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LandingPage from "../components/Landing";

function Home() {
  const [recipes, setRecipes] = useState([]);

  return (
    <div>
        <Header/>
        <LandingPage/>
      <RecipeList recipes={recipes} />
      <Footer/>
    </div>
  );
}

export default Home;

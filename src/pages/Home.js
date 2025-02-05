import React, { useState, useEffect } from "react";
import RecipeList from "../components/RecipeList";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipes from the backend once it's set up
    // For now, use dummy data
    setRecipes([
      { id: 1, title: "Recipe 1", description: "Description 1" },
      { id: 2, title: "Recipe 2", description: "Description 2" },
    ]);
  }, []);

  return (
    <div>
        <Header/>
      <RecipeList recipes={recipes} />
      <Footer/>
    </div>
  );
}

export default Home;

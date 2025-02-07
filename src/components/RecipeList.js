import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API calls
import './RecipeList.css'; // CSS file for styling

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const baseUrl = "https://recipe-be-45si.onrender.com";
  useEffect(() => {
    // Fetch recipes from the Django backend
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('https://recipe-be-45si.onrender.com/api/recipes/');
        setRecipes(response.data); // Set the fetched recipes
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="recipe-list-container">
      {loading ? (
        <p>Loading recipes...</p>
      ) : recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={`${baseUrl}${recipe.image}`} alt={recipe.title} className="recipe-image" />
            <div className="recipe-content">
              <h2 className="recipe-title">{recipe.title}</h2>
              <p className="recipe-description">{recipe.description}</p>
              <p className="recipe-posted-by">Posted by: {recipe.posted_by}</p>
              <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                View Recipe
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
};

export default RecipeList;
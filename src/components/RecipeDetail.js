  import React, { useEffect, useState } from 'react';
  import { useParams, Link } from 'react-router-dom';
  import axios from 'axios';
  import './RecipeDetail.css';

  const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const baseUrl = "https://recipe-be-45si.onrender.com";
    useEffect(() => {
      const fetchRecipe = async () => {
        try {
          const response = await axios.get(`https://recipe-be-45si.onrender.com/api/recipes/${id}/`);
          const recipe = {
            ...response.data,
            ingredients: response.data.ingredients ? response.data.ingredients.split(',') : [],
            steps: response.data.steps ? response.data.steps.split(',') : [],
          };
          setRecipe(recipe);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching recipe details:', error);
          setError('Failed to load recipe details. Please try again later.');
          setLoading(false);
        }
      };

      fetchRecipe();
    }, [id]);

    if (loading) {
      return <p>Loading recipe details...</p>;
    }

    if (error) {
      return <p className="error-message">{error}</p>;
    }

    if (!recipe) {
      return <p>No recipe found.</p>;
    }

    return (
      <div className="recipe-detail-container">
        <img src={`${baseUrl}${recipe.image}`} alt={recipe.title} className="recipe-detail-image" />
        <h1 className="recipe-detail-title">{recipe.title}</h1>
        <p className="recipe-detail-description">{recipe.description}</p>
        <p className="recipe-detail-posted-by">Posted by: {recipe.posted_by}</p>
        
        <h2>Ingredients</h2>
        <ul className="recipe-ingredients">
          {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>

        <h2>Steps</h2>
        <ol className="recipe-steps">
          {recipe.steps && recipe.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>

        <Link to="/" className="back-link">Back to Recipes</Link>
      </div>
    );
  };

  export default RecipeDetail;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import './SignIn.css'; // Import the CSS file

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    category: "",
    description: "",
    image: null,
    ingredients: [], // Ensure this is an array
    steps: [], // Ensure this is an array
  });

  const navigate = useNavigate();

  // Check if the user is authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("auth");
    if (!isAuthenticated) {
      navigate("/sign-in");
    }
  }, [navigate]);

  const [currentIngredient, setCurrentIngredient] = useState("");
  const [currentStep, setCurrentStep] = useState("");

  const addIngredient = () => {
    if (currentIngredient.trim()) {
      setNewRecipe((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, currentIngredient],
      }));
      setCurrentIngredient("");
    }
  };

  const addStep = () => {
    if (currentStep.trim()) {
      setNewRecipe((prev) => ({
        ...prev,
        steps: [...prev.steps, currentStep],
      }));
      setCurrentStep("");
    }
  };

  const removeIngredient = (index) => {
    setNewRecipe((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index), // Remove the item at the specified index
    }));
  };
  
  const removeStep = (index) => {
    setNewRecipe((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index), // Remove the item at the specified index
    }));
  };

  const [editMode, setEditMode] = useState(false);
  const [currentRecipeId, setCurrentRecipeId] = useState(null);
  const baseUrl = "https://recipe-be-45si.onrender.com";

  // Fetch recipes and categories on component mount
  useEffect(() => {
    fetchRecipes();
    fetchCategories();
  }, []);

  // Fetch recipes from the API
  const fetchRecipes = async () => {
    try {
      const response = await axios.get("https://recipe-be-45si.onrender.com/api/recipes/");
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // Fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://recipe-be-45si.onrender.com/api/categories/");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle input changes for the new recipe form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewRecipe((prev) => ({ ...prev, image: file }));
  };

  // Add a new recipe
  const handleAddRecipe = async () => {
    if (newRecipe.title && newRecipe.category) {
      try {
        const formData = new FormData();
        formData.append("title", newRecipe.title);
        formData.append("category", newRecipe.category);
        formData.append("posted_by", localStorage.getItem("userName")); // Use the stored user name
        formData.append("description", newRecipe.description);
        formData.append("image", newRecipe.image);
        formData.append("ingredients", newRecipe.ingredients.join(", ")); // Convert array to string
        formData.append("steps", newRecipe.steps.join(", ")); // Convert array to string

        const response = await axios.post("https://recipe-be-45si.onrender.com/api/recipes/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setRecipes((prev) => [...prev, response.data]);
        setNewRecipe({
          title: "",
          category: "",
          description: "",
          image: null,
          ingredients: [], // Reset to empty array
          steps: [], // Reset to empty array
        });
      } catch (error) {
        console.error("Error adding recipe:", error);
      }
    } else {
      console.log("Missing required fields");
    }
  };

  // Enable edit mode for a recipe
  const handleEdit = (id) => {
    const recipeToEdit = recipes.find((recipe) => recipe.id === id);
    setNewRecipe({
      ...recipeToEdit,
      category: recipeToEdit.category,
      ingredients: recipeToEdit.ingredients.split(", "), // Convert string to array
      steps: recipeToEdit.steps.split(", "), // Convert string to array
    });
    setEditMode(true);
    setCurrentRecipeId(id);
  };

  // Update an existing recipe
  const handleUpdateRecipe = async () => {
    try {
      const formData = new FormData();
      formData.append("title", newRecipe.title);
      formData.append("category", newRecipe.category);
      formData.append("posted_by", localStorage.getItem("userName")); // Use the stored user name
      formData.append("description", newRecipe.description);
      if (newRecipe.image) {
        formData.append("image", newRecipe.image);
      }
      formData.append("ingredients", newRecipe.ingredients.join(", ")); // Convert array to string
      formData.append("steps", newRecipe.steps.join(", ")); // Convert array to string

      const response = await axios.put(
        `https://recipe-be-45si.onrender.com/api/recipes/${currentRecipeId}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setRecipes((prev) =>
        prev.map((recipe) => (recipe.id === currentRecipeId ? response.data : recipe))
      );
      setNewRecipe({
        title: "",
        category: "",
        description: "",
        image: null,
        ingredients: [], // Reset to empty array
        steps: [], // Reset to empty array
      });
      setEditMode(false);
      setCurrentRecipeId(null);
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  // Delete a recipe
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://recipe-be-45si.onrender.com/api/recipes/${id}/`);
      setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  // Helper function to get category name by ID
  const getCategoryNameById = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  // Filter recipes based on search query
  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe &&
      ((recipe.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (getCategoryNameById(recipe.category) || "").toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="dashboard" style={styles.container}>
      <h1 style={styles.header}>Recipe Dashboard</h1>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchQuery}
        onChange={handleSearch}
        style={styles.searchBox}
      />
      <div style={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          value={newRecipe.title}
          onChange={handleInputChange}
          style={styles.input}
        />
        <select
          name="category"
          value={newRecipe.category}
          onChange={(e) => {
            const selectedCategoryId = e.target.value;
            setNewRecipe((prev) => ({ ...prev, category: selectedCategoryId }));
          }}
          style={styles.input}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newRecipe.description}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          style={styles.input}
        />
        <div style={styles.inputGroup}>
          <input
            type="text"
            name="ingredient"
            placeholder="Add Ingredient"
            value={currentIngredient}
            onChange={(e) => setCurrentIngredient(e.target.value)}
            style={styles.input}
          />
          <div onClick={addIngredient}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 4c4.411 0 8 3.589 8 8s-3.589 8-8 8s-8-3.589-8-8s3.589-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m5 9h-4V7h-2v4H7v2h4v4h2v-4h4z" />
            </svg>
          </div>
        </div>
        <ul>
  {Array.isArray(newRecipe.ingredients)
    ? newRecipe.ingredients.map((ingredient, index) => (
        <li key={index}>
          {ingredient}
          <div onClick={() => removeIngredient(index)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M10 20a10 10 0 1 1 0-20a10 10 0 0 1 0 20m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m5-9v2H5V9z"/></svg></div>
        </li>
      ))
    : newRecipe.ingredients.split(", ").map((ingredient, index) => (
        <li key={index}>
          {ingredient}
          <div onClick={() => removeIngredient(index)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M10 20a10 10 0 1 1 0-20a10 10 0 0 1 0 20m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m5-9v2H5V9z"/></svg></div>
        </li>
      ))}
</ul>
        <div className="recipeForm" style={styles.inputGroup}>
          <input
            type="text"
            name="step"
            placeholder="Add Step"
            value={currentStep}
            onChange={(e) => setCurrentStep(e.target.value)}
            style={styles.input}
          />
          <div onClick={addStep}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 4c4.411 0 8 3.589 8 8s-3.589 8-8 8s-8-3.589-8-8s3.589-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m5 9h-4V7h-2v4H7v2h4v4h2v-4h4z" />
            </svg>
          </div>
        </div>
        <ol>
  {Array.isArray(newRecipe.steps)
    ? newRecipe.steps.map((step, index) => (
        <li key={index}>
          {step}
          <div onClick={() => removeStep(index)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M10 20a10 10 0 1 1 0-20a10 10 0 0 1 0 20m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m5-9v2H5V9z"/></svg></div>
        </li>
      ))
    : newRecipe.steps.split(", ").map((step, index) => (
        <li key={index}>
          {step}
          <div onClick={() => removeStep(index)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M10 20a10 10 0 1 1 0-20a10 10 0 0 1 0 20m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m5-9v2H5V9z"/></svg></div>
        </li>
      ))}
</ol>
        {editMode ? (
          <button onClick={handleUpdateRecipe} style={styles.button}>
            Update Recipe
          </button>
        ) : (
          <button onClick={handleAddRecipe} style={styles.button}>
            Add Recipe
          </button>
        )}
      </div>
      <div style={styles.recipeList}>
  {filteredRecipes.map((recipe) => (
    <div key={recipe.id} style={styles.recipeCard}>
      <h2 style={styles.recipeName}>{recipe.title}</h2>
      <p style={styles.recipeCategory}>
        Category: {getCategoryNameById(recipe.category)}
      </p>
      <p style={styles.recipePostedBy}>Posted by: {recipe.posted_by}</p>
      <p style={styles.recipeDescription}>{recipe.description}</p>
      {recipe.image && (
        <img
          src={`${baseUrl}${recipe.image}`}
          alt={recipe.title}
          style={styles.recipeImage}
        />
      )}
      <p><strong>Ingredients:</strong> {recipe.ingredients || "N/A"}</p>
      <p><strong>Steps:</strong> {recipe.steps || "N/A"}</p>
      <div style={styles.actions}>
        <button onClick={() => handleEdit(recipe.id)} style={styles.actionButton}>
          Edit
        </button>
        <button onClick={() => handleDelete(recipe.id)} style={styles.actionButton}>
          Delete
        </button>
      </div>
    </div>
  ))}
  {filteredRecipes.length === 0 && (
    <p style={styles.noResults}>No recipes found.</p>
  )}
</div>
    </div>
  );
};

// Styles (unchanged)
const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  header: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  searchBox: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "1rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "1rem",
  },
  textarea: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "1rem",
    minHeight: "100px",
  },
  button: {
    padding: "10px",
    backgroundColor: "rgb(60 88 134)",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  recipeList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  recipeCard: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "20px",
    textAlign: "left",
  },
  recipeName: {
    fontSize: "1.5rem",
    marginBottom: "10px",
  },
  recipeCategory: {
    fontStyle: "italic",
    marginBottom: "10px",
  },
  recipePostedBy: {
    fontWeight: "bold",
    marginBottom: "10px",
  },
  recipeDescription: {
    marginBottom: "10px",
  },
  recipeImage: {
    width: "100%",
    height: "auto",
    marginBottom: "10px",
  },
  actions: {
    display: "flex",
    gap: "10px",
  },
  actionButton: {
    padding: "10px",
    backgroundColor: "rgb(60 88 134)",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  noResults: {
    color: "#777",
    fontStyle: "italic",
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  addButton: {
    padding: "5px 10px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  recipeList: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)", // Three cards per row
    gap: "20px", // Space between cards
    "@media (max-width: 900px)": {
      gridTemplateColumns: "repeat(2, 1fr)", // Two cards per row on smaller screens
    },
    "@media (max-width: 600px)": {
      gridTemplateColumns: "1fr", // One card per row on mobile screens
    },
  },
};

export default Dashboard;
import React, { useState } from "react";

function AddRecipePage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    steps: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission and post data to backend once it's set up
    console.log(formData);
  };

  return (
    <div>
      <h1>Add Recipe</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <br />
        <label>Description:</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <br />
        <label>Ingredients:</label>
        <textarea
          value={formData.ingredients}
          onChange={(e) =>
            setFormData({ ...formData, ingredients: e.target.value })
          }
        />
        <br />
        <label>Steps:</label>
        <textarea
          value={formData.steps}
          onChange={(e) => setFormData({ ...formData, steps: e.target.value })}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddRecipePage;

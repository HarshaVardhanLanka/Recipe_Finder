async function findRecipes() {
    const ingredients = document.getElementById("ingredients").value.trim();
    const diet = document.getElementById("diet").value.trim();
    const recipesDiv = document.getElementById("recipes");
  
    // Clear previous results
    recipesDiv.innerHTML = "";
  
    if (!ingredients) {
      alert("Please enter at least one ingredient.");
      return;
    }
  
    const apiKey = "[YOUR_API_KEY]"; // Replace with your actual Spoonacular API key
  
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&includeIngredients=${ingredients}&diet=${diet}&number=20&addRecipeInformation=true`
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch recipes. Please check your API key or input.");
      }
  
      const data = await response.json();
  
      if (data.results.length === 0) {
        recipesDiv.innerHTML = "<p>No recipes found. Try different ingredients or filters.</p>";
        return;
      }
  
      data.results.forEach((recipe) => {
        const recipeCard = document.createElement("div");
        recipeCard.className = "recipe";
  
        recipeCard.innerHTML = `
          <img src="${recipe.image}" alt="${recipe.title}">
          <div>
            <h3>${recipe.title}</h3>
            <p><strong>Preparation Time:</strong> ${recipe.readyInMinutes} minutes</p>
            <p><strong>Ingredients:</strong> ${
              recipe.missedIngredients?.map((ing) => ing.name).join(", ") || "N/A"
            }</p>
            <a href="${recipe.sourceUrl}" target="_blank">View Full Recipe</a>
          </div>
        `;
  
        recipesDiv.appendChild(recipeCard);
      });
    } catch (error) {
      recipesDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  }

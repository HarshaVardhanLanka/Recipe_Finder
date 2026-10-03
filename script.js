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
  
    try {
  // Fetch from your own Vercel API route instead of Spoonacular
      const response = await fetch(
        `/api/recipes?ingredients=${ingredients}&diet=${diet}`
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
function removeRecipe(title) {
  // 1. Get the current list of saved recipes
  let savedRecipes = JSON.parse(localStorage.getItem("favoriteRecipes")) || [];
  
  // 2. Filter out the recipe that matches the title we want to remove
  savedRecipes = savedRecipes.filter(recipe => recipe.title !== title);
  
  // 3. Save the newly updated list back to localStorage
  localStorage.setItem("favoriteRecipes", JSON.stringify(savedRecipes));
  
  // 4. Refresh the display to show the recipe has been removed
  displayFavorites();
}

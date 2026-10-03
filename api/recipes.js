export default async function handler(req, res) {
  // Get the ingredients and diet from the frontend request
  const { ingredients, diet } = req.query;
  
  // Grab the hidden API key from Vercel's environment variables
  const apiKey = process.env.SPOONACULAR_API_KEY;

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&includeIngredients=${ingredients}&diet=${diet}&number=20&addRecipeInformation=true`
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch from Spoonacular");
    }

    const data = await response.json();
    
    // Send the data back to your frontend
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

import AsyncStorage from '@react-native-async-storage/async-storage';

// ... inside RecipesFormScreen component
const saverecipe = async () => {
  try {
    // 1. Initialize a new recipe object
    // Assuming title, image, and description are state variables in your form
    const newRecipe = {
      idC: recipeToEdit ? recipeToEdit.idC : Date.now(), // Unique ID based on timestamp if new
      name: title, 
      image: image,
      description: description,
    };

    // 2. Retrieve existing recipes from AsyncStorage
    const storedRecipes = await AsyncStorage.getItem("customrecipes");
    let recipes = storedRecipes ? JSON.parse(storedRecipes) : [];

    // 3. Update or add a recipe
    if (recipeToEdit) {
      // Find the index of the recipe being edited
      const recipeIndex = recipes.findIndex((r) => r.idC === recipeToEdit.idC);
      
      if (recipeIndex !== -1) {
        recipes[recipeIndex] = newRecipe; // Update the recipe at that index
      }
      
      // Save updated array and trigger callback
      await AsyncStorage.setItem("customrecipes", JSON.stringify(recipes));
      if (onrecipeEdited) onrecipeEdited();
      
    } else {
      // Add a brand new recipe to the list
      recipes.push(newRecipe);
      await AsyncStorage.setItem("customrecipes", JSON.stringify(recipes));
    }

    // 4. Navigate back to the previous screen
    navigation.goBack();

  } catch (error) {
    // 5. Error handling
    console.error("Error saving the recipe: ", error);
  }
};
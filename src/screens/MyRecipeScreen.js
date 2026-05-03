import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const MyRecipeScreen = () => {
  const navigation = useNavigation();

  // --- State Management ---
  const [recipes, setrecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- useEffect: Fetch recipes on mount ---
  useEffect(() => {
    fetchrecipes();
  }, []);

  const fetchrecipes = async () => {
    try {
      // Fetch Recipes from local storage
      const storedData = await AsyncStorage.getItem("customrecipes");
      
      // Check and Set State
      if (storedData !== null) {
        const parsedRecipes = JSON.parse(storedData);
        setrecipes(parsedRecipes);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      // Update Loading State
      setLoading(false);
    }
  };

  // --- Button Actions ---

  // Navigates to the Detailed View
  const handlerecipeClick = (recipe) => {
    navigation.navigate("CustomRecipesScreen", { recipe });
  };

  // Navigates to the Form for a new recipe
  const handleAddrecipe = () => {
    navigation.navigate("RecipesFormScreen");
  };

  // Navigates to the Form for editing an existing recipe
  const editrecipe = (recipe, index) => {
    navigation.navigate("RecipesFormScreen", { 
      recipeToEdit: recipe, 
      recipeIndex: index 
    });
  };

  // Asynchronous function to handle deletion
  const deleterecipe = async (index) => {
    try {
      // Clone the recipes array
      const updatedrecipes = [...recipes];
      
      // Remove the recipe at specific index
      updatedrecipes.splice(index, 1);
      
      // Update AsyncStorage
      await AsyncStorage.setItem("customrecipes", JSON.stringify(updatedrecipes));
      
      // Update state
      setrecipes(updatedrecipes);
    } catch (error) {
      // Error handling
      console.error("Error deleting recipe:", error);
      Alert.alert("Error", "Failed to delete the recipe.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Recipes</Text>
        <TouchableOpacity onPress={handleAddrecipe} style={styles.addBtn}>
          <Text style={styles.addBtnText}>+ Add New</Text>
        </TouchableOpacity>
      </View>

      {/* Conditional Rendering */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 50 }} />
      ) : recipes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text>No recipes found. Start by adding one!</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.listContainer}>
          {recipes.map((item, index) => (
            <View key={index} style={styles.recipeCard}>
              
              {/* Recipe Display: Image and Click Handler */}
              <TouchableOpacity 
                testID="handlerecipeBtn" 
                onPress={() => handlerecipeClick(item)}
              >
                {item.image && (
                  <Image 
                    source={{ uri: item.image }} 
                    style={styles.recipeImage} 
                  />
                )}
              </TouchableOpacity>

              <View style={styles.cardInfo}>
                <Text style={styles.recipeTitle}>{item.title}</Text>
                
                {/* Truncated Description (First 50 chars) */}
                <Text testID="recipeDescp" style={styles.recipeDescription}>
                  {item.description 
                    ? (item.description.length > 50 
                        ? item.description.substring(0, 50) + "..." 
                        : item.description) 
                    : "No description available"}
                </Text>

                {/* Edit and Delete Buttons Container */}
                <View testID="editDeleteButtons" style={styles.actionRow}>
                  <TouchableOpacity 
                    style={styles.editBtn} 
                    onPress={() => editrecipe(item, index)}
                  >
                    <Text style={styles.btnLabel}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.deleteBtn} 
                    onPress={() => deleterecipe(index)}
                  >
                    <Text style={styles.btnLabel}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 15, 
    backgroundColor: '#fff' 
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  backBtnText: { color: '#007AFF' },
  addBtn: { backgroundColor: '#4CAF50', padding: 8, borderRadius: 5 },
  addBtnText: { color: '#fff', fontWeight: 'bold' },
  listContainer: { padding: 10 },
  recipeCard: { 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    marginBottom: 15, 
    overflow: 'hidden', 
    elevation: 3 
  },
  recipeImage: { width: '100%', height: 200, resizeMode: 'cover' },
  cardInfo: { padding: 10 },
  recipeTitle: { fontSize: 16, fontWeight: 'bold' },
  recipeDescription: { color: '#666', marginVertical: 5 },
  actionRow: { flexDirection: 'row', marginTop: 10, justifyContent: 'flex-end' },
  editBtn: { backgroundColor: '#FFA500', padding: 8, borderRadius: 5, marginRight: 10 },
  deleteBtn: { backgroundColor: '#FF4444', padding: 8, borderRadius: 5 },
  btnLabel: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  emptyContainer: { alignItems: 'center', marginTop: 50 }
});

export default MyRecipeScreen;
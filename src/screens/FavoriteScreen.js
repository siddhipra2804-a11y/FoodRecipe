import React from 'react';
import { 
  View, 
  TouchableOpacity, 
  Text, 
  FlatList, 
  Image, 
  StyleSheet 
} from 'react-native';

const FavoriteRecipesScreen = ({ navigation, favoriteRecipesList }) => {
  
  // Logic to render each recipe card
  const renderItem = ({ item }) => {
    // Limits the title to 20 characters and adds ellipsis if longer
    const formattedTitle = item.name.length > 20 
      ? `${item.name.substring(0, 20)}...` 
      : item.name;

    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
      >
        <Image 
          source={{ uri: item.image }} 
          style={styles.recipeImage} 
        />
        <Text style={styles.recipeName}>{formattedTitle}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View testID="favoriteRecipes">
        {/* Your header or search content */}
      </View>

      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Text>Go back</Text>
      </TouchableOpacity>

      {/* The FlatList implementation */}
      <FlatList
        data={favoriteRecipesList}
        renderItem={renderItem}
        keyExtractor={(item) => item.idC.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 30, // Extra space at the bottom for scrolling
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  recipeImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 12,
  },
});

export default FavoriteRecipesScreen;
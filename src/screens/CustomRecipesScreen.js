import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/favoritesSlice'; // Path to your action
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CustomRecipesScreen = ({ index }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  // Retrieve recipe data from route parameters
  const { article } = route.params || {};

  // Check Redux state for favorite status
  const favoriteRecipe = useSelector((state) => state.favorites.favoriteRecipe);
  const isFavorite = article ? favoriteRecipe.includes(article.idCategory) : false;

  if (!article) {
    return (
      <View style={styles.centered}>
        <Text>No Recipe Details Available</Text>
      </View>
    );
  }

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(article.idCategory));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Recipe Image Container */}
      <View testID="imageContainer">
        <Image 
          source={{ uri: article.image }} 
          style={[
            styles.articleImage, 
            { height: index % 3 === 0 ? hp(25) : hp(35) }
          ]} 
        />
      </View>

      {/* Navigation and Favorite Buttons */}
      <View testID="topButtonsContainer" style={styles.topButtons}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.favoriteButton} 
          onPress={handleToggleFavorite}
        >
          <Text style={styles.heartIcon}>
            {isFavorite ? "♥" : "♡"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Recipe Content Section */}
      <View testID="contentContainer" style={styles.contentContainer}>
        {/* Recipe Title */}
        <Text style={styles.recipeTitle}>{article.title}</Text>
        
        {/* Content Wrapper */}
        <View style={styles.descriptionWrapper}>
          <Text style={styles.contentHeader}>Content</Text>
          <Text style={styles.recipeDescription}>{article.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  articleImage: {
    width: wp(100),
    resizeMode: 'cover',
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    paddingHorizontal: wp(4),
    top: hp(2),
  },
  backButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
  },
  favoriteButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
  },
  heartIcon: {
    fontSize: 24,
    color: 'red',
  },
  contentContainer: {
    padding: 20,
    marginTop: -20, // Optional: overlap with image for design
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  descriptionWrapper: {
    marginTop: 10,
  },
  contentHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  recipeDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  }
});

export default CustomRecipesScreen;

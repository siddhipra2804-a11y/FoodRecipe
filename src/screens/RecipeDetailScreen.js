import {View,Text,ScrollView,TouchableOpacity,Image,StyleSheet,} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux"; // Redux hooks
import { toggleFavorite } from "../redux/favoritesSlice"; // Redux action
//import { ClockIcon, FireIcon, UsersIcon, Square3Stack3DIcon } from 'react-native-heroicons/outline';

export default function RecipeDetailScreen(props) {
  const recipe = props.route.params; // recipe passed from previous screen

  const dispatch = useDispatch();
  const favoriterecipes = useSelector(
    (state) => state.favorites.favoriterecipes
  );
  const isFavourite = favoriterecipes?.some(
    (favrecipe) => favrecipe.idFood === recipe.idFood
  ); // Check by idrecipe

  const navigation = useNavigation();

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(recipe)); // Dispatch the recipe to favorites
  };

  const RecipeDetail = (props) => {
    // 1. Retrieve the recipe data from route params
    const recipe = props.route.params;
  
    return (
      <View style={styles.container}>
        {/* ... previous components like imageContainer and buttons ... */}
  
        {/* 2. Display the title using the retrieved data */}
        <View testID="recipeTitle">
          <Text style={styles.titleText}>
            {recipe.name} 
          </Text>
        </View>
  
        {/* ... other recipe details like description or ingredients ... */}
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* recipe Image */}
      <View style={styles.imageContainer} testID="imageContainer">
      <Image 
        source={{ uri: recipe.recipeImage }} 
        style={styles.recipeImage} 
      />
      </View>

      {/* Navigation Buttons Overlay */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
        >
          <ChevronLeftIcon size={30} strokeWidth={4.5} color="#fbbf24" />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => setIsFavorite(!isFavorite)}
          style={styles.iconButton}
        >
          {isFavorite ? (
            <HeartIcon size={30} color="red" />
          ) : (
            <HeartOutline size={30} color="gray" />
          )}
        </TouchableOpacity>
      </View>

      {/* Back Button and Favorite Button */}
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={[
            styles.favoriteButton,
            {
              backgroundColor: "white",
            },
          ]}
        >
          <Text>{isFavourite ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </View>

      {/* recipe Description */}
  
        <View style={styles.contentContainer}>
          {/* Title and Category */}
          <View
            style={styles.recipeDetailsContainer}
            testID="recipeDetailsContainer"
          >
            <Text style={styles.recipeTitle} testID="recipeTitle">
         
              
              </Text>
            <Text style={styles.recipeCategory} testID="recipeCategory">
            {recipe.category}
            </Text>
          </View>

          <View style={styles.miscContainer} testID="miscContainer">
        
      </View>

      {/* Ingredients */}
      <View style={styles.sectionContainer}>
     
      </View>

      {/* Instructions */}
      <View testID="sectionContainer">
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <View testID="ingredientsList">
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <View testID="ingredientsList" style={styles.listWrapper}>
        {recipe.ingredients.map((item, index) => (
          <View key={index} style={styles.ingredientRow}>
            {/* Bullet point or Bullet Icon */}
            <View style={styles.bullet} />
            
            <View style={styles.ingredientTextContainer}>
              <Text style={styles.ingredientName}>
                {item.name}
              </Text>
              <Text style={styles.ingredientMeasure}>
                {item.measure}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
    </View>
    </View>
    </ScrollView>
  );
}

const RecipeMiscInfo = ({ recipe }) => {
    return (
      <View testID="miscContainer" style={styles.miscWrapper}>
        
        {/* Cooking Time */}
        <View style={styles.iconItem}>
          <View style={styles.iconCircle}>
            <ClockIcon size={24} color="#525252" strokeWidth={2} />
          </View>
          <Text style={styles.iconLabel}>{recipe.mins} Mins</Text>
        </View>
  
        {/* Servings */}
        <View style={styles.iconItem}>
          <View style={styles.iconCircle}>
            <UsersIcon size={24} color="#525252" strokeWidth={2} />
          </View>
          <Text style={styles.iconLabel}>{recipe.servings} Servings</Text>
        </View>
  
        {/* Calories */}
        <View style={styles.iconItem}>
          <View style={styles.iconCircle}>
            <FireIcon size={24} color="#525252" strokeWidth={2} />
          </View>
          <Text style={styles.iconLabel}>{recipe.calories} Cal</Text>
        </View>
  
        {/* Difficulty/Type */}
        <View style={styles.iconItem}>
          <View style={styles.iconCircle}>
            <Square3Stack3DIcon size={24} color="#525252" strokeWidth={2} />
          </View>
          <Text style={styles.iconLabel}>{recipe.type || 'Easy'}</Text>
        </View>
  
      </View>
    );
  };

<View testID="sectionContainer">
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.instructionsText}>
          {recipe.recipeInstructions}
        </Text>
      </View>
  


const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 30,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  recipeImage: {
    // These are example styles; ensure they match your design requirements
    width: '100%',
    height: 150,
    borderRadius: 20,
    resizeMode: 'cover',
    backgroundColor: '#f0f0f0', // Shows a light grey box while loading
  },
  topButtonsContainer: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: hp(4),
  },
  backButton: {
    padding: 8,
    borderRadius: 50,
    marginLeft: wp(5),
    backgroundColor: "white",
  },
  favoriteButton: {
    padding: 8,
    borderRadius: 50,
    borderWidth: 1,
    marginRight: wp(5),
  },

  contentContainer: {
    paddingHorizontal: wp(4),
    paddingTop: hp(4),
  },
  recipeDetailsContainer: {
    marginBottom: hp(2),
  },
  recipeTitle: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#4B5563", // text-neutral-700
  },
  recipeCategory: {
    fontSize: hp(2),
    fontWeight: "500",
    color: "#9CA3AF", // text-neutral-500
  },
  sectionContainer: {
    marginBottom: hp(2),
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#374151', // Dark grey/black
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: hp(1.8),
    color: "#4B5563", // text-neutral-700
    textAlign: "justify",
    lineHeight: hp(2.5),
  },
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  recipeImage: {
    width: wp(98),
    height: hp(45),
    borderRadius: 20,
    marginTop: 4,
  },
  topButtonsContainer: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: hp(4),
  },
  backButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginLeft: wp(5),
  },
  backButtonText: {
    fontSize: hp(2),
    color: "#333",
    fontWeight: "bold",
  },
  favoriteButton: {
    padding: 10,
    borderRadius: 20,
    marginRight: wp(5),
  },
  favoriteButtonText: {
    fontSize: hp(2),
    color: "red",
  },
  mealName: {
    fontSize: hp(4),
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginVertical: 10,
    fontFamily: "Roboto",
  },
  mealCategory: {
    fontSize: hp(2),
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Roboto",
  },
  miscContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    paddingHorizontal: wp(4),
  },
  miscItem: {
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 3,
  },
  miscIcon: {
    fontSize: hp(3.5),
    marginBottom: 5,
  },
  miscText: {
    fontSize: hp(2),
    fontWeight: "600",
    fontFamily: "Lato",
  },
  sectionContainer: {
    marginHorizontal: wp(5),
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: hp(2.8),
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    fontFamily: "Lato",
  },
  ingredientsList: {
    marginLeft: wp(4),
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(1),
    padding: 10,
    backgroundColor: "#FFF9E1",
    borderRadius: 8,
    elevation: 2,
  },
  ingredientBullet: {
    backgroundColor: "#FFD700",
    borderRadius: 50,
    height: hp(1.5),
    width: hp(1.5),
    marginRight: wp(2),
  },
  ingredientText: {
    fontSize: hp(1.9),
    color: "#333",
    fontFamily: "Lato",
  },
  instructionsText: {
    fontSize: hp(2),
    color: "#444",
    lineHeight: hp(3),
    textAlign: "justify",
    fontFamily: "Lato",
  },
  videoLink: {
    fontSize: hp(2.2),
    color: "#1E90FF",
    textDecorationLine: "underline",
    marginTop: 10,
    fontFamily: "Roboto",
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#D9534F",
  },
  buttonWrapper: {
    width: '100%',
    position: 'absolute', // Often used to overlay buttons on top of the image
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40, // Adjust for status bar
    paddingHorizontal: 16,
  },
  iconButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151', // dark gray
    paddingHorizontal: 16,
    marginTop: 20,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280', // Medium gray
    paddingHorizontal: 16,
    marginTop: 4,
    textTransform: 'uppercase', // Optional: makes categories look like badges
    letterSpacing: 1,
  },
  miscWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  iconItem: {
    alignItems: 'center',
    spaceY: 1, // If using Tailwind (nativewind), otherwise use margin:
  },
  iconCircle: {
    backgroundColor: '#FBBF24', // Amber color
    padding: 10,
    borderRadius: 50,
    marginBottom: 5,
  },
  iconLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4B5563',
  },
  listWrapper: {
    marginLeft: 5,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bullet: {
    height: 8,
    width: 8,
    backgroundColor: '#FBBF24', // Amber bullet point
    borderRadius: 4,
    marginRight: 10,
  },
  ingredientTextContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4B5563',
  },
  ingredientMeasure: {
    fontSize: 16,
    fontWeight: '400',
    color: '#6B7280',
    marginLeft: 5,
  },
  instructionsText: {
    fontSize: 16,
    color: '#4B5563', // Medium grey
    lineHeight: 24,   // Added for better readability
  },
});

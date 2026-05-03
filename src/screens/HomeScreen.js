import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// 1. Define ArticleCard here
const ArticleCard = ({ item, index }) => {
  const navigation = useNavigation();
  return (
    <View testID="articleDisplay">
       <TouchableOpacity onPress={() => navigation.navigate('RecipeDetail', { ...item })}>
          {/* Your Image and Text code from before */}
       </TouchableOpacity>
    </View>
  );
};

// 2. Then the Recipes component uses it
const Recipes = ({ foods, categories }) => {
  return (
    <View testID="recipesDisplay">
      <FlatList
        data={foods}
        renderItem={({ item, index }) => <ArticleCard item={item} index={index} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
};

export default Recipes;
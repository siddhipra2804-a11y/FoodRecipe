import React from 'react';
import { View, FlatList, Text, Pressable, Image } from 'react-native';
import ArticleCard from './ArticleCard'; // Or keep it in the same file

const Recipes = ({ foods, categories }) => {
  
  // The renderItem function must be INSIDE the Recipes function
  const renderItem = ({ item, index }) => {
    return (
      <ArticleCard item={item} index={index} />
    );
  };

  // This return belongs to the Recipes component
  return (
    <View testID="recipesDisplay" style={{ flex: 1 }}>
      <FlatList
        data={foods}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  ); // <--- Ensure this brace closes the Recipes component
};

export default Recipes;
import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const categories = ['Nature', 'Animals', 'Architecture'];

const images = [
  { id: '1', category: 'Nature', uri: '../../../assets/img/bloodDonation.jpg' },
  { id: '2', category: 'Nature', uri: 'https://example.com/nature2.jpg' },
  { id: '3', category: 'Animals', uri: 'https://example.com/animal1.jpg' },
  { id: '4', category: 'Animals', uri: 'https://example.com/animal2.jpg' },
  { id: '5', category: 'Architecture', uri: 'https://example.com/architecture1.jpg' },
  { id: '6', category: 'Architecture', uri: 'https://example.com/architecture2.jpg' },
];

export default function ImageGalleryApp() {
  const [selectedCategory, setSelectedCategory] = useState('Nature');

  const filteredImages = images.filter(img => img.category === selectedCategory);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Image Gallery</Text>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedCategory(item)}>
            <Text style={[styles.category, selectedCategory === item && styles.selectedCategory]}>{item}</Text>
          </TouchableOpacity>
        )}
        style={styles.categoryList}
      />
      <FlatList
        data={filteredImages}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={styles.image} />
        )}
        contentContainerStyle={styles.imageGrid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  categoryList: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  category: {
    fontSize: 18,
    marginHorizontal: 10,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  selectedCategory: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
  imageGrid: {
    paddingHorizontal: 10,
  },
  image: {
    width: '45%',
    height: 150,
    margin: '2.5%',
    borderRadius: 10,
  },
});

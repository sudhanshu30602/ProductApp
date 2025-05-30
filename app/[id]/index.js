


import { AntDesign } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getProductById } from '../../utils/api';

export const options = {
  title: 'Product Details',
};

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    getProductById(id).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  }, []);

  if (loading || !product) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={{ marginTop: 10 }}>Loading product...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <Text style={styles.title}>{product.title}</Text>

      <Text style={styles.category}>{product.category}</Text>

      <View style={styles.ratingRow}>
        <AntDesign name="star" size={16} color="#FFD700" />
        <Text style={styles.rating}>{product.rating.rate} ({product.rating.count} reviews)</Text>
      </View>

      <Text style={styles.price}>${product.price.toFixed(2)}</Text>

      <View style={styles.descriptionBox}>
        <Text style={styles.descriptionTitle}>Product Description</Text>
        <Text style={styles.descriptionText}>{product.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  category: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
    fontStyle: 'italic',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rating: {
    marginLeft: 5,
    fontSize: 14,
    color: '#555',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 20,
  },
  descriptionBox: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});

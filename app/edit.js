
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useProducts } from '../context/ProductContext';
import { getProductById, updateProduct } from '../utils/api';

export default function EditProduct() {
  const { id } = useLocalSearchParams();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [rating, setRating] = useState({ rate: '', count: '' });

  const router = useRouter();
  const { updateLocalProduct } = useProducts();

  useEffect(() => {
    getProductById(id).then((res) => {
      const data = res.data;
      setTitle(data.title);
      setPrice(String(data.price));
      setDescription(data.description);
      setCategory(data.category || '');
      setImage(data.image || '');
      setRating({
        rate: data.rating?.rate?.toString() || '',
        count: data.rating?.count?.toString() || '',
      });
    });
  }, []);

  const handleUpdate = async () => {
    const payload = {
      title,
      price: parseFloat(price) || 0,
      description,
      category,
      image,
      rating: {
        rate: parseFloat(rating.rate) || 0,
        count: parseInt(rating.count) || 0,
      },
    };

    try {
      await updateProduct(id, payload);
      updateLocalProduct(parseInt(id), payload);
      Alert.alert('Updated', 'Product updated successfully (mocked)');
      router.push('/');
    } catch (error) {
      Alert.alert('Error', 'Failed to update product');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        placeholder="Enter price"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        placeholder="Enter description"
      />

      <Text style={styles.label}>Category (Optional)</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Enter category"
      />

      <Text style={styles.label}>Image URL (Optional)</Text>
      <TextInput
        style={styles.input}
        value={image}
        onChangeText={setImage}
        placeholder="Enter image URL"
      />

      <Text style={styles.label}>Rating (Optional)</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          value={rating.rate}
          onChangeText={(text) => setRating({ ...rating, rate: text })}
          keyboardType="numeric"
          placeholder="Rate"
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          value={rating.count}
          onChangeText={(text) => setRating({ ...rating, count: text })}
          keyboardType="numeric"
          placeholder="Count"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Update Product"  color='green' onPress={handleUpdate} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    marginTop: 15,
    marginBottom: 5,
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
  },
  button:{
     backgroundColor:'yellow',
     height:50,
     borderRadius:15,
  },
  input: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  multiline: {
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  halfInput: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 30,
  },
});


import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useProducts } from '../../context/ProductContext';
import { addProduct } from '../../utils/api';


export const options = {
  title: 'Create Product',
};

export default function AddProduct() {
  const router = useRouter();
  const { addLocalProduct } = useProducts();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [rating, setRating] = useState({ rate: '', count: '' });

  const handleAdd = async () => {
    if (!title || !price || !description) {
      return Alert.alert('Missing Fields', 'Title, Price, and Description are required.');
    }

    const payload = {
      title,
      price: parseFloat(price),
      description,
      category,
      image,
      rating: {
        rate: parseFloat(rating.rate) || 0,
        count: parseInt(rating.count) || 0,
      },
    };

    try {
      const res = await addProduct(payload);
      const newProduct = {
        ...res.data,
        id: Date.now(), // fallback ID since API is mocked
        ...payload,
      };
      addLocalProduct(newProduct);
      Alert.alert('Success', 'Product added successfully (mocked)');
      router.push('/');
    } catch (err) {
      Alert.alert('Error', 'Failed to add product');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Product Title"
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        placeholder="Price in USD"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        value={description}
        onChangeText={setDescription}
        placeholder="Product Description"
        multiline
      />

      <Text style={styles.label}>Category (Optional)</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Category (e.g. men's clothing)"
      />

      <Text style={styles.label}>Image URL (Optional)</Text>
      <TextInput
        style={styles.input}
        value={image}
        onChangeText={setImage}
        placeholder="Image URL"
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
        <Button title="Add Product" onPress={handleAdd} color="#4CAF50" />
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
  input: {
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  multiline: {
    textAlignVertical: 'top',
    height: 100,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  halfInput: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 30,
  },
});


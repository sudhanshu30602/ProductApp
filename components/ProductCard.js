import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function ProductCard({ product, onDelete }) {
  const router = useRouter();

  return (
    <View style={{ padding: 10, margin: 10, borderWidth: 1 }}>
      <Text>{product.title}</Text>
      <Text>${product.price}</Text>
      <Text>{product.category}</Text>
      <Button title="View" onPress={() => router.push(`/${product.id}`)} />
      <Button title="Edit" onPress={() => router.push(`/${product.id}/edit`)} />
      <Button title="Delete" onPress={() => onDelete(product.id)} />
    </View>
  );
}

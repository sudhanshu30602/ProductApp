import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { ProductProvider } from '../context/ProductContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
   <ProductProvider>
       <Stack>
      <Stack.Screen name="index" options={{ title: 'Product List' }} />
      <Stack.Screen name="[id]/add" options={{ title: 'Add Product' }} />
      <Stack.Screen name="[id]/index" options={{ title: 'Product Details' }} />
      <Stack.Screen name="edit" options={{ title: 'Edit Product' }} />
    </Stack>
    </ProductProvider>
  );
}

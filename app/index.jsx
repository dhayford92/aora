import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white pt-40">
      <StatusBar style="auto" />
      <Text className="text-3xl text-primary">Aora App</Text>
    </View>
  );
}



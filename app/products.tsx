import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { ListItem, Text } from 'react-native-elements';
import { useLocalSearchParams } from 'expo-router';

const GET_PRODUCTS = gql`
  query GetProducts($categoryId: ID!) {
    products(categoryId: $categoryId) {
      id
      name
      description
      price
      features
    }
  }
`;

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  features: Record<string, any>;
}

export default function ProductsScreen() {
    const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
    const { loading, error, data } = useQuery<{ products: Product[] }>(GET_PRODUCTS, { variables: { categoryId },});

    if (loading) return <View style={styles.center}><Text>Loading...</Text></View>;
    if (error) return <View style={styles.center}><Text>Error: {error.message}</Text></View>;

    return (
        <View style={styles.container}>
            <FlatList
                data={data?.products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>{item.name}</ListItem.Title>
                            <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                            <Text>Price: ${item.price}</Text>
                            <Text>Features: {JSON.stringify(item.features)}</Text>
                        </ListItem.Content>
                    </ListItem>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
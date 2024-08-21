import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { ListItem, Button, Text } from 'react-native-elements';
import { useRouter } from 'expo-router';

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      description
    }
  }
`;

interface Category {
    id: string;
    name: string;
    description: string;
}

export default function CategoriesScreen() {
    const { loading, error, data } = useQuery < { categories: Category[] } > (GET_CATEGORIES);
    const router = useRouter();

    console.log('Loading:', loading);
    console.log('Error:', error);
    console.log('Data:', data);

    if (loading) return <View style={styles.center}><Text>Loading...</Text></View>;
    if (error) return <View style={styles.center}><Text>Error: {error.message}</Text></View>;

    return (
        <View style={styles.container}>
            <FlatList
                data={data?.categories}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>{item.name}</ListItem.Title>
                            <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                        </ListItem.Content>
                        <Button
                            title="View Products"
                            onPress={() => router.push({ pathname: '/products', params: { categoryId: item.id } })}
                        />
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
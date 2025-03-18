import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <Text style={styles.title}>Zeraplay</Text>
                <TouchableOpacity onPress={() => console.log('Recherche cliquée')}>
                    <Ionicons name="search" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.container2}>
                <Text style={styles.title}>Songs</Text>
                <Text style={styles.title}>Playlists</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        paddingHorizontal: 16,
        paddingBottom: 15,
    },
    container1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 13,
    },
    container2: {
        flexDirection: 'row',
        gap:30,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Header;

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, usePathname } from 'expo-router';

const Header: React.FC = () => {
    const pathname = usePathname();

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.title}>Zeraplay</Text>
        <TouchableOpacity onPress={() => console.log('Recherche cliquée')}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.container2}>
        {/* Songs Link */}
        <Link href="/" style={[styles.title, pathname === '/' && styles.activeLink]}>
          Songs
        </Link>
        {/* Playlists Link */}
        <Link href="/playlist" style={[styles.title, pathname === '/playlist' && styles.activeLink]}>
          Playlists
        </Link>
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
    gap: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  activeLink: {
    backgroundColor: '#007BFF', // Couleur de fond pour l'élément actif
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: 'white', // Changer la couleur du texte pour qu'il contraste avec le fond
  },
});

export default Header;

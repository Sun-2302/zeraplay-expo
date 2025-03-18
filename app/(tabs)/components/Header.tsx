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
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 19,
  },
});

export default Header;

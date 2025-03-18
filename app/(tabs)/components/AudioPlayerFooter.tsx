import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window'); // Obtenir la largeur de l'écran

interface FooterProps {
  isPlaying: boolean;
  currentSong: {
    artwork?: string;
    title?: string;
    filename?: string;
    artist?: string;
  } | null;
  handleStopResume: () => void;
  playNext: () => void;
}

const AudioPlayerFooter: React.FC<FooterProps> = ({
  isPlaying,
  currentSong,
  handleStopResume,
  playNext,
}) => {
  return (
    <BlurView intensity={60} tint="light" style={styles.footer}>
      <View style={styles.current}>
        <Image
          source={
            currentSong?.artwork && typeof currentSong.artwork === 'string'
              ? { uri: currentSong.artwork }
              : require('../../../assets/images/Soundwave.jpeg')
          }
          style={styles.artwork}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <ThemedText style={styles.title}>
            {currentSong?.title || currentSong?.filename || 'Aucune musique'}
          </ThemedText>
          <ThemedText style={styles.artist}>
            {currentSong?.artist || 'Artiste inconnu'}
          </ThemedText>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={handleStopResume}>
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={playNext}>
          <Ionicons name="play-skip-forward" size={28} color="black" />
        </TouchableOpacity>
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: width, // Couvre toute la largeur de l'écran
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',

    // 🎨 Effet Glassmorphism amélioré
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparence
    borderColor: 'rgba(255, 255, 255, 0.5)', // Bordure subtile
    borderWidth: 1,
    shadowColor: '#ffffff', // Ombre légère pour effet miroir
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5, // Pour Android
  },
  current: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Remplit l'espace disponible
  },
  textContainer: {
    flexShrink: 1, // Empêche le texte de dépasser
  },
  title: {
    fontWeight: 'bold',
    color: 'black', // ✅ Texte en noir
  },
  artist: {
    fontSize: 13,
    color: 'black', // ✅ Texte en noir
  },
  artwork: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 12,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
});

export default AudioPlayerFooter;

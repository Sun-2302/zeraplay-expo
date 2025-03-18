// AudioPlayerFooter.tsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';

interface AudioPlayerFooterProps {
  isPlaying: boolean;
  currentSong: string;
  handleStopResume: () => void;
  playNext: () => void;
}

const AudioPlayerFooter: React.FC<AudioPlayerFooterProps> = ({ isPlaying, currentSong, handleStopResume, playNext }) => {
  return (
    <View style={styles.footerContainer}>
      <ThemedText style={styles.currentSong}>{currentSong}</ThemedText>
      <View style={styles.controls}>
        <TouchableOpacity onPress={handleStopResume} style={styles.controlButton}>
            <Ionicons name={isPlaying ? 'pause' : 'play'} size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={playNext} style={styles.controlButton}>
        <Ionicons name="play-skip-forward" size={32} color="white" /> 
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
  },
  currentSong: {
    color: '#fff',
    marginBottom: 10,
  },
  controls: {
    flexDirection: 'row',
    gap: 8,
  },
  controlButton: {
    padding: 10,
    backgroundColor: '#A1CEDC',
    borderRadius: 5,
  },
});

export default AudioPlayerFooter;

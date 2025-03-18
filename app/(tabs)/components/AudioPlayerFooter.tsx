import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';

interface FooterProps {
  isPlaying: boolean;
  currentSong: string;
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
    <View style={styles.footer}>
      <ThemedText>{currentSong || 'Aucune musique'}</ThemedText>
      <View style={styles.controls}>
        <TouchableOpacity onPress={handleStopResume}>
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={playNext}>
          <Ionicons name="play-skip-forward" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 19,
    paddingVertical:25, 
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
  },
  controls: {
    flexDirection: 'row',
    gap: 15,
    
  },
});

export default AudioPlayerFooter;

import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';

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
    <View style={styles.footer}>
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
        <View>
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
    paddingVertical: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    gap: 15,
  },
  current: {
    flexDirection: 'row',
    gap: 15,
  },
  title: {
    fontWeight: 'bold',
  },
  artist: {
    fontSize: 13,
  },
  artwork: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});

export default AudioPlayerFooter;

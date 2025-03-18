// AudioList.tsx
import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Audio } from 'expo-av';
import AudioPlayerFooter from './AudiPlayerFooter';

interface AudioListProps {
  audioFiles: any[];
}

const AudioList: React.FC<AudioListProps> = ({ audioFiles }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSongIndex, setCurrentSongIndex] = useState<number | null>(null);
  const [position, setPosition] = useState<number>(0);

  const toggleAudio = async (uri: string, index: number) => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: true, positionMillis: 0 }
    );

    setSound(newSound);
    setIsPlaying(true);
    setCurrentSongIndex(index);
  };

  const handleStopResume = async () => {
    if (sound) {
      if (isPlaying) {
        const status = await sound.getStatusAsync();
        setPosition(status.positionMillis);
        await sound.stopAsync();
        setIsPlaying(false);
      } else {
        await sound.playFromPositionAsync(position);
        setIsPlaying(true);
      }
    }
  };

  const playNext = async () => {
    if (currentSongIndex !== null && currentSongIndex < audioFiles.length - 1) {
      const nextSongIndex = currentSongIndex + 1;
      const nextSong = audioFiles[nextSongIndex];
      await toggleAudio(nextSong.uri, nextSongIndex);
    }
  };

  const allowedExtensions = ['.mp3', '.m4a'];

  const filteredAudio = audioFiles.filter((asset) =>
    allowedExtensions.some((ext) => asset.filename.endsWith(ext))
  );

  return (
    <ThemedView style={styles.stepContainer}>
      {filteredAudio.length === 0 ? (
        <ThemedText>Aucun fichier audio trouvé.</ThemedText>
      ) : (
        <FlatList
          nestedScrollEnabled
          data={filteredAudio}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => toggleAudio(item.uri, index)}
              style={styles.audioItem}
            >
              <ThemedText>{item.filename}</ThemedText>
            </TouchableOpacity>
          )}
        />
      )}

      {currentSongIndex !== null && (
        <AudioPlayerFooter
          isPlaying={isPlaying}
          currentSong={filteredAudio[currentSongIndex].filename}
          handleStopResume={handleStopResume}
          playNext={playNext}
        />
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  audioItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default AudioList;

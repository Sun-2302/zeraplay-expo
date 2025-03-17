import React, { useState, useRef } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Audio } from 'expo-av';

interface AudioListProps {
  audioFiles: any[];
}

const AudioList: React.FC<AudioListProps> = ({ audioFiles }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const toggleAudio = async (uri: string) => {
    if (isPlaying && sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    } else {
      if (sound) {
        await sound.unloadAsync(); 
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);
    }
  };

  return (
    <ThemedView style={styles.stepContainer}>
      {audioFiles.length === 0 ? (
        <ThemedText>Aucun fichier mp3 ou m4a trouvé.</ThemedText>
      ) : (
        <FlatList
          nestedScrollEnabled
          data={audioFiles}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => toggleAudio(item.uri)} style={styles.audioItem}>
              <ThemedText>{item.filename}</ThemedText>
            </TouchableOpacity>
          )}
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

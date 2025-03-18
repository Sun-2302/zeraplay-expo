import React from 'react';
import { FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface AudioListProps {
  audioFiles: any[];
  toggleAudio: (uri: string, index: number) => void;
}

const AudioList: React.FC<AudioListProps> = ({ audioFiles, toggleAudio }) => {
  return (
    <ThemedView style={styles.stepContainer}>
      {!audioFiles || audioFiles.length === 0 ? (
        <ThemedText>Aucun fichier audio trouvé.</ThemedText>
      ) : (
        <FlatList
          nestedScrollEnabled
          data={audioFiles}
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
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    gap: 8,
    paddingBottom: 80,
  },
  audioItem: {
    padding: 8,
    paddingLeft: 16,
  },
});

export default AudioList;

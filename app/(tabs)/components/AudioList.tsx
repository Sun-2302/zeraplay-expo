import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface AudioListProps {
  audioFiles: any[];
}

const AudioList: React.FC<AudioListProps> = ({ audioFiles }) => {
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
            <View style={styles.audioItem}>
              <ThemedText>{item.filename}</ThemedText>
            </View>
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

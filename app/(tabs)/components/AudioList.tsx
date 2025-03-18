import React from 'react';
import { FlatList, TouchableOpacity, StyleSheet, View, Image } from 'react-native';
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
              <Image
                source={{ uri: item.artwork || require('../../../assets/images/Soundwave.jpeg') }}
                style={styles.artwork}
                resizeMode="cover"
              />
              <View>
                <ThemedText style={styles.title}>{item.title || item.filename} {console.log(item.title)}</ThemedText>
                <ThemedText style={styles.details}>
                  {item.artist || 'Artiste inconnu'}
                </ThemedText>
              </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingLeft: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: 'gray',
  },
  artwork: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
});

export default AudioList;

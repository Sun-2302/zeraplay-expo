import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Audio } from 'expo-av';
import { useAudioFiles } from '../utils/useAudioFiles';

import Header from './components/Header';
import AudioPlayerFooter from './components/AudioPlayerFooter';
import AudioList from './components/AudioList';


const HomeScreen: React.FC = () => {

  const { audioFiles, permissionResponse, requestPermission } = useAudioFiles();

  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSongIndex, setCurrentSongIndex] = useState<number | null>(null);

  useEffect(() => {
    if (permissionResponse?.status !== 'granted') {
      requestPermission();
    }
  }, [permissionResponse]);

  const toggleAudio = async (uri: string, index: number) => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }

    await Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: true, positionMillis: 0 }
    );

    setSound(newSound);
    setIsPlaying(true);
    setCurrentSongIndex(index);
  };

  const handleStopResume = async () => {
    if (!sound) return;
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    if (currentSongIndex === null || currentSongIndex === audioFiles.length - 1) return;
    const nextIndex = currentSongIndex + 1;
    toggleAudio(audioFiles[nextIndex].uri, nextIndex);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.body}>
        <Header />
        {permissionResponse?.granted ? (
          <AudioList
            audioFiles={audioFiles}
            toggleAudio={toggleAudio}
          />
        ) : (
          <ThemedText>Permission nécessaire pour accéder aux fichiers audio</ThemedText>
        )}
      </View>

      <AudioPlayerFooter
        isPlaying={isPlaying}
        currentSong={currentSongIndex !== null ? audioFiles[currentSongIndex] : null}
        handleStopResume={handleStopResume}
        playNext={playNext}
      />

    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    paddingTop: 50,
  },
});

export default HomeScreen;

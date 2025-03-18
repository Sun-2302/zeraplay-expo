import { useState, useEffect } from 'react';
import * as MusicLibrary from 'expo-music-library';
import * as MediaLibrary from 'expo-media-library';
console.log("ExpoMusicLibrary:", MusicLibrary);

export const useAudioFiles = () => {
  const [audioFiles, setAudioFiles] = useState<any[]>([]);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    if (!permissionResponse?.granted) {
      requestPermission();
    } else {
      loadAudioFiles();
    }
  }, [permissionResponse]);

  const loadAudioFiles = async () => {
    try {
      const { assets } = await MusicLibrary.getAssetsAsync({
        first: 100, // Nombre de fichiers audio à récupérer
        sortBy: ['default'], // Tri par défaut
      });

      // Filtrons uniquement les fichiers audio
      const audioAssets = assets.filter(asset => asset.mediaType === 'audio');

      setAudioFiles(audioAssets);
    } catch (error) {
      console.error('Erreur lors du chargement des fichiers audio:', error);
    }
  };

  return { audioFiles, permissionResponse, requestPermission };
};

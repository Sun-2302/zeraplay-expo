import { useState, useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';

// Hook personnalisé pour gérer les fichiers audio
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
    const media = await MediaLibrary.getAssetsAsync({
      mediaType: MediaLibrary.MediaType.audio,
      first: 10000,
    });

    const filteredAudio = media.assets.filter(asset =>
      asset.filename.endsWith('.mp3') || asset.filename.endsWith('.m4a')
    );

    setAudioFiles(filteredAudio);
  };

  return { audioFiles, permissionResponse, requestPermission };
};

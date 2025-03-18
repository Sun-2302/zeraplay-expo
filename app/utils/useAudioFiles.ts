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

    const allowedExtensions = ['.mp3', '.m4a'];

    const filteredAudio = media.assets.filter(asset =>
      allowedExtensions.some(ext => asset.filename.endsWith(ext))
    );


    setAudioFiles(filteredAudio);
  };

  return { audioFiles, permissionResponse, requestPermission };
};

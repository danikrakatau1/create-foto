import React from 'react';
import {Composition} from 'remotion';
import {JapaneseScene} from './JapaneseScene';
import {sceneConfig} from './scene-config';

export const RemotionRoot = () => {
  return (
    <Composition
      id="JapaneseScene"
      component={JapaneseScene}
      durationInFrames={sceneConfig.durationSeconds * 30}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};

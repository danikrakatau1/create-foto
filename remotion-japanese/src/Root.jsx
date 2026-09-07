import React from 'react';
import {Composition} from 'remotion';
import {JapaneseScene} from './JapaneseScene';

export const RemotionRoot = () => {
  return (
    <Composition
      id="JapaneseScene"
      component={JapaneseScene}
      durationInFrames={240}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};

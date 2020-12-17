import React from 'react';
import './App.css';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

import { FirebaseAppProvider } from 'reactfire';
import Main from './components/Main';

const firebaseConfig = {
  apiKey: "AIzaSyAq3kbp7cnn-spQ4_vBbKczj9UeH_tMZPQ",
  authDomain: "soundfriend-529f7.firebaseapp.com",
  projectId: "soundfriend-529f7",
  storageBucket: "soundfriend-529f7.appspot.com",
  messagingSenderId: "318889120890",
  appId: "1:318889120890:web:077c03ecf7c6f86c7457c3"
};

// const SONG_OPTIONS = [
//   'creepingdanger',
//   'fabulous',
//   'fortuna',
//   'gameshow',
//   'jazz',
//   'monty',
//   'pathetique',
//   'quietreflection',
//   'rap',
//   'serenade',
//   'serene',
//   'spooky',
//   'valkyrie',
//   'psychedelic',
//   'avemaria',
//   'gregorian',
//   'royal'
// ].sort();

function App() {
  

  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Main></Main>
    </FirebaseAppProvider>
  );
}

export default App;

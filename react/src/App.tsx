import React, { useEffect, useState } from 'react';
import './App.css';
import Player from './components/Player';
import { Button, Card, CardContent, CardHeader, Paper } from '@material-ui/core';
import SongOption from './components/SongOption';
import openSocket from "socket.io-client";
const prod = true;
const ENDPOINT = prod ? window.location.hostname : 'http://localhost:4200';
const socket = openSocket(ENDPOINT);
const SONG_OPTIONS = [
  'creepingdanger',
  'fabulous',
  'fortuna',
  'gameshow',
  'jazz',
  'monty',
  'pathetique',
  'quietreflection',
  'rap',
  'serenade',
  'serene',
  'spooky',
  'valkyrie',
  'psychedelic',
  'avemaria',
  'gregorian',
  'royal'
].sort();

function App() {
  const [playing, updatePlaying] = useState(false);
  const [selectedSong, updateSelectedSong] = useState('');
  const [totalUsers, updateTotalUsers] = useState(0);
  const [isAdmin, updateIsAdmin] = useState(false);
  const [volume, updateVolume] = useState(0.25);
  const [interacted, updateInteracted] = useState(false);

  useEffect(() => {
    socket.on('userChange', (totalUsersNumber: number) => {
      updateTotalUsers(totalUsersNumber);
    });
    socket.on('play', (song: string) => {
      updateSelectedSong(song);
      updatePlaying(true);
    });
    socket.on('stop', () => {
      updatePlaying(false);
    });
    socket.on('isAdmin', (isAdmin: boolean) => {
      updateIsAdmin(isAdmin);
    });
    socket.on('volume', (val: number) => {
      updateVolume(val);
    });
  }, []);

  function play() {
    socket.emit('playSong', selectedSong);
  }

  function stop() {
    socket.emit('stopSong');
  }

  function selectSong(song: string) {
    if (isAdmin) {
      stop();
      updateSelectedSong(song);
    }
  }

  function emergencyStop() {
    updatePlaying(false);
  }

  function changeVolume(val: number) {
    socket.emit('changeVolume', val);
  }

  function interact() {
    updateInteracted(true);
  }

  return (
    <div className="appWrapper">
      {
        interacted ? (
          <Card>
            <CardHeader title="DnD Jukebox" subheader={'Total Users: ' + totalUsers}></CardHeader>
            <CardContent>
                {
                  isAdmin ? (
                    <div className="controls">
                      <Paper className="paper" elevation={3}>
                          <Button variant="outlined" color="primary" onClick={play} disabled={!selectedSong}>Play</Button>
                          <Button variant="outlined" color="secondary" onClick={stop} disabled={!selectedSong}>Stop</Button>
                          <Button variant="outlined" color="default" onClick={() => changeVolume(0.1)}>10%</Button>
                          <Button variant="outlined" color="default" onClick={() => changeVolume(0.25)}>25%</Button>
                          <Button variant="outlined" color="default" onClick={() => changeVolume(0.5)}>50%</Button>
                          <Button variant="outlined" color="default" onClick={() => changeVolume(0.75)}>75%</Button>
                          <Button variant="outlined" color="default" onClick={() => changeVolume(1.0)}>100%</Button>
                      </Paper>
                    </div>
                  ) : (
                    <div className="controls">
                      <Paper className="paper" elevation={3}>
                          <Button variant="outlined" color="secondary" onClick={emergencyStop}>Emergency Stop</Button>
                      </Paper>
                    </div>
                  )
                }
                <Paper className="paper" elevation={3}>
                  {SONG_OPTIONS.map((option: string) => {
                    return (
                      <div className={selectedSong === option ? 'option active' : 'option'} key={'option' + option} onClick={() => selectSong(option)}>
                        <SongOption option={option}></SongOption>
                      </div>
                    )
                  })}
                </Paper>
                <Player playing={playing} fileName={selectedSong} volume={volume}></Player>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader title="DnD Jukebox"></CardHeader>
            <CardContent>
              <div className="center">
                <Button variant="outlined" color="primary" onClick={interact}>Click me to begin!</Button>
              </div>
            </CardContent>
          </Card>
          
        )
      }
      
    </div>
    
  );
}

export default App;

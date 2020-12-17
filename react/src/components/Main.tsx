import React, { useEffect, useState } from 'react';
import { AuthCheck, useAuth, useFirebaseApp, useFirestoreCollectionData, useFirestoreDocData, useStorage } from 'reactfire';
import openSocket from "socket.io-client";
import Player from './Player';
import { Button, Card, CardContent, CardHeader, IconButton, Paper } from '@material-ui/core';
import SongOption from './SongOption';
import './Main.css';
import SettingsIcon from '@material-ui/icons/Settings';
import Settings from './Settings';


const prod = true;
const ENDPOINT = prod ? window.location.hostname : 'http://localhost:4200';
const socket = openSocket(ENDPOINT);

function Main(props: any) {
    const [playing, updatePlaying] = useState(false);
    const [selectedSong, updateSelectedSong] = useState('');
    const [src, updateSrc] = useState('');
    const [totalUsers, updateTotalUsers] = useState(0);
    const [volume, updateVolume] = useState(0.25);
    const [interacted, updateInteracted] = useState(false);
    const [settingsOpen, updateSettingsOpen] = useState(false);

    const firebaseApp = useFirebaseApp();
    const songsRef = firebaseApp.firestore().collection('songs');
    const songOptions = useFirestoreCollectionData(songsRef, {
        initialData: []
    });
    const storage = useStorage();
    const auth = useAuth();
    const userRef = firebaseApp.firestore().collection('users').doc(auth.currentUser?.uid);
    const userDoc: any = useFirestoreDocData(userRef).data;
    const isAdmin = userDoc?.isAdmin;

    useEffect(() => {
        socket.on('userChange', (totalUsersNumber: number) => {
        updateTotalUsers(totalUsersNumber);
        });
        socket.on('play', (song: string) => {
            storage.ref().child(song).getDownloadURL().then((url: string) => {
                updateSrc(url);
                updateSelectedSong(song);
                updatePlaying(true);
            });
        });
        socket.on('stop', () => {
        updatePlaying(false);
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

    function openSettings() {
        updateSettingsOpen(true);
    }

    function closeSettings() {
        updateSettingsOpen(false);
    }

    return (
        <div className="appWrapper">
        {
          interacted ? (
            <Card>
              <CardHeader
                title="DnD Jukebox"
                subheader={'Total Users: ' + totalUsers}
                action={
                    <IconButton onClick={openSettings}>
                      <SettingsIcon />
                    </IconButton>
                  }
                >
              </CardHeader>
              
              <CardContent>
                  <AuthCheck fallback={
                      <Paper className="paper" elevation={3}>Please log in at the top right</Paper>
                  }>
                  </AuthCheck>
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
                    {songOptions.data.map((option: any) => {
                      return (
                        <div className={selectedSong === option.title ? 'option active' : 'option'} key={'option' + option.title} onClick={() => selectSong(option.title)}>
                            <SongOption option={option.title}></SongOption>
                        </div>
                      )
                    })}
                  </Paper>
                  <AuthCheck fallback={null}>
                    <Player playing={playing} fileName={src} volume={volume}></Player>
                  </AuthCheck>
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
        <Settings open={settingsOpen} handleClose={closeSettings} isAdmin={isAdmin}></Settings>
        </div>
    );
}
export default Main;
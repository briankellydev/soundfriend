import { AppBar, Button, Dialog, DialogContent, DialogTitle, Tab, Tabs, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { AuthCheck, useAuth, useFirebaseApp, useStorage } from 'reactfire';
import './Settings.css';

function Settings(props: any) {
    const {handleClose, open, isAdmin} = props;
    const [ email, updateEmail ] = useState('');
    const [ password, updatePassword ] = useState('');
    const [ value, updateValue ] = useState(0);
    const [ loading, updateLoading ] = useState(false);
    const auth = useAuth();
    const storage = useStorage();
    const firebaseApp = useFirebaseApp();
    const songsRef = firebaseApp.firestore().collection('songs');

    function login() {
        updateLoading(true);
        auth.signInWithEmailAndPassword(email, password).then(() => {
            updateLoading(false);
            handleClose();
        });
        
    }

    function logout() {
        updateLoading(true);
        auth.signOut().then(() => {
            updateLoading(false);
            handleClose();
        });
    }

    function handleChange(event: any, val: number) {
        updateValue(val);
    }

    function uploadFile(event: any) {
        updateLoading(true);
        storage.ref().child(event.target.files[0].name).put(event.target.files[0]).then(() => {
            songsRef.add({title: event.target.files[0].name}).then(() => {
                updateLoading(false);
                handleClose();
            });
        })
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Settings</DialogTitle>
            <DialogContent>
                <div className="dialogWrapper">
                    <div className="field">
                        <AppBar position="static">
                            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                <Tab label="Login"/>
                                {isAdmin && (<Tab label="Upload"/>)}
                            </Tabs>
                        </AppBar>
                    </div>
                    
                    {value === 0 && (
                        <>
                            <div className="field">
                                <TextField required label="E-Mail" value={email} onChange={(event) => updateEmail(event.target.value)}></TextField>
                            </div>
                            <div className="field">
                                <TextField required label="Password" type="password" value={password} onChange={(event) => updatePassword(event.target.value)}></TextField>
                            </div>
                            <div className="field">
                                <Button variant="outlined" color="primary" disabled={!email || !password || loading} onClick={login}>Login</Button>
                                <Button variant="outlined" color="secondary" disabled={loading} onClick={logout}>Logout</Button>
                            </div>
                        </>
                    )}
                    {
                        value === 1 && isAdmin && (
                            <input type="file" accept=".mp3" onChange={uploadFile} disabled={loading}></input>
                        )
                    }
                </div>
            
            </DialogContent>
        </Dialog>
    );
}
export default Settings;
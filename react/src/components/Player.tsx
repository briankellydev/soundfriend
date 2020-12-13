import React, { createRef, useEffect } from 'react';

function Player(props: any) {
    const {fileName, playing, volume} = props;
    const audioRef: any = createRef();
    useEffect(() => {
        audioRef.current.pause();
        audioRef.current.load();
    }, [fileName, audioRef]);

    useEffect(() => {
        if (playing) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
        audioRef.current.volume = volume;
    }, [playing, audioRef, volume]);

    return (
        <audio ref={audioRef} loop={true}>
            <source src={fileName + '.mp3'} type="audio/mpeg"></source>
        </audio>
    );
}
export default Player;
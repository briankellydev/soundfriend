import React from 'react';
import './SongOption.css';

function SongOption(props: any) {
    const {option} = props;
    return (
        <div>{option.replace('.mp3', '')}</div>
    )

}
export default SongOption;
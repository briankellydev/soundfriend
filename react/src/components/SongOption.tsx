import React from 'react';
import './SongOption.css';

function SongOption(props: any) {
    const {option} = props;
    return (
        <div>{option}</div>
    )

}
export default SongOption;
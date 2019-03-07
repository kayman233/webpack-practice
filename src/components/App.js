import React from 'react';
import 'react-piano/dist/styles.css';
import Input from 'arui-feather/input';
import Select from 'arui-feather/select';

import PlaybackDemo from './PlaybackDemo';
import BasicPiano from './BasicPiano';
import getSongs from '../configs/songs';
import offsets from '../configs/offsets';
import './App.css';

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

class App extends React.Component {
    state = {
        duration: 400,
        currentSong: 'CMajor',
        offset: 0
    };

    handleOffsetChange = (offset) => {
        this.setState({ offset: +offset[0] });
    };

    handleDurationChange = (duration) => {
        this.setState({ duration });
    };

    handleSongChange = (song) => {
        this.setState({ currentSong: song[0] });
    };

    render() {
        const { duration, currentSong, offset } = this.state;
        const allSongs = getSongs(offset);
        const songsToSelect = Object.keys(allSongs).map((key) => ({ value: key, text: allSongs[key].name }));

        return (
            <div>
                <div className="container">
                    <h1>Тренировка гамм</h1>
                    <div className="row mt-5">
                        <div className="col-md-8 offset-md-2">
                            <p className="description">Сделано ради любимой и самой дорогой Сони</p>

                            <div className="settings">
                                <div className="duration">
                                    <span className="duration__text">Длительность (мс): </span>
                                    <Input
                                        placeholder='Введите длительность в мс'
                                        value={ `${duration}` }
                                        onChange={ this.handleDurationChange }
                                        view='line'
                                        size='s'
                                        clear={ true }
                                    />
                                </div>
                                <div className="settings__dropdown">
                                    <div className="gamma">
                                        <Select
                                            label='Гамма'
                                            mode='radio'
                                            options={ songsToSelect }
                                            onChange={ this.handleSongChange }
                                            value={ [currentSong] }
                                        />
                                    </div>
                                    <div className="offset">
                                        <Select
                                            width="available"
                                            label='Сдвиг октавы'
                                            mode='radio'
                                            options={ offsets }
                                            onChange={ this.handleOffsetChange }
                                            value={ [`${offset}`] }
                                        />
                                    </div>
                                </div>
                            </div>

                            <PlaybackDemo
                                audioContext={ audioContext }
                                soundfontHostname={ soundfontHostname }
                                song={ allSongs[currentSong].notes }
                                duration={ duration }
                                offset={ offset }
                            />
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-8 offset-md-2 basic-piano">
                            <BasicPiano offset={ offset } />
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default App;

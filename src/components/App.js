import React from 'react';
import 'react-piano/dist/styles.css';
import Input from 'arui-feather/input';
import Select from 'arui-feather/select';

import PlaybackDemo from './PlaybackDemo';
import BasicPiano from './BasicPiano';
import songs from '../configs/songs';
import './App.css';

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

class App extends React.Component {
    state = {
        duration: 400,
        currentSong: 'CMajor'
    };

    handleDurationChange = (duration) => {
        this.setState({duration});
    };

    handleSongChange = (song) => {
        console.log(song);
        this.setState({ currentSong: song[0] });
    };

    render() {
        const songsToSelect = [{
            value: 'CMajor',
            text: 'До мажор'
        },{
            value: 'CMinor',
            text: 'До минор'
        }];

        return (
            <div>
                <div className="container">
                    <h1>Тренировка гамм</h1>
                    <div className="row mt-5">
                        <div className="col-md-8 offset-md-2">
                            <p className="description">Сделано ради любимой и самой дорогой Сони</p>
                            <div className="duration">
                                <span className="duration__text">Длительность (мс): </span>
                                <Input
                                    placeholder='Введите длительность в мс'
                                    value={this.state.duration}
                                    onChange={this.handleDurationChange}
                                    view='line'
                                    size='s'
                                    clear={ true }
                                />
                            </div>
                            <div>
                                <Select
                                    label='Гамма'
                                    mode='radio'
                                    options={ songsToSelect }
                                    onChange={this.handleSongChange}
                                />
                            </div>
                            <PlaybackDemo
                                audioContext={audioContext}
                                soundfontHostname={soundfontHostname}
                                song={songs[this.state.currentSong]}
                                duration={this.state.duration}
                            />
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-8 offset-md-2 basic-piano">
                            <BasicPiano />
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default App;

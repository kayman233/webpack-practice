import React from 'react';
import 'react-piano/dist/styles.css';
import Input from 'arui-feather/input';
import Select from 'arui-feather/select';

import PlaybackDemo from './PlaybackDemo';
import BasicPiano from './BasicPiano';
import getGammas from '../configs/gammas';
import exercises from '../configs/exercise';
import offsets from '../configs/offsets';
import './App.css';

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

const mapSongsToRender = (songs) =>
    Object.keys(songs).map((key) => ({
        ...songs[key],
        value: key,
        text: songs[key].name,
    }));

class App extends React.Component {
    state = {
        duration: 400,
        currentGamma: 'CMajor',
        currentExercise: 'gamma',
        offset: 0
    };

    handleOffsetChange = (offset) => {
        this.setState({ offset: +offset[0] });
    };

    handleDurationChange = (duration) => {
        this.setState({ duration });
    };

    handleGammaChange = (gamma) => {
        this.setState({ currentGamma: gamma[0] });
    };

    handleExerciseChange = (exercise) => {
        console.log(exercise[0]);
        this.setState({ currentExercise: exercise[0] });
    };

    render() {
        const { duration, currentGamma, offset, currentExercise } = this.state;
        const gammas = getGammas(offset);

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
                                            options={ mapSongsToRender(gammas) }
                                            onChange={ this.handleGammaChange }
                                            value={ [currentGamma] }
                                        />
                                    </div>
                                    <div className="exercise">
                                        <Select
                                            label='Упражнения'
                                            mode='radio'
                                            options={ mapSongsToRender(exercises) }
                                            onChange={ this.handleExerciseChange }
                                            value={ [currentExercise] }
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
                                song={ exercises[currentExercise].exercise(gammas[currentGamma].notes) }
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

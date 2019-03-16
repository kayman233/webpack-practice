import React from 'react';
import 'react-piano/dist/styles.css';
import Input from 'arui-feather/input';
import Select from 'arui-feather/select';

import PlaybackDemo from './PlaybackDemo';
import BasicPiano from './BasicPiano';
import getGammas from '../configs/gammas';
import exercises from '../configs/exercise';
import offsets from '../configs/offsets';
import { directions, delay, intervals } from '../configs/options';
import getSongs from '../services/getSongs';
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
        currentExercise: 'interval',
        intervalSettings: {
            direction: directions[0].value,
            delay: delay[0].value,
            interval: intervals[0].value
        },
        offset: 0
    };

    handleOffsetChange = (value) => {
        this.setState({ offset: +value[0] });
    };
    handleDurationChange = (duration) => {
        this.setState({ duration });
    };
    handleGammaChange = (value) => {
        this.setState({ currentGamma: value[0] });
    };
    handleExerciseChange = (value) => {
        this.setState({ currentExercise: value[0] });
    };
    handleDirectionChange = (value) => {
        const { intervalSettings } = this.state;
        this.setState({
            intervalSettings: {
                ...intervalSettings,
                direction: value[0]
            }
        });
    };
    handleDelayChange = (value) => {
        const { intervalSettings } = this.state;
        this.setState({
            intervalSettings: {
                ...intervalSettings,
                delay: value[0]
            }
        });
    };
    handleIntervalChange = (value) => {
        const { intervalSettings } = this.state;
        this.setState({
            intervalSettings: {
                ...intervalSettings,
                interval: value[0]
            }
        });
    };

    render() {
        const { duration, currentGamma, offset, currentExercise, intervalSettings } = this.state;
        const gammas = getGammas(offset);

        return (
            <div>
                <div className="container">
                    <h1>Тренировка гамм</h1>
                    <div className="row mt-5">
                        <div className="col-md-10 offset-md-1">
                            <p className="description">Сделано ради любимой и самой дорогой Сони</p>

                            <div className="settings">
                                <div className="settings__dropdown">
                                    <div className="settings__main">
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
                                        <div className="gamma">
                                            <Select
                                                width="available"
                                                label='Гамма'
                                                mode='radio'
                                                options={ mapSongsToRender(gammas) }
                                                onChange={ this.handleGammaChange }
                                                value={ [currentGamma] }
                                            />
                                        </div>
                                        <div className="exercise">
                                            <Select
                                                width="available"
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
                                    <div className="settings__additional">
                                        {
                                            currentExercise === 'interval' && (
                                                <div className="settings__additional--interval">
                                                    <div className="direction">
                                                        <Select
                                                            width="available"
                                                            label='Направление'
                                                            mode='radio'
                                                            options={ directions }
                                                            onChange={ this.handleDirectionChange }
                                                            value={ [intervalSettings.direction] }
                                                        />
                                                    </div>
                                                    <div className="delay">
                                                        <Select
                                                            width="available"
                                                            label='Промежуток'
                                                            mode='radio'
                                                            options={ delay }
                                                            onChange={ this.handleDelayChange }
                                                            value={ [intervalSettings.delay] }
                                                        />
                                                    </div>
                                                    <div className="interval">
                                                        <Select
                                                            width="available"
                                                            label='Тип интервала'
                                                            mode='radio'
                                                            options={ intervals }
                                                            onChange={ this.handleIntervalChange }
                                                            value={ [intervalSettings.interval] }
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>

                            <PlaybackDemo
                                audioContext={ audioContext }
                                soundfontHostname={ soundfontHostname }
                                song={ getSongs(currentGamma, currentExercise, offset, intervalSettings) }
                                duration={ duration }
                                offset={ offset }
                            />
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-10 offset-md-1 basic-piano">
                            <BasicPiano offset={ offset } />
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default App;

import React from 'react';
import { Piano, KeyboardShortcuts } from 'react-piano';
import 'react-piano/dist/styles.css';

import SoundfontProvider from './SoundfontProvider';
import DimensionsProvider from "./DimensionsProvider";

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

class BasicPiano extends React.Component {
    render() {
        const { offset } = this.props;
        const noteRange = {
            first: 41 + offset * 12,
            last: 88 + offset * 12,
        };

        const keyboardShortcuts = KeyboardShortcuts.create({
            firstNote: noteRange.first,
            lastNote: noteRange.last,
            keyboardConfig: KeyboardShortcuts.HOME_ROW,
        });

        return (
            <SoundfontProvider
                instrumentName="acoustic_grand_piano"
                audioContext={audioContext}
                hostname={soundfontHostname}
                render={({ isLoading, playNote, stopNote }) => (
                    <DimensionsProvider>
                        {({ containerWidth }) => (
                            <Piano
                                noteRange={noteRange}
                                width={containerWidth}
                                playNote={playNote}
                                stopNote={stopNote}
                                disabled={isLoading}
                                keyboardShortcuts={keyboardShortcuts}
                            />
                        )}
                    </DimensionsProvider>
                )}
            />
        );
    }
}

export default BasicPiano;

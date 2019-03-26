import { MAX_NOTE } from './options';

const wrapNotes = (notes) => {
    const arrUp = notes.slice();
    const arrDown = notes.reverse();

    return [...arrUp, [], ...arrDown, [], []];
};

const getMainSteps = (notes) => {
    const result = [];

    notes.forEach((note, index) => {
        if (index % 7 === 0 || index % 7 === 2 || index % 7 === 4) {
            result.push([note[0]])
        }
    });

    return wrapNotes(result);
};

const getDistance = (interval) => {
    switch (interval) {
        case 'i3+':
            return 4;
        case 'i3-':
            return 3;
        case 'i6+':
            return 9;
        case 'i6-':
            return 8;
        case 'i9+':
            return 16;
        case 'i9-':
            return 15;
        default:
            return 0;
    }
};

const getNoteByDistance = (note, distance, direction) =>
    direction === 'up'
        ? note + distance
        : note - distance;

export default {
    gamma: {
        name: 'Обычная гамма',
        id: 'gamma',
        exercise: (gamma) => {
            return wrapNotes(gamma);
        }
    },
    interval: {
        name: 'Интервал',
        id: 'interval',
        exercise: (gamma, { delay, direction, interval }) => {
            const distance = getDistance(interval);
            const result = [];
            gamma.forEach(([note]) => {
                const newNote = getNoteByDistance(note, distance, direction);
                if (newNote <= MAX_NOTE) {
                    if (delay === 'together') {
                        result.push([note, newNote]);
                    } else {
                        result.push([note]);
                        result.push([newNote]);
                    }
                    result.push([]);
                }
            });
            return wrapNotes(result);
        }
    },
    arpeggio: {
        name: 'Арпеджио (135)',
        id: 'arpeggio',
        exercise: (gamma) => {
            return getMainSteps(gamma);
        }
    }
}

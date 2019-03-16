const wrapNotes = (notes) => {
    const arrUp = notes.slice();
    const arrDown = notes.reverse();

    return [...arrUp, [], ...arrDown, [], []];
};

const getMainSteps = (notes) => {
    const result = [];
    for (let offset = 0; offset < 2; ++offset) {
        result.push([notes[0][0] + offset * 12], [notes[2][0] + offset * 12], [notes[4][0] + offset * 12]);
    }

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
        name: 'Хроматическая гамма',
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
                if (delay === 'together') {
                    result.push([note, getNoteByDistance(note, distance, direction)]);
                } else {
                    result.push([note]);
                    result.push([getNoteByDistance(note, distance, direction)]);
                }
                result.push([]);
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

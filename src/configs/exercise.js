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

export default {
    gamma: {
        name: 'Хроматическая гамма',
        id: 'gamma',
        exercise: (gamma) => {
            return wrapNotes(gamma);
        }
    },
    interval: {
        name: 'Интервал (Не готово)',
        id: 'interval',
        exercise: (gamma) => {
            return []
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

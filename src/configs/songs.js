const generateGammaMajor = (mainNote) => {
    const arr = [[mainNote]];
    const majorDiffs = [2, 2, 1, 2, 2, 2, 1];
    majorDiffs.forEach((v) => {
        const lastNote = arr[arr.length - 1][0];
        arr.push([lastNote + v]);
    });

    const arrUp = arr.slice();
    const arrDown = arr.reverse();

    return [...arrUp, [], ...arrDown, [], []];
};

const generateGammaMinor = (mainNote) => {
    const arr = [[mainNote]];
    const minorDiffs = [2, 1, 2, 2, 1, 2, 2];
    minorDiffs.forEach((v) => {
        const lastNote = arr[arr.length - 1][0];
        arr.push([lastNote + v]);
    });

    const arrUp = arr.slice();
    const arrDown = arr.reverse();

    return [...arrUp, [], ...arrDown, [], []];
};

const getMainSteps = (notes) => {
    const arr = [];
    for (let offset = 0; offset < 2; ++offset) {
        arr.push([notes[0][0] + offset * 12], [notes[2][0] + offset * 12], [notes[4][0] + offset * 12]);
    }

    const arrUp = arr.slice();
    const arrDown = arr.reverse();

    return [ ...arrUp, [], ...arrDown, [], []];
};

export default (offset) => {
    const gammas = {
        'CMajor': {name: 'До мажор', notes: generateGammaMajor(60 + offset * 12)},
        'CMinor': {name: 'До минор', notes: generateGammaMinor(60 + offset * 12)},
        'DMajor': {name: 'Ре мажор', notes: generateGammaMajor(62 + offset * 12)},
        'DMinor': {name: 'Ре минор', notes: generateGammaMinor(62 + offset * 12)},
        'EMajor': {name: 'Ми мажор', notes: generateGammaMajor(64 + offset * 12)},
        'EMinor': {name: 'Ми минор', notes: generateGammaMinor(64 + offset * 12)},
        'FMajor': {name: 'Фа мажор', notes: generateGammaMajor(65 + offset * 12)},
        'FMinor': {name: 'Фа минор', notes: generateGammaMinor(65 + offset * 12)},
        'GMajor': {name: 'Соль мажор', notes: generateGammaMajor(67 + offset * 12)},
        'GMinor': {name: 'Соль минор', notes: generateGammaMinor(67 + offset * 12)},
        'AMajor': {name: 'Ля мажор', notes: generateGammaMajor(69 + offset * 12)},
        'AMinor': {name: 'Ля минор', notes: generateGammaMinor(69 + offset * 12)},
        'BMajor': {name: 'Си мажор', notes: generateGammaMajor(71 + offset * 12)},
        'BMinor': {name: 'Си минор', notes: generateGammaMinor(71 + offset * 12)},
    };

    const steps = {};

    Object.keys(gammas).forEach((key) => {
        const { name, notes } = gammas[key];
        const stepsName = `Ступени ${name}`;
        const stepNotes = getMainSteps(notes);

        steps[`${key}135`] = {
            name: stepsName,
            notes: stepNotes
        };
    });

    return { ...gammas, ...steps };
};

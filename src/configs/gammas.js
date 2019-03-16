const generateGamma = (mainNote, diffs) => {
    const result = [[mainNote]];
    diffs.forEach((v) => {
        const lastNote = result[result.length - 1][0];
        result.push([lastNote + v]);
    });

    return result;
};

const generateGammaMajor = (mainNote) => generateGamma(mainNote, [2, 2, 1, 2, 2, 2, 1]);
const generateGammaMinor = (mainNote) => generateGamma(mainNote, [2, 1, 2, 2, 1, 2, 2]);

export default (offset) => ({
    'CMajor': { name: 'До мажор', notes: generateGammaMajor(60 + offset * 12) },
    'CMinor': { name: 'До минор', notes: generateGammaMinor(60 + offset * 12) },
    'DbMajor': { name: 'Ре-бемоль мажор', notes: generateGammaMajor(61 + offset * 12) },
    'DbMinor': { name: 'Ре-бемоль минор', notes: generateGammaMinor(61 + offset * 12) },
    'DMajor': { name: 'Ре мажор', notes: generateGammaMajor(62 + offset * 12) },
    'DMinor': { name: 'Ре минор', notes: generateGammaMinor(62 + offset * 12) },
    'EbMajor': { name: 'Ми-бемоль мажор', notes: generateGammaMajor(63 + offset * 12) },
    'EbMinor': { name: 'Ми-бемоль минор', notes: generateGammaMinor(63 + offset * 12) },
    'EMajor': { name: 'Ми мажор', notes: generateGammaMajor(64 + offset * 12) },
    'EMinor': { name: 'Ми минор', notes: generateGammaMinor(64 + offset * 12) },
    'FMajor': { name: 'Фа мажор', notes: generateGammaMajor(65 + offset * 12) },
    'FMinor': { name: 'Фа минор', notes: generateGammaMinor(65 + offset * 12) },
    'FsMajor': { name: 'Фа-диез мажор', notes: generateGammaMajor(66 + offset * 12) },
    'FsMinor': { name: 'Фа-диез минор', notes: generateGammaMinor(66 + offset * 12) },
    'GMajor': { name: 'Соль мажор', notes: generateGammaMajor(67 + offset * 12) },
    'GMinor': { name: 'Соль минор', notes: generateGammaMinor(67 + offset * 12) },
    'AbMajor': { name: 'Ля-бемоль мажор', notes: generateGammaMajor(68 + offset * 12) },
    'AbMinor': { name: 'Ля-бемоль минор', notes: generateGammaMinor(68 + offset * 12) },
    'AMajor': { name: 'Ля мажор', notes: generateGammaMajor(69 + offset * 12) },
    'AMinor': { name: 'Ля минор', notes: generateGammaMinor(69 + offset * 12) },
    'BbMajor': { name: 'Си бемоль мажор', notes: generateGammaMajor(70 + offset * 12) },
    'BbMinor': { name: 'Си бемоль минор', notes: generateGammaMinor(70 + offset * 12) },
    'BMajor': { name: 'Си мажор', notes: generateGammaMajor(71 + offset * 12) },
    'BMinor': { name: 'Си минор', notes: generateGammaMinor(71 + offset * 12) },
})

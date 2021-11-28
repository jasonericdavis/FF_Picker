import {calculateTeamRank} from '../src/parseData';
test('calculateTeamRank', () => {
    const ignoreList = ['teamB']
    const stats = {
        'teamA' : {
            name: 'teamA',
            passingYards: 100
        },
        'teamB' : {
            name: 'teamB',
            passingYards: 0
        },
        'teamC': {
            name: 'teamC',
            passingYards: 50
        },
        'teamD' : {
            name: 'teamD',
            passingYards: 101
        }
    }

    const actual = calculateTeamRank(stats, 'passingYards', 'passingRank', ignoreList);
    expect(actual).toEqual({
        'teamA' : {
            name: 'teamA',
            passingYards: 100,
            passingRank: 2
        },
        'teamB' : {
            name: 'teamB',
            passingYards: 0,
            passingRank: 0
        },
        'teamC': {
            name: 'teamC',
            passingYards: 50,
            passingRank: 3
        },
        'teamD' : {
            name: 'teamD',
            passingYards: 101,
            passingRank: 1
    }})
});

test('calculateTeamRank_inverse', () => {
    const ignoreList = ['teamB']
    const stats = {
        'teamA' : {
            name: 'teamA',
            passingYards: 100
        },
        'teamB' : {
            name: 'teamB',
            passingYards: 0
        },
        'teamC': {
            name: 'teamC',
            passingYards: 50
        },
        'teamD' : {
            name: 'teamD',
            passingYards: 101
        }
    }

    const actual = calculateTeamRank(stats, 'passingYards', 'passingRank', ignoreList, true);
    expect(actual).toEqual({
        'teamA' : {
            name: 'teamA',
            passingYards: 100,
            passingRank: 2
        },
        'teamB' : {
            name: 'teamB',
            passingYards: 0,
            passingRank: 0
        },
        'teamC': {
            name: 'teamC',
            passingYards: 50,
            passingRank: 1
        },
        'teamD' : {
            name: 'teamD',
            passingYards: 101,
            passingRank: 3
    }})
});
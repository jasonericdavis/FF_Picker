import {createStatPointer} from '../src/util'

test('createStatPointer_Offense', () => {
    const statHeaders = 'Rk,Tm,G,PF,Yds,Ply,Y/P,TO,FL,1stD,Cmp,Att,Yds,TD,Int,NY/A,1stD,Att,Yds,TD,Y/A,1stD,Pen,Yds,1stPy,Sc%,TO%,EXP'
    const statPtr = createStatPointer(statHeaders.split(','));

    expect('Rk' in statPtr).toBe(true);
    expect('G' in statPtr).toBe(true);
    expect('PF' in statPtr).toBe(true);
    expect('Yds' in statPtr).toBe(true);
    expect('TO' in statPtr).toBe(true);
    expect('FL' in statPtr).toBe(true);
    expect('Att' in statPtr).toBe(true);
    expect('Int' in statPtr).toBe(true);
    expect('Yds_1' in statPtr).toBe(true);
    expect('TD' in statPtr).toBe(true);
    expect('Att_1' in statPtr).toBe(true);
    expect('Yds_2' in statPtr).toBe(true);
    expect('TD_1' in statPtr).toBe(true);
})

test('createStatPointer_Defense', () => {
    const statHeaders = 'Rk,Tm,G,PF,Yds,Ply,Y/P,TO,FL,1stD,Cmp,Att,Yds,TD,Int,NY/A,1stD,Att,Yds,TD,Y/A,1stD,Pen,Yds,1stPy,Sc%,TO%,EXP'
    const statPtr = createStatPointer(statHeaders.split(','));

    expect('Rk' in statPtr).toBe(true);
    expect('G' in statPtr).toBe(true);
    expect('PF' in statPtr).toBe(true);
    expect('Yds' in statPtr).toBe(true);
    expect('TO' in statPtr).toBe(true);
    expect('FL' in statPtr).toBe(true);
    expect('Att' in statPtr).toBe(true);
    expect('Int' in statPtr).toBe(true);
    expect('Yds_1' in statPtr).toBe(true);
    expect('TD' in statPtr).toBe(true);
    expect('Att_1' in statPtr).toBe(true);
    expect('Yds_2' in statPtr).toBe(true);
    expect('TD_1' in statPtr).toBe(true);
})
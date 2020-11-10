import {parseScheduledGamesData} from '../src/parseScheduledGamesData'


test('test-parse-scheduled-games-data', () => {
    const data = 
    `Week,Day,Date,Time,Winner/tie,,Loser/tie,,PtsW,PtsL,YdsW,TOW,YdsL,TOL
    1,Thu,September 10,8:20PM,Team1,,Team2,boxscore,34,20,369,0,360,1
    2,Sun,September 13,1:00PM,Team2,@,Team1,boxscore,34,30,372,0,388,0
    `

    const schedule = parseScheduledGamesData(data, '1')
    expect(schedule.length).toBe(1)
    expect(schedule[0].home).toBe('Team2')
    expect(schedule[0].away).toBe('Team1')
    expect(schedule[0].date).toBe('September 10')
    expect(schedule[0].kickoff).toBe('8:20PM')

    const schedule2 = parseScheduledGamesData(data, '2')
    expect(schedule2.length).toBe(1)
    expect(schedule2[0].home).toBe('Team1')
    expect(schedule2[0].away).toBe('Team2')
    expect(schedule2[0].date).toBe('September 13')
    expect(schedule2[0].kickoff).toBe('1:00PM')
})
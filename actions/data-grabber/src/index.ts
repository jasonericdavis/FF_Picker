
// @ts-nocheck
const puppeteer = require('puppeteer');
import fs from 'fs';
import path from 'path';
import  parsePlayerData from './parsePlayerData';
import parseOffensiveData from './parseOffensiveData';
import parseDefsiveData from './parseDefensiveData';
import getUnits from './getUnits';
import { getPreviousWeeksSchedule } from './getSchedule';
import parseGameData from './parseGameData';
import { uploadTeamsToSupabase, uploadPlayersToSupabase, uploadFileToStorage } from './uploadToSupabase';
import {teams as teamsCache} from './teams';

const cacheDir = path.join(__dirname, '../cache');
const baseUrl = 'https://www.pro-football-reference.com/years/2021/'

const downloadData = async (url:string, elementId:string) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);

    const data = await page.evaluate((elementId:string) => {
        console.log(`Inner Text is ${elementId}`)
        table2csv(elementId);
        return document?.getElementById(`csv_${elementId}`)?.innerText;
    }, elementId)

    await browser.close();
    return data;
}

/**
 * This method combines the offenses and defenses into an array
 * of objects that contain both the offense and defense for a particular team
 * @param {Dictionary[Offense]} offense a dictionary of the offenses
 * @param {Dictionary[Deffense]} defense a dictionary of the defenses
 * @returns {Dictionary[Team]} A dictionary with the respective teams
 */
 export const createTeams = (week: number, offenses:{[key:string]: Offense}, defenses:{[key:string]: Defense}):{[key:string]:Team} => {
    const offensesArray:Array<Offense> = Object.values(offenses)
    const teams = {}
    offensesArray.map((offense) => {
        const currentTeam = teamsCache.filter(team => team.name === offense.team)
        const teamId = currentTeam.length > 0 ? currentTeam[0].id : null;
        teams[offense.team] = {name: offense.team, teamId, week, offense, defense: defenses[offense.team]}
    })
    return teams
}

async function execute() {
    if (!fs.existsSync(cacheDir)){
        fs.mkdirSync(cacheDir);
    }

    const offensiveStats = await downloadData(
        `${baseUrl}#`, 'team_stats'
    );
    fs.writeFileSync(path.join(cacheDir, 'offensive-stats.csv'), offensiveStats);
    const offenses = parseOffensiveData(offensiveStats);

    const playerStats = await downloadData(
        `${baseUrl}fantasy.htm`, 'fantasy'
    );
    fs.writeFileSync(path.join(cacheDir,'player-stats.csv'), playerStats);
    const players = parsePlayerData(playerStats);
    uploadPlayersToSupabase(players);

    const defensiveStats = await downloadData(
        `${baseUrl}opp.htm`, 'team_stats'
    );
    fs.writeFileSync(path.join(cacheDir,'defensive-stats.csv'), defensiveStats);
    const defenses = parseDefsiveData(defensiveStats);

    //const units = getUnits(Object.values(offenses), Object.values(defenses), Object.values(players));
    //console.log(units)

    const scheduledGames = await getPreviousWeeksSchedule();
    const previousWeek = scheduledGames.length > 0 ? scheduledGames[0].week : 0;
    console.log(previousWeek);

    const teams = createTeams(previousWeek, offenses, defenses);
    uploadTeamsToSupabase(teams);
    fs.writeFileSync(path.join(cacheDir,'teams.json'), JSON.stringify(teams));
    console.log(teams)

    //console.log('Creating Game Data')
    //const games = parseGameData(scheduledGames, teams, players, units)
    //console.log(games)

    uploadFileToStorage(path.join(cacheDir, 'offensive-stats.csv'), previousWeek)
    uploadFileToStorage(path.join(cacheDir, 'defensive-stats.csv'), previousWeek)
    uploadFileToStorage(path.join(cacheDir, 'player-stats.csv'), previousWeek)
};

execute();


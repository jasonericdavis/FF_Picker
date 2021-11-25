// @ts-nocheck
const puppeteer = require('puppeteer');

const baseUrl = 'https://www.pro-football-reference.com/years/2021/'

async function downloadData(url:string, elementId:string){
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    console.log(`Downloading ${url}`)
    await page.goto(url);

    const data = await page.evaluate((elementId:string) => {
        table2csv(elementId);
        return document?.getElementById(`csv_${elementId}`)?.innerText;
    }, elementId)

    await browser.close();
    return data;
}

export default async function getStats() {
    const offensiveStats = await downloadData(
        `${baseUrl}#`, 'team_stats'
    );

    const defensiveStats = await downloadData(
        `${baseUrl}opp.htm`, 'team_stats'
    );

    const playerStats = await downloadData(
        `${baseUrl}fantasy.htm`, 'fantasy'
    );

    return {offensiveStats, defensiveStats, playerStats};

}
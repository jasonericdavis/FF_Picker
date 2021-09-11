const puppeteer = require('puppeteer');

const downloadData = async (url, elementId) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);

    const data = await page.evaluate(elementId => {
        console.log(`Inner Text is ${elementId}`)
        table2csv(elementId);
        return document.getElementById(`csv_${elementId}`).innerText;
    }, elementId)

    await browser.close();
    return data;
}

(async () => {
    const offensiveStats = await downloadData(
        'https://www.pro-football-reference.com/years/2020/#', 'team_stats'
    );

    const playerStats = await downloadData(
        'https://www.pro-football-reference.com/years/2020/fantasy.htm', 'fantasy'
    );

    const defensiveStats = await downloadData(
        'https://www.pro-football-reference.com/years/2020/opp.htm', 'team_stats'
    );
})();
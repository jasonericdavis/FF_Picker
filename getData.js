const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto('https://www.pro-football-reference.com/years/2020/#');

    const teamStats = await page.evaluate(() => {
        table2csv("team_stats");
        return document.getElementById('csv_team_stats').innerText;
    });       
    
    console.log(teamStats);
    await browser.close();
})();
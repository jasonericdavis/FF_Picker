import csv

nicknames = {
    '49ers' : 'SF',
    'Bills' : 'BUF',
    'Steelers': 'PIT',
    'Bears':'CHI',
    'Ravens': 'BAL',
    'Titans': 'TEN',
    'Chiefs': 'KC',
    'Packers': 'GB',
    'Vikings': 'MIN',
    'WAS Football Team': 'WAS',
    'Cardinals': 'ARI',
    'Buccaneers': 'TB',
    'Rams': 'LAR',
    'Cowboys': 'DAL',
    'Eagles': 'PHI',
    'Falcons': 'ATL',
    'Broncos': 'DEN',
    'Colts': 'IND',
    'Giants': 'NYG',
    'Jaguars': 'JAX',
    'Panthers': 'CAR',
    'Texans': 'HOU',
    'Lions': 'DET',
    'Dolphins': 'DET',
    'Jets': 'NYJ',
    'Chargers': 'LAC'
}

defenses = []
qbs = []
rbs = []
wrs = []
tes = []
matchups = []

with open("./DKw2Early.csv") as csv_file:
    csv_reader = csv.DictReader(csv_file)

    for row in csv_reader:
        player = dict(row)
        if(player['Position'] == 'DST'):
            o=['City'] = nicknames[player['Name'].rstrip()]
            defenses.append(player)

        
        if(player['Position'] == 'QB'):
            qbs.append(player)
        if(player['Position'] == 'RB'):
            rbs.append(player)
        if(player['Position'] == 'WR'):
            wrs.append(player)
        if(player['Position'] == 'TE'):
            tes.append(player)
    
    # print all of the list
    for defense in defenses:
        try:
            print(defense['City'] + ' ' + defense['Name'])
        except:
            print('Couldnt find it for: ' + defense['Name'])

    # for player in qbs:
    #     print(player['Name'])

    # for player in rbs:
    #     print(player['Name'])

    # for player in wrs:
    #     print(player['Name'])

    # for player in tes:
    #     print(player['Name'])
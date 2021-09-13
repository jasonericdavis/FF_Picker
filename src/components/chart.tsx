import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css';
export const Chart = ({team,maxes}) => {
    const teamData = [{data:{
        totalYards: team.totalYards/(maxes.totalYards*1.5),
        passingYards: team.passingYards/(maxes.passingYards*1.5),
        rushingYards: team.rushingYards/(maxes.rushingYards*1.5)
    },meta:{color:'blue'}},
    {data:{
        totalYards: (team.totalYards-team.totalYardsDiff)/(maxes.totalYards*1.5),
        passingYards: (team.passingYards-team.passingYardsDiff)/(maxes.passingYards*1.5),
        rushingYards: (team.rushingYards-team.rushingYardsDiff)/(maxes.rushingYards*1.5)
    },meta:{color:'gray'}}];
    const captions = {totalYards:'Yards',passingYards:'Passing',rushingYards:'Rushing'};
    return <>
            <RadarChart data={teamData} captions={captions} size={300} /> 
            <div>{team.name}</div>
        </>;
}
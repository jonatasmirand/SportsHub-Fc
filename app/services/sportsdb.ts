export async function getTeamByName(team:string) {
    const res = await fetch(
        `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${team}`
    );
    const data = await res.json();
    return data.teams?.[0] || null
}
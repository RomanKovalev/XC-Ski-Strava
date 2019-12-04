const totalStatsLoaded = (totalStats) => {
    return {
        type: 'TOTAL_STATS_LOADED',
        payload: totalStats
    }
}

export {
    totalStatsLoaded
}
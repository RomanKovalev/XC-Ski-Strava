export default class DataService {
    
    async getResource(url) {
        const res = await fetch(
            url,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                        'accept': 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript',
                        'x-requested-with': 'XMLHttpRequest'
                }
              })
        if (!res.ok) {
            throw new Error("Couldn't get data from api")
        }
        return await res.json()
    }
    
    getNordSkiActivities() {
        return this.getResource('https://www.strava.com/athlete/training_activities?activity_type=NordicSki')
    }
}

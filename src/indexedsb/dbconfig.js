export const DBConfig = {
    name: "SkiDB",
    version: 1,
    objectStoresMeta: [
        {
            store: 'activities',
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [
                { name: 'activity_url', keypath: 'activity_url', options: { unique: false } },
                { name: 'calories', keypath: 'calories', options: { unique: false } },
                { name: 'commute', keypath: 'commute', options: { unique: false } },
                { name: 'description', keypath: 'description', options: { unique: false } },
                { name: 'distance', keypath: 'distance', options: { unique: false } },
                { name: 'distance_raw', keypath: 'distance_raw', options: { unique: false } },
                { name: 'elapsed_time', keypath: 'elapsed_time', options: { unique: false } },
                { name: 'elapsed_time_raw', keypath: 'elapsed_time_raw', options: { unique: false } },
                { name: 'elevation_gain', keypath: 'elevation_gain', options: { unique: false } },
                { name: 'elevation_gain_raw', keypath: 'elevation_gain_raw', options: { unique: false } },
                { name: 'elevation_unit', keypath: 'elevation_unit', options: { unique: false } },
                { name: 'id', keypath: 'id', options: { unique: false } },
                { name: 'long_unit', keypath: 'long_unit', options: { unique: false } },
                { name: 'moving_time', keypath: 'email', options: { unique: false } },
                { name: 'moving_time_raw', keypath: 'moving_time_raw', options: { unique: false } },
                { name: 'name', keypath: 'name', options: { unique: false } },
                { name: 'short_unit', keypath: 'short_unit', options: { unique: false } },
                { name: 'start_date', keypath: 'start_date', options: { unique: false } },
                { name: 'start_date_local_raw', keypath: 'start_date_local_raw', options: { unique: false } },
                { name: 'start_day', keypath: 'start_day', options: { unique: false } },
                { name: 'start_time', keypath: 'start_time', options: { unique: false } },
                { name: 'type', keypath: 'type', options: { unique: false } },
                { name: 'sync_time', keypath: 'sync_time', options: { unique: false } }
            ]
        }
        // Resolve issue with creating 2 stores
        // ,
        // {
        //     store: 'utils',
        //     storeConfig: { keyPath: 'id', autoIncrement: true },
        //     storeSchema: [
        //         { name: 'sync_time', keypath: 'sync_time', options: { unique: false } }
        //     ]
        // }
    ]
};
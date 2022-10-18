export interface ICity {
	id: number;
	name: string;
}

export type ITag = {
	label: string,
	type?: string,
	onClick(): void;
}

export type IWeather = {
    coord?: {
        lon?: number,
        lat?: number
    },
    weather?: [
        {
            id?: number,
            main?: String,
            description?: String,
            icon?: String
        }
    ],
    base?: String,
    main?: {
        temp?: number,
        feels_like?: number,
        temp_min?: number,
        temp_max?: number,
        pressure?: number,
        humidity?: number,
        sea_level?: number,
        grnd_level?: number
    },
    visibility?: number,
    wind?: {
        speed?: number,
        deg?: number,
        gust?: number
    },
    clouds?: {
        all?: number
    },
    dt?: number,
    sys?: {
        country?: String,
        sunrise?: number,
        sunset?: number
    },
    timezone?: number,
    id?: number,
    name?: String,
    cod?: number
}
  
export type IForecast = {
    cod?: number,
    message?: number,
    cnt?: number,
    list?: [IForecastItem],
    city?: {
        id?: number,
        name?: String,
        coord?: {
            lat?: number,
            lon?: number
        },
        country?: String,
        population?: number,
        timezone?: number,
        sunrise?: number,
        sunset?: number
    }
}

export type IForecastItem = {
    dt?: number,
    main?: {
        temp?: number,
        feels_like?: number,
        temp_min?: number,
        temp_max?: number,
        pressure?: number,
        sea_level?: number,
        grnd_level?: number,
        humidity?: number,
        temp_kf?: number
    },
    weather?: [
        {
            id?: number,
            main?: String,
            description?: String,
            icon?: String
        }
    ],
    clouds?: {
        all?: number
    },
    wind?: {
        speed?: number,
        deg?: number,
        gust?: number
    },
    visibility?: number,
    pop?: number,
    sys?: {
        pod?: String
    },
    dt_txt?: String
}
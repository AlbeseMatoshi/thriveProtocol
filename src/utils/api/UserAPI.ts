import {baseAPI as API} from "../config/axios.ts";
import {makeUseAxios, UseAxiosResult} from 'axios-hooks'
import {UserData} from "./interfaces/UserData.ts";

const useAxios = makeUseAxios({
    axios: API,
})

const getAll = (pageNumber: number = 1, _limit: number, username?: string) => {
    const _start = (pageNumber - 1) * _limit;
    const queryParams: Record<string, string | number> = {
        _start,
        _limit,
    };
    if (username) {
        queryParams.username = username;
    }
    const queryString = Object.entries(queryParams)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');
    return useAxios(`/users?${queryString}`) as UseAxiosResult<Required<UserData>[]>;
}

export default {
    getAll
}
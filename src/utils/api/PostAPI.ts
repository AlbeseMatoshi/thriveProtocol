import {baseAPI as API} from "../config/axios.ts";
import {makeUseAxios, UseAxiosResult} from 'axios-hooks'
import {PostData} from "./interfaces/PostData.ts";

const useAxios = makeUseAxios({
    axios: API,
})

const getAll = (pageNumber: number = 1,_limit:number, title?:string) => {
    // the api uses _start and _limit for pagination
    const _start = (pageNumber - 1) * _limit;
    const queryParams: Record<string, string | number> = {
        _start,
        _limit,
    };
    // title is used for searching
    if (title) {
        queryParams.title = title;
    }
    const queryString = Object.entries(queryParams)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');
    return useAxios(`/posts?${queryString}`) as UseAxiosResult<Required<PostData>[]>;
}

export default {
    getAll
}
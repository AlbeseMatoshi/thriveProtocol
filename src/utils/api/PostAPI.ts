import {baseAPI as API} from "../config/axios.ts";
import {makeUseAxios, UseAxiosResult} from 'axios-hooks'
import {PostData} from "./interfaces/PostData.ts";

const useAxios = makeUseAxios({
    axios: API,
})

const getAll = (pageNumber: number = 1,title?:string) => {
    const queryParams: Record<number, string> = {pageNumber};
    if (title) {
        queryParams.title = title;
    }
    const queryString = Object.entries(queryParams)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');
    return useAxios(`/posts?${queryString}`) as UseAxiosResult<PostData>;
}

export default {
    getAll
}
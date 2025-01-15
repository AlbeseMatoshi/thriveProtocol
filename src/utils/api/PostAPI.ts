import {baseAPI as API} from "../config/axios.ts";
import {makeUseAxios, Options, UseAxiosResult} from 'axios-hooks'
import {PostData} from "./interfaces/PostData.ts";
import {AxiosPromise} from "axios";

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

const remove = (postId: number, options: Options = {}) => {
    return useAxios({
        url: `/posts/${postId}`,
        method: 'DELETE'
    }, options)
}

const update = (request: PostData) => {
    return API.put(`posts/${request.id}`, request) as AxiosPromise<Record<string,  never>>;
}


export default {
    getAll,
    remove,
    update
}
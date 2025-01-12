import {baseAPI as API} from "../config/axios.ts";
import {makeUseAxios, UseAxiosResult} from 'axios-hooks'
import {UserData} from "./interfaces/UserData.ts";

const useAxios = makeUseAxios({
    axios: API,
})

const getAll = (pageNumber: number = 1,userName?:string) => {
    const queryParams: Record<string, string> = {pageNumber,userName};
   const queryString = Object.entries(queryParams)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');
    return useAxios(`/users?${queryString}`) as UseAxiosResult<UserData>;
}

export default {
    getAll
}
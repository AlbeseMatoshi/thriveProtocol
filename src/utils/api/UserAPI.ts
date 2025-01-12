import {baseAPI as API} from "../config/axios.ts";
import {makeUseAxios, UseAxiosResult} from 'axios-hooks'
import {UserData} from "./interfaces/UserData.ts";

const useAxios = makeUseAxios({
    axios: API,
})

const getAll = () => {
    return useAxios('/users') as UseAxiosResult<UserData>
}


export default {
    getAll
}
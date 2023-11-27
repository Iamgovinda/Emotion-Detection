import { post } from "../API/axios";

export class UserService{
    static login(url, payload){
        return post(url, payload)
    }
    static register(url, payload){
        return post(url, payload)
    }
}
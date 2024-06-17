import expres  from "express";
import BaseUrl from "../controller";
import RegisterPost from "../auth/registrApi";
import AuthApi from "../auth/authApi";

const expressRout: expres.Router = expres.Router();

const baseUrl = new BaseUrl;
const registrPost = RegisterPost;
const authApi = AuthApi;

expressRout.get('/', baseUrl.get);
expressRout.post('/finde', baseUrl.finde);

expressRout.post('/post', registrPost);
expressRout.post('/auth', authApi);


export default expressRout


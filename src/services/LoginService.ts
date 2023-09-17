import {apiUrl, postJSONRequestInit, postRequestInit,} from "../utils/global_config";
import {ILogInForm, IMsg, ISignUpForm} from "../assets/Interface";
import {LoginFaultMsg} from "../assets/data/emptyData";

export const LoginService = async (
    username: string,
    password: string,
    callback: any
) => {
    let body: ILogInForm = {
        username: username,
        password: password,
    };
    let json = JSON.stringify(body);
    const url = apiUrl + "/login";
    await fetch(url, postJSONRequestInit(json))
        .then((response) => response.json())
        .then((data) => {
            callback(data);
        });
};

export const CheckSession = async (): Promise<IMsg> => {
    let username = localStorage.getItem("user");
    if (username === null) {
        return LoginFaultMsg;
    }
    const url = apiUrl + "/session/check";
    const response = await fetch(url, postRequestInit);
    if (!response.ok) return LoginFaultMsg;
    else return await response.json();
};

export const LogoutService = () => {
    const url = apiUrl + "/logout";
    localStorage.clear();
    return fetch(url, postRequestInit);
};

export const SignupService = async (
    username: string,
    email: string,
    password: string
): Promise<Response> => {
    const url = apiUrl + "/signup";
    const json: ISignUpForm = {
        username: username,
        email: email,
        password: password,
    };
    const body = JSON.stringify(json);
    return await fetch(url, postJSONRequestInit(body));
};

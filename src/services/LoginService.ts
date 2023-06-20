import {apiUrl, postJSONRequestInit, postRequestInit,} from "../utils/global_config";
import {LogInForm, Msg, SignUpForm} from "../assets/Interface";
import {LoginFaultMsg} from "../assets/data/emptyData";

export const LoginService = async (
    username: string,
    password: string,
    callback: any
) => {
    let body: LogInForm = {
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

export const CheckSession = async (): Promise<Msg> => {
    let username = localStorage.getItem("user");
    if (username === null) {
        return LoginFaultMsg;
    }
    const url = apiUrl + "/session/check";
    const response = await fetch(url, postRequestInit);
    if (!response.ok) return LoginFaultMsg;
    else return await response.json();
};

export const LogoutService = async () => {
    const url = apiUrl + "/logout";
    localStorage.clear();
    await fetch(url, postRequestInit);
};

export const SignupService = async (
    username: string,
    email: string,
    password: string
): Promise<Response> => {
    const url = apiUrl + "/signup";
    const json: SignUpForm = {
        username: username,
        email: email,
        password: password,
    };
    const body = JSON.stringify(json);
    return await fetch(url, postJSONRequestInit(body));
};

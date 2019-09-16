import { Injectable } from '@angular/core';
import { config } from '../../constants/config';

@Injectable()
export class LanguageService {
    language: languageFile.RootObject;
    currentLanguage: string;
    constructor() { }


    setLanguage(choice?: string) {
        choice = choice ? choice : localStorage.getItem('language') ? localStorage.getItem('language') : 'English';
        for (let language of config.LANGUAGES) {
            if (language.NAME === choice) {
                localStorage.setItem('language', choice);
                this.currentLanguage = choice;
                this.language = language.PATH;
                break;
            }
        }
    }
}

declare namespace languageFile {

    export interface LoginComponent {
        head: string;
        email: string;
        password: string;
        emailReq: string;
        passwordReq: string;
    }

    export interface NavbarComponent {
        profile: string;
        writeSomething: string;
        posts: string;
        logout: string;
        english: string;
        german: string;
        login: string;
        edit: string;
        languages: string;
        signup: string;
    }

    export interface CreatePostComponent {
        title: string;
        createPost: string;
        content: string;
    }

    export interface SignupComponent {
        signup: string;
        email: string;
        password: string;
        emailReq: string;
        passwordReq: string;
        iAgree: string;
        already: string;
        here: string;
        toLogin: string;
        or: string;
        terms: string;
        register: string;
    }

    export interface UserComponent {
        usrHead: string;
        postHead: string;
    }

    export interface RootObject {
    "loginComponent": {
        "login": string;
        "email": string;
        "password": string;
        "emailReq": string;
        "passwordReq": string;
        "logIn": string;
        "notReg": string;
        "here": string;
        "toRegister": string;
        "or": string;
        "terms": string;
        "lost": string;
    };
    "navbarComponent": {
        "profile": string;
        "writeSomething": string;
        "posts": string;
        "logout": string;
        "signup": string;
        "english": string;
        "german": string;
        "login": string;
        "edit": string;
        "languages": string;
    };
    "createPostComponent": {
        "title": string;
        "createPost": string;
        "create": string;
        "update": string;
        "summary": string;
        "tag": string;
    };
    "signupComponent": {
        "signup": string;
        "email": string;
        "password": string;
        "emailReq": string;
        "passwordReq": string;
        "iAgree": string;
        "already": string;
        "here": string;
        "toLogin": string;
        "or": string;
        "terms": string;
        "register": string;
    };
    "userComponent": {
        "homepage": string;
        "country": string;
        "connect": string;
        "disconnect": string;
    };
    "lostComponent": {
        "passwordReset": string;
        "aLink": string;
        "resetPassword": string;
    };
    "profileComponent": {
        "posts": string;
        "noContent": string;
    };
    "articleComponent": {
        "aboutAuthor": string;
        "authRelated": string;
        "leaveComment": string;
        "comment": string;
        "comments": string;
        "delete": string;
        "edit": string;
    };
    "cardComponent": {
        "delete": string;
        "edit": string;
    };
    "commentComponent": {
        "reply": string;
        "cancel": string;
    };
    "confirmComponent": {
        "yes": string;
        "no": string;
        "sure": string;
    };
    "editComponent": {
        "changePassword": string;
        "confirm": string;
        "delete": string;
        "editUser": string;
    };
    "feedComponent": {
        "posts": string;
    };
    "termsComponent": {
        "terms": string;
        "content": string;
    };
    "userwaysComponent": {
        "name": string;
        "email": string;
    };
    "votingComponent": {
        "points": string;
    };
    "changePasswordComponent": {
        "changePassword": string;
        "wrong": string;
    };
    "relatedComponent": {
        "noRelated": string;
    };
}

}
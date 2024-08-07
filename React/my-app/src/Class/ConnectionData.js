import React,{Component} from "react";

export class ConnectionData {
    constructor(url, method,data) {
        this.urlServeur = url;
        this.method = method;
        this.data = data;
    }
}
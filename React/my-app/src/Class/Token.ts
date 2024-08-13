import { To } from "react-router-dom";

export class Token {

    private static _tokenSingleton : Token;
    private tokenValue : string ;
    private tokenDuration : number;
    private endHandler;
    private interval;
    private constructor(){
        this.tokenValue = "NoToken";
        this.tokenDuration =-1;
    }

    public static getSingleton():Token { 
        if(this._tokenSingleton) {
            return this._tokenSingleton;
            
        } else {
            this._tokenSingleton = new Token();
            return this._tokenSingleton;
        }
    }
    public getHandler() {
        return this.endHandler;
    }

    public setHandler(handler) {
        this.endHandler = handler;
    }

    public setValue(value : string) :void {
        this.tokenValue = value;
    }

    public setDuration(duration : number): void {
        this.tokenDuration = duration;
        
    }

    public get value() : string {
        return this.tokenValue;
    }

    public get duration() :number{
        return this.tokenDuration;
    }

    public beginTimer(endHandler) {
        let duration = this.tokenDuration;
        this.endHandler = endHandler;
        if(duration >=1) {
            this.interval = setInterval(()=>{
                duration = duration -1000;
                this.tokenDuration = duration;
                localStorage.setItem("bearerDuration",""+duration);
                this.verifyEnd();
                            },1000);
        }
        
        
    }
    private verifyEnd() {
        if(this.tokenDuration <= 0) {
            localStorage.removeItem("bearer");
            localStorage.removeItem("bearerDuration");
            clearInterval(this.interval);
            this.tokenDuration = -1;
            
            this.endHandler();
        }
    }


}
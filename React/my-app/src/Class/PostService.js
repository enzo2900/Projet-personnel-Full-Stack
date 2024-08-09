import { makeServerCall } from "./ApiManager";
import { ConnectionData } from "./ConnectionData";

export function getPosts(dataHandler) {
    const datas = new ConnectionData("/post/get","GET");
    makeServerCall(datas,(data)=>dataHandler(data));
}
export function getPostCommentary(id,dataHandler) {

    const datas = new ConnectionData("/Post/getCommentary","POST",JSON.stringify(id));
    makeServerCall(datas,(data) =>dataHandler(data));
}
export type RequestHandler = {
    handler:(e?: RequestEvent) => void,
    onError?:() => void
};

export default class RequestPool<H extends RequestHandler, E extends RequestEvent>{
    private pool:Record<string, H> = {};
    public setEventListener(id: string, handler?: H){
        if(this.pool[id] && this.pool[id].onError!=undefined)
            (<() => void>this.pool[id].onError)();
        if(handler) this.pool[id] = handler;
        else delete this.pool[id];
    }
    public trigger(e?: E){
        for(const request in this.pool) this.pool[request].handler(e);
        this.pool = {};
    }
}

export interface RequestEvent{

};

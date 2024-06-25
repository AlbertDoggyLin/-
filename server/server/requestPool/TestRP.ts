import RequestPool, { RequestHandler } from "./RequestPool";

export class testRP{
    private constructor(){};
    private static instance: testRP = new testRP();
    public static getInstance(){ return testRP.instance; }
    private rp = new RequestPool();
    public async set(id:string, handler: RequestHandler){
        console.log('check')
        this.rp.setEventListener(id, handler);
        const waiter = new Promise((res, rej)=>{
            setTimeout(()=>{res('');}, 10000);
        })
        await waiter;
        this.rp.trigger();
    }
}
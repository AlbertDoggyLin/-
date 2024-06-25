import { testRP } from '~/server/requestPool/TestRP';

export default defineEventHandler(async (event) => {
    console.log('check')

    const waiter = new Promise((resolve, reject)=>{
        testRP.getInstance().set(event.toString(), {
          handler: () => { resolve('resolve event'+event.toString()); },
          onError: () => { reject(event + ' get replaced'); }
        });
    })

    waiter;
    return {
      hello: 'world'
    }
  })
  
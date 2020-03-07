import log from '../log'
import CONSTANTS from '../constants'

async function delayTask(id:number, delayTimeInMills: number) : Promise<string>  {

    let result = CONSTANTS.UNKNOWN.toString()
    log.info('starting delay task with id: '+id)
    return new Promise((resolve) => {
        setTimeout(()=>{
            result = '' + Math.round(Math.random() * 10000000)
            resolve(result)
        }, delayTimeInMills);        
    })

}

export default delayTask


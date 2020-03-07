import log from '../log'
import CONSTANTS from '../constants'

export default function delayTask(id:number, delayTimeInMills: number)  {

    let result = CONSTANTS.UNKNOWN.toString()
    log.info('starting delay task with id: '+id)
    return new Promise((resolve) => {
        setTimeout(()=>{
            result = '' + Math.round(Math.random() * 10000000)
            resolve(result)
        }, delayTimeInMills);        
    })

}

import "core-js/stable";
import "regenerator-runtime/runtime";
import { expose } from "threads/worker"
import {TaskInterface, DelayTaskConfig} from '../taskInterfaces'
import CONSTANTS from '../constants'
import delayTask from './delayTask'
import log from '../log'

/**
 * Worker thread
 * @param task 
 * @param id 
 */
 function runTask(task: TaskInterface, id: number) : Promise<string>{

    return new Promise((resolve, reject) => {
        let result = CONSTANTS.SKIPPED.toString()
        if(!task) {
            log.error('Invalid arguments ')
            reject(result)        
        }
        log.info('runtask started: ' + task.type )
    
        /**
         * Determine what type of task is executing
         */
        if(task.type === 'delay') {
            delayTask(id, (task.config as DelayTaskConfig).delayMilliSeconds)
            .then(res => {
                resolve(res)
            }).catch(err => {
                log.error(err, 'failed executing '+id)
                reject(result)      
            })
          } else {
            log.info(' result is ' + result)   
            resolve(result)
          }
    })
 
}

expose(runTask)

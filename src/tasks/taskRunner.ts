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
async function runTask(task: TaskInterface, id: number) : Promise<string>{
    let result = CONSTANTS.SKIPPED.toString()
    if(!task) {
        log.error('Invalid arguments ')
        return new Promise((reject) => reject(result))        
    }
    log.info('runtask started')

    /**
     * Determine what type of task is executing
     */
    if(task.type === 'delay') {
        try {
            result = await delayTask(id, (task.config as DelayTaskConfig).delayMilliSeconds)
        } catch(err) {
            log.error('failed executing '+id)
            return new Promise((reject) => reject(result))
        }
        
      }
      log.info(' result is ' + result)   
      return new Promise((resolve) => resolve(result))
}

expose(runTask)

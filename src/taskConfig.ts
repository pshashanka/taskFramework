const fs = require('fs')
import CONSTANTS from './constants'
import log from './log'
import {TaskInterface} from './taskInterfaces'

export default class TaskConfig {

  private jsonConfig : any

  constructor(){
  }

  checkJSONConfig() {
    if(!this.jsonConfig) {
      throw new Error('JSON config not available')
    }
  }
  
  
  getMaxParallelTasks() : number{
    this.checkJSONConfig()
    return this.jsonConfig.maxParallel
  }

  /**
   * Returns result file name
   */
  getTaskResultsFile() : string{
    this.checkJSONConfig()
    return this.jsonConfig.taskResultsFile    
  }

  /**
   * Returns all the available Tasks
   */
  getTasks() : Array<TaskInterface>{
    this.checkJSONConfig()
    return this.jsonConfig.tasks    
  }  

  /**
   * Reads tasks config file to JSON
   */
  readConfigFile() : boolean {
    log.info('read config file '+ CONSTANTS.CONFIG_FILE)
    try {
      const data = fs.readFileSync(CONSTANTS.CONFIG_FILE, { encoding: 'utf-8'});
      log.info('success reading config file')
      this.jsonConfig = JSON.parse(data)
      return true
    } catch(error) {
      log.error(' Error reading file ', error)
      return false
    }
  }


  writeStatus(status: Map<number, TaskInterface>) {
    interface ObjOutInterface {
      id?: number
      type: string
      result?: string
    }

    let arr:Array<ObjOutInterface> = []
    for(let [id,task] of status) {
      arr.push({
        id,
        type: task.type,
        result: task.result
      })
    }
    const resultsFile = this.getTaskResultsFile()
    log.info('writing to task status file '+ resultsFile)
    try {
      fs.writeFileSync(resultsFile, JSON.stringify(arr))
      log.info('success writing to status file')
    } catch(error) {
      log.error(' Error writing to status file ', error)
      return false
    }    
  }
}
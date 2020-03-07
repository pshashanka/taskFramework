import { spawn, Pool, Worker } from "threads"
import log from './log'
import TaskConfig from './taskConfig'
import "core-js/stable";
import "regenerator-runtime/runtime";

export default class Main {

  private taskConfig : TaskConfig;

  constructor() {
   this.taskConfig = new TaskConfig()
   this.init()
  }

  private init(){
    log.info('initializing...');
    if(this.taskConfig.readConfigFile()) {
      this.run()
    }
  }
  
  
  private async run(){
    const taskStatus = new Map()
    log.info('running tasks');
    const tasks = this.taskConfig.getTasks()
    const pool = Pool(() => spawn(new Worker("./tasks/taskRunner"), {timeout: 20000}), {concurrency: this.taskConfig.getMaxParallelTasks()})
    for(let i=0; i < tasks.length; i++) {
        pool.queue(async worker => {
          const task = tasks[i]
          const id = task.id || i
          const res = await worker(task, id)
          task.result = res;
          taskStatus.set(id, task)
        })        
    }   
    await pool.completed()
    await pool.terminate() 
    this.taskConfig.writeStatus(taskStatus)
  }
}
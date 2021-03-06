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

  private spawnWorkerFn() {
    return spawn(new Worker("./tasks/taskRunner"), {timeout: 20000})
  }
  
  private async workerExec(worker, task, id, taskStatus) {
      const res = await worker(task, id)
      task.result = res;
      taskStatus.set(id, task)
  }
  
  private async run(){
    const taskStatus = new Map()
    
    const tasks = this.taskConfig.getTasks();
    log.info('running tasks '+tasks.length);
    const poolOptions = {concurrency: this.taskConfig.getMaxParallelTasks()};
    const pool = Pool(this.spawnWorkerFn, poolOptions);
    for(let i=0; i < tasks.length; i++) {
        pool.queue(async worker => {
         await this.workerExec(worker,tasks[i], tasks[i].id || i, taskStatus)
        })        
    }   
    try{
      await pool.settled()
      await pool.terminate() 
    } catch(err){
      log.error(err)
    } finally {
      this.taskConfig.writeStatus(taskStatus)
    }

    
  }
}
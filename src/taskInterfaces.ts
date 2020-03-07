
export enum STATUS{
    NOT_STARTED,
    RUNNING,
    DONE,
    ERROR
}

export interface DelayTaskConfig {
    delayMilliSeconds: number
}

export interface CopyTaskConfig {
    localFile: string
    remoteFile: string
}


export interface TaskInterface {
    id?: number
    type: string
    config: DelayTaskConfig | CopyTaskConfig
    result?: string
}

export interface TaskResultInterface {
    getStatus(): STATUS
    getResult(): string
}

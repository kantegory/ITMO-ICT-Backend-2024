// import { Script } from 'modelSchemas'

import * as CommandService from 'services/commands'
import { exhaustivenessCheck } from 'utils/exhaustivenessCheck'

import { Script as ScriptModel } from '@prisma/client'
import { CronJob } from 'cron'

type ScriptJob = {
  cron: CronJob
} & Script

type Script = {
  id: number
  userId: number
  conditionDeviceId: number | null
  conditionParams: ScriptCondition
  commandDeviceId: number
  baseCommandId: number
  commandParams: {
    args: Array<number | string>
  }
}

type ScriptCondition =
  | {
      type: 'Value'
      name: string
      value: number
    }
  | {
      type: 'Time'
      interval: number
    }

const fromScriptModel = (script: ScriptModel): Script => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return script as Script
}

class ScriptsExecutor {
  private scriptJobs = new Map<number, ScriptJob>()

  constructor() {}

  public addScripts(scripts: ScriptModel[]) {
    scripts.forEach((scriptModel) => {
      const script = fromScriptModel(scriptModel)
      switch (script.conditionParams.type) {
        case 'Time': {
          if (!script.conditionDeviceId) {
            break
          }

          const cron = new CronJob(
            `*/${script.conditionParams.interval} * * * * *`,
            function (this) {
              CommandService.executeCommand(
                {
                  status: '',
                  baseCommandId: script.baseCommandId,
                  deviceId: script.commandDeviceId,
                  params: script.commandParams,
                },
                script.userId,
              )
            },
            null,
            true,
          )

          this.scriptJobs.set(script.id, {
            ...script,
            cron,
          })
          break
        }

        case 'Value': {
          break
        }

        default:
          exhaustivenessCheck(script.conditionParams)
      }
    })
  }

  public destory() {
    this.scriptJobs.forEach(({ cron }) => cron.stop())
    this.scriptJobs.clear()
  }
}

export const scriptsExecutor = new ScriptsExecutor()

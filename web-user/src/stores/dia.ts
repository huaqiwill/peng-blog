import { defineStore } from 'pinia'
import { AuroraDia, DiaConfig } from '@/utils/aurora-dia'

export const useDiaStore = defineStore('diaStore', {
  state: () => {
    return {
      // 机器人
      dia: new AuroraDia(),
      // 机器人状态
      aurora_bot: {
        // 是否启用
        enable: true,
        // 语言
        locale: 'cn',
        // 机器人类型
        bot_type: 'dia'
      }
    }
  },
  actions: {
    // 初始化机器人
    initializeBot(configs: DiaConfig): void {
      this.dia.installSoftware(configs)
      this.dia.on()
    }
  }
})

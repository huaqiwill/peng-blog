import { defineStore } from 'pinia'

export const useDropdownStore = defineStore('dropdownStore', {
  state: () => {
    return {
      //
      commandName: '',
      // 用户ID
      uid: 0
    }
  },
  actions: {
    //
    setCommand(name: string): void {
      this.commandName = name
    },
    // 设置uid
    setUid(): number {
      this.uid = Date.now()
      return this.uid
    }
  }
})

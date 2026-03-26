import { Store, defineStore } from "pinia";



type TForceState = {
  /** 画布强制Refresh适应度 */
  zoomScreenChange: number | null
  /** 强制RefreshAction框 */
  updateRect: number | null
  /** 强制SettingsSelectElements */
  updateSelect: number | null
}

type TForceAction = {
  setZoomScreenChange: () => void
  setUpdateRect: () => void
  setUpdateSelect: () => void
}

const ForceStore = defineStore<"forceStore", TForceState, {}, TForceAction>("forceStore", {
  state: () => ({
    zoomScreenChange: null, // 画布强制Refresh适应度
    updateRect: null, // 强制RefreshAction框
    updateSelect: null, // 强制SettingsSelectElements
  }),

  actions: {
    setZoomScreenChange() {
      // Canvas Size适应度强制Refresh
      this.zoomScreenChange = Math.random()
    },
    setUpdateRect() {
      // 强制RefreshAction框
      this.updateRect = Math.random()
    },
    setUpdateSelect() {
      // 强制触发ElementsSelect
      this.updateSelect = Math.random()
    },
  }
})

export type TForceStore = Store<"forceStore", TForceState, {}, TForceAction>

export default ForceStore


/*
 * @Author: Jeremy Yu
 * @Date: 2024-03-18 21:00:00
 * @Description:
 * @LastEditors: ShawnPhang <https://m.palxp.cn>
 * @LastEditTime: 2024-08-12 09:27:45
 */

import { useHistoryStore } from "@/store";
import { Store, defineStore } from "pinia";

type TControlState = {
  /** 是否正在移动Components */
  dMoving: boolean 
  /** 是否正在抓取Components */
  dDraging: boolean
  /** 是否正在调整ComponentsWH */
  dResizeing: boolean
  /** 是否Show参考线 */
  dShowRefLine: boolean
  /** 全局控制Select框的Show */
  showMoveable: boolean
  /** 是否Showmoveable的Rotation按钮 */
  showRotatable: boolean
  /** 记录是否按下alt键 / 或ctrl */
  dAltDown: boolean
  // 是否按下空格键
  dSpaceDown: boolean
  /** 正在编辑orCrop的Componentsid */
  dCropUuid: string
}

type TControlAction = {
  setdMoving: (isMoving: boolean) => void
  setDraging: (isDraging: boolean) => void
  setdResizeing: (isResizing: boolean) => void
  showRefLine: (isRefLine: boolean) => void
  setShowMoveable: (isShowMoveable: boolean) => void
  setShowRotatable: (isShowRotatable: boolean) => void
  updateAltDown: (isPressAltDown: boolean) => void
  /** Components调整结束 */
  stopDResize: () => void
  /** Components移动结束 */
  stopDMove: () => void
  /** Settings正在Cropor编辑的Components */
  setCropUuid: (uuid: string) => void
  setSpaceDown: (uuid: boolean) => void // Settings是否按下空格键
}

/** 全局控制配置 */
const ControlStore =  defineStore<"controlStore", TControlState, {}, TControlAction>("controlStore", {
  state: () => ({
    dMoving: false, // 是否正在移动Components
    dDraging: false, // 是否正在抓取Components
    dResizeing: false, // 是否正在调整ComponentsWH
    dShowRefLine: true, // 是否Show参考线
    showMoveable: false, // 全局控制Select框的Show
    showRotatable: true, // 是否Showmoveable的Rotation按钮
    dAltDown: false, // 记录是否按下alt键 / 或ctrl
    dCropUuid: '-1', // 正在编辑orCrop的Componentsid
    dSpaceDown: false, // 记录是否按下空格键
  }),
  getters: {},
  actions: {
    setdMoving(bool: boolean) {
      this.dMoving = bool
    },
    setDraging(drag: boolean) {
      this.dDraging = drag
    },
    setdResizeing(bool: boolean) {
      this.dResizeing = bool
    },
    showRefLine(show: boolean) {
      this.dShowRefLine = show
    },
    setShowMoveable(show: boolean) {
      this.showMoveable = show
      // if (!show) {
      //   // TODO: 失焦时Settings面板也失去关联，但会导致某些失焦状态出错(如Crop)
      //   state.dActiveElement = state.dPage
      // }
    },
    setShowRotatable(e: boolean) {
      this.showRotatable = e
    },
    /** TODO GroupAction */
    updateAltDown(e: boolean) {
      this.dAltDown = e
      console.log('控制Group按键, Group功能为: realCombined')
    },
    /** Components调整结束 */
    stopDResize() {
      // if (this.dResizeing) {
      //   // store.dispatch('pushHistory', 'stopDResize')
      // }
      this.dResizeing = false
    },
    /** Components移动结束 */
    stopDMove() {
      // if (this.dMoving) {
      //   const historyStore = useHistoryStore()
      //   historyStore.pushHistory("stopDMove")
      //   // store.dispatch('pushHistory', 'stopDMove')
      // }
      this.dMoving = false
    },
    setCropUuid(uuid: string) {
      // Settings正在Cropor编辑的Components
      this.dCropUuid = uuid
    },
    setSpaceDown(val: boolean) {
      this.dSpaceDown = val
    }
  }
})

export type TControlStore = Store<"controlStore", TControlState, {}, TControlAction>

export default ControlStore

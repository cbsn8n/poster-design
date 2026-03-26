/*
 * @Author: ShawnPhang <https://m.palxp.cn>
 * @Date: 2024-04-05 06:23:23
 * @Description:  
 * @LastEditors: Jeremy Yu <https://github.com/JeremyYu-cn>
 * @LastEditTime: 2024-09-25 00:39:00
 */
export type TScreeData = {
  /** 记录编辑界面的W度 */
  width: number
  /** 记录编辑界面的H度 */
  height: number
}

export type TGuidelinesData = {
  verticalGuidelines: number[]
  horizontalGuidelines: number[]
}

export type TCanvasState = {
  /** 画布Zoom百分比 */
  dZoom: number
  /** 画布默认预留边距 */
  dPresetPadding: number,
  /** 画布底部工具栏H度 */
  dBottomHeight: number,
  /** 画布垂直居中修正值 */
  dPaddingTop: number
  /** 编辑界面 */
  dScreen: TScreeData
  /** Ruler辅助线 */
  guidelines: TGuidelinesData
  /** 页面数据 */
  dPage: TPageState
  /** Current Page下标 */
  dCurrentPage: number
}

export type TStoreAction = {
  /** 更新画布Zoom百分比 */
  updateZoom: (zoom: number) => void
  /** 更新画布垂直居中修正值 */
  updatePaddingTop: (num: number) => void
  /** 更新编辑界面的WH */
  updateScreen: (data: TScreeData) => void
  /** 修改Ruler线 */
  updateGuidelines: (lines: TGuidelinesData) => void
  /** 强制重绘画布 */
  reChangeCanvas: () => void
  /** 更新Page数据 */
  updatePageData<T extends keyof TPageState>(data: {
    key: T
    value: TPageState[T]
    // pushHistory?: boolean
  }): void
  getDPage(data: TPageState): TPageState
  /** SettingsdPage */
  setDPage(data: TPageState): void
  /** 更新 Page（从layouts获取）*/
  updateDPage(): void
  /** Settings底部工具栏H度 */
  setBottomHeight(h: number): void
  /** 更新Current Page下标 */
  setDCurrentPage(n: number): void
}

export type TPageState = {
  name: string
  type: string
  uuid: string
  left: number
  top: number
  /** 画布W度 */
  width: number
  /** 画布H度 */
  height: number
  /** 画布BackgroundColor */
  backgroundColor: string
  /** 画布BackgroundColor(兼容Gradient) */
  backgroundGradient: string,
  /** 画布BackgroundImage */
  backgroundImage: string
  backgroundTransform: {
    x?: number
    y?: number
  }
  /** Opacity */
  opacity: number
  /** 强制Refresh用 */
  tag: number
}


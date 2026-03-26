/*
 * @Author: Jeremy Yu
 * @Date: 2024-03-28 14:00:00
 * @Description:
 * @LastEditors: Jeremy Yu <https://github.com/JeremyYu-cn>
 * @LastEditTime: 2024-03-28 14:00:00
 */

import { useForceStore } from "@/store"
import { TWidgetStore, TdWidgetData } from ".."

export type TupdateLayerIndexData = {
  uuid: string
  value: number
  isGroup?: boolean
}

export function updateLayerIndex(store: TWidgetStore, { uuid, value, isGroup }: TupdateLayerIndexData) {
  const widgets = store.dWidgets
  const widget = widgets.find((item) => item.uuid === uuid)
  const index = widgets.findIndex((item) => item.uuid === uuid)
  let group: TdWidgetData[] = []

  if (!widget) return

  if (isGroup) {
    // GroupComponents移动
    group = widgets.filter((item) => item.parent === uuid)
    for (let i = 0; i < group.length; ++i) {
      const pos = widgets.findIndex((item) => item.uuid === group[i].uuid)
      widgets.splice(pos, 1)
    }
  }

  // 单个Components移动，Group的把容器内的Components取出来后也相当于是移动单个Components
  let next = index + value
  let move = false
  const maxLen = widgets.length
  let gCount = 1 // 记录跳过的Group数量
  // 循环找出要目标Position并移动（因为存在Group，所以不能直接移动到下一个Position）
  while (next >= 0 && next < maxLen) {
    const nextWidget = widgets[next]
    if (widget.parent !== '-1') {
      // 如果是在容器里面，比较简单，只要目标Components的父容器一样就移动，不一样说明出了容器了就不移动
      if (nextWidget.parent === widget.parent) {
        widgets.splice(index, 1)
        widgets.splice(next, 0, widget)
        move = true
      }
      break
      // 如果父容器一样并且（目标Components不是容器或者先上移动并且目标Components是容器），则是要移动的Position
    } else if (nextWidget.parent === '-1') {
      if ((gCount === 0 && nextWidget.isContainer) || !nextWidget.isContainer || (value < 0 && nextWidget.isContainer)) {
        if (gCount === 0 && value > 0) {
          next -= value
        }
        widgets.splice(index, 1)
        widgets.splice(next, 0, widget)
        move = true
        break
      } else if (nextWidget.isContainer) {
        gCount = 0
      }
    }
    next += value
  }
  next -= value
  if (!move && next !== index) {
    widgets.splice(index, 1)
    widgets.splice(next, 0, widget)
  }

  // 如果是Group，要把里面的Components添加回去
  if (isGroup) {
    const pos = widgets.findIndex((item) => item.uuid === uuid)
    for (let i = group.length - 1; i >= 0; --i) {
      widgets.splice(pos + 1, 0, group[i])
    }
  }
}

// TODO: Ungroup
export function ungroup(store: TWidgetStore, uuid: string) {
  const forceStore = useForceStore()

  const widgets = store.dWidgets
  const index = widgets.findIndex((item) => item.uuid === uuid)
  widgets.splice(index, 1)
  const len = widgets.length

  for (let i = 0; i < len; ++i) {
    if (widgets[i].parent === uuid) {
      widgets[i].parent = '-1'
      // store.state.dAltDown = true
      // store.dispatch('selectWidgetsInOut', { uuid: widgets[i].uuid })
      store.dSelectWidgets.push(widgets[i])
    }
  }
  // store.state.dAltDown = false
  
  forceStore.setUpdateSelect()
  // store.commit('updateSelect')
  // store.state.dActiveElement = store.state.dPage
}

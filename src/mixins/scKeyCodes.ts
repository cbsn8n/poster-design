/*
 * @Author: ShawnPhang
 * @Date: 2024-04-04 00:36:13
 * @Description: Shortcuts支持列表
 * @LastEditors: ShawnPhang <https://m.palxp.cn>
 * @LastEditTime: 2024-04-11 15:05:41
 */
const ctrlKey = isMacOS() ? `⌘` : `Ctrl`
function isMacOS() {
  return navigator.userAgent.includes(`Macintosh`) || navigator.userAgent.includes(`Mac OS X`)
}

export default [
  {
    feat: `Drag Canvas`,
    info: `Space + Mouse Drag`,
  },
  {
    feat: `Zoom Out`,
    info: `${ctrlKey} - / ${ctrlKey} + Scroll`,
  },
  {
    feat: `Zoom In`,
    info: `${ctrlKey} + / ${ctrlKey} + Scroll`,
  },
  {
    feat: `Save`,
    info: `${ctrlKey} + S`,
  },
  {
    feat: `Undo`,
    info: `${ctrlKey} + Z`,
  },
  {
    feat: `Redo`,
    info: `${ctrlKey} + Shift + Z`,
  },
  {
    feat: `Copy`,
    info: `${ctrlKey} + C`,
  },
  {
    feat: `Paste`,
    info: `${ctrlKey} + V`,
  },
  {
    feat: `Delete`,
    info: `Delete / Backspace`,
  },
  {
    feat: `Move Element`,
    info: `← ↑ → ↓`,
  },
  {
    feat: `Fast Move`,
    info: `Shift + ← ↑ → ↓`,
  },
  {
    feat: `Multi-select`,
    info: `${ctrlKey} / Shift + Click`,
  },
  {
    feat: `Group`,
    info: `${ctrlKey} + G`,
  },
  {
    feat: `Deselect`,
    info: `ESC`,
  },
]

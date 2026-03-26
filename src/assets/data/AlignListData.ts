/*
 * @Author: ShawnPhang
 * @Date: 2022-02-12 11:08:57
 * @Description:
 * @LastEditors: ShawnPhang <https://m.palxp.cn>, Jeremy Yu <https://github.com/JeremyYu-cn>
 * @LastEditTime: 2024-03-01 20:55:51
 */

export type AlignListData = {
  key: string
  icon: string
  tip: string
  value: string
}

export default [
  {
    key: 'align',
    icon: 'icon-align-left',
    tip: 'Align Left',
    value: 'left',
  },
  {
    key: 'align',
    icon: 'icon-align-center-horiz',
    tip: 'Horizontal Center',
    value: 'ch',
  },
  {
    key: 'align',
    icon: 'icon-align-right',
    tip: 'Align Right',
    value: 'right',
  },
  {
    key: 'align',
    icon: 'icon-align-top',
    tip: 'Align Top',
    value: 'top',
  },
  {
    key: 'align',
    icon: 'icon-align-center-verti',
    tip: 'Vertical Center',
    value: 'cv',
  },
  {
    key: 'align',
    icon: 'icon-align-bottom',
    tip: 'Align Bottom',
    value: 'bottom',
  },
] as AlignListData[]

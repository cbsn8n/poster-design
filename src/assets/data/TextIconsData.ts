/*
 * @Author: ShawnPhang
 * @Date: 2021-08-02 18:27:27
 * @Description:
 * @LastEditors: ShawnPhang <https://m.palxp.cn>
 * @LastEditTime: 2024-11-14 16:41:19
 */

import { AlignListData } from "./AlignListData"

export type TStyleIconData = {
  key: string
  icon: string
  tip: string
  value: string[]
  select: boolean
  extraIcon?: boolean,
}

export const styleIconList1 = [
  {
    key: 'fontWeight',
    icon: 'icon-bold',
    tip: 'Bold',
    value: ['normal', 'bold'],
    select: false,
  },
  {
    key: 'fontStyle',
    icon: 'icon-italic',
    tip: 'Italic',
    value: ['normal', 'italic'],
    select: false,
  },
  {
    key: 'textDecoration',
    icon: 'icon-underline',
    tip: 'Underline',
    value: ['none', 'underline'],
    select: false,
  },
  {
    key: 'textDecoration',
    icon: 'icon-strikethrough',
    tip: 'Strikethrough',
    value: ['none', 'line-through'],
    select: false,
  },
  {
    key: 'writingMode',
    icon: 'icon-textorientation',
    tip: 'Vertical Text',
    value: ['horizontal-tb', 'vertical-rl'], // tb-rl
    select: false,
  },
] as TStyleIconData[]

export type TStyleIconData2 = {
  key: string
  icon: string
  tip: string
  value: string
  select: boolean
}

export const styleIconList2 = [
  {
    key: 'textAlign',
    icon: 'icon-align-left-text',
    tip: 'Align Left',
    value: 'left',
    select: false,
  },
  {
    key: 'textAlign',
    icon: 'icon-align-center-text',
    tip: 'Align Center',
    value: 'center',
    select: false,
  },
  {
    key: 'textAlign',
    icon: 'icon-align-right-text',
    tip: 'Align Right',
    value: 'right',
    select: false,
  },
  {
    key: 'textAlign',
    icon: 'icon-align-justify-text',
    tip: 'Justify',
    value: 'justify',
    select: false,
  },
  {
    key: 'textAlignLast',
    icon: 'icon-align-justify-text',
    tip: 'Distribute',
    value: 'justify',
    select: false,
  },
] as TStyleIconData2[]

export const alignIconList = [
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

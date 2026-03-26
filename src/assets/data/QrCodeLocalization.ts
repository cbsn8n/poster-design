/*
 * @Author: ShawnPhang
 * @Date: 2022-03-16 11:38:48
 * @Description:
 * @LastEditors: ShawnPhang, Jeremy Yu <https://github.com/JeremyYu-cn>
 * @LastEditTime: 2024-03-01 20:55:51
 */

export type QrCodeLocalizationData = {
  dotColorTypes: {
    key: string
    value: string
  }[]
  dotTypes: {
    key: string
    value: string
  }[]
}

export default {
  dotColorTypes: [
    {
      key: 'single',
      value: 'Solid Color',
    },
    {
      key: 'gradient',
      value: 'Gradient',
    },
  ],
  dotTypes: [
    {
      key: 'dots',
      value: 'Dots Style',
    },
    {
      key: 'rounded',
      value: 'Rounded Style',
    },
    {
      key: 'classy',
      value: 'Classic Style',
    },
    {
      key: 'classy-rounded',
      value: 'Rounded Corner',
    },
    {
      key: 'square',
      value: 'Square Style',
    },
    {
      key: 'extra-rounded',
      value: 'Special Style',
    },
  ],
} as QrCodeLocalizationData

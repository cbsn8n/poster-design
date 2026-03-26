/*
 * @Author: ShawnPhang
 * @Date: 2022-01-08 09:43:37
 * @Description: Font处理
 * @LastEditors: ShawnPhang <https://m.palxp.cn>
 * @LastEditTime: 2024-08-12 10:33:36
 */
// import { isSupportFontFamily, blob2Base64 } from './utils'
import { TGetFontItemData, getFonts } from '@/api/material'

const nowVersion = '3' // Font list version - bump to refresh frontend cache

/** Fontitem类型 */
export type TFontItemData = { url: string } & Omit<TGetFontItemData, 'woff'>

const fontList: TFontItemData[] = []
// const download: any = {}
export const useFontStore = {
  list: fontList,
  // download,
  async init() {
    this.list = []
    localStorage.getItem('FONTS_VERSION') !== nowVersion && localStorage.removeItem('FONTS')
    const localFonts: TFontItemData[] = localStorage.getItem('FONTS') ? JSON.parse(localStorage.getItem('FONTS') || '') : []
    if (localFonts.length > 0) {
      this.list.push(...localFonts)
    }

    if (this.list.length === 0) {
      const res = {
        list: [
          // === Cyrillic + Latin fonts (Google Fonts) ===
          { id: 1001, alias: 'Roboto', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/roboto/v47/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWuaabWmT.woff2', value: 'Roboto', font_family: 'Roboto', size: 0, lang: 'en', woff_size: 0 },
          { id: 1002, alias: 'Open Sans', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/opensans/v40/memSYaGs76AUhyKD-CmpnbRi.woff2', value: 'Open Sans', font_family: 'Open Sans', size: 0, lang: 'en', woff_size: 0 },
          { id: 1003, alias: 'Montserrat', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/montserrat/v29/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw5aXo.woff2', value: 'Montserrat', font_family: 'Montserrat', size: 0, lang: 'en', woff_size: 0 },
          { id: 1004, alias: 'Lato', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHjx4wXg.woff2', value: 'Lato', font_family: 'Lato', size: 0, lang: 'en', woff_size: 0 },
          { id: 1005, alias: 'Oswald', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/oswald/v53/TK3_WkUHHAIjg75cFRf3bXL8LICs1xZogUFoZAaRliE.woff2', value: 'Oswald', font_family: 'Oswald', size: 0, lang: 'en', woff_size: 0 },
          { id: 1006, alias: 'Raleway', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/raleway/v34/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaorCIPrE.woff2', value: 'Raleway', font_family: 'Raleway', size: 0, lang: 'en', woff_size: 0 },
          { id: 1007, alias: 'PT Sans', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/ptsans/v17/jizaRExUiTo99u79D0KEwA.woff2', value: 'PT Sans', font_family: 'PT Sans', size: 0, lang: 'en', woff_size: 0 },
          { id: 1008, alias: 'PT Serif', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/ptserif/v18/EJRVQgYoZZY2vCFuvAFWzr8.woff2', value: 'PT Serif', font_family: 'PT Serif', size: 0, lang: 'en', woff_size: 0 },
          { id: 1009, alias: 'Nunito', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDLshRTY9jo7eTWk.woff2', value: 'Nunito', font_family: 'Nunito', size: 0, lang: 'en', woff_size: 0 },
          { id: 1010, alias: 'Playfair Display', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff2', value: 'Playfair Display', font_family: 'Playfair Display', size: 0, lang: 'en', woff_size: 0 },
          { id: 1011, alias: 'Rubik', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-B4iFV0U1dYPFkZVO.woff2', value: 'Rubik', font_family: 'Rubik', size: 0, lang: 'en', woff_size: 0 },
          { id: 1012, alias: 'Fira Sans', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/firasans/v17/va9E4kDNxMZdWfMOD5VvkrCqYTfVcFTPj0s.woff2', value: 'Fira Sans', font_family: 'Fira Sans', size: 0, lang: 'en', woff_size: 0 },
          { id: 1013, alias: 'Noto Sans', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/notosans/v36/o-0bIpQlx3QUlC5A4PNB6Ryti20_6n1iPHjc5aPdu2ui.woff2', value: 'Noto Sans', font_family: 'Noto Sans', size: 0, lang: 'en', woff_size: 0 },
          { id: 1014, alias: 'Inter', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2', value: 'Inter', font_family: 'Inter', size: 0, lang: 'en', woff_size: 0 },
          { id: 1015, alias: 'Comfortaa', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/comfortaa/v45/1Ptsg8LJRfWJmhDAuUs4TYFqL_KWxWMT.woff2', value: 'Comfortaa', font_family: 'Comfortaa', size: 0, lang: 'en', woff_size: 0 },
          { id: 1016, alias: 'Lobster', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/lobster/v30/neILzCirqoswsqX9zoKmMw.woff2', value: 'Lobster', font_family: 'Lobster', size: 0, lang: 'en', woff_size: 0 },
          { id: 1017, alias: 'Pacifico', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/pacifico/v22/FwZY7-Qmy14u9lezJ-6H6MmBp0u-.woff2', value: 'Pacifico', font_family: 'Pacifico', size: 0, lang: 'en', woff_size: 0 },
          { id: 1018, alias: 'Caveat', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/caveat/v18/WnznHAc5bAfYB2QRah7pcpNvOx-pjfJ9SIKjYBxPigs.woff2', value: 'Caveat', font_family: 'Caveat', size: 0, lang: 'en', woff_size: 0 },
          { id: 1019, alias: 'Merriweather', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/merriweather/v30/u-440qyriQwlOrhSvowK_l5-fCZM.woff2', value: 'Merriweather', font_family: 'Merriweather', size: 0, lang: 'en', woff_size: 0 },
          { id: 1020, alias: 'Ubuntu', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/ubuntu/v20/4iCs6KVjbNBYlgoKfw72.woff2', value: 'Ubuntu', font_family: 'Ubuntu', size: 0, lang: 'en', woff_size: 0 },
          { id: 1021, alias: 'Bitter', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/bitter/v36/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8fbfCL_EXFh2reU.woff2', value: 'Bitter', font_family: 'Bitter', size: 0, lang: 'en', woff_size: 0 },
          { id: 1022, alias: 'Russo One', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/russoone/v16/Z9XUDmZRWg6M1LvRYsHOz8mJvLuL9A.woff2', value: 'Russo One', font_family: 'Russo One', size: 0, lang: 'en', woff_size: 0 },
          { id: 1023, alias: 'Jost', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/jost/v15/92zPtBhPNqw79Ij1E865zBUv7myjJQVGPokMmuHL.woff2', value: 'Jost', font_family: 'Jost', size: 0, lang: 'en', woff_size: 0 },
          { id: 1024, alias: 'Exo 2', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/exo2/v21/7cH1v4okm5zmbvwkAx_sfcEuiD8jvvKcPtq-rpvLpQ.woff2', value: 'Exo 2', font_family: 'Exo 2', size: 0, lang: 'en', woff_size: 0 },
          { id: 1025, alias: 'Marck Script', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/marckscript/v20/nwpTtK2oNgBA3Or78gapdwuyzNIJ.woff2', value: 'Marck Script', font_family: 'Marck Script', size: 0, lang: 'en', woff_size: 0 },
          // === Chinese font ===
          { id: 543, alias: 'ZCOOL Happy', preview: '', ttf: null, woff: 'https://lib.baomitu.com/fonts/zcool-kuaile/zcool-kuaile-regular.woff2', value: 'zcool-kuaile-regular', font_family: '', size: 0, lang: 'zh', woff_size: 0 },
        ],
      }
      this.list.unshift(
        ...res.list.map((x) => {
          const { id, alias, value, preview, woff, lang } = x
          return { id, oid: 0, value, preview, alias, url: woff, lang }
        }),
      )
      localStorage.setItem('FONTS', JSON.stringify(this.list))
      localStorage.setItem('FONTS_VERSION', nowVersion)
    }
    // store.dispatch('setFonts', this.list)
  },
}

// export const useFontStore = () => {
//   return {
//     list: fontList,
//     download,
//     async init() {
//       this.list = []
//       const localFonts: any = localStorage.getItem('FONTS') ? JSON.parse(localStorage.getItem('FONTS') || '') : []
//       if (localFonts.length > 0) {
//         this.list.push(...localFonts)
//       }

//       if (this.list.length === 0) {
//         const res = await getFonts({ pageSize: 400 })
//         this.list.unshift(
//           ...res.map((x: any) => {
//             const { content, id, name, preview } = x
//             return { id, name, preview: preview.url, alias: content.alias, family: content.family, lang: content.lang, ttf: content.ttf, url: content.woff }
//           }),
//         )
//         localStorage.setItem('FONTS', JSON.stringify(this.list))
//       }
//       console.log(this.list)
//     },
//     getList() {
//       return fontList
//     },
//   }
// }

// export const useFontStore = () => {
//   return {
//     list: fontList,
//     download,
//     async init() {
//       this.list = []
//       const localFonts: any = localStorage.getItem('FONTS') ? JSON.parse(localStorage.getItem('FONTS') || '') : []
//       if (localFonts.length > 0) {
//         this.list.push(...localFonts)
//       }

//       if (this.list.length === 0) {
//         for (let i = 1; i < 99; i += 1) {
//           const res = await getFonts(i)
//           this.list.unshift(
//             ...res.map((x: any) => {
//               const { content, id, name, preview } = x
//               return { id, name, preview: preview.url, alias: content.alias, family: content.family, lang: content.lang, ttf: content.ttf, url: content.woff }
//             }),
//           )
//           if (res.length < 100) break
//         }
//         localStorage.setItem('FONTS', JSON.stringify(this.list))
//       }
//     },
//     async addFont2Style(name: string, url: string) {
//       // if (this.download[name]) return;
//       if (isSupportFontFamily(name)) return

//       const response = await fetch(url, { headers: { responseType: 'blob' } })
//       const blob = await response.blob()
//       const ff = new FontFace(name, `url(${URL.createObjectURL(blob)})`)
//       const f = await ff.load()
//       ;(document.fonts as FontFaceSet).add(f)

//       const b64 = await blob2Base64(blob)
//       // 使用 base64 是为了方便将 DOM Generate Image
//       this.download[name] = b64
//       // document.head.appendChild(generateFontStyle(name, b64));
//     },
//   }
// }

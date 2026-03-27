/*
 * @Author: ShawnPhang
 * @Date: 2022-01-08 09:43:37
 * @Description: Font处理
 * @LastEditors: ShawnPhang <https://m.palxp.cn>
 * @LastEditTime: 2024-08-12 10:33:36
 */
// import { isSupportFontFamily, blob2Base64 } from './utils'
import { TGetFontItemData, getFonts } from '@/api/material'

const nowVersion = '5' // Font list version - bump to refresh frontend cache

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
          // === Fonts (sorted alphabetically) ===
          { id: 1032, alias: 'Alegreya', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/alegreya/v39/4UacrEBBsBhlBjvfkQjt71kZfyBzPgNG9hU4_6qjgSE.woff2', value: 'Alegreya', font_family: 'Alegreya', size: 0, lang: 'en', woff_size: 0 },
          { id: 1036, alias: 'Bad Script', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/badscript/v18/6NUT8F6PJgbFWQn47_x7pO8kzO1A.woff2', value: 'Bad Script', font_family: 'Bad Script', size: 0, lang: 'en', woff_size: 0 },
          { id: 1021, alias: 'Bitter', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/bitter/v36/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8fbfCL_EXFh2reU.woff2', value: 'Bitter', font_family: 'Bitter', size: 0, lang: 'en', woff_size: 0 },
          { id: 1018, alias: 'Caveat', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/caveat/v18/WnznHAc5bAfYB2QRah7pcpNvOx-pjfJ9SIKjYBxPigs.woff2', value: 'Caveat', font_family: 'Caveat', size: 0, lang: 'en', woff_size: 0 },
          { id: 1015, alias: 'Comfortaa', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/comfortaa/v45/1Ptsg8LJRfWJmhDAuUs4TYFqL_KWxWMT.woff2', value: 'Comfortaa', font_family: 'Comfortaa', size: 0, lang: 'en', woff_size: 0 },
          { id: 1031, alias: 'Cormorant', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/cormorant/v24/H4c2BXOCl9bbnla_nHIA47NMUjsNbCVrFhFTc7dq7T2u.woff2', value: 'Cormorant', font_family: 'Cormorant', size: 0, lang: 'en', woff_size: 0 },
          { id: 1042, alias: 'Cuprum', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/cuprum/v29/dg45_pLmvrkcOkBnKsOzXyGWTBcmg-X6Vj_YJwQj.woff2', value: 'Cuprum', font_family: 'Cuprum', size: 0, lang: 'en', woff_size: 0 },
          { id: 1024, alias: 'Exo 2', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/exo2/v21/7cH1v4okm5zmbvwkAx_sfcEuiD8jvvKcPtq-rpvLpQ.woff2', value: 'Exo 2', font_family: 'Exo 2', size: 0, lang: 'en', woff_size: 0 },
          { id: 1012, alias: 'Fira Sans', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/firasans/v17/va9E4kDNxMZdWfMOD5VvkrCqYTfVcFTPj0s.woff2', value: 'Fira Sans', font_family: 'Fira Sans', size: 0, lang: 'en', woff_size: 0 },
          { id: 1033, alias: 'Forum', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/forum/v19/6aey4Ky-Vb8Ew8IVOpIq3g.woff2', value: 'Forum', font_family: 'Forum', size: 0, lang: 'en', woff_size: 0 },
          { id: 1048, alias: 'Geologica', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/geologica/v5/oY1o8evIr7j9P3TN9YwNAdyjzUyDKkKdAGOJh1UlCDUIhAIdhCZOn1fLsig7jfvCCPHZckU8H3G11_z-_OZqDx_rc-ASAEWn.woff2', value: 'Geologica', font_family: 'Geologica', size: 0, lang: 'en', woff_size: 0 },
          { id: 1028, alias: 'IBM Plex Sans', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/ibmplexsans/v23/zYXGKVElMYYaJe8bpLHnCwDKr932-G7dytD-Dmu1swZSAXcomDVmadSD6llDA6g4poY.woff2', value: 'IBM Plex Sans', font_family: 'IBM Plex Sans', size: 0, lang: 'en', woff_size: 0 },
          { id: 1014, alias: 'Inter', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2', value: 'Inter', font_family: 'Inter', size: 0, lang: 'en', woff_size: 0 },
          { id: 1023, alias: 'Jost', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/jost/v15/92zPtBhPNqw79Ij1E865zBUv7myjJQVGPokMmuHL.woff2', value: 'Jost', font_family: 'Jost', size: 0, lang: 'en', woff_size: 0 },
          { id: 1046, alias: 'Kelly Slab', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/kellyslab/v18/-W_7XJX0Rz3cxUnJC5t6fkALfq0k.woff2', value: 'Kelly Slab', font_family: 'Kelly Slab', size: 0, lang: 'en', woff_size: 0 },
          { id: 1004, alias: 'Lato', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHjx4wXg.woff2', value: 'Lato', font_family: 'Lato', size: 0, lang: 'en', woff_size: 0 },
          { id: 1016, alias: 'Lobster', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/lobster/v30/neILzCirqoswsqX9zoKmMw.woff2', value: 'Lobster', font_family: 'Lobster', size: 0, lang: 'en', woff_size: 0 },
          { id: 1026, alias: 'Manrope', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/manrope/v20/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk79FN_G-bnBeA.woff2', value: 'Manrope', font_family: 'Manrope', size: 0, lang: 'en', woff_size: 0 },
          { id: 1025, alias: 'Marck Script', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/marckscript/v20/nwpTtK2oNgBA3Or78gapdwuyzNIJ.woff2', value: 'Marck Script', font_family: 'Marck Script', size: 0, lang: 'en', woff_size: 0 },
          { id: 1019, alias: 'Merriweather', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/merriweather/v30/u-440qyriQwlOrhSvowK_l5-fCZM.woff2', value: 'Merriweather', font_family: 'Merriweather', size: 0, lang: 'en', woff_size: 0 },
          { id: 1003, alias: 'Montserrat', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/montserrat/v29/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw5aXo.woff2', value: 'Montserrat', font_family: 'Montserrat', size: 0, lang: 'en', woff_size: 0 },
          { id: 1045, alias: 'Mulish', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/mulish/v18/1Ptyg83HX_SGhgqO0yLcmjzUAuWexZNR8aOvG4w-.woff2', value: 'Mulish', font_family: 'Mulish', size: 0, lang: 'en', woff_size: 0 },
          { id: 1037, alias: 'Neucha', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/neucha/v18/q5uGsou0JOdh94bfuQltOxU.woff2', value: 'Neucha', font_family: 'Neucha', size: 0, lang: 'en', woff_size: 0 },
          { id: 1013, alias: 'Noto Sans', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/notosans/v36/o-0bIpQlx3QUlC5A4PNB6Ryti20_6n1iPHjc5aPdu2ui.woff2', value: 'Noto Sans', font_family: 'Noto Sans', size: 0, lang: 'en', woff_size: 0 },
          { id: 1044, alias: 'Noto Serif', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/notoserif/v33/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZqFCTw8cKtq8.woff2', value: 'Noto Serif', font_family: 'Noto Serif', size: 0, lang: 'en', woff_size: 0 },
          { id: 1009, alias: 'Nunito', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDLshRTY9jo7eTWk.woff2', value: 'Nunito', font_family: 'Nunito', size: 0, lang: 'en', woff_size: 0 },
          { id: 1049, alias: 'Onest', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/onest/v9/gNMZW3F-SZuj7zOT0IfSjTS16cPh9R-psRtNcWU.woff2', value: 'Onest', font_family: 'Onest', size: 0, lang: 'en', woff_size: 0 },
          { id: 1002, alias: 'Open Sans', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/opensans/v40/memSYaGs76AUhyKD-CmpnbRi.woff2', value: 'Open Sans', font_family: 'Open Sans', size: 0, lang: 'en', woff_size: 0 },
          { id: 1005, alias: 'Oswald', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/oswald/v53/TK3_WkUHHAIjg75cFRf3bXL8LICs1xZogUFoZAaRliE.woff2', value: 'Oswald', font_family: 'Oswald', size: 0, lang: 'en', woff_size: 0 },
          { id: 1017, alias: 'Pacifico', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/pacifico/v22/FwZY7-Qmy14u9lezJ-6H6MmBp0u-.woff2', value: 'Pacifico', font_family: 'Pacifico', size: 0, lang: 'en', woff_size: 0 },
          { id: 1038, alias: 'Pangolin', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/pangolin/v12/cY9GfjGcW0FPpi-tWMfJ79zqiA.woff2', value: 'Pangolin', font_family: 'Pangolin', size: 0, lang: 'en', woff_size: 0 },
          { id: 1029, alias: 'Philosopher', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/philosopher/v21/vEFV2_5QCwIS4_Dhez5jcWBqT00k0w.woff2', value: 'Philosopher', font_family: 'Philosopher', size: 0, lang: 'en', woff_size: 0 },
          { id: 1010, alias: 'Playfair Display', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff2', value: 'Playfair Display', font_family: 'Playfair Display', size: 0, lang: 'en', woff_size: 0 },
          { id: 1035, alias: 'Poiret One', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/poiretone/v18/UqyVK80NJXN4zfRgbdfbo5pcV_cx.woff2', value: 'Poiret One', font_family: 'Poiret One', size: 0, lang: 'en', woff_size: 0 },
          { id: 1034, alias: 'Prata', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/prata/v22/6xKhdSpbNNCT-sWLCm7JLQ.woff2', value: 'Prata', font_family: 'Prata', size: 0, lang: 'en', woff_size: 0 },
          { id: 1039, alias: 'Press Start 2P', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/pressstart2p/v16/e3t4euO8T-267oIAQAu6jDQyK3nRivN04w.woff2', value: 'Press Start 2P', font_family: 'Press Start 2P', size: 0, lang: 'en', woff_size: 0 },
          { id: 1007, alias: 'PT Sans', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/ptsans/v17/jizaRExUiTo99u79D0KEwA.woff2', value: 'PT Sans', font_family: 'PT Sans', size: 0, lang: 'en', woff_size: 0 },
          { id: 1008, alias: 'PT Serif', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/ptserif/v18/EJRVQgYoZZY2vCFuvAFWzr8.woff2', value: 'PT Serif', font_family: 'PT Serif', size: 0, lang: 'en', woff_size: 0 },
          { id: 1006, alias: 'Raleway', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/raleway/v34/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaorCIPrE.woff2', value: 'Raleway', font_family: 'Raleway', size: 0, lang: 'en', woff_size: 0 },
          { id: 1001, alias: 'Roboto', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/roboto/v47/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWuaabWmT.woff2', value: 'Roboto', font_family: 'Roboto', size: 0, lang: 'en', woff_size: 0 },
          { id: 1011, alias: 'Rubik', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-B4iFV0U1dYPFkZVO.woff2', value: 'Rubik', font_family: 'Rubik', size: 0, lang: 'en', woff_size: 0 },
          { id: 1022, alias: 'Russo One', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/russoone/v16/Z9XUDmZRWg6M1LvRYsHOz8mJvLuL9A.woff2', value: 'Russo One', font_family: 'Russo One', size: 0, lang: 'en', woff_size: 0 },
          { id: 1027, alias: 'Source Sans 3', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/sourcesans3/v19/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8Ky462EO9CsKng.woff2', value: 'Source Sans 3', font_family: 'Source Sans 3', size: 0, lang: 'en', woff_size: 0 },
          { id: 1047, alias: 'Spectral', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/spectral/v15/rnCr-xNNww_2s0amA9M9knj-SA.woff2', value: 'Spectral', font_family: 'Spectral', size: 0, lang: 'en', woff_size: 0 },
          { id: 1050, alias: 'Tektur', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/tektur/v6/XoHN2YHtS7q969kXCjzlV0aSkS_o8OacmTe0TYlYFot8TrwuVbtNacLLTQ.woff2', value: 'Tektur', font_family: 'Tektur', size: 0, lang: 'en', woff_size: 0 },
          { id: 1020, alias: 'Ubuntu', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/ubuntu/v20/4iCs6KVjbNBYlgoKfw72.woff2', value: 'Ubuntu', font_family: 'Ubuntu', size: 0, lang: 'en', woff_size: 0 },
          { id: 1040, alias: 'Unbounded', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/unbounded/v12/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG6xjx447Ngc6L.woff2', value: 'Unbounded', font_family: 'Unbounded', size: 0, lang: 'en', woff_size: 0 },
          { id: 1043, alias: 'Vollkorn', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/vollkorn/v30/0ybgGDoxxrvAnPhYGzMlQLzuMasz6Df2MHGeGmmcIbA.woff2', value: 'Vollkorn', font_family: 'Vollkorn', size: 0, lang: 'en', woff_size: 0 },
          { id: 1041, alias: 'Yanone Kaffeesatz', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/yanonekaffeesatz/v32/3y9I6aknfjLm_3lMKjiMgmUUYBs04aUXNxt9gW2LIfto9tWZc2GKOnU.woff2', value: 'Yanone Kaffeesatz', font_family: 'Yanone Kaffeesatz', size: 0, lang: 'en', woff_size: 0 },
          { id: 1030, alias: 'Yeseva One', preview: '', ttf: null, woff: 'https://fonts.gstatic.com/s/yesevaone/v24/OpNJno4ck8vc-xYpwWWxlilVWyXD.woff2', value: 'Yeseva One', font_family: 'Yeseva One', size: 0, lang: 'en', woff_size: 0 },
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

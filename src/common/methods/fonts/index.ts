/*
 * @Author: ShawnPhang
 * @Date: 2022-01-08 09:43:37
 * @Description: Font处理
 * @LastEditors: ShawnPhang <https://m.palxp.cn>
 * @LastEditTime: 2024-08-12 10:33:36
 */
// import { isSupportFontFamily, blob2Base64 } from './utils'
import { TGetFontItemData, getFonts } from '@/api/material'

const nowVersion = '6' // Font list version - bump to refresh frontend cache (v6: TTF full charset)

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
          // === Fonts (sorted alphabetically, full TTF for all subsets) ===
          { id: 1032, alias: 'Alegreya', preview: '', ttf: 'https://fonts.gstatic.com/s/alegreya/v39/4UacrEBBsBhlBjvfkQjt71kZfyBzPgNG9hUI_A.ttf', woff: 'https://fonts.gstatic.com/s/alegreya/v39/4UacrEBBsBhlBjvfkQjt71kZfyBzPgNG9hUI_A.ttf', value: 'Alegreya', font_family: 'Alegreya', size: 0, lang: 'en', woff_size: 0 },
          { id: 1036, alias: 'Bad Script', preview: '', ttf: 'https://fonts.gstatic.com/s/badscript/v18/6NUT8F6PJgbFWQn47_x7lOw.ttf', woff: 'https://fonts.gstatic.com/s/badscript/v18/6NUT8F6PJgbFWQn47_x7lOw.ttf', value: 'Bad Script', font_family: 'Bad Script', size: 0, lang: 'en', woff_size: 0 },
          { id: 1021, alias: 'Bitter', preview: '', ttf: 'https://fonts.gstatic.com/s/bitter/v40/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8fbfCL8.ttf', woff: 'https://fonts.gstatic.com/s/bitter/v40/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8fbfCL8.ttf', value: 'Bitter', font_family: 'Bitter', size: 0, lang: 'en', woff_size: 0 },
          { id: 1018, alias: 'Caveat', preview: '', ttf: 'https://fonts.gstatic.com/s/caveat/v23/WnznHAc5bAfYB2QRah7pcpNvOx-pjfJ9SII.ttf', woff: 'https://fonts.gstatic.com/s/caveat/v23/WnznHAc5bAfYB2QRah7pcpNvOx-pjfJ9SII.ttf', value: 'Caveat', font_family: 'Caveat', size: 0, lang: 'en', woff_size: 0 },
          { id: 1015, alias: 'Comfortaa', preview: '', ttf: 'https://fonts.gstatic.com/s/comfortaa/v47/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4WjMPrQ.ttf', woff: 'https://fonts.gstatic.com/s/comfortaa/v47/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4WjMPrQ.ttf', value: 'Comfortaa', font_family: 'Comfortaa', size: 0, lang: 'en', woff_size: 0 },
          { id: 1031, alias: 'Cormorant', preview: '', ttf: 'https://fonts.gstatic.com/s/cormorant/v24/H4c2BXOCl9bbnla_nHIA47NMUjsNbCVrFhFTQ7Q.ttf', woff: 'https://fonts.gstatic.com/s/cormorant/v24/H4c2BXOCl9bbnla_nHIA47NMUjsNbCVrFhFTQ7Q.ttf', value: 'Cormorant', font_family: 'Cormorant', size: 0, lang: 'en', woff_size: 0 },
          { id: 1042, alias: 'Cuprum', preview: '', ttf: 'https://fonts.gstatic.com/s/cuprum/v29/dg45_pLmvrkcOkBnKsOzXyGWTBcmg-X6Zjw.ttf', woff: 'https://fonts.gstatic.com/s/cuprum/v29/dg45_pLmvrkcOkBnKsOzXyGWTBcmg-X6Zjw.ttf', value: 'Cuprum', font_family: 'Cuprum', size: 0, lang: 'en', woff_size: 0 },
          { id: 1024, alias: 'Exo 2', preview: '', ttf: 'https://fonts.gstatic.com/s/exo2/v26/7cH1v4okm5zmbvwkAx_sfcEuiD8jvvKcPg.ttf', woff: 'https://fonts.gstatic.com/s/exo2/v26/7cH1v4okm5zmbvwkAx_sfcEuiD8jvvKcPg.ttf', value: 'Exo 2', font_family: 'Exo 2', size: 0, lang: 'en', woff_size: 0 },
          { id: 1012, alias: 'Fira Sans', preview: '', ttf: 'https://fonts.gstatic.com/s/firasans/v18/va9E4kDNxMZdWfMOD5VfkA.ttf', woff: 'https://fonts.gstatic.com/s/firasans/v18/va9E4kDNxMZdWfMOD5VfkA.ttf', value: 'Fira Sans', font_family: 'Fira Sans', size: 0, lang: 'en', woff_size: 0 },
          { id: 1033, alias: 'Forum', preview: '', ttf: 'https://fonts.gstatic.com/s/forum/v19/6aey4Ky-Vb8Ew_IW.ttf', woff: 'https://fonts.gstatic.com/s/forum/v19/6aey4Ky-Vb8Ew_IW.ttf', value: 'Forum', font_family: 'Forum', size: 0, lang: 'en', woff_size: 0 },
          { id: 1048, alias: 'Geologica', preview: '', ttf: 'https://fonts.gstatic.com/s/geologica/v5/oY1o8evIr7j9P3TN9YwNAdyjzUyDKkKdAGOJh1UlCDUIhAIdhCZOn1fLsig7jfvCCPHZckU8H3G11_z-_OZqDx_rQ-M.ttf', woff: 'https://fonts.gstatic.com/s/geologica/v5/oY1o8evIr7j9P3TN9YwNAdyjzUyDKkKdAGOJh1UlCDUIhAIdhCZOn1fLsig7jfvCCPHZckU8H3G11_z-_OZqDx_rQ-M.ttf', value: 'Geologica', font_family: 'Geologica', size: 0, lang: 'en', woff_size: 0 },
          { id: 1028, alias: 'IBM Plex Sans', preview: '', ttf: 'https://fonts.gstatic.com/s/ibmplexsans/v23/zYXGKVElMYYaJe8bpLHnCwDKr932-G7dytD-Dmu1swZSAXcomDVmadSD6llzAA.ttf', woff: 'https://fonts.gstatic.com/s/ibmplexsans/v23/zYXGKVElMYYaJe8bpLHnCwDKr932-G7dytD-Dmu1swZSAXcomDVmadSD6llzAA.ttf', value: 'IBM Plex Sans', font_family: 'IBM Plex Sans', size: 0, lang: 'en', woff_size: 0 },
          { id: 1014, alias: 'Inter', preview: '', ttf: 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf', woff: 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf', value: 'Inter', font_family: 'Inter', size: 0, lang: 'en', woff_size: 0 },
          { id: 1023, alias: 'Jost', preview: '', ttf: 'https://fonts.gstatic.com/s/jost/v20/92zPtBhPNqw79Ij1E865zBUv7myjJQVG.ttf', woff: 'https://fonts.gstatic.com/s/jost/v20/92zPtBhPNqw79Ij1E865zBUv7myjJQVG.ttf', value: 'Jost', font_family: 'Jost', size: 0, lang: 'en', woff_size: 0 },
          { id: 1046, alias: 'Kelly Slab', preview: '', ttf: 'https://fonts.gstatic.com/s/kellyslab/v18/-W_7XJX0Rz3cxUnJC5t6TkM.ttf', woff: 'https://fonts.gstatic.com/s/kellyslab/v18/-W_7XJX0Rz3cxUnJC5t6TkM.ttf', value: 'Kelly Slab', font_family: 'Kelly Slab', size: 0, lang: 'en', woff_size: 0 },
          { id: 1004, alias: 'Lato', preview: '', ttf: 'https://fonts.gstatic.com/s/lato/v25/S6uyw4BMUTPHvxk.ttf', woff: 'https://fonts.gstatic.com/s/lato/v25/S6uyw4BMUTPHvxk.ttf', value: 'Lato', font_family: 'Lato', size: 0, lang: 'en', woff_size: 0 },
          { id: 1016, alias: 'Lobster', preview: '', ttf: 'https://fonts.gstatic.com/s/lobster/v32/neILzCirqoswsqX9_oU.ttf', woff: 'https://fonts.gstatic.com/s/lobster/v32/neILzCirqoswsqX9_oU.ttf', value: 'Lobster', font_family: 'Lobster', size: 0, lang: 'en', woff_size: 0 },
          { id: 1026, alias: 'Manrope', preview: '', ttf: 'https://fonts.gstatic.com/s/manrope/v20/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk79FO_F.ttf', woff: 'https://fonts.gstatic.com/s/manrope/v20/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk79FO_F.ttf', value: 'Manrope', font_family: 'Manrope', size: 0, lang: 'en', woff_size: 0 },
          { id: 1025, alias: 'Marck Script', preview: '', ttf: 'https://fonts.gstatic.com/s/marckscript/v22/nwpTtK2oNgBA3Or78gapdwuCzw.ttf', woff: 'https://fonts.gstatic.com/s/marckscript/v22/nwpTtK2oNgBA3Or78gapdwuCzw.ttf', value: 'Marck Script', font_family: 'Marck Script', size: 0, lang: 'en', woff_size: 0 },
          { id: 1019, alias: 'Merriweather', preview: '', ttf: 'https://fonts.gstatic.com/s/merriweather/v33/u-4D0qyriQwlOrhSvowK_l5UcA6zuSYEqOzpPe3HOZJ5eX1WtLaQwmYiScCmDxhtNOKl8yDr3icqEw.ttf', woff: 'https://fonts.gstatic.com/s/merriweather/v33/u-4D0qyriQwlOrhSvowK_l5UcA6zuSYEqOzpPe3HOZJ5eX1WtLaQwmYiScCmDxhtNOKl8yDr3icqEw.ttf', value: 'Merriweather', font_family: 'Merriweather', size: 0, lang: 'en', woff_size: 0 },
          { id: 1003, alias: 'Montserrat', preview: '', ttf: 'https://fonts.gstatic.com/s/montserrat/v31/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-.ttf', woff: 'https://fonts.gstatic.com/s/montserrat/v31/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-.ttf', value: 'Montserrat', font_family: 'Montserrat', size: 0, lang: 'en', woff_size: 0 },
          { id: 1045, alias: 'Mulish', preview: '', ttf: 'https://fonts.gstatic.com/s/mulish/v18/1Ptyg83HX_SGhgqO0yLcmjzUAuWexZNRwaA.ttf', woff: 'https://fonts.gstatic.com/s/mulish/v18/1Ptyg83HX_SGhgqO0yLcmjzUAuWexZNRwaA.ttf', value: 'Mulish', font_family: 'Mulish', size: 0, lang: 'en', woff_size: 0 },
          { id: 1037, alias: 'Neucha', preview: '', ttf: 'https://fonts.gstatic.com/s/neucha/v18/q5uGsou0JOdh94bvug.ttf', woff: 'https://fonts.gstatic.com/s/neucha/v18/q5uGsou0JOdh94bvug.ttf', value: 'Neucha', font_family: 'Neucha', size: 0, lang: 'en', woff_size: 0 },
          { id: 1013, alias: 'Noto Sans', preview: '', ttf: 'https://fonts.gstatic.com/s/notosans/v42/o-0mIpQlx3QUlC5A4PNB6Ryti20_6n1iPHjcz6L1SoM-jCpoiyD9A99d.ttf', woff: 'https://fonts.gstatic.com/s/notosans/v42/o-0mIpQlx3QUlC5A4PNB6Ryti20_6n1iPHjcz6L1SoM-jCpoiyD9A99d.ttf', value: 'Noto Sans', font_family: 'Noto Sans', size: 0, lang: 'en', woff_size: 0 },
          { id: 1044, alias: 'Noto Serif', preview: '', ttf: 'https://fonts.gstatic.com/s/notoserif/v33/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZqFCjwA.ttf', woff: 'https://fonts.gstatic.com/s/notoserif/v33/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZqFCjwA.ttf', value: 'Noto Serif', font_family: 'Noto Serif', size: 0, lang: 'en', woff_size: 0 },
          { id: 1009, alias: 'Nunito', preview: '', ttf: 'https://fonts.gstatic.com/s/nunito/v32/XRXI3I6Li01BKofiOc5wtlZ2di8HDLshRTM.ttf', woff: 'https://fonts.gstatic.com/s/nunito/v32/XRXI3I6Li01BKofiOc5wtlZ2di8HDLshRTM.ttf', value: 'Nunito', font_family: 'Nunito', size: 0, lang: 'en', woff_size: 0 },
          { id: 1049, alias: 'Onest', preview: '', ttf: 'https://fonts.gstatic.com/s/onest/v9/gNMZW3F-SZuj7zOT0IfSjTS16cPh9R-Zsg.ttf', woff: 'https://fonts.gstatic.com/s/onest/v9/gNMZW3F-SZuj7zOT0IfSjTS16cPh9R-Zsg.ttf', value: 'Onest', font_family: 'Onest', size: 0, lang: 'en', woff_size: 0 },
          { id: 1002, alias: 'Open Sans', preview: '', ttf: 'https://fonts.gstatic.com/s/opensans/v44/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0C4n.ttf', woff: 'https://fonts.gstatic.com/s/opensans/v44/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0C4n.ttf', value: 'Open Sans', font_family: 'Open Sans', size: 0, lang: 'en', woff_size: 0 },
          { id: 1005, alias: 'Oswald', preview: '', ttf: 'https://fonts.gstatic.com/s/oswald/v57/TK3_WkUHHAIjg75cFRf3bXL8LICs1_FvgUE.ttf', woff: 'https://fonts.gstatic.com/s/oswald/v57/TK3_WkUHHAIjg75cFRf3bXL8LICs1_FvgUE.ttf', value: 'Oswald', font_family: 'Oswald', size: 0, lang: 'en', woff_size: 0 },
          { id: 1017, alias: 'Pacifico', preview: '', ttf: 'https://fonts.gstatic.com/s/pacifico/v23/FwZY7-Qmy14u9lezJ96A.ttf', woff: 'https://fonts.gstatic.com/s/pacifico/v23/FwZY7-Qmy14u9lezJ96A.ttf', value: 'Pacifico', font_family: 'Pacifico', size: 0, lang: 'en', woff_size: 0 },
          { id: 1038, alias: 'Pangolin', preview: '', ttf: 'https://fonts.gstatic.com/s/pangolin/v12/cY9GfjGcW0FPpi-tWPfK.ttf', woff: 'https://fonts.gstatic.com/s/pangolin/v12/cY9GfjGcW0FPpi-tWPfK.ttf', value: 'Pangolin', font_family: 'Pangolin', size: 0, lang: 'en', woff_size: 0 },
          { id: 1029, alias: 'Philosopher', preview: '', ttf: 'https://fonts.gstatic.com/s/philosopher/v21/vEFV2_5QCwIS4_Dhez5jcVBp.ttf', woff: 'https://fonts.gstatic.com/s/philosopher/v21/vEFV2_5QCwIS4_Dhez5jcVBp.ttf', value: 'Philosopher', font_family: 'Philosopher', size: 0, lang: 'en', woff_size: 0 },
          { id: 1010, alias: 'Playfair Display', preview: '', ttf: 'https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvUDQ.ttf', woff: 'https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvUDQ.ttf', value: 'Playfair Display', font_family: 'Playfair Display', size: 0, lang: 'en', woff_size: 0 },
          { id: 1035, alias: 'Poiret One', preview: '', ttf: 'https://fonts.gstatic.com/s/poiretone/v18/UqyVK80NJXN4zfRgbdfbk5k.ttf', woff: 'https://fonts.gstatic.com/s/poiretone/v18/UqyVK80NJXN4zfRgbdfbk5k.ttf', value: 'Poiret One', font_family: 'Poiret One', size: 0, lang: 'en', woff_size: 0 },
          { id: 1034, alias: 'Prata', preview: '', ttf: 'https://fonts.gstatic.com/s/prata/v22/6xKhdSpbNNCT-vWI.ttf', woff: 'https://fonts.gstatic.com/s/prata/v22/6xKhdSpbNNCT-vWI.ttf', value: 'Prata', font_family: 'Prata', size: 0, lang: 'en', woff_size: 0 },
          { id: 1039, alias: 'Press Start 2P', preview: '', ttf: 'https://fonts.gstatic.com/s/pressstart2p/v16/e3t4euO8T-267oIAQAu6jDQyK0nS.ttf', woff: 'https://fonts.gstatic.com/s/pressstart2p/v16/e3t4euO8T-267oIAQAu6jDQyK0nS.ttf', value: 'Press Start 2P', font_family: 'Press Start 2P', size: 0, lang: 'en', woff_size: 0 },
          { id: 1007, alias: 'PT Sans', preview: '', ttf: 'https://fonts.gstatic.com/s/ptsans/v18/jizaRExUiTo99u79P0U.ttf', woff: 'https://fonts.gstatic.com/s/ptsans/v18/jizaRExUiTo99u79P0U.ttf', value: 'PT Sans', font_family: 'PT Sans', size: 0, lang: 'en', woff_size: 0 },
          { id: 1008, alias: 'PT Serif', preview: '', ttf: 'https://fonts.gstatic.com/s/ptserif/v19/EJRVQgYoZZY2vCFuvDFR.ttf', woff: 'https://fonts.gstatic.com/s/ptserif/v19/EJRVQgYoZZY2vCFuvDFR.ttf', value: 'PT Serif', font_family: 'PT Serif', size: 0, lang: 'en', woff_size: 0 },
          { id: 1006, alias: 'Raleway', preview: '', ttf: 'https://fonts.gstatic.com/s/raleway/v37/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaooCP.ttf', woff: 'https://fonts.gstatic.com/s/raleway/v37/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaooCP.ttf', value: 'Raleway', font_family: 'Raleway', size: 0, lang: 'en', woff_size: 0 },
          { id: 1001, alias: 'Roboto', preview: '', ttf: 'https://fonts.gstatic.com/s/roboto/v51/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbWmT.ttf', woff: 'https://fonts.gstatic.com/s/roboto/v51/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbWmT.ttf', value: 'Roboto', font_family: 'Roboto', size: 0, lang: 'en', woff_size: 0 },
          { id: 1011, alias: 'Rubik', preview: '', ttf: 'https://fonts.gstatic.com/s/rubik/v31/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-B4i1UA.ttf', woff: 'https://fonts.gstatic.com/s/rubik/v31/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-B4i1UA.ttf', value: 'Rubik', font_family: 'Rubik', size: 0, lang: 'en', woff_size: 0 },
          { id: 1022, alias: 'Russo One', preview: '', ttf: 'https://fonts.gstatic.com/s/russoone/v18/Z9XUDmZRWg6M1LvRYsH-yA.ttf', woff: 'https://fonts.gstatic.com/s/russoone/v18/Z9XUDmZRWg6M1LvRYsH-yA.ttf', value: 'Russo One', font_family: 'Russo One', size: 0, lang: 'en', woff_size: 0 },
          { id: 1027, alias: 'Source Sans 3', preview: '', ttf: 'https://fonts.gstatic.com/s/sourcesans3/v19/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8Ky461EN.ttf', woff: 'https://fonts.gstatic.com/s/sourcesans3/v19/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8Ky461EN.ttf', value: 'Source Sans 3', font_family: 'Source Sans 3', size: 0, lang: 'en', woff_size: 0 },
          { id: 1047, alias: 'Spectral', preview: '', ttf: 'https://fonts.gstatic.com/s/spectral/v15/rnCr-xNNww_2s0amA-M-.ttf', woff: 'https://fonts.gstatic.com/s/spectral/v15/rnCr-xNNww_2s0amA-M-.ttf', value: 'Spectral', font_family: 'Spectral', size: 0, lang: 'en', woff_size: 0 },
          { id: 1050, alias: 'Tektur', preview: '', ttf: 'https://fonts.gstatic.com/s/tektur/v6/XoHN2YHtS7q969kXCjzlV0aSkS_o8OacmTe0TYlYFot8TrwuVYtO.ttf', woff: 'https://fonts.gstatic.com/s/tektur/v6/XoHN2YHtS7q969kXCjzlV0aSkS_o8OacmTe0TYlYFot8TrwuVYtO.ttf', value: 'Tektur', font_family: 'Tektur', size: 0, lang: 'en', woff_size: 0 },
          { id: 1020, alias: 'Ubuntu', preview: '', ttf: 'https://fonts.gstatic.com/s/ubuntu/v21/4iCs6KVjbNBYlgo6eA.ttf', woff: 'https://fonts.gstatic.com/s/ubuntu/v21/4iCs6KVjbNBYlgo6eA.ttf', value: 'Ubuntu', font_family: 'Ubuntu', size: 0, lang: 'en', woff_size: 0 },
          { id: 1040, alias: 'Unbounded', preview: '', ttf: 'https://fonts.gstatic.com/s/unbounded/v12/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG6xjx040.ttf', woff: 'https://fonts.gstatic.com/s/unbounded/v12/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG6xjx040.ttf', value: 'Unbounded', font_family: 'Unbounded', size: 0, lang: 'en', woff_size: 0 },
          { id: 1043, alias: 'Vollkorn', preview: '', ttf: 'https://fonts.gstatic.com/s/vollkorn/v30/0ybgGDoxxrvAnPhYGzMlQLzuMasz6Df2MHGuGQ.ttf', woff: 'https://fonts.gstatic.com/s/vollkorn/v30/0ybgGDoxxrvAnPhYGzMlQLzuMasz6Df2MHGuGQ.ttf', value: 'Vollkorn', font_family: 'Vollkorn', size: 0, lang: 'en', woff_size: 0 },
          { id: 1041, alias: 'Yanone Kaffeesatz', preview: '', ttf: 'https://fonts.gstatic.com/s/yanonekaffeesatz/v32/3y9I6aknfjLm_3lMKjiMgmUUYBs04aUXNxt9gW2LIfto9tWpcA.ttf', woff: 'https://fonts.gstatic.com/s/yanonekaffeesatz/v32/3y9I6aknfjLm_3lMKjiMgmUUYBs04aUXNxt9gW2LIfto9tWpcA.ttf', value: 'Yanone Kaffeesatz', font_family: 'Yanone Kaffeesatz', size: 0, lang: 'en', woff_size: 0 },
          { id: 1030, alias: 'Yeseva One', preview: '', ttf: 'https://fonts.gstatic.com/s/yesevaone/v24/OpNJno4ck8vc-xYpwWWxpio.ttf', woff: 'https://fonts.gstatic.com/s/yesevaone/v24/OpNJno4ck8vc-xYpwWWxpio.ttf', value: 'Yeseva One', font_family: 'Yeseva One', size: 0, lang: 'en', woff_size: 0 },
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

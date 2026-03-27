/*
 * @Description: Image upload helper (replaces GitHub API with local upload)
 */
import api from '@/api/material'

const putPic = async (file: File | string): Promise<string> => {
  // If it's a base64 string, convert to File
  let blob: File
  if (typeof file === 'string') {
    const byteCharacters = atob(file)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    blob = new File([byteArray], `upload_${Date.now()}.png`, { type: 'image/png' })
  } else {
    blob = file
  }

  const result = await api.upload({ file: blob, folder: 'psd' }, () => {})
  return (result as any)?.url || ''
}

export default { putPic }

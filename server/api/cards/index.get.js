// server/api/cards/index.get.js
import { parseMarkdownFiles } from '../../utils/markdownParser.js'

export default defineEventHandler(async (event) => {
  try {
    const cards = await parseMarkdownFiles()
    
    return {
      success: true,
      data: cards,
      count: cards.length
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка загрузки карточек'
    })
  }
})
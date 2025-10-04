// server/api/cards/[id].get.js
import { parseMarkdownFiles } from '../../utils/markdownParser.js'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  try {
    const cards = await parseMarkdownFiles()
    const card = cards.find(card => card.id === id)
    
    if (!card) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Карточка не найдена'
      })
    }
    
    return {
      success: true,
      data: card
    }
  } catch (error) {
    if (error.statusCode) throw error
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка загрузки карточки'
    })
  }
})
import path from 'path'
import fs from 'fs'
import matter from "gray-matter";

export const parseMarkdownFiles = () => {
    const contentDir = path.join(process.cwd(), 'server/content/docs')
    const instructions = []

    for (const folder of fs.readdirSync(contentDir)) {
        const filePath = path.join(contentDir, folder, 'cards.md')

        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf-8')
            const {data: frontmatter, content} = matter(fileContent)

            instructions.push({
                ...frontmatter,
                steps: parseMarkdownContent(content),
            })
        }
    }

    return instructions.sort((a, b) => a.order - b.order)
}

const parseMarkdownContent = (content) => {
    const steps = []
    // Очищаем символы \r для предотвращения hydration mismatch
    const cleanContent = content.replace(/\r/g, '')
    const sections = cleanContent.split('---')
    
    console.log('Parsing content, sections found:', sections.length)
    
    for (const section of sections) {
        if (section.trim()) {
            const step = parseStep(section)
            console.log('Parsed step:', step)
            if (step) steps.push(step)
        }
    }
    
    console.log('Total steps parsed:', steps.length)
    return steps
}

const parseStep = (section) => {
    const lines = section.trim().split('\n')
    const step = {}
    let currentInstructionType = null
    let currentInstructions = []
    
    for (const line of lines) {
      if (line.startsWith('## Шаг')) {
        const match = line.match(/Шаг (\d+): (.+)/)
        if (match) {
          step.number = match[1].padStart(2, '0')
          step.title = match[2]
        }
      } else if (line.startsWith('**Команда:**')) {
        step.type = 'command'
        step.command = line.replace(/^\*\*Команда:\*\*\s*/, '').trim().replace(/`/g, '')
        console.log('Added main command:', step.command)
      } else if (line.match(/^\*\*Команда\s+([^:]+):\*\*/)) {
        // Универсальная обработка альтернативных команд
        const match = line.match(/^\*\*Команда\s+([^:]+):\*\*\s*(.+)/)
        if (match) {
          // Преобразуем название команды в нижний регистр и убираем пробелы
          const commandType = match[1].toLowerCase().replace(/\s+/g, '')
          const commandText = match[2].trim().replace(/`/g, '')
          
          if (!step.command) {
            step.type = 'command'
            step.command = commandText
          }
          
          // Сохраняем альтернативные команды
          if (!step.alternativeCommands) {
            step.alternativeCommands = {}
          }
          step.alternativeCommands[commandType] = commandText
          console.log(`Added ${commandType} command:`, commandText)
        }
      } else if (line.startsWith('**Действие:**')) {
        step.type = 'button'
        const buttonMatch = line.match(/\[(.+)\]\((.+)\)/)
        if (buttonMatch) {
          step.buttonText = buttonMatch[1]
          step.buttonAction = buttonMatch[2].includes('git.rosatomtech.ru') ? 'openGogs' : 'openPreprod'
          step.buttonIcon = 'material-symbols:open-in-new'
        }
      } else if (line.startsWith('**Инструкции:**')) {
        step.instructions = []
        currentInstructionType = null
        currentInstructions = []
      } else if (line.match(/^\*\*Инструкции\s+([^:]+):\*\*/)) {
        // Сохраняем предыдущие инструкции, если они были
        if (currentInstructionType && currentInstructions.length > 0) {
          if (!step.alternativeInstructions) {
            step.alternativeInstructions = {}
          }
          step.alternativeInstructions[currentInstructionType] = currentInstructions.join('\n')
        }
        
        // Начинаем новые альтернативные инструкции
        const match = line.match(/^\*\*Инструкции\s+([^:]+):\*\*/)
        if (match) {
          currentInstructionType = match[1].toLowerCase().replace(/\s+/g, '')
          currentInstructions = []
        }
      } else if (line.startsWith('**Конфиг:**')) {
        step.config = []
        // Проверяем, есть ли параметр name после двоеточия
        const configMatch = line.match(/\*\*Конфиг:\*\*\s*(.+)/)
        if (configMatch && configMatch[1].trim()) {
          step.configName = configMatch[1].trim()
        }
        currentInstructionType = null
        currentInstructions = []
      } else if (line.startsWith('- ') && (step.instructions || currentInstructionType)) {
        const instructionText = line.replace('- ', '').replace(/\r/g, '')
        if (currentInstructionType) {
          currentInstructions.push(instructionText)
        } else {
          step.instructions.push(instructionText)
        }
      } else if (line.trim() && step.config && !line.startsWith('##') && !line.startsWith('**') && !line.startsWith('---') && !line.startsWith('- ')) {
        step.config.push(line.replace(/\r/g, ''))
      }
    }
    
    // Сохраняем последние альтернативные инструкции
    if (currentInstructionType && currentInstructions.length > 0) {
      if (!step.alternativeInstructions) {
        step.alternativeInstructions = {}
      }
      step.alternativeInstructions[currentInstructionType] = currentInstructions.join('\n')
    }
    
    // Если нет типа, но есть инструкции - делаем информационным шагом
    if (!step.type && step.instructions && step.instructions.length > 0) {
      step.type = 'info'
    }
    
    return Object.keys(step).length > 0 ? step : null
  }
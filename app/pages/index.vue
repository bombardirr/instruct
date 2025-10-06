<script setup>
import Sidebar from "~/components/layout/Sidebar/Sidebar.vue";
import Manual from "~/components/ui/Manual/Manual.vue";
import styles from './index.module.css'

// Импорт GSAP для скролла
import {gsap} from 'gsap'
import {ScrollToPlugin} from 'gsap/ScrollToPlugin'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

// Регистрация плагинов GSAP
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

const {data: cardsResponse} = await useFetch('/api/cards')
const cards = cardsResponse.value?.data || []

const activeComponent = ref('ssh')
const isScrollingProgrammatically = ref(false) // Флаг для отслеживания программного скролла

// Маппинг между сайдбаром и карточками
const cardMapping = {
  'ssh': 'ssh-setup',           // Настройка SSH
  'ide': 'ide-setup',           // Удаленная разработка
  'git': 'git-workflow',        // Работа с GIT
  'npm': 'npm-package-manager', // Работа с NPM
  'vue': 'vue-development',     // Разработка на Vue
  'deploy': 'deployment'        // Деплой проекта
}

const activeCardId = computed(() => {
  return cardMapping[activeComponent.value] || 'ssh-setup'
})

// Находим активную карточку на основе выбранной в сайдбаре
const visibleCard = computed(() => {
  const targetId = activeCardId.value
  return cards.find(card => card.id === targetId)
})


// GSAP функция плавного скролла
const smoothScrollToCard = (cardId) => {
  const contentContainer = document.querySelector('div[class*="home__content"]')
  if (!contentContainer) return

  const cardElement = document.querySelector(`[data-card-id="${cardId}"]`)
  if (!cardElement) return

  // Устанавливаем флаг программного скролла
  isScrollingProgrammatically.value = true

  // Используем GSAP ScrollToPlugin для плавного скролла
  gsap.to(contentContainer, {
    duration: 1.2,
    ease: "power2.out",
    scrollTo: {
      y: cardElement,
      offsetY: 60 // 60px отступ сверху
    },
    onComplete: () => {
      // Сбрасываем флаг после завершения анимации
      setTimeout(() => {
        isScrollingProgrammatically.value = false
      }, 200) // Небольшая задержка для устойчивости
    }
  })
}

const handleSidebarClick = (item) => {
  activeComponent.value = item.id

  const targetCardId = cardMapping[item.id]

  // Используем GSAP для скролла
  setTimeout(() => {
    smoothScrollToCard(targetCardId)
  }, 150)
}

const handleMoreClick = (item) => {
  activeComponent.value = item.id

  const targetCardId = cardMapping[item.id]

  // Используем GSAP для скролла
  setTimeout(() => {
    smoothScrollToCard(targetCardId)
  }, 150)
}

// ScrollTrigger для детекции видимости карточек
let scrollTriggers = []

// Создаем ScrollTrigger для каждой карточки
onMounted(() => {
  const tryCreateScrollTriggers = (attempt = 1, maxAttempts = 5) => {
    const contentContainer = document.querySelector('div[class*="home__content"]')

    if (contentContainer && cards.length > 0) {
      // Создаем ScrollTrigger для каждой карточки
      cards.forEach((card, index) => {
        const triggerSelector = `[data-card-id="${card.id}"] h1`
        const headerElement = document.querySelector(triggerSelector)

        if (headerElement) {
          // Для первой карточки (SSH) делаем более чувствительный триггер
          const isFirstCard = (card.id === 'ssh-setup')

          const trigger = ScrollTrigger.create({
            trigger: headerElement,
            start: isFirstCard ? "top top" : "top 60%", // Первая карточка активируется в самом верху
            end: isFirstCard ? "bottom top" : "bottom 40%", // Разные зоны для разных карточек
            scroller: contentContainer,

            onEnter: () => {
              // При входе в зону активируем соответствующий элемент сайдбара
              // НО только если это не программный скролл
              if (!isScrollingProgrammatically.value) {
                const sidebarItemId = Object.keys(cardMapping).find(key =>
                    cardMapping[key] === card.id
                )
                if (sidebarItemId && sidebarItemId !== activeComponent.value) {
                  activeComponent.value = sidebarItemId
                }
              }
            },

            onEnterBack: () => {
              // При возврате назад тоже активируем элемент
              // НО только если это не программный скролл
              if (!isScrollingProgrammatically.value) {
                const sidebarItemId = Object.keys(cardMapping).find(key =>
                    cardMapping[key] === card.id
                )
                if (sidebarItemId && sidebarItemId !== activeComponent.value) {
                  activeComponent.value = sidebarItemId
                }
              }
            }
          })

          scrollTriggers.push(trigger)
        }
      })

      // Обновляем ScrollTrigger после создания всех триггеров
      ScrollTrigger.refresh()

      // Устанавливаем первую карточку как активную по умолчанию
      setTimeout(() => {
        if (scrollTriggers.length > 0 && activeComponent.value === 'ssh') {
          // Проверяем если мы в самом верху - активируем SSH
          const firstTrigger = scrollTriggers[0]
          const scrollPosition = firstTrigger.scroll()

          if (scrollPosition <= 50) { // Если скролл в позиции менее 50px - мы вверху страницы
            activeComponent.value = 'ssh'
          }
        }
      }, 100)

      // Добавляем дополнительную защиту - обновляем активный элемент после завершения программного скролла
      const originalRefresh = ScrollTrigger.refresh
      ScrollTrigger.refresh = function (...args) {
        originalRefresh.apply(this, args)

        // Если не программный скролл, обновляем активный элемент
        if (!isScrollingProgrammatically.value) {
          setTimeout(() => {
            scrollTriggers.forEach(trigger => {
              if (trigger.isActive) {
                const triggerElement = trigger.trigger
                const headerText = triggerElement?.textContent?.trim()
                if (headerText) {
                  const matchingCard = cards.find(card => card.title === headerText)
                  if (matchingCard) {
                    const sidebarItemId = Object.keys(cardMapping).find(key =>
                        cardMapping[key] === matchingCard.id
                    )
                    if (sidebarItemId) {
                      activeComponent.value = sidebarItemId
                    }
                  }
                }
              }
            })
          }, 100)
        }
      }

      return true
    } else {
      if (attempt < maxAttempts) {
        setTimeout(() => {
          tryCreateScrollTriggers(attempt + 1, maxAttempts)
        }, attempt * 200)
      }
      return false
    }
  }

  nextTick(() => {
    tryCreateScrollTriggers()
  })
})

// Удаляем ScrollTrigger при размонтировании
onUnmounted(() => {
  scrollTriggers.forEach(trigger => trigger.kill())
  scrollTriggers = []
})
</script>

<template>
  <div :class="styles.home">
    <Sidebar :active-item="activeComponent" @item-click="handleSidebarClick" @more-click="handleMoreClick"/>
    <div :class="styles.home__content">
      <div v-if="cards.length === 0" class="loading">Загрузка карточек...</div>
      <Manual
          v-for="card in cards"
          v-else
          :key="card.id"
          :active-sidebar-item="activeComponent"
          :class="styles.card__block"
          :config="card"
          :data-card-id="card.id"
      />
    </div>
  </div>
</template>
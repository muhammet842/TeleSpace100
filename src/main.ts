import './styles/teletext.css'
import { findPage, type TeletextPage } from './components/pages'
import { fetchSpaceWeather, type SpaceWeatherData } from './services/noaa'
import { listenForPageNumbers } from './utils/keyboard'
import { fetchApod, type ApodData } from './services/nasa'
import { fetchSpaceNews, type SpaceNewsArticle } from './services/news'

const screen = document.querySelector<HTMLElement>('#teletext-screen')

if (!screen) {
  throw new Error('Teletext screen could not be found.')
}

const teletextScreen = screen
teletextScreen.innerHTML = '<div class="screen-content"></div>'
const pageContent = teletextScreen.querySelector<HTMLElement>('.screen-content')

if (!pageContent) {
  throw new Error('Teletext content could not be created.')
}

const renderedPage = pageContent
let activePageNumber = 100
let currentNews: SpaceNewsArticle[] = []

function formatTime(timeTag: string) {
  const date = new Date(timeTag)
  return Number.isNaN(date.getTime())
    ? timeTag
    : `${date.toLocaleDateString('en-GB')} ${date.toLocaleTimeString('en-GB', { timeZone: 'UTC' })} UTC`
}

function currentUtcTime() {
  return new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC'
}

function openArticle(index: number) {
  const article = currentNews[index]
  if (activePageNumber === 400 && article) {
    window.open(article.url, '_blank')
  }
}

function drawPage(
  page: TeletextPage,
  weather?: SpaceWeatherData,
  apod?: ApodData,
  news?: SpaceNewsArticle[],
  message?: string,
) {
  teletextScreen.className = `page-${page.color}`
  teletextScreen.style.removeProperty('--apod-image')

  if (page.number === 300 && apod) {
    teletextScreen.classList.add('apod-background')
    teletextScreen.style.setProperty('--apod-image', `url("${apod.url}")`)
  }

  renderedPage.innerHTML = `
      <header class="screen-header">
        <span>TELESPACE 100</span>
        <span class="page-number">P${page.number}</span>
      </header>
      <section aria-live="polite">
        <h1 class="screen-title">${page.title}</h1>

        ${
          news
            ? `
          <p class="screen-line news-clock">UTC: ${currentUtcTime()}</p>
          <div class="news-list">
            ${news.map((article, index) => `
              <button class="news-item" type="button" data-news-index="${index}" aria-label="Open article ${index + 1}: ${article.title}">
                <span class="news-number">${index + 1}.</span>
                <span class="news-title">${article.title}</span>
                <span class="news-source">${article.news_site} / ${formatTime(article.published_at)}</span>
              </button>
            `).join('')}
          </div>
        `
            : weather
            ? `
          <p class="screen-line">LATEST NOAA READING</p>
          <p class="screen-line">KP INDEX: ${weather.kpIndex.toFixed(1)}</p>
          <p class="screen-line">MEASURED: ${formatTime(weather.timeTag)}</p>
          <p class="screen-line status-${weather.status.color}">${weather.status.text}</p>
        `
            : apod
              ? `
          <p class="screen-line">TITLE: ${apod.title}</p>
          <p class="screen-line">DATE: ${apod.date}</p>
          <p class="screen-line apod-text">${apod.explanation}</p>
        `
              : message
                ? `<p class="screen-line">${message}</p>`
                : page.lines
                    .map((line) => `<p class="screen-line">${line || '&nbsp;'}</p>`)
                    .join('')
        }
      </section>
      <footer class="screen-footer">
        <span>${news ? 'CLICK AN ARTICLE TO OPEN EXTERNAL SITE' : 'WAITING FOR INPUT...'}</span>
      </footer>
  `

  renderedPage.querySelectorAll<HTMLButtonElement>('[data-news-index]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault()
      openArticle(Number(button.dataset.newsIndex))
    })
  })
}

async function openPage(pageNumber: number) {
  activePageNumber = pageNumber
  const page = findPage(pageNumber)
 
  if(page.number === 200)
  {
    drawPage(page, undefined, undefined, undefined, 'P200 - LOADING NOAA DATA...')

    try
    {
        const weather = await fetchSpaceWeather()

        if(activePageNumber === pageNumber) drawPage(page, weather)
    }

    catch{
        if(activePageNumber === pageNumber)
        {
            drawPage(page, undefined, undefined, undefined, 'DATA IS NOT AVAILABLE')
        }
    }

    return
  }

  if(page.number === 300)
  {
    drawPage(page, undefined, undefined, undefined, 'P300 - LOADING NASA APOD DATA...')
    const apod = await fetchApod()

    if(activePageNumber !== pageNumber)
    {
        return
    }

    if(apod)
    {
        drawPage(page, undefined, apod)
    }
    else{
        drawPage(page, undefined, undefined, undefined, 'DATA IS NOT AVAILABLE')
    }

    return
  }

  if (page.number === 400) {
    currentNews = []
    drawPage(page, undefined, undefined, undefined, 'P400 - FETCHING SPACE NEWS DATA...')

    try {
      const news = await fetchSpaceNews()

      if (activePageNumber !== pageNumber) return

      currentNews = news
      drawPage(page, undefined, undefined, news)
    } catch {
      if (activePageNumber === pageNumber) {
        drawPage(page, undefined, undefined, undefined, 'DATA UNAVAILABLE - TRY AGAIN LATER')
      }
    }

    return
  }

  drawPage(page)
}

openPage(100)
listenForPageNumbers(teletextScreen, (pageNumber) => void openPage(pageNumber))
teletextScreen.focus()

import './styles/teletext.css'
import { findPage, type TeletextPage } from './components/pages'
import { listenForPageNumbers } from './utils/keyboard'

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

function drawPage(page: TeletextPage) {
  teletextScreen.className = `page-${page.color}`
  renderedPage.innerHTML = `
      <header class="screen-header">
        <span>TELESPACE 100</span>
        <span class="page-number">P${page.number}</span>
      </header>
      <section aria-live="polite">
        <h1 class="screen-title">${page.title}</h1>
        ${page.lines.map((line) => `<p class="screen-line">${line || '&nbsp;'}</p>`).join('')}
      </section>
      <footer class="screen-footer">
        <span>GIRIS BEKLENIYOR</span>
      </footer>
  `
}

drawPage(findPage(100))
listenForPageNumbers(teletextScreen, (pageNumber) => drawPage(findPage(pageNumber)))
teletextScreen.focus()

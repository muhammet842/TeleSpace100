export type TeletextPage = {
  number: number
  title: string
  lines: string[]
  color: 'green' | 'yellow' | 'red' | 'blue' | 'white'
}

export const pages: TeletextPage[] = [
  {
    number: 100,
    title: 'TELESPACE 100',
    color: 'green',
    lines: [
      'NEW TAB SYSTEM READY',
      '',
      'ENTER PAGE NUMBER',
      '100  MAIN MENU',
      '200  SPACE WEATHER',
      '300  NASA APOD',
      '',
      'TELESPACE 100 / 1984-2026',
    ],
  },
  {
    number: 200,
    title: 'SPACE WEATHER',
    color: 'yellow',
    lines: ['COMING SOON: LIVE SPACE', 'AND SKY INFORMATION'],
  },
  {
    number: 300,
    title: 'NASA APOD',
    color: 'blue',
    lines: ['COMING SOON: NASA\'S', 'ASTRONOMY PICTURE OF THE DAY'],
  },
]

export function findPage(pageNumber: number): TeletextPage {
  return pages.find((page) => page.number === pageNumber) ?? pages[0]
}

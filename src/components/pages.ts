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
      'YENI SEKME SISTEMI HAZIR',
      '',
      'BIR SAYFA NUMARASI GIRIN',
      '100  ANA SAYFA',
      '200  UZAY HABERLERI',
      '300  HAVA DURUMU',
      '',
      'TELESPACE 100 / 1984-2026',
    ],
  },
  {
    number: 200,
    title: 'UZAY HABERLERI',
    color: 'yellow',
    lines: ['YAKINDA: GERCEK ZAMANLI', 'UZAY VE GOKYUZU BILGILERI'],
  },
  {
    number: 300,
    title: 'HAVA DURUMU',
    color: 'blue',
    lines: ['YAKINDA: BUGUNUN', 'YEREL HAVA DURUMU'],
  },
]

export function findPage(pageNumber: number): TeletextPage {
  return pages.find((page) => page.number === pageNumber) ?? pages[0]
}

const NEWS_URL = 'https://api.spaceflightnewsapi.net/v4/articles/?limit=4'

export type SpaceNewsArticle = {
  title: string
  news_site: string
  published_at: string
  url: string
}

type NewsResponse = {
  results?: Partial<SpaceNewsArticle>[]
}

export async function fetchSpaceNews(): Promise<SpaceNewsArticle[]> {
  const response = await fetch(NEWS_URL)

  if (!response.ok) {
    throw new Error(`Space news request failed: ${response.status}`)
  }

  const data = (await response.json()) as NewsResponse
  const articles = data.results ?? []

  if (articles.length === 0) {
    throw new Error('Space news returned no articles')
  }

  const validArticles = articles.slice(0, 4).filter((article): article is SpaceNewsArticle => (
    Boolean(article.title && article.news_site && article.published_at && article.url)
  ))

  if (validArticles.length === 0) {
    throw new Error('Space news returned incomplete articles')
  }

  return validArticles
}

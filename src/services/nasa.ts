const NASA_URL = `https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_API_KEY}`

export type ApodData = {
    title: string
    date: string
    explanation: string
    url: string
    media_type: string
}

export async function fetchApod(): Promise<ApodData | null> {
    try 
    {
        const response = await fetch(NASA_URL)
        if(!response.ok)
        {
            throw new Error(`NASA request failed: ${response.status}`)
        }

        const data = (await response.json()) as Partial<ApodData>

        if(!data.title || !data.date || !data.explanation || !data.url || data.media_type !== 'image')
        {
            throw new Error('NASA returned incomplete APOD data')
        }

        return {
            title: data.title,
            date: data.date,
            explanation: data.explanation,
            url: data.url,
            media_type: data.media_type,
        }
    }

    catch(error)
    {
        console.error('Error fetching APOD data:', error)
        return null
    }
}
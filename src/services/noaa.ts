const NOAA_URL = 'https://services.swpc.noaa.gov/json/planetary_k_index_1m.json'

export type SpaceWeatherStatus = {
  text: 'QUIET / NORMAL' | 'UNSETTLED' | 'GEOMAGNETIC STORM WARNING'
  color: 'green' | 'yellow' | 'red'
}

export type SpaceWeatherData = {
  timeTag: string
  kpIndex: number
  status: SpaceWeatherStatus
}

type NoaaKpPoint = {
  time_tag?: string
  kp_index?: number | string
}

export function getKpStatus(kpIndex: number): SpaceWeatherStatus {
  if (kpIndex < 4) {
    return { text: 'QUIET / NORMAL', color: 'green' }
  }

  if (kpIndex === 4) {
    return { text: 'UNSETTLED', color: 'yellow' }
  }

  return { text: 'GEOMAGNETIC STORM WARNING', color: 'red' }
}

export async function fetchSpaceWeather(): Promise<SpaceWeatherData> {
  const response = await fetch(NOAA_URL)

  if (!response.ok) {
    throw new Error(`NOAA request failed: ${response.status}`)
  }

  const points = (await response.json()) as NoaaKpPoint[]
  const latestPoint = points[points.length - 1]
  const kpIndex = Number(latestPoint?.kp_index)

  if (!latestPoint?.time_tag || !Number.isFinite(kpIndex)) {
    throw new Error('NOAA returned incomplete data')
  }

  return {
    timeTag: latestPoint.time_tag,
    kpIndex,
    status: getKpStatus(kpIndex),
  }
}

import { PhotosResponse, RoverManifest } from '@/app/types/mars';

const API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY || 'DEMO_KEY';
const BASE_URL = 'https://api.nasa.gov/mars-photos/api/v1';

// Cache simples em memória
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export interface FetchPhotosParams {
  rover: string;
  earthDate?: string;
  camera?: string;
  page?: number;
}

async function fetchWithCache(url: string): Promise<any> {
  // Verificar cache
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log('Using cached data for:', url);
    return cached.data;
  }

  // Buscar novos dados
  try {
    const response = await fetch(url);

    if (response.status === 429) {
      console.error('Rate limit exceeded. Using default data.');
      // Retornar dados vazios para evitar quebrar a aplicação
      return null;
    }

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return null;
    }

    const data = await response.json();

    // Armazenar no cache
    cache.set(url, { data, timestamp: Date.now() });

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export async function fetchMarsPhotos({
  rover,
  earthDate,
  camera,
  page = 1,
}: FetchPhotosParams): Promise<PhotosResponse> {
  const params = new URLSearchParams({
    api_key: API_KEY,
    page: page.toString(),
  });

  if (earthDate) {
    params.append('earth_date', earthDate);
  } else {
    params.append('sol', '1000');
  }

  if (camera) {
    params.append('camera', camera.toLowerCase());
  }

  const url = `${BASE_URL}/rovers/${rover}/photos?${params.toString()}`;

  try {
    const data = await fetchWithCache(url);

    if (!data) {
      console.log('No data available, returning empty response');
      return { photos: [] };
    }

    return data;
  } catch (error) {
    console.error('Error fetching Mars photos:', error);
    return { photos: [] };
  }
}

export async function fetchRoverManifest(rover: string): Promise<RoverManifest | null> {
  const url = `${BASE_URL}/manifests/${rover}?api_key=${API_KEY}`;

  try {
    const data = await fetchWithCache(url);
    return data;
  } catch (error) {
    console.error('Error fetching rover manifest:', error);
    return null;
  }
}

export async function fetchLatestPhotos(rover: string): Promise<PhotosResponse> {
  const manifest = await fetchRoverManifest(rover);

  if (!manifest) {
    return { photos: [] };
  }

  const latestDate = manifest.photo_manifest.max_date;

  return fetchMarsPhotos({
    rover,
    earthDate: latestDate,
    page: 1,
  });
}
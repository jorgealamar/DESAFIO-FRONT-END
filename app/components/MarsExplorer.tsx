'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Filters, { FilterValues } from './Filters';
import PhotoGallery from './PhotoGallery';
import Pagination from './Pagination';
import { MarsPhoto } from '@/app/types/mars';
import { fetchMarsPhotos } from '@/app/services/nasaApi';

const PHOTOS_PER_PAGE = 25;
const REQUEST_DELAY = 1000; // Atraso de 1 segundo entre requests da API

export default function MarsExplorer() {
  const [photos, setPhotos] = useState<MarsPhoto[]>([]);
  const [allPhotos, setAllPhotos] = useState<MarsPhoto[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<MarsPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const lastRequestTime = useRef<number>(0);
  const [filters, setFilters] = useState<FilterValues>({
    rover: 'Curiosity',
    camera: '',
    earthDate: '',
    searchTerm: '',
  });

  const loadPhotos = useCallback(async () => {
    // Adicionar atraso entre requests para evitar limite de taxa
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime.current;
    if (timeSinceLastRequest < REQUEST_DELAY) {
      await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY - timeSinceLastRequest));
    }
    lastRequestTime.current = Date.now();

    setLoading(true);
    setError(null);
    try {
      const response = await fetchMarsPhotos({
        rover: filters.rover || 'Curiosity',
        earthDate: filters.earthDate,
        camera: filters.camera,
        page: 1,
      });

      const photosData = response.photos || [];

      if (photosData.length === 0 && !filters.earthDate && !filters.camera) {
        setError('Nenhuma foto encontrada. A API da NASA pode estar temporariamente limitada. Tente novamente em alguns minutos ou use uma data específica.');
      }

      setAllPhotos(photosData);
      applyFilters(photosData, filters);
    } catch (error) {
      console.error('Error loading photos:', error);
      setError('Erro ao carregar fotos. Por favor, tente novamente.');
      setAllPhotos([]);
      setFilteredPhotos([]);
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  }, [filters.rover, filters.earthDate, filters.camera]);

  const applyFilters = (photosData: MarsPhoto[], currentFilters: FilterValues) => {
    let filtered = [...photosData];

    if (currentFilters.searchTerm) {
      const searchLower = currentFilters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (photo) =>
          photo.rover.name.toLowerCase().includes(searchLower) ||
          photo.camera.name.toLowerCase().includes(searchLower) ||
          photo.camera.full_name.toLowerCase().includes(searchLower)
      );
    }

    setFilteredPhotos(filtered);
    setTotalPages(Math.ceil(filtered.length / PHOTOS_PER_PAGE));
    setCurrentPage(1);
    updateDisplayedPhotos(filtered, 1);
  };

  const updateDisplayedPhotos = (photosToDisplay: MarsPhoto[], page: number) => {
    const startIndex = (page - 1) * PHOTOS_PER_PAGE;
    const endIndex = startIndex + PHOTOS_PER_PAGE;
    setPhotos(photosToDisplay.slice(startIndex, endIndex));
  };

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
    if (
      newFilters.rover !== filters.rover ||
      newFilters.earthDate !== filters.earthDate ||
      newFilters.camera !== filters.camera
    ) {
      // Chamada de API necessária para mudança de rover, data ou câmera
      return;
    }
    // Apenas termo de busca mudou, aplicar filtragem local
    applyFilters(allPhotos, newFilters);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateDisplayedPhotos(filteredPhotos, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  return (
    <div>
      <Filters onFilterChange={handleFilterChange} />

      {error && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">{error}</p>
          <p className="text-xs text-yellow-600 mt-2">
            Dica: Use a chave DEMO_KEY tem limitações. Para melhor experiência,
            obtenha uma chave gratuita em <a href="https://api.nasa.gov" target="_blank" rel="noopener noreferrer" className="underline">api.nasa.gov</a>
          </p>
        </div>
      )}

      <div className="mb-4 text-sm text-gray-600">
        {!loading && !error && (
          <p>
            Mostrando {photos.length} de {filteredPhotos.length} fotos
            {filters.searchTerm && ` (filtradas por "${filters.searchTerm}")`}
          </p>
        )}
      </div>

      <PhotoGallery photos={photos} loading={loading} />

      {!loading && photos.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
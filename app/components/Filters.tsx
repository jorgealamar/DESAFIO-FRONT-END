'use client';

import { useState } from 'react';
import { ROVERS, CAMERAS, CAMERAS_BY_ROVER } from '@/app/types/mars';

interface FiltersProps {
  onFilterChange: (filters: FilterValues) => void;
}

export interface FilterValues {
  rover: string;
  camera: string;
  earthDate: string;
  searchTerm: string; // Mantido por compatibilidade mas não usado
}

export default function Filters({ onFilterChange }: FiltersProps) {
  const [filters, setFilters] = useState<FilterValues>({
    rover: 'Curiosity',
    camera: '',
    earthDate: '',
    searchTerm: '',
  });

  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    const newFilters = { ...filters, [key]: value };

    // Resetar filtro de câmera quando rover muda
    if (key === 'rover') {
      newFilters.camera = '';
    }

    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      rover: 'Curiosity',
      camera: '',
      earthDate: '',
      searchTerm: '',
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Filtros de Busca</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="rover" className="block text-sm font-medium text-gray-700 mb-2">
            Rover
          </label>
          <select
            id="rover"
            value={filters.rover}
            onChange={(e) => handleFilterChange('rover', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          >
            <option value="">Todos os Rovers</option>
            {ROVERS.map((rover) => (
              <option key={rover} value={rover}>
                {rover}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="camera" className="block text-sm font-medium text-gray-700 mb-2">
            Câmera
          </label>
          <select
            id="camera"
            value={filters.camera}
            onChange={(e) => handleFilterChange('camera', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          >
            <option value="">Todas as Câmeras</option>
            {Object.entries(
              filters.rover && filters.rover !== ''
                ? CAMERAS_BY_ROVER[filters.rover as keyof typeof CAMERAS_BY_ROVER] || {}
                : CAMERAS
            ).map(([key, value]) => (
              <option key={key} value={key}>
                {key} - {value}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
            Data Terrestre
          </label>
          <input
            type="date"
            id="date"
            value={filters.earthDate}
            onChange={(e) => handleFilterChange('earthDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          Limpar Filtros
        </button>
      </div>
    </div>
  );
}
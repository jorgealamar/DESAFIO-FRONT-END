import Image from 'next/image';
import { MarsPhoto } from '@/app/types/mars';

interface PhotoCardProps {
  photo: MarsPhoto;
}

export default function PhotoCard({ photo }: PhotoCardProps) {
  // Converter HTTP para HTTPS para imagens de rovers mais antigos
  const imageUrl = photo.img_src.replace('http://', 'https://');

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64 w-full">
        <Image
          src={imageUrl}
          alt={`Mars photo taken by ${photo.rover.name}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />
      </div>
      <div className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-blue-600">
              {photo.rover.name}
            </span>
            <span className="text-xs text-gray-500">
              ID: {photo.id}
            </span>
          </div>
          <div className="text-sm text-gray-700">
            <p>
              <span className="font-medium">Câmera:</span> {photo.camera.full_name}
            </p>
            <p>
              <span className="font-medium">Data:</span> {new Date(photo.earth_date + 'T00:00:00').toLocaleDateString('pt-BR')}
            </p>
            <p>
              <span className="font-medium">Sol:</span> {photo.sol} (dia marciano)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg"
              alt="NASA Logo"
              width={60}
              height={50}
              className="object-contain"
              unoptimized
            />
            <div>
              <h1 className="text-2xl font-bold">UniverseEx Mars Explorer</h1>
              <p className="text-sm text-gray-400">Explore as imagens capturadas pelos rovers da NASA em Marte</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
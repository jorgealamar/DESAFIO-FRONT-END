export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm text-gray-400">
              © 2025 UniverseEx - Explorando o espaço, expandindo horizontes - Jorge Alamar
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://api.nasa.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Powered by NASA API
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
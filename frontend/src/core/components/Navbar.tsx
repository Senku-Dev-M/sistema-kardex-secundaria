import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#002855] text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Topater Don Bosco" className="h-10 w-auto" />
        </Link>
        <div className="relative">
          <button
            onClick={() => setOpen((o) => !o)}
            className="bg-[#FFD60A] text-[#002855] px-4 py-2 rounded hover:bg-yellow-400"
          >
            Iniciar sesión
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-56 bg-white text-[#002855] rounded shadow-lg z-10">
              <Link
                to="/login/estudiante"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                Iniciar como Estudiante
              </Link>
              <Link
                to="/login/profesor"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                Iniciar como Profesor
              </Link>
              <Link
                to="/login/admin"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                Iniciar como Administrador
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

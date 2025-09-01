import { useState } from 'react';
import { httpClient } from '../../api/httpClient';

export default function ParentLogin() {
  const [ci, setCi] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrar con endpoint real (students/login-by-ci)
    try {
      const res = await httpClient.post('/students/login-by-ci', { ci, birthDate });
      alert(JSON.stringify(res.data, null, 2));
    } catch (err) {
      alert('Endpoint no implementado aún. ¡Perfecto para que Codex lo haga!');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Consulta para Padres</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">CI del Estudiante</label>
          <input
            className="w-full border rounded p-2"
            value={ci}
            onChange={(e) => setCi(e.target.value)}
            placeholder="Ejem: 12345678"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Fecha de Nacimiento</label>
          <input
            type="date"
            className="w-full border rounded p-2"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2">
          Consultar Kardex
        </button>
      </form>
    </div>
  );
}

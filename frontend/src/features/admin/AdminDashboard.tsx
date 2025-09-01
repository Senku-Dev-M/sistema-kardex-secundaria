import { useEffect, useState } from 'react';
import { httpClient } from '../../api/httpClient';

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  ci: string;
}

export default function AdminDashboard() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    httpClient.get<Student[]>('/students').then((res) => setStudents(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Administración de Estudiantes</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-1">CI</th>
            <th className="py-1">Nombre</th>
            <th className="py-1">Apellido</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="border-b">
              <td className="py-1">{s.ci}</td>
              <td className="py-1">{s.firstName}</td>
              <td className="py-1">{s.lastName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

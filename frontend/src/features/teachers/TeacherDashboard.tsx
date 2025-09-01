import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { httpClient } from '../../api/httpClient';

interface Assignment {
  id: number;
  subject: { id: number; name: string };
  course: { id: number; name: string };
}

export default function TeacherDashboard() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    httpClient
      .get<Assignment[]>('/teachers/me/assignments')
      .then((res) => setAssignments(res.data));
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Mis Asignaciones</h2>
        <Link
          to="/profesor/incidentes/nuevo"
          className="bg-[#002855] text-white px-4 py-2 rounded"
        >
          Registrar incidente
        </Link>
      </div>
      <ul className="space-y-2">
        {assignments.map((a) => (
          <li key={a.id} className="border p-3 rounded">
            <p>
              <span className="font-medium">Curso:</span> {a.course.name}
            </p>
            <p>
              <span className="font-medium">Materia:</span> {a.subject.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

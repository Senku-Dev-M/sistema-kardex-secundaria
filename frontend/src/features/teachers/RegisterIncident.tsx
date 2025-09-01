import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { httpClient } from '../../api/httpClient';

interface Assignment {
  id: number;
  subject: { id: number; name: string };
  course: { id: number; name: string };
}

interface Student {
  id: number;
  firstName: string;
  lastName: string;
}

interface IncidentType {
  id: number;
  name: string;
}

const schema = yup.object({
  assignmentId: yup.number().required('Asignación requerida'),
  studentId: yup.number().required('Estudiante requerido'),
  incidentTypeId: yup
    .number()
    .required('Tipo de incidente requerido'),
  description: yup.string().notRequired(),
});

interface FormData {
  assignmentId: number;
  studentId: number;
  incidentTypeId: number;
  description?: string;
}

export default function RegisterIncident() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [incidentTypes, setIncidentTypes] = useState<IncidentType[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormData>({ resolver: yupResolver(schema) as any });

  useEffect(() => {
    httpClient
      .get<Assignment[]>('/teachers/me/assignments')
      .then((res) => setAssignments(res.data));
    httpClient
      .get<IncidentType[]>('/incident-types')
      .then((res) => setIncidentTypes(res.data));
  }, []);

  const assignmentId = watch('assignmentId');

  useEffect(() => {
    if (assignmentId) {
      const assignment = assignments.find((a) => a.id === assignmentId);
      if (assignment) {
        httpClient
          .get<Student[]>(`/courses/${assignment.course.id}/students`)
          .then((res) => setStudents(res.data));
        setValue('studentId', undefined as any);
      }
    }
  }, [assignmentId, assignments, setValue]);

  const onSubmit = async (data: FormData) => {
    const assignment = assignments.find((a) => a.id === data.assignmentId);
    if (!assignment) return;
    await httpClient.post('/incidents', {
      studentId: data.studentId,
      subjectId: assignment.subject.id,
      incidentTypeId: data.incidentTypeId,
      description: data.description,
    });
    alert('Incidente registrado correctamente');
    navigate('/profesor');
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Registrar Incidente</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Asignación</label>
          <select
            className="w-full border rounded p-2"
            {...register('assignmentId', { valueAsNumber: true })}
          >
            <option value="">Seleccione</option>
            {assignments.map((a) => (
              <option key={a.id} value={a.id}>
                {`${a.course.name} - ${a.subject.name}`}
              </option>
            ))}
          </select>
          {errors.assignmentId && (
            <p className="text-red-500 text-sm">
              {errors.assignmentId.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Estudiante</label>
          <select
            className="w-full border rounded p-2"
            {...register('studentId', { valueAsNumber: true })}
            disabled={!assignmentId}
          >
            <option value="">Seleccione</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {`${s.firstName} ${s.lastName}`}
              </option>
            ))}
          </select>
          {errors.studentId && (
            <p className="text-red-500 text-sm">
              {errors.studentId.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Tipo de Incidente</label>
          <select
            className="w-full border rounded p-2"
            {...register('incidentTypeId', { valueAsNumber: true })}
          >
            <option value="">Seleccione</option>
            {incidentTypes.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          {errors.incidentTypeId && (
            <p className="text-red-500 text-sm">
              {errors.incidentTypeId.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Descripción (opcional)</label>
          <textarea
            className="w-full border rounded p-2"
            {...register('description')}
          />
        </div>

        <button
          type="submit"
          className="bg-[#002855] text-white rounded px-4 py-2 w-full"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}


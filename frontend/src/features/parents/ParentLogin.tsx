import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { httpClient } from '../../api/httpClient';

const schema = yup.object({
  ci: yup.string().required('CI requerido'),
  birthDate: yup.string().required('Fecha requerida'),
});

type FormData = yup.InferType<typeof schema>;

export default function ParentLogin() {
  const [data, setData] = useState<any>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = async (values: FormData) => {
    const res = await httpClient.post('/students/login-by-ci', values);
    setData(res.data);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Consulta para Padres</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">CI del Estudiante</label>
          <input className="w-full border rounded p-2" {...register('ci')} />
          {errors.ci && <p className="text-red-500 text-sm">{errors.ci.message}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Fecha de Nacimiento</label>
          <input type="date" className="w-full border rounded p-2" {...register('birthDate')} />
          {errors.birthDate && (
            <p className="text-red-500 text-sm">{errors.birthDate.message}</p>
          )}
        </div>
        <button type="submit" className="bg-[#002855] text-white rounded px-4 py-2 w-full">
          Consultar Kardex
        </button>
      </form>

      {data && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Historial de Incidentes</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-1">Fecha</th>
                <th className="py-1">Tipo</th>
                <th className="py-1">Materia</th>
                <th className="py-1">Profesor</th>
              </tr>
            </thead>
            <tbody>
              {data.incidents.map((inc: any) => (
                <tr key={inc.id} className="border-b">
                  <td className="py-1">{new Date(inc.date).toLocaleDateString()}</td>
                  <td className="py-1">{inc.type.name}</td>
                  <td className="py-1">{inc.subject.name}</td>
                  <td className="py-1">{inc.teacher.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

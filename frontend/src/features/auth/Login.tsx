import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { httpClient } from '../../api/httpClient';
import { useAuth } from '../../core/context/AuthContext';

interface LoginResponse {
  token: string;
  user: { id: number; role: 'ADMIN' | 'TEACHER'; username: string };
}

const schema = yup.object({
  username: yup.string().required('Usuario requerido'),
  password: yup.string().required('Contraseña requerida'),
});

type FormData = yup.InferType<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const res = await httpClient.post<LoginResponse>('/auth/login', data);
    login(res.data.token, res.data.user);
    if (res.data.user.role === 'ADMIN') navigate('/admin');
    else navigate('/profesor');
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Ingreso de Personal</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Usuario</label>
          <input
            className="w-full border rounded p-2"
            {...register('username')}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm mb-1">Contraseña</label>
          <input
            type="password"
            className="w-full border rounded p-2"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-[#002855] text-white rounded px-4 py-2 w-full"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}

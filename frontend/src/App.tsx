import ParentLogin from './features/parents/ParentLogin'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <header className="max-w-5xl mx-auto mb-6">
        <h1 className="text-2xl font-bold">Sistema de Kardex Escolar</h1>
        <p className="text-sm text-gray-600">Base de proyecto — frontend</p>
      </header>
      <main className="max-w-5xl mx-auto">
        <ParentLogin />
      </main>
    </div>
  )
}

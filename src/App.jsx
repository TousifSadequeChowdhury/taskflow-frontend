import './App.css'
import Navbar from './assets/components/Navbar'

function App() {

  return (
    <>
           <Navbar />
      <main className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-500">Welcome to TaskFlow</h1>
      </main>
    </>
  )
}

export default App

import React from 'react'
import { AppProvider } from './context/AppContext'
import Layout from './components/layout/Layout'
import { Toaster } from './components/ui/Toaster'

function App() {
  return (
    <AppProvider>
      <div className="App min-h-screen bg-gray-50">
        <Layout />
        <Toaster />
      </div>
    </AppProvider>
  )
}

export default App
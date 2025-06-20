import React from 'react'
import { useApp } from '../../context/AppContext'
import Header from './Header'
import TemplateBuilderUI from '../core/TemplateBuilderUI'
import DynamicFormBuilder from '../core/DynamicFormBuilder'
import TemplateWizard from '../core/TemplateWizard'

const Layout = () => {
  const { state, actions } = useApp()

  const renderCurrentView = () => {
    switch (state.currentView) {
      case 'gallery':
        return <TemplateBuilderUI />
      case 'builder':
        return <DynamicFormBuilder />
      case 'wizard':
        return (
          <TemplateWizard
            onClose={() => actions.setCurrentView('gallery')}
            onSave={(templateData) => {
              actions.createTemplate(templateData)
              actions.setCurrentView('gallery')
            }}
          />
        )
      default:
        return <TemplateBuilderUI />
    }
  }

  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải ứng dụng...</p>
        </div>
      </div>
    )
  }

  if (state.error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Có lỗi xảy ra</h1>
          <p className="text-gray-600 mb-4">{state.error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Tải lại trang
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        {renderCurrentView()}
      </main>
    </div>
  )
}

export default Layout
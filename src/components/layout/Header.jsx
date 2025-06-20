import React from 'react'
import { 
  FileText, 
  User, 
  Settings, 
  HelpCircle, 
  Bell,
  Search,
  Menu,
  Home,
  Plus,
  Eye,
  Download,
  Save
} from 'lucide-react'
import { useApp } from '@context/AppContext'

const Header = () => {
  const { state, actions } = useApp()

  const handleViewChange = (view) => {
    if (view === 'builder' && state.currentView !== 'builder') {
      actions.clearFormBuilder()
    }
    actions.setCurrentView(view)
  }

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">Legal Form Builder</h1>
                <p className="text-xs text-gray-500">Trình tạo biểu mẫu pháp lý</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1 ml-8">
              <button
                onClick={() => handleViewChange('gallery')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  state.currentView === 'gallery'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Home className="w-4 h-4 inline mr-2" />
                Thư viện
              </button>
              <button
                onClick={() => handleViewChange('builder')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  state.currentView === 'builder'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Form Builder
              </button>
            </nav>
          </div>

          {/* Center section - Search (hidden on small screens) */}
          <div className="flex-1 max-w-lg mx-8 hidden lg:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Tìm kiếm biểu mẫu..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-2">
            {/* Form Builder Actions */}
            {state.currentView === 'builder' && (
              <div className="flex items-center space-x-2 mr-4">
                <button
                  onClick={() => actions.setPreviewMode(!state.isPreviewMode)}
                  className={`p-2 rounded-lg transition-colors ${
                    state.isPreviewMode
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title={state.isPreviewMode ? 'Chỉnh sửa' : 'Xem trước'}
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  title="Lưu"
                >
                  <Save className="w-4 h-4" />
                </button>
                <button
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  title="Xuất file"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Bell className="w-5 h-5" />
              {state.notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {state.notifications.length}
                </span>
              )}
            </button>

            {/* Help */}
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <HelpCircle className="w-5 h-5" />
            </button>

            {/* Settings */}
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Settings className="w-5 h-5" />
            </button>

            {/* User menu */}
            <div className="relative">
              <button className="flex items-center space-x-2 p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{state.user.name}</p>
                  <p className="text-xs text-gray-500">{state.user.organization}</p>
                </div>
              </button>
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={actions.toggleSidebar}
              className="md:hidden p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="lg:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Tìm kiếm biểu mẫu..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Loading bar */}
      {state.isLoading && (
        <div className="h-1 bg-gray-200">
          <div className="h-full bg-blue-600 animate-pulse"></div>
        </div>
      )}
    </header>
  )
}

export default Header
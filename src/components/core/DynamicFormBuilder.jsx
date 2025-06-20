import React, { useState, useRef } from 'react'
import { 
  Palette, 
  Eye, 
  Download, 
  Save, 
  Settings,
  Plus,
  Trash2,
  Copy,
  Layout,
  Layers,
  ArrowLeft
} from 'lucide-react'
import { useApp, useFormBuilder } from '../../context/AppContext'
import { elementDefinitions } from '../../data/mock/templates'

const DynamicFormBuilder = () => {
  const { state, actions } = useApp()
  const { 
    currentForm, 
    formElements, 
    selectedElement, 
    isPreviewMode,
    addFormElement,
    updateFormElement,
    deleteFormElement,
    selectElement,
    setPreviewMode
  } = useFormBuilder()

  const [sidebarTab, setSidebarTab] = useState('elements')
  const [draggedElement, setDraggedElement] = useState(null)
  const canvasRef = useRef(null)
  const dragCounter = useRef(0)

  // Drag & Drop handlers
  const handleDragStart = (elementType) => {
    setDraggedElement(elementType)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    dragCounter.current++
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    dragCounter.current--
  }

  const handleDrop = (e) => {
    e.preventDefault()
    dragCounter.current = 0
    
    if (draggedElement) {
      const elementDef = elementDefinitions[draggedElement]
      const newElement = {
        id: `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: draggedElement,
        properties: { ...elementDef.defaultProperties },
        position: { x: 0, y: formElements.length }
      }
      
      addFormElement(newElement)
      selectElement(newElement.id)
      setDraggedElement(null)
    }
  }

  const handleSelectElement = (elementId) => {
    selectElement(elementId)
    setSidebarTab('properties')
  }

  const handleDeleteElement = (elementId) => {
    deleteFormElement(elementId)
  }

  const handleDuplicateElement = (elementId) => {
    const element = formElements.find(el => el.id === elementId)
    if (element) {
      const newElement = {
        ...element,
        id: `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        position: { ...element.position, y: element.position.y + 1 }
      }
      addFormElement(newElement)
    }
  }

  const handleUpdateElementProperty = (elementId, property, value) => {
    updateFormElement(elementId, { properties: { [property]: value } })
  }

  // Render element palette
  const renderElementPalette = () => {
    return (
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-800 mb-4">Thành phần</h3>
        {Object.values(elementDefinitions).map((element) => (
          <div
            key={element.id}
            className="p-3 border border-gray-200 rounded-lg cursor-move hover:bg-blue-50 hover:border-blue-300 transition-colors"
            draggable
            onDragStart={() => handleDragStart(element.id)}
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg">{element.icon}</span>
              <div>
                <span className="text-sm font-medium block">{element.name}</span>
                <span className="text-xs text-gray-600">{element.description}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Render properties panel
  const renderPropertiesPanel = () => {
    const element = formElements.find(el => el.id === selectedElement)
    if (!element) {
      return (
        <div className="text-center text-gray-500 py-8">
          <Settings className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p>Chọn một thành phần để chỉnh sửa thuộc tính</p>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 mb-4">Thuộc tính</h3>
        
        {/* Common properties */}
        {element.type !== 'text' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nhãn</label>
            <input
              type="text"
              value={element.properties.label || ''}
              onChange={(e) => handleUpdateElementProperty(element.id, 'label', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Text-specific properties */}
        {element.type === 'text' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
            <textarea
              value={element.properties.content || ''}
              onChange={(e) => handleUpdateElementProperty(element.id, 'content', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
        )}

        {/* Input/Textarea placeholder */}
        {(element.type === 'input' || element.type === 'textarea') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Placeholder</label>
            <input
              type="text"
              value={element.properties.placeholder || ''}
              onChange={(e) => handleUpdateElementProperty(element.id, 'placeholder', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Required checkbox */}
        {element.type !== 'text' && (
          <div className="flex items-center">
            <input
              type="checkbox"
              id="required"
              checked={element.properties.required || false}
              onChange={(e) => handleUpdateElementProperty(element.id, 'required', e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="required" className="text-sm text-gray-700">Bắt buộc</label>
          </div>
        )}
      </div>
    )
  }

  // Render element preview
  const renderElementPreview = (element) => {
    switch (element.type) {
      case 'text':
        return <div className="text-gray-800">{element.properties.content}</div>
      case 'input':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {element.properties.label} {element.properties.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              placeholder={element.properties.placeholder}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )
      case 'textarea':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {element.properties.label} {element.properties.required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              placeholder={element.properties.placeholder}
              rows={element.properties.rows}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )
      case 'date':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {element.properties.label} {element.properties.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )
      case 'select':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {element.properties.label} {element.properties.required && <span className="text-red-500">*</span>}
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
              <option>Chọn...</option>
              {element.properties.options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        )
      case 'checkbox':
        return (
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-700">
              {element.properties.label} {element.properties.required && <span className="text-red-500">*</span>}
            </span>
          </label>
        )
      case 'signature':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {element.properties.label} {element.properties.required && <span className="text-red-500">*</span>}
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center text-gray-500">
              Khu vực chữ ký
            </div>
          </div>
        )
      default:
        return <div className="text-gray-500">Element type: {element.type}</div>
    }
  }

  // Render form canvas
  const renderFormCanvas = () => {
    return (
      <div
        ref={canvasRef}
        className={`flex-1 p-8 bg-white border-2 border-dashed border-gray-300 min-h-[600px] ${
          draggedElement ? 'border-blue-400 bg-blue-50' : ''
        }`}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {formElements.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            <Layout className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">Bắt đầu tạo biểu mẫu</h3>
            <p>Kéo thả các thành phần từ bảng bên trái vào đây</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Form header */}
            <div className="mb-8 text-center">
              <input
                type="text"
                value={currentForm?.metadata?.name || 'Tiêu đề biểu mẫu'}
                className="text-2xl font-bold text-center border-none outline-none w-full bg-transparent"
                placeholder="Tiêu đề biểu mẫu"
              />
            </div>

            {/* Form elements */}
            {formElements.map((element) => {
              const isSelected = selectedElement === element.id
              
              return (
                <div
                  key={element.id}
                  className={`relative group ${isSelected ? 'ring-2 ring-blue-500 rounded-lg' : ''}`}
                >
                  {/* Element wrapper with controls */}
                  <div className="relative">
                    {/* Element controls */}
                    <div className={`absolute -top-8 right-0 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity ${isSelected ? 'opacity-100' : ''}`}>
                      <button
                        onClick={() => handleDuplicateElement(element.id)}
                        className="p-1 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50"
                        title="Nhân bản"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteElement(element.id)}
                        className="p-1 bg-white border border-gray-300 rounded shadow-sm hover:bg-red-50 text-red-600"
                        title="Xóa"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Element content */}
                    <div 
                      className={`p-2 ${isSelected ? 'bg-blue-50' : ''} rounded cursor-pointer`}
                      onClick={() => handleSelectElement(element.id)}
                    >
                      {renderElementPreview(element)}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  // Render sidebar
  const renderSidebar = () => {
    return (
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Sidebar tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setSidebarTab('elements')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              sidebarTab === 'elements'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Palette className="w-4 h-4 inline mr-2" />
            Thành phần
          </button>
          <button
            onClick={() => setSidebarTab('properties')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              sidebarTab === 'properties'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Settings className="w-4 h-4 inline mr-2" />
            Thuộc tính
          </button>
        </div>

        {/* Sidebar content */}
        <div className="flex-1 p-4 overflow-y-auto">
          {sidebarTab === 'elements' && renderElementPalette()}
          {sidebarTab === 'properties' && renderPropertiesPanel()}
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        {!isPreviewMode && renderSidebar()}

        {/* Canvas area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {isPreviewMode ? (
            // Preview mode
            <div className="flex-1 overflow-y-auto bg-white">
              <div className="max-w-4xl mx-auto p-8">
                <div className="bg-white shadow-lg rounded-lg p-8">
                  <h1 className="text-2xl font-bold text-center mb-8">
                    {currentForm?.metadata?.name || 'Tiêu đề biểu mẫu'}
                  </h1>
                  <div className="space-y-6">
                    {formElements.map((element) => (
                      <div key={element.id}>
                        {renderElementPreview(element)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Edit mode
            <div className="flex-1 overflow-y-auto">
              {renderFormCanvas()}
            </div>
          )}
        </div>
      </div>

      {/* Element count indicator */}
      {formElements.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white px-3 py-2 rounded-lg text-sm">
          <Layers className="w-4 h-4 inline mr-1" />
          {formElements.length} thành phần
        </div>
      )}
    </div>
  )
}

export default DynamicFormBuilder
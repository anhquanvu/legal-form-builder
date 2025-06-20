import React, { useState } from 'react'
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Plus, 
  Trash2, 
  Edit3,
  FileText,
  Users,
  Briefcase,
  Building,
  Heart,
  Save,
  X
} from 'lucide-react'
import { sampleCategories, elementDefinitions } from '../../data/mock/templates'

const TemplateWizard = ({ onClose, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [templateData, setTemplateData] = useState({
    metadata: {
      name: '',
      description: '',
      category: '',
      tags: [],
      isPublic: false
    },
    elements: [],
    settings: {
      pageSize: 'A4',
      orientation: 'portrait',
      fontSize: 12,
      fontFamily: 'Times New Roman'
    }
  })

  const steps = [
    { title: 'Thông tin cơ bản', description: 'Tên và mô tả template' },
    { title: 'Chọn danh mục', description: 'Phân loại template' },
    { title: 'Thiết kế biểu mẫu', description: 'Thêm các thành phần' },
    { title: 'Cài đặt', description: 'Tùy chỉnh định dạng' },
    { title: 'Xem trước & Lưu', description: 'Kiểm tra và hoàn thành' }
  ]

  const categoryIcons = { FileText, Users, Briefcase, Building, Heart }

  // Step 1: Basic Information
  const renderBasicInfoStep = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tên template *
        </label>
        <input
          type="text"
          value={templateData.metadata.name}
          onChange={(e) => setTemplateData({
            ...templateData,
            metadata: { ...templateData.metadata, name: e.target.value }
          })}
          placeholder="VD: Đơn xin nghỉ phép"
          className="input-field"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mô tả template
        </label>
        <textarea
          value={templateData.metadata.description}
          onChange={(e) => setTemplateData({
            ...templateData,
            metadata: { ...templateData.metadata, description: e.target.value }
          })}
          placeholder="Mô tả ngắn gọn về mục đích sử dụng template này..."
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tags (tách bằng dấu phẩy)
        </label>
        <input
          type="text"
          value={templateData.metadata.tags.join(', ')}
          onChange={(e) => setTemplateData({
            ...templateData,
            metadata: { 
              ...templateData.metadata, 
              tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
            }
          })}
          placeholder="VD: nghỉ phép, nhân sự, công ty"
          className="input-field"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isPublic"
          checked={templateData.metadata.isPublic}
          onChange={(e) => setTemplateData({
            ...templateData,
            metadata: { ...templateData.metadata, isPublic: e.target.checked }
          })}
          className="mr-3"
        />
        <label htmlFor="isPublic" className="text-sm text-gray-700">
          Chia sẻ template này với cộng đồng
        </label>
      </div>
    </div>
  )

  // Step 2: Category Selection
  const renderCategoryStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Chọn danh mục phù hợp với template của bạn
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(sampleCategories).map(([key, category]) => {
            const IconComponent = categoryIcons[category.icon] || FileText
            return (
              <div
                key={key}
                onClick={() => setTemplateData({
                  ...templateData,
                  metadata: { ...templateData.metadata, category: key }
                })}
                className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                  templateData.metadata.category === key
                    ? `border-blue-500 bg-blue-50`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-${category.color}-100 rounded-lg flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 text-${category.color}-600`} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{category.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  // Step 3: Form Design
  const renderFormDesignStep = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
      {/* Elements Palette */}
      <div className="lg:col-span-1 border border-gray-200 rounded-lg p-4 overflow-y-auto">
        <h3 className="font-medium text-gray-900 mb-4">Thành phần có sẵn</h3>
        <div className="space-y-2">
          {Object.values(elementDefinitions).map((element) => (
            <div
              key={element.id}
              onClick={() => addElement(element)}
              className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{element.icon}</span>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{element.name}</h4>
                  <p className="text-xs text-gray-600">{element.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Canvas */}
      <div className="lg:col-span-2 border border-gray-200 rounded-lg p-6 overflow-y-auto bg-white">
        <div className="mb-4">
          <input
            type="text"
            value={templateData.metadata.name || 'TIÊU ĐỀ BIỂU MẪU'}
            onChange={(e) => setTemplateData({
              ...templateData,
              metadata: { ...templateData.metadata, name: e.target.value }
            })}
            className="text-xl font-bold text-center w-full border-none outline-none"
          />
        </div>

        {templateData.elements.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>Kéo thả các thành phần từ bên trái vào đây</p>
          </div>
        ) : (
          <div className="space-y-4">
            {templateData.elements.map((element, index) => (
              <div
                key={element.id}
                className="group relative border border-gray-200 rounded-lg p-4 hover:border-blue-300"
              >
                {/* Element controls */}
                <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => editElement(index)}
                    className="p-1 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50"
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => deleteElement(index)}
                    className="p-1 bg-white border border-gray-300 rounded shadow-sm hover:bg-red-50 text-red-600"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>

                {/* Element preview */}
                {renderElementPreview(element)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  // Step 4: Settings
  const renderSettingsStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kích thước trang
          </label>
          <select
            value={templateData.settings.pageSize}
            onChange={(e) => setTemplateData({
              ...templateData,
              settings: { ...templateData.settings, pageSize: e.target.value }
            })}
            className="input-field"
          >
            <option value="A4">A4 (210 x 297 mm)</option>
            <option value="A3">A3 (297 x 420 mm)</option>
            <option value="Letter">Letter (8.5 x 11 inch)</option>
            <option value="Legal">Legal (8.5 x 14 inch)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hướng trang
          </label>
          <select
            value={templateData.settings.orientation}
            onChange={(e) => setTemplateData({
              ...templateData,
              settings: { ...templateData.settings, orientation: e.target.value }
            })}
            className="input-field"
          >
            <option value="portrait">Dọc (Portrait)</option>
            <option value="landscape">Ngang (Landscape)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font chữ
          </label>
          <select
            value={templateData.settings.fontFamily}
            onChange={(e) => setTemplateData({
              ...templateData,
              settings: { ...templateData.settings, fontFamily: e.target.value }
            })}
            className="input-field"
          >
            <option value="Times New Roman">Times New Roman</option>
            <option value="Arial">Arial</option>
            <option value="Calibri">Calibri</option>
            <option value="Verdana">Verdana</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cỡ chữ
          </label>
          <select
            value={templateData.settings.fontSize}
            onChange={(e) => setTemplateData({
              ...templateData,
              settings: { ...templateData.settings, fontSize: parseInt(e.target.value) }
            })}
            className="input-field"
          >
            <option value="10">10pt</option>
            <option value="11">11pt</option>
            <option value="12">12pt</option>
            <option value="14">14pt</option>
            <option value="16">16pt</option>
          </select>
        </div>
      </div>
    </div>
  )

  // Step 5: Preview and Save
  const renderPreviewStep = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Xem trước template</h3>
        
        <div className="bg-white rounded-lg border p-8 shadow-sm max-h-96 overflow-y-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">{templateData.metadata.name || 'Template mới'}</h1>
          </div>
          
          <div className="space-y-4">
            {templateData.elements.map((element, index) => (
              <div key={element.id}>
                {renderElementPreview(element)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Template summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Thông tin template</h4>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-600">Tên:</dt>
              <dd className="font-medium">{templateData.metadata.name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Danh mục:</dt>
              <dd className="font-medium">{sampleCategories[templateData.metadata.category]?.name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Số thành phần:</dt>
              <dd className="font-medium">{templateData.elements.length}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Tags:</dt>
              <dd className="font-medium">{templateData.metadata.tags.join(', ') || 'Không có'}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Cài đặt định dạng</h4>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-600">Kích thước:</dt>
              <dd className="font-medium">{templateData.settings.pageSize}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Hướng:</dt>
              <dd className="font-medium">{templateData.settings.orientation === 'portrait' ? 'Dọc' : 'Ngang'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Font:</dt>
              <dd className="font-medium">{templateData.settings.fontFamily}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Cỡ chữ:</dt>
              <dd className="font-medium">{templateData.settings.fontSize}pt</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )

  // Helper functions
  const addElement = (elementType) => {
    const newElement = {
      id: `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: elementType.id,
      properties: { ...elementType.defaultProperties },
      position: { x: 0, y: templateData.elements.length }
    }
    
    setTemplateData({
      ...templateData,
      elements: [...templateData.elements, newElement]
    })
  }

  const deleteElement = (index) => {
    const newElements = templateData.elements.filter((_, i) => i !== index)
    setTemplateData({
      ...templateData,
      elements: newElements
    })
  }

  const editElement = (index) => {
    const element = templateData.elements[index]
    const newLabel = prompt('Nhập nhãn mới:', element.properties.label || element.properties.content)
    
    if (newLabel !== null) {
      const newElements = [...templateData.elements]
      if (element.type === 'text') {
        newElements[index].properties.content = newLabel
      } else {
        newElements[index].properties.label = newLabel
      }
      
      setTemplateData({
        ...templateData,
        elements: newElements
      })
    }
  }

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
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              disabled
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              disabled
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              disabled
            />
          </div>
        )
      case 'select':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {element.properties.label} {element.properties.required && <span className="text-red-500">*</span>}
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md" disabled>
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
            <input type="checkbox" className="mr-2" disabled />
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

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return templateData.metadata.name.trim() !== ''
      case 2:
        return templateData.metadata.category !== ''
      case 3:
        return templateData.elements.length > 0
      case 4:
        return true
      case 5:
        return true
      default:
        return false
    }
  }

  const handleSave = () => {
    onSave(templateData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-5/6 flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Tạo template mới</h2>
              <p className="text-gray-600 mt-1">{steps[currentStep - 1].description}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress steps */}
          <div className="flex items-center space-x-4 mt-6">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index + 1 < currentStep 
                    ? 'bg-green-500 text-white'
                    : index + 1 === currentStep
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1 < currentStep ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                <div className="ml-2 hidden md:block">
                  <p className={`text-sm font-medium ${
                    index + 1 <= currentStep ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-px ml-4 ${
                    index + 1 < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {currentStep === 1 && renderBasicInfoStep()}
          {currentStep === 2 && renderCategoryStep()}
          {currentStep === 3 && renderFormDesignStep()}
          {currentStep === 4 && renderSettingsStep()}
          {currentStep === 5 && renderPreviewStep()}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 flex justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại</span>
          </button>

          <div className="flex space-x-3">
            {currentStep === 5 ? (
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Save className="w-4 h-4" />
                <span>Lưu template</span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                disabled={!canProceed()}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Tiếp tục</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TemplateWizard
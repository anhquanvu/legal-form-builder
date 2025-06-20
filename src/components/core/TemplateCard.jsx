import React, { useState } from 'react'
import { 
  Star, 
  Eye, 
  Copy, 
  Edit3, 
  Trash2, 
  Play, 
  MoreVertical,
  Calendar,
  User,
  Tag,
  Check
} from 'lucide-react'
import { sampleCategories } from '../../data/mock/templates'

const TemplateCard = ({ 
  template, 
  viewMode = 'grid', 
  onUse, 
  onEdit, 
  onCopy, 
  onDelete 
}) => {
  const [showMenu, setShowMenu] = useState(false)
  const category = sampleCategories[template.metadata.category]

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatUsageCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
  }

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            {/* Template thumbnail */}
            <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">{template.thumbnail}</span>
            </div>

            {/* Template info */}
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-lg font-semibold text-gray-900">{template.metadata.name}</h3>
                {template.isOfficial && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                    <Check className="w-3 h-3 mr-1" />
                    Chính thức
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 mb-2">{template.metadata.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {template.author}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(template.createdAt)}
                </span>
                <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {formatUsageCount(template.usageCount)}
                </span>
                <span className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                  {template.rating}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs rounded-full bg-${category?.color}-100 text-${category?.color}-800`}>
              {category?.name}
            </span>
            
            <button
              onClick={onUse}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Play className="w-4 h-4 inline mr-1" />
              Sử dụng
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
              
              {showMenu && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => {
                      onEdit()
                      setShowMenu(false)
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Chỉnh sửa
                  </button>
                  <button
                    onClick={() => {
                      onCopy()
                      setShowMenu(false)
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Nhân bản
                  </button>
                  <button
                    onClick={() => {
                      onDelete()
                      setShowMenu(false)
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Xóa
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid view
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Template preview */}
      <div className="h-40 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center relative">
        <span className="text-5xl">{template.thumbnail}</span>
        
        {/* Overlay actions */}
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
          <button
            onClick={onUse}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
          >
            <Play className="w-4 h-4 inline mr-1" />
            Sử dụng
          </button>
          <button
            onClick={onEdit}
            className="p-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={onCopy}
            className="p-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Template info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">
            {template.metadata.name}
          </h3>
          {template.isOfficial && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full ml-2 flex-shrink-0">
              <Check className="w-3 h-3 inline" />
            </span>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {template.metadata.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <span>{template.author}</span>
          <span>{formatDate(template.createdAt)}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <span className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              {formatUsageCount(template.usageCount)}
            </span>
            <span className="flex items-center">
              <Star className="w-3 h-3 mr-1 text-yellow-500" />
              {template.rating}
            </span>
          </div>
          
          <span className={`px-2 py-1 text-xs rounded-full bg-${category?.color}-100 text-${category?.color}-800`}>
            {category?.name}
          </span>
        </div>

        {/* Tags */}
        {template.metadata.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {template.metadata.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
            {template.metadata.tags.length > 2 && (
              <span className="text-xs text-gray-500">
                +{template.metadata.tags.length - 2} khác
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default TemplateCard
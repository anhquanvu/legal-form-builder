import React, { useState, useMemo } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  Star,
  Eye,
  Copy,
  Edit3,
  Trash2,
  FileText,
  Users,
  Briefcase,
  Building,
  Heart,
  Grid3X3,
  List,
  SortAsc
} from 'lucide-react'
import { useApp, useTemplates } from '../../context/AppContext'
import TemplateCard from './TemplateCard'

const TemplateBuilderUI = () => {
  const { actions } = useApp()
  const { templates, categories, loadTemplateToBuilder } = useTemplates()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('name') // 'name', 'date', 'usage', 'rating'
  const [showFilters, setShowFilters] = useState(false)

  // Category icons mapping
  const categoryIcons = {
    FileText, Users, Briefcase, Building, Heart
  }

  // Filter and sort templates
  const filteredAndSortedTemplates = useMemo(() => {
    let filtered = templates.filter(template => {
      const matchesSearch = template.metadata.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.metadata.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.metadata.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'all' || template.metadata.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })

    // Sort templates
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.metadata.name.localeCompare(b.metadata.name)
        case 'date':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'usage':
          return b.usageCount - a.usageCount
        case 'rating':
          return b.rating - a.rating
        default:
          return 0
      }
    })

    return filtered
  }, [templates, searchTerm, selectedCategory, sortBy])

  const handleCreateTemplate = () => {
    actions.setCurrentView('wizard')
  }

  const handleUseTemplate = (template) => {
    loadTemplateToBuilder(template)
  }

  const handleEditTemplate = (template) => {
    loadTemplateToBuilder(template)
  }

  const handleCopyTemplate = (template) => {
    const copiedTemplate = {
      ...template,
      metadata: {
        ...template.metadata,
        name: `${template.metadata.name} (Copy)`
      }
    }
    actions.createTemplate(copiedTemplate)
  }

  const handleDeleteTemplate = (templateId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa template này?')) {
      // In real app, this would call an API to delete
      console.log('Delete template:', templateId)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-900">Thư viện biểu mẫu</h1>
              <p className="text-gray-600 mt-1">
                Tạo và quản lý các mẫu biểu mẫu pháp lý của bạn
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ${
                  showFilters ? 'bg-gray-100' : ''
                }`}
              >
                <Filter className="w-4 h-4 inline mr-2" />
                Bộ lọc
              </button>
              
              <button
                onClick={handleCreateTemplate}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Tạo biểu mẫu mới
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm biểu mẫu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* View mode toggle */}
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600'} rounded-l-lg`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600'} rounded-r-lg`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Sort dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Sắp xếp theo tên</option>
              <option value="date">Sắp xếp theo ngày</option>
              <option value="usage">Sắp xếp theo lượt dùng</option>
              <option value="rating">Sắp xếp theo đánh giá</option>
            </select>
          </div>

          {/* Extended filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Danh mục
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Tất cả danh mục</option>
                    {Object.entries(categories).map(([key, category]) => (
                      <option key={key} value={key}>
                        {category.name} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Author filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tác giả
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="all">Tất cả tác giả</option>
                    <option value="official">Chính thức</option>
                    <option value="community">Cộng đồng</option>
                    <option value="me">Của tôi</option>
                  </select>
                </div>

                {/* Rating filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Đánh giá tối thiểu
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="0">Tất cả</option>
                    <option value="3">3 sao trở lên</option>
                    <option value="4">4 sao trở lên</option>
                    <option value="4.5">4.5 sao trở lên</option>
                  </select>
                </div>

                {/* Template type filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loại template
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="all">Tất cả</option>
                    <option value="public">Công khai</option>
                    <option value="private">Riêng tư</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Categories Overview */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Danh mục biểu mẫu</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div
              onClick={() => setSelectedCategory('all')}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedCategory === 'all'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <FileText className="w-6 h-6 text-gray-500" />
                <span className="text-sm text-gray-500">{templates.length}</span>
              </div>
              <h3 className="font-medium text-gray-900 text-sm">Tất cả</h3>
            </div>

            {Object.entries(categories).map(([key, category]) => {
              const IconComponent = categoryIcons[category.icon] || FileText
              return (
                <div
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedCategory === key
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <IconComponent className={`w-6 h-6 text-${category.color}-500`} />
                    <span className="text-sm text-gray-500">{category.count}</span>
                  </div>
                  <h3 className="font-medium text-gray-900 text-sm">{category.name}</h3>
                </div>
              )
            })}
          </div>
        </div>

        {/* Templates Grid/List */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Biểu mẫu ({filteredAndSortedTemplates.length})
            </h2>
            
            {searchTerm && (
              <p className="text-sm text-gray-600">
                Kết quả tìm kiếm cho: <span className="font-medium">"{searchTerm}"</span>
              </p>
            )}
          </div>

          {filteredAndSortedTemplates.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không tìm thấy biểu mẫu nào
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm 
                  ? 'Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc'
                  : 'Hãy tạo biểu mẫu đầu tiên của bạn'
                }
              </p>
              <button
                onClick={handleCreateTemplate}
                className="btn-primary"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Tạo biểu mẫu mới
              </button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }>
              {filteredAndSortedTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  viewMode={viewMode}
                  onUse={() => handleUseTemplate(template)}
                  onEdit={() => handleEditTemplate(template)}
                  onCopy={() => handleCopyTemplate(template)}
                  onDelete={() => handleDeleteTemplate(template.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TemplateBuilderUI
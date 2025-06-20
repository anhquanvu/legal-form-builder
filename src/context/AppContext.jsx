import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { sampleTemplates, sampleCategories } from '../data/mock/templates'

// Initial state
const initialState = {
  // App state
  isLoading: false,
  error: null,
  currentView: 'gallery', // 'gallery', 'builder', 'wizard'
  
  // User state
  user: {
    id: 'user1',
    name: 'Người dùng',
    role: 'admin',
    organization: 'Công ty ABC'
  },
  
  // Templates state
  templates: [],
  categories: {},
  selectedTemplate: null,
  
  // Form builder state
  currentForm: null,
  formElements: [],
  selectedElement: null,
  isPreviewMode: false,
  
  // UI state
  sidebarCollapsed: false,
  activeModal: null,
  notifications: []
}

// Action types
export const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_CURRENT_VIEW: 'SET_CURRENT_VIEW',
  SET_CATEGORIES: 'SET_CATEGORIES',
  SET_TEMPLATES: 'SET_TEMPLATES',
  ADD_TEMPLATE: 'ADD_TEMPLATE',
  SELECT_TEMPLATE: 'SELECT_TEMPLATE',
  SET_CURRENT_FORM: 'SET_CURRENT_FORM',
  SET_FORM_ELEMENTS: 'SET_FORM_ELEMENTS',
  ADD_FORM_ELEMENT: 'ADD_FORM_ELEMENT',
  UPDATE_FORM_ELEMENT: 'UPDATE_FORM_ELEMENT',
  DELETE_FORM_ELEMENT: 'DELETE_FORM_ELEMENT',
  SELECT_ELEMENT: 'SELECT_ELEMENT',
  SET_PREVIEW_MODE: 'SET_PREVIEW_MODE',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  SET_ACTIVE_MODAL: 'SET_ACTIVE_MODAL',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION'
}

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload }
      
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false }
      
    case ActionTypes.SET_CURRENT_VIEW:
      return { ...state, currentView: action.payload }
      
    case ActionTypes.SET_CATEGORIES:
      return { ...state, categories: action.payload }
      
    case ActionTypes.SET_TEMPLATES:
      return { ...state, templates: action.payload }
      
    case ActionTypes.ADD_TEMPLATE:
      return { 
        ...state, 
        templates: [...state.templates, action.payload] 
      }
      
    case ActionTypes.SELECT_TEMPLATE:
      return { ...state, selectedTemplate: action.payload }
      
    case ActionTypes.SET_CURRENT_FORM:
      return { ...state, currentForm: action.payload }
      
    case ActionTypes.SET_FORM_ELEMENTS:
      return { ...state, formElements: action.payload }
      
    case ActionTypes.ADD_FORM_ELEMENT:
      return { 
        ...state, 
        formElements: [...state.formElements, action.payload] 
      }
      
    case ActionTypes.UPDATE_FORM_ELEMENT:
      return {
        ...state,
        formElements: state.formElements.map(element =>
          element.id === action.payload.id
            ? { ...element, ...action.payload.updates }
            : element
        )
      }
      
    case ActionTypes.DELETE_FORM_ELEMENT:
      return {
        ...state,
        formElements: state.formElements.filter(element => element.id !== action.payload),
        selectedElement: state.selectedElement === action.payload ? null : state.selectedElement
      }
      
    case ActionTypes.SELECT_ELEMENT:
      return { ...state, selectedElement: action.payload }
      
    case ActionTypes.SET_PREVIEW_MODE:
      return { ...state, isPreviewMode: action.payload }
      
    case ActionTypes.TOGGLE_SIDEBAR:
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed }
      
    case ActionTypes.SET_ACTIVE_MODAL:
      return { ...state, activeModal: action.payload }
      
    case ActionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, { ...action.payload, id: Date.now() }]
      }
      
    case ActionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.id !== action.payload)
      }
      
    default:
      return state
  }
}

// Context
const AppContext = createContext()

// Provider
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Initialize app
  useEffect(() => {
    const initializeApp = async () => {
      try {
        dispatch({ type: ActionTypes.SET_LOADING, payload: true })

        // Load sample data
        dispatch({ type: ActionTypes.SET_CATEGORIES, payload: sampleCategories })
        dispatch({ type: ActionTypes.SET_TEMPLATES, payload: sampleTemplates })
        
        dispatch({ type: ActionTypes.SET_LOADING, payload: false })

      } catch (error) {
        console.error('Failed to initialize app:', error)
        dispatch({ type: ActionTypes.SET_ERROR, payload: error.message })
      }
    }

    initializeApp()
  }, [])

  // Action creators
  const actions = {
    setLoading: (loading) => dispatch({ type: ActionTypes.SET_LOADING, payload: loading }),
    setError: (error) => dispatch({ type: ActionTypes.SET_ERROR, payload: error }),
    setCurrentView: (view) => dispatch({ type: ActionTypes.SET_CURRENT_VIEW, payload: view }),
    
    selectTemplate: (template) => dispatch({ type: ActionTypes.SELECT_TEMPLATE, payload: template }),
    
    setCurrentForm: (form) => dispatch({ type: ActionTypes.SET_CURRENT_FORM, payload: form }),
    
    addFormElement: (element) => dispatch({ type: ActionTypes.ADD_FORM_ELEMENT, payload: element }),
    
    updateFormElement: (id, updates) => 
      dispatch({ type: ActionTypes.UPDATE_FORM_ELEMENT, payload: { id, updates } }),
    
    deleteFormElement: (id) => dispatch({ type: ActionTypes.DELETE_FORM_ELEMENT, payload: id }),
    
    selectElement: (id) => dispatch({ type: ActionTypes.SELECT_ELEMENT, payload: id }),
    
    setPreviewMode: (preview) => dispatch({ type: ActionTypes.SET_PREVIEW_MODE, payload: preview }),
    
    toggleSidebar: () => dispatch({ type: ActionTypes.TOGGLE_SIDEBAR }),
    
    setActiveModal: (modal) => dispatch({ type: ActionTypes.SET_ACTIVE_MODAL, payload: modal }),
    
    addNotification: (notification) => 
      dispatch({ type: ActionTypes.ADD_NOTIFICATION, payload: notification }),
    
    removeNotification: (id) => 
      dispatch({ type: ActionTypes.REMOVE_NOTIFICATION, payload: id }),

    // Template actions
    createTemplate: async (templateData) => {
      try {
        const newTemplate = {
          ...templateData,
          id: `template_${Date.now()}`,
          author: state.user.name,
          createdAt: new Date().toISOString(),
          usageCount: 0,
          rating: 0,
          isOfficial: false
        }
        
        dispatch({ type: ActionTypes.ADD_TEMPLATE, payload: newTemplate })

        actions.addNotification({
          type: 'success',
          message: 'Template đã được tạo thành công!'
        })

        return newTemplate
      } catch (error) {
        actions.addNotification({
          type: 'error',
          message: 'Không thể tạo template: ' + error.message
        })
        throw error
      }
    },

    // Category actions
    createCategory: async (categoryData) => {
      try {
        const newCategory = {
          ...categoryData,
          id: `category_${Date.now()}`,
          count: 0,
          createdAt: new Date().toISOString()
        }

        dispatch({
          type: ActionTypes.SET_CATEGORIES,
          payload: { ...state.categories, [newCategory.id]: newCategory }
        })

        actions.addNotification({
          type: 'success',
          message: 'Danh mục đã được tạo thành công!'
        })

        return newCategory
      } catch (error) {
        actions.addNotification({
          type: 'error',
          message: 'Không thể tạo danh mục: ' + error.message
        })
        throw error
      }
    },

    // Form builder actions
    loadTemplateToBuilder: (template) => {
      dispatch({ type: ActionTypes.SET_CURRENT_FORM, payload: template })
      dispatch({ type: ActionTypes.SET_FORM_ELEMENTS, payload: template.elements || [] })
      dispatch({ type: ActionTypes.SET_CURRENT_VIEW, payload: 'builder' })
    },

    clearFormBuilder: () => {
      dispatch({ type: ActionTypes.SET_CURRENT_FORM, payload: null })
      dispatch({ type: ActionTypes.SET_FORM_ELEMENTS, payload: [] })
      dispatch({ type: ActionTypes.SELECT_ELEMENT, payload: null })
      dispatch({ type: ActionTypes.SET_PREVIEW_MODE, payload: false })
    }
  }

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  )
}

// Hook
export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

// Additional specialized hooks
export function useTemplates() {
  const { state, actions } = useApp()
  return {
    templates: state.templates,
    selectedTemplate: state.selectedTemplate,
    categories: state.categories,
    selectTemplate: actions.selectTemplate,
    createTemplate: actions.createTemplate,
    createCategory: actions.createCategory,
    loadTemplateToBuilder: actions.loadTemplateToBuilder
  }
}

export function useFormBuilder() {
  const { state, actions } = useApp()
  return {
    currentForm: state.currentForm,
    formElements: state.formElements,
    selectedElement: state.selectedElement,
    isPreviewMode: state.isPreviewMode,
    setCurrentForm: actions.setCurrentForm,
    addFormElement: actions.addFormElement,
    updateFormElement: actions.updateFormElement,
    deleteFormElement: actions.deleteFormElement,
    selectElement: actions.selectElement,
    setPreviewMode: actions.setPreviewMode,
    clearFormBuilder: actions.clearFormBuilder
  }
}

export function useNotifications() {
  const { state, actions } = useApp()
  return {
    notifications: state.notifications,
    addNotification: actions.addNotification,
    removeNotification: actions.removeNotification
  }
}
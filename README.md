# Legal Form Builder 📝

> **Trình tạo biểu mẫu pháp lý với giao diện kéo thả hiện đại**  
> Giúp người dùng cuối có thể tạo các mẫu văn bản pháp lý mà không cần kiến thức kỹ thuật.

![Legal Form Builder](https://img.shields.io/badge/React-18.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-5.0-green) ![Tailwind](https://img.shields.io/badge/Tailwind-3.3-cyan) ![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Tính năng chính

### 🎯 **Cho người dùng cuối (Non-tech)**
- 🧙‍♀️ **Template Wizard**: Tạo template qua 5 bước đơn giản
- 🖱️ **Drag & Drop Builder**: Kéo thả các thành phần vào form
- 👀 **Live Preview**: Xem trước real-time
- 📚 **Template Gallery**: Thư viện mẫu có sẵn với tìm kiếm và lọc
- 🗂️ **Category Management**: Quản lý danh mục tự động
- 📄 **Export đa định dạng**: Word, PDF, HTML (sẽ phát triển)

### 🛠️ **Cho Developer**
- 🔌 **Plugin Architecture**: Mở rộng không giới hạn
- 📊 **Data-driven Config**: Cấu hình bằng JSON
- 🧩 **Component-based**: React components tái sử dụng
- 🎛️ **State Management**: Context API + Reducer pattern
- ⚡ **Modern Stack**: Vite + React + Tailwind CSS

## 🚀 Quick Start

### Prerequisites
- **Node.js**: 16.0+ 
- **npm** hoặc **yarn**
- **Git** (optional)

### Installation

#### Option 1: Clone & Setup (Nếu có source code)
```bash
# Clone repository
git clone <repo-url>
cd legal-form-builder

# Install dependencies
npm install

# Start development server
npm run dev
```

#### Option 2: Manual Setup từ đầu
```bash
# 1. Tạo Vite project
npm create vite@latest legal-form-builder -- --template react
cd legal-form-builder

# 2. Install core dependencies
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities @dnd-kit/modifiers
npm install lucide-react uuid clsx
npm install react-hook-form yup @hookform/resolvers
npm install date-fns react-datepicker react-select
npm install html2canvas jspdf docx file-saver
npm install lodash zustand

# 3. Install dev dependencies
npm install -D tailwindcss postcss autoprefixer @tailwindcss/forms
npx tailwindcss init -p

# 4. Copy source code files vào các thư mục tương ứng

# 5. Run development server
npm run dev
```

### 📁 Cấu trúc thư mục cần tạo

```
src/
├── components/
│   ├── core/              # Core components
│   │   ├── DynamicFormBuilder.jsx
│   │   ├── TemplateBuilderUI.jsx
│   │   └── TemplateWizard.jsx
│   ├── ui/                # UI components
│   │   ├── TemplateCard.jsx
│   │   └── Toaster.jsx
│   └── layout/            # Layout components
│       ├── Layout.jsx
│       └── Header.jsx
├── context/
│   └── AppContext.jsx     # State management
├── data/
│   └── mock/
│       └── templates.js   # Sample data
├── styles/
│   └── globals.css        # Global styles
├── App.jsx               # Main app
└── main.jsx              # Entry point
```

## 📖 Hướng dẫn sử dụng

### 🎨 Cho người dùng cuối

#### 1. Tạo Template mới
1. Vào **Thư viện** → Click **"Tạo biểu mẫu mới"**
2. Làm theo **5 bước wizard**:
   - **Bước 1**: Nhập tên, mô tả template
   - **Bước 2**: Chọn danh mục (Hành chính, Dân sự, Lao động...)
   - **Bước 3**: Kéo thả elements (Text, Input, Date, Signature...)
   - **Bước 4**: Cài đặt định dạng (A4, font chữ, orientation...)
   - **Bước 5**: Xem trước và lưu

#### 2. Sử dụng Template có sẵn
1. Duyệt **Template Gallery**
2. Tìm kiếm bằng từ khóa hoặc lọc theo danh mục
3. Click **"Sử dụng"** trên template muốn dùng
4. Điền thông tin vào form
5. Xuất file (Word/PDF)

#### 3. Chỉnh sửa Template
1. Click **"Chỉnh sửa"** trên template
2. Mở **Form Builder** với drag & drop
3. Thêm/xóa/chỉnh sửa elements
4. **Live preview** để xem kết quả
5. Lưu thay đổi

### 🔧 Cho Developer

#### Thêm Element Type mới
```javascript
// Trong src/data/mock/templates.js
export const elementDefinitions = {
  // ... existing elements
  customElement: {
    id: 'customElement',
    name: 'Custom Element',
    description: 'My custom element',
    icon: '🔧',
    category: 'advanced',
    defaultProperties: {
      label: 'Custom Label',
      customProp: 'default value'
    }
  }
}
```

#### Thêm Category mới
```javascript
// Trong src/data/mock/templates.js
export const sampleCategories = {
  // ... existing categories
  education: {
    id: 'education',
    name: 'Giáo dục',
    description: 'Văn bản giáo dục, đào tạo',
    icon: 'BookOpen',
    color: 'indigo',
    count: 0,
    order: 6
  }
}
```

#### Tạo Template bằng code
```javascript
const newTemplate = {
  id: 'my-template',
  metadata: {
    name: 'My Template',
    description: 'Template description',
    category: 'admin',
    tags: ['tag1', 'tag2'],
    isPublic: true
  },
  elements: [
    {
      id: 'title',
      type: 'text',
      properties: {
        content: 'TEMPLATE TITLE',
        style: 'bold',
        size: 'xl',
        align: 'center'
      }
    }
    // ... more elements
  ]
}
```

## 🎯 Roadmap & Features

### ✅ **Đã hoàn thành**
- [x] Template Gallery với search & filter
- [x] Template Wizard (5-step creation)
- [x] Drag & Drop Form Builder
- [x] Live Preview
- [x] Element Properties Panel
- [x] State Management (Context API)
- [x] Responsive Design
- [x] Notification System

### 🔄 **Đang phát triển**
- [ ] Export to Word/PDF (real implementation)
- [ ] Form validation system
- [ ] Element positioning & alignment tools
- [ ] Template versioning
- [ ] Collaborative editing

### 📋 **Kế hoạch tương lai**
- [ ] Backend API (Node.js + Express)
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User authentication & authorization
- [ ] Template marketplace
- [ ] Digital signature integration
- [ ] Mobile responsive improvements
- [ ] Offline support (PWA)
- [ ] AI-powered template suggestions

## 🛠️ Tech Stack

### Frontend
- **React** 18.2.0 - UI Library
- **Vite** 5.0 - Build tool & dev server
- **Tailwind CSS** 3.3 - Styling framework
- **@dnd-kit** - Drag and drop functionality
- **Lucide React** - Icon library
- **React Hook Form** - Form management
- **Zustand** - State management (planned)

### Planned Backend
- **Node.js** + **Express** - Server framework
- **MongoDB** / **PostgreSQL** - Database
- **JWT** - Authentication
- **Multer** - File upload
- **Node-docx** - Document generation

## 📄 API Documentation (Planned)

### Templates API
```bash
GET    /api/templates          # Get all templates
POST   /api/templates          # Create new template
GET    /api/templates/:id      # Get template by ID
PUT    /api/templates/:id      # Update template
DELETE /api/templates/:id      # Delete template
```

### Categories API
```bash
GET    /api/categories         # Get all categories
POST   /api/categories         # Create new category
```

### Export API
```bash
POST   /api/export/word        # Export to Word
POST   /api/export/pdf         # Export to PDF
```

## 🤝 Contributing

### Development Setup
```bash
# Clone repository
git clone <repo-url>
cd legal-form-builder

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Style
- Use **ES6+** syntax
- Follow **React** best practices
- Use **Tailwind CSS** for styling
- Write meaningful commit messages
- Add comments for complex logic

### Pull Request Process
1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Troubleshooting

### Common Issues

**1. Import errors with @components, @context aliases**
```bash
# Solution: Use relative imports instead
import Component from '../../components/Component'
```

**2. Tailwind styles not working**
```bash
# Check tailwind.config.js content paths
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
```

**3. Build errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**4. Vite dev server not starting**
```bash
# Check port availability
npm run dev -- --port 3001
```

## 📊 Performance

### Bundle Size (estimated)
- **Vendor chunk**: ~500KB (React, Lucide, etc.)
- **App chunk**: ~200KB (Application code)
- **Total gzipped**: ~250KB

### Optimization Tips
- Use React.lazy() for code splitting
- Optimize images and icons
- Enable Vite's build optimizations
- Use Tailwind's purge feature

## 📞 Support & Contact

### Issues & Bugs
- 🐛 **Bug Reports**: Create GitHub Issue với template
- 💡 **Feature Requests**: Discussion trong GitHub
- ❓ **Questions**: Stack Overflow với tag `legal-form-builder`

### Documentation
- 📚 **Wiki**: Detailed guides và tutorials
- 🎥 **Video Tutorials**: Coming soon
- 📖 **Blog Posts**: Best practices và tips

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - Amazing UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Next generation frontend tooling
- **dnd-kit** - Modern drag and drop library
- **Lucide** - Beautiful icon library

---

<div align="center">

**Made with ❤️ for the Vietnamese legal community**

⭐ **Star this repository if it helped you!** ⭐

</div>

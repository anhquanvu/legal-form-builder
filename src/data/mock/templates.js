// Sample categories
export const sampleCategories = {
  admin: {
    id: 'admin',
    name: 'Văn bản hành chính',
    description: 'Đơn từ, giấy tờ hành chính',
    icon: 'FileText',
    color: 'blue',
    count: 12,
    order: 1
  },
  civil: {
    id: 'civil',
    name: 'Văn bản dân sự',
    description: 'Hợp đồng, thỏa thuận dân sự',
    icon: 'Users',
    color: 'green',
    count: 8,
    order: 2
  },
  labor: {
    id: 'labor',
    name: 'Văn bản lao động',
    description: 'Hợp đồng lao động, quyền lợi người lao động',
    icon: 'Briefcase',
    color: 'orange',
    count: 15,
    order: 3
  },
  business: {
    id: 'business',
    name: 'Văn bản thương mại',
    description: 'Hợp đồng kinh doanh, văn bản công ty',
    icon: 'Building',
    color: 'purple',
    count: 6,
    order: 4
  },
  health: {
    id: 'health',
    name: 'Y tế',
    description: 'Văn bản y tế, sức khỏe',
    icon: 'Heart',
    color: 'red',
    count: 3,
    order: 5
  }
}

// Sample templates
export const sampleTemplates = [
  {
    id: 'don-xin-nghi-phep',
    metadata: {
      name: 'Đơn xin nghỉ phép',
      description: 'Mẫu đơn xin nghỉ phép chuẩn cho doanh nghiệp',
      category: 'admin',
      tags: ['nghỉ phép', 'nhân sự', 'đơn từ'],
      isPublic: true
    },
    author: 'Hệ thống',
    usageCount: 1250,
    rating: 4.8,
    isOfficial: true,
    createdAt: '2024-01-15T00:00:00Z',
    thumbnail: '📝',
    elements: [
      {
        id: 'title',
        type: 'text',
        properties: {
          content: 'ĐƠN XIN NGHỈ PHÉP',
          style: 'bold',
          size: 'xl',
          align: 'center'
        },
        position: { x: 0, y: 0 }
      },
      {
        id: 'greeting',
        type: 'text',
        properties: {
          content: 'Kính gửi: Ban Giám đốc Công ty',
          style: 'normal',
          size: 'md',
          align: 'left'
        },
        position: { x: 0, y: 1 }
      },
      {
        id: 'employee-name',
        type: 'input',
        properties: {
          label: 'Tôi là',
          placeholder: 'Nhập họ tên đầy đủ',
          required: true,
          maxLength: 100
        },
        position: { x: 0, y: 2 }
      },
      {
        id: 'employee-position',
        type: 'input',
        properties: {
          label: 'Chức vụ',
          placeholder: 'Nhập chức vụ hiện tại',
          required: true,
          maxLength: 50
        },
        position: { x: 0, y: 3 }
      },
      {
        id: 'leave-from',
        type: 'date',
        properties: {
          label: 'Xin được nghỉ phép từ ngày',
          format: 'dd/MM/yyyy',
          required: true
        },
        position: { x: 0, y: 4 }
      },
      {
        id: 'leave-to',
        type: 'date',
        properties: {
          label: 'Đến ngày',
          format: 'dd/MM/yyyy',
          required: true
        },
        position: { x: 0, y: 5 }
      },
      {
        id: 'leave-reason',
        type: 'textarea',
        properties: {
          label: 'Lý do nghỉ phép',
          placeholder: 'Nêu rõ lý do xin nghỉ phép...',
          required: true,
          rows: 4,
          maxLength: 500
        },
        position: { x: 0, y: 6 }
      },
      {
        id: 'signature',
        type: 'signature',
        properties: {
          label: 'Chữ ký người làm đơn',
          required: true,
          width: 300,
          height: 150
        },
        position: { x: 0, y: 7 }
      }
    ]
  },
  {
    id: 'hop-dong-lao-dong',
    metadata: {
      name: 'Hợp đồng lao động',
      description: 'Hợp đồng lao động theo luật định hiện hành',
      category: 'labor',
      tags: ['hợp đồng', 'lao động', 'tuyển dụng'],
      isPublic: true
    },
    author: 'Hệ thống',
    usageCount: 890,
    rating: 4.9,
    isOfficial: true,
    createdAt: '2024-01-10T00:00:00Z',
    thumbnail: '📋',
    elements: [
      {
        id: 'contract-title',
        type: 'text',
        properties: {
          content: 'HỢP ĐỒNG LAO ĐỘNG',
          style: 'bold',
          size: 'xl',
          align: 'center'
        },
        position: { x: 0, y: 0 }
      },
      {
        id: 'employer-section',
        type: 'text',
        properties: {
          content: 'BÊN A: NGƯỜI SỬ DỤNG LAO ĐỘNG',
          style: 'bold',
          size: 'lg',
          align: 'left'
        },
        position: { x: 0, y: 1 }
      },
      {
        id: 'company-name',
        type: 'input',
        properties: {
          label: 'Tên công ty',
          placeholder: 'Tên công ty/tổ chức',
          required: true,
          maxLength: 200
        },
        position: { x: 0, y: 2 }
      },
      {
        id: 'company-address',
        type: 'textarea',
        properties: {
          label: 'Địa chỉ trụ sở',
          placeholder: 'Địa chỉ trụ sở chính',
          required: true,
          rows: 2
        },
        position: { x: 0, y: 3 }
      },
      {
        id: 'employee-section',
        type: 'text',
        properties: {
          content: 'BÊN B: NGƯỜI LAO ĐỘNG',
          style: 'bold',
          size: 'lg',
          align: 'left'
        },
        position: { x: 0, y: 4 }
      },
      {
        id: 'employee-fullname',
        type: 'input',
        properties: {
          label: 'Họ và tên',
          placeholder: 'Họ tên đầy đủ',
          required: true,
          maxLength: 100
        },
        position: { x: 0, y: 5 }
      },
      {
        id: 'employee-dob',
        type: 'date',
        properties: {
          label: 'Ngày sinh',
          format: 'dd/MM/yyyy',
          required: true
        },
        position: { x: 0, y: 6 }
      },
      {
        id: 'employee-address',
        type: 'textarea',
        properties: {
          label: 'Địa chỉ thường trú',
          placeholder: 'Địa chỉ thường trú',
          required: true,
          rows: 2
        },
        position: { x: 0, y: 7 }
      },
      {
        id: 'contract-type',
        type: 'select',
        properties: {
          label: 'Loại hợp đồng',
          required: true,
          options: [
            { value: 'xac-dinh', label: 'Hợp đồng xác định thời hạn' },
            { value: 'khong-xac-dinh', label: 'Hợp đồng không xác định thời hạn' },
            { value: 'thu-viec', label: 'Hợp đồng thử việc' }
          ]
        },
        position: { x: 0, y: 8 }
      },
      {
        id: 'salary',
        type: 'input',
        properties: {
          label: 'Mức lương (VNĐ)',
          placeholder: 'VD: 15,000,000',
          required: true,
          maxLength: 20
        },
        position: { x: 0, y: 9 }
      }
    ]
  },
  {
    id: 'hop-dong-mua-ban',
    metadata: {
      name: 'Hợp đồng mua bán',
      description: 'Hợp đồng mua bán hàng hóa, tài sản',
      category: 'civil',
      tags: ['hợp đồng', 'mua bán', 'thương mại'],
      isPublic: true
    },
    author: 'Hệ thống',
    usageCount: 567,
    rating: 4.6,
    isOfficial: true,
    createdAt: '2024-01-12T00:00:00Z',
    thumbnail: '🤝',
    elements: [
      {
        id: 'contract-title',
        type: 'text',
        properties: {
          content: 'HỢP ĐỒNG MUA BÁN',
          style: 'bold',
          size: 'xl',
          align: 'center'
        },
        position: { x: 0, y: 0 }
      },
      {
        id: 'seller-section',
        type: 'text',
        properties: {
          content: 'BÊN BÁN (Bên A)',
          style: 'bold',
          size: 'lg',
          align: 'left'
        },
        position: { x: 0, y: 1 }
      },
      {
        id: 'seller-name',
        type: 'input',
        properties: {
          label: 'Tên bên bán',
          placeholder: 'Tên cá nhân/tổ chức',
          required: true,
          maxLength: 200
        },
        position: { x: 0, y: 2 }
      },
      {
        id: 'buyer-section',
        type: 'text',
        properties: {
          content: 'BÊN MUA (Bên B)',
          style: 'bold',
          size: 'lg',
          align: 'left'
        },
        position: { x: 0, y: 3 }
      },
      {
        id: 'buyer-name',
        type: 'input',
        properties: {
          label: 'Tên bên mua',
          placeholder: 'Tên cá nhân/tổ chức',
          required: true,
          maxLength: 200
        },
        position: { x: 0, y: 4 }
      },
      {
        id: 'product-description',
        type: 'textarea',
        properties: {
          label: 'Mô tả hàng hóa/tài sản',
          placeholder: 'Mô tả chi tiết về hàng hóa, tài sản được mua bán...',
          required: true,
          rows: 4
        },
        position: { x: 0, y: 5 }
      },
      {
        id: 'total-amount',
        type: 'input',
        properties: {
          label: 'Tổng giá trị hợp đồng (VNĐ)',
          placeholder: 'VD: 500,000,000',
          required: true,
          maxLength: 20
        },
        position: { x: 0, y: 6 }
      }
    ]
  },
  {
    id: 'phieu-kham-benh',
    metadata: {
      name: 'Phiếu khám bệnh',
      description: 'Phiếu khám bệnh cho bệnh viện, phòng khám',
      category: 'health',
      tags: ['y tế', 'khám bệnh', 'bệnh viện'],
      isPublic: false
    },
    author: 'BS. Nguyễn Văn A',
    usageCount: 45,
    rating: 4.2,
    isOfficial: false,
    createdAt: '2024-01-20T00:00:00Z',
    thumbnail: '🏥',
    elements: [
      {
        id: 'form-title',
        type: 'text',
        properties: {
          content: 'PHIẾU KHÁM BỆNH',
          style: 'bold',
          size: 'xl',
          align: 'center'
        },
        position: { x: 0, y: 0 }
      },
      {
        id: 'patient-name',
        type: 'input',
        properties: {
          label: 'Họ tên bệnh nhân',
          placeholder: 'Nhập họ tên đầy đủ',
          required: true,
          maxLength: 100
        },
        position: { x: 0, y: 1 }
      },
      {
        id: 'patient-age',
        type: 'input',
        properties: {
          label: 'Tuổi',
          placeholder: 'Nhập tuổi',
          required: true,
          maxLength: 3
        },
        position: { x: 0, y: 2 }
      },
      {
        id: 'patient-gender',
        type: 'select',
        properties: {
          label: 'Giới tính',
          required: true,
          options: [
            { value: 'nam', label: 'Nam' },
            { value: 'nu', label: 'Nữ' }
          ]
        },
        position: { x: 0, y: 3 }
      },
      {
        id: 'symptoms',
        type: 'textarea',
        properties: {
          label: 'Triệu chứng',
          placeholder: 'Mô tả các triệu chứng bệnh nhân gặp phải...',
          required: true,
          rows: 4
        },
        position: { x: 0, y: 4 }
      },
      {
        id: 'diagnosis',
        type: 'textarea',
        properties: {
          label: 'Chẩn đoán',
          placeholder: 'Chẩn đoán của bác sĩ...',
          required: false,
          rows: 3
        },
        position: { x: 0, y: 5 }
      },
      {
        id: 'prescription',
        type: 'textarea',
        properties: {
          label: 'Đơn thuốc',
          placeholder: 'Ghi rõ tên thuốc, liều lượng, cách dùng...',
          required: false,
          rows: 4
        },
        position: { x: 0, y: 6 }
      }
    ]
  }
]

// Element definitions for form builder
export const elementDefinitions = {
  text: {
    id: 'text',
    name: 'Văn bản',
    description: 'Hiển thị văn bản tĩnh',
    icon: '📝',
    category: 'basic',
    defaultProperties: {
      content: 'Văn bản mẫu',
      style: 'normal',
      size: 'md',
      align: 'left'
    }
  },
  input: {
    id: 'input',
    name: 'Ô nhập liệu',
    description: 'Ô nhập văn bản một dòng',
    icon: '✏️',
    category: 'basic',
    defaultProperties: {
      label: 'Nhãn field',
      placeholder: 'Nhập dữ liệu...',
      required: false,
      maxLength: 255
    }
  },
  textarea: {
    id: 'textarea',
    name: 'Vùng văn bản',
    description: 'Ô nhập văn bản nhiều dòng',
    icon: '📄',
    category: 'basic',
    defaultProperties: {
      label: 'Nhãn field',
      placeholder: 'Nhập nội dung...',
      rows: 4,
      required: false,
      maxLength: 1000
    }
  },
  date: {
    id: 'date',
    name: 'Ngày tháng',
    description: 'Chọn ngày tháng năm',
    icon: '📅',
    category: 'basic',
    defaultProperties: {
      label: 'Ngày',
      format: 'dd/MM/yyyy',
      required: false
    }
  },
  select: {
    id: 'select',
    name: 'Danh sách chọn',
    description: 'Chọn từ danh sách có sẵn',
    icon: '📋',
    category: 'basic',
    defaultProperties: {
      label: 'Chọn',
      options: [
        { value: 'option1', label: 'Lựa chọn 1' },
        { value: 'option2', label: 'Lựa chọn 2' }
      ],
      required: false
    }
  },
  checkbox: {
    id: 'checkbox',
    name: 'Hộp kiểm',
    description: 'Lựa chọn có/không',
    icon: '☑️',
    category: 'basic',
    defaultProperties: {
      label: 'Tùy chọn',
      required: false,
      defaultChecked: false
    }
  },
  radio: {
    id: 'radio',
    name: 'Nút radio',
    description: 'Chọn một trong nhiều lựa chọn',
    icon: '🔘',
    category: 'basic',
    defaultProperties: {
      label: 'Chọn một',
      options: [
        { value: 'option1', label: 'Lựa chọn 1' },
        { value: 'option2', label: 'Lựa chọn 2' }
      ],
      required: false,
      layout: 'vertical'
    }
  },
  signature: {
    id: 'signature',
    name: 'Chữ ký',
    description: 'Khu vực ký tên điện tử',
    icon: '✍️',
    category: 'advanced',
    defaultProperties: {
      label: 'Chữ ký',
      required: false,
      width: 300,
      height: 150
    }
  },
  table: {
    id: 'table',
    name: 'Bảng',
    description: 'Bảng dữ liệu có thể chỉnh sửa',
    icon: '📊',
    category: 'advanced',
    defaultProperties: {
      label: 'Bảng dữ liệu',
      columns: [
        { key: 'col1', title: 'Cột 1', type: 'text', width: 150 },
        { key: 'col2', title: 'Cột 2', type: 'text', width: 150 }
      ],
      rows: 3,
      allowAddRow: true,
      allowDeleteRow: true
    }
  }
}
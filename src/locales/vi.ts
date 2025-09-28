// Vietnamese translations
export const vi = {
  // Common
  common: {
    loading: 'Đang tải...',
    error: 'Lỗi',
    success: 'Thành công',
    cancel: 'Hủy',
    confirm: 'Xác nhận',
    save: 'Lưu',
    delete: 'Xóa',
    edit: 'Chỉnh sửa',
    close: 'Đóng',
  },

  // Navigation
  navigation: {
    dashboard: 'Bảng điều khiển',
    chat: 'Trò chuyện',
    settings: 'Cài đặt',
    login: 'Đăng nhập',
    logout: 'Đăng xuất',
    register: 'Đăng ký',
  },

  // App branding
  app: {
    name: 'App Chat',
    welcome: 'Chào mừng đến với App Chat',
    welcomeBack: 'Chào mừng bạn quay lại App Chat',
    redirecting: 'Đang chuyển hướng đến bảng điều khiển...',
  },

  // Authentication
  auth: {
    signIn: 'Đăng nhập',
    signingIn: 'Đang đăng nhập...',
    username: 'Tên đăng nhập',
    password: 'Mật khẩu',
    enterUsername: 'Nhập tên đăng nhập của bạn',
    enterPassword: 'Nhập mật khẩu của bạn',
    usernameRequired: 'Vui lòng nhập tên đăng nhập',
    passwordRequired: 'Vui lòng nhập mật khẩu',
    invalidCredentials: 'Tên đăng nhập hoặc mật khẩu không hợp lệ',
    loginSuccess: 'Đăng nhập thành công!',
    loginFailed: 'Đăng nhập thất bại',
    dontHaveAccount: 'Chưa có tài khoản?',
    signUp: 'Đăng ký',
  },

  // Home page
  home: {
    title: 'Chào mừng đến với App Chat',
    description: 'Ứng dụng trò chuyện hiện đại kết nối mọi người trên toàn thế giới. Được xây dựng với Next.js và thiết kế cho giao tiếp liền mạch.',
    getStarted: 'Nhấp vào nút Đăng nhập trong tiêu đề để bắt đầu',
    features: 'Tính năng',
    gettingStarted: 'Bắt đầu',
    featuresList: {
      realtimeMessaging: 'Tin nhắn thời gian thực',
      crossTabSync: 'Đồng bộ hóa giữa các tab',
      modernUI: 'Thiết kế giao diện hiện đại',
      responsiveLayout: 'Bố cục đáp ứng',
    },
    gettingStartedList: {
      clickLogin: 'Nhấp Đăng nhập trong tiêu đề',
      enterCredentials: 'Nhập thông tin đăng nhập',
      startChatting: 'Bắt đầu trò chuyện!',
      tryMultipleTabs: 'Thử nhiều tab',
    },
  },

  // Language
  language: {
    selectLanguage: 'Chọn ngôn ngữ',
    currentLanguage: 'Ngôn ngữ hiện tại',
  },
} as const;

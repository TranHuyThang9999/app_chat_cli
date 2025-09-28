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
    retry: 'Thử lại',
    reset: 'Đặt lại',
  },

  // File
  file: {
    upload: 'Tải lên',
    uploading: 'Đang tải lên...',
    uploadSuccess: 'Tải file thành công',
    uploadFailed: 'Tải file thất bại',
    dragDrop: 'Nhấp hoặc kéo file vào khu vực này để tải lên',
    supportSingle: 'Hỗ trợ tải lên một file.',
    supportMultiple: 'Hỗ trợ tải lên nhiều file.',
    selectFileFirst: 'Vui lòng chọn file trước',
    selectFile: 'Chọn File',
  },

  // Navigation
  navigation: {
    dashboard: 'Bảng điều khiển',
    chat: 'Trò chuyện',
    settings: 'Cài đặt',
    login: 'Đăng nhập',
    logout: 'Đăng xuất',
    register: 'Đăng ký',
    profile: 'Hồ sơ',
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
    createAccount: 'Tạo tài khoản mới',
    alreadyHaveAccount: 'Đã có tài khoản?',
    register: 'Đăng ký',
    registering: 'Đang đăng ký...',
    registerSuccess: 'Đăng ký thành công!',
    registerFailed: 'Đăng ký thất bại',
    nickname: 'Tên hiển thị',
    enterNickname: 'Nhập tên hiển thị của bạn',
    nicknameRequired: 'Vui lòng nhập tên hiển thị',
    email: 'Email',
    enterEmail: 'Nhập email của bạn',
    emailRequired: 'Vui lòng nhập email',
    emailInvalid: 'Vui lòng nhập email hợp lệ',
    confirmPassword: 'Xác nhận mật khẩu',
    enterConfirmPassword: 'Xác nhận mật khẩu của bạn',
    confirmPasswordRequired: 'Vui lòng xác nhận mật khẩu',
    passwordsNotMatch: 'Hai mật khẩu không khớp',
    phoneNumber: 'Số điện thoại',
    enterPhoneNumber: 'Nhập số điện thoại của bạn',
  },

  // Home page
  home: {
    title: 'Chào mừng đến với App Chat',
    description: 'Một ứng dụng chat hiện đại kết nối mọi người trên toàn thế giới. Được xây dựng với Next.js và thiết kế cho giao tiếp liền mạch.',
    getStarted: 'Nhấp vào nút Đăng nhập trong tiêu đề để bắt đầu',
    features: 'Tính năng',
    gettingStarted: 'Bắt đầu',
    featuresList: {
      realtimeMessaging: 'Nhắn tin thời gian thực',
      crossTabSync: 'Đồng bộ hóa đa tab',
      modernUI: 'Thiết kế giao diện hiện đại',
      responsiveLayout: 'Bố cục phản hồi',
    },
    gettingStartedList: {
      clickLogin: 'Nhấp vào Đăng nhập trong tiêu đề',
      enterCredentials: 'Nhập thông tin đăng nhập của bạn',
      startChatting: 'Bắt đầu trò chuyện!',
      tryMultipleTabs: 'Thử nhiều tab',
    },
  },

  // Language
  language: {
    selectLanguage: 'Chọn ngôn ngữ',
    currentLanguage: 'Ngôn ngữ hiện tại',
  },

  // Profile
  profile: {
    personalInfo: 'Thông tin cá nhân',
    additionalInfo: 'Thông tin bổ sung',
    username: 'Tên đăng nhập',
    nickname: 'Tên hiển thị',
    email: 'Email',
    phone: 'Số điện thoại',
    gender: 'Giới tính',
    age: 'Tuổi',
    birthDate: 'Ngày sinh',
    address: 'Địa chỉ',
    memberSince: 'Thành viên từ',
    male: 'Nam',
    female: 'Nữ',
    notSpecified: 'Không xác định',
    fetchError: 'Không thể tải thông tin hồ sơ',
    noData: 'Không có dữ liệu hồ sơ',
    enterAge: 'Nhập tuổi của bạn',
    selectBirthDate: 'Chọn ngày sinh của bạn',
    enterAddress: 'Nhập địa chỉ của bạn',
    updateAvatar: 'Cập nhật ảnh đại diện',
    updateProfile: 'Cập nhật hồ sơ',
    updating: 'Đang cập nhật...',
    updateSuccess: 'Cập nhật hồ sơ thành công',
    updateFailed: 'Không thể cập nhật hồ sơ',
  },
} as const;
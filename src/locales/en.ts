// English translations
export const en = {
  // Common
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
    retry: 'Retry',
    reset: 'Reset',
  },

  // File
  file: {
    upload: 'Upload',
    uploading: 'Uploading...',
    uploadSuccess: 'File uploaded successfully',
    uploadFailed: 'File upload failed',
    dragDrop: 'Click or drag file to this area to upload',
    supportSingle: 'Support for a single file upload.',
    supportMultiple: 'Support for multiple file upload.',
    selectFileFirst: 'Please select a file first',
    selectFile: 'Select File',
  },

  // Navigation
  navigation: {
    dashboard: 'Dashboard',
    chat: 'Chat',
    settings: 'Settings',
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    profile: 'Profile',
  },

  // App branding
  app: {
    name: 'App Chat',
    welcome: 'Welcome to App Chat',
    welcomeBack: 'Welcome back to App Chat',
    redirecting: 'Redirecting to dashboard...',
  },

  // Authentication
  auth: {
    signIn: 'Sign In',
    signingIn: 'Signing In...',
    username: 'Username',
    password: 'Password',
    enterUsername: 'Enter your username',
    enterPassword: 'Enter your password',
    usernameRequired: 'Please input your username',
    passwordRequired: 'Please input your password',
    invalidCredentials: 'Invalid username or password',
    loginSuccess: 'Login successful!',
    loginFailed: 'Login failed',
    dontHaveAccount: "Don't have an account?",
    signUp: 'Sign up',
    createAccount: 'Create a new account',
    alreadyHaveAccount: 'Already have an account?',
    register: 'Register',
    registering: 'Registering...',
    registerSuccess: 'Registration successful!',
    registerFailed: 'Registration failed',
    nickname: 'Nickname',
    enterNickname: 'Enter your nickname',
    nicknameRequired: 'Please input your nickname',
    email: 'Email',
    enterEmail: 'Enter your email',
    emailRequired: 'Please input your email',
    emailInvalid: 'Please enter a valid email',
    confirmPassword: 'Confirm Password',
    enterConfirmPassword: 'Confirm your password',
    confirmPasswordRequired: 'Please confirm your password',
    passwordsNotMatch: 'The two passwords do not match',
    phoneNumber: 'Phone Number',
    enterPhoneNumber: 'Enter your phone number',
  },

  // Home page
  home: {
    title: 'Welcome to App Chat',
    description: 'A modern chat application that connects people around the world. Built with Next.js and designed for seamless communication.',
    getStarted: 'Click the Login button in the header to get started',
    features: 'Features',
    gettingStarted: 'Getting Started',
    featuresList: {
      realtimeMessaging: 'Real-time messaging',
      crossTabSync: 'Cross-tab synchronization',
      modernUI: 'Modern UI design',
      responsiveLayout: 'Responsive layout',
    },
    gettingStartedList: {
      clickLogin: 'Click Login in header',
      enterCredentials: 'Enter your credentials',
      startChatting: 'Start chatting!',
      tryMultipleTabs: 'Try multiple tabs',
    },
  },

  // Language
  language: {
    selectLanguage: 'Select Language',
    currentLanguage: 'Current Language',
  },

  // Profile
  profile: {
    personalInfo: 'Personal Information',
    additionalInfo: 'Additional Information',
    username: 'Username',
    nickname: 'Nickname',
    email: 'Email',
    phone: 'Phone Number',
    gender: 'Gender',
    age: 'Age',
    birthDate: 'Birth Date',
    address: 'Address',
    memberSince: 'Member Since',
    male: 'Male',
    female: 'Female',
    notSpecified: 'Not Specified',
    fetchError: 'Failed to fetch profile information',
    noData: 'No profile data available',
    enterAge: 'Enter your age',
    selectBirthDate: 'Select your birth date',
    enterAddress: 'Enter your address',
    updateAvatar: 'Update Avatar',
    updateProfile: 'Update Profile',
    updating: 'Updating...',
    updateSuccess: 'Profile updated successfully',
    updateFailed: 'Failed to update profile',
    editProfile: 'Edit Profile',
  },
} as const;
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
  },

  // Navigation
  navigation: {
    dashboard: 'Dashboard',
    chat: 'Chat',
    settings: 'Settings',
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
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
} as const;

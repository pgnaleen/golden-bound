export type Language = "en" | "he" | "ar" | "es" | "fr"

export interface Translations {
  // Authentication
  welcomeBack: string
  enterCredentials: string
  username: string
  password: string
  signIn: string
  signingIn: string
  forgotPassword: string
  dontHaveAccount: string
  createAccount: string

  // Registration
  enterInfoToCreateAccount: string
  firstName: string
  lastName: string
  email: string
  confirmPassword: string
  firstNamePlaceholder: string
  lastNamePlaceholder: string
  usernamePlaceholder: string
  emailPlaceholder: string
  createPasswordPlaceholder: string
  confirmPasswordPlaceholder: string
  creatingAccount: string
  alreadyHaveAccount: string
  signInHere: string

  // Forgot Password
  forgotPasswordTitle: string
  forgotPasswordDescription: string
  emailAddress: string
  emailAddressPlaceholder: string
  sendResetLink: string
  sendingResetLink: string
  backToSignIn: string
  checkYourEmail: string
  resetLinkSent: string
  emailNotFoundMessage: string
  tryDifferentEmail: string
  resetEmailFailed: string

  // Dashboard
  dashboard: string
  overview: string
  analytics: string
  settings: string
  logout: string
  welcome: string
  users: string
  reports: string
  profile: string
  account: string
  security: string
  notifications: string
  billing: string
  support: string
  documentation: string

  // Common
  loading: string
  error: string
  success: string
  cancel: string
  save: string

  // Validation Errors
  fillAllFields: string
  invalidCredentials: string
  sessionExpired: string
  invalidEmail: string
  passwordTooShort: string
  passwordsDoNotMatch: string
  usernameRequired: string
  emailRequired: string
  passwordRequired: string
  firstNameRequired: string
  lastNameRequired: string

  // Verification
  verification: {
    title: string
    description: string
    verify: string
    verifying: string
    noCode: string
    resend: string
    resending: string
    resendIn: string
    backToRegister: string
    error: string
    networkError: string
    resendError: string
  }
}

const translations: Record<Language, Translations> = {
  en: {
    // Authentication
    welcomeBack: "Welcome back",
    enterCredentials: "Enter your credentials to access your account",
    username: "Username",
    password: "Password",
    signIn: "Sign in",
    signingIn: "Signing in...",
    forgotPassword: "Forgot password?",
    dontHaveAccount: "Don't have an account?",
    createAccount: "Create account",

    // Registration
    enterInfoToCreateAccount: "Enter your information to create your account",
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    confirmPassword: "Confirm password",
    firstNamePlaceholder: "John",
    lastNamePlaceholder: "Doe",
    usernamePlaceholder: "Enter your username",
    emailPlaceholder: "Enter your email",
    createPasswordPlaceholder: "Create a password",
    confirmPasswordPlaceholder: "Confirm your password",
    creatingAccount: "Creating account...",
    alreadyHaveAccount: "Already have an account?",
    signInHere: "Sign in here",

    // Forgot Password
    forgotPasswordTitle: "Forgot password?",
    forgotPasswordDescription: "Enter your email address and we'll send you a link to reset your password",
    emailAddress: "Email address",
    emailAddressPlaceholder: "Enter your email address",
    sendResetLink: "Send reset link",
    sendingResetLink: "Sending reset link...",
    backToSignIn: "Back to sign in",
    checkYourEmail: "Check your email",
    resetLinkSent: "We've sent a password reset link to",
    emailNotFoundMessage: "If you don't see the email in your inbox, please check your spam folder.",
    tryDifferentEmail: "Try a different email",
    resetEmailFailed: "Failed to send reset email. Please try again.",

    // Dashboard
    dashboard: "Dashboard",
    overview: "Overview",
    analytics: "Analytics",
    settings: "Settings",
    logout: "Logout",
    welcome: "Welcome",
    users: "Users",
    reports: "Reports",
    profile: "Profile",
    account: "Account",
    security: "Security",
    notifications: "Notifications",
    billing: "Billing",
    support: "Support",
    documentation: "Documentation",

    // Common
    loading: "Loading...",
    error: "Error",
    success: "Success",
    cancel: "Cancel",
    save: "Save",

    // Validation Errors
    fillAllFields: "Please fill in all fields",
    invalidCredentials: "Invalid username or password. Please try again.",
    sessionExpired: "Session expired. Please sign in again.",
    invalidEmail: "Please enter a valid email address",
    passwordTooShort: "Password must be at least 6 characters long",
    passwordsDoNotMatch: "Passwords do not match",
    usernameRequired: "Username is required",
    emailRequired: "Email is required",
    passwordRequired: "Password is required",
    firstNameRequired: "First name is required",
    lastNameRequired: "Last name is required",

    // Verification
    verification: {
      title: "Verify Your Email",
      description: "We've sent a 6-digit verification code to",
      verify: "Verify Email",
      verifying: "Verifying...",
      noCode: "Didn't receive the code?",
      resend: "Resend Code",
      resending: "Resending...",
      resendIn: "Resend in",
      backToRegister: "Back to Registration",
      error: "Invalid verification code. Please try again.",
      networkError: "Network error. Please check your connection.",
      resendError: "Failed to resend code. Please try again.",
    },
  },
  he: {
    // Authentication
    welcomeBack: "ברוכים השבים",
    enterCredentials: "הזינו את פרטי הכניסה שלכם כדי לגשת לחשבון",
    username: "שם משתמש",
    password: "סיסמה",
    signIn: "התחברות",
    signingIn: "מתחבר...",
    forgotPassword: "שכחתם סיסמה?",
    dontHaveAccount: "אין לכם חשבון?",
    createAccount: "צור חשבון",

    // Registration
    enterInfoToCreateAccount: "הזינו את המידע שלכם כדי ליצור חשבון",
    firstName: "שם פרטי",
    lastName: "שם משפחה",
    email: "דוא״ל",
    confirmPassword: "אימות סיסמה",
    firstNamePlaceholder: "יוחנן",
    lastNamePlaceholder: "כהן",
    usernamePlaceholder: "הזינו שם משתמש",
    emailPlaceholder: "הזינו כתובת דוא״ל",
    createPasswordPlaceholder: "צרו סיסמה",
    confirmPasswordPlaceholder: "אמתו את הסיסמה",
    creatingAccount: "יוצר חשבון...",
    alreadyHaveAccount: "כבר יש לכם חשבון?",
    signInHere: "התחברו כאן",

    // Forgot Password
    forgotPasswordTitle: "שכחתם סיסמה?",
    forgotPasswordDescription: "הזינו את כתובת המייל שלכם ונשלח לכם קישור לאיפוס הסיסמה",
    emailAddress: "כתובת דוא״ל",
    emailAddressPlaceholder: "הזינו את כתובת הדוא״ל",
    sendResetLink: "שלח קישור איפוס",
    sendingResetLink: "שולח קישור איפוס...",
    backToSignIn: "חזרה להתחברות",
    checkYourEmail: "בדקו את המייל שלכם",
    resetLinkSent: "שלחנו קישור איפוס סיסמה אל",
    emailNotFoundMessage: "אם אינכם רואים את המייל בתיבת הדואר הנכנס, אנא בדקו בתיקיית הספאם.",
    tryDifferentEmail: "נסו כתובת מייל אחרת",
    resetEmailFailed: "שליחת מייל האיפוס נכשלה. אנא נסו שוב.",

    // Dashboard
    dashboard: "לוח בקרה",
    overview: "סקירה כללית",
    analytics: "אנליטיקה",
    settings: "הגדרות",
    logout: "התנתקות",
    welcome: "ברוכים הבאים",
    users: "משתמשים",
    reports: "דוחות",
    profile: "פרופיל",
    account: "חשבון",
    security: "אבטחה",
    notifications: "התראות",
    billing: "חיוב",
    support: "תמיכה",
    documentation: "תיעוד",

    // Common
    loading: "טוען...",
    error: "שגיאה",
    success: "הצלחה",
    cancel: "ביטול",
    save: "שמירה",

    // Validation Errors
    fillAllFields: "אנא מלאו את כל השדות",
    invalidCredentials: "שם משתמש או סיסמה שגויים. אנא נסו שוב.",
    sessionExpired: "פג תוקף ההתחברות. אנא התחברו שוב.",
    invalidEmail: "אנא הזינו כתובת דוא״ל תקינה",
    passwordTooShort: "הסיסמה חייבת להכיל לפחות 6 תווים",
    passwordsDoNotMatch: "הסיסמאות אינן תואמות",
    usernameRequired: "שם משתמש נדרש",
    emailRequired: "דוא״ל נדרש",
    passwordRequired: "סיסמה נדרשת",
    firstNameRequired: "שם פרטי נדרש",
    lastNameRequired: "שם משפחה נדרש",

    // Verification
    verification: {
      title: "אמתו את כתובת המייל",
      description: "שלחנו קוד אימות בן 6 ספרות אל",
      verify: "אמת מייל",
      verifying: "מאמת...",
      noCode: "לא קיבלתם את הקוד?",
      resend: "שלח קוד מחדש",
      resending: "שולח מחדש...",
      resendIn: "שלח מחדש בעוד",
      backToRegister: "חזרה להרשמה",
      error: "קוד אימות שגוי. אנא נסו שוב.",
      networkError: "שגיאת רשת. אנא בדקו את החיבור.",
      resendError: "שליחת הקוד נכשלה. אנא נסו שוב.",
    },
  },
  ar: {
    // Authentication
    welcomeBack: "مرحباً بعودتك",
    enterCredentials: "أدخل بيانات الاعتماد للوصول إلى حسابك",
    username: "اسم المستخدم",
    password: "كلمة المرور",
    signIn: "تسجيل الدخول",
    signingIn: "جاري تسجيل الدخول...",
    forgotPassword: "نسيت كلمة المرور؟",
    dontHaveAccount: "ليس لديك حساب؟",
    createAccount: "إنشاء حساب",

    // Registration
    enterInfoToCreateAccount: "أدخل معلوماتك لإنشاء حسابك",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    email: "البريد الإلكتروني",
    confirmPassword: "تأكيد كلمة المرور",
    firstNamePlaceholder: "أحمد",
    lastNamePlaceholder: "محمد",
    usernamePlaceholder: "أدخل اسم المستخدم",
    emailPlaceholder: "أدخل بريدك الإلكتروني",
    createPasswordPlaceholder: "إنشاء كلمة مرور",
    confirmPasswordPlaceholder: "تأكيد كلمة المرور",
    creatingAccount: "جاري إنشاء الحساب...",
    alreadyHaveAccount: "لديك حساب بالفعل؟",
    signInHere: "سجل الدخول هنا",

    // Forgot Password
    forgotPasswordTitle: "نسيت كلمة المرور؟",
    forgotPasswordDescription: "أدخل عنوان بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين كلمة المرور",
    emailAddress: "عنوان البريد الإلكتروني",
    emailAddressPlaceholder: "أدخل عنوان بريدك الإلكتروني",
    sendResetLink: "إرسال رابط الإعادة",
    sendingResetLink: "جاري إرسال رابط الإعادة...",
    backToSignIn: "العودة لتسجيل الدخول",
    checkYourEmail: "تحقق من بريدك الإلكتروني",
    resetLinkSent: "لقد أرسلنا رابط إعادة تعيين كلمة المرور إلى",
    emailNotFoundMessage: "إذا لم تر البريد الإلكتروني في صندوق الوارد، يرجى التحقق من مجلد الرسائل غير المرغوب فيها.",
    tryDifferentEmail: "جرب بريد إلكتروني مختلف",
    resetEmailFailed: "فشل في إرسال بريد الإعادة. يرجى المحاولة مرة أخرى.",

    // Dashboard
    dashboard: "لوحة التحكم",
    overview: "نظرة عامة",
    analytics: "التحليلات",
    settings: "الإعدادات",
    logout: "تسجيل الخروج",
    welcome: "مرحباً",
    users: "المستخدمون",
    reports: "التقارير",
    profile: "الملف الشخصي",
    account: "الحساب",
    security: "الأمان",
    notifications: "الإشعارات",
    billing: "الفواتير",
    support: "الدعم",
    documentation: "التوثيق",

    // Common
    loading: "جاري التحميل...",
    error: "خطأ",
    success: "نجح",
    cancel: "إلغاء",
    save: "حفظ",

    // Validation Errors
    fillAllFields: "يرجى ملء جميع الحقول",
    invalidCredentials: "اسم المستخدم أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.",
    sessionExpired: "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.",
    invalidEmail: "يرجى إدخال عنوان بريد إلكتروني صالح",
    passwordTooShort: "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل",
    passwordsDoNotMatch: "كلمات المرور غير متطابقة",
    usernameRequired: "اسم المستخدم مطلوب",
    emailRequired: "البريد الإلكتروني مطلوب",
    passwordRequired: "كلمة المرور مطلوبة",
    firstNameRequired: "الاسم الأول مطلوب",
    lastNameRequired: "اسم العائلة مطلوب",

    // Verification
    verification: {
      title: "تحقق من بريدك الإلكتروني",
      description: "لقد أرسلنا رمز تحقق مكون من 6 أرقام إلى",
      verify: "تحقق من البريد الإلكتروني",
      verifying: "جاري التحقق...",
      noCode: "لم تستلم الرمز؟",
      resend: "إعادة إرسال الرمز",
      resending: "جاري الإرسال مرة أخرى...",
      resendIn: "إعادة الإرسال خلال",
      backToRegister: "العودة للتسجيل",
      error: "رمز التحقق غير صالح. يرجى المحاولة مرة أخرى.",
      networkError: "خطأ في الشبكة. يرجى التحقق من اتصالك.",
      resendError: "فشل في إعادة إرسال الرمز. يرجى المحاولة مرة أخرى.",
    },
  },
  es: {
    // Authentication
    welcomeBack: "Bienvenido de vuelta",
    enterCredentials: "Ingresa tus credenciales para acceder a tu cuenta",
    username: "Nombre de usuario",
    password: "Contraseña",
    signIn: "Iniciar sesión",
    signingIn: "Iniciando sesión...",
    forgotPassword: "¿Olvidaste tu contraseña?",
    dontHaveAccount: "¿No tienes una cuenta?",
    createAccount: "Crear cuenta",

    // Registration
    enterInfoToCreateAccount: "Ingresa tu información para crear tu cuenta",
    firstName: "Nombre",
    lastName: "Apellido",
    email: "Correo electrónico",
    confirmPassword: "Confirmar contraseña",
    firstNamePlaceholder: "Juan",
    lastNamePlaceholder: "Pérez",
    usernamePlaceholder: "Ingresa tu nombre de usuario",
    emailPlaceholder: "Ingresa tu correo electrónico",
    createPasswordPlaceholder: "Crear una contraseña",
    confirmPasswordPlaceholder: "Confirma tu contraseña",
    creatingAccount: "Creando cuenta...",
    alreadyHaveAccount: "¿Ya tienes una cuenta?",
    signInHere: "Inicia sesión aquí",

    // Forgot Password
    forgotPasswordTitle: "¿Olvidaste tu contraseña?",
    forgotPasswordDescription:
      "Ingresa tu dirección de correo electrónico y te enviaremos un enlace para restablecer tu contraseña",
    emailAddress: "Dirección de correo electrónico",
    emailAddressPlaceholder: "Ingresa tu dirección de correo electrónico",
    sendResetLink: "Enviar enlace de restablecimiento",
    sendingResetLink: "Enviando enlace de restablecimiento...",
    backToSignIn: "Volver al inicio de sesión",
    checkYourEmail: "Revisa tu correo electrónico",
    resetLinkSent: "Hemos enviado un enlace de restablecimiento de contraseña a",
    emailNotFoundMessage: "Si no ves el correo electrónico en tu bandeja de entrada, revisa tu carpeta de spam.",
    tryDifferentEmail: "Prueba con un correo electrónico diferente",
    resetEmailFailed: "Error al enviar el correo de restablecimiento. Inténtalo de nuevo.",

    // Dashboard
    dashboard: "Panel de control",
    overview: "Resumen",
    analytics: "Analíticas",
    settings: "Configuración",
    logout: "Cerrar sesión",
    welcome: "Bienvenido",
    users: "Usuarios",
    reports: "Informes",
    profile: "Perfil",
    account: "Cuenta",
    security: "Seguridad",
    notifications: "Notificaciones",
    billing: "Facturación",
    support: "Soporte",
    documentation: "Documentación",

    // Common
    loading: "Cargando...",
    error: "Error",
    success: "Éxito",
    cancel: "Cancelar",
    save: "Guardar",

    // Validation Errors
    fillAllFields: "Por favor completa todos los campos",
    invalidCredentials: "Nombre de usuario o contraseña inválidos. Inténtalo de nuevo.",
    sessionExpired: "Sesión expirada. Inicia sesión de nuevo.",
    invalidEmail: "Por favor ingresa una dirección de correo electrónico válida",
    passwordTooShort: "La contraseña debe tener al menos 6 caracteres",
    passwordsDoNotMatch: "Las contraseñas no coinciden",
    usernameRequired: "El nombre de usuario es requerido",
    emailRequired: "El correo electrónico es requerido",
    passwordRequired: "La contraseña es requerida",
    firstNameRequired: "El nombre es requerido",
    lastNameRequired: "El apellido es requerido",

    // Verification
    verification: {
      title: "Verifica tu correo electrónico",
      description: "Hemos enviado un código de verificación de 6 dígitos a",
      verify: "Verificar correo electrónico",
      verifying: "Verificando...",
      noCode: "¿No recibiste el código?",
      resend: "Reenviar código",
      resending: "Reenviando...",
      resendIn: "Reenviar en",
      backToRegister: "Volver al registro",
      error: "Código de verificación inválido. Inténtalo de nuevo.",
      networkError: "Error de red. Verifica tu conexión.",
      resendError: "Error al reenviar el código. Inténtalo de nuevo.",
    },
  },
  fr: {
    // Authentication
    welcomeBack: "Bon retour",
    enterCredentials: "Entrez vos identifiants pour accéder à votre compte",
    username: "Nom d'utilisateur",
    password: "Mot de passe",
    signIn: "Se connecter",
    signingIn: "Connexion en cours...",
    forgotPassword: "Mot de passe oublié ?",
    dontHaveAccount: "Vous n'avez pas de compte ?",
    createAccount: "Créer un compte",

    // Registration
    enterInfoToCreateAccount: "Entrez vos informations pour créer votre compte",
    firstName: "Prénom",
    lastName: "Nom de famille",
    email: "E-mail",
    confirmPassword: "Confirmer le mot de passe",
    firstNamePlaceholder: "Jean",
    lastNamePlaceholder: "Dupont",
    usernamePlaceholder: "Entrez votre nom d'utilisateur",
    emailPlaceholder: "Entrez votre e-mail",
    createPasswordPlaceholder: "Créer un mot de passe",
    confirmPasswordPlaceholder: "Confirmez votre mot de passe",
    creatingAccount: "Création du compte...",
    alreadyHaveAccount: "Vous avez déjà un compte ?",
    signInHere: "Connectez-vous ici",

    // Forgot Password
    forgotPasswordTitle: "Mot de passe oublié ?",
    forgotPasswordDescription:
      "Entrez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe",
    emailAddress: "Adresse e-mail",
    emailAddressPlaceholder: "Entrez votre adresse e-mail",
    sendResetLink: "Envoyer le lien de réinitialisation",
    sendingResetLink: "Envoi du lien de réinitialisation...",
    backToSignIn: "Retour à la connexion",
    checkYourEmail: "Vérifiez votre e-mail",
    resetLinkSent: "Nous avons envoyé un lien de réinitialisation de mot de passe à",
    emailNotFoundMessage: "Si vous ne voyez pas l'e-mail dans votre boîte de réception, vérifiez votre dossier spam.",
    tryDifferentEmail: "Essayez un autre e-mail",
    resetEmailFailed: "Échec de l'envoi de l'e-mail de réinitialisation. Veuillez réessayer.",

    // Dashboard
    dashboard: "Tableau de bord",
    overview: "Aperçu",
    analytics: "Analytiques",
    settings: "Paramètres",
    logout: "Se déconnecter",
    welcome: "Bienvenue",
    users: "Utilisateurs",
    reports: "Rapports",
    profile: "Profil",
    account: "Compte",
    security: "Sécurité",
    notifications: "Notifications",
    billing: "Facturation",
    support: "Support",
    documentation: "Documentation",

    // Common
    loading: "Chargement...",
    error: "Erreur",
    success: "Succès",
    cancel: "Annuler",
    save: "Enregistrer",

    // Validation Errors
    fillAllFields: "Veuillez remplir tous les champs",
    invalidCredentials: "Nom d'utilisateur ou mot de passe invalide. Veuillez réessayer.",
    sessionExpired: "Session expirée. Veuillez vous reconnecter.",
    invalidEmail: "Veuillez entrer une adresse e-mail valide",
    passwordTooShort: "Le mot de passe doit contenir au moins 6 caractères",
    passwordsDoNotMatch: "Les mots de passe ne correspondent pas",
    usernameRequired: "Le nom d'utilisateur est requis",
    emailRequired: "L'e-mail est requis",
    passwordRequired: "Le mot de passe est requis",
    firstNameRequired: "Le prénom est requis",
    lastNameRequired: "Le nom de famille est requis",

    // Verification
    verification: {
      title: "Vérifiez votre e-mail",
      description: "Nous avons envoyé un code de vérification à 6 chiffres à",
      verify: "Vérifier l'e-mail",
      verifying: "Vérification...",
      noCode: "Vous n'avez pas reçu le code ?",
      resend: "Renvoyer le code",
      resending: "Renvoi...",
      resendIn: "Renvoyer dans",
      backToRegister: "Retour à l'inscription",
      error: "Code de vérification invalide. Veuillez réessayer.",
      networkError: "Erreur réseau. Vérifiez votre connexion.",
      resendError: "Échec du renvoi du code. Veuillez réessayer.",
    },
  },
}

export function getTranslations(language: Language): Translations {
  return translations[language]
}

export function isRTL(language: Language): boolean {
  return language === "he" || language === "ar"
}

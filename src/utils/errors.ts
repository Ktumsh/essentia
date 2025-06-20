export const resultMessages = {
  // Autenticación y cuenta
  USER_CREATED: "¡Usuario creado! Verifica tu correo para activar tu cuenta",
  USER_LOGGED_IN: "¡Bienvenido de nuevo!",
  USER_DISABLED: "¡Usuario deshabilitado!",
  INVALID_CREDENTIALS: "¡Credenciales inválidas!",
  EMAIL_NOT_VERIFIED: "Correo no verificado, revisa tu bandeja de entrada",
  EMAIL_AVAILABLE: "Este correo electrónico está disponible",
  EMAIL_EXISTS: "Este correo electrónico ya está registrado",
  USERNAME_EXISTS: "Este nombre de usuario ya existe",
  USER_NOT_FOUND: "Usuario no encontrado",
  UNAUTHORIZED: "No estás autenticado",

  // Correo y verificación
  EMAIL_VERIFICATION_ERROR: "No se pudo verificar el correo",
  ACCOUNT_CREATED_ERROR: "No se pudo crear la cuenta",
  LOGIN_ROUTE_ERROR: "No se pudo iniciar sesión aquí del registro",
  EMAIL_CHANGE_FAILED:
    "Ocurrió un error al enviar el correo. Inténtalo nuevamente.",
  CURRENT_EMAIL_NOT_FOUND: "El correo actual no existe.",
  EMAIL_ALREADY_IN_USE: "Este correo ya está en uso. Inténtalo con otro.",
  EMAIL_CANNOT_BE_SAME: "El correo nuevo no puede ser igual al actual.",

  // Contraseña
  INVALID_LENGTH_PASSWORD: "Tu contraseña debe tener al menos 8 caracteres",
  INVALID_STRING_PASSWORD:
    "Tu contraseña debe incluir una letra mayúscula, una letra minúscula, un número y un carácter especial",
  INVALID_CURRENT_PASSWORD: "La contraseña actual es incorrecta",
  PASSWORD_CHANGE_FAILED: "No se pudo cambiar la contraseña, intenta de nuevo",
  PASSWORDS_DO_NOT_MATCH: "Las contraseñas no coinciden",
  PASSWORD_CHANGED: "¡Contraseña actualizada exitosamente!",

  // Perfil
  REQUIRED_EMAIL: "Por favor, ingresa un correo electrónico válido",
  REQUIRED_PASSWORD: "Por favor, ingresa tu contraseña",
  REQUIRED_USERNAME: "Por favor, ingresa tu nombre de usuario",
  REQUIRED_NAME: "Por favor, ingresa tu nombre",
  REQUIRED_LASTNAME: "Por favor, ingresa tu apellido",
  REQUIRED_BIRTHDATE: "Por favor, ingresa tu fecha de nacimiento",
  REQUIRED_FIELD: "Este campo es obligatorio",
  ALL_FIELDS_REQUIRED: "Por favor, rellena todos los campos",

  INVALID_LENGTH_USERNAME:
    "Tu nombre de usuario debe tener entre 3 y 20 caracteres",
  INVALID_STRING_USERNAME:
    "Tu nombre de usuario solo puede contener letras, números y guiones bajos",
  INVALID_START_USERNAME:
    "Tu nombre de usuario debe comenzar con una letra o número",
  INVALID_END_USERNAME:
    "Tu nombre de usuario debe terminar con una letra o número",
  INVALID_BIRTHDATE:
    "Debes tener al menos 13 años y la fecha debe ser realista",
  INVALID_LENGTH_BIO: "Tu biografía debe tener menos de 2000 caracteres",
  INVALID_WEIGHT: "Tu peso debe estar entre 1 y 300 kilogramos",
  INVALID_HEIGHT: "Tu altura debe estar entre 40 y 250 centímetros",
  INVALID_LENGTH_LOCATION: "Tu ubicación debe tener menos de 50 caracteres",

  // Carpetas
  FOLDER_NAME_MIN: "El nombre debe tener al menos 3 caracteres",
  FOLDER_NAME_MAX: "El nombre no puede tener más de 50 caracteres",
  FOLDER_NAME_INVALID: "El nombre no puede estar vacío o tener solo espacios",
  FOLDER_DESCRIPTION_MAX: "La descripción no puede exceder los 200 caracteres",

  RENAME_FOLDER_MIN: "Debe tener al menos 3 caracteres",
  RENAME_FOLDER_MAX: "No puede tener más de 50 caracteres",
  RENAME_FOLDER_INVALID: "No puede estar vacío o tener solo espacios",

  // Historial médico
  MEDICAL_FILE_REQUIRED: "Debes subir un archivo médico",
  MEDICAL_CONDITION_MIN: "Debe tener al menos 3 caracteres",
  MEDICAL_CONDITION_MAX: "Máximo 100 caracteres",
  MEDICAL_DESCRIPTION_MAX: "Máximo 500 caracteres",
  MEDICAL_ISSUER_MAX: "Máximo 100 caracteres",
  MEDICAL_NOTES_MAX: "Máximo 500 caracteres",
  MEDICAL_DATE_REQUIRED: "Debes seleccionar una fecha válida",
  MEDICAL_DATE_INVALID: "La fecha no puede ser futura",
  MEDICAL_FILE_INVALID_TYPE:
    "Formato no permitido. Usa PDF, JPEG, JPG, PNG o WEBP",
  MEDICAL_FILE_TOO_LARGE: "El archivo supera los 10 MB permitidos",

  // General
  INVALID_LENGTH_TITLE: "El título debe tener menos de 100 caracteres",
  VALIDATION_ERROR: "Errores de validación en los datos proporcionados",
  ERROR: "Ocurrió un error",
  UNKNOWN_ERROR: "Ocurrió un error inesperado",
} as const;

export type ResultCode = keyof typeof resultMessages;

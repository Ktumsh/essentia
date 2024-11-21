export enum ResultCode {
  USER_CREATED = "USER_CREATED",
  USER_LOGGED_IN = "USER_LOGGED_IN",
  REQUIRED_EMAIL = "REQUIRED_EMAIL",
  REQUIRED_PASSWORD = "REQUIRED_PASSWORD",
  REQUIRED_USERNAME = "REQUIRED_USERNAME",
  REQUIRED_NAME = "REQUIRED_NAME",
  REQUIRED_LASTNAME = "REQUIRED_LASTNAME",
  REQUIRED_BIRTHDATE = "REQUIRED_BIRTHDATE",
  ALL_FIELDS_REQUIRED = "ALL_FIELDS_REQUIRED",
  INVALID_LENGTH_USERNAME = "INVALID_LENGTH_USERNAME",
  INVALID_STRING_USERNAME = "INVALID_STRING_USERNAME",
  INVALID_START_USERNAME = "INVALID_START_USERNAME",
  INVALID_END_USERNAME = "INVALID_END_USERNAME",
  INVALID_LENGTH_PASSWORD = "INVALID_LENGTH_PASSWORD",
  INVALID_STRING_PASSWORD = "INVALID_STRING_PASSWORD",
  INVALID_BIRTHDATE = "INVALID_BIRTHDATE",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  EMAIL_NOT_VERIFIED = "EMAIL_NOT_VERIFIED",
  EMAIL_AVAILABLE = "EMAIL_AVAILABLE",
  EMAIL_EXISTS = "EMAIL_EXISTS",
  USERNAME_EXISTS = "USERNAME_EXISTS",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  LOGIN_ROUTE_ERROR = "LOGIN_ROUTE_ERROR",
  ACCOUNT_CREATED_ERROR = "ACCOUNT_CREATED_ERROR",
  EMAIL_VERIFICATION_ERROR = "EMAIL_VERIFICATION_ERROR",
  ERROR = "ERROR",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  UNAUTHORIZED = "UNAUTHORIZED",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  PASSWORD_CHANGED = "PASSWORD_CHANGED",
  INVALID_CURRENT_PASSWORD = "INVALID_CURRENT_PASSWORD",
  PASSWORD_CHANGE_FAILED = "PASSWORD_CHANGE_FAILED",
}

const resultMessages: Record<ResultCode, string> = {
  [ResultCode.USER_CREATED]:
    "¡Usuario creado! Verifica tu correo para activar tu cuenta",
  [ResultCode.USER_LOGGED_IN]: "¡Bienvenido de nuevo!",
  [ResultCode.REQUIRED_EMAIL]:
    "Por favor, ingresa un correo electrónico válido",
  [ResultCode.REQUIRED_PASSWORD]: "Por favor, ingresa tu contraseña",
  [ResultCode.REQUIRED_USERNAME]: "Por favor, ingresa tu nombre de usuario",
  [ResultCode.REQUIRED_NAME]: "Por favor, ingresa tu nombre",
  [ResultCode.REQUIRED_LASTNAME]: "Por favor, ingresa tu apellido",
  [ResultCode.REQUIRED_BIRTHDATE]: "Por favor, ingresa tu fecha de nacimiento",
  [ResultCode.ALL_FIELDS_REQUIRED]: "Por favor, rellena todos los campos",
  [ResultCode.INVALID_LENGTH_USERNAME]:
    "Tu nombre de usuario debe tener entre 3 y 30 caracteres",
  [ResultCode.INVALID_STRING_USERNAME]:
    "Tu nombre de usuario solo puede contener letras, números y guiones bajos",
  [ResultCode.INVALID_START_USERNAME]:
    "Tu nombre de usuario debe comenzar con una letra o número",
  [ResultCode.INVALID_END_USERNAME]:
    "Tu nombre de usuario debe terminar con una letra o número",
  [ResultCode.INVALID_LENGTH_PASSWORD]:
    "Tu contraseña debe tener al menos 8 caracteres",
  [ResultCode.INVALID_STRING_PASSWORD]:
    "Tu contraseña debe incluir una letra mayúscula, una letra minúscula, un número y un carácter especial",
  [ResultCode.INVALID_BIRTHDATE]:
    "Debes tener al menos 13 años y la fecha debe ser realista",
  [ResultCode.INVALID_CREDENTIALS]: "¡Credenciales inválidas!",
  [ResultCode.EMAIL_NOT_VERIFIED]:
    "Correo no verificado, revisa tu bandeja de entrada",
  [ResultCode.EMAIL_AVAILABLE]: "Este correo electrónico está disponible",
  [ResultCode.EMAIL_EXISTS]: "Este correo electrónico ya está registrado",
  [ResultCode.USERNAME_EXISTS]: "Este nombre de usuario ya existe",
  [ResultCode.UNKNOWN_ERROR]: "Ocurrió un error inesperado",
  [ResultCode.LOGIN_ROUTE_ERROR]: "No se pudo iniciar sesión aquí del registro",
  [ResultCode.ACCOUNT_CREATED_ERROR]: "No se pudo crear la cuenta",
  [ResultCode.EMAIL_VERIFICATION_ERROR]: "No se pudo verificar el correo",
  [ResultCode.ERROR]: "Ocurrió un error",
  [ResultCode.VALIDATION_ERROR]:
    "Errores de validación en los datos proporcionados",
  [ResultCode.UNAUTHORIZED]: "No estás autenticado",
  [ResultCode.USER_NOT_FOUND]: "Usuario no encontrado",
  [ResultCode.PASSWORD_CHANGED]: "¡Contraseña actualizada exitosamente!",
  [ResultCode.INVALID_CURRENT_PASSWORD]: "La contraseña actual es incorrecta",
  [ResultCode.PASSWORD_CHANGE_FAILED]:
    "No se pudo cambiar la contraseña, intenta de nuevo",
};

export const getMessageFromCode = (resultCode: ResultCode): string => {
  return (
    resultMessages[resultCode] || "Ocurrió un error, por favor intenta de nuevo"
  );
};

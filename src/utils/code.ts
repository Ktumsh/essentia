export enum ResultCode {
  USER_CREATED = "Usuario creado",
  USER_LOGGED_IN = "¡Bienvenido de nuevo!",
  REQUIRED_EMAIL = "Por favor, ingresa un correo electrónico válido",
  REQUIRED_PASSWORD = "Por favor, ingresa tu contraseña",
  REQUIRED_USERNAME = "Por favor, ingresa tu nombre de usuario",
  REQUIRED_NAME = "Por favor, ingresa tu nombre",
  REQUIRED_LASTNAME = "Por favor, ingresa tu apellido",
  REQUIRED_BIRTHDATE = "Por favor, ingresa tu fecha de nacimiento",
  ALL_FIELDS_REQUIRED = "Por favor, rellena todos los campos",
  INVALID_LENGTH_USERNAME = "Tu nombre de usuario debe tener entre 3 y 30 caracteres",
  INVALID_STRING_USERNAME = "Tu nombre de usuario solo puede contener letras, números y guiones bajos",
  INVALID_START_USERNAME = "Tu nombre de usuario debe comenzar con una letra o número",
  INVALID_END_USERNAME = "Tu nombre de usuario debe terminar con una letra o número",
  INVALID_LENGTH_PASSWORD = "Tu contraseña debe tener al menos 8 caracteres",
  INVALID_STRING_PASSWORD = "Tu contraseña debe incluir una letra mayúscula, una letra minúscula, un número y un carácter especial",
  INVALID_BIRTHDATE = "Debes tener al menos 13 años y la fecha debe ser realista",
  INVALID_CREDENTIALS = "Credenciales inválidas, por favor revisa tu correo y contraseña",
  EMAIL_NOT_VERIFIED = "Por favor verifica tu correo electrónico",
  EMAIL_AVAILABLE = "Este correo electrónico está disponible",
  EMAIL_EXISTS = "Este correo electrónico ya está registrado",
  USERNAME_EXISTS = "Este nombre de usuario ya existe",
  UNKNOWN_ERROR = "Ocurrio un error inesperado",
  LOGIN_ROUTE_ERROR = "No se pudo iniciar sesión después del registro",
  ACCOUNT_CREATED_ERROR = "No se pudo crear la cuenta",
  EMAIL_VERIFICATION_ERROR = "No se pudo verificar el correo",
  ERROR = "Ocurrió un error",
  VALIDATION_ERROR = "Errores de validación en los datos proporcionados",
  UNAUTHORIZED = "No estás autenticado",
  USER_NOT_FOUND = "Usuario no encontrado",
  PASSWORD_CHANGED = "Contraseña actualizada exitosamente",
  INVALID_CURRENT_PASSWORD = "La contraseña actual es incorrecta",
  PASSWORD_CHANGE_FAILED = "No se pudo cambiar la contraseña, intenta nuevamente",
}

export const getMessageFromCode = (resultCode: string) => {
  switch (resultCode) {
    case ResultCode.USER_CREATED:
      return "¡Usuario creado! Verifica tu correo para activar tu cuenta";
    case ResultCode.USER_LOGGED_IN:
      return "¡Bienvenido de nuevo!";
    case ResultCode.REQUIRED_EMAIL:
      return "Por favor, ingresa un correo electrónico válido";
    case ResultCode.REQUIRED_PASSWORD:
      return "Por favor, ingresa tu contraseña";
    case ResultCode.REQUIRED_USERNAME:
      return "Por favor, ingresa tu nombre de usuario";
    case ResultCode.REQUIRED_NAME:
      return "Por favor, ingresa tu nombre";
    case ResultCode.REQUIRED_LASTNAME:
      return "Por favor, ingresa tu apellido";
    case ResultCode.REQUIRED_BIRTHDATE:
      return "Por favor, ingresa tu fecha de nacimiento";
    case ResultCode.ALL_FIELDS_REQUIRED:
      return "Por favor, rellena todos los campos";
    case ResultCode.INVALID_LENGTH_USERNAME:
      return "Tu nombre de usuario debe tener entre 3 y 30 caracteres";
    case ResultCode.INVALID_STRING_USERNAME:
      return "Tu nombre de usuario solo puede contener letras, números y guiones bajos";
    case ResultCode.INVALID_START_USERNAME:
      return "Tu nombre de usuario debe comenzar con una letra o número";
    case ResultCode.INVALID_END_USERNAME:
      return "Tu nombre de usuario debe terminar con una letra o número";
    case ResultCode.INVALID_LENGTH_PASSWORD:
      return "Tu contraseña debe tener al menos 8 caracteres";
    case ResultCode.INVALID_STRING_PASSWORD:
      return "Tu contraseña debe incluir una letra mayúscula, una letra minúscula, un número y un carácter especial";
    case ResultCode.INVALID_BIRTHDATE:
      return "Debes tener al menos 13 años y la fecha debe ser realista";
    case ResultCode.INVALID_CREDENTIALS:
      return "Credenciales inválidas, por favor revisa tu correo y contraseña";
    case ResultCode.EMAIL_NOT_VERIFIED:
      return "Correo no verificado, por favor, revisa tu bandeja de entrada";
    case ResultCode.EMAIL_AVAILABLE:
      return "Este correo electrónico está disponible";
    case ResultCode.EMAIL_EXISTS:
      return "Este correo electrónico ya está registrado";
    case ResultCode.USERNAME_EXISTS:
      return "Este nombre de usuario ya existe";
    case ResultCode.UNKNOWN_ERROR:
      return "Ocurrio un error inesperado";
    case ResultCode.LOGIN_ROUTE_ERROR:
      return "No se pudo iniciar sesión aquí del registro";
    case ResultCode.ACCOUNT_CREATED_ERROR:
      return "No se pudo crear la cuenta";
    case ResultCode.EMAIL_VERIFICATION_ERROR:
      return "No se pudo verificar el correo";
    case ResultCode.ERROR:
      return "Ocurrió un error";
    case ResultCode.VALIDATION_ERROR:
      return "Errores de validación en los datos proporcionados";
    case ResultCode.UNAUTHORIZED:
      return "No estás autenticado";
    case ResultCode.USER_NOT_FOUND:
      return "Usuario no encontrado";
    case ResultCode.PASSWORD_CHANGED:
      return "Contraseña actualizada exitosamente";
    case ResultCode.INVALID_CURRENT_PASSWORD:
      return "La contraseña actual es incorrecta";
    case ResultCode.PASSWORD_CHANGE_FAILED:
      return "No se pudo cambiar la contraseña, intenta de nuevo";
    default:
      return "Ocurrió un error, por favor intenta de nuevo";
  }
};

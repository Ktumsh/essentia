export enum ResultCode {
  USER_CREATED = "Usuario creado, bienvenido!",
  USER_LOGGED_IN = "¡Bienvenido de nuevo!",
  REQUIRED_EMAIL = "Por favor, ingresa un correo electrónico válido.",
  REQUIRED_PASSWORD = "Por favor, ingresa tu contraseña.",
  REQUIRED_USERNAME = "Por favor, ingresa tu nombre de usuario.",
  REQUIRED_NAME = "Por favor, ingresa tu nombre.",
  REQUIRED_LASTNAME = "Por favor, ingresa tu apellido.",
  REQUIRED_BIRTHDATE = "Por favor, ingresa tu fecha de nacimiento.",
  ALL_FIELDS_REQUIRED = "Por favor, rellena todos los campos.",
  INVALID_LENGTH_USERNAME = "Tu nombre de usuario debe tener entre 3 y 30 caracteres",
  INVALID_STRING_USERNAME = "Tu nombre de usuario solo puede contener letras, números y guiones bajos",
  INVALID_START_USERNAME = "Tu nombre de usuario debe comenzar con una letra o número",
  INVALID_END_USERNAME = "Tu nombre de usuario debe terminar con una letra o número",
  INVALID_LENGTH_PASSWORD = "Tu contraseña debe tener al menos 8 caracteres",
  INVALID_STRING_PASSWORD = "Tu contraseña debe incluir una letra mayúscula, una letra minúscula, un número y un carácter especial.",
  INVALID_BIRTHDATE = "Debes tener al menos 13 años y la fecha debe ser realista.",
  INVALID_CREDENTIALS = "Credenciales inválidas, por favor revisa tu correo y contraseña.",
  EMAIL_AVAILABLE = "Este correo electrónico está disponible.",
  EMAIL_EXISTS = "Este correo electrónico ya está registrado.",
  USERNAME_EXISTS = "Este nombre de usuario ya existe.",
  UNKNOWN_ERROR = "Ocurrio un error inesperado.",
  LOGIN_ROUTE_ERROR = "No se pudo iniciar sesión después del registro",
  ACCOUNT_CREATED_ERROR = "No se pudo crear la cuenta.",
  EMAIL_VERIFICATION_ERROR = "No se pudo verificar el correo.",
  ERROR = "Ha ocurrido un error.",
}

export const getMessageFromCode = (resultCode: string) => {
  switch (resultCode) {
    case ResultCode.USER_CREATED:
      return "Usuario creado, bienvenido!";
    case ResultCode.USER_LOGGED_IN:
      return "¡Bienvenido de nuevo!";
    case ResultCode.REQUIRED_EMAIL:
      return "Por favor, ingresa un correo electrónico válido.";
    case ResultCode.REQUIRED_PASSWORD:
      return "Por favor, ingresa tu contraseña.";
    case ResultCode.REQUIRED_USERNAME:
      return "Por favor, ingresa tu nombre de usuario.";
    case ResultCode.REQUIRED_NAME:
      return "Por favor, ingresa tu nombre.";
    case ResultCode.REQUIRED_LASTNAME:
      return "Por favor, ingresa tu apellido.";
    case ResultCode.REQUIRED_BIRTHDATE:
      return "Por favor, ingresa tu fecha de nacimiento.";
    case ResultCode.ALL_FIELDS_REQUIRED:
      return "Por favor, rellena todos los campos.";
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
      return "Tu contraseña debe incluir una letra mayúscula, una letra minúscula, un número y un carácter especial.";
    case ResultCode.INVALID_BIRTHDATE:
      return "Debes tener al menos 13 años y la fecha debe ser realista.";
    case ResultCode.INVALID_CREDENTIALS:
      return "Credenciales inválidas, por favor revisa tu correo y contraseña.";
    case ResultCode.EMAIL_AVAILABLE:
      return "Este correo electrónico está disponible.";
    case ResultCode.EMAIL_EXISTS:
      return "Este correo electrónico ya está registrado.";
    case ResultCode.USERNAME_EXISTS:
      return "Este nombre de usuario ya existe.";
    case ResultCode.UNKNOWN_ERROR:
      return "Ocurrio un error inesperado.";
    case ResultCode.LOGIN_ROUTE_ERROR:
      return "No se pudo iniciar sesión aquí del registro";
    case ResultCode.ACCOUNT_CREATED_ERROR:
      return "No se pudo crear la cuenta.";
    case ResultCode.EMAIL_VERIFICATION_ERROR:
      return "No se pudo verificar el correo.";
    case ResultCode.ERROR:
      return "Ha ocurrido un error.";
  }
};

export type ErrorType =
  | "bad_request"
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "rate_limit"
  | "offline";

export type Surface =
  | "chat"
  | "session"
  | "api"
  | "stream"
  | "database"
  | "history"
  | "vote";

export type ErrorCode = `${ErrorType}:${Surface}`;

export type ErrorVisibility = "response" | "log" | "none";

export const visibilityBySurface: Record<Surface, ErrorVisibility> = {
  database: "log",
  chat: "response",
  session: "response",
  stream: "response",
  api: "response",
  history: "response",
  vote: "response",
};

export class ChatSDKError extends Error {
  public type: ErrorType;
  public surface: Surface;
  public statusCode: number;

  constructor(errorCode: ErrorCode, cause?: string) {
    super();

    const [type, surface] = errorCode.split(":");

    this.type = type as ErrorType;
    this.cause = cause;
    this.surface = surface as Surface;
    this.message = getMessageByErrorCode(errorCode);
    this.statusCode = getStatusCodeByType(this.type);
  }

  public toResponse() {
    const code: ErrorCode = `${this.type}:${this.surface}`;
    const visibility = visibilityBySurface[this.surface];

    const { message, cause, statusCode } = this;

    if (visibility === "log") {
      console.error({
        code,
        message,
        cause,
      });

      return Response.json(
        {
          code: "",
          message: "Ocurrió un error. Por favor, inténtalo de nuevo más tarde.",
        },
        { status: statusCode },
      );
    }

    return Response.json({ code, message, cause }, { status: statusCode });
  }
}

export function getMessageByErrorCode(errorCode: ErrorCode): string {
  if (errorCode.includes("database")) {
    return "Ocurrió un error al ejecutar una consulta en la base de datos.";
  }

  switch (errorCode) {
    case "bad_request:api":
      return "No se pudo procesar la solicitud";

    case "rate_limit:chat":
      return "Has alcanzado el límite diario de mensajes con Aeris";
    case "not_found:chat":
      return "No se encontró el chat solicitado";
    case "forbidden:chat":
      return "Este chat pertenece a otro usuario";
    case "unauthorized:chat":
      return "No tienes una suscripción activa. Actualiza tu plan para continuar.";
    case "unauthorized:session":
      return "No autorizado. Por favor, inicia sesión.";
    case "offline:chat":
      return "Estamos teniendo problemas para enviar tu mensaje. Revisa tu conexión a internet e inténtalo de nuevo.";

    default:
      return "Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.";
  }
}

function getStatusCodeByType(type: ErrorType) {
  switch (type) {
    case "bad_request":
      return 400;
    case "unauthorized":
      return 401;
    case "forbidden":
      return 403;
    case "not_found":
      return 404;
    case "rate_limit":
      return 429;
    case "offline":
      return 503;
    default:
      return 500;
  }
}

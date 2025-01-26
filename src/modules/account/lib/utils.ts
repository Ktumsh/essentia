export const getPlanType = (type: string) => {
  if (type === "premium") {
    return "Premium";
  } else if (type === "premium-plus") {
    return "Premium Plus";
  } else {
    return "Gratis";
  }
};

export const getPlanStatus = (status: string) => {
  if (status === "active") {
    return "Activa";
  } else if (status === "canceled") {
    return "Cancelada";
  } else if (status === "unpaid") {
    return "No pagada";
  } else if (status === "deleted") {
    return "Eliminada";
  } else {
    return "No aplica";
  }
};

export const getPaymentStatus = (status: string) => {
  if (status === "paid") {
    return "Pagado";
  } else if (status === "pending") {
    return "Pendiente";
  } else {
    return "No aplica";
  }
};

export const buildResponse = (status, message, error = false, attachData = null) => ({
    status,
    message,
    error,
    attachData,
});

// Respuestas exitosas
export const success = (message = "OK", attachData = null, status = 200) =>
    buildResponse(status, message, false, attachData);

export const created = (message = "Resource created successfully", attachData = null) =>
    buildResponse(201, message, false, attachData);

// Errores comunes
export const badRequest = (message = "Bad Request", attachData = null) =>
    buildResponse(400, message, true, attachData);

export const unauthorized = (message = "Unauthorized", attachData = null) =>
    buildResponse(401, message, true, attachData);

export const forbidden = (message = "Forbidden", attachData = null) =>
    buildResponse(403, message, true, attachData);

export const notFound = (message = "Not Found", attachData = null) =>
    buildResponse(404, message, true, attachData);

export const conflict = (message = "Conflict", attachData = null) =>
    buildResponse(409, message, true, attachData);

export const internalError = (message = "Internal Server Error", attachData = null) =>
    buildResponse(500, message, true, attachData);

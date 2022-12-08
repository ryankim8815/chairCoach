export const badRequest = (message: string | object) => ({
  result: false,
  status: 400,
  message: message,
});

export const unauthorized = (message: string | object) => ({
  result: false,
  status: 401,
  message: message,
});

export const forbidden = (message: string | object) => ({
  result: false,
  status: 403,
  message: message,
});

export const notFound = (message: string | object) => ({
  result: false,
  status: 404,
  message: message,
});

export const conflict = (message: string | object) => ({
  result: false,
  status: 409,
  message: message,
});

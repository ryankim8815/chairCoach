export const internalServerError = (message: string | object) => ({
  result: false,
  status: 500,
  message: message,
});

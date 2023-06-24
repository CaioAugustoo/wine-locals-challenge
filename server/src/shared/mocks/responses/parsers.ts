export const getBaseSuccessResponse = () => ({
  ok: true,
  error: false,
  message: null,
});

export const getBaseErrorResponse = (message: string | Error) => ({
  ok: false,
  error: true,
  message,
  data: null,
});

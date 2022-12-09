export const success = (data = {}, message = 'success') => {
  return {
    success: true,
    errorMessage: message,
    data,
  };
};
export const error = (message = 'error', data = {}) => {
  return {
    success: false,
    errorMessage: message,
    data,
  };
};

export function pagination<T>(
  list: T[],
  total: number,
  current = 1,
  pageSize = 15,
) {
  return {
    list,
    pageSize,
    total,
    totalPage: Math.ceil(total / pageSize),
    current,
  };
}

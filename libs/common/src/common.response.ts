export function paginate(items, total) {
  return {
    code: 0,
    result: {
      items,
      total,
    },
    message: 'ok',
    type: 'success',
  };
}

export function success(result = {}) {
  return {
    code: 0,
    message: 'ok',
    result: {
      code: 0,
      message: 'success',
      ...result,
    },
    type: 'success',
  };
}

export function error(message = 'error', ext = {}) {
  return {
    code: 1,
    message: 'error',
    result: {
      code: 1,
      message,
      ...ext,
    },
    type: 'error',
  };
}

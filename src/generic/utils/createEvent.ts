function createEvent<E>(name, payload?): E {
  return !payload ? {
    name,
  } as any : {
    name,
    payload,
  } as any;
}

export {
  createEvent,
}

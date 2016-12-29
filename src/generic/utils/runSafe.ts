function runSafe(func) {
  try {
    return func();
  } catch(err) {
    return undefined;
  }
}

export {
  runSafe,
}

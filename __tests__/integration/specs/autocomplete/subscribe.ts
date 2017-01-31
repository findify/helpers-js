function events() {
  return [{
    name: 'request',
  }, {
    name: 'request',
    payload: {
      user: {
        uid: 'testUserId',
        sid: 'testSessionId',
      },
    },
  }, {
    name: 'request',
    payload: {
      itemsLimit: 1,
      suggestionsLimit: 2,
    },
  }, {
    name: 'input',
    payload: {
      query: 'test',
    },
  }];
}

export {
  events,
}

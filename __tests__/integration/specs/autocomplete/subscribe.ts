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
      itemLimit: 1,
      suggestionLimit: 2,
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

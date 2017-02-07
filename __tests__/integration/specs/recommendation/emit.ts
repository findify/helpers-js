function validations() {
  return [{
    event: {
      name: 'request',
      payload: {
        type: 'predefined',
      },
    },
    message: /"slot" param is required/,
  }, {
    event: {
      name: 'request',
      payload: {
        type: 'predefined',
        request: {},
      },
    },
    message: /"slot" param is required/,
  }, {
    event: {
      name: 'request',
      payload: {
        type: 'viewed',
      },
    },
    message: /"item_id" param is required/,
  }, {
    event: {
      name: 'request',
      payload: {
        type: 'viewed',
        request: {},
      },
    },
    message: /"item_id" param is required/,
  }, {
    event: {
      name: 'request',
      payload: {
        type: 'bought',
      },
    },
    message: /"item_id" param is required/,
  }, {
    event: {
      name: 'request',
      payload: {
        type: 'bought',
        request: {},
      },
    },
    message: /"item_id" param is required/,
  }];
}

export {
  validations,
}

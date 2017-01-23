import { createSearch } from '../../../src';

const searchSpec = {
  createStore: function(args) {
    return createSearch(args);
  },
  name: 'createSearch',
  searchApi: {
    endpoint: '/search',
    successResponse: successResponse(),
  },
  events: {
    requestEvent: {
      name: 'request',
    },
    validEvent: {
      name: 'search',
      payload: {
        query: 'test',
      },
    },
  },
  emit: {
    validations: emitValidations(),
    requests: [
      ...(requestEmit()),
      ...(searchEmit()),
      ...(paginationEmit()),
      ...(sortingFacetEmit()),
      ...(nestedListFacetEmit()),
      ...(textFacetEmit()),
      ...(rangeFacetEmit()),
    ],
  },
  subscribe: {
    successEvents: subscribeSuccessEvents(),
  },
  // will change interface
  get: {
    names: [],
    // names: [{
    //   name: 'redirect',
    //   expectingPositiveResult: successResponse().redirect,
    //   expectingNegativeResult: undefined,
    //   emittingEvents: simpleRequestEvent(),
    //   successResponse: successResponse(),
    // }, {

    // }, {
      // name: 'meta',
      // expectingPositiveResult: function(result) {
      //   expect(result.lastUpdated).toBeA('number');
      //   expect(omit(result, ['lastUpdated'])).toEqual({
      //     isFetching: false,
      //   });
      // },
      // expectingNegativeResult: {
      //   isFetching: false,
      // },
      // emittingEvents,
      // successResponse,
    // }]
  },
};

function successResponse() {
  return {
    meta: {
      rid: 'testRid',
      q: 'testQ',
      no_result: false,
      corrected_q: 'testQ',
      filters: [{
        name: 'testFilterName',
        type: 'testFilterType',
        values: [{
          value: 'someTestValue',
        }],
      }],
      sort: [{
        field: 'testSortField',
        order: 'testSortOrder',
      }],
      limit: 24,
      offset: 0,
      total: 200,
    },
    redirect: {
      name: 'testRedirectName',
      url: 'testRedirectUrl',
    },
    banner: {
      products: {
        image_url: 'testBannerImageUrl',
        target_url: 'testBannerTargetUrl',
      },
    },
    items: [{
      id: 'testProductId',
    }],
    facets: [{
      name: 'testFacetName',
      type: 'testFacetType',
      sort_type: 'testFacetSortType',
      values: [{
        selected: true,
        value: 'someTestValue',
        count: 3,
        name: 'test',
        has_children: false,
      }, {
        selected: false,
        value: 'someTestValue',
        count: 3,
        name: 'test2',
        has_children: false,
      }],
    }],
  };
}

function emitValidations() {
  return [{
    event: {
      name: 'search',
    },
    message: /"query" param is required in "search" event/,
  }, {
    event: {
      name: 'setPage',
    },
    message: /"page" param is required in "setPage" event/,
  }, {
    event: {
      name: 'changeSorting',
      payload: {
        order: 'desc',
      },
    },
    message: /"field" param is required in "changeSorting" event/,
  }, {
    event: {
      name: 'changeSorting',
      payload: {
        field: 'someField',
      },
    },
    message: /"order" param is required in "changeSorting" event/,
  }, {
    event: {
      name: 'toggleNestedListFacet',
    },
    message: /"name" param is required in "toggleNestedListFacet" event/,
  }, {
    event: {
      name: 'toggleNestedListFacet',
      payload: {
        name: 'test',
      },
    },
    message: /"value" param is required in "toggleNestedListFacet" event/,
  }, {
    event: {
      name: 'toggleNestedListFacet',
      payload: {
        value: 'test',
      },
    },
    message: /"name" param is required in "toggleNestedListFacet" event/,
  }, {
    event: {
      name: 'toggleTextFacet',
    },
    message: /"value" param is required in "toggleTextFacet" event/,
  }, {
    event: {
      name: 'toggleTextFacet',
      payload: {
        name: 'test',
      },
    },
    message: /"value" param is required in "toggleTextFacet" event/,
  }, {
    event: {
      name: 'toggleTextFacet',
      payload: {
        value: 'test',
      },
    },
    message: /"name" param is required in "toggleTextFacet" event/,
  }, {
    event: {
      name: 'toggleRangeFacet',
      payload: {
        value: 'test',
      },
    },
    message: /"name" param is required in "toggleRangeFacet" event/,
  }, {
    event: {
      name: 'toggleRangeFacet',
    },
    message: /Either "from" or "to" param is required in "toggleRangeFacet" event/,
  }];
}

function paginationEmit() {
  return [{
    events: [{
      name: 'setPage',
      payload: {
        page: 10,
      },
    }, {
      name: 'request',
    }],
    requestBody: {
      q: '',
      limit: 24,
      offset: 240,
    },
  }, {
    events: [{
      name: 'nextPage',
    }, {
      name: 'request',
    }],
    requestBody: {
      q: '',
      limit: 24,
      offset: 48,
    },
  }, {
    events: [{
      name: 'setPage',
      payload: {
        page: 11,
      },
    }, {
      name: 'prevPage',
    }, {
      name: 'request',
    }],
    requestBody: {
      q: '',
      limit: 24,
      offset: 240,
    },
  }, {
    events: [{
      name: 'prevPage',
    }, {
      name: 'request',
    }],
    requestBody: {
      q: '',
      limit: 24,
      offset: 0,
    },
  }];
}

function searchEmit() {
  return [{
    events: [{
      name: 'search',
      payload: {
        query: 'test',
      },
    }, {
      name: 'request',
    }],
    requestBody: {
      q: 'test',
      limit: 24,
      offset: 0,
    },
  }];
}

function requestEmit() {
  return [{
    events: [{
      name: 'request',
      payload: {
        offset: 1,
        limit: 2,
      },
    }],
    requestBody: {
      q: '',
      offset: 1,
      limit: 2,
    },
  }];
}

function nestedListFacetEmit() {
  return [{
    events: [{
      name: 'toggleNestedListFacet',
      payload: {
        name: 'categories1',
        value: 'food',
      },
    }, {
      name: 'request',
    }],
    requestBody: {
      q: '',
      limit: 24,
      offset: 0,
      filters: [{
        name: 'categories1',
        type: 'categories',
        values: [{
          value: 'food',
        }],
      }],
    },
  }, {
    events: [{
      name: 'toggleNestedListFacet',
      payload: {
        name: 'categories1',
        value: 'food',
      },
    }, {
      name: 'toggleNestedListFacet',
      payload: {
        name: 'categories1',
        value: 'test',
      },
    }, {
      name: 'request',
    }],
    requestBody: {
      q: '',
      limit: 24,
      offset: 0,
      filters: [{
        name: 'categories1',
        type: 'categories',
        values: [{
          value: 'test',
        }],
      }],
    },
  }, {
    events: [{
      name: 'toggleNestedListFacet',
      payload: {
        name: 'categories1',
        value: 'food',
      },
    }, {
      name: 'toggleNestedListFacet',
      payload: {
        name: 'categories2',
        value: 'test',
      },
    }, {
      name: 'toggleNestedListFacet',
      payload: {
        name: 'categories1',
        value: 'someValue',
      },
    }, {
      name: 'request',
    }],
    requestBody: {
      q: '',
      limit: 24,
      offset: 0,
      filters: [{
        name: 'categories1',
        type: 'categories',
        values: [{
          value: 'someValue',
        }],
      }],
    },
  }, {
    events: [{
      name: 'toggleNestedListFacet',
      payload: {
        name: 'categories1',
        value: 'food',
      },
    }, {
      name: 'toggleNestedListFacet',
      payload: {
        name: 'categories2',
        value: 'test',
      },
    }, {
      name: 'request',
    }],
    requestBody: {
      q: '',
      limit: 24,
      offset: 0,
      filters: [{
        name: 'categories1',
        type: 'categories',
        values: [{
          value: 'someValue',
        }],
      }, {
        name: 'categories2',
        type: 'categories',
        values: [{
          value: 'test',
        }],
      }],
    },
  }];
}

function sortingFacetEmit() {
  return [{
    events: [{
      name: 'changeSorting',
      payload: {
        field: 'test',
        order: 'asc',
      },
    }, {
      name: 'request',
    }],
    requestBody: {
      q: '',
      limit: 24,
      offset: 0,
      sort: [{
        field: 'test',
        order: 'asc',
      }],
    },
  }];
}

function textFacetEmit() {
  return [{
    events: [{
      name: 'toggleTextFacet',
      payload: {
        name: 'test',
        value: 'someValue'
      },
    }, {
      name: 'request',
    }],
    requestBody: {
      q: '',
      filters: [{
        name: 'test',
        type: 'text',
        values: [{
          value: 'someValue',
        }],
      }],
      offset: 0,
      limit: 24,
    },
  }, {
    events: [{
      name: 'toggleTextFacet',
      payload: {
        name: 'test',
        value: 'someValue'
      },
    }, {
      name: 'toggleTextFacet',
      payload: {
        name: 'test',
        value: 'someValue2'
      },
    }, {
      name: 'request',
    }],
    requestBody: {
      q: '',
      filters: [{
        name: 'test',
        type: 'text',
        values: [{
          value: 'someValue',
        }, {
          value: 'someValue2',
        }],
      }],
      offset: 0,
      limit: 24,
    },
  }, {
    events: [{
      name: 'toggleTextFacet',
      payload: {
        name: 'test',
        value: 'someValue'
      },
    }, {
      name: 'toggleTextFacet',
      payload: {
        name: 'test',
        value: 'someValue'
      },
    }, {
      name: 'request',
    }],
    requestBody: {
      q: '',
      offset: 0,
      limit: 24,
    },
  }, {
    events: [{
      name: 'toggleTextFacet',
      payload: {
        name: 'test',
        value: 'someValue'
      },
    }, {
      name: 'toggleTextFacet',
      payload: {
        name: 'test',
        value: 'someValue2'
      },
    }, {
      name: 'toggleTextFacet',
      payload: {
        name: 'test',
        value: 'someValue2'
      },
    }, {
      name: 'request',
    }],
    requestBody: {
      q: '',
      offset: 0,
      limit: 24,
      filters: [{
        name: 'test',
        type: 'text',
        values: [{
          value: 'someValue',
        }],
      }],
    },
  }];
}

function rangeFacetEmit() {
  return [{
    events: [{
      name: 'toggleRangeFacet',
      payload: {
        name: 'testRange',
        from: 10,
      },
    }, {
      name: 'request',
    }],
    requestBody: {
      q: '',
      limit: 24,
      offset: 0,
      filters: [{
        name: 'testRange',
        values: [{
          from: 10,
        }],
      }],
    },
  }, {
    events: [{
      name: 'toggleRangeFacet',
      payload: {
        name: 'testRange',
        to: 10,
      },
    }, {
      name: 'request',
    }],
    requestBody: {
      q: '',
      limit: 24,
      offset: 0,
      filters: [{
        name: 'testRange',
        values: [{
          to: 10,
        }],
      }],
    },
  }, {
    events: [{
      name: 'toggleRangeFacet',
      payload: {
        name: 'testRange',
        from: 15,
        to: 10,
      },
    }, {
      name: 'toggleRangeFacet',
      payload: {
        name: 'testRange',
        from: 100,
        to: 200,
      },
    }, {
      name: 'request',
    }],
    requestBody: {
      q: '',
      limit: 24,
      offset: 0,
      filters: [{
        name: 'testRange',
        values: [{
          from: 100,
          to: 200,
        }],
      }],
    },
  }];
}

function subscribeSuccessEvents() {
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
      limit: 1,
      offset: 2,
    },
  }, {
    name: 'search',
    payload: {
      query: 'test',
    },
  }, {
    name: 'nextPage',
  }, {
    name: 'prevPage',
  }, {
    name: 'setPage',
    payload: {
      page: 20,
    },
  }, {
    name: 'changeSorting',
    payload: {
      field: 'newest',
      order: 'asc',
    },
  }, {
    name: 'toggleNestedListFacet',
    paylaod: {
      name: 'categories3',
      value: 'food',
    },
  }, {
    name: 'toggleTextFacet',
    paylaod: {
      name: 'categories3',
      value: 'food',
    },
  }, {
    name: 'toggleRangeFacet',
    payload: {
      name: 'test',
      from: 10,
      to: 15,
    },
  }];
}

function simpleRequestEvent() {
  return [{
    name: 'request',
  }]
}

export {
  searchSpec,
}

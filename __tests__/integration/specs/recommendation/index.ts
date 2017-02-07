import * as emit from './emit';
// import * as get from './get';
// import * as subscribe from './subscribe';

import { createRecommendation } from '../../../../src';

const successResponse = {
  items: [{
    id: 'testId',
  }],
  meta: {
    rid: 'testRid',
    item_id: 'testString',
    user_id: 'testUserId',
    limit: 1,
    offset: 1,
  },
};

const predefinedRecommendationSpec = {
  createStore: function(args) {
    return createRecommendation('predefined', args);
  },
  name: 'createRecommendation',
  searchApi: {
    endpoint: '/recommend/testSlot',
    successResponse,
  },
  events: {
    requestEvent: {
      name: 'request',
      payload: {
        slot: 'testSlot',
      },
    },
    validEvent: {
      name: 'request',
      payload: {
        slot: 'testSlot',
      },
    },
  },
  emit: {
    validations: emit.validations(),
    requests: [{
      events: [{
        name: 'request',
        payload: {
          slot: 'testSlot',
          item_id: 'testItemId',
        },
      }],
      requestBody: {
        item_id: 'testItemId',
      },
    }],
  },
  subscribe: {
    successEvents: [],
  },
  get: [],
};

export {
  predefinedRecommendationSpec,
}

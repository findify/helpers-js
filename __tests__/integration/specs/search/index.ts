import { createSearch } from '../../../../src';

import * as emit from './emit';
import * as get from './get';
import * as subscribe from './subscribe';

const successResponse = {
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
    offset: 48,
    total: 96,
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

const searchSpec = {
  createStore: function(args) {
    return createSearch(args);
  },
  name: 'createSearch',
  searchApi: {
    endpoint: '/search',
    successResponse,
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
    validations: emit.validations(),
    requests: emit.requests(),
  },
  subscribe: {
    successEvents: subscribe.events(),
  },
  get: get.names(successResponse),
};

export {
  searchSpec,
}

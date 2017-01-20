import * as expect from 'expect';
import * as fauxJax from 'faux-jax';
import * as keys from 'lodash/keys';
import * as times from 'lodash/times';
import * as index from '../../src';

const publicApi: any = index;
const methods = [{
  name: 'createAutocomplete',
  searchApi: {
    endpoint: '/autocomplete',
    successResponse: {
      items: [{
        id: 'testId',
      }],
      suggestions: [{
        value: 'test',
        redirect: {
          name: 'testName',
          url: 'testUrl',
        },
      }],
      meta: {
        rid: 'testRid',
        q: 'testQuery',
        suggestion_limit: 2,
        item_limit: 3,
      },
    },
  },
  preloadEvent: {
    name: 'input',
    payload: {
      query: 'test',
    },
  },
  emit: {
    validations: [{
      event: {
        name: 'input',
      },
      message: /"query" param is required in "input" event/,
    }, {
      event: {
        name: 'input',
        payload: {},
      },
      message: /"query" param is required in "input" event/,
    }],
    requests: [{
      events: [{
        name: 'input',
        payload: {
          query: 'test',
        },
      }, {
        name: 'request',
        payload: {
          itemsLimit: 1,
          suggestionsLimit: 2,
        },
      }],
      requestBody: {
        q: 'test',
        item_limit: 1,
        suggestion_limit: 2,
      },
    }],
  },
  events: [{
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
  }],
}];

function assertSearchApi() {}

methods.forEach((method) => {
  const createStore = (user?) => publicApi[method.name]({
    key: 'testApiKey',
    user,
  });
  const createPreloadedStore = (user?) => createStore(user).emit(method.preloadEvent);

  describe(method.name, () => {
    beforeEach(() => {
      fauxJax.install();
    });

    afterEach(() => {
      fauxJax.restore();
    });

    describe('generic', () => {
      it('should return store instance', () => {
        const store = publicApi[method.name]({
          key: 'testKey',
        });

        expect(keys(store)).toEqual(['emit', 'subscribe', 'get']);
      });

      it('should not throw when all required params are passed', () => {
        expect(() => publicApi[method.name]({
          key: 'testKey',
        })).toNotThrow();
      });

      it('should not throw when all params are passed', () => {
        expect(() => publicApi[method.name]({
          key: 'testKey',
          user: {
            uid: 'testUserId',
            sid: 'testSessionId',
          },
          method: 'post',
          log: true,
        })).toNotThrow();
      });

      it('should throw an Error if configuration is not provided', () => {
        expect(() => publicApi[method.name]()).toThrow(/Please, provide configuration object/);
      });

      it('should throw an Error if "key" param is not provided at config', () => {
        expect(() => publicApi[method.name]({})).toThrow(/"key" param is required/);
      });

      it('should throw an Error if "user.uid" param is not provided at config', () => {
        expect(() => publicApi[method.name]({
          key: 'testKey',
          user: {
            sid: 'testSessionId',
          },
        })).toThrow(/"user.uid" param is required/);
      });

      it('should throw an Error if "user.sid" param is not provided at config', () => {
        expect(() => publicApi[method.name]({
          key: 'testKey',
          user: {
            uid: 'testUserId',
          },
        })).toThrow(/"user.sid" param is required/);
      });
    });

    describe('store', () => {
      const user = {
        uid: 'testUserId',
        sid: 'testSessionId',
      };

      describe('emit', () => {
        it('should throw an Error if event is not provided', () => {
          const store = createStore();

          expect(() => store.emit()).toThrow(/Please, provide event you want to emit/);
        });

        it('should throw an Error if event "name" is not provided', () => {
          const store = createStore();

          expect(() => store.emit({})).toThrow(/Please, provide event "name"/);
        });

        it('should not throw an Error if "user" param was passed on library init and payload is not provided', () => {
          const store = publicApi[method.name]({
            key: 'testApiKey',
            user,
          });

          expect(() => store.emit(method.preloadEvent).emit({
            name: 'request',
          })).toNotThrow();
        });

        it('should not throw an Error if "user" param was passed on library init and payload is provided', () => {
          const store = publicApi[method.name]({
            key: 'testApiKey',
            user,
          });

          expect(() => store.emit(method.preloadEvent).emit({
            name: 'request',
            payload: {},
          })).toNotThrow();
        });

        it('should not throw an Error if "user" param was passed at "request" event', () => {
          const store = createPreloadedStore();

          expect(() => store.emit({
            name: 'request',
            payload: {
              user,
            },
          })).toNotThrow();
        });

        it('should throw an Error if "user.uid" param is not provided at "request" event', () => {
          const store = createPreloadedStore();

          expect(() => store.emit({
            name: 'request',
            payload: {
              user: {
                sid: 'testSessionId',
              },
            },
          })).toThrow(/"user.uid" param is required/);
        });

        it('should throw an Error if "user.sid" param is not provided at "request" event', () => {
          const store = createPreloadedStore();

          expect(() => store.emit({
            name: 'request',
            payload: {
              user: {
                uid: 'testUserId',
              },
            },
          })).toThrow(/"user.sid" param is required/);
        });

        it('should throw an Error if "user" param is not provided neither at configuration nor at "request" event', () => {
          const store = createPreloadedStore();
          const messageRegex = /`user` param should be provided either at request or at library config/;

          expect(() => store.emit({
            name: 'request',
            payload: {},
          })).toThrow(messageRegex);

          expect(() => store.emit({
            name: 'request',
          })).toThrow(messageRegex);
        });

        it('should return store object instance', () => {
          const store = createPreloadedStore();

          expect(store.emit({
            name: 'request',
            payload: {
              user: {
                uid: 'testUserId',
                sid: 'testSessionId',
              },
            },
          })).toEqual(store);
        });

        it(`should send request to ${method.searchApi.endpoint} endpoint`, (done) => {
          const store = createPreloadedStore();

          fauxJax.on('request', (req) => {
            expect(req.requestURL).toMatch(/\/autocomplete/);
            done();
          });

          store.emit({
            name: 'request',
            payload: {
              user,
            },
          });
        });

        method.emit.validations.forEach((v) => {
          const eventStr = JSON.stringify(v.event);

          it(`should throw an Error if ${eventStr} was dispatched`, () => {
            const store = createStore();
            expect(() => store.emit(v.event)).toThrow(v.message);
          });
        });

        method.emit.requests.forEach((r) => {
          const reqBodyStr = JSON.stringify(r.requestBody);
          const eventsStr = JSON.stringify(r.events);

          it(`should send ${reqBodyStr} request body if ${eventsStr} events are emitted`, (done) => {
            const store = createStore(user);

            fauxJax.on('request', (req) => {
              expect(JSON.parse(req.requestBody)).toContain(r.requestBody);
              done();
            });

            r.events.forEach(store.emit);
          });
        });
      });

      describe('subscribe', () => {
        it('should throw an Error if listener function is not provided', () => {
          const store = createStore();

          expect(() => store.subscribe()).toThrow(/Please, provide listener function/);
        });

        it('should throw an Error if listener param is not a function', () => {
          const store = createStore();

          expect(() => store.subscribe('')).toThrow(/Listener should be a function/);
        });

        it('should return function to unsubscribe from store', () => {
          const store = createStore();
          const spy = expect.createSpy();
          const unsubscribe = store.subscribe(spy);

          unsubscribe();

          store.emit(method.preloadEvent);

          expect(spy.calls.length).toEqual(0);
        });

        method.events.forEach((event: any) => {
          const payloadText = event.payload ? ` with ${JSON.stringify(event)} payload` : '';

          if (event.name === 'request') {
            it(`should notify listeners twise, when "request" event was emitted${payloadText}` +
              ` and server responded with success`, (done) => {
              const store = createPreloadedStore(user);
              const spy = expect.createSpy();

              fauxJax.on('request', (req) => {
                req.respond(200, {
                  'Content-Type': 'application/json',
                }, JSON.stringify(method.searchApi.successResponse));
              });

              setTimeout(() => {
                expect(spy.calls.length).toBe(2);
                expect(spy.calls[0].arguments).toEqual([event])
                expect(spy.calls[1].arguments).toEqual([{
                  name: 'responseSuccess',
                }]);
                done();
              }, 100);

              store.subscribe(spy);
              store.emit(event);
            });
          } else {
            it(`should notify the listeners when ${event.name} event was emitted${payloadText}`, () => {
              const store = createStore();
              const spy = expect.createSpy();

              store.subscribe(spy);
              store.emit(event);

              expect(spy.calls.length).toEqual(1);
            });
          }
        });
      });
    });
  });
});

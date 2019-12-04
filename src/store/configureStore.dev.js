import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// import { createLogger } from "redux-logger";
import api from "../middlewares/api";
import rootReducer from "../reducers";
// import DevTools from "../containers/DevTools";
// import { offline } from '@redux-offline/redux-offline';
// import offlineConfig from '@redux-offline/redux-offline/lib/defaults';

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(
        thunk,
        api
        //createLogger()
      ),
      //offline(offlineConfig),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
      //DevTools.instrument()
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};

export default configureStore;

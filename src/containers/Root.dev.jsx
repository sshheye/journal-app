import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
// import DevTools from "./DevTools";
import { Route } from "react-router-dom";
import AddJournalPage from "./AddJournalPage";
import JournalsPage from "./JournalsPage";

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <Route path="/journals" exact component={AddJournalPage} />
      <Route path="/" exact component={JournalsPage} />
      {/* <DevTools /> */}
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;

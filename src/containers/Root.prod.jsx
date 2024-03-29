import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'

const Root = ({ store }) => (
  <Provider store={store}>
  <div>
    <Route path="/" exact component={AddJournal} />
    <Route path="/journals" exact component={JournalsPage} />

    <DevTools />
  </div>
</Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}
export default Root

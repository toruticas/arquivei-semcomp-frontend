import React from 'react'
import { connect } from 'react-redux'

import * as actions from './store/actions'
import List from './components/List'
import Result from './components/Result'

const App = ({ list = [], addItem, runScrapper }) => (
  <div>
    <h1>{"Arquivei Scrapper"}</h1>

    <hr />

    <form action="/" method="POST">
      <table>
        <tbody>
          {list.map((item, index) => <List index={index} key={index} />)}
        </tbody>
      </table>

      <button type="button" onClick={addItem}>{"Add Item"}</button>
      <button type="submit">{"Run Scrapper"}</button>
    </form>

    <hr />

    <Result />
  </div>
)

const mapStateToProps = (state, ownProps) => {
  return {
    list: state.list,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addItem: () => {
      dispatch(actions.addNewItem())
    },
  }
}

const Connect = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default Connect

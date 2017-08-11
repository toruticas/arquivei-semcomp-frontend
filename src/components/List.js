import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../store/actions'

const List = ({
  removeActionIsEnabled = false,
  onChangeLabel,
  onChangeSelector,
  onClickRemove,
}) => (
  <tr>
    <td>
      <label>{"Label:"}</label><br/>
      <label>{"Selector:"}</label>
    </td>
    <td>
      <input onChange={onChangeLabel}/>
      <br/>
      <input onChange={onChangeSelector}/>
    </td>
    <td>
      {removeActionIsEnabled ?
        <button type="button" onClick={onClickRemove}>{"Remover"}</button>
      : false}
    </td>
  </tr>
)

const mapStateToProps = (state, ownProps) => {
  return {
    removeActionIsEnabled: state.list.length > 1
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeSelector: (event) => {
      dispatch(actions.changeSelector(ownProps.index, event.target.value))
    },
    onChangeLabel: (event) => {
      dispatch(actions.changeLabel(ownProps.index, event.target.value))
    },
    onClickRemove: (event) => {
      dispatch(actions.removeItem(ownProps.index))
    },
  }
}

const Connect = connect(
  mapStateToProps,
  mapDispatchToProps
)(List)

export default Connect

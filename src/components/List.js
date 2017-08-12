import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../store/actions'

const List = ({
  index,
  name,
  onChangeName,
  onChangeSelector,
  onClickRemove,
  removeActionIsEnabled = false,
  selector,
}) => (
  <div className="col-lg-4" style={{ marginTop: 20 }}>
    <div className="card">
      <div className="card-body">
        <input
          name={`name[${index}]`}
          onChange={onChangeName}
          className="form-control"
          placeholder="Name"
          value={name}
        />

        <input
          name={`selector[${index}]`}
          onChange={onChangeSelector}
          className="form-control"
          placeholder="Selector"
          style={{ marginTop: 10 }}
          value={selector}
        />

        <div>
          {removeActionIsEnabled ?
            <button
              className="btn btn-sm btn-block btn-outline-danger"
              type="button"
              onClick={onClickRemove}
              style={{ marginTop: 10 }}
            >
              {"Remove This Selector"}
            </button>
          : false}
        </div>
      </div>
    </div>
  </div>
)

const mapStateToProps = (state, ownProps) => {
  return {
    name: state.list[ownProps.index].name,
    selector: state.list[ownProps.index].selector,
    removeActionIsEnabled: state.list.length > 1
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeSelector: (event) => {
      dispatch(actions.changeSelector(ownProps.index, event.target.value))
    },
    onChangeName: (event) => {
      dispatch(actions.changeName(ownProps.index, event.target.value))
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

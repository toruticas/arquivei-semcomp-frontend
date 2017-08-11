import React from 'react'
import { connect } from 'react-redux'

const Result = ({ result = '' }) => (
  <form action="/" method="POST">
    <textarea rows={15} disabled defaultValue={result} />

    <br />

    <button type="submit">{"Save"}</button>
  </form>
)

const mapStateToProps = (state, ownProps) => {
  return {
    result: state.result,
  }
}

const Connect = connect(
  mapStateToProps
)(Result)

export default Connect

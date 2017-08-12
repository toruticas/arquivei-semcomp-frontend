import React from 'react'
import { connect } from 'react-redux'

import * as actions from './store/actions'
import List from './components/List'
import Result from './components/Result'

const App = ({
  list = [],
  listMirror = [],
  data = [],
  addItem,
  url = "",
  urlMirror = "",
  onChangeUrl,
  endpoint = "",
}) => (
  <div>
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12" style={{ padding: 0 }}>
          <img src={window.__BANNER_IMG_BASE64__} className="img-fluid" />
        </div>
      </div>
    </div>

    <div className="container">
      <form action={`${endpoint}/run`} method="POST">
        <div className="row">
          <div className="col-lg-12" style={{marginTop: 20}}>
            <input
              className="form-control"
              placeholder="URL"
              name="url"
              value={url}
              onChange={onChangeUrl}
            />
          </div>
          {list.map((item, index) => <List index={index} key={index} />)}

          <div className="col-lg-4" style={{ marginTop: 20 }}>
            <button
              className="btn btn-block btn-outline-primary"
              type="button"
              onClick={addItem}
            >
              {"Add Item"}
            </button>

            <button
              className="btn btn-block btn-outline-success"
              type="submit"
            >
              {"Run Scrapper"}
            </button>
          </div>
        </div>
      </form>

      {listMirror.length ?
        <form action={`${endpoint}/save`} method="POST">
          <input type="hidden" name="url" value={urlMirror} />
          <div className="row" style={{ marginTop: 40 }}>
            <div className="col-lg-12">
              <h1>{"Data to save:"}</h1>
              <Result url={urlMirror} warning={true} list={listMirror} prepareForm />
            </div>
            <div className="col-lg-4" style={{ marginTop: 10 }}>
              <button
                className="btn btn-block btn-primary"
                type="submit"
                >
                {"Save"}
              </button>
            </div>
          </div>
        </form>
      : false}

      {data.length ?
        <div className="row" style={{ marginTop: 40 }}>
          <div className="col-lg-12">
            <h1>{"Data Saved"}</h1>
            {data.map(item => <Result list={item.list} url={item.url} />)}
          </div>
        </div>
      : false}
    </div>
  </div>
)

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.data,
    endpoint: state.endpoint,
    list: state.list,
    listMirror: state.listMirror,
    url: state.url,
    urlMirror: state.urlMirror
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addItem: () => {
      dispatch(actions.addNewItem())
    },
    onChangeUrl: (event) => {
      dispatch(actions.onChangeUrl(event.target.value))
    }
  }
}

const Connect = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default Connect

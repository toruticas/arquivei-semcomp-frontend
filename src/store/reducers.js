import * as constants from './constants'

const emptyItem = { name: '', selector: '' }

const scaffold = {
  list: [{ ...emptyItem }],
  listMirror: [],
  data: [],
}

const reducers = (state = scaffold, action) => {
  switch (action.type) {
    case constants.CHANGE_SELECTOR:
      return {
        ...state,
        list: state.list.map((item, index) => {
          if (action.index === index) {
            return { name: item.name, selector: action.selector }
          }

          return item
        })
      }
    case constants.CHANGE_NAME:
      return {
        ...state,
        list: state.list.map((item, index) => {
          if (action.index === index) {
            return { name: action.name, selector: item.selector }
          }

          return item
        })
      }
    case constants.ADD_NEW_ITEM:
      return {
        ...state,
        list: [...state.list, { ...emptyItem }]
      }
    case constants.REMOVE_ITEM:
      return {
        ...state,
        list: state.list.reduce((accumulator, item, index) => {
          if (action.index !== index) {
            accumulator.push(item)
          }

          return accumulator
        }, []),
      }
    case constants.CHANGE_URL:
      return {
        ...state,
        url: action.url,
      }
    default:
      return { ...scaffold, ...state }
  }
}

export default reducers

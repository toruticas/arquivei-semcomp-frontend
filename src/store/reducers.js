import * as constants from './constants'

const emptyItem = { label: '', selector: '' }

const scaffold = {
  list: [{ ...emptyItem }],
  result: '',
}

const reducers = (state = scaffold, action) => {
  switch (action.type) {
    case constants.CHANGE_SELECTOR:
      return {
        ...state,
        list: state.list.map((item, index) => {
          if (action.index === index) {
            return { label: item.label, selector: action.selector }
          }

          return item
        })
      }
    case constants.CHANGE_LABEL:
      return {
        ...state,
        list: state.list.map((item, index) => {
          if (action.index === index) {
            return { label: action.label, selector: item.selector }
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
    default:
      return { ...scaffold, ...state }
  }
}

export default reducers

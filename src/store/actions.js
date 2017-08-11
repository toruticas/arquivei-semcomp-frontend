import * as constants from './constants'

export function changeSelector(index, selector) {
  return { type: constants.CHANGE_SELECTOR, index, selector }
}

export function changeLabel(index, label) {
  return { type: constants.CHANGE_LABEL, index, label }
}

export function addNewItem() {
  return { type: constants.ADD_NEW_ITEM }
}

export function removeItem(index) {
  return { type: constants.REMOVE_ITEM, index }
}

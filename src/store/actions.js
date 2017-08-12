import * as constants from './constants'

export function changeSelector(index, selector) {
  return { type: constants.CHANGE_SELECTOR, index, selector }
}

export function changeName(index, name) {
  return { type: constants.CHANGE_NAME, index, name }
}

export function addNewItem() {
  return { type: constants.ADD_NEW_ITEM }
}

export function removeItem(index) {
  return { type: constants.REMOVE_ITEM, index }
}

export function onChangeUrl(url) {
  return { type: constants.CHANGE_URL, url }
}

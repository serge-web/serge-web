import { copyState } from '@serge/helpers'

import ActionConstant from '../constants'

export const exportItems = (state = [], action) => {
  const newState = copyState(state)

  switch (action.type) {
    case ActionConstant.CREATE_EXPORT_ITEM:
      newState.push(action.payload)
      return newState
    default:
      return newState
  }
}

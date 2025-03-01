import React from 'react'
import Confirm from '../local/atoms/confirm'
import { RootState, CurrentModal } from 'src/custom-types'
import 'src/themes/App.scss'
import { useDispatch, useSelector } from 'react-redux'
import { deleteWargame } from '../../ActionsAndReducers/dbWargames/wargames_ActionCreators'
import { modalAction } from '../../ActionsAndReducers/Modal/Modal_ActionCreators'

const DeleteWargameModal: React.FC = () => {
  const dispatch = useDispatch()
  const currentModal = useSelector((state: RootState) => state.currentModal)

  const onHideModal = () => {
    dispatch(modalAction.close())
  }

  const onDeleteWargame = () => {
    const { data } = currentModal as CurrentModal
    dispatch(deleteWargame(data as string))
    dispatch(modalAction.close())
  }

  if (!currentModal.open) return <></>

  return (
    <Confirm
      isOpen={currentModal.open}
      title='Delete'
      message='This will permanently delete the wargame. Are you sure?'
      cancelBtnText='Cancel'
      confirmBtnText='Delete'
      onCancel={onHideModal}
      onConfirm={onDeleteWargame}
    />
  )
}

export default DeleteWargameModal

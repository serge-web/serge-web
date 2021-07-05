/* eslint-disable @typescript-eslint/camelcase */
import React, { createRef, useEffect } from 'react'

/* Import Types */
import Props from './types/props'

/* Import Stylesheet */
import styles from './styles.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import Paragraph from '../../atoms/paragraph'
import { UMPIRE_FORCE } from '@serge/config'
// @ts-ignore
import JSONEditor from '@json-editor/json-editor'
import MessageLabel from '../../atoms/message-label'

const DetailLabel = ({ label }: any): React.ReactElement => (
  <span className={styles.detail}><MessageLabel label={label} /></span>
)

/* Render component */
export const ChannelMessageDetail: React.FC<Props> = ({ message, playerForce, collapsed }: Props) => {
  const editorRef = createRef<HTMLDivElement>()

  const privateMessage = message.details.privateMessage
  const PrivateBadge = (): React.ReactElement => (
    <span>
      <span className={styles['icon-private']}>
        <FontAwesomeIcon size='1x' icon={faUserSecret} />
      </span>
      Private:
    </span>
  )

  useEffect(() => {
    createEditor(message.message)
    convertInputToTextArea()
    removeElmsByTag('h3')
    removeElmsByTag('select')
  }, [message])

  const cloneAttributes = (target: any, source: any): void => {
    [...source.attributes].forEach(attr => {
      target.setAttribute(attr.nodeName, attr.nodeValue)
    })
    target.innerText = source.value
  }

  const removeElmsByTag = (tagName: string): void => {
    if (!editorRef.current) return
    const h3Elms = editorRef.current.getElementsByTagName(tagName)
    for (const h3Elm of Array.from(h3Elms)) {
      if (!h3Elm.parentNode) continue
      h3Elm.parentNode.removeChild(h3Elm)
    }
  }

  const convertInputToTextArea = (): void => {
    if (!editorRef.current) return
    const inputElms = editorRef.current.getElementsByTagName('input')
    for (const inputElm of Array.from(inputElms)) {
      if (!inputElm.parentNode) continue
      const spanElm = document.createElement('span')
      cloneAttributes(spanElm, inputElm)
      inputElm.parentNode.replaceChild(spanElm, inputElm)
    }
  }

  const createEditor = (message: any): void => {
    if (!editorRef.current) return
    const editor = new JSONEditor(editorRef.current, {
      schema: {},
      theme: 'bootstrap4',
      disable_collapse: true,
      disable_edit_json: true,
      disable_properties: true,
      disable_array_delete_all_rows: true,
      disable_array_add: true,
      disable_array_delete: true,
      disable_array_reorder: true,
      array_controls_top: true
    })
    const rootElm = editorRef.current.childNodes[0]
    const childNodes = rootElm.childNodes
    rootElm.removeChild(childNodes[1])
    rootElm.removeChild(childNodes[0])
    editor.setValue(message)
    editor.disable()
  }

  return (
    <div className={
      `${styles['wrap-detail']} ${!collapsed ? styles['wrap-detail-opened'] : ''}`
    }>
      {!collapsed && <>
        <div className={styles['form-group']} ref={editorRef} />
        {
          privateMessage &&
          playerForce === UMPIRE_FORCE && (
            <div className={styles['wrap-private']}>
              <DetailLabel label={<PrivateBadge />} />
              <span className={styles.private}>
                <Paragraph content={privateMessage} />
              </span>
            </div>
          )
        }
      </>}
    </div >
  )
}

export default ChannelMessageDetail

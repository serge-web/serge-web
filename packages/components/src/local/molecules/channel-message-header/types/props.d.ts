import React from 'react'

export default interface Props {
  /**
   * Header collapsible open state
   */
  isOpen?: boolean
  /**
   * Header item title
   */
  title?: string
  /**
   * Message timestamp
   */
  timestamp?: string
  /**
   * Message sender role id
   */
  roleId?: string
  /**
   * Message sender role name
   */
  roleName?: string
  /**
   * Message force color
   */
  forceColor: string
  /**
   * Message type
   */
  messageType?: string
  /**
   * Message read state
   */
  hasBeenRead?: boolean
  /**
   * Handle on collapse event
   */
  onExpand?: React.ReactEventHandler

  markUnread?: () => void
}

export default interface Props {
  /**
   * toggle heartbeat
   */
  enableHeartbeat: boolean

  /**
   * Animate heart icon when flag enabled
   */
  animate?: boolean
  className?: string
  /**
   * Trigger when animation is finished
   */
  onAnimateComplete?: () => void
}

import Divider from '@material-ui/core/Divider';
import { ADJUDICATION_PHASE, PLANNING_PHASE } from '@serge/config';
import classNames from 'classnames';
import { capitalize } from 'lodash';
import React, { useEffect, useState } from 'react';
/* Import Types */
import momenttz from 'moment-timezone';
import Props from './types/props';

/* Import Stylesheet */
import { formatFullDate, formatTurn } from '@serge/helpers';
import styles from './styles.module.scss';

/* Render component */
export const TurnProgression: React.FC<Props> = (props: Props) => {
  const {
    adjudicationStartTime,
    turnEndTime,
    timeWarning,
    currentTurn,
    turnPresentation,
    phase,
    gameDate,
    wargameInitiated,
  } = props
  const now = Math.floor(new Date().getTime() / 1000)
  const end = Math.round(new Date(turnEndTime).getTime() / 1000)
  const seconds = end - now
  const adjudicationPhase = phase === ADJUDICATION_PHASE
  const initialState = {
    minutesLeft: ('0' + Math.floor(seconds / 60)).slice(-2),
    secondsLeft: ('0' + Math.floor(seconds % 60)).slice(-2),
    ended: false,
    warning: false,
    minutesUp: adjudicationPhase ? '00' : '',
    secondsUp: adjudicationPhase ? '00' : '',
    startTime: Math.round(new Date(adjudicationStartTime).getTime() / 1000),
    phase
  }
  const timer = (): any => {
    const now = Math.floor(new Date().getTime() / 1000)
    const end = Math.round(new Date(turnEndTime).getTime() / 1000)
    let seconds

    if (progressionState.ended) {
      seconds = now - end
    } else {
      seconds = end - now
    }

    if (seconds < (timeWarning / 1000)) {
      setProgressionState({
        ...progressionState,
        warning: true
      })
    }

    const minsLeft = Math.floor(seconds / 60)
    const minutesLeft = minsLeft < 100 ? ('0' + minsLeft).slice(-2) : minsLeft.toString()

    setProgressionState({
      ...progressionState,
      minutesLeft,
      secondsLeft: ('0' + Math.round(seconds % 60)).slice(-2),
      ended: seconds === 0 && minsLeft === 0
    })
  }
  const countup = (): any => {
    const now = Math.floor(new Date().getTime() / 1000)
    const seconds = now - progressionState.startTime
    const minsUp = Math.floor(seconds / 60)
    const minutesUp = minsUp < 100 ? ('0' + minsUp).slice(-2) : minsUp.toString()

    setProgressionState({
      ...progressionState,
      minutesUp,
      secondsUp: ('0' + Math.round(seconds % 60)).slice(-2)
    })
  }
  const startInterval = {
    [PLANNING_PHASE]: timer,
    [ADJUDICATION_PHASE]: countup
  }
  const [progressionState, setProgressionState] = useState(initialState)

  let interval: any

  useEffect(() => {
    setProgressionState({
      ...progressionState,
      minutesUp: adjudicationPhase ? '00' : '',
      secondsUp: adjudicationPhase ? '00' : '',
      startTime: Math.round(new Date(adjudicationStartTime).getTime() / 1000)
    })
    clearInterval(interval)
    interval = setInterval(startInterval[phase], 1000)
    return (): any => clearInterval(interval)
  }, [phase])

  const warningStyle = progressionState.warning ? styles.warning : null
  const endedStyle = progressionState.ended ? styles.ended : null

  // TODO: this should come from the new turn attributes in game overview,
  // to be implemented in https://github.com/serge-web/serge/issues/954
  const showTimeRemaining = false

  return (
    <div className={classNames([
      styles['flex-content-wrapper'],
      styles['turn-progression-ui'],
      {
        'adjudication-phase': adjudicationPhase
      }
    ])} data-tour='turn-phase-step'
    >
      <div className={styles['turn-info-phase']}>
        <div className={styles['turn-phase-group']}>
          <div className={styles['turn']}>
            <h5>Turn</h5>
            <h5>{formatTurn(currentTurn, turnPresentation)}</h5>
          </div>
          <Divider orientation="vertical" className={styles['divider']} />
          <div className={styles['phase']}>
            <h5>Phase</h5>
            <h5>{capitalize(phase)}</h5>
            <h5>Planning</h5>
          </div>
        </div>
        <time dateTime={formatFullDate(gameDate)} className={styles['time']}>{momenttz(gameDate).utc().format('HH:mm-DD/MM/YYYY')}</time>
      </div>
      {
        showTimeRemaining &&
        <div className={styles['turn-info-remaining']}>
          {phase === PLANNING_PHASE &&
            <>
              <span className={
                `${styles['time-left']} ${warningStyle} ${endedStyle}`
              }>{progressionState.minutesLeft}:{progressionState.secondsLeft}</span>
              <span className={styles['info-helper']}>Time left</span>
            </>
          }
          {phase === ADJUDICATION_PHASE &&
            <>
              <span className={styles['time-left']}>{progressionState.minutesUp}:{progressionState.secondsUp}</span>
              <span className={styles['info-helper']}>Elapsed</span>
            </>
          }
          {
            !wargameInitiated &&
            <div title='Initiate wargame via Admin Panel' className={styles['not-initiated']}>WARGAME&nbsp;<br />&nbsp;NOT INITIATED</div>
          }
        </div>
      }

    </div>
  )
}

export default TurnProgression

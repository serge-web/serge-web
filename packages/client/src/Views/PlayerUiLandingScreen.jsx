import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import lineBreak from '../Helpers/splitNewLineBreak'
import { ADMIN_ROUTE, STORYBOOK_ROUTE } from '../consts'
import { faTools } from '@fortawesome/free-solid-svg-icons'
import { ReactComponent as StorybookIcon } from '../storybook-logo.svg'

export default function PlayerUiLandingScreen ({ gameInfo, enterSerge }) {
  return (
    <div className="flex-content-wrapper flex-content-wrapper--welcome">
      <div className="flex-content flex-content--welcome">
        <div className="flex-content--center contain-welcome-screen position-relative">
          <div className="welcome-logo">
            {
              gameInfo.imageUrlSet ? <img className="serge-logo" src={gameInfo.imageUrl} alt="Serge gaming" /> : null
            }
          </div>
          <div className="shortcuts">
            <a href={ADMIN_ROUTE} className="link-admin">
              <FontAwesomeIcon icon={faTools} />
            </a>
            <a href={STORYBOOK_ROUTE} className="link-admin">
              <StorybookIcon />
            </a>
          </div>
          <div className="welcome-desc">
            <h1>{gameInfo.title}</h1>
            {lineBreak(gameInfo.description)}
            <button name="play" className="btn btn-action btn-action--primary" onClick={enterSerge}>Play</button>
          </div>
        </div>
      </div>
    </div>
  )
}

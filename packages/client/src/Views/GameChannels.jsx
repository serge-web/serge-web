import React, { Component } from 'react';
import classNames from 'classnames';
import { TurnProgression } from '@serge/components';
import { nextGameTurn, showHideObjectives } from '../ActionsAndReducers/playerUi/playerUi_ActionCreators';
import ChannelTabsContainer from './ChannelTabsContainer';
import AdminAndInsightsTabsContainer from './AdminAndInsightsTabsContainer';
import { PlayerStateContext } from '../Store/PlayerUi';
import '@serge/themes/App.scss';

class GameChannels extends Component {
  static contextType = PlayerStateContext;

  showHideForceObjectives = () => {
    const [ , dispatch ] = this.context;
    dispatch(showHideObjectives());
  };

  nextTurn = () => {
    const [ state ] = this.context;
    nextGameTurn(state.currentWargame)();
  };

  render() {
    const [ state ] = this.context;
    let force = state.allForces.find((force) => force.uniqid === state.selectedForce);

    if (!force) {
      return (
        <div className="flex-content--center">
          <h1>Chosen force not in game</h1>
          <h4>Please reload and select a force</h4>
        </div>
      )
    }

    return (
      <div className="flex-content flex-content--row-wrap">
        <div className="message-feed in-game-feed" data-tour="fourth-step">
          <ChannelTabsContainer ref={el => window.channelTabsContainer[force.uniqid] = el} />
        </div>
        <div className={classNames({"message-feed": true, "out-of-game-feed": true, "umpire-feed": state.controlUi})} data-tour="fifth-step">
          <TurnProgression
            adjudicationStartTime={state.adjudicationStartTime}
            controlUi={state.controlUi}
            currentTurn={state.currentTurn}
            gameDate={state.gameDate}
            onNextTurn={this.nextTurn}
            phase={state.phase}
            timeWarning={state.timeWarning}
            turnEndTime={state.turnEndTime}
          />
          <AdminAndInsightsTabsContainer />
        </div>
        { state.showObjective &&
        <div className="force-objectives" style={{borderColor: state.forceColor}}>
          <h3>Objectives</h3>
          <div className="objective-text">
            {force.overview}
          </div>

          <div className="role-info" style={{ backgroundColor: state.forceColor, }}>
            <span className="role-type">&nbsp;</span>
            <div className="contain-force-skin">
              <div className="force-skin">
                <span className="force-type">{ force.name }</span>
                <img className="role-icon" src={force.icon} alt="" onClick={this.showHideForceObjectives} />
              </div>
            </div>
          </div>
        </div>
        }
      </div>
    )
  }
}

export default GameChannels;

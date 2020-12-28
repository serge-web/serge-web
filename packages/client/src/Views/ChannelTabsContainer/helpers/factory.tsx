import React from 'react'
import { PlayerUi } from '@serge/custom-types'
import { PERCEPTION_OF_CONTACT, STATE_OF_WORLD, SUBMIT_PLANS } from '@serge/config'
import { sendMessage } from '@serge/helpers'
import { TabNode } from 'flexlayout-react'
import { saveMapMessage } from '../../../ActionsAndReducers/playerUi/playerUi_ActionCreators'
import { Mapping, Assets, HexGrid } from '@serge/components'
import _ from 'lodash';
import Channel from '../../../Components/Channel'
import findChannelByName from './findChannelByName'

const LocalTileLayer = {
  url: './tiles/{z}/{x}/{y}.png',
  attribution: 'Generated by QTiles'
}

const bounds = {
  imageTop: 14.194809302,
  imageLeft: 42.3558566271,
  imageRight: 43.7417816271,
  imageBottom: 12.401259302
}

type Factory = (node: TabNode) => React.ReactNode

const factory = (state: PlayerUi): Factory => {
  const postback = (form: string, payload: any, channelID: string): void => {
    switch(form) {
      case 'perception':
        sendMessage(PERCEPTION_OF_CONTACT, payload, state.selectedForce, channelID, state.selectedRole, state.currentWargame, saveMapMessage)
        break
      case SUBMIT_PLANS:
        sendMessage(SUBMIT_PLANS, payload, state.selectedForce, channelID, state.selectedRole, state.currentWargame, saveMapMessage)
        break
      case STATE_OF_WORLD:
        sendMessage(STATE_OF_WORLD, payload, state.selectedForce, channelID, state.selectedRole, state.currentWargame, saveMapMessage)
        break
        default:
      console.log('Handler not created for', form)
    }
  }

  return (node: TabNode): React.ReactNode => {
    // Render the map
    const renderMap = (channelid: string) => <Mapping
      tileDiameterMins={5}
      bounds={bounds}
      tileLayer={LocalTileLayer}
      forces={state.allForces}
      platforms={state.allPlatformTypes}
      phase={state.phase}
      turnNumber={state.currentTurn}
      playerForce={state.selectedForce}
      canSubmitOrders={true} // TODO get value from role
      channelID = {channelid}
      postBack={postback}
    ><Assets /><HexGrid/>
    </Mapping>

    if (_.isEmpty(state.channels)) return;
    const channelsArray = Object.entries(state.channels);
    if (channelsArray && channelsArray.length === 1) {
      const isOnlyMap = channelsArray.find(entry => entry[1].name.toLowerCase() === 'mapping');
      if (isOnlyMap) {
        return renderMap('map')
      } else {
          return <Channel channelId={channelsArray[0][0]} />;
      }
    } else {
      const matchedChannel = findChannelByName(state.channels, node.getName());
      if (node.getName().toLowerCase() === 'mapping') {
        // return <Mapping currentTurn={state.currentTurn} role={state.selectedRole} currentWargame={state.currentWargame} selectedForce={state.selectedForce} allForces={state.allForces} allPlatforms={state.allPlatformTypes} phase={state.phase} channelID={node._attributes.id} imageTop={imageTop} imageBottom={imageBottom} imageLeft={imageLeft} imageRight={imageRight}></Mapping>
        // _attributes.id
        return renderMap(node.getId())
      }
      return matchedChannel && matchedChannel.length ? <Channel channelId={matchedChannel[0]} /> : null
    }
  }
}

export default factory

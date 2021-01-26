import React from 'react'
import { ForceData, MessageMap, PlayerUi, Role } from '@serge/custom-types'
import { PERCEPTION_OF_CONTACT, STATE_OF_WORLD, SUBMIT_PLANS, VISIBILITY_CHANGES } from '@serge/config'
import { sendMapMessage } from '@serge/helpers'
import { TabNode } from 'flexlayout-react'
import { saveMapMessage } from '../../../ActionsAndReducers/playerUi/playerUi_ActionCreators'
import { Mapping, Assets, HexGrid } from '@serge/components'
import _ from 'lodash'
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

/** utility to find the role for this role name */
const findRole = (roleName: string, forceData: ForceData | undefined): Role => {
  if(forceData) {
    const role = forceData.roles.find((role: Role) => role.name === roleName)
    if(role) {
      return role
    } 
  }
  throw new Error('Role not found for:' + roleName);
}

const factory = (state: PlayerUi): Factory => {
  const mapPostBack = (form: string, payload: MessageMap, channelID: string): void => {
    switch(form) {
      case VISIBILITY_CHANGES:
        sendMapMessage(VISIBILITY_CHANGES, payload, state.selectedForce, channelID, state.selectedRole, state.currentWargame, saveMapMessage)
        break
      case PERCEPTION_OF_CONTACT:
        sendMapMessage(PERCEPTION_OF_CONTACT, payload, state.selectedForce, channelID, state.selectedRole, state.currentWargame, saveMapMessage)
        break
      case SUBMIT_PLANS:
        sendMapMessage(SUBMIT_PLANS, payload, state.selectedForce, channelID, state.selectedRole, state.currentWargame, saveMapMessage)
        break
      case STATE_OF_WORLD:
        sendMapMessage(STATE_OF_WORLD, payload, state.selectedForce, channelID, state.selectedRole, state.currentWargame, saveMapMessage)
        break
        default:
      console.log('Handler not created for', form)
    }
  }

  return (node: TabNode): React.ReactNode => {
    // sort out if role can submit orders
    const role: Role = findRole(state.selectedRole, state.selectedForce)
    const canSubmitOrders: boolean = !!role.canSubmitPlans 

    // Render the map
    const renderMap = (channelid: string) => <Mapping
        tileDiameterMins={5}
        bounds={bounds}
        tileLayer={LocalTileLayer}
        forces={state.allForces}
        platforms={state.allPlatformTypes}
        phase={state.phase}
        turnNumber={state.currentTurn}
        playerForce={state.selectedForce ? state.selectedForce.uniqid : ''}
        canSubmitOrders={canSubmitOrders}
        channelID = {channelid}
        mapPostBack={mapPostBack}
    >
      <Assets />
      <HexGrid/>
    </Mapping>

    if (_.isEmpty(state.channels)) return
    const channelsArray = Object.entries(state.channels)
    if (channelsArray.length === 1) {
      const isOnlyMap = channelsArray.find(entry => entry[1].name.toLowerCase() === 'mapping')
      if (isOnlyMap) {
        return renderMap('map')
      } else {
        return <Channel channelId={channelsArray[0][0]} />
      }
    } else {
      const matchedChannel = findChannelByName(state.channels, node.getName())
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

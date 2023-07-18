import { TASK_GROUP } from 'src/config'
import { ForceData, MessageCreateTaskGroup, PlatformTypeData } from 'src/custom-types'
import { groupCreateNewGroup } from 'src/Helpers'

export default (payload: MessageCreateTaskGroup, allForces: ForceData[], platformTypes: PlatformTypeData[]): ForceData[] => {
  const taskGroupType = platformTypes.find((pType: PlatformTypeData) => pType.name === TASK_GROUP)
  if (!taskGroupType) { throw new Error('Cannot manage task groups without task group definition') }
  return groupCreateNewGroup(payload.dragged, payload.target, allForces, taskGroupType)
}
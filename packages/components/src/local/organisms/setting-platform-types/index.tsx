/* Import Components */
import { faUserCog, faList, faCogs, faRuler } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { withStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/styles'
import { COMMODITY_TYPE_NUMBER, databasePath, dbSuffix, localSettings } from '@serge/config'
import { CommodityType, CommodityTypes, NumberCommodityType, PlatformType, PlatformTypeData, State } from '@serge/custom-types'
import { platformTypeNameToKey } from '@serge/helpers'
import cx from 'classnames'
import React, { useEffect, useState } from 'react'
import uniqid from 'uniqid'
import { AdminContent, LeftSide, RightSide } from '../../atoms/admin-content'
import Button from '../../atoms/button'
import FormGroup from '../../atoms/form-group-shadow'
import TextInput from '../../atoms/text-input'
import EditableList, { Item } from '../../molecules/editable-list'
import IconUploader from '../../molecules/icon-uploader'
import SortableList, { Item as SortableListItem } from '../../molecules/sortable-list'
/* Import Styles */
import styles from './styles.module.scss'
/* Import proptypes */
import PropTypes from './types/props'
import PouchDB from 'pouchdb'

const MobileSwitch = withStyles({
  switchBase: {
    color: '#FFFFFF',
    '&$checked': {
      color: '#1A394D'
    },
    '&$checked + $track': {
      backgroundColor: '#1A394D'
    }
  },
  checked: {},
  track: {}
})(Switch)

const useStyles = makeStyles({
  underline: {
    '&&&:before': {
      borderBottom: 'none'
    },
    '&&:after': {
      borderBottom: 'none'
    }
  },
  units: {
    width: '80px',
    marginLeft: 10
  },
  format: {
    width: '80px'
  },
  description: {
    width: '380px'
  }
})

/* Render component */
export const SettingPlatformTypes: React.FC<PropTypes> = ({ platformType, onChange, onSave, onDelete, wargameName, iconUploadUrl }) => {
  const { description, format, underline, units } = useStyles()
  const newPlatformType: PlatformType = {
    complete: false,
    dirty: false,
    name: 'Platform Mock',
    selectedType: '',
    platformTypes: []
  }

  const initialPlatformType: PlatformType = platformType || newPlatformType
  const [localPlatformType, setLocalPlatformType] = useState<PlatformType>(initialPlatformType)
  const [selectedItem, setSelectedItem] = useState<number>(-1)

  useEffect(() => {
    if (platformType) {
      setLocalPlatformType(platformType)
    }
  }, [platformType])

  const handleSwitch = (_item: Item): void => {
    setSelectedItem(localPlatformType.platformTypes.findIndex(item => item === _item))
  }

  const handleDelete = (item: Item): void => {
    const db: PouchDB.Database = new PouchDB(databasePath + wargameName + dbSuffix)
    setSelectedItem(-1)
    db.get(localSettings).then((res: any) => {
      if (res.data.platform_types) {
        if (res.data.platform_types.platformTypes) {
          const existsSavedType = res.data.platform_types.platformTypes.filter((v: PlatformType) => v.name === item.name)
          if (existsSavedType.length !== 0) {
            onDelete && onDelete(existsSavedType[0])
          } else {
            handleChangePlatformTypes(localPlatformType.platformTypes.filter(v => v.name !== item.name))
          }
        }
      } else {
        handleChangePlatformTypes(localPlatformType.platformTypes.filter(v => v.name !== item.name))
      }
    })
  }

  const handleChangePlatformTypes = (nextPlatformTypes: Array<PlatformTypeData>): void => {
    const updates = {
      ...localPlatformType,
      platformTypes: nextPlatformTypes
    }
    onChange(updates)
    setLocalPlatformType(updates)
  }

  const handleChangePlatformTypeData = (data: PlatformTypeData, key: number): void => {
    const copyTypes: Array<PlatformTypeData> = [...localPlatformType.platformTypes]
    copyTypes[key] = data
    handleChangePlatformTypes(copyTypes)
  }

  const handleChangePlayerEditable = (item: CommodityType, key: number): void => {
    const data: PlatformTypeData = localPlatformType.platformTypes[selectedItem]
    const newCommodities: CommodityTypes = data.commodityTypes ? [...data.commodityTypes] : []
    newCommodities[key].editableByPlayer = !item.editableByPlayer
    handleChangePlatformTypeData({ ...data, commodityTypes: newCommodities }, selectedItem)
  }

  const renderCommoditiesSection = (item: SortableListItem, key: number): React.ReactNode => {
    const commType = item as NumberCommodityType
    const data: PlatformTypeData = localPlatformType.platformTypes[selectedItem]

    const onFieldChange = (field: 'units' | 'format' | 'description', value: string): void => {
      if (!data.commodityTypes) { return }
      data.commodityTypes[key][field] = value
      handleChangePlatformTypeData(data, selectedItem)
    }

    return (
      <div className={styles.mobile}>
        <MobileSwitch size='small' checked={commType.editableByPlayer} onChange={(): void => { handleChangePlayerEditable(commType, key) }} />
        <TextField placeholder="units" className={units} inputProps={{ maxLength: 5 }} InputProps={{ className: underline }} value={commType.units || ''} onChange={(e): void => onFieldChange('units', e.target.value)} />
        <TextField placeholder="description" className={description} InputProps={{ className: underline }} value={commType.description || ''} onChange={(e): void => onFieldChange('description', e.target.value)} />
        <TextField placeholder="format" className={format} inputProps={{ maxLength: 5 }} InputProps={{ className: underline }} value={commType.format || ''} onChange={(e): void => onFieldChange('format', e.target.value)} />
      </div>
    )
  }

  const handleChangeMobile = (item: State, key: number): void => {
    const data: PlatformTypeData = localPlatformType.platformTypes[selectedItem]
    const newStates: Array<State> = [...data.states]
    newStates[key].mobile = !item.mobile
    handleChangePlatformTypeData({ ...data, states: newStates }, selectedItem)
  }

  const renderStatesMobileSection = (item: SortableListItem, key: number): React.ReactNode => {
    const stateItem = item as State
    return (
      <div className={styles.mobile}>
        {key === 0 && <div title='Asset is mobile when in this state' className={styles['mobile-title']}>Mobile</div>}
        <MobileSwitch size='small' checked={stateItem.mobile} onChange={(): void => { handleChangeMobile(stateItem, key) }} />
      </div>
    )
  }

  const renderContent = (): React.ReactNode => {
    if (!localPlatformType.platformTypes[selectedItem]) return null
    const data: PlatformTypeData = localPlatformType.platformTypes[selectedItem]

    const handleChangeName = (name: string): void => {
      handleChangePlatformTypeData({ ...data, name }, selectedItem)
    }
    const handleChangeTravelMode = (e: React.ChangeEvent<HTMLInputElement>): void => {
      handleChangePlatformTypeData({ ...data, travelMode: e.target.value }, selectedItem)
    }
    const handleChangeConditions = (conditions: Array<SortableListItem>): void => {
      handleChangePlatformTypeData({ ...data, conditions: conditions as Array<string> }, selectedItem)
    }
    const handleChangeStates = (states: Array<SortableListItem>): void => {
      handleChangePlatformTypeData({ ...data, states: states as Array<State> }, selectedItem)
    }
    const handleChangeSpeeds = (speedKts: Array<SortableListItem>): void => {
      handleChangePlatformTypeData({ ...data, speedKts: speedKts as Array<number> }, selectedItem)
    }
    const handleChangeCommodities = (commodityTypes: Array<SortableListItem>): void => {
      handleChangePlatformTypeData({ ...data, commodityTypes: commodityTypes as CommodityTypes }, selectedItem)
    }
    const handleChangeIcon = (icon: string): void => {
      handleChangePlatformTypeData({ ...data, icon }, selectedItem)
    }

    const handleCreateConditions = (): void => {
      const conditions: Array<string> = [...data.conditions, 'New Condition']
      handleChangePlatformTypeData({ ...data, conditions }, selectedItem)
    }

    const handleCreateStates = (): void => {
      const states: Array<State> = [...data.states, {
        name: 'New State',
        mobile: false
      }]
      handleChangePlatformTypeData({ ...data, states }, selectedItem)
    }

    const handleCreateCommodities = (): void => {
      const baseData = data.commodityTypes || []
      const commodityTypes: CommodityTypes = [...baseData, {
        name: 'New Commodity',
        commType: COMMODITY_TYPE_NUMBER,
        commId: 'comm' + uniqid.time()
      }]
      handleChangePlatformTypeData({ ...data, commodityTypes }, selectedItem)
    }

    const handleCreateSpeeds = (): void => {
      if (data.speedKts) {
        const speedKts: Array<number> = [...data.speedKts, Math.max.apply(null, [0, ...data.speedKts]) + 10]
        handleChangePlatformTypeData({ ...data, speedKts }, selectedItem)
      } else {
        console.warn('Did not expect to receive new speeds for platform without speeds')
      }
    }

    const handleSave = (): void => {
      // creat a new platformType object
      const saveObject: PlatformType = {
        ...localPlatformType,
        // map existing to be sure all items have unique names, if not add a number suffix
        platformTypes: localPlatformType.platformTypes.map((platform, key): PlatformTypeData => {
          platform.name = createPlatformName(1, platform.name, key)
          return platform
        })
      }
      // update localPlatformType and call onSave
      handleChangePlatformTypes(saveObject.platformTypes)
      if (onSave) onSave(saveObject)
    }

    return (
      <div key={selectedItem}>
        <div className={styles.row}>
          <div className={styles.col}>
            <TextInput
              customColor="transparent"
              titleInput={true}
              value={data.name}
              updateState={(target: { value: string }): void => {
                handleChangeName(target.value)
              }}
            />
          </div>
          <div className={styles.col}>
            <IconUploader platformType={platformTypeNameToKey(data.name)} iconUploadUrl={iconUploadUrl} limit={20000} icon={data.icon} onChange={handleChangeIcon}>Change Icon</IconUploader>
          </div>
          <div className={styles.actions}>
            <Button
              color="primary"
              onClick={handleSave}
              data-qa-type="save"
            >
              Save
            </Button>
          </div>
        </div>
        <div className={styles['form-row']}>
          <div className={cx(styles.col, styles.section)}>
            <FormGroup placeholder="Travel Mode">
              <FormControl component="fieldset">
                <RadioGroup row aria-label="position" name="position" value={data.travelMode} onChange={handleChangeTravelMode}>
                  <FormControlLabel value="sea" control={<Radio color="primary" />} label="Sea" />
                  <FormControlLabel value="land" control={<Radio color="primary" />} label="Land" />
                  <FormControlLabel value="air" control={<Radio color="primary" />} label="Air" />
                </RadioGroup>
              </FormControl>
            </FormGroup>
          </div>
        </div>
        <div className={styles['form-row']}>
          <div className={cx(styles.col, styles.section)}>
            <FormGroup placeholder="Conditions">
              <SortableList
                required
                onChange={handleChangeConditions}
                onCreate={handleCreateConditions}
                items={data.conditions}
                title='Add Condition' />
            </FormGroup>
          </div>
          <div className={cx(styles.col, styles.section)}>
            <div className={styles['states-holder']}>
              <FormGroup placeholder="States">
                <SortableList
                  required
                  onChange={handleChangeStates}
                  onCreate={handleCreateStates}
                  renderItemSection={renderStatesMobileSection}
                  items={data.states}
                  title='Add State' />
              </FormGroup>
            </div>
          </div>
          <div className={cx(styles.col, styles.section)}>
            {data.speedKts &&
              <FormGroup placeholder="Speed (kts)">
                <SortableList
                  required
                  sortable='auto'
                  onChange={handleChangeSpeeds}
                  onCreate={handleCreateSpeeds}
                  items={data.speedKts}
                  title='Add Speed' />
              </FormGroup>
            }
          </div>
        </div>
        <div className={styles['form-row']}>
          <div className={cx(styles.col, styles.section)}>
            <FormGroup placeholder="Commodities">
              <div className={styles['commoditie-header']}>
                <span></span>
                <span><FontAwesomeIcon size={'lg'} title='If player can edit attribute' icon={faUserCog} /></span>
                <span><FontAwesomeIcon size={'lg'} title='Units for attribute (optional)' icon={faRuler} /></span>
                <span><FontAwesomeIcon size={'lg'} title='Description of attribute' icon={faList} /></span>
                <span><FontAwesomeIcon size={'lg'} title='Number display format (e.g. 0.00, optional)' icon={faCogs} /></span>
              </div>
              <SortableList
                required
                sortable='auto'
                onChange={handleChangeCommodities}
                onCreate={handleCreateCommodities}
                renderItemSection={renderCommoditiesSection}
                items={data.commodityTypes || []}
                title='Add Commodity' />
            </FormGroup>
          </div>
        </div>
      </div>
    )
  }
  // Create uniq platform type name
  const createPlatformName = (key = 1, defName = 'New Platform Type', exclude = -1): string => {
    let name: string = defName
    if (key > 1) name += ' ' + key
    if (localPlatformType.platformTypes.find((platform, key) => name === platform.name && key !== exclude)) {
      return createPlatformName(key + 1, defName, exclude)
    }
    return name
  }

  // Create a new empty PlatformTypeData item
  const handleCreatePlatformType = (): void => {
    handleChangePlatformTypes([
      {
        name: createPlatformName(),
        conditions: [],
        speedKts: [],
        states: [],
        icon: '',
        travelMode: 'sea'
      },
      ...localPlatformType.platformTypes
    ])
  }

  return (
    <AdminContent>
      <LeftSide>
        <EditableList
          items={localPlatformType.platformTypes}
          onClick={handleSwitch}
          onCreate={handleCreatePlatformType}
          onDelete={handleDelete}
          title='Create'
          selectedItem={selectedItem >= 0 ? localPlatformType.platformTypes[selectedItem].name : undefined}
          filterKey="name"
        />
      </LeftSide>
      <RightSide>
        {renderContent()}
      </RightSide>
    </AdminContent>
  )
}

export default SettingPlatformTypes

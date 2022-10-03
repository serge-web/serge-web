import { Asset } from '@serge/custom-types'
import MaterialTable, { Column, MTableBody } from 'material-table'
import React, { useContext, useEffect, useState } from 'react'
import { SupportPanelContext } from '../support-panel'
import { getColumns, getRows } from './helpers/collate-assets'
import PropTypes, { AssetRow } from './types/props'

export const PlanningAssets: React.FC<PropTypes> = ({ assets, forces, playerForce, opFor, forceColors, platformStyles, onSelectionChange, onVisibleRowsChange }: PropTypes) => {
  const [rows, setRows] = useState<AssetRow[]>([])
  const [columns, setColumns] = useState<Column[]>([])
  const [filter, setFilter] = useState<boolean>(false)

  const { selectedAssets } = useContext(SupportPanelContext)

  useEffect(() => {
    setColumns(getColumns(opFor, forces, playerForce.uniqid, platformStyles))
    // TODO - swap next line for
    // setRows(assets)
    setRows(getRows(opFor, forces, forceColors, platformStyles, playerForce, selectedAssets))
  }, [playerForce, forces, selectedAssets, assets])

  // fix unit-test for MaterialTable
  const jestWorkerId = process.env.JEST_WORKER_ID
  // end

  /** testing method, just to check how table handles updates */
  const addItem = (): void => {
    const blueForce = forces[1]
    const blueAssets = blueForce.assets || []
    if (blueAssets.length > 0) {
      const firstA = blueAssets[0]
      const newAsset: Asset = { ...firstA, uniqid: 'asf', contactId: 'C234' }
      blueAssets.push(newAsset)
      // drop an asset
      blueAssets.splice(3, 1)
      // change an asset
      blueAssets[2].name = blueAssets[2].name + '?'
      // update the data
      setRows(getRows(opFor, forces, forceColors, platformStyles, playerForce, []))
    }
  }

  return <MaterialTable
    title={opFor ? 'Other force assets' : 'Own force Assets'}
    columns={jestWorkerId ? [] : columns}
    data={jestWorkerId ? [] : rows}
    parentChildData={(row, rows): any => rows.find((a: AssetRow): any => a.id === row.parentId)}
    actions={jestWorkerId ? [] : [
      {
        icon: 'filter',
        iconProps: filter ? { color: 'action' } : { color: 'disabled' },
        tooltip: 'Show filter controls',
        isFreeAction: true,
        onClick: (): void => setFilter(!filter)
      },
      {
        icon: 'add',
        tooltip: 'Add new asset (for testing)',
        isFreeAction: true,
        onClick: (): void => addItem()
      }

    ]}
    options={{
      paging: false,
      sorting: false,
      filtering: filter,
      selection: !jestWorkerId // fix unit-test for material table,
    }}
    onSelectionChange={onSelectionChange}
    components={{
      Body: (props): React.ReactElement => {
        if (props.columns.length && onVisibleRowsChange) {
          onVisibleRowsChange(props.renderData)
        }
        return (<MTableBody
          {...props}
        />)
      }
    }}
  />
}

export default PlanningAssets

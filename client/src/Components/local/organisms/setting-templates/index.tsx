import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Button from '../../atoms/button'
import TextInput from '../../atoms/text-input'
import Tabs from '../../atoms/tabs'
import uniqid from 'uniqid'
import EditableList, { Item } from '../../molecules/editable-list'
import { FormBuilder } from '@ginkgo-bioworks/react-json-schema-form-builder'
import PropTypes from './types/props'
import JsonEditor from '../../molecules/json-editor'
import { TemplateBody } from 'src/custom-types'
import { TemplateTab } from 'src/config'
import { AdminContent, LeftSide, RightSide } from '../../atoms/admin-content'
import './bioworks.css'
import styles from './styles.module.scss'

const SettingTemplate: React.FC<PropTypes> = ({
  templates,
  selectedTemplate,
  onChange,
  onSave,
  onCreate,
  onDuplicate,
  onDelete,
  onSidebarClick
}) => {
  const [selectedItem, setSelectedItem] = useState<number>(0)
  const [templateData, setTemplateData] = useState<TemplateBody[]>(templates)
  const [currentTab, setCurrentTab] = useState<string>(TemplateTab.Preview)
  
  useEffect(() => {
    const selectedId = templates.findIndex(template => template._id === selectedTemplate?._id)
    const correctedSelectedItem = Math.max(selectedId, 0)    
    setSelectedItem(correctedSelectedItem)
    setTemplateData(templates)
  }, [selectedTemplate, templates])

  const handleSwitch = (_item: Item): void => {
    const index = templates.findIndex(item => item === _item)
    setSelectedItem(index)
    onSidebarClick && onSidebarClick(_item as TemplateBody)
  }

  const handleChangeTemplates = (nextTemplates: TemplateBody[]): void => {
    setTemplateData(nextTemplates)
    onChange({ templates: nextTemplates })
  }

  const handleChangeTemplate = (template: TemplateBody): void => {
    const nextTemplates: Array<TemplateBody> = [...templates]
    nextTemplates[selectedItem] = template
    // TODO: strip out un-necessary UI related metadata (`type: "ASSET-ITEM"`)
    handleChangeTemplates(nextTemplates)
  }

  const onSaveTemplate = (): void => {
    const currentTemplate = selectedItem >= 0 && templateData[selectedItem]
    if (!currentTemplate) {
      console.log('No selected template. Not saving.', selectedItem)
      return
    }
  
    if (onSave) {
      onSave(templateData[selectedItem])
    }
  }
  
  const onCreateNewTemplate = () => {
    const id = 'template-' + uniqid.time()  

    const newTemplate: TemplateBody = {
      lastUpdated: new Date().toISOString(),
      title: id,
      details: { schema: '{}', uischema: '{}', title: id },
      completed: false,
      _id: id,
      _rev: ''
    }
    onCreate && onCreate(newTemplate)
  }

  const renderContent = (): React.ReactNode => {
    const data = templateData[selectedItem]
    const { schema, uischema } = data.details as any

    const isValidJSON = (jsonString: string): boolean => {
      try {
        JSON.parse(jsonString)
        return true
      } catch {
        return false
      }
    }

    const handleTabChange = (changedTab: string): void => {
      setCurrentTab(changedTab)
    }

    const contentTabs = [TemplateTab.Preview, TemplateTab.Visual]

    if (!data) return null
    const handleFormChange = (newSchema: string, newUiSchema: string) => {
      const details = data.details
      const newDetails = {
        ...details,
        schema: newSchema,
        uischema: newUiSchema
      }
      handleChangeTemplate({ ...data, details: newDetails })
    }

    return (
      <div key={selectedItem}>
        <div className={cx(styles.row, styles['mb-20'])}>
          <div className={styles.col}>
            <TextInput
              customColor="transparent"
              titleInput={true}
              value={data.title}
              updateState={(target: { value: string }): void => {
                handleChangeTemplate({ ...data, title: target.value })
              }}
              className="underline"
            />
          </div>
          <div className={styles.actions}>
            <Button color="primary" onClick={onSaveTemplate} data-qa-type="save">
              Save Template
            </Button>
          </div>
        </div>
        {contentTabs.length > 0 && <Tabs activeTab={currentTab} onChange={handleTabChange} tabs={contentTabs} changed={false} />}
        { 
          currentTab === TemplateTab.Preview && <FormBuilder
            schema={schema}
            uischema={uischema}
            onChange={handleFormChange}
          />
        }
        {
          currentTab === TemplateTab.Visual && isValidJSON(schema) && <JsonEditor
            template={{
              details: data.details,
              _id: data._id
            }}
            messageId={data._id}
          />
        }
        {schema && console.log('Please note: No form has been created. To proceed, kindly create a form.')}
      </div>
    )
  }

  return (
    <AdminContent>
      <LeftSide>
        <div>
          <EditableList
            items={templates}
            selectedItem={templateData[selectedItem].title}
            filterKey="title"
            labelKey='title'
            onClick={handleSwitch}
            onCreate={onCreateNewTemplate}
            onDelete={onDelete}
            onDuplicate={onDuplicate}
            withSearch={true}
            title="Create Template List"
          />
        </div>
      </LeftSide>
      <RightSide>
        {renderContent()}
      </RightSide>
    </AdminContent>
  )
}

export default SettingTemplate
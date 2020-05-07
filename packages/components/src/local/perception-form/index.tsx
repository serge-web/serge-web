import React, { useState } from 'react'

/* Import Types */
import PropTypes from './types/props'
import Form from '../form'
import { Button } from '@material-ui/core'
import ForcePicker from '../form-elements/force-picker'

/* Render component */
export const PerceptionForm: React.FC<PropTypes> = ({ formHeader, formData }) => {
  const [formState, setFormState] = useState(formData)

  const { perceivedForce } = formState.populate
  const { perceivedForceVal } = formState.values

  const formHandler = (data: any): void => {
    setFormState(
      {
        populate: formData.populate,
        values: {
          perceivedForceVal: data
        }
      }
    )
  }

  return <Form type="perceived-as" headerText={formHeader}>
    <fieldset>
      <ForcePicker label="Perceived Force" options={perceivedForce} selected={perceivedForceVal} updateState={formHandler}/>
    </fieldset>
    <Button>Save</Button>
  </Form>
}

export default PerceptionForm

import React from 'react'

/* Import Types */
// import Props from './types/props'
import Form from '../form'
import RCB from '../form-elements/rcb'
import { Button } from '@material-ui/core'
import Turns from '../form-elements/turns'

/* Render component */
export const PlanTurnForm: React.FC = () =>
  <Form type="planning" headerText="placeholder">
    <fieldset>
      <RCB type="radio" label="Status" options={['Moored', 'Transiting']} />
      <Turns />
    </fieldset>
    <Button>Save</Button>
  </Form>

export default PlanTurnForm

import { booleanObject, dropDownObject, multiSelectDropDownObject, numberObject, textAreaObject, textObject } from './p9-helpers'

let order = 300

// note: this template is used for a range of types of strike
export const tmplMissileStrike = {
  ownAssets: {
    type: 'array',
    format: 'table',
    minItems: 0,
    propertyOrder: 70,
    title: 'Own Assets (Launchers)',
    options: {
      grid_columns: 6,
      enable_array_copy: true,
      disable_array_reorder: true
    },
    items: {
      type: 'object',
      format: 'grid',
      title: 'Asset',
      required: [
        'asset',
        'number'
      ],
      properties: {
        asset: {
          title: 'Launcher',
          type: 'string',
          enum: [
            'ta',
            'tb',
            'tc',
            'pa'
          ],
          options: {
            grid_columns: 2,
            enum_titles: [
              'Battery A',
              'Battery B',
              'Battery C',
              'Battery D'
            ]
          }
        },
        missileType: {
          title: 'Missile Type',
          type: 'string',
          enum: [
            '###Ballistic',
            'SRBM',
            'MRBM',
            'IRBM',
            '###Cruise',
            'Standard Cruise',
            'Low Obs Cruise',
            '###UAV',
            'Propellor OWA UAV',
            'Jet OWA UAV'
          ],
          options: {
            grid_columns: 2
          }
        },
        number: {
          title: 'Quantity',
          type: 'string',
          options: {
            grid_columns: 1
          },
          format: 'number'
        }
      }
    }
  },
  otherAssets: {
    type: 'array',
    format: 'table',
    minItems: 0,
    propertyOrder: 75,
    title: 'Targets',
    options: {
      grid_columns: 6,
      enable_array_copy: true,
      disable_array_reorder: true
    },
    items: {
      type: 'object',
      format: 'grid',
      title: 'Asset',
      required: [
        'asset',
        'number'
      ],
      properties: {
        asset: {
          title: 'Target',
          type: 'string',
          enum: [
            'ta',
            'tb',
            'tc',
            'pa'
          ],
          options: {
            grid_columns: 2,
            enum_titles: [
              'Opp Site A',
              'Opp Site B',
              'Opp Site C',
              'Opp Site D'
            ]
          }
        },
        missileType: {
          title: 'Missile Type',
          type: 'string',
          enum: [
            '###Ballistic',
            'SRBM',
            'MRBM',
            'IRBM',
            '###Cruise',
            'Standard Cruise',
            'Low Obs Cruise',
            '###UAV',
            'Propellor OWA UAV',
            'Jet OWA UAV'
          ],
          options: {
            grid_columns: 2
          }
        },
        number: {
          title: 'Quantity',
          type: 'string',
          options: {
            grid_columns: 1
          },
          format: 'number'
        }
      }
    }
  }
}

export const tmplPatrol = {
  otherAssets: {
    type: 'array',
    readonly: 'readonly',
    options: {
      hidden: true
    },
    id: 'hiddenAssets'
  }
}

export const tmplResupply = {
  otherAssets: {
    type: 'array',
    readonly: 'readonly',
    options: {
      hidden: true
    },
    id: 'hiddenAssets'
  }
}

export const tmplISTAR = {
  domain: multiSelectDropDownObject('Target Domains', ['Maritime', 'Air', 'Land'], 2, order++)
}

/** note: used for offensive and defensive operations */
export const tmplDuration = {
  duration: numberObject('Duration (hrs)', 4, order++)
}

export const tmplTST = {
  targetPriority: textAreaObject('Target Type Priority', 4, order++)
}

export const tmplEWAttack = {
  effect: textObject('Effect Type', 4, order++)
}

export const tmplSOFActivity = {
  activityType: dropDownObject('Activity Type', ['Support & Influence', 'Special Reconnaisance', 'Direct Action'], 4, order++)
}

// for generic cyber activities
export const tmplActivity = {
  discussedWithSMEs: booleanObject('Has this been discussed with SMEs?', 3, order++),
  isPreadjudicated: booleanObject('Is this pre-adjudicated?', 3, order++),
  standaloneActivity: booleanObject('Stand-Alone Activity?', 3, order++),
  requiresAS: booleanObject('Does this require AS Discussion?', 3, order++),
  effectDesc: textAreaObject('Effect Description', 6, order++)
}

export const tmplAirToAir = {
  otherAssets: {
    type: 'array',
    readonly: 'readonly',
    options: {
      hidden: true
    },
    id: 'hiddenAssets'
  }
}

export const tmplTransit = {
  otherAssets: {
    type: 'array',
    readonly: 'readonly',
    options: {
      hidden: true
    },
    id: 'hiddenAssets'
  }
}

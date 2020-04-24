export const forces = [
  {
    color: '#FCFBEE',
    dirty: false,
    icon: 'default_img/umpireDefault.png',
    name: 'White',
    overview: 'Umpire force.',
    roles: [
      {
        control: true,
        isInsightViewer: true,
        isObserver: true,
        name: 'Game Control',
        password: 'p2311'
      }
    ],
    umpire: true,
    uniqid: 'umpire'
  },
  {
    assets: [
      {
        name: 'HMS DEVONSHIRE',
        contactId: 'C043',
        condition: 'Full capability',
        perceptions: {},
        platformType: 'frigate',
        position: 'S23',
        status: {
          state: 'Transiting',
          speedKts: 20
        },
        uniqid: 'a0pra00001'
      },
      {
        name: 'STING',
        contactId: 'C072',
        condition: 'Full capability',
        perceptions: {},
        platformType: 'helicopter',
        position: 'P01',
        status: {
          state: 'Landed'
        },
        uniqid: 'a0pra00002'
      },
      {
        name: 'P8',
        contactId: 'C076',
        condition: 'Full capability',
        perceptions: {},
        platformType: 'fixed-wing-aircraft',
        position: 'P03',
        status: {
          state: 'Landed'
        },
        uniqid: 'a0pra00012'
      },
      {
        name: 'EDDYSTONE PT',
        contactId: 'C012',
        condition: 'Full capability',
        perceptions: {
          Red: {
            force: 'Blue',
            type: ''
          }
        },
        platformType: 'merchant-vessel',
        position: 'Q25',
        status: {
          state: 'Transiting',
          speedKts: 20
        },
        uniqid: 'a0pra00003'
      }
    ],
    color: '#00F',
    dirty: false,
    icon: 'default_img/umpireDefault.png',
    name: 'Blue',
    overview: 'Blue force.',
    roles: [
      {
        control: false,
        isInsightViewer: false,
        isObserver: false,
        name: 'CO',
        password: 'p5543'
      }
    ],
    umpire: false,
    uniqid: 'Blue'
  },
  {
    assets: [
      {
        name: 'TARRADA',
        contactId: 'C065',
        condition: 'Full capability',
        locationPending: true,
        perceptions: {},
        platformType: 'fishing-vessel',
        position: 'N07',
        status: {
          state: 'Transiting',
          speedKts: 10
        },
        uniqid: 'a0pra000100'
      },
      {
        name: 'WBIED-1',
        contactId: 'C108',
        condition: 'Full capability',
        locationPending: true,
        perceptions: {},
        platformType: 'torpedo',
        position: 'T01',
        status: {
          state: 'Onboard'
        },
        uniqid: 'a0pra020102'
      },
      {
        name: 'WBIED-2',
        contactId: 'C118',
        condition: 'Full capability',
        locationPending: true,
        perceptions: {},
        platformType: 'torpedo',
        position: 'T03',
        status: {
          state: 'Onboard'
        },
        uniqid: 'a0pra130102'
      },
      {
        name: 'Osa',
        contactId: 'C003',
        condition: 'Full capability',
        locationPending: true,
        perceptions: {
          Blue: {
            force: 'Red',
            type: ''
          }
        },
        platformType: 'fast-attack-craft',
        position: 'M05',
        status: {
          state: 'Moored'
        },
        uniqid: 'a0pra160102'
      },
      {
        name: 'Yevgenya',
        contactId: 'C313',
        condition: 'Full capability',
        locationPending: true,
        perceptions: {
          Blue: {
            force: 'Red',
            type: 'fast-attack-craft'
          }
        },
        platformType: 'mcmv',
        position: 'M04',
        status: {
          state: 'Moored'
        },
        uniqid: 'a0pra170102'
      },
      {
        name: 'Coastal Radar C',
        contactId: 'C476',
        condition: 'Full capability',
        locationPending: true,
        perceptions: {},
        platformType: 'coastal-radar-site',
        position: 'Q12',
        status: {
          state: 'Inactive'
        },
        uniqid: 'a0prc000103'
      }
    ],
    color: '#F00',
    dirty: false,
    icon: 'default_img/umpireDefault.png',
    name: 'Red',
    overview: 'Red force.',
    roles: [
      {
        control: false,
        isInsightViewer: false,
        isObserver: false,
        name: 'CO',
        password: 'p3244'
      }
    ],
    umpire: false,
    uniqid: 'Red'
  },
  {
    assets: [
      {
        name: 'OPAL FORTUNE',
        contactId: 'C015',
        condition: 'Full capability',
        perceptions: {
          Blue: {
            force: 'Green',
            type: 'merchant-vessel',
            name: 'OPAL FORTUNE'
          }
        },
        plannedTurns: [
          {
            route: [
              'P17'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 2
          },
          {
            route: [
              'O17'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 3
          },
          {
            route: [
              'O16'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 4
          },
          {
            route: [
              'N15'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 5
          },
          {
            route: [
              'N14'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 6
          },
          {
            route: [
              'N13'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 7
          },
          {
            route: [
              'M13'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 8
          },
          {
            route: [
              'M12'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 9
          },
          {
            route: [
              'L11'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 10
          },
          {
            route: [
              'L10'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 11
          },
          {
            route: [
              'L09'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 12
          },
          {
            route: [
              'L08'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 13
          },
          {
            route: [
              'L07'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 14
          },
          {
            route: [
              'L06'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 15
          }
        ],
        platformType: 'merchant-vessel',
        position: 'P18',
        status: {
          state: 'Transiting',
          speedKts: 20
        },
        uniqid: 'a0pra000200'
      },
      {
        name: 'AL SALMI',
        contactId: 'C081',
        condition: 'Full capability',
        perceptions: {
          Blue: {
            force: 'Green',
            type: 'merchant-vessel',
            name: 'AL SALMI'
          },
          Red: {
            force: 'Green',
            type: 'merchant-vessel',
            name: 'AL SALMI'
          }
        },
        plannedTurns: [
          {
            route: [
              'K14'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 2
          },
          {
            route: [
              'L14'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 3
          },
          {
            route: [
              'M15'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 4
          },
          {
            route: [
              'M16'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 5
          },
          {
            route: [
              'N16'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 6
          },
          {
            route: [
              'N17'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 7
          },
          {
            route: [
              'O18'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 8
          },
          {
            route: [
              'O19'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 9
          },
          {
            route: [
              'O20'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 10
          },
          {
            route: [
              'O21'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 11
          },
          {
            route: [
              'P21'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 12
          },
          {
            route: [
              'Q22'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 13
          }
        ],
        platformType: 'merchant-vessel',
        position: 'J13',
        status: {
          state: 'Transiting',
          speedKts: 20
        },
        uniqid: 'a0pra000201'
      },
      {
        name: 'BERGE NEBLINA',
        contactId: 'C116',
        condition: 'Full capability',
        perceptions: {},
        plannedTurns: [
          {
            route: [
              'S22',
              'R21'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 2
          },
          {
            route: [
              'Q21',
              'P20'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 3
          },
          {
            route: [
              'P19',
              'P18'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 4
          },
          {
            route: [
              'P17',
              'O17'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 5
          },
          {
            route: [
              'O16',
              'N15'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 6
          },
          {
            route: [
              'N14',
              'N13'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 7
          },
          {
            route: [
              'M13',
              'M12'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 8
          },
          {
            route: [
              'L11',
              'L10'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 9
          },
          {
            route: [
              'L09',
              'L08'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 10
          },
          {
            route: [
              'L07',
              'L06'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 11
          },
          {
            route: [
              'L05',
              'L04'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 12
          },
          {
            route: [
              'L03',
              'L02'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 13
          },
          {
            route: [
              'K02',
              'K01'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 14
          }
        ],
        platformType: 'merchant-vessel',
        position: 'S23',
        status: {
          state: 'Transiting',
          speedKts: 10
        },
        uniqid: 'a0pra000202'
      },
      {
        name: 'BERVE DAINE',
        contactId: 'C196',
        condition: 'Full capability',
        perceptions: {},
        plannedTurns: [
          {
            route: [
              'G11',
              'H11'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 2
          },
          {
            route: [
              'I12',
              'J12'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 3
          },
          {
            route: [
              'J13',
              'K14'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 4
          },
          {
            route: [
              'K15',
              'L15'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 5
          },
          {
            route: [
              'M16',
              'M17'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 6
          },
          {
            route: [
              'N17',
              'N18'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 7
          },
          {
            route: [
              'O19',
              'O20'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 8
          },
          {
            route: [
              'P20',
              'P21'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 9
          },
          {
            route: [
              'Q22',
              'R22'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 10
          },
          {
            route: [
              'S23',
              'T22'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 11
          }
        ],
        platformType: 'merchant-vessel',
        position: 'G10',
        status: {
          state: 'Transiting',
          speedKts: 20
        },
        uniqid: 'a0pra044202'
      },
      {
        name: 'ESSO OSAKA',
        contactId: 'C416',
        condition: 'Full capability',
        perceptions: {},
        plannedTurns: [
          {
            route: [
              'I07',
              'I08'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 2
          },
          {
            route: [
              'I09',
              'J09'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 3
          },
          {
            route: [
              'J10',
              'J11'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 4
          },
          {
            route: [
              'J12',
              'K13'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 5
          },
          {
            route: [
              'K14',
              'L14'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 6
          },
          {
            route: [
              'M15',
              'M16'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 7
          },
          {
            route: [
              'N16',
              'N17'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 8
          },
          {
            route: [
              'O18',
              'O19'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 9
          },
          {
            route: [
              'O20',
              'O21'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 10
          },
          {
            route: [
              'P21',
              'Q22'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 11
          },
          {
            route: [
              'R22',
              'S22'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 12
          }
        ],
        platformType: 'merchant-vessel',
        position: 'I06',
        status: {
          state: 'Transiting',
          speedKts: 20
        },
        uniqid: 'a0prw097212'
      },
      {
        name: 'NEW HYDRA',
        contactId: 'C796',
        condition: 'Full capability',
        perceptions: {},
        plannedTurns: [
          {
            route: [
              'Q21'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 2
          },
          {
            route: [
              'P20'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 3
          },
          {
            route: [
              'P19'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 4
          },
          {
            route: [
              'P18'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 5
          },
          {
            route: [
              'P17'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 6
          },
          {
            route: [
              'O17'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 7
          },
          {
            route: [
              'O16'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 8
          },
          {
            route: [
              'N15'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 9
          },
          {
            route: [
              'N14'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 10
          },
          {
            route: [
              'N13'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 11
          },
          {
            route: [
              'M13'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 12
          },
          {
            route: [
              'L12'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 13
          },
          {
            route: [
              'L11'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 14
          },
          {
            route: [
              'L10'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 15
          },
          {
            route: [
              'L09'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 16
          },
          {
            route: [
              'L08'
            ],
            status: {
              mobile: true,
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 17
          },
          {
            route: [
              'L07',
              'L06'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 18
          },
          {
            route: [
              'L05',
              'L04'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 19
          },
          {
            route: [
              'L03',
              'L02'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 20
          },
          {
            route: [
              'K02',
              'K01'
            ],
            status: {
              speedKts: 20,
              state: 'Transiting'
            },
            turn: 21
          }
        ],
        platformType: 'merchant-vessel',
        position: 'R21',
        status: {
          state: 'Transiting',
          speedKts: 20
        },
        uniqid: 'a0prw044212'
      },
      {
        name: 'SHU\'I',
        contactId: 'C026',
        condition: 'Full capability',
        perceptions: {},
        plannedTurns: [
          {
            route: [
              'Q17'
            ],
            status: {
              mobile: true,
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 2
          },
          {
            status: {
              state: 'Fishing'
            },
            turn: 3
          },
          {
            status: {
              state: 'Fishing'
            },
            turn: 4
          },
          {
            status: {
              mobile: false,
              state: 'Fishing'
            },
            turn: 5
          },
          {
            route: [
              'P16'
            ],
            status: {
              mobile: true,
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 6
          },
          {
            status: {
              state: 'Fishing'
            },
            turn: 7
          },
          {
            status: {
              state: 'Fishing'
            },
            turn: 8
          },
          {
            status: {
              mobile: false,
              state: 'Fishing'
            },
            turn: 9
          },
          {
            route: [
              'P17'
            ],
            status: {
              mobile: true,
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 10
          },
          {
            status: {
              state: 'Fishing'
            },
            turn: 11
          },
          {
            status: {
              mobile: false,
              state: 'Fishing'
            },
            turn: 12
          },
          {
            route: [
              'P18'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 13
          }
        ],
        platformType: 'fishing-vessel',
        position: 'Q18',
        status: {
          state: 'Transiting',
          speedKts: 10
        },
        uniqid: 'a0pra000203'
      },
      {
        name: 'KOTA GUNAWAN',
        contactId: 'C635',
        condition: 'Full capability',
        perceptions: {},
        plannedTurns: [
          {
            route: [
              'O15'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 2
          },
          {
            route: [
              'O16'
            ],
            status: {
              mobile: true,
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 3
          },
          {
            status: {
              state: 'Fishing'
            },
            turn: 4
          },
          {
            status: {
              mobile: false,
              state: 'Fishing'
            },
            turn: 5
          },
          {
            route: [
              'N15'
            ],
            status: {
              mobile: true,
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 6
          },
          {
            status: {
              state: 'Fishing'
            },
            turn: 7
          },
          {
            status: {
              mobile: false,
              state: 'Fishing'
            },
            turn: 8
          },
          {
            route: [
              'N14'
            ],
            status: {
              mobile: true,
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 9
          },
          {
            status: {
              state: 'Fishing'
            },
            turn: 10
          },
          {
            status: {
              mobile: false,
              state: 'Fishing'
            },
            turn: 11
          },
          {
            route: [
              'N13'
            ],
            status: {
              mobile: true,
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 12
          },
          {
            status: {
              state: 'Fishing'
            },
            turn: 13
          },
          {
            status: {
              state: 'Fishing'
            },
            turn: 14
          }
        ],
        platformType: 'fishing-vessel',
        position: 'O14',
        status: {
          state: 'Transiting',
          speedKts: 10
        },
        uniqid: 'a0pr7600274'
      },
      {
        name: 'JALBUT',
        contactId: 'C115',
        condition: 'Full capability',
        perceptions: {},
        plannedTurns: [
          {
            route: [
              'M17'
            ],
            status: {
              mobile: true,
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 2
          },
          {
            status: {
              state: 'Fishing'
            },
            turn: 3
          },
          {
            status: {
              mobile: false,
              state: 'Fishing'
            },
            turn: 4
          },
          {
            route: [
              'N17'
            ],
            status: {
              mobile: true,
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 5
          },
          {
            status: {
              state: 'Fishing'
            },
            turn: 6
          },
          {
            status: {
              mobile: false,
              state: 'Fishing'
            },
            turn: 7
          },
          {
            route: [
              'N18'
            ],
            status: {
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 8
          },
          {
            route: [
              'N19'
            ],
            status: {
              mobile: true,
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 9
          },
          {
            status: {
              state: 'Fishing'
            },
            turn: 10
          },
          {
            status: {
              mobile: false,
              state: 'Fishing'
            },
            turn: 11
          },
          {
            route: [
              'M19'
            ],
            status: {
              mobile: true,
              speedKts: 10,
              state: 'Transiting'
            },
            turn: 12
          },
          {
            status: {
              state: 'Fishing'
            },
            turn: 13
          },
          {
            status: {
              state: 'Fishing'
            },
            turn: 14
          }
        ],
        platformType: 'fishing-vessel',
        position: 'L16',
        status: {
          state: 'Transiting',
          speedKts: 10
        },
        uniqid: 'a0pra000204'
      }
    ],
    color: '#0F0',
    controlledBy: [
      'umpire'
    ],
    dirty: false,
    icon: 'default_img/umpireDefault.png',
    name: 'Green',
    overview: 'Green Shipping',
    roles: [
      {
        control: false,
        isInsightViewer: false,
        isObserver: false,
        name: 'CO',
        password: 'P9454'
      }
    ],
    umpire: false,
    uniqid: 'Green'
  }
]

export default forces

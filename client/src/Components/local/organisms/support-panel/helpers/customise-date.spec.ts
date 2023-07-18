import { MilliTurns, MonthTurns } from 'src/custom-types'
import moment from 'moment'
import { customiseDate, getDateSlots } from './customise-date'

const startTime = '2022-11-12T00:00:00.000Z'

it('creates two-hour slots for 8 hour period', () => {
  const eightHours: MilliTurns = { unit: 'millis', millis: 28800000 }
  const start = moment(startTime)
  const slots = getDateSlots(start.valueOf(), eightHours)
  expect(slots).toBeTruthy()
  expect(slots.length).toEqual(4)
  expect(slots[0].label).toEqual('120000Z')
  expect(slots[0].value).toEqual(startTime)
})

it('creates two-hour slots for 3 days period', () => {
  const tmp = moment(startTime)
  const end = moment(startTime).add(3, 'days').valueOf()
  const timeDiff = end - tmp.valueOf()
  const threeDays: MilliTurns = { unit: 'millis', millis: timeDiff }
  const start = moment(startTime)
  const slots = getDateSlots(start.valueOf(), threeDays)
  expect(slots).toBeTruthy()
  expect(slots.length).toEqual(36)
  expect(slots[0].label).toEqual('120000Z')
  expect(slots[0].value).toEqual(startTime)
})

it('creates one day slots', () => {
  const tmp = moment(startTime)
  const end = moment(startTime).add(8, 'days').valueOf()
  const timeDiff = end - tmp.valueOf()

  const eightDays: MilliTurns = { unit: 'millis', millis: timeDiff }
  const start = moment(startTime)
  const slots = getDateSlots(start.valueOf(), eightDays)
  expect(slots).toBeTruthy()
  expect(slots.length).toEqual(8)
  expect(slots[0].label).toEqual('Nov 12')
  expect(slots[0].value).toEqual(startTime)
})

it('creates slots for months', () => {
  const eightDays: MonthTurns = { unit: 'months', months: 3 }
  const start = moment(startTime)
  const slots = getDateSlots(start.valueOf(), eightDays)
  expect(slots).toBeTruthy()
  expect(slots.length).toEqual(92)
  expect(slots[0].label).toEqual('Nov 12')
  expect(slots[0].value).toEqual(startTime)
})

it('returns cloned copy', () => {
  const eightDays: MonthTurns = { unit: 'months', months: 3 }
  const start = moment(startTime)
  const schema = { properties: { obj: { val2: 3, val3: 43 } } }
  const res = customiseDate(undefined, schema, start.valueOf(), eightDays)
  // check the contents aren't modified
  expect(res).toEqual(schema)
  // check it's a different object
  expect(res).not.toBe(schema)
})

it('gets modified', () => {
  const eightDays: MonthTurns = { unit: 'months', months: 3 }
  const start = moment(startTime)
  const schema = { properties: { dumbDate: { options: {} }, obj: { val2: 3, val3: 43 } } }
  const res = customiseDate(undefined, schema, start.valueOf(), eightDays)
  expect(res).not.toBe(schema)
})
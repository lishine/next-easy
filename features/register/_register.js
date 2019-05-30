import { action, thunk, select } from 'easy-peasy'
import indexOf from 'lodash/fp/indexOf'

import { barcode } from './stages/barcode/_barcode'
import { wifi } from './stages/wifi/_wifi'

import { initialState } from 'features/model'

const stages = ['Barcode', 'Wifi']

export const register = {
    reset: action(state => initialState.register),
    stages: {
        barcode,
        wifi,
    },
    stage: undefined,
    setStage: action((state, stage) => {
        state.stage = stage
    }),
    barcode: undefined,
    setBarcode: action((state, barcode) => {
        state.barcode = barcode
    }),
    navigate: thunk((actions, add, { getState }) => {
        let { stage } = getState()
        stage = stages[add + indexOf(stage)(stages)]
        actions.setStage(stage)
    }),
}

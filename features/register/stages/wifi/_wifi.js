import { action, thunk, select } from 'easy-peasy'
import { formModel } from 'common/models/formModel'
import { loadModel } from 'common/models/loadModel'

import { submit } from './submit'
import { load } from './load'

export const wifi = {
    ...formModel({ dynamic: true }),
    submit,
    submittedIndex: 0,
    setSubmittedIndex: action((state, submittedIndex) => {
        state.submittedIndex = submittedIndex
    }),

    load,
    ...loadModel(),
}

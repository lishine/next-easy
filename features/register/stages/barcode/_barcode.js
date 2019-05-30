import { action, thunk, select } from 'easy-peasy'
import { formModel } from 'common/models/formModel'

import { submit } from './submit'

export const barcode = {
    ...formModel(),
    submit,
}

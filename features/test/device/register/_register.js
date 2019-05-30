import { formModel } from 'common/models/formModel'

import { submit } from './submit'
import { wifiConnect } from './wifiConnect'

export const register = {
    ...formModel(),
    submit,
    wifiConnect,
}

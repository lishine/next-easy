import { action, thunk, select } from 'easy-peasy'
import isEmpty from 'lodash/isEmpty'

import { register } from './register/_register'

export const device = { register }

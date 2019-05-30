import * as Yup from 'yup'

import { mapToObject } from 'utils/utils'

const MIN_PASSWORD_LENGTH = 6
const MIN_CODE_LENGTH = 4
const password = Yup.string()
    .min(
        MIN_PASSWORD_LENGTH,
        `Password has to be longer than ${MIN_PASSWORD_LENGTH} characters!`
    )
    .required('Password is required!')

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schemas = values => {
    console.log('values', values)
    return {
        barcode: Yup.number()
            .typeError('Barcode must be a number')
            .integer('Barcode must be an integer number'),
        wifiNames: Yup.array().of(Yup.string().required('WIFI Name is required!')),
        password,
        passwords: Yup.array().of(password),
        code: Yup.string()
            .min(4, `code must be longer than ${MIN_CODE_LENGTH}`)
            .required('Code is required'),
        name: Yup.string().matches(/^.+?\s+?.+?$/, 'Full name is required'),
        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
        email: Yup.string()
            .email('E-mail is not valid!')
            .required('E-mail is required!'),
        currentPassword: password,
        newPassword: password.notOneOf(
            [values.currentPassword],
            'Passwords are not the same!'
        ),
        terms: Yup.bool().oneOf([true], 'Please agree to the terms'),
    }
}

export const schema = fields => values => {
    const sch = schemas(values) // gets schema without dependency of values
    return Yup.object().shape(mapToObject(field => ({ [field]: sch[field] }))(fields)) // filters only the relevant fields by form
}

import * as _ from 'lodash'

export const v_username = (username) => _.isString(username) &&
            /^[a-z0-9A-Z]{2,20}$/.test(username)

export const v_password = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)

export const v_name = (name) => _.isString(name) &&
            /^[a-zA-Z]{2,20}$/.test(name)

export const v_email = (email) => _.isString(email) &&
            /^([0-9A-Za-z.]+\@[0-9A-Za-z]+\.[a-z]+(\.[a-z]+)?)$/.test(email)
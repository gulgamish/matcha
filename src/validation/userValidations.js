import * as _ from "lodash"

export const v_tag = (tag) => _.isString(tag) &&
    /^([a-z]{2,50})$/.test(tag)

export const v_bio = (bio) => /^([a-z0-9A-Z *]{10,500})$/.test(bio)
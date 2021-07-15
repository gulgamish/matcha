import * as _ from "../../Constants/sort"
import { filter, reject } from "lodash"

export const sort = (list, type) => {
    var newList = [];

    if (_.AGE_ASC === type)
        newList = list.slice().sort((a, b) => a.age - b.age);
    else if (_.AGE_DSC === type)
        newList = list.slice().sort((a, b) => b.age - a.age);
    else if (_.LOCATION_ASC === type)
        newList = list.slice().sort((a, b) => a.distance - b.distance);
    else if (_.LOCATION_DSC === type)
        newList = list.slice().sort((a, b) => b.distance - a.distance);
    else if (_.F_RATING_ASC === type)
        newList = list.slice().sort((a, b) => a.score - b.score);
    else if (_.F_RATING_DSC === type)
        newList = list.slice().sort((a, b) => b.score - a.score);
    else if (_.TAGS_ASC === type)
        newList = list.slice().sort((a, b) => a.interests.length - b.interests.length);
    else if (_.TAGS_DSC === type)
        newList = list.slice().sort((a, b) => b.interests.length - a.interests.length);

    return newList;
}

const check = (elem, list) => {
    console.log(elem, list);
    var temp = list.filter(element => element === elem);
    return temp.length;
}

export const filterList = (
    list, filters
) => {
    var newList = list;

    newList = newList.filter(elem => elem.age >= filters.age.min && elem.age <= filters.age.max);
    newList = newList.filter(elem => elem.distance >= filters.distance.min && elem.distance <= filters.distance.max);
    newList = newList.filter(elem => elem.score >= filters.score.min && elem.score <= filters.score.max);
    for (var i = 0; i < newList.length; i++) {
        if (newList[i].interests.filter(
            interest => filters.interests.includes(interest)
        ).length === 0)
            delete newList[i];
    }

    return newList;
}
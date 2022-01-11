import * as _ from "../../Constants/sort"

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

export const filterList = (
    list, filters
) => {
    var newList = [...list];
    if (Object.hasOwnProperty.call(filters, "age"))
        newList = newList.filter(elem => elem.age >= filters.age.min && elem.age <= filters.age.max);
    if (Object.hasOwnProperty.call(filters, "distance"))
        newList = newList.filter(elem => elem.distance >= filters.distance.min && elem.distance <= filters.distance.max);
    if (Object.hasOwnProperty.call(filters, "score"))
        newList = newList.filter(elem => elem.score >= filters.score.min && elem.score <= filters.score.max);
    if (Object.hasOwnProperty.call(filters, "interests") && filters?.interests.length > 0) {
        for (let i = 0; i < newList.length; i++) {
            var arr = newList[i].interests.filter((value) =>
                filters.interests.includes(value)
            );
            if ( arr.length === 0) {
                delete newList[i];
            }
        }
    }

    return newList;
}
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
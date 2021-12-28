import { TsDocGenDoc } from "../types/tsdocgen";

function findTagForDoc(tags: TsDocGenDoc['tags'], docName: string, tagType: string) {
    return tags.find((tag) => tag.tagName === docName && tag.tag === tagType)
}

export default findTagForDoc;
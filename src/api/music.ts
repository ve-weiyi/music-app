import request from "./request"
import {MusicListQuery, MusicListResponse, IApiResponse, CreateMusicReq, GetMusicReq} from "./types"

/** "ping" */
export function getMusicListApi(data?: MusicListQuery): Promise<IApiResponse<MusicListResponse>> {
    return request({
        url: "/app/commercial/get_user_music_list",
        method: "post",
        data: data,
    })
}

export function createMusicApi(data?: CreateMusicReq): Promise<any> {
    return request({
        url: "/api/custom_generate",
        method: "post",
        data: data,
    })
}


export function getMusicApi(data?: GetMusicReq): Promise<any> {
    return request({
        url: `/api/get?ids=${data.ids}`,
        method: "get"
    })
}

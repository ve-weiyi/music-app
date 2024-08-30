import request from "./request"
import {MusicListQuery, MusicListResponse,IApiResponse,CreateMusicReq,UploadMusicReq} from "./types"

/** "ping" */
export function getMusicListApi(data?: MusicListQuery): Promise<IApiResponse<MusicListResponse>> {
    return request({
        url: "/app/commercial/get_user_music_list",
        method: "post",
        data: data,
    })
}

export function createMusicApi(data?: CreateMusicReq): Promise<IApiResponse<any>> {
    return request({
        url: "/api/custom_generate",
        method: "post",
        data: data,
    })
}

export function uploadMusicApi(data?: UploadMusicReq): Promise<IApiResponse<any>> {
    return request({
        url: "/app/commercial/upload_voice",
        method: "post",
        data: data,
    })
}

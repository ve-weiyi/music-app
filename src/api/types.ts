export interface MusicListQuery {
    file_name: string
    account: string
    music_type: number
    tag: string
}


export interface Music{
    file_name: string
    tag: string
    download_url: string
}


export interface MusicListResponse {
    ai_music_list: Music[]
    custom_music_list: Music[]
    global_music_list: Music[]
}

export interface IApiResponse<T> {
    flag: boolean;
    code: number;
    data: T;
    message: string;
}

export interface CreateMusicReq {
    prompt: string
    tags: string
    title: string
}
// UploadMusicReq
export interface UploadMusicReq {
    file_name: any 
    file_type: number //102
    music_type: number //用户：2 AI：1
    account: string
    tag: string,
    ai_music_url: string
}

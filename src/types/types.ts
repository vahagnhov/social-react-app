export type PostType = {
    id: number,
    message: string,
    likesCount: number
};

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType,
    photos: PhotosType
};

export type UserType = {
    id: number
    name: string
    status: string | null,
    photos: PhotosType
    followed: boolean
};

export type DialogType = {
    id: number,
    name: string,
    imgSrc: string | null
};

export type MessageType = {
    id: number,
    message: string,
    likesCount: number
};

export type DialogMessageType = {
    id: number,
    message: string,
};

export type FriendType = {
    id: number,
    name: string,
    imgSrc: string | null
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}
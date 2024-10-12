export interface Category {
    id: number
    categoryName: string
    articleCount: number
}

export interface Tag {
    id: number
    tagName: string
    articleCount: number
}

export interface Article {
    id: number
    articleTitle: string
    articleCover: string
    articleContent: string
    createTime: string
    updateTime: string
    isTop: number
    isFeatured: number
    isDraft: number
    isDelete: number
    categoryId: number
    categoryName: string
    tagId: number
    tagName: string
    viewsCount: number
    commentCount: number
    likeCount: number
}

export interface Talk {
    id: number
    content: string
    createTime: string
    updateTime: string
    isDelete: number
    userId: number
    nickname: string
    avatar: string
    website: string
    commentCount: number
    likeCount: number
}

export interface Photo {
    id: number
    albumId: number
    photoName: string
    photoDesc: string
    photoUrl: string
    createTime: string
    updateTime: string
    isDelete: number
    albumName: string
}



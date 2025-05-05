
export interface Comment {
    _id: string;
    content: string;
    commentCreator: User;
    post: string;
    createdAt: string;
}

export interface User {
    _id: string;
    name: string;
    photo: string;
}

export interface PostInterface {
    _id: string;
    body: string;
    image: string;
    createdAt: string;
    user: User;
    comments: Comment[];
    id: string;
}

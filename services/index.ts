import http from "./http-connection";

const getAllPosts = (tag: string = ""
) => {
    return http.get(
        tag.length > 0 ? `/posts/?tag=${tag}` : `/posts`
    );
}
const getPost = (id: string) => {
    return http.get(`/posts/${id}`);
}

const createPost = (data: any) => {
    return http.post(`/posts`, data);
}


const getAllUsers = () => {
    return http.get(`/users`);
}

const getUserAbout = (
    email: string
) => {
    return http.get(`/about/${email}`);
}

const followUser = (id: string) => {
    return http.post(`/users/follow`, { id });
}

const getWhoToFollow = () => {
    return http.get(`/users/follow`);
}

const getSavedPosts = () => {

    return http.get(`/posts/saved`);

}

const savePostForUser = (id: string) => {
    return http.post(`/posts/saved`, { id });
}


const getNotifications = () => {
    return http.get(`/users/notifications`);
}

const likePost = (id: string) => {
    return http.post(`/posts/like`, { id });
}

const getTags = () => {
    return http.get(`/tags`);
}

const addComment = (data: any) => {
    return http.post(`/comments`, data);
}

const getComments = (postId: string) => {
    return http.get(`/comments?postId=${postId}`);
}

const getSearchSuggestions = () => {
    return http.get(`/posts/suggestions`);
}


export default {
    getAllPosts,
    getPost,
    createPost,
    getAllUsers,
    getUserAbout,
    followUser,
    getWhoToFollow,
    getSavedPosts,
    savePostForUser,
    getNotifications,
    likePost,
    getTags,
    addComment,
    getComments,
    getSearchSuggestions
}
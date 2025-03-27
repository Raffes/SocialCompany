export const API_URL = 'http://localhost:3000';

export function USER_SIGNIN(body) {
    return {
        url: API_URL + '/api/signIn',
        options: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        }
    }
}

export function USER_SIGNOUT(body) {
    return {
        url: API_URL + '/api/signOut',
        options: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        }
    }
}

export function TOKEN_VALIDATE_POST(token) {
    return {
        url: API_URL + '/jwt-auth/v1/token/validate',
        options: {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
    }
}

export function USER_GET(token) {
    return {
        url: API_URL + '/api/getUser',
        options: {
            method: 'GET',
            headers: {
                Authorization: token
            },
        }
    }
}

export function USER_POST(body) {
    return {
        url: API_URL + '/api/createUser',
        options: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        }
    }
}

export function ACCESSES_PHOTO_UPDATE(user, postId) {
    return {
        url: `${API_URL}/api/updateAccessesPost/?user=${user}&postId=${postId}`,
        options: {
            method: 'PATCH',
        }
    }
}

export function PHOTO_POST(token, formData) {
    return {
        url: API_URL + '/api/createPost',
        options: {
            method: 'POST',
            headers: {
                Authorization: token
            },
            body: formData,
        }
    }
}

export function PHOTOS_GET({total, user, lastPostId}) {
    return {
        url: `${API_URL}/api/listPostsById/?user=${user}&lastDocId=${lastPostId}&page_size=${total}`,
        options: {
            method: 'GET',
            cache:'no-store'
        }
    }
}

export function PHOTO_GET(id) {
    return {
        url: `${API_URL}/api/photo/${id}`,
        options: {
            method: 'GET',
            cache:'no-store'
        }
    }
}

export function COMMENT_POST(id, token, body) {
    return {
        url: `${API_URL}/api/comment/${id}`,
        options: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(body),
        }
    }
}

export function PHOTO_DELETE(id, token) {
    return {
        url: `${API_URL}/api/photo/${id}`,
        options: {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
    }
}

export function PASSWORD_LOST(body) {
    return {
        url: API_URL + '/api/password/lost',
        options: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        }
    }
}

export function PASSWORD_RESET(body) {
    return {
        url: API_URL + '/api/password/reset',
        options: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        }
    }
}

export function GET_STATS(token) {
    return {
        url: API_URL + '/api/stats',
        options: {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
    }
}
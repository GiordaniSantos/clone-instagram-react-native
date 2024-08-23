import { ADD_POST, ADD_COMMENT } from "../actions/actionTypes";

const initialState = {
    posts: [{
        id: Math.random(),
        nickname: 'Giordani',
        email: 'teste@gmail.com',
        image: require('../../../assets/imgs/fence.jpg'),
        comments: [{
            nickname: 'John Ray Sheldon',
            comment: 'Stunning!'
        }, {
            nickname: 'Ana Júlia',
            comment: 'Foto linda, onde foi tirada?!'
        }]
    }, {
        id: Math.random(),
        nickname: 'Francisco',
        email: 'francisco@gmail.com',
        image: require('../../../assets/imgs/bw.jpg'),
        comments: []
    }]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: state.posts.concat({
                    ...action.payload
                })
            }
        case ADD_COMMENT:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.payload.postId) {
                        const newComments = post.comments ? [...post.comments, action.payload.comment] : [action.payload.comment];
                        return { ...post, comments: newComments };
                    }
                    return post;
                })
            }
        default:
            return state
    }
}

export default reducer
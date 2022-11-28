import { GET, CREATE, UPDATE, DELETE, GET_SEARCH, START_LOADING, END_LOADING, GET_POST, COMMENT } from '../constants/actions'

export default (state = { isLoading: true, posts:[] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case END_LOADING:   
            return {
                ...state,
                isLoading: false
            };
        case GET:
            return {
                ...state, 
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages, 
                };
        case GET_POST:
            return { ...state, post: action.payload.post };
        case GET_SEARCH:
            return { ...state, posts: action.payload.data };
        case COMMENT:
            return { ...state, posts: state.posts.map((post) => {
                // return the post which has had a new comment added to it 
                if(post._id === action.payload._id){
                    return action.payload;
                }
                return post;
            }),
        };
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        default:
            return state;
    }
};

// what are reducers? they are function that accept a state and an action 
// if the action is to create, we want to do some logic and return the action or the state that has changed
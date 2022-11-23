import { GET, CREATE, UPDATE, DELETE } from '../constants/actions'

export default (posts = [], action) => {
    switch (action.type) {
        case GET:
            return action.payload;
        case CREATE:
            return [ ...posts, action.payload];
        case UPDATE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);
        default:
            return posts;
    }
};

// what are reducers? they are function that accept a state and an action 
// if the action is to create, we want to do some logic and return the action or the state that has changed
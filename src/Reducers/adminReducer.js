import { LOGIN, LOGOUT } from "../actions";
const initialState = {
    user: null,
    username: "",
    isAdmin: false,
    id: 0,
};
const reducer = (state = initialState, action) => {
    if (action.type === LOGIN) {
        const { user, username, isAdmin, id } = action.payload;
        return { ...state, user, username, isAdmin, id };
    }

    return state;
};

export default reducer;

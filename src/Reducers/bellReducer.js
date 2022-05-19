import { SEND_INFO, SEND_INFO2, DELETE_ARRAY } from "../actions";
const initialState = {
    id: 0,
    commentId: 0,
    userId: [],
};
const reducer = (state = initialState, action) => {
    if (action.type === SEND_INFO) {
        const { id } = action.payload[0];

        return { ...state, id, state: state.userId.push(id) };
    }
    if (action.type === SEND_INFO2) {
        const { id } = action.payload.data;
        return { ...state, commentId: id };
    }
    if (action.type === DELETE_ARRAY) {
        return { ...state, userId: [] };
    }

    return state;
};

export default reducer;

/* eslint-disable no-unused-vars */
const initialState = {
  userId: "",
  selectedRoom: "",
  userName: "",
  totalRooms: [],
};

export default function ChatReducer(state = initialState, action) {
  switch (action.type) {
    case "addUserId": {
      return {
        ...state,
        userId: action.payload.userId,
      };
    }
    case "addUserName": {
      return {
        ...state,
        userName: action.payload.userName,
      };
    }
    case "selectRoom": {
      return {
        ...state,
        selectedRoom: action.payload.newRoom,
      };
    }
    case "removeRoom": {
      return {
        ...state,
        selectedRoom: "",
      };
    }

    case "addRoom": {
      return {
        ...state,
        totalRooms: [...state.totalRooms, action.payload.newRoom],
      };
    }

    default:
      return state;
  }
}

export const addUserId = (userId) => {
  return { type: "addUserId", payload: { userId } };
};

export const addUserName = (userName) => {
  return { type: "addUserName", payload: { userName } };
};
export const addNewRoom = (newRoom) => {
  return { type: "addRoom", payload: { newRoom } };
};
export const selectNewRoom = (newRoom) => {
  return { type: "selectRoom", payload: { newRoom } };
};
export const removeSelectedRoom = () => {
  return { type: "removeRoom" };
};

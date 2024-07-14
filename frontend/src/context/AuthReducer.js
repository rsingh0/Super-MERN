 const AppReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_ACTION":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT_ACTION":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default AppReducer;
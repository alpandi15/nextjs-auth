export const userAuthReducer = (state, action) => {
  switch (action.type) {
    case 'IS_LOGGED':
      return {
        ...state,
        user: action?.payload?.user,
        error: {
          message: action?.payload?.errorMessage
        }
      };
    default:
      return state;
  }
};

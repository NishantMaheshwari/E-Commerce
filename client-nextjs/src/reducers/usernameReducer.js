

export const usernameReducer = (state, action) => {
    switch (action.type) {
      case 'LOGOUT':
        localStorage.clear();
        return null;
      case 'LOGIN' :
        return action.payload;
      default:
        return state;
    }
};
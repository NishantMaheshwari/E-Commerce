
export const searchReducer = (state, action) => {
    switch (action.type) {
      case 'SET_SEARCH_QUERY':
        return action.payload;
      default:
        return state;
    }
  };
  
  export const sortReducer = (state, action) => {
    switch (action.type) {
      case 'SET_SORT_QUERY':
        return action.payload;
      default:
        return state;
    }
  };
  
  export const categoryReducer = (state, action) => {
    
    switch (action.type) {
      case 'SET_CATEGORY':
        return action.payload;
      default:
        return state;
    }
  };
  
  export const ratingReducer = (state, action) => {
    switch (action.type) {
      case 'SET_RATING':
        return action.payload;
      default:
        return state;
    }
  };
  
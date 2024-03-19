const TOGGLE_THEME = 'TOGGLE_THEME'

const themeReducer = (theme, action) => {
    
    switch(action.type) {
        case TOGGLE_THEME:
            return {
                ...theme,
                darkMode: !theme.darkMode
            };
        default:
            return theme;
    }
};

export  { themeReducer, TOGGLE_THEME };

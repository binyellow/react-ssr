export const initializeSession = ( ) => ( {
  type: "INITIALIZE_SESSION",
} );

export const sessionReducer = ( state = false, action ) => {
  switch ( action.type ) {
      case "INITIALIZE_SESSION":
          return true;
      default: return state;
  }
};
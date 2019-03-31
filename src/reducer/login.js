export const initializeUserMsg = (res) => ({
  type: 'UPDATE_SESSION',
  payload: res
});

export const sessionReducer = ( state = {}, action ) => {
  switch ( action.type ) {
      case "INITIALIZE_SESSION":
          return {};
      case "UPDATE_SESSION":
        console.log(action);
        return action.payload || {};
      default: return state;
  }
};
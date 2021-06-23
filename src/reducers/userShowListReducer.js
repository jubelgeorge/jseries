let initialState = [];

// load cart items from local storage
if (typeof window !== "undefined") {
  if (localStorage.getItem('userShowList')) {
    initialState = JSON.parse(localStorage.getItem('userShowList'));
  } else {
    initialState = [];
  }
}


export const userShowListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_LIST":
      return action.payload;
    default:
      return state;
  }
};
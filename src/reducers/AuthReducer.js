const INITIAL_STATE = {
  email: '',
  password: '',
  error: '',
  user: null,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    default:
      return state;
  }
};

import { loop, Cmd } from 'redux-loop';

/*
 * The users reducer will always return an array of users no matter what
 * You need to return something, so if there are no users then just return an empty array
 * */

function fetchUsers() {
  //return fetch('http://rest.learncode.academy/api/wstern/users');
  //return fetch('https://generator.swagger.io/api/gen/clients').then(response =>
  //  response.json()
  //);
}

function usersFetchSuccessfulAction(users) {
  debugger;
  let index = -1;
  return {
    type: 'USERS_FETCH_SUCCESSFUL',
    users: users.map(user => {
      index = index + 1;
      return {
        id: index + '',
        first: user,
        last: user,
        age: 20,
        description: user,
        thumbnail: ''
      };
    })
  };
}

function usersFetchFailedAction(error) {
  debugger;
  return {
    type: 'USERS_FETCH_ERROR',
    error
  };
}

const initialState = {
  initStarted: false,
  users: [],
  error: null
};

export default function(state = initialState, action) {
  console.log(state, action);
  switch (action.type) {
    case 'USERS_LOADED':
      return action.payload;
    case 'USER_DELETED':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload.id)
      };
    case 'INIT':
      return loop(
        { ...state, initStarted: true },
        Cmd.run(fetchUsers, {
          successActionCreator: usersFetchSuccessfulAction,
          failActionCreator: usersFetchFailedAction,
          args: []
        })
      );
    case 'USERS_FETCH_SUCCESSFUL':
      return { ...state, users: action.users };

    case 'USERS_FETCH_FAILED':
      return { ...state, errors: action.error };
  }
  return state;
}

import { loop, Cmd } from 'redux-loop';

const defaultState = {
  selected: 0,
  guests: {},
  guestsByKey: {},
  possibleGuests: [],
  listGuests: [],
  filter: '',
  currentPartyList: ''
};

function cropValue(value, lower, upper) {
  return Math.max(Math.min(value, upper), lower);
}

export default function(state = defaultState, action) {
  console.log(state, action);
  switch (action.type) {
    case '@@reactReduxFirebase/SET':
      if (action.path == 'guests') {
        return {
          ...state,
          guests: action.data
            ? Object.keys(action.data).map(key => {
              return { ...action.data[key], key: key };
            })
            : [],
          guestsByKey: action.data
        };
      } else if (action.path == 'currentPartyList' + state.currentPartyList) {
        return {
          ...state,
          listGuests: Object.values(action.data.guests)
        };
      }
      return state;
    case 'SET_CURRENT_PARTY_LIST':
      return {
        ...state,
        currentPartyList: action.payload
      };
    case 'SEARCH_CHANGED':
      return loop(
        {
          ...state,
          filter: action.payload,
          possibleGuests: action.payload.length
            ? state.guests
              .filter(
                guest =>
                  guest.name
                    .toLowerCase()
                    .search(action.payload.toLowerCase()) !== -1
              )
              .concat({
                key: -1,
                name: '...Add new...',
                guestName: action.payload
              })
            : []
        },
        Cmd.action({ type: 'SEARCH_INDEX_CHANGED', payload: 0 })
      );
    case 'SEARCH_INDEX_CHANGED':
      return {
        ...state,
        selected: cropValue(
          state.selected + action.payload,
          0,
          state.possibleGuests.length - 1
        )
      };
  }
  return state;
}

const onChangeCallback = value => {
  return {
    type: 'SEARCH_CHANGED',
    payload: value
  };
};

const onIndexChangeCallback = value => {
  return {
    type: 'SEARCH_INDEX_CHANGED',
    payload: value
  };
};

const onSelectCallback = guest => {
  return {
    type: 'SEARCH_SELECTED',
    payload: guest
  };
};

const setCurrentPartyList = id => {
  return {
    type: 'SET_CURRENT_PARTY_LIST',
    payload: id
  };
};

export {
  onChangeCallback,
  onIndexChangeCallback,
  onSelectCallback,
  setCurrentPartyList
};

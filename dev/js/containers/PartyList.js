import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'reactstrap';
import GuestList from '../components/GuestList';
import SearchInput from '../components/SearchInput';
import {
  onChangeCallback,
  onIndexChangeCallback,
  setCurrentPartyList
} from '../actions/smart-search-actions';

class PartyList extends Component {
  componentWillMount() {
    const { firebase } = this.context.store;
    const partyListId = this.props.match.params.id;
    firebase.watchEvent(
      'value',
      'party-lists/' + partyListId,
      'currentPartyList' + partyListId
    );
    firebase.watchEvent('value', 'guests');
    this.props.setCurrentPartyList(partyListId);
  }

  componentWillUnmount() {
    const { firebase } = this.context.store;
    const partyListId = this.props.match.params.id;
    firebase.unWatchEvent(
      'value',
      'party-lists/' + partyListId,
      'currentPartyList' + partyListId
    );
    firebase.unWatchEvent('value', 'guests');
  }

  onSelectCallback() {
    const { partyLists } = this.context.store.getState();
    const guest = partyLists.possibleGuests[partyLists.selected];
    if (guest.key == -1) {
      const that = this;
      guest.createdAt = new Date().toISOString();
      this.createGuest(guest).then(() => {
        const updatedGuests = that.context.store.getState().partyLists.guests;
        const newGuest = updatedGuests.find(
          g => g.createdAt === guest.createdAt
        );
        debugger;
        if (newGuest) {
          this.addGuest(newGuest);
        }
      });
    } else {
      this.addGuest(guest);
    }
  }

  addGuest(guest) {
    const { firebase } = this.context.store;
    const partyListId = this.props.match.params.id;
    firebase
      .database()
      .ref()
      .child('party-lists/' + partyListId + '/guests')
      .push({ id: guest.key }, error => {
        if (error) console.log(error);
      });
  }

  createGuest(guest) {
    const { firebase } = this.context.store;
    const newGuest = { name: guest.guestName, createdAt: guest.createdAt };
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref()
        .child('guests')
        .push(newGuest, error => {
          if (error) {
            console.error(error);
            reject();
          } else {
            resolve();
          }
        });
    });
  }

  render() {
    if (!this.props.partyList) {
      return <div />;
    }

    let listGuests = this.props.listGuests.map(guestId => {
      const guest = this.props.guestsByKey[guestId.id];
      return guest ? (
        <ListGroupItem key={guestId.id}>{guest.name}</ListGroupItem>
      ) : null;
    });

    if (listGuests.length > 0) {
      listGuests = <ListGroup>{listGuests}</ListGroup>;
    }

    return (
      <div className="party-list-grid">
        <div className="header-grid-item">
          <h3>
            PartyList <small>{this.props.partyList.name}</small>
          </h3>
          <SearchInput
            onChange={this.props.onChangeCallback}
            onIndexChange={this.props.onIndexChangeCallback}
            onSelect={this.onSelectCallback.bind(this)}
          />
        </div>
        <div className="party-list-guest-list">{listGuests}</div>
        <div className="smart-guest-list-grid-item">
          <p>Smart Guest List</p>
          <GuestList
            guests={this.props.possibleGuests}
            selected={this.props.selected}
          />
        </div>
        <div className="counter">
          <h4>
            Total count:{' '}
            {this.props.listGuests ? this.props.listGuests.length : 0}
          </h4>
        </div>
      </div>
    );
  }
}

PartyList.contextTypes = {
  store: PropTypes.object.isRequired
};

PartyList.propTypes = {
  match: PropTypes.object,
  partyList: PropTypes.object,
  guests: PropTypes.object,
  possibleGuests: PropTypes.array,
  listGuests: PropTypes.array,
  guestsByKey: PropTypes.object,
  selected: PropTypes.number,
  addGuest: PropTypes.func,
  onChangeCallback: PropTypes.func,
  onIndexChangeCallback: PropTypes.func,
  onSelectCallback: PropTypes.func,
  setCurrentPartyList: PropTypes.func
};

function mapStateToProps(state, props) {
  const partyListId = props.match.params.id;
  return {
    partyList: state.firebase.data['currentPartyList' + partyListId],
    guests: state.partyLists.guests,
    possibleGuests: state.partyLists.possibleGuests,
    listGuests: state.partyLists.listGuests,
    guestsByKey: state.partyLists.guestsByKey,
    selected: state.partyLists.selected
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      onChangeCallback: onChangeCallback,
      onIndexChangeCallback: onIndexChangeCallback,
      setCurrentPartyList: setCurrentPartyList
    },
    dispatch
  );
}

export default connect(mapStateToProps, matchDispatchToProps)(PartyList);

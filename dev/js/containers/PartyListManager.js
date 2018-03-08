import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';
//import firebase from 'firebase';

class PartyListManager extends Component {
  render() {
    let partyLists = undefined;
    if (this.props.partyLists) {
      partyLists = Object.keys(this.props.partyLists).map(key => {
        const partyList = this.props.partyLists[key];
        return (
          <ListGroupItem key={key}>
            <Link to={'/party-list/' + key}>PartyList: {partyList.name}</Link>
          </ListGroupItem>
        );
      });

      partyLists = <ListGroup>{partyLists} </ListGroup>;
    }
    return (
      <div>
        <h3>PartyListManager</h3>
        {partyLists}
      </div>
    );
  }
}

// onClick={() => firebase.push('party-lists', { id: 1, name: 'test' })}

PartyListManager.propTypes = {
  partyLists: PropTypes.object
};

function mapStateToProps(state) {
  return {
    partyLists: state.firebase.data['party-lists']
  };
}

export default compose(
  firebaseConnect(['party-lists']),
  connect(mapStateToProps)
)(PartyListManager);

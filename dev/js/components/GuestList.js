import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';

class GuestList extends Component {
  render() {
    if (!this.props.guests || Object.keys(this.props.guests).length == 0) {
      return <div />;
    }
    const guests = Object.keys(this.props.guests).map((key, index) => {
      const guest = this.props.guests[key];
      return (
        <ListGroupItem
          key={key}
          className={index == this.props.selected ? 'selected' : null}
        >
          {guest.name}
        </ListGroupItem>
      );
    });
    return <ListGroup>{guests}</ListGroup>;
  }
}

GuestList.propTypes = {
  guests: PropTypes.object,
  selected: PropTypes.number
};

export default GuestList;

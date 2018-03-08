import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchInput extends Component {
  bindInput(input) {
    this.currentGuestInput = input;
    this.currentGuestValue = '';
  }

  handleKeyPress(event) {
    switch (event.key) {
      case 'ArrowDown':
        this.props.onIndexChange(1);
        break;
      case 'ArrowUp':
        this.props.onIndexChange(-1);
        break;
      case 'Enter':
        this.props.onSelect();
        break;
      default:
        if (this.currentGuestValue !== this.currentGuestInput.value) {
          this.currentGuestValue = this.currentGuestInput.value;
          this.props.onChange(this.currentGuestValue);
        }
    }
  }

  render() {
    return (
      <input
        onKeyUp={this.handleKeyPress.bind(this)}
        ref={this.bindInput.bind(this)}
      />
    );
  }
}

SearchInput.propTypes = {
  onChange: PropTypes.func,
  onIndexChange: PropTypes.func,
  onSelect: PropTypes.func
};

export default SearchInput;

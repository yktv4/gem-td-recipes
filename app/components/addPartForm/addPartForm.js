import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

const KEY_CODE_ENTER = 13;

export default class AddPartForm extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired
  };

  state = {
    inputValue: ''
  };

  input = null;

  componentDidMount() {
    this.input.focus();
  }

  onAdd(e) {
    e && e.preventDefault();
    this.props.onAdd(this.state.inputValue);
    this.setState({inputValue: ''}, () => this.input.focus());
  }

  onChange(e) {
    this.setState({inputValue: e.target.value});
  }

  onInputKeyDown(e) {
    e.keyCode === KEY_CODE_ENTER && this.onAdd(e);
  }

  render() {
    const {inputValue} = this.state;

    return (
      <div className="form-group">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="enter tower you have"
            value={inputValue}
            onChange={::this.onChange}
            onKeyDown={::this.onInputKeyDown}
            ref={el => this.input = findDOMNode(el)}
          />
          <div className="input-group-btn">
            <button className="btn btn-primary" onClick={::this.onAdd}>Add</button>
          </div>
        </div>
      </div>
    )
  }
};
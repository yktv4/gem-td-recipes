import React, {Component, PropTypes} from 'react';

export default class AddPartForm extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired
  };

  state = {
    inputValue: ''
  };

  onAdd(e) {
    e && e.preventDefault();
    this.setState({inputValue: ''});
    this.props.onAdd(this.state.inputValue);
  }

  onChange(e) {
    this.setState({inputValue: e.target.value});
  }

  render() {
    const {inputValue} = this.state;

    return (
      <div>
        <input type="text" placeholder="Input tower" value={inputValue} onChange={::this.onChange}/>
        <button onClick={::this.onAdd}>Add</button>
      </div>
    )
  }
};
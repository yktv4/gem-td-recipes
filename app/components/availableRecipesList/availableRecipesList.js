import React, {Component, PropTypes} from 'react';
import styles from './styles.scss';

export default class AvailableRecipesList extends Component {
  static propTypes = {
    availableRecipes: PropTypes.array.isRequired
  };

  renderSingleRow({name, partsLeft, partsHave, parts}) {
    return (
      <tr key={name}>
        <td>{name}</td>
        <td>{Math.round(partsHave.length / parts.length * 100)}%</td>
        <td>{partsLeft.join(' + ')}</td>
        <td>{partsHave.join(' + ')}</td>
      </tr>
    )
  }

  render() {
    return (
      <table className={`table table-sm ${styles.table}`}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Progress</th>
            <th>Left</th>
            <th>Have</th>
          </tr>
        </thead>
        <tbody>
          {this.props.availableRecipes.map(::this.renderSingleRow)}
        </tbody>
      </table>
    );
  }
}
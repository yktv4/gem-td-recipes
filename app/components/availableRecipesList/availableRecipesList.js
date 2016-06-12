import React, {Component, PropTypes} from 'react';
import {joinComponents} from 'utils/react';
import styles from './styles.scss';

const Part = ({name, onClick}) => <a href="javascript:void(0)" onClick={onClick} className={styles.partLeft}>{name}</a>;

export default class AvailableRecipesList extends Component {
  static propTypes = {
    availableRecipes: PropTypes.array.isRequired,
    onAddPart: PropTypes.func.isRequired,
    onRemovePart: PropTypes.func.isRequired
  };

  renderPartLeft(name) {
    return <Part name={name} onClick={e => this.props.onAddPart(name)}/>;
  }

  renderPartHave(name) {
    return <Part name={name} onClick={e => this.props.onRemovePart(name)}/>;
  }

  renderSingleRow({name, partsLeft, partsHave, percentDone}) {
    return (
      <tr key={name}>
        <td>{name}</td>
        <td>{percentDone}%</td>
        <td>{joinComponents(partsLeft.map(::this.renderPartLeft), ' + ')}</td>
        <td>{joinComponents(partsHave.map(::this.renderPartHave), ' + ')}</td>
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
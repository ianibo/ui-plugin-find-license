import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from '@folio/stripes/components';
import className from 'classnames';

import css from './LicenseSearch.css';
import licenseSearchModal from './LicenseSearchModal';

export default class LicenseSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  getStyle() {
    const { marginBottom0, marginTop0 } = this.props;
    return className(
      css.searchControl,
      { [css.marginBottom0]: marginBottom0 },
      { [css.marginTop0]: marginTop0 },
    );
  }

  openModal() {
    this.setState({
      openModal: true,
    });
  }

  closeModal() {
    this.setState({
      openModal: false,
    });
  }

  render() {
    return (
      <div className={this.getStyle()}>
        <Button
          id="clickable-plugin-find-license"
          key="searchButton"
          buttonStyle={this.props.searchButtonStyle}
          onClick={this.openModal}
          title="Find License"
          tabIndex="-1"
        >
          {this.props.searchLabel ? this.props.searchLabel : <Icon icon="search" color="#fff" />}
        </Button>
        <LicenseSearchModal
          openWhen={this.state.openModal}
          closeCB={this.closeModal}
          {...this.props}
        />
      </div>
    );
  }
}

LicenseSearch.defaultProps = {
  searchButtonStyle: 'primary noRightRadius',
};

LicenseSearch.propTypes = {
  searchLabel: PropTypes.string,
  searchButtonStyle: PropTypes.string,
  marginBottom0: PropTypes.bool,
  marginTop0: PropTypes.bool,
};

import React from 'react';
import PropTypes from 'prop-types';
import Licenses from '@folio/licenses/src/Main';
import { Modal } from '@folio/stripes/components';

import css from './LicenseSearch.css';

export default class LicenseSearchModal extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }).isRequired,
    selectLicense: PropTypes.func.isRequired,
    closeCB: PropTypes.func.isRequired,
    onCloseModal: PropTypes.func,
    openWhen: PropTypes.bool,
    dataKey: PropTypes.string,
  }

  constructor(props) {
    super(props);

    const dataKey = props.dataKey;
    this.connectedApp = props.stripes.connect(Licenses, { dataKey });

    this.state = {
      error: null,
    };

    this.closeModal = this.closeModal.bind(this);
    this.passLicenseOut = this.passLicenseOut.bind(this);
  }

  closeModal() {
    this.props.closeCB();
    this.setState({
      error: null,
    });
  }

  passLicenseOut(e, license) {
    this.props.selectLicense(license);

    if (!license.error) {
      this.closeModal();
    } else {
      this.setState({
        error: license.error,
      });
    }
  }

  render() {
    return (
      <Modal onClose={this.closeModal} size="large" open={this.props.openWhen} label="Select License" dismissible>
        <div className={css.licenseSearchModal}>
          {this.state.error ? <div className={css.LicenseError}>{this.state.error}</div> : null}
          <this.connectedApp {...this.props} onSelectRow={this.passLicenseOut} onComponentWillUnmount={this.props.onCloseModal} showSingleResult={false} browseOnly />
        </div>
      </Modal>
    );
  }
}

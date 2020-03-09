import React from 'react';
import { generalMessages } from '../../../constants/messages';
import { importJsonFromFile } from '../../utils/export';

class ImportProgressButton extends React.Component {
    handleChange = (e) => {
      const { onImport } = this.props;

      onImport(importJsonFromFile(this.getSelectedFiles(e.target)));
    }

    getSelectedFiles(input) {
      const { multiple } = this.props;

      if (multiple && input.files) {
        const files = [].slice.call(input.files);

        return files.map(file => file.name).join(', ');
      }

      if (input.value.indexOf('fakepath') !== -1) {
        const parts = input.value.split('\\');

        return parts[parts.length - 1];
      }

      return input.value;
    }

    render() {
      return (
        <div
          className="custom-file"
          style={{
            marginTop: '8px',
            cursor: 'pointer',
          }}
        >
          <input
            type="file"
            className="custom-file-input"
            id="fileInput"
            style={{ zIndex: 0, cursor: 'pointer' }}
            onChange={this.handleChange}
            accept=".json"
          />
          <label
            className="btn btn-secondary btn-block btn-lg"
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              zIndex: 1,
              fontWeight: 400,
              lineHeight: 1.5,
            }}
            htmlFor="fileInput"
          >
            {generalMessages.importProgress}
          </label>
        </div>
      );
    }
}

export default ImportProgressButton;

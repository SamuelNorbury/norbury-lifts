import React from 'react';
import { generalMessages } from '../../../constants/messages';
import { readJsonFromFile } from '../../utils/export';

class ImportProgressButton extends React.Component {

    handleChangeFile = (e) => {
        const { onImport } = this.props;
        readJsonFromFile(e.target.files[0])
            .then((json) => {
                onImport(json);
            });
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
            onChange={this.handleChangeFile}
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

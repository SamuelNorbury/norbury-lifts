export function exportJsonToFile(json) {
  const str = JSON.stringify(json);

  // Save the file contents as a DataURI
  const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(str)}`;

  // Write it as the href for the link
  const linkElement = window.document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', 'progress.json');
  linkElement.click();
}

export function readJsonFromFile(inputFile) {
  const temporaryFileReader = new FileReader();

  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException('Problem parsing input file.'));
    };

    temporaryFileReader.onload = (e) => {
        try {
            const json = JSON.parse(temporaryFileReader.result || e.target.result);
            resolve(json);
        } catch (e) {
            temporaryFileReader.abort();
            reject(new DOMException('Problem parsing input file.'));
        }
    };

    temporaryFileReader.readAsText(inputFile);
  });
}

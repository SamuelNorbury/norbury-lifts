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

export function importJsonFromFile(file) {
    console.log(file);
}

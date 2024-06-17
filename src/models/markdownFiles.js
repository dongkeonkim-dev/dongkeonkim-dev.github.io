// src/models/markdownFiles.js
const importAll = (r) => r.keys().map(r);
const markdownFiles = importAll(require.context('../posts', false, /\.md$/));

export default markdownFiles;

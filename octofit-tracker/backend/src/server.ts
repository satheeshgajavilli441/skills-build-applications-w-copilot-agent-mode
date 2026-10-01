import app from './app.js';
import './config/database.js';

const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-${port}.app.github.dev`
  : `http://localhost:${port}`;

app.listen(port, () => {
  console.log(`OctoFit API listening at ${baseUrl}`);
});
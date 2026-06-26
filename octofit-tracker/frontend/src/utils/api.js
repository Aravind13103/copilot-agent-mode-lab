export function getApiUrl(component) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/${component}/`;
  }

  return `http://localhost:8000/api/${component}/`;
}

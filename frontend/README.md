### Troubleshooting

If you encounter an error related to OpenSSL when starting the React application, you can resolve it by setting the following environment variable:
For Windows Command Prompt, use:
```bash
set NODE_OPTIONS=--openssl-legacy-provider

For Windows PowerShell, use:
```bash
$env:NODE_OPTIONS="--openssl-legacy-provider"


This setting allows compatibility with newer versions of Node.js and resolves issues related to digital envelope routines.
export default (body, wifis) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
    </head>
    <body>
      <div id="app">${body}</div>
      <script>window.wifis = ${JSON.stringify(wifis)}</script>
      <script src="static/bundle.js"></script>
    </body>
  </html>
`;

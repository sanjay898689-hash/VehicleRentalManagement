const ngrok = require('@ngrok/ngrok');
(async () => {
  try {
    console.log('exports', Object.keys(ngrok));
    console.log('forward type', typeof ngrok.forward);
    const listener = await ngrok.forward({ addr: 5000 });
    console.log('url', listener.url());
  } catch (err) {
    console.error('ERROR', err && err.message ? err.message : err);
    if (err && err.stack) console.error(err.stack);
    process.exit(1);
  }
})();

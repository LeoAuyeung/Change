const plaid = require('plaid');
const router = require('express').Router();

module.exports = router;

router.get('/client', async (req, res) => {
  const { client_id, secret, public, plaid_env } = process.env;

  try {
    let patientClient
    if (plaid_env) {
      patientClient = new plaid.Client(client_id, secret, public_key, plaid_env, {
        timeout: 10 * 60 * 1000, // 30 minutes
        agent: 'Patient Agent'
      });
    }

    res.send(patientClient);
  } catch (err) {
    console.error(err);
  }
})
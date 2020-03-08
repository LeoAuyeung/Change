const express = require('express');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/bank', require('./plaid'));

const PORT = process.env.PORT || 5000;

app.get('/charities', async function(req, res) {
  try {
    const charities = await axios.get(
      `https://api.data.charitynavigator.org/v2/Organizations?app_id=3f8b1f09&app_key=156d538582406ecb12adc790348065e7&categoryID=4&state=NY`
    );
    res.send(charities);
  } catch (err) {
    res.sendStatus(501);
  }
});

app.listen(PORT, () => console.log(`listening on ${PORT}`))
const axios = require('axios');

// API URL
const apiUrl = 'http://qa-gb.api.dynamatix.com:3100/api/applications/getApplicationById/67339ae56d5231c1a2c63639';

// Checklist rules
const rules = [
  {
    rule: 'Valuation Fee Paid',
    condition: (data) => data.isValuationFeePaid === true,
  },
  {
    rule: 'UK Resident',
    condition: (data) => data.isUkResident === true,
  },
  {
    rule: 'Risk Rating Medium',
    condition: (data) => data.riskRating === 'Medium',
  },
  {
    rule: 'LTV Below 60%',
    condition: (data) => {
      const ltv = (data.loanRequired / data.purchasePrice) * 100;
      return ltv < 60;
    },
  },
];

// Fetch application data from API
async function fetchData() {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw new Error('Failed to fetch application data');
  }
}

// Evaluate checklist rules
async function evaluateChecklist(req, res) {
  try {
    const data = await fetchData();

    const results = rules.map((rule) => ({
      rule: rule.rule,
      status: rule.condition(data) ? 'Passed' : 'Failed',
    }));

    res.render('dashboard', { results });
  } catch (error) {
    res.status(500).send('Error evaluating checklist: ' + error.message);
  }
}

module.exports = { evaluateChecklist };

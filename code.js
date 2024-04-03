const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 8008;

function generateRandomNumbers(quantity) {
  const numbers = [];
  for (let i = 0; i < quantity; i++) {
    numbers.push(Math.floor(Math.random() * 100));
  }
  return numbers;
}

function filterNumbers(numbers, type) {
  if (type === 'odd') {
    return numbers.filter(num => num % 2 !== 0);
  } else if (type === 'even') {
    return numbers.filter(num => num % 2 === 0);
  }
  return numbers;
}

app.get('/test', async (req, res) => {
  try {
    let urls = req.query.url;
    const type = req.query.type;

    if (!urls) {
      urls = ["http://20.244.56.144/test/primes", "http://20.244.56.144/test/fibo", "http://20.244.56.144/test/odd", "http://20.244.56.144/test/rand"];
    } else if (!Array.isArray(urls)) {
      urls = [urls];
    }

    const numbers = [];

    const requests = urls.map(async (url) => {
      try {
        const response = await axios.get(url);
        const { numbers: urlNumbers } = response.data;
        numbers.push(...urlNumbers);
      } catch (error) {
        console.error(`Error retrieving numbers from ${url}: ${error.message}`);
      }
    });

    await Promise.all(requests);

    let mergedNumbers = Array.from(new Set(numbers)).sort((a, b) => a - b);
    if (type) {
      if (type === 'random') {
        mergedNumbers = generateRandomNumbers(10);
      } else {
        mergedNumbers = filterNumbers(mergedNumbers, type);
      }
    }

    res.json({ numbers: mergedNumbers });
  } catch (error) {
    console.error(`Error processing request: ${error.message}`);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

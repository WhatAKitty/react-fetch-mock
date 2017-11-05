# react-fetch-mock
[![Build Status](https://travis-ci.org/WhatAKitty/react-fetch-mock.svg?branch=master)](https://travis-ci.org/WhatAKitty/react-fetch-mock)
[![Known Vulnerabilities](https://snyk.io/test/npm/react-fetch-mock/badge.svg)](https://snyk.io/test/npm/react-fetch-mock)

fetch mock for react

[React-Native Version](https://github.com/WhatAKitty/react-native-fetch-mock)

## Why FetchMock ?
No fetch mock could be used easily for react.  
So, I create one by myself.

## Roadmap
- [x] Combined with Mock.js
- [ ] Proxy for other api server
- [ ] Support RAP system

## Usage

Import lib
1. using npm/yarn
```
yarn add react-fetch-mock --dev
npm install react-fetch-mock --save-dev
```

__ mocks__/index.js
```
export default {
  '/api/path': ({ method, url, params, urlparams, headers }) => {
    const all = Mock.mock({
      'list|2': [{
        'id|+1': 1,
        'name': '@first @last',
        'age|18-54': 1,
      }]
    }).list;
    return all;   // default status is 200
  },
  '/api/path/{id}': ({ method, url, params, urlparams, headers }) => {
    const all = Mock.mock({
      'list|2': [{
        'id|+1': 1,
        'name': '@first @last',
        'age|18-54': 1,
        'urlid': urlparams.id,
      }]
    }).list;
    return all;
  },
  'POST /api/path': ({ method, url, params, urlparams, headers }) => {
    return {
      status: 201,
    };
  },
  'PUT /api/path/${id}': ({ method, url, params, urlparams, headers }) => {
    return {
      status: 204,
      id: urlparams.id,
    };
  },
}
```
index.js
```
import FetchMock from 'react-fetch-mock';

if (__dev__) {
  // attention: mocks file should be under `src/`
  global.fetch = new FetchMock(require('path/to/mocks/directory')).fetch;
}

// if __dev__ is true, it will back the data you defined in mock directory
fetch('/api/path', options);
fetch('/api/path', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John',
  }),
});
fetch('/api/path/123', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John2',
  }),
});
```

## Example Runing

```
git clone git@github.com:WhatAKitty/react-fetch-mock.git
cd react-fetch-mock/example/basic
yarn install
yarn start
```

## LICENSE

MIT

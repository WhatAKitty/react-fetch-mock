'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isNull = function isNull(obj) {
  if ('undefined' === typeof obj || obj === null) {
    return true;
  }

  return false;
};

var removeProctol = function removeProctol(url) {
  var index = -1;
  if ((index = url.indexOf('://')) > -1) {
    // contains proctol
    return url.substring(index);
  }
  return url;
};

var parseParamStr = function parseParamStr(paramStr, isGet) {
  var params = {};
  var paramPairs = paramStr.split('&');
  for (var i = 0; i < paramPairs.length; i++) {
    var paramPair = paramPairs[i];
    if (paramPair.indexOf('=') === -1) {
      continue;
    }
    var paramPairArray = paramPair.split('=');

    var paramValue = isGet ? decodeURI(paramPairArray[1]) : paramPairArray[1];
    params[paramPairArray[0]] = paramPairArray.length === 2 ? paramValue : null;
  }
  return params;
};

var parseBody = function parseBody(body) {
  if ('object' === (typeof body === 'undefined' ? 'undefined' : _typeof(body))) {
    return body;
  }
  try {
    return JSON.parse(body);
  } catch (e) {
    return parseParamStr(body);
  }
};

var parseUrl = function parseUrl(url) {
  var index = url.indexOf('?');
  var items = index > -1 ? url.split('?') : [url];
  if (items.length === 1) {
    return {
      url: items[0],
      params: {}
    };
  }

  return {
    url: items[0],
    params: parseParamStr(items[1], true)
  };
};

var parseRequest = function parseRequest(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var urlObj = parseUrl(url);
  var data = parseBody(options.body || {});
  return {
    method: options.method || 'GET',
    url: urlObj.url,
    headers: options.headers,
    params: Object.assign({}, urlObj.params, data)
  };
};

var prueUrl = function prueUrl(url) {
  var index = url.indexOf('?');
  var result = index > -1 ? url.substring(0, index) : url;
  return result;
};

var matchUrl = function matchUrl(sourceUrl, targetUrl) {
  if (sourceUrl === targetUrl) {
    return {
      result: true,
      params: {}
    };
  }
  var sourceUrlWithoutProctol = removeProctol(sourceUrl);
  var targetUrlWithoutProctol = removeProctol(targetUrl);
  var sourceUrlSplits = sourceUrlWithoutProctol.split('/');
  var targetUrlSplits = targetUrlWithoutProctol.split('/');

  if (sourceUrlSplits.length !== targetUrlSplits.length) {
    return {
      result: false
    };
  }

  var params = {};
  for (var i = 0; i < sourceUrlSplits.length; i++) {
    var sourceUrlSplit = sourceUrlSplits[i];
    var targetUrlSplit = targetUrlSplits[i];
    if (sourceUrlSplit === targetUrlSplit) {
      continue;
    }

    if (sourceUrlSplit.startsWith('{') && sourceUrlSplit.endsWith('}')) {
      if (sourceUrlSplit.replace(/[^{]/g, '').length > 1 || sourceUrlSplit.replace(/[^}]/g, '').length > 1) {
        return {
          result: false
        };
      }
      // contains url parameter
      params[sourceUrlSplit.substring(1, sourceUrlSplit.length - 1)] = targetUrlSplit;
      continue;
    }
    return {
      result: false
    };
  }

  return {
    result: true,
    params: params
  };
};

exports.isNull = isNull;
exports.prueUrl = prueUrl;
exports.parseUrl = parseUrl;
exports.parseRequest = parseRequest;
exports.matchUrl = matchUrl;
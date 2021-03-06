"bundle";
System.registerDynamic("github:systemjs/plugin-text@0.0.7/text", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  exports.translate = function(load) {
    if (System.transpiler === false || true) {
      load.metadata.format = 'amd';
      return 'def' + 'ine(function() {\nreturn ' + JSON.stringify(load.source) + ';\n});';
    }
    load.metadata.format = 'esm';
    return 'export default ' + JSON.stringify(load.source) + ';';
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("github:systemjs/plugin-text@0.0.7", ["github:systemjs/plugin-text@0.0.7/text"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('github:systemjs/plugin-text@0.0.7/text');
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:numeral@1.5.3/numeral", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  (function() {
    var numeral,
        VERSION = '1.5.3',
        languages = {},
        currentLanguage = 'en',
        zeroFormat = null,
        defaultFormat = '0,0',
        hasModule = (typeof module !== 'undefined' && module.exports);
    function Numeral(number) {
      this._value = number;
    }
    function toFixed(value, precision, roundingFunction, optionals) {
      var power = Math.pow(10, precision),
          optionalsRegExp,
          output;
      output = (roundingFunction(value * power) / power).toFixed(precision);
      if (optionals) {
        optionalsRegExp = new RegExp('0{1,' + optionals + '}$');
        output = output.replace(optionalsRegExp, '');
      }
      return output;
    }
    function formatNumeral(n, format, roundingFunction) {
      var output;
      if (format.indexOf('$') > -1) {
        output = formatCurrency(n, format, roundingFunction);
      } else if (format.indexOf('%') > -1) {
        output = formatPercentage(n, format, roundingFunction);
      } else if (format.indexOf(':') > -1) {
        output = formatTime(n, format);
      } else {
        output = formatNumber(n._value, format, roundingFunction);
      }
      return output;
    }
    function unformatNumeral(n, string) {
      var stringOriginal = string,
          thousandRegExp,
          millionRegExp,
          billionRegExp,
          trillionRegExp,
          suffixes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          bytesMultiplier = false,
          power;
      if (string.indexOf(':') > -1) {
        n._value = unformatTime(string);
      } else {
        if (string === zeroFormat) {
          n._value = 0;
        } else {
          if (languages[currentLanguage].delimiters.decimal !== '.') {
            string = string.replace(/\./g, '').replace(languages[currentLanguage].delimiters.decimal, '.');
          }
          thousandRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.thousand + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
          millionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.million + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
          billionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.billion + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
          trillionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.trillion + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
          for (power = 0; power <= suffixes.length; power++) {
            bytesMultiplier = (string.indexOf(suffixes[power]) > -1) ? Math.pow(1024, power + 1) : false;
            if (bytesMultiplier) {
              break;
            }
          }
          n._value = ((bytesMultiplier) ? bytesMultiplier : 1) * ((stringOriginal.match(thousandRegExp)) ? Math.pow(10, 3) : 1) * ((stringOriginal.match(millionRegExp)) ? Math.pow(10, 6) : 1) * ((stringOriginal.match(billionRegExp)) ? Math.pow(10, 9) : 1) * ((stringOriginal.match(trillionRegExp)) ? Math.pow(10, 12) : 1) * ((string.indexOf('%') > -1) ? 0.01 : 1) * (((string.split('-').length + Math.min(string.split('(').length - 1, string.split(')').length - 1)) % 2) ? 1 : -1) * Number(string.replace(/[^0-9\.]+/g, ''));
          n._value = (bytesMultiplier) ? Math.ceil(n._value) : n._value;
        }
      }
      return n._value;
    }
    function formatCurrency(n, format, roundingFunction) {
      var symbolIndex = format.indexOf('$'),
          openParenIndex = format.indexOf('('),
          minusSignIndex = format.indexOf('-'),
          space = '',
          spliceIndex,
          output;
      if (format.indexOf(' $') > -1) {
        space = ' ';
        format = format.replace(' $', '');
      } else if (format.indexOf('$ ') > -1) {
        space = ' ';
        format = format.replace('$ ', '');
      } else {
        format = format.replace('$', '');
      }
      output = formatNumber(n._value, format, roundingFunction);
      if (symbolIndex <= 1) {
        if (output.indexOf('(') > -1 || output.indexOf('-') > -1) {
          output = output.split('');
          spliceIndex = 1;
          if (symbolIndex < openParenIndex || symbolIndex < minusSignIndex) {
            spliceIndex = 0;
          }
          output.splice(spliceIndex, 0, languages[currentLanguage].currency.symbol + space);
          output = output.join('');
        } else {
          output = languages[currentLanguage].currency.symbol + space + output;
        }
      } else {
        if (output.indexOf(')') > -1) {
          output = output.split('');
          output.splice(-1, 0, space + languages[currentLanguage].currency.symbol);
          output = output.join('');
        } else {
          output = output + space + languages[currentLanguage].currency.symbol;
        }
      }
      return output;
    }
    function formatPercentage(n, format, roundingFunction) {
      var space = '',
          output,
          value = n._value * 100;
      if (format.indexOf(' %') > -1) {
        space = ' ';
        format = format.replace(' %', '');
      } else {
        format = format.replace('%', '');
      }
      output = formatNumber(value, format, roundingFunction);
      if (output.indexOf(')') > -1) {
        output = output.split('');
        output.splice(-1, 0, space + '%');
        output = output.join('');
      } else {
        output = output + space + '%';
      }
      return output;
    }
    function formatTime(n) {
      var hours = Math.floor(n._value / 60 / 60),
          minutes = Math.floor((n._value - (hours * 60 * 60)) / 60),
          seconds = Math.round(n._value - (hours * 60 * 60) - (minutes * 60));
      return hours + ':' + ((minutes < 10) ? '0' + minutes : minutes) + ':' + ((seconds < 10) ? '0' + seconds : seconds);
    }
    function unformatTime(string) {
      var timeArray = string.split(':'),
          seconds = 0;
      if (timeArray.length === 3) {
        seconds = seconds + (Number(timeArray[0]) * 60 * 60);
        seconds = seconds + (Number(timeArray[1]) * 60);
        seconds = seconds + Number(timeArray[2]);
      } else if (timeArray.length === 2) {
        seconds = seconds + (Number(timeArray[0]) * 60);
        seconds = seconds + Number(timeArray[1]);
      }
      return Number(seconds);
    }
    function formatNumber(value, format, roundingFunction) {
      var negP = false,
          signed = false,
          optDec = false,
          abbr = '',
          abbrK = false,
          abbrM = false,
          abbrB = false,
          abbrT = false,
          abbrForce = false,
          bytes = '',
          ord = '',
          abs = Math.abs(value),
          suffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          min,
          max,
          power,
          w,
          precision,
          thousands,
          d = '',
          neg = false;
      if (value === 0 && zeroFormat !== null) {
        return zeroFormat;
      } else {
        if (format.indexOf('(') > -1) {
          negP = true;
          format = format.slice(1, -1);
        } else if (format.indexOf('+') > -1) {
          signed = true;
          format = format.replace(/\+/g, '');
        }
        if (format.indexOf('a') > -1) {
          abbrK = format.indexOf('aK') >= 0;
          abbrM = format.indexOf('aM') >= 0;
          abbrB = format.indexOf('aB') >= 0;
          abbrT = format.indexOf('aT') >= 0;
          abbrForce = abbrK || abbrM || abbrB || abbrT;
          if (format.indexOf(' a') > -1) {
            abbr = ' ';
            format = format.replace(' a', '');
          } else {
            format = format.replace('a', '');
          }
          if (abs >= Math.pow(10, 12) && !abbrForce || abbrT) {
            abbr = abbr + languages[currentLanguage].abbreviations.trillion;
            value = value / Math.pow(10, 12);
          } else if (abs < Math.pow(10, 12) && abs >= Math.pow(10, 9) && !abbrForce || abbrB) {
            abbr = abbr + languages[currentLanguage].abbreviations.billion;
            value = value / Math.pow(10, 9);
          } else if (abs < Math.pow(10, 9) && abs >= Math.pow(10, 6) && !abbrForce || abbrM) {
            abbr = abbr + languages[currentLanguage].abbreviations.million;
            value = value / Math.pow(10, 6);
          } else if (abs < Math.pow(10, 6) && abs >= Math.pow(10, 3) && !abbrForce || abbrK) {
            abbr = abbr + languages[currentLanguage].abbreviations.thousand;
            value = value / Math.pow(10, 3);
          }
        }
        if (format.indexOf('b') > -1) {
          if (format.indexOf(' b') > -1) {
            bytes = ' ';
            format = format.replace(' b', '');
          } else {
            format = format.replace('b', '');
          }
          for (power = 0; power <= suffixes.length; power++) {
            min = Math.pow(1024, power);
            max = Math.pow(1024, power + 1);
            if (value >= min && value < max) {
              bytes = bytes + suffixes[power];
              if (min > 0) {
                value = value / min;
              }
              break;
            }
          }
        }
        if (format.indexOf('o') > -1) {
          if (format.indexOf(' o') > -1) {
            ord = ' ';
            format = format.replace(' o', '');
          } else {
            format = format.replace('o', '');
          }
          ord = ord + languages[currentLanguage].ordinal(value);
        }
        if (format.indexOf('[.]') > -1) {
          optDec = true;
          format = format.replace('[.]', '.');
        }
        w = value.toString().split('.')[0];
        precision = format.split('.')[1];
        thousands = format.indexOf(',');
        if (precision) {
          if (precision.indexOf('[') > -1) {
            precision = precision.replace(']', '');
            precision = precision.split('[');
            d = toFixed(value, (precision[0].length + precision[1].length), roundingFunction, precision[1].length);
          } else {
            d = toFixed(value, precision.length, roundingFunction);
          }
          w = d.split('.')[0];
          if (d.split('.')[1].length) {
            d = languages[currentLanguage].delimiters.decimal + d.split('.')[1];
          } else {
            d = '';
          }
          if (optDec && Number(d.slice(1)) === 0) {
            d = '';
          }
        } else {
          w = toFixed(value, null, roundingFunction);
        }
        if (w.indexOf('-') > -1) {
          w = w.slice(1);
          neg = true;
        }
        if (thousands > -1) {
          w = w.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + languages[currentLanguage].delimiters.thousands);
        }
        if (format.indexOf('.') === 0) {
          w = '';
        }
        return ((negP && neg) ? '(' : '') + ((!negP && neg) ? '-' : '') + ((!neg && signed) ? '+' : '') + w + d + ((ord) ? ord : '') + ((abbr) ? abbr : '') + ((bytes) ? bytes : '') + ((negP && neg) ? ')' : '');
      }
    }
    numeral = function(input) {
      if (numeral.isNumeral(input)) {
        input = input.value();
      } else if (input === 0 || typeof input === 'undefined') {
        input = 0;
      } else if (!Number(input)) {
        input = numeral.fn.unformat(input);
      }
      return new Numeral(Number(input));
    };
    numeral.version = VERSION;
    numeral.isNumeral = function(obj) {
      return obj instanceof Numeral;
    };
    numeral.language = function(key, values) {
      if (!key) {
        return currentLanguage;
      }
      if (key && !values) {
        if (!languages[key]) {
          throw new Error('Unknown language : ' + key);
        }
        currentLanguage = key;
      }
      if (values || !languages[key]) {
        loadLanguage(key, values);
      }
      return numeral;
    };
    numeral.languageData = function(key) {
      if (!key) {
        return languages[currentLanguage];
      }
      if (!languages[key]) {
        throw new Error('Unknown language : ' + key);
      }
      return languages[key];
    };
    numeral.language('en', {
      delimiters: {
        thousands: ',',
        decimal: '.'
      },
      abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
      },
      ordinal: function(number) {
        var b = number % 10;
        return (~~(number % 100 / 10) === 1) ? 'th' : (b === 1) ? 'st' : (b === 2) ? 'nd' : (b === 3) ? 'rd' : 'th';
      },
      currency: {symbol: '$'}
    });
    numeral.zeroFormat = function(format) {
      zeroFormat = typeof(format) === 'string' ? format : null;
    };
    numeral.defaultFormat = function(format) {
      defaultFormat = typeof(format) === 'string' ? format : '0.0';
    };
    function loadLanguage(key, values) {
      languages[key] = values;
    }
    if ('function' !== typeof Array.prototype.reduce) {
      Array.prototype.reduce = function(callback, opt_initialValue) {
        'use strict';
        if (null === this || 'undefined' === typeof this) {
          throw new TypeError('Array.prototype.reduce called on null or undefined');
        }
        if ('function' !== typeof callback) {
          throw new TypeError(callback + ' is not a function');
        }
        var index,
            value,
            length = this.length >>> 0,
            isValueSet = false;
        if (1 < arguments.length) {
          value = opt_initialValue;
          isValueSet = true;
        }
        for (index = 0; length > index; ++index) {
          if (this.hasOwnProperty(index)) {
            if (isValueSet) {
              value = callback(value, this[index], index, this);
            } else {
              value = this[index];
              isValueSet = true;
            }
          }
        }
        if (!isValueSet) {
          throw new TypeError('Reduce of empty array with no initial value');
        }
        return value;
      };
    }
    function multiplier(x) {
      var parts = x.toString().split('.');
      if (parts.length < 2) {
        return 1;
      }
      return Math.pow(10, parts[1].length);
    }
    function correctionFactor() {
      var args = Array.prototype.slice.call(arguments);
      return args.reduce(function(prev, next) {
        var mp = multiplier(prev),
            mn = multiplier(next);
        return mp > mn ? mp : mn;
      }, -Infinity);
    }
    numeral.fn = Numeral.prototype = {
      clone: function() {
        return numeral(this);
      },
      format: function(inputString, roundingFunction) {
        return formatNumeral(this, inputString ? inputString : defaultFormat, (roundingFunction !== undefined) ? roundingFunction : Math.round);
      },
      unformat: function(inputString) {
        if (Object.prototype.toString.call(inputString) === '[object Number]') {
          return inputString;
        }
        return unformatNumeral(this, inputString ? inputString : defaultFormat);
      },
      value: function() {
        return this._value;
      },
      valueOf: function() {
        return this._value;
      },
      set: function(value) {
        this._value = Number(value);
        return this;
      },
      add: function(value) {
        var corrFactor = correctionFactor.call(null, this._value, value);
        function cback(accum, curr, currI, O) {
          return accum + corrFactor * curr;
        }
        this._value = [this._value, value].reduce(cback, 0) / corrFactor;
        return this;
      },
      subtract: function(value) {
        var corrFactor = correctionFactor.call(null, this._value, value);
        function cback(accum, curr, currI, O) {
          return accum - corrFactor * curr;
        }
        this._value = [value].reduce(cback, this._value * corrFactor) / corrFactor;
        return this;
      },
      multiply: function(value) {
        function cback(accum, curr, currI, O) {
          var corrFactor = correctionFactor(accum, curr);
          return (accum * corrFactor) * (curr * corrFactor) / (corrFactor * corrFactor);
        }
        this._value = [this._value, value].reduce(cback, 1);
        return this;
      },
      divide: function(value) {
        function cback(accum, curr, currI, O) {
          var corrFactor = correctionFactor(accum, curr);
          return (accum * corrFactor) / (curr * corrFactor);
        }
        this._value = [this._value, value].reduce(cback);
        return this;
      },
      difference: function(value) {
        return Math.abs(numeral(this._value).subtract(value).value());
      }
    };
    if (hasModule) {
      module.exports = numeral;
    }
    if (typeof ender === 'undefined') {
      this['numeral'] = numeral;
    }
    if (typeof define === 'function' && define.amd) {
      define([], function() {
        return numeral;
      });
    }
  }).call(this);
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:numeral@1.5.3", ["npm:numeral@1.5.3/numeral"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('npm:numeral@1.5.3/numeral');
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:moment@2.11.2/moment", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  ;
  (function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.moment = factory();
  }(this, function() {
    'use strict';
    var hookCallback;
    function utils_hooks__hooks() {
      return hookCallback.apply(null, arguments);
    }
    function setHookCallback(callback) {
      hookCallback = callback;
    }
    function isArray(input) {
      return Object.prototype.toString.call(input) === '[object Array]';
    }
    function isDate(input) {
      return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }
    function map(arr, fn) {
      var res = [],
          i;
      for (i = 0; i < arr.length; ++i) {
        res.push(fn(arr[i], i));
      }
      return res;
    }
    function hasOwnProp(a, b) {
      return Object.prototype.hasOwnProperty.call(a, b);
    }
    function extend(a, b) {
      for (var i in b) {
        if (hasOwnProp(b, i)) {
          a[i] = b[i];
        }
      }
      if (hasOwnProp(b, 'toString')) {
        a.toString = b.toString;
      }
      if (hasOwnProp(b, 'valueOf')) {
        a.valueOf = b.valueOf;
      }
      return a;
    }
    function create_utc__createUTC(input, format, locale, strict) {
      return createLocalOrUTC(input, format, locale, strict, true).utc();
    }
    function defaultParsingFlags() {
      return {
        empty: false,
        unusedTokens: [],
        unusedInput: [],
        overflow: -2,
        charsLeftOver: 0,
        nullInput: false,
        invalidMonth: null,
        invalidFormat: false,
        userInvalidated: false,
        iso: false
      };
    }
    function getParsingFlags(m) {
      if (m._pf == null) {
        m._pf = defaultParsingFlags();
      }
      return m._pf;
    }
    function valid__isValid(m) {
      if (m._isValid == null) {
        var flags = getParsingFlags(m);
        m._isValid = !isNaN(m._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidMonth && !flags.invalidWeekday && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated;
        if (m._strict) {
          m._isValid = m._isValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === undefined;
        }
      }
      return m._isValid;
    }
    function valid__createInvalid(flags) {
      var m = create_utc__createUTC(NaN);
      if (flags != null) {
        extend(getParsingFlags(m), flags);
      } else {
        getParsingFlags(m).userInvalidated = true;
      }
      return m;
    }
    function isUndefined(input) {
      return input === void 0;
    }
    var momentProperties = utils_hooks__hooks.momentProperties = [];
    function copyConfig(to, from) {
      var i,
          prop,
          val;
      if (!isUndefined(from._isAMomentObject)) {
        to._isAMomentObject = from._isAMomentObject;
      }
      if (!isUndefined(from._i)) {
        to._i = from._i;
      }
      if (!isUndefined(from._f)) {
        to._f = from._f;
      }
      if (!isUndefined(from._l)) {
        to._l = from._l;
      }
      if (!isUndefined(from._strict)) {
        to._strict = from._strict;
      }
      if (!isUndefined(from._tzm)) {
        to._tzm = from._tzm;
      }
      if (!isUndefined(from._isUTC)) {
        to._isUTC = from._isUTC;
      }
      if (!isUndefined(from._offset)) {
        to._offset = from._offset;
      }
      if (!isUndefined(from._pf)) {
        to._pf = getParsingFlags(from);
      }
      if (!isUndefined(from._locale)) {
        to._locale = from._locale;
      }
      if (momentProperties.length > 0) {
        for (i in momentProperties) {
          prop = momentProperties[i];
          val = from[prop];
          if (!isUndefined(val)) {
            to[prop] = val;
          }
        }
      }
      return to;
    }
    var updateInProgress = false;
    function Moment(config) {
      copyConfig(this, config);
      this._d = new Date(config._d != null ? config._d.getTime() : NaN);
      if (updateInProgress === false) {
        updateInProgress = true;
        utils_hooks__hooks.updateOffset(this);
        updateInProgress = false;
      }
    }
    function isMoment(obj) {
      return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }
    function absFloor(number) {
      if (number < 0) {
        return Math.ceil(number);
      } else {
        return Math.floor(number);
      }
    }
    function toInt(argumentForCoercion) {
      var coercedNumber = +argumentForCoercion,
          value = 0;
      if (coercedNumber !== 0 && isFinite(coercedNumber)) {
        value = absFloor(coercedNumber);
      }
      return value;
    }
    function compareArrays(array1, array2, dontConvert) {
      var len = Math.min(array1.length, array2.length),
          lengthDiff = Math.abs(array1.length - array2.length),
          diffs = 0,
          i;
      for (i = 0; i < len; i++) {
        if ((dontConvert && array1[i] !== array2[i]) || (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
          diffs++;
        }
      }
      return diffs + lengthDiff;
    }
    function Locale() {}
    var locales = {};
    var globalLocale;
    function normalizeLocale(key) {
      return key ? key.toLowerCase().replace('_', '-') : key;
    }
    function chooseLocale(names) {
      var i = 0,
          j,
          next,
          locale,
          split;
      while (i < names.length) {
        split = normalizeLocale(names[i]).split('-');
        j = split.length;
        next = normalizeLocale(names[i + 1]);
        next = next ? next.split('-') : null;
        while (j > 0) {
          locale = loadLocale(split.slice(0, j).join('-'));
          if (locale) {
            return locale;
          }
          if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
            break;
          }
          j--;
        }
        i++;
      }
      return null;
    }
    function loadLocale(name) {
      var oldLocale = null;
      if (!locales[name] && (typeof module !== 'undefined') && module && module.exports) {
        try {
          oldLocale = globalLocale._abbr;
          $__require('./locale/' + name);
          locale_locales__getSetGlobalLocale(oldLocale);
        } catch (e) {}
      }
      return locales[name];
    }
    function locale_locales__getSetGlobalLocale(key, values) {
      var data;
      if (key) {
        if (isUndefined(values)) {
          data = locale_locales__getLocale(key);
        } else {
          data = defineLocale(key, values);
        }
        if (data) {
          globalLocale = data;
        }
      }
      return globalLocale._abbr;
    }
    function defineLocale(name, values) {
      if (values !== null) {
        values.abbr = name;
        locales[name] = locales[name] || new Locale();
        locales[name].set(values);
        locale_locales__getSetGlobalLocale(name);
        return locales[name];
      } else {
        delete locales[name];
        return null;
      }
    }
    function locale_locales__getLocale(key) {
      var locale;
      if (key && key._locale && key._locale._abbr) {
        key = key._locale._abbr;
      }
      if (!key) {
        return globalLocale;
      }
      if (!isArray(key)) {
        locale = loadLocale(key);
        if (locale) {
          return locale;
        }
        key = [key];
      }
      return chooseLocale(key);
    }
    var aliases = {};
    function addUnitAlias(unit, shorthand) {
      var lowerCase = unit.toLowerCase();
      aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }
    function normalizeUnits(units) {
      return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }
    function normalizeObjectUnits(inputObject) {
      var normalizedInput = {},
          normalizedProp,
          prop;
      for (prop in inputObject) {
        if (hasOwnProp(inputObject, prop)) {
          normalizedProp = normalizeUnits(prop);
          if (normalizedProp) {
            normalizedInput[normalizedProp] = inputObject[prop];
          }
        }
      }
      return normalizedInput;
    }
    function isFunction(input) {
      return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }
    function makeGetSet(unit, keepTime) {
      return function(value) {
        if (value != null) {
          get_set__set(this, unit, value);
          utils_hooks__hooks.updateOffset(this, keepTime);
          return this;
        } else {
          return get_set__get(this, unit);
        }
      };
    }
    function get_set__get(mom, unit) {
      return mom.isValid() ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }
    function get_set__set(mom, unit, value) {
      if (mom.isValid()) {
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
      }
    }
    function getSet(units, value) {
      var unit;
      if (typeof units === 'object') {
        for (unit in units) {
          this.set(unit, units[unit]);
        }
      } else {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
          return this[units](value);
        }
      }
      return this;
    }
    function zeroFill(number, targetLength, forceSign) {
      var absNumber = '' + Math.abs(number),
          zerosToFill = targetLength - absNumber.length,
          sign = number >= 0;
      return (sign ? (forceSign ? '+' : '') : '-') + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }
    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;
    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;
    var formatFunctions = {};
    var formatTokenFunctions = {};
    function addFormatToken(token, padded, ordinal, callback) {
      var func = callback;
      if (typeof callback === 'string') {
        func = function() {
          return this[callback]();
        };
      }
      if (token) {
        formatTokenFunctions[token] = func;
      }
      if (padded) {
        formatTokenFunctions[padded[0]] = function() {
          return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
        };
      }
      if (ordinal) {
        formatTokenFunctions[ordinal] = function() {
          return this.localeData().ordinal(func.apply(this, arguments), token);
        };
      }
    }
    function removeFormattingTokens(input) {
      if (input.match(/\[[\s\S]/)) {
        return input.replace(/^\[|\]$/g, '');
      }
      return input.replace(/\\/g, '');
    }
    function makeFormatFunction(format) {
      var array = format.match(formattingTokens),
          i,
          length;
      for (i = 0, length = array.length; i < length; i++) {
        if (formatTokenFunctions[array[i]]) {
          array[i] = formatTokenFunctions[array[i]];
        } else {
          array[i] = removeFormattingTokens(array[i]);
        }
      }
      return function(mom) {
        var output = '';
        for (i = 0; i < length; i++) {
          output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
        }
        return output;
      };
    }
    function formatMoment(m, format) {
      if (!m.isValid()) {
        return m.localeData().invalidDate();
      }
      format = expandFormat(format, m.localeData());
      formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);
      return formatFunctions[format](m);
    }
    function expandFormat(format, locale) {
      var i = 5;
      function replaceLongDateFormatTokens(input) {
        return locale.longDateFormat(input) || input;
      }
      localFormattingTokens.lastIndex = 0;
      while (i >= 0 && localFormattingTokens.test(format)) {
        format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
        localFormattingTokens.lastIndex = 0;
        i -= 1;
      }
      return format;
    }
    var match1 = /\d/;
    var match2 = /\d\d/;
    var match3 = /\d{3}/;
    var match4 = /\d{4}/;
    var match6 = /[+-]?\d{6}/;
    var match1to2 = /\d\d?/;
    var match3to4 = /\d\d\d\d?/;
    var match5to6 = /\d\d\d\d\d\d?/;
    var match1to3 = /\d{1,3}/;
    var match1to4 = /\d{1,4}/;
    var match1to6 = /[+-]?\d{1,6}/;
    var matchUnsigned = /\d+/;
    var matchSigned = /[+-]?\d+/;
    var matchOffset = /Z|[+-]\d\d:?\d\d/gi;
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi;
    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/;
    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;
    var regexes = {};
    function addRegexToken(token, regex, strictRegex) {
      regexes[token] = isFunction(regex) ? regex : function(isStrict, localeData) {
        return (isStrict && strictRegex) ? strictRegex : regex;
      };
    }
    function getParseRegexForToken(token, config) {
      if (!hasOwnProp(regexes, token)) {
        return new RegExp(unescapeFormat(token));
      }
      return regexes[token](config._strict, config._locale);
    }
    function unescapeFormat(s) {
      return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(matched, p1, p2, p3, p4) {
        return p1 || p2 || p3 || p4;
      }));
    }
    function regexEscape(s) {
      return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }
    var tokens = {};
    function addParseToken(token, callback) {
      var i,
          func = callback;
      if (typeof token === 'string') {
        token = [token];
      }
      if (typeof callback === 'number') {
        func = function(input, array) {
          array[callback] = toInt(input);
        };
      }
      for (i = 0; i < token.length; i++) {
        tokens[token[i]] = func;
      }
    }
    function addWeekParseToken(token, callback) {
      addParseToken(token, function(input, array, config, token) {
        config._w = config._w || {};
        callback(input, config._w, config, token);
      });
    }
    function addTimeToArrayFromToken(token, input, config) {
      if (input != null && hasOwnProp(tokens, token)) {
        tokens[token](input, config._a, config, token);
      }
    }
    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;
    function daysInMonth(year, month) {
      return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }
    addFormatToken('M', ['MM', 2], 'Mo', function() {
      return this.month() + 1;
    });
    addFormatToken('MMM', 0, 0, function(format) {
      return this.localeData().monthsShort(this, format);
    });
    addFormatToken('MMMM', 0, 0, function(format) {
      return this.localeData().months(this, format);
    });
    addUnitAlias('month', 'M');
    addRegexToken('M', match1to2);
    addRegexToken('MM', match1to2, match2);
    addRegexToken('MMM', function(isStrict, locale) {
      return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function(isStrict, locale) {
      return locale.monthsRegex(isStrict);
    });
    addParseToken(['M', 'MM'], function(input, array) {
      array[MONTH] = toInt(input) - 1;
    });
    addParseToken(['MMM', 'MMMM'], function(input, array, config, token) {
      var month = config._locale.monthsParse(input, token, config._strict);
      if (month != null) {
        array[MONTH] = month;
      } else {
        getParsingFlags(config).invalidMonth = input;
      }
    });
    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths(m, format) {
      return isArray(this._months) ? this._months[m.month()] : this._months[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }
    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort(m, format) {
      return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }
    function localeMonthsParse(monthName, format, strict) {
      var i,
          mom,
          regex;
      if (!this._monthsParse) {
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
      }
      for (i = 0; i < 12; i++) {
        mom = create_utc__createUTC([2000, i]);
        if (strict && !this._longMonthsParse[i]) {
          this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
          this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
        }
        if (!strict && !this._monthsParse[i]) {
          regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
          this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
          return i;
        } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
          return i;
        } else if (!strict && this._monthsParse[i].test(monthName)) {
          return i;
        }
      }
    }
    function setMonth(mom, value) {
      var dayOfMonth;
      if (!mom.isValid()) {
        return mom;
      }
      if (typeof value === 'string') {
        value = mom.localeData().monthsParse(value);
        if (typeof value !== 'number') {
          return mom;
        }
      }
      dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
      mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
      return mom;
    }
    function getSetMonth(value) {
      if (value != null) {
        setMonth(this, value);
        utils_hooks__hooks.updateOffset(this, true);
        return this;
      } else {
        return get_set__get(this, 'Month');
      }
    }
    function getDaysInMonth() {
      return daysInMonth(this.year(), this.month());
    }
    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex(isStrict) {
      if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
          computeMonthsParse.call(this);
        }
        if (isStrict) {
          return this._monthsShortStrictRegex;
        } else {
          return this._monthsShortRegex;
        }
      } else {
        return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
      }
    }
    var defaultMonthsRegex = matchWord;
    function monthsRegex(isStrict) {
      if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
          computeMonthsParse.call(this);
        }
        if (isStrict) {
          return this._monthsStrictRegex;
        } else {
          return this._monthsRegex;
        }
      } else {
        return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
      }
    }
    function computeMonthsParse() {
      function cmpLenRev(a, b) {
        return b.length - a.length;
      }
      var shortPieces = [],
          longPieces = [],
          mixedPieces = [],
          i,
          mom;
      for (i = 0; i < 12; i++) {
        mom = create_utc__createUTC([2000, i]);
        shortPieces.push(this.monthsShort(mom, ''));
        longPieces.push(this.months(mom, ''));
        mixedPieces.push(this.months(mom, ''));
        mixedPieces.push(this.monthsShort(mom, ''));
      }
      shortPieces.sort(cmpLenRev);
      longPieces.sort(cmpLenRev);
      mixedPieces.sort(cmpLenRev);
      for (i = 0; i < 12; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
        mixedPieces[i] = regexEscape(mixedPieces[i]);
      }
      this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
      this._monthsShortRegex = this._monthsRegex;
      this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')$', 'i');
      this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')$', 'i');
    }
    function checkOverflow(m) {
      var overflow;
      var a = m._a;
      if (a && getParsingFlags(m).overflow === -2) {
        overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;
        if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
          overflow = DATE;
        }
        if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
          overflow = WEEK;
        }
        if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
          overflow = WEEKDAY;
        }
        getParsingFlags(m).overflow = overflow;
      }
      return m;
    }
    function warn(msg) {
      if (utils_hooks__hooks.suppressDeprecationWarnings === false && (typeof console !== 'undefined') && console.warn) {
        console.warn('Deprecation warning: ' + msg);
      }
    }
    function deprecate(msg, fn) {
      var firstTime = true;
      return extend(function() {
        if (firstTime) {
          warn(msg + '\nArguments: ' + Array.prototype.slice.call(arguments).join(', ') + '\n' + (new Error()).stack);
          firstTime = false;
        }
        return fn.apply(this, arguments);
      }, fn);
    }
    var deprecations = {};
    function deprecateSimple(name, msg) {
      if (!deprecations[name]) {
        warn(msg);
        deprecations[name] = true;
      }
    }
    utils_hooks__hooks.suppressDeprecationWarnings = false;
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;
    var isoDates = [['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/], ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/], ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/], ['GGGG-[W]WW', /\d{4}-W\d\d/, false], ['YYYY-DDD', /\d{4}-\d{3}/], ['YYYY-MM', /\d{4}-\d\d/, false], ['YYYYYYMMDD', /[+-]\d{10}/], ['YYYYMMDD', /\d{8}/], ['GGGG[W]WWE', /\d{4}W\d{3}/], ['GGGG[W]WW', /\d{4}W\d{2}/, false], ['YYYYDDD', /\d{7}/]];
    var isoTimes = [['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/], ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/], ['HH:mm:ss', /\d\d:\d\d:\d\d/], ['HH:mm', /\d\d:\d\d/], ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/], ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/], ['HHmmss', /\d\d\d\d\d\d/], ['HHmm', /\d\d\d\d/], ['HH', /\d\d/]];
    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;
    function configFromISO(config) {
      var i,
          l,
          string = config._i,
          match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
          allowTime,
          dateFormat,
          timeFormat,
          tzFormat;
      if (match) {
        getParsingFlags(config).iso = true;
        for (i = 0, l = isoDates.length; i < l; i++) {
          if (isoDates[i][1].exec(match[1])) {
            dateFormat = isoDates[i][0];
            allowTime = isoDates[i][2] !== false;
            break;
          }
        }
        if (dateFormat == null) {
          config._isValid = false;
          return;
        }
        if (match[3]) {
          for (i = 0, l = isoTimes.length; i < l; i++) {
            if (isoTimes[i][1].exec(match[3])) {
              timeFormat = (match[2] || ' ') + isoTimes[i][0];
              break;
            }
          }
          if (timeFormat == null) {
            config._isValid = false;
            return;
          }
        }
        if (!allowTime && timeFormat != null) {
          config._isValid = false;
          return;
        }
        if (match[4]) {
          if (tzRegex.exec(match[4])) {
            tzFormat = 'Z';
          } else {
            config._isValid = false;
            return;
          }
        }
        config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
        configFromStringAndFormat(config);
      } else {
        config._isValid = false;
      }
    }
    function configFromString(config) {
      var matched = aspNetJsonRegex.exec(config._i);
      if (matched !== null) {
        config._d = new Date(+matched[1]);
        return;
      }
      configFromISO(config);
      if (config._isValid === false) {
        delete config._isValid;
        utils_hooks__hooks.createFromInputFallback(config);
      }
    }
    utils_hooks__hooks.createFromInputFallback = deprecate('moment construction falls back to js Date. This is ' + 'discouraged and will be removed in upcoming major ' + 'release. Please refer to ' + 'https://github.com/moment/moment/issues/1407 for more info.', function(config) {
      config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
    });
    function createDate(y, m, d, h, M, s, ms) {
      var date = new Date(y, m, d, h, M, s, ms);
      if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
        date.setFullYear(y);
      }
      return date;
    }
    function createUTCDate(y) {
      var date = new Date(Date.UTC.apply(null, arguments));
      if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
        date.setUTCFullYear(y);
      }
      return date;
    }
    addFormatToken('Y', 0, 0, function() {
      var y = this.year();
      return y <= 9999 ? '' + y : '+' + y;
    });
    addFormatToken(0, ['YY', 2], 0, function() {
      return this.year() % 100;
    });
    addFormatToken(0, ['YYYY', 4], 0, 'year');
    addFormatToken(0, ['YYYYY', 5], 0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');
    addUnitAlias('year', 'y');
    addRegexToken('Y', matchSigned);
    addRegexToken('YY', match1to2, match2);
    addRegexToken('YYYY', match1to4, match4);
    addRegexToken('YYYYY', match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);
    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function(input, array) {
      array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function(input, array) {
      array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function(input, array) {
      array[YEAR] = parseInt(input, 10);
    });
    function daysInYear(year) {
      return isLeapYear(year) ? 366 : 365;
    }
    function isLeapYear(year) {
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }
    utils_hooks__hooks.parseTwoDigitYear = function(input) {
      return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };
    var getSetYear = makeGetSet('FullYear', false);
    function getIsLeapYear() {
      return isLeapYear(this.year());
    }
    function firstWeekOffset(year, dow, doy) {
      var fwd = 7 + dow - doy,
          fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
      return -fwdlw + fwd - 1;
    }
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
      var localWeekday = (7 + weekday - dow) % 7,
          weekOffset = firstWeekOffset(year, dow, doy),
          dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
          resYear,
          resDayOfYear;
      if (dayOfYear <= 0) {
        resYear = year - 1;
        resDayOfYear = daysInYear(resYear) + dayOfYear;
      } else if (dayOfYear > daysInYear(year)) {
        resYear = year + 1;
        resDayOfYear = dayOfYear - daysInYear(year);
      } else {
        resYear = year;
        resDayOfYear = dayOfYear;
      }
      return {
        year: resYear,
        dayOfYear: resDayOfYear
      };
    }
    function weekOfYear(mom, dow, doy) {
      var weekOffset = firstWeekOffset(mom.year(), dow, doy),
          week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
          resWeek,
          resYear;
      if (week < 1) {
        resYear = mom.year() - 1;
        resWeek = week + weeksInYear(resYear, dow, doy);
      } else if (week > weeksInYear(mom.year(), dow, doy)) {
        resWeek = week - weeksInYear(mom.year(), dow, doy);
        resYear = mom.year() + 1;
      } else {
        resYear = mom.year();
        resWeek = week;
      }
      return {
        week: resWeek,
        year: resYear
      };
    }
    function weeksInYear(year, dow, doy) {
      var weekOffset = firstWeekOffset(year, dow, doy),
          weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
      return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }
    function defaults(a, b, c) {
      if (a != null) {
        return a;
      }
      if (b != null) {
        return b;
      }
      return c;
    }
    function currentDateArray(config) {
      var nowValue = new Date(utils_hooks__hooks.now());
      if (config._useUTC) {
        return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
      }
      return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }
    function configFromArray(config) {
      var i,
          date,
          input = [],
          currentDate,
          yearToUse;
      if (config._d) {
        return;
      }
      currentDate = currentDateArray(config);
      if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
        dayOfYearFromWeekInfo(config);
      }
      if (config._dayOfYear) {
        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
        if (config._dayOfYear > daysInYear(yearToUse)) {
          getParsingFlags(config)._overflowDayOfYear = true;
        }
        date = createUTCDate(yearToUse, 0, config._dayOfYear);
        config._a[MONTH] = date.getUTCMonth();
        config._a[DATE] = date.getUTCDate();
      }
      for (i = 0; i < 3 && config._a[i] == null; ++i) {
        config._a[i] = input[i] = currentDate[i];
      }
      for (; i < 7; i++) {
        config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
      }
      if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
        config._nextDay = true;
        config._a[HOUR] = 0;
      }
      config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
      if (config._tzm != null) {
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
      }
      if (config._nextDay) {
        config._a[HOUR] = 24;
      }
    }
    function dayOfYearFromWeekInfo(config) {
      var w,
          weekYear,
          week,
          weekday,
          dow,
          doy,
          temp,
          weekdayOverflow;
      w = config._w;
      if (w.GG != null || w.W != null || w.E != null) {
        dow = 1;
        doy = 4;
        weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
        week = defaults(w.W, 1);
        weekday = defaults(w.E, 1);
        if (weekday < 1 || weekday > 7) {
          weekdayOverflow = true;
        }
      } else {
        dow = config._locale._week.dow;
        doy = config._locale._week.doy;
        weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
        week = defaults(w.w, 1);
        if (w.d != null) {
          weekday = w.d;
          if (weekday < 0 || weekday > 6) {
            weekdayOverflow = true;
          }
        } else if (w.e != null) {
          weekday = w.e + dow;
          if (w.e < 0 || w.e > 6) {
            weekdayOverflow = true;
          }
        } else {
          weekday = dow;
        }
      }
      if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
        getParsingFlags(config)._overflowWeeks = true;
      } else if (weekdayOverflow != null) {
        getParsingFlags(config)._overflowWeekday = true;
      } else {
        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
      }
    }
    utils_hooks__hooks.ISO_8601 = function() {};
    function configFromStringAndFormat(config) {
      if (config._f === utils_hooks__hooks.ISO_8601) {
        configFromISO(config);
        return;
      }
      config._a = [];
      getParsingFlags(config).empty = true;
      var string = '' + config._i,
          i,
          parsedInput,
          tokens,
          token,
          skipped,
          stringLength = string.length,
          totalParsedInputLength = 0;
      tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];
      for (i = 0; i < tokens.length; i++) {
        token = tokens[i];
        parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
        if (parsedInput) {
          skipped = string.substr(0, string.indexOf(parsedInput));
          if (skipped.length > 0) {
            getParsingFlags(config).unusedInput.push(skipped);
          }
          string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
          totalParsedInputLength += parsedInput.length;
        }
        if (formatTokenFunctions[token]) {
          if (parsedInput) {
            getParsingFlags(config).empty = false;
          } else {
            getParsingFlags(config).unusedTokens.push(token);
          }
          addTimeToArrayFromToken(token, parsedInput, config);
        } else if (config._strict && !parsedInput) {
          getParsingFlags(config).unusedTokens.push(token);
        }
      }
      getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
      if (string.length > 0) {
        getParsingFlags(config).unusedInput.push(string);
      }
      if (getParsingFlags(config).bigHour === true && config._a[HOUR] <= 12 && config._a[HOUR] > 0) {
        getParsingFlags(config).bigHour = undefined;
      }
      config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);
      configFromArray(config);
      checkOverflow(config);
    }
    function meridiemFixWrap(locale, hour, meridiem) {
      var isPm;
      if (meridiem == null) {
        return hour;
      }
      if (locale.meridiemHour != null) {
        return locale.meridiemHour(hour, meridiem);
      } else if (locale.isPM != null) {
        isPm = locale.isPM(meridiem);
        if (isPm && hour < 12) {
          hour += 12;
        }
        if (!isPm && hour === 12) {
          hour = 0;
        }
        return hour;
      } else {
        return hour;
      }
    }
    function configFromStringAndArray(config) {
      var tempConfig,
          bestMoment,
          scoreToBeat,
          i,
          currentScore;
      if (config._f.length === 0) {
        getParsingFlags(config).invalidFormat = true;
        config._d = new Date(NaN);
        return;
      }
      for (i = 0; i < config._f.length; i++) {
        currentScore = 0;
        tempConfig = copyConfig({}, config);
        if (config._useUTC != null) {
          tempConfig._useUTC = config._useUTC;
        }
        tempConfig._f = config._f[i];
        configFromStringAndFormat(tempConfig);
        if (!valid__isValid(tempConfig)) {
          continue;
        }
        currentScore += getParsingFlags(tempConfig).charsLeftOver;
        currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
        getParsingFlags(tempConfig).score = currentScore;
        if (scoreToBeat == null || currentScore < scoreToBeat) {
          scoreToBeat = currentScore;
          bestMoment = tempConfig;
        }
      }
      extend(config, bestMoment || tempConfig);
    }
    function configFromObject(config) {
      if (config._d) {
        return;
      }
      var i = normalizeObjectUnits(config._i);
      config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function(obj) {
        return obj && parseInt(obj, 10);
      });
      configFromArray(config);
    }
    function createFromConfig(config) {
      var res = new Moment(checkOverflow(prepareConfig(config)));
      if (res._nextDay) {
        res.add(1, 'd');
        res._nextDay = undefined;
      }
      return res;
    }
    function prepareConfig(config) {
      var input = config._i,
          format = config._f;
      config._locale = config._locale || locale_locales__getLocale(config._l);
      if (input === null || (format === undefined && input === '')) {
        return valid__createInvalid({nullInput: true});
      }
      if (typeof input === 'string') {
        config._i = input = config._locale.preparse(input);
      }
      if (isMoment(input)) {
        return new Moment(checkOverflow(input));
      } else if (isArray(format)) {
        configFromStringAndArray(config);
      } else if (format) {
        configFromStringAndFormat(config);
      } else if (isDate(input)) {
        config._d = input;
      } else {
        configFromInput(config);
      }
      if (!valid__isValid(config)) {
        config._d = null;
      }
      return config;
    }
    function configFromInput(config) {
      var input = config._i;
      if (input === undefined) {
        config._d = new Date(utils_hooks__hooks.now());
      } else if (isDate(input)) {
        config._d = new Date(+input);
      } else if (typeof input === 'string') {
        configFromString(config);
      } else if (isArray(input)) {
        config._a = map(input.slice(0), function(obj) {
          return parseInt(obj, 10);
        });
        configFromArray(config);
      } else if (typeof(input) === 'object') {
        configFromObject(config);
      } else if (typeof(input) === 'number') {
        config._d = new Date(input);
      } else {
        utils_hooks__hooks.createFromInputFallback(config);
      }
    }
    function createLocalOrUTC(input, format, locale, strict, isUTC) {
      var c = {};
      if (typeof(locale) === 'boolean') {
        strict = locale;
        locale = undefined;
      }
      c._isAMomentObject = true;
      c._useUTC = c._isUTC = isUTC;
      c._l = locale;
      c._i = input;
      c._f = format;
      c._strict = strict;
      return createFromConfig(c);
    }
    function local__createLocal(input, format, locale, strict) {
      return createLocalOrUTC(input, format, locale, strict, false);
    }
    var prototypeMin = deprecate('moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548', function() {
      var other = local__createLocal.apply(null, arguments);
      if (this.isValid() && other.isValid()) {
        return other < this ? this : other;
      } else {
        return valid__createInvalid();
      }
    });
    var prototypeMax = deprecate('moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548', function() {
      var other = local__createLocal.apply(null, arguments);
      if (this.isValid() && other.isValid()) {
        return other > this ? this : other;
      } else {
        return valid__createInvalid();
      }
    });
    function pickBy(fn, moments) {
      var res,
          i;
      if (moments.length === 1 && isArray(moments[0])) {
        moments = moments[0];
      }
      if (!moments.length) {
        return local__createLocal();
      }
      res = moments[0];
      for (i = 1; i < moments.length; ++i) {
        if (!moments[i].isValid() || moments[i][fn](res)) {
          res = moments[i];
        }
      }
      return res;
    }
    function min() {
      var args = [].slice.call(arguments, 0);
      return pickBy('isBefore', args);
    }
    function max() {
      var args = [].slice.call(arguments, 0);
      return pickBy('isAfter', args);
    }
    var now = function() {
      return Date.now ? Date.now() : +(new Date());
    };
    function Duration(duration) {
      var normalizedInput = normalizeObjectUnits(duration),
          years = normalizedInput.year || 0,
          quarters = normalizedInput.quarter || 0,
          months = normalizedInput.month || 0,
          weeks = normalizedInput.week || 0,
          days = normalizedInput.day || 0,
          hours = normalizedInput.hour || 0,
          minutes = normalizedInput.minute || 0,
          seconds = normalizedInput.second || 0,
          milliseconds = normalizedInput.millisecond || 0;
      this._milliseconds = +milliseconds + seconds * 1e3 + minutes * 6e4 + hours * 36e5;
      this._days = +days + weeks * 7;
      this._months = +months + quarters * 3 + years * 12;
      this._data = {};
      this._locale = locale_locales__getLocale();
      this._bubble();
    }
    function isDuration(obj) {
      return obj instanceof Duration;
    }
    function offset(token, separator) {
      addFormatToken(token, 0, 0, function() {
        var offset = this.utcOffset();
        var sign = '+';
        if (offset < 0) {
          offset = -offset;
          sign = '-';
        }
        return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
      });
    }
    offset('Z', ':');
    offset('ZZ', '');
    addRegexToken('Z', matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function(input, array, config) {
      config._useUTC = true;
      config._tzm = offsetFromString(matchShortOffset, input);
    });
    var chunkOffset = /([\+\-]|\d\d)/gi;
    function offsetFromString(matcher, string) {
      var matches = ((string || '').match(matcher) || []);
      var chunk = matches[matches.length - 1] || [];
      var parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
      var minutes = +(parts[1] * 60) + toInt(parts[2]);
      return parts[0] === '+' ? minutes : -minutes;
    }
    function cloneWithOffset(input, model) {
      var res,
          diff;
      if (model._isUTC) {
        res = model.clone();
        diff = (isMoment(input) || isDate(input) ? +input : +local__createLocal(input)) - (+res);
        res._d.setTime(+res._d + diff);
        utils_hooks__hooks.updateOffset(res, false);
        return res;
      } else {
        return local__createLocal(input).local();
      }
    }
    function getDateOffset(m) {
      return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }
    utils_hooks__hooks.updateOffset = function() {};
    function getSetOffset(input, keepLocalTime) {
      var offset = this._offset || 0,
          localAdjust;
      if (!this.isValid()) {
        return input != null ? this : NaN;
      }
      if (input != null) {
        if (typeof input === 'string') {
          input = offsetFromString(matchShortOffset, input);
        } else if (Math.abs(input) < 16) {
          input = input * 60;
        }
        if (!this._isUTC && keepLocalTime) {
          localAdjust = getDateOffset(this);
        }
        this._offset = input;
        this._isUTC = true;
        if (localAdjust != null) {
          this.add(localAdjust, 'm');
        }
        if (offset !== input) {
          if (!keepLocalTime || this._changeInProgress) {
            add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
          } else if (!this._changeInProgress) {
            this._changeInProgress = true;
            utils_hooks__hooks.updateOffset(this, true);
            this._changeInProgress = null;
          }
        }
        return this;
      } else {
        return this._isUTC ? offset : getDateOffset(this);
      }
    }
    function getSetZone(input, keepLocalTime) {
      if (input != null) {
        if (typeof input !== 'string') {
          input = -input;
        }
        this.utcOffset(input, keepLocalTime);
        return this;
      } else {
        return -this.utcOffset();
      }
    }
    function setOffsetToUTC(keepLocalTime) {
      return this.utcOffset(0, keepLocalTime);
    }
    function setOffsetToLocal(keepLocalTime) {
      if (this._isUTC) {
        this.utcOffset(0, keepLocalTime);
        this._isUTC = false;
        if (keepLocalTime) {
          this.subtract(getDateOffset(this), 'm');
        }
      }
      return this;
    }
    function setOffsetToParsedOffset() {
      if (this._tzm) {
        this.utcOffset(this._tzm);
      } else if (typeof this._i === 'string') {
        this.utcOffset(offsetFromString(matchOffset, this._i));
      }
      return this;
    }
    function hasAlignedHourOffset(input) {
      if (!this.isValid()) {
        return false;
      }
      input = input ? local__createLocal(input).utcOffset() : 0;
      return (this.utcOffset() - input) % 60 === 0;
    }
    function isDaylightSavingTime() {
      return (this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset());
    }
    function isDaylightSavingTimeShifted() {
      if (!isUndefined(this._isDSTShifted)) {
        return this._isDSTShifted;
      }
      var c = {};
      copyConfig(c, this);
      c = prepareConfig(c);
      if (c._a) {
        var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
        this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
      } else {
        this._isDSTShifted = false;
      }
      return this._isDSTShifted;
    }
    function isLocal() {
      return this.isValid() ? !this._isUTC : false;
    }
    function isUtcOffset() {
      return this.isValid() ? this._isUTC : false;
    }
    function isUtc() {
      return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }
    var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/;
    var isoRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
    function create__createDuration(input, key) {
      var duration = input,
          match = null,
          sign,
          ret,
          diffRes;
      if (isDuration(input)) {
        duration = {
          ms: input._milliseconds,
          d: input._days,
          M: input._months
        };
      } else if (typeof input === 'number') {
        duration = {};
        if (key) {
          duration[key] = input;
        } else {
          duration.milliseconds = input;
        }
      } else if (!!(match = aspNetRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : 1;
        duration = {
          y: 0,
          d: toInt(match[DATE]) * sign,
          h: toInt(match[HOUR]) * sign,
          m: toInt(match[MINUTE]) * sign,
          s: toInt(match[SECOND]) * sign,
          ms: toInt(match[MILLISECOND]) * sign
        };
      } else if (!!(match = isoRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : 1;
        duration = {
          y: parseIso(match[2], sign),
          M: parseIso(match[3], sign),
          d: parseIso(match[4], sign),
          h: parseIso(match[5], sign),
          m: parseIso(match[6], sign),
          s: parseIso(match[7], sign),
          w: parseIso(match[8], sign)
        };
      } else if (duration == null) {
        duration = {};
      } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
        diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));
        duration = {};
        duration.ms = diffRes.milliseconds;
        duration.M = diffRes.months;
      }
      ret = new Duration(duration);
      if (isDuration(input) && hasOwnProp(input, '_locale')) {
        ret._locale = input._locale;
      }
      return ret;
    }
    create__createDuration.fn = Duration.prototype;
    function parseIso(inp, sign) {
      var res = inp && parseFloat(inp.replace(',', '.'));
      return (isNaN(res) ? 0 : res) * sign;
    }
    function positiveMomentsDifference(base, other) {
      var res = {
        milliseconds: 0,
        months: 0
      };
      res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
      if (base.clone().add(res.months, 'M').isAfter(other)) {
        --res.months;
      }
      res.milliseconds = +other - +(base.clone().add(res.months, 'M'));
      return res;
    }
    function momentsDifference(base, other) {
      var res;
      if (!(base.isValid() && other.isValid())) {
        return {
          milliseconds: 0,
          months: 0
        };
      }
      other = cloneWithOffset(other, base);
      if (base.isBefore(other)) {
        res = positiveMomentsDifference(base, other);
      } else {
        res = positiveMomentsDifference(other, base);
        res.milliseconds = -res.milliseconds;
        res.months = -res.months;
      }
      return res;
    }
    function createAdder(direction, name) {
      return function(val, period) {
        var dur,
            tmp;
        if (period !== null && !isNaN(+period)) {
          deprecateSimple(name, 'moment().' + name + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
          tmp = val;
          val = period;
          period = tmp;
        }
        val = typeof val === 'string' ? +val : val;
        dur = create__createDuration(val, period);
        add_subtract__addSubtract(this, dur, direction);
        return this;
      };
    }
    function add_subtract__addSubtract(mom, duration, isAdding, updateOffset) {
      var milliseconds = duration._milliseconds,
          days = duration._days,
          months = duration._months;
      if (!mom.isValid()) {
        return;
      }
      updateOffset = updateOffset == null ? true : updateOffset;
      if (milliseconds) {
        mom._d.setTime(+mom._d + milliseconds * isAdding);
      }
      if (days) {
        get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
      }
      if (months) {
        setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
      }
      if (updateOffset) {
        utils_hooks__hooks.updateOffset(mom, days || months);
      }
    }
    var add_subtract__add = createAdder(1, 'add');
    var add_subtract__subtract = createAdder(-1, 'subtract');
    function moment_calendar__calendar(time, formats) {
      var now = time || local__createLocal(),
          sod = cloneWithOffset(now, this).startOf('day'),
          diff = this.diff(sod, 'days', true),
          format = diff < -6 ? 'sameElse' : diff < -1 ? 'lastWeek' : diff < 0 ? 'lastDay' : diff < 1 ? 'sameDay' : diff < 2 ? 'nextDay' : diff < 7 ? 'nextWeek' : 'sameElse';
      var output = formats && (isFunction(formats[format]) ? formats[format]() : formats[format]);
      return this.format(output || this.localeData().calendar(format, this, local__createLocal(now)));
    }
    function clone() {
      return new Moment(this);
    }
    function isAfter(input, units) {
      var localInput = isMoment(input) ? input : local__createLocal(input);
      if (!(this.isValid() && localInput.isValid())) {
        return false;
      }
      units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
      if (units === 'millisecond') {
        return +this > +localInput;
      } else {
        return +localInput < +this.clone().startOf(units);
      }
    }
    function isBefore(input, units) {
      var localInput = isMoment(input) ? input : local__createLocal(input);
      if (!(this.isValid() && localInput.isValid())) {
        return false;
      }
      units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
      if (units === 'millisecond') {
        return +this < +localInput;
      } else {
        return +this.clone().endOf(units) < +localInput;
      }
    }
    function isBetween(from, to, units) {
      return this.isAfter(from, units) && this.isBefore(to, units);
    }
    function isSame(input, units) {
      var localInput = isMoment(input) ? input : local__createLocal(input),
          inputMs;
      if (!(this.isValid() && localInput.isValid())) {
        return false;
      }
      units = normalizeUnits(units || 'millisecond');
      if (units === 'millisecond') {
        return +this === +localInput;
      } else {
        inputMs = +localInput;
        return +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));
      }
    }
    function isSameOrAfter(input, units) {
      return this.isSame(input, units) || this.isAfter(input, units);
    }
    function isSameOrBefore(input, units) {
      return this.isSame(input, units) || this.isBefore(input, units);
    }
    function diff(input, units, asFloat) {
      var that,
          zoneDelta,
          delta,
          output;
      if (!this.isValid()) {
        return NaN;
      }
      that = cloneWithOffset(input, this);
      if (!that.isValid()) {
        return NaN;
      }
      zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
      units = normalizeUnits(units);
      if (units === 'year' || units === 'month' || units === 'quarter') {
        output = monthDiff(this, that);
        if (units === 'quarter') {
          output = output / 3;
        } else if (units === 'year') {
          output = output / 12;
        }
      } else {
        delta = this - that;
        output = units === 'second' ? delta / 1e3 : units === 'minute' ? delta / 6e4 : units === 'hour' ? delta / 36e5 : units === 'day' ? (delta - zoneDelta) / 864e5 : units === 'week' ? (delta - zoneDelta) / 6048e5 : delta;
      }
      return asFloat ? output : absFloor(output);
    }
    function monthDiff(a, b) {
      var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
          anchor = a.clone().add(wholeMonthDiff, 'months'),
          anchor2,
          adjust;
      if (b - anchor < 0) {
        anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
        adjust = (b - anchor) / (anchor - anchor2);
      } else {
        anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
        adjust = (b - anchor) / (anchor2 - anchor);
      }
      return -(wholeMonthDiff + adjust);
    }
    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    function toString() {
      return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }
    function moment_format__toISOString() {
      var m = this.clone().utc();
      if (0 < m.year() && m.year() <= 9999) {
        if (isFunction(Date.prototype.toISOString)) {
          return this.toDate().toISOString();
        } else {
          return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        }
      } else {
        return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
      }
    }
    function format(inputString) {
      var output = formatMoment(this, inputString || utils_hooks__hooks.defaultFormat);
      return this.localeData().postformat(output);
    }
    function from(time, withoutSuffix) {
      if (this.isValid() && ((isMoment(time) && time.isValid()) || local__createLocal(time).isValid())) {
        return create__createDuration({
          to: this,
          from: time
        }).locale(this.locale()).humanize(!withoutSuffix);
      } else {
        return this.localeData().invalidDate();
      }
    }
    function fromNow(withoutSuffix) {
      return this.from(local__createLocal(), withoutSuffix);
    }
    function to(time, withoutSuffix) {
      if (this.isValid() && ((isMoment(time) && time.isValid()) || local__createLocal(time).isValid())) {
        return create__createDuration({
          from: this,
          to: time
        }).locale(this.locale()).humanize(!withoutSuffix);
      } else {
        return this.localeData().invalidDate();
      }
    }
    function toNow(withoutSuffix) {
      return this.to(local__createLocal(), withoutSuffix);
    }
    function locale(key) {
      var newLocaleData;
      if (key === undefined) {
        return this._locale._abbr;
      } else {
        newLocaleData = locale_locales__getLocale(key);
        if (newLocaleData != null) {
          this._locale = newLocaleData;
        }
        return this;
      }
    }
    var lang = deprecate('moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.', function(key) {
      if (key === undefined) {
        return this.localeData();
      } else {
        return this.locale(key);
      }
    });
    function localeData() {
      return this._locale;
    }
    function startOf(units) {
      units = normalizeUnits(units);
      switch (units) {
        case 'year':
          this.month(0);
        case 'quarter':
        case 'month':
          this.date(1);
        case 'week':
        case 'isoWeek':
        case 'day':
          this.hours(0);
        case 'hour':
          this.minutes(0);
        case 'minute':
          this.seconds(0);
        case 'second':
          this.milliseconds(0);
      }
      if (units === 'week') {
        this.weekday(0);
      }
      if (units === 'isoWeek') {
        this.isoWeekday(1);
      }
      if (units === 'quarter') {
        this.month(Math.floor(this.month() / 3) * 3);
      }
      return this;
    }
    function endOf(units) {
      units = normalizeUnits(units);
      if (units === undefined || units === 'millisecond') {
        return this;
      }
      return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
    }
    function to_type__valueOf() {
      return +this._d - ((this._offset || 0) * 60000);
    }
    function unix() {
      return Math.floor(+this / 1000);
    }
    function toDate() {
      return this._offset ? new Date(+this) : this._d;
    }
    function toArray() {
      var m = this;
      return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }
    function toObject() {
      var m = this;
      return {
        years: m.year(),
        months: m.month(),
        date: m.date(),
        hours: m.hours(),
        minutes: m.minutes(),
        seconds: m.seconds(),
        milliseconds: m.milliseconds()
      };
    }
    function toJSON() {
      return this.isValid() ? this.toISOString() : 'null';
    }
    function moment_valid__isValid() {
      return valid__isValid(this);
    }
    function parsingFlags() {
      return extend({}, getParsingFlags(this));
    }
    function invalidAt() {
      return getParsingFlags(this).overflow;
    }
    function creationData() {
      return {
        input: this._i,
        format: this._f,
        locale: this._locale,
        isUTC: this._isUTC,
        strict: this._strict
      };
    }
    addFormatToken(0, ['gg', 2], 0, function() {
      return this.weekYear() % 100;
    });
    addFormatToken(0, ['GG', 2], 0, function() {
      return this.isoWeekYear() % 100;
    });
    function addWeekYearFormatToken(token, getter) {
      addFormatToken(0, [token, token.length], 0, getter);
    }
    addWeekYearFormatToken('gggg', 'weekYear');
    addWeekYearFormatToken('ggggg', 'weekYear');
    addWeekYearFormatToken('GGGG', 'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');
    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');
    addRegexToken('G', matchSigned);
    addRegexToken('g', matchSigned);
    addRegexToken('GG', match1to2, match2);
    addRegexToken('gg', match1to2, match2);
    addRegexToken('GGGG', match1to4, match4);
    addRegexToken('gggg', match1to4, match4);
    addRegexToken('GGGGG', match1to6, match6);
    addRegexToken('ggggg', match1to6, match6);
    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function(input, week, config, token) {
      week[token.substr(0, 2)] = toInt(input);
    });
    addWeekParseToken(['gg', 'GG'], function(input, week, config, token) {
      week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
    });
    function getSetWeekYear(input) {
      return getSetWeekYearHelper.call(this, input, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
    }
    function getSetISOWeekYear(input) {
      return getSetWeekYearHelper.call(this, input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }
    function getISOWeeksInYear() {
      return weeksInYear(this.year(), 1, 4);
    }
    function getWeeksInYear() {
      var weekInfo = this.localeData()._week;
      return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }
    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
      var weeksTarget;
      if (input == null) {
        return weekOfYear(this, dow, doy).year;
      } else {
        weeksTarget = weeksInYear(input, dow, doy);
        if (week > weeksTarget) {
          week = weeksTarget;
        }
        return setWeekAll.call(this, input, week, weekday, dow, doy);
      }
    }
    function setWeekAll(weekYear, week, weekday, dow, doy) {
      var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
          date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
      this.year(date.getUTCFullYear());
      this.month(date.getUTCMonth());
      this.date(date.getUTCDate());
      return this;
    }
    addFormatToken('Q', 0, 'Qo', 'quarter');
    addUnitAlias('quarter', 'Q');
    addRegexToken('Q', match1);
    addParseToken('Q', function(input, array) {
      array[MONTH] = (toInt(input) - 1) * 3;
    });
    function getSetQuarter(input) {
      return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }
    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');
    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');
    addRegexToken('w', match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W', match1to2);
    addRegexToken('WW', match1to2, match2);
    addWeekParseToken(['w', 'ww', 'W', 'WW'], function(input, week, config, token) {
      week[token.substr(0, 1)] = toInt(input);
    });
    function localeWeek(mom) {
      return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }
    var defaultLocaleWeek = {
      dow: 0,
      doy: 6
    };
    function localeFirstDayOfWeek() {
      return this._week.dow;
    }
    function localeFirstDayOfYear() {
      return this._week.doy;
    }
    function getSetWeek(input) {
      var week = this.localeData().week(this);
      return input == null ? week : this.add((input - week) * 7, 'd');
    }
    function getSetISOWeek(input) {
      var week = weekOfYear(this, 1, 4).week;
      return input == null ? week : this.add((input - week) * 7, 'd');
    }
    addFormatToken('D', ['DD', 2], 'Do', 'date');
    addUnitAlias('date', 'D');
    addRegexToken('D', match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function(isStrict, locale) {
      return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
    });
    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function(input, array) {
      array[DATE] = toInt(input.match(match1to2)[0], 10);
    });
    var getSetDayOfMonth = makeGetSet('Date', true);
    addFormatToken('d', 0, 'do', 'day');
    addFormatToken('dd', 0, 0, function(format) {
      return this.localeData().weekdaysMin(this, format);
    });
    addFormatToken('ddd', 0, 0, function(format) {
      return this.localeData().weekdaysShort(this, format);
    });
    addFormatToken('dddd', 0, 0, function(format) {
      return this.localeData().weekdays(this, format);
    });
    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');
    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');
    addRegexToken('d', match1to2);
    addRegexToken('e', match1to2);
    addRegexToken('E', match1to2);
    addRegexToken('dd', matchWord);
    addRegexToken('ddd', matchWord);
    addRegexToken('dddd', matchWord);
    addWeekParseToken(['dd', 'ddd', 'dddd'], function(input, week, config, token) {
      var weekday = config._locale.weekdaysParse(input, token, config._strict);
      if (weekday != null) {
        week.d = weekday;
      } else {
        getParsingFlags(config).invalidWeekday = input;
      }
    });
    addWeekParseToken(['d', 'e', 'E'], function(input, week, config, token) {
      week[token] = toInt(input);
    });
    function parseWeekday(input, locale) {
      if (typeof input !== 'string') {
        return input;
      }
      if (!isNaN(input)) {
        return parseInt(input, 10);
      }
      input = locale.weekdaysParse(input);
      if (typeof input === 'number') {
        return input;
      }
      return null;
    }
    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays(m, format) {
      return isArray(this._weekdays) ? this._weekdays[m.day()] : this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
    }
    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort(m) {
      return this._weekdaysShort[m.day()];
    }
    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin(m) {
      return this._weekdaysMin[m.day()];
    }
    function localeWeekdaysParse(weekdayName, format, strict) {
      var i,
          mom,
          regex;
      if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._minWeekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._fullWeekdaysParse = [];
      }
      for (i = 0; i < 7; i++) {
        mom = local__createLocal([2000, 1]).day(i);
        if (strict && !this._fullWeekdaysParse[i]) {
          this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
          this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
          this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
        }
        if (!this._weekdaysParse[i]) {
          regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
          this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
          return i;
        } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
          return i;
        } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
          return i;
        } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
          return i;
        }
      }
    }
    function getSetDayOfWeek(input) {
      if (!this.isValid()) {
        return input != null ? this : NaN;
      }
      var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
      if (input != null) {
        input = parseWeekday(input, this.localeData());
        return this.add(input - day, 'd');
      } else {
        return day;
      }
    }
    function getSetLocaleDayOfWeek(input) {
      if (!this.isValid()) {
        return input != null ? this : NaN;
      }
      var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
      return input == null ? weekday : this.add(input - weekday, 'd');
    }
    function getSetISODayOfWeek(input) {
      if (!this.isValid()) {
        return input != null ? this : NaN;
      }
      return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
    }
    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');
    addUnitAlias('dayOfYear', 'DDD');
    addRegexToken('DDD', match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function(input, array, config) {
      config._dayOfYear = toInt(input);
    });
    function getSetDayOfYear(input) {
      var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
      return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }
    function hFormat() {
      return this.hours() % 12 || 12;
    }
    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('hmm', 0, 0, function() {
      return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });
    addFormatToken('hmmss', 0, 0, function() {
      return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
    });
    addFormatToken('Hmm', 0, 0, function() {
      return '' + this.hours() + zeroFill(this.minutes(), 2);
    });
    addFormatToken('Hmmss', 0, 0, function() {
      return '' + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
    });
    function meridiem(token, lowercase) {
      addFormatToken(token, 0, 0, function() {
        return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
      });
    }
    meridiem('a', true);
    meridiem('A', false);
    addUnitAlias('hour', 'h');
    function matchMeridiem(isStrict, locale) {
      return locale._meridiemParse;
    }
    addRegexToken('a', matchMeridiem);
    addRegexToken('A', matchMeridiem);
    addRegexToken('H', match1to2);
    addRegexToken('h', match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);
    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['a', 'A'], function(input, array, config) {
      config._isPm = config._locale.isPM(input);
      config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function(input, array, config) {
      array[HOUR] = toInt(input);
      getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function(input, array, config) {
      var pos = input.length - 2;
      array[HOUR] = toInt(input.substr(0, pos));
      array[MINUTE] = toInt(input.substr(pos));
      getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function(input, array, config) {
      var pos1 = input.length - 4;
      var pos2 = input.length - 2;
      array[HOUR] = toInt(input.substr(0, pos1));
      array[MINUTE] = toInt(input.substr(pos1, 2));
      array[SECOND] = toInt(input.substr(pos2));
      getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function(input, array, config) {
      var pos = input.length - 2;
      array[HOUR] = toInt(input.substr(0, pos));
      array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function(input, array, config) {
      var pos1 = input.length - 4;
      var pos2 = input.length - 2;
      array[HOUR] = toInt(input.substr(0, pos1));
      array[MINUTE] = toInt(input.substr(pos1, 2));
      array[SECOND] = toInt(input.substr(pos2));
    });
    function localeIsPM(input) {
      return ((input + '').toLowerCase().charAt(0) === 'p');
    }
    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem(hours, minutes, isLower) {
      if (hours > 11) {
        return isLower ? 'pm' : 'PM';
      } else {
        return isLower ? 'am' : 'AM';
      }
    }
    var getSetHour = makeGetSet('Hours', true);
    addFormatToken('m', ['mm', 2], 0, 'minute');
    addUnitAlias('minute', 'm');
    addRegexToken('m', match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);
    var getSetMinute = makeGetSet('Minutes', false);
    addFormatToken('s', ['ss', 2], 0, 'second');
    addUnitAlias('second', 's');
    addRegexToken('s', match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);
    var getSetSecond = makeGetSet('Seconds', false);
    addFormatToken('S', 0, 0, function() {
      return ~~(this.millisecond() / 100);
    });
    addFormatToken(0, ['SS', 2], 0, function() {
      return ~~(this.millisecond() / 10);
    });
    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function() {
      return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function() {
      return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function() {
      return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function() {
      return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function() {
      return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function() {
      return this.millisecond() * 1000000;
    });
    addUnitAlias('millisecond', 'ms');
    addRegexToken('S', match1to3, match1);
    addRegexToken('SS', match1to3, match2);
    addRegexToken('SSS', match1to3, match3);
    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
      addRegexToken(token, matchUnsigned);
    }
    function parseMs(input, array) {
      array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }
    for (token = 'S'; token.length <= 9; token += 'S') {
      addParseToken(token, parseMs);
    }
    var getSetMillisecond = makeGetSet('Milliseconds', false);
    addFormatToken('z', 0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');
    function getZoneAbbr() {
      return this._isUTC ? 'UTC' : '';
    }
    function getZoneName() {
      return this._isUTC ? 'Coordinated Universal Time' : '';
    }
    var momentPrototype__proto = Moment.prototype;
    momentPrototype__proto.add = add_subtract__add;
    momentPrototype__proto.calendar = moment_calendar__calendar;
    momentPrototype__proto.clone = clone;
    momentPrototype__proto.diff = diff;
    momentPrototype__proto.endOf = endOf;
    momentPrototype__proto.format = format;
    momentPrototype__proto.from = from;
    momentPrototype__proto.fromNow = fromNow;
    momentPrototype__proto.to = to;
    momentPrototype__proto.toNow = toNow;
    momentPrototype__proto.get = getSet;
    momentPrototype__proto.invalidAt = invalidAt;
    momentPrototype__proto.isAfter = isAfter;
    momentPrototype__proto.isBefore = isBefore;
    momentPrototype__proto.isBetween = isBetween;
    momentPrototype__proto.isSame = isSame;
    momentPrototype__proto.isSameOrAfter = isSameOrAfter;
    momentPrototype__proto.isSameOrBefore = isSameOrBefore;
    momentPrototype__proto.isValid = moment_valid__isValid;
    momentPrototype__proto.lang = lang;
    momentPrototype__proto.locale = locale;
    momentPrototype__proto.localeData = localeData;
    momentPrototype__proto.max = prototypeMax;
    momentPrototype__proto.min = prototypeMin;
    momentPrototype__proto.parsingFlags = parsingFlags;
    momentPrototype__proto.set = getSet;
    momentPrototype__proto.startOf = startOf;
    momentPrototype__proto.subtract = add_subtract__subtract;
    momentPrototype__proto.toArray = toArray;
    momentPrototype__proto.toObject = toObject;
    momentPrototype__proto.toDate = toDate;
    momentPrototype__proto.toISOString = moment_format__toISOString;
    momentPrototype__proto.toJSON = toJSON;
    momentPrototype__proto.toString = toString;
    momentPrototype__proto.unix = unix;
    momentPrototype__proto.valueOf = to_type__valueOf;
    momentPrototype__proto.creationData = creationData;
    momentPrototype__proto.year = getSetYear;
    momentPrototype__proto.isLeapYear = getIsLeapYear;
    momentPrototype__proto.weekYear = getSetWeekYear;
    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;
    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;
    momentPrototype__proto.month = getSetMonth;
    momentPrototype__proto.daysInMonth = getDaysInMonth;
    momentPrototype__proto.week = momentPrototype__proto.weeks = getSetWeek;
    momentPrototype__proto.isoWeek = momentPrototype__proto.isoWeeks = getSetISOWeek;
    momentPrototype__proto.weeksInYear = getWeeksInYear;
    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;
    momentPrototype__proto.date = getSetDayOfMonth;
    momentPrototype__proto.day = momentPrototype__proto.days = getSetDayOfWeek;
    momentPrototype__proto.weekday = getSetLocaleDayOfWeek;
    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
    momentPrototype__proto.dayOfYear = getSetDayOfYear;
    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;
    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;
    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;
    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;
    momentPrototype__proto.utcOffset = getSetOffset;
    momentPrototype__proto.utc = setOffsetToUTC;
    momentPrototype__proto.local = setOffsetToLocal;
    momentPrototype__proto.parseZone = setOffsetToParsedOffset;
    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
    momentPrototype__proto.isDST = isDaylightSavingTime;
    momentPrototype__proto.isDSTShifted = isDaylightSavingTimeShifted;
    momentPrototype__proto.isLocal = isLocal;
    momentPrototype__proto.isUtcOffset = isUtcOffset;
    momentPrototype__proto.isUtc = isUtc;
    momentPrototype__proto.isUTC = isUtc;
    momentPrototype__proto.zoneAbbr = getZoneAbbr;
    momentPrototype__proto.zoneName = getZoneName;
    momentPrototype__proto.dates = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    momentPrototype__proto.years = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    momentPrototype__proto.zone = deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779', getSetZone);
    var momentPrototype = momentPrototype__proto;
    function moment__createUnix(input) {
      return local__createLocal(input * 1000);
    }
    function moment__createInZone() {
      return local__createLocal.apply(null, arguments).parseZone();
    }
    var defaultCalendar = {
      sameDay: '[Today at] LT',
      nextDay: '[Tomorrow at] LT',
      nextWeek: 'dddd [at] LT',
      lastDay: '[Yesterday at] LT',
      lastWeek: '[Last] dddd [at] LT',
      sameElse: 'L'
    };
    function locale_calendar__calendar(key, mom, now) {
      var output = this._calendar[key];
      return isFunction(output) ? output.call(mom, now) : output;
    }
    var defaultLongDateFormat = {
      LTS: 'h:mm:ss A',
      LT: 'h:mm A',
      L: 'MM/DD/YYYY',
      LL: 'MMMM D, YYYY',
      LLL: 'MMMM D, YYYY h:mm A',
      LLLL: 'dddd, MMMM D, YYYY h:mm A'
    };
    function longDateFormat(key) {
      var format = this._longDateFormat[key],
          formatUpper = this._longDateFormat[key.toUpperCase()];
      if (format || !formatUpper) {
        return format;
      }
      this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function(val) {
        return val.slice(1);
      });
      return this._longDateFormat[key];
    }
    var defaultInvalidDate = 'Invalid date';
    function invalidDate() {
      return this._invalidDate;
    }
    var defaultOrdinal = '%d';
    var defaultOrdinalParse = /\d{1,2}/;
    function ordinal(number) {
      return this._ordinal.replace('%d', number);
    }
    function preParsePostFormat(string) {
      return string;
    }
    var defaultRelativeTime = {
      future: 'in %s',
      past: '%s ago',
      s: 'a few seconds',
      m: 'a minute',
      mm: '%d minutes',
      h: 'an hour',
      hh: '%d hours',
      d: 'a day',
      dd: '%d days',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years'
    };
    function relative__relativeTime(number, withoutSuffix, string, isFuture) {
      var output = this._relativeTime[string];
      return (isFunction(output)) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
    }
    function pastFuture(diff, output) {
      var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
      return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }
    function locale_set__set(config) {
      var prop,
          i;
      for (i in config) {
        prop = config[i];
        if (isFunction(prop)) {
          this[i] = prop;
        } else {
          this['_' + i] = prop;
        }
      }
      this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
    }
    var prototype__proto = Locale.prototype;
    prototype__proto._calendar = defaultCalendar;
    prototype__proto.calendar = locale_calendar__calendar;
    prototype__proto._longDateFormat = defaultLongDateFormat;
    prototype__proto.longDateFormat = longDateFormat;
    prototype__proto._invalidDate = defaultInvalidDate;
    prototype__proto.invalidDate = invalidDate;
    prototype__proto._ordinal = defaultOrdinal;
    prototype__proto.ordinal = ordinal;
    prototype__proto._ordinalParse = defaultOrdinalParse;
    prototype__proto.preparse = preParsePostFormat;
    prototype__proto.postformat = preParsePostFormat;
    prototype__proto._relativeTime = defaultRelativeTime;
    prototype__proto.relativeTime = relative__relativeTime;
    prototype__proto.pastFuture = pastFuture;
    prototype__proto.set = locale_set__set;
    prototype__proto.months = localeMonths;
    prototype__proto._months = defaultLocaleMonths;
    prototype__proto.monthsShort = localeMonthsShort;
    prototype__proto._monthsShort = defaultLocaleMonthsShort;
    prototype__proto.monthsParse = localeMonthsParse;
    prototype__proto._monthsRegex = defaultMonthsRegex;
    prototype__proto.monthsRegex = monthsRegex;
    prototype__proto._monthsShortRegex = defaultMonthsShortRegex;
    prototype__proto.monthsShortRegex = monthsShortRegex;
    prototype__proto.week = localeWeek;
    prototype__proto._week = defaultLocaleWeek;
    prototype__proto.firstDayOfYear = localeFirstDayOfYear;
    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;
    prototype__proto.weekdays = localeWeekdays;
    prototype__proto._weekdays = defaultLocaleWeekdays;
    prototype__proto.weekdaysMin = localeWeekdaysMin;
    prototype__proto._weekdaysMin = defaultLocaleWeekdaysMin;
    prototype__proto.weekdaysShort = localeWeekdaysShort;
    prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort;
    prototype__proto.weekdaysParse = localeWeekdaysParse;
    prototype__proto.isPM = localeIsPM;
    prototype__proto._meridiemParse = defaultLocaleMeridiemParse;
    prototype__proto.meridiem = localeMeridiem;
    function lists__get(format, index, field, setter) {
      var locale = locale_locales__getLocale();
      var utc = create_utc__createUTC().set(setter, index);
      return locale[field](utc, format);
    }
    function list(format, index, field, count, setter) {
      if (typeof format === 'number') {
        index = format;
        format = undefined;
      }
      format = format || '';
      if (index != null) {
        return lists__get(format, index, field, setter);
      }
      var i;
      var out = [];
      for (i = 0; i < count; i++) {
        out[i] = lists__get(format, i, field, setter);
      }
      return out;
    }
    function lists__listMonths(format, index) {
      return list(format, index, 'months', 12, 'month');
    }
    function lists__listMonthsShort(format, index) {
      return list(format, index, 'monthsShort', 12, 'month');
    }
    function lists__listWeekdays(format, index) {
      return list(format, index, 'weekdays', 7, 'day');
    }
    function lists__listWeekdaysShort(format, index) {
      return list(format, index, 'weekdaysShort', 7, 'day');
    }
    function lists__listWeekdaysMin(format, index) {
      return list(format, index, 'weekdaysMin', 7, 'day');
    }
    locale_locales__getSetGlobalLocale('en', {
      ordinalParse: /\d{1,2}(th|st|nd|rd)/,
      ordinal: function(number) {
        var b = number % 10,
            output = (toInt(number % 100 / 10) === 1) ? 'th' : (b === 1) ? 'st' : (b === 2) ? 'nd' : (b === 3) ? 'rd' : 'th';
        return number + output;
      }
    });
    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);
    var mathAbs = Math.abs;
    function duration_abs__abs() {
      var data = this._data;
      this._milliseconds = mathAbs(this._milliseconds);
      this._days = mathAbs(this._days);
      this._months = mathAbs(this._months);
      data.milliseconds = mathAbs(data.milliseconds);
      data.seconds = mathAbs(data.seconds);
      data.minutes = mathAbs(data.minutes);
      data.hours = mathAbs(data.hours);
      data.months = mathAbs(data.months);
      data.years = mathAbs(data.years);
      return this;
    }
    function duration_add_subtract__addSubtract(duration, input, value, direction) {
      var other = create__createDuration(input, value);
      duration._milliseconds += direction * other._milliseconds;
      duration._days += direction * other._days;
      duration._months += direction * other._months;
      return duration._bubble();
    }
    function duration_add_subtract__add(input, value) {
      return duration_add_subtract__addSubtract(this, input, value, 1);
    }
    function duration_add_subtract__subtract(input, value) {
      return duration_add_subtract__addSubtract(this, input, value, -1);
    }
    function absCeil(number) {
      if (number < 0) {
        return Math.floor(number);
      } else {
        return Math.ceil(number);
      }
    }
    function bubble() {
      var milliseconds = this._milliseconds;
      var days = this._days;
      var months = this._months;
      var data = this._data;
      var seconds,
          minutes,
          hours,
          years,
          monthsFromDays;
      if (!((milliseconds >= 0 && days >= 0 && months >= 0) || (milliseconds <= 0 && days <= 0 && months <= 0))) {
        milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
        days = 0;
        months = 0;
      }
      data.milliseconds = milliseconds % 1000;
      seconds = absFloor(milliseconds / 1000);
      data.seconds = seconds % 60;
      minutes = absFloor(seconds / 60);
      data.minutes = minutes % 60;
      hours = absFloor(minutes / 60);
      data.hours = hours % 24;
      days += absFloor(hours / 24);
      monthsFromDays = absFloor(daysToMonths(days));
      months += monthsFromDays;
      days -= absCeil(monthsToDays(monthsFromDays));
      years = absFloor(months / 12);
      months %= 12;
      data.days = days;
      data.months = months;
      data.years = years;
      return this;
    }
    function daysToMonths(days) {
      return days * 4800 / 146097;
    }
    function monthsToDays(months) {
      return months * 146097 / 4800;
    }
    function as(units) {
      var days;
      var months;
      var milliseconds = this._milliseconds;
      units = normalizeUnits(units);
      if (units === 'month' || units === 'year') {
        days = this._days + milliseconds / 864e5;
        months = this._months + daysToMonths(days);
        return units === 'month' ? months : months / 12;
      } else {
        days = this._days + Math.round(monthsToDays(this._months));
        switch (units) {
          case 'week':
            return days / 7 + milliseconds / 6048e5;
          case 'day':
            return days + milliseconds / 864e5;
          case 'hour':
            return days * 24 + milliseconds / 36e5;
          case 'minute':
            return days * 1440 + milliseconds / 6e4;
          case 'second':
            return days * 86400 + milliseconds / 1000;
          case 'millisecond':
            return Math.floor(days * 864e5) + milliseconds;
          default:
            throw new Error('Unknown unit ' + units);
        }
      }
    }
    function duration_as__valueOf() {
      return (this._milliseconds + this._days * 864e5 + (this._months % 12) * 2592e6 + toInt(this._months / 12) * 31536e6);
    }
    function makeAs(alias) {
      return function() {
        return this.as(alias);
      };
    }
    var asMilliseconds = makeAs('ms');
    var asSeconds = makeAs('s');
    var asMinutes = makeAs('m');
    var asHours = makeAs('h');
    var asDays = makeAs('d');
    var asWeeks = makeAs('w');
    var asMonths = makeAs('M');
    var asYears = makeAs('y');
    function duration_get__get(units) {
      units = normalizeUnits(units);
      return this[units + 's']();
    }
    function makeGetter(name) {
      return function() {
        return this._data[name];
      };
    }
    var milliseconds = makeGetter('milliseconds');
    var seconds = makeGetter('seconds');
    var minutes = makeGetter('minutes');
    var hours = makeGetter('hours');
    var days = makeGetter('days');
    var months = makeGetter('months');
    var years = makeGetter('years');
    function weeks() {
      return absFloor(this.days() / 7);
    }
    var round = Math.round;
    var thresholds = {
      s: 45,
      m: 45,
      h: 22,
      d: 26,
      M: 11
    };
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
      return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }
    function duration_humanize__relativeTime(posNegDuration, withoutSuffix, locale) {
      var duration = create__createDuration(posNegDuration).abs();
      var seconds = round(duration.as('s'));
      var minutes = round(duration.as('m'));
      var hours = round(duration.as('h'));
      var days = round(duration.as('d'));
      var months = round(duration.as('M'));
      var years = round(duration.as('y'));
      var a = seconds < thresholds.s && ['s', seconds] || minutes <= 1 && ['m'] || minutes < thresholds.m && ['mm', minutes] || hours <= 1 && ['h'] || hours < thresholds.h && ['hh', hours] || days <= 1 && ['d'] || days < thresholds.d && ['dd', days] || months <= 1 && ['M'] || months < thresholds.M && ['MM', months] || years <= 1 && ['y'] || ['yy', years];
      a[2] = withoutSuffix;
      a[3] = +posNegDuration > 0;
      a[4] = locale;
      return substituteTimeAgo.apply(null, a);
    }
    function duration_humanize__getSetRelativeTimeThreshold(threshold, limit) {
      if (thresholds[threshold] === undefined) {
        return false;
      }
      if (limit === undefined) {
        return thresholds[threshold];
      }
      thresholds[threshold] = limit;
      return true;
    }
    function humanize(withSuffix) {
      var locale = this.localeData();
      var output = duration_humanize__relativeTime(this, !withSuffix, locale);
      if (withSuffix) {
        output = locale.pastFuture(+this, output);
      }
      return locale.postformat(output);
    }
    var iso_string__abs = Math.abs;
    function iso_string__toISOString() {
      var seconds = iso_string__abs(this._milliseconds) / 1000;
      var days = iso_string__abs(this._days);
      var months = iso_string__abs(this._months);
      var minutes,
          hours,
          years;
      minutes = absFloor(seconds / 60);
      hours = absFloor(minutes / 60);
      seconds %= 60;
      minutes %= 60;
      years = absFloor(months / 12);
      months %= 12;
      var Y = years;
      var M = months;
      var D = days;
      var h = hours;
      var m = minutes;
      var s = seconds;
      var total = this.asSeconds();
      if (!total) {
        return 'P0D';
      }
      return (total < 0 ? '-' : '') + 'P' + (Y ? Y + 'Y' : '') + (M ? M + 'M' : '') + (D ? D + 'D' : '') + ((h || m || s) ? 'T' : '') + (h ? h + 'H' : '') + (m ? m + 'M' : '') + (s ? s + 'S' : '');
    }
    var duration_prototype__proto = Duration.prototype;
    duration_prototype__proto.abs = duration_abs__abs;
    duration_prototype__proto.add = duration_add_subtract__add;
    duration_prototype__proto.subtract = duration_add_subtract__subtract;
    duration_prototype__proto.as = as;
    duration_prototype__proto.asMilliseconds = asMilliseconds;
    duration_prototype__proto.asSeconds = asSeconds;
    duration_prototype__proto.asMinutes = asMinutes;
    duration_prototype__proto.asHours = asHours;
    duration_prototype__proto.asDays = asDays;
    duration_prototype__proto.asWeeks = asWeeks;
    duration_prototype__proto.asMonths = asMonths;
    duration_prototype__proto.asYears = asYears;
    duration_prototype__proto.valueOf = duration_as__valueOf;
    duration_prototype__proto._bubble = bubble;
    duration_prototype__proto.get = duration_get__get;
    duration_prototype__proto.milliseconds = milliseconds;
    duration_prototype__proto.seconds = seconds;
    duration_prototype__proto.minutes = minutes;
    duration_prototype__proto.hours = hours;
    duration_prototype__proto.days = days;
    duration_prototype__proto.weeks = weeks;
    duration_prototype__proto.months = months;
    duration_prototype__proto.years = years;
    duration_prototype__proto.humanize = humanize;
    duration_prototype__proto.toISOString = iso_string__toISOString;
    duration_prototype__proto.toString = iso_string__toISOString;
    duration_prototype__proto.toJSON = iso_string__toISOString;
    duration_prototype__proto.locale = locale;
    duration_prototype__proto.localeData = localeData;
    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
    duration_prototype__proto.lang = lang;
    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');
    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function(input, array, config) {
      config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function(input, array, config) {
      config._d = new Date(toInt(input));
    });
    utils_hooks__hooks.version = '2.11.2';
    setHookCallback(local__createLocal);
    utils_hooks__hooks.fn = momentPrototype;
    utils_hooks__hooks.min = min;
    utils_hooks__hooks.max = max;
    utils_hooks__hooks.now = now;
    utils_hooks__hooks.utc = create_utc__createUTC;
    utils_hooks__hooks.unix = moment__createUnix;
    utils_hooks__hooks.months = lists__listMonths;
    utils_hooks__hooks.isDate = isDate;
    utils_hooks__hooks.locale = locale_locales__getSetGlobalLocale;
    utils_hooks__hooks.invalid = valid__createInvalid;
    utils_hooks__hooks.duration = create__createDuration;
    utils_hooks__hooks.isMoment = isMoment;
    utils_hooks__hooks.weekdays = lists__listWeekdays;
    utils_hooks__hooks.parseZone = moment__createInZone;
    utils_hooks__hooks.localeData = locale_locales__getLocale;
    utils_hooks__hooks.isDuration = isDuration;
    utils_hooks__hooks.monthsShort = lists__listMonthsShort;
    utils_hooks__hooks.weekdaysMin = lists__listWeekdaysMin;
    utils_hooks__hooks.defineLocale = defineLocale;
    utils_hooks__hooks.weekdaysShort = lists__listWeekdaysShort;
    utils_hooks__hooks.normalizeUnits = normalizeUnits;
    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;
    utils_hooks__hooks.prototype = momentPrototype;
    var _moment = utils_hooks__hooks;
    return _moment;
  }));
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:moment@2.11.2", ["npm:moment@2.11.2/moment"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('npm:moment@2.11.2/moment');
  global.define = __define;
  return module.exports;
});

System.registerDynamic("github:github/fetch@0.11.0/fetch", [], false, function(__require, __exports, __module) {
  var _retrieveGlobal = System.get("@@global-helpers").prepareGlobal(__module.id, null, null);
  (function() {
    (function(self) {
      'use strict';
      if (self.fetch) {
        return;
      }
      function normalizeName(name) {
        if (typeof name !== 'string') {
          name = String(name);
        }
        if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
          throw new TypeError('Invalid character in header field name');
        }
        return name.toLowerCase();
      }
      function normalizeValue(value) {
        if (typeof value !== 'string') {
          value = String(value);
        }
        return value;
      }
      function Headers(headers) {
        this.map = {};
        if (headers instanceof Headers) {
          headers.forEach(function(value, name) {
            this.append(name, value);
          }, this);
        } else if (headers) {
          Object.getOwnPropertyNames(headers).forEach(function(name) {
            this.append(name, headers[name]);
          }, this);
        }
      }
      Headers.prototype.append = function(name, value) {
        name = normalizeName(name);
        value = normalizeValue(value);
        var list = this.map[name];
        if (!list) {
          list = [];
          this.map[name] = list;
        }
        list.push(value);
      };
      Headers.prototype['delete'] = function(name) {
        delete this.map[normalizeName(name)];
      };
      Headers.prototype.get = function(name) {
        var values = this.map[normalizeName(name)];
        return values ? values[0] : null;
      };
      Headers.prototype.getAll = function(name) {
        return this.map[normalizeName(name)] || [];
      };
      Headers.prototype.has = function(name) {
        return this.map.hasOwnProperty(normalizeName(name));
      };
      Headers.prototype.set = function(name, value) {
        this.map[normalizeName(name)] = [normalizeValue(value)];
      };
      Headers.prototype.forEach = function(callback, thisArg) {
        Object.getOwnPropertyNames(this.map).forEach(function(name) {
          this.map[name].forEach(function(value) {
            callback.call(thisArg, value, name, this);
          }, this);
        }, this);
      };
      function consumed(body) {
        if (body.bodyUsed) {
          return Promise.reject(new TypeError('Already read'));
        }
        body.bodyUsed = true;
      }
      function fileReaderReady(reader) {
        return new Promise(function(resolve, reject) {
          reader.onload = function() {
            resolve(reader.result);
          };
          reader.onerror = function() {
            reject(reader.error);
          };
        });
      }
      function readBlobAsArrayBuffer(blob) {
        var reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        return fileReaderReady(reader);
      }
      function readBlobAsText(blob) {
        var reader = new FileReader();
        reader.readAsText(blob);
        return fileReaderReady(reader);
      }
      var support = {
        blob: 'FileReader' in self && 'Blob' in self && (function() {
          try {
            new Blob();
            return true;
          } catch (e) {
            return false;
          }
        })(),
        formData: 'FormData' in self,
        arrayBuffer: 'ArrayBuffer' in self
      };
      function Body() {
        this.bodyUsed = false;
        this._initBody = function(body) {
          this._bodyInit = body;
          if (typeof body === 'string') {
            this._bodyText = body;
          } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
            this._bodyBlob = body;
          } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
            this._bodyFormData = body;
          } else if (!body) {
            this._bodyText = '';
          } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {} else {
            throw new Error('unsupported BodyInit type');
          }
          if (!this.headers.get('content-type')) {
            if (typeof body === 'string') {
              this.headers.set('content-type', 'text/plain;charset=UTF-8');
            } else if (this._bodyBlob && this._bodyBlob.type) {
              this.headers.set('content-type', this._bodyBlob.type);
            }
          }
        };
        if (support.blob) {
          this.blob = function() {
            var rejected = consumed(this);
            if (rejected) {
              return rejected;
            }
            if (this._bodyBlob) {
              return Promise.resolve(this._bodyBlob);
            } else if (this._bodyFormData) {
              throw new Error('could not read FormData body as blob');
            } else {
              return Promise.resolve(new Blob([this._bodyText]));
            }
          };
          this.arrayBuffer = function() {
            return this.blob().then(readBlobAsArrayBuffer);
          };
          this.text = function() {
            var rejected = consumed(this);
            if (rejected) {
              return rejected;
            }
            if (this._bodyBlob) {
              return readBlobAsText(this._bodyBlob);
            } else if (this._bodyFormData) {
              throw new Error('could not read FormData body as text');
            } else {
              return Promise.resolve(this._bodyText);
            }
          };
        } else {
          this.text = function() {
            var rejected = consumed(this);
            return rejected ? rejected : Promise.resolve(this._bodyText);
          };
        }
        if (support.formData) {
          this.formData = function() {
            return this.text().then(decode);
          };
        }
        this.json = function() {
          return this.text().then(JSON.parse);
        };
        return this;
      }
      var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
      function normalizeMethod(method) {
        var upcased = method.toUpperCase();
        return (methods.indexOf(upcased) > -1) ? upcased : method;
      }
      function Request(input, options) {
        options = options || {};
        var body = options.body;
        if (Request.prototype.isPrototypeOf(input)) {
          if (input.bodyUsed) {
            throw new TypeError('Already read');
          }
          this.url = input.url;
          this.credentials = input.credentials;
          if (!options.headers) {
            this.headers = new Headers(input.headers);
          }
          this.method = input.method;
          this.mode = input.mode;
          if (!body) {
            body = input._bodyInit;
            input.bodyUsed = true;
          }
        } else {
          this.url = input;
        }
        this.credentials = options.credentials || this.credentials || 'omit';
        if (options.headers || !this.headers) {
          this.headers = new Headers(options.headers);
        }
        this.method = normalizeMethod(options.method || this.method || 'GET');
        this.mode = options.mode || this.mode || null;
        this.referrer = null;
        if ((this.method === 'GET' || this.method === 'HEAD') && body) {
          throw new TypeError('Body not allowed for GET or HEAD requests');
        }
        this._initBody(body);
      }
      Request.prototype.clone = function() {
        return new Request(this);
      };
      function decode(body) {
        var form = new FormData();
        body.trim().split('&').forEach(function(bytes) {
          if (bytes) {
            var split = bytes.split('=');
            var name = split.shift().replace(/\+/g, ' ');
            var value = split.join('=').replace(/\+/g, ' ');
            form.append(decodeURIComponent(name), decodeURIComponent(value));
          }
        });
        return form;
      }
      function headers(xhr) {
        var head = new Headers();
        var pairs = xhr.getAllResponseHeaders().trim().split('\n');
        pairs.forEach(function(header) {
          var split = header.trim().split(':');
          var key = split.shift().trim();
          var value = split.join(':').trim();
          head.append(key, value);
        });
        return head;
      }
      Body.call(Request.prototype);
      function Response(bodyInit, options) {
        if (!options) {
          options = {};
        }
        this.type = 'default';
        this.status = options.status;
        this.ok = this.status >= 200 && this.status < 300;
        this.statusText = options.statusText;
        this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
        this.url = options.url || '';
        this._initBody(bodyInit);
      }
      Body.call(Response.prototype);
      Response.prototype.clone = function() {
        return new Response(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new Headers(this.headers),
          url: this.url
        });
      };
      Response.error = function() {
        var response = new Response(null, {
          status: 0,
          statusText: ''
        });
        response.type = 'error';
        return response;
      };
      var redirectStatuses = [301, 302, 303, 307, 308];
      Response.redirect = function(url, status) {
        if (redirectStatuses.indexOf(status) === -1) {
          throw new RangeError('Invalid status code');
        }
        return new Response(null, {
          status: status,
          headers: {location: url}
        });
      };
      self.Headers = Headers;
      self.Request = Request;
      self.Response = Response;
      self.fetch = function(input, init) {
        return new Promise(function(resolve, reject) {
          var request;
          if (Request.prototype.isPrototypeOf(input) && !init) {
            request = input;
          } else {
            request = new Request(input, init);
          }
          var xhr = new XMLHttpRequest();
          function responseURL() {
            if ('responseURL' in xhr) {
              return xhr.responseURL;
            }
            if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
              return xhr.getResponseHeader('X-Request-URL');
            }
            return;
          }
          xhr.onload = function() {
            var status = (xhr.status === 1223) ? 204 : xhr.status;
            if (status < 100 || status > 599) {
              reject(new TypeError('Network request failed'));
              return;
            }
            var options = {
              status: status,
              statusText: xhr.statusText,
              headers: headers(xhr),
              url: responseURL()
            };
            var body = 'response' in xhr ? xhr.response : xhr.responseText;
            resolve(new Response(body, options));
          };
          xhr.onerror = function() {
            reject(new TypeError('Network request failed'));
          };
          xhr.open(request.method, request.url, true);
          if (request.credentials === 'include') {
            xhr.withCredentials = true;
          }
          if ('responseType' in xhr && support.blob) {
            xhr.responseType = 'blob';
          }
          request.headers.forEach(function(value, name) {
            xhr.setRequestHeader(name, value);
          });
          xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
        });
      };
      self.fetch.polyfill = true;
    })(typeof self !== 'undefined' ? self : this);
  })();
  return _retrieveGlobal();
});

System.registerDynamic("github:github/fetch@0.11.0", ["github:github/fetch@0.11.0/fetch"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('github:github/fetch@0.11.0/fetch');
  global.define = __define;
  return module.exports;
});

System.registerDynamic("github:systemjs/plugin-css@0.1.20/css", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  if (typeof window !== 'undefined') {
    var waitSeconds = 100;
    var head = document.getElementsByTagName('head')[0];
    var links = document.getElementsByTagName('link');
    var linkHrefs = [];
    for (var i = 0; i < links.length; i++) {
      linkHrefs.push(links[i].href);
    }
    var isWebkit = !!window.navigator.userAgent.match(/AppleWebKit\/([^ ;]*)/);
    var webkitLoadCheck = function(link, callback) {
      setTimeout(function() {
        for (var i = 0; i < document.styleSheets.length; i++) {
          var sheet = document.styleSheets[i];
          if (sheet.href == link.href)
            return callback();
        }
        webkitLoadCheck(link, callback);
      }, 10);
    };
    var noop = function() {};
    var loadCSS = function(url) {
      return new Promise(function(resolve, reject) {
        var timeout = setTimeout(function() {
          reject('Unable to load CSS');
        }, waitSeconds * 1000);
        var _callback = function(error) {
          clearTimeout(timeout);
          link.onload = link.onerror = noop;
          setTimeout(function() {
            if (error)
              reject(error);
            else
              resolve('');
          }, 7);
        };
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = url;
        if (!isWebkit) {
          link.onload = function() {
            _callback();
          };
        } else {
          webkitLoadCheck(link, _callback);
        }
        link.onerror = function(event) {
          _callback(event.error || new Error('Error loading CSS file.'));
        };
        head.appendChild(link);
      });
    };
    exports.fetch = function(load) {
      for (var i = 0; i < linkHrefs.length; i++)
        if (load.address == linkHrefs[i])
          return '';
      return loadCSS(load.address);
    };
  } else {
    function getBuilder(loader) {
      return loader['import']('./css-builder' + (System.version ? '.js' : ''), {name: module.id});
    }
    exports.cssPlugin = true;
    exports.fetch = function(load) {
      if (this.buildCSS === false)
        load.metadata.build = false;
      load.metadata.format = 'defined';
      return '';
    };
    exports.instantiate = function() {};
    exports.bundle = function(loads, opts) {
      var loader = this;
      if (loader.buildCSS === false)
        return '';
      return getBuilder(loader).then(function(builder) {
        return builder.bundle.call(loader, loads, opts);
      });
    };
    exports.listAssets = function(loads, compileOpts, outputOpts) {
      var loader = this;
      return getBuilder(loader).then(function(builder) {
        return builder.listAssets.call(loader, loads, compileOpts, outputOpts);
      });
    };
  }
  global.define = __define;
  return module.exports;
});

System.registerDynamic("github:systemjs/plugin-css@0.1.20", ["github:systemjs/plugin-css@0.1.20/css"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('github:systemjs/plugin-css@0.1.20/css');
  global.define = __define;
  return module.exports;
});

(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-router@1.0.0-beta.1.1.2/route-href", ["exports", "npm:aurelia-templating@1.0.0-beta.1.1.4", "npm:aurelia-dependency-injection@1.0.0-beta.1.1.5", "npm:aurelia-router@1.0.0-beta.1.1.3", "npm:aurelia-pal@1.0.0-beta.1.1.1", "npm:aurelia-logging@1.0.0-beta.1.1.2"], function(exports, _aureliaTemplating, _aureliaDependencyInjection, _aureliaRouter, _aureliaPal, _aureliaLogging) {
  'use strict';
  exports.__esModule = true;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var logger = _aureliaLogging.getLogger('route-href');
  var RouteHref = (function() {
    function RouteHref(router, element) {
      _classCallCheck(this, _RouteHref);
      this.router = router;
      this.element = element;
    }
    RouteHref.prototype.bind = function bind() {
      this.isActive = true;
      this.processChange();
    };
    RouteHref.prototype.unbind = function unbind() {
      this.isActive = false;
    };
    RouteHref.prototype.attributeChanged = function attributeChanged(value, previous) {
      if (previous) {
        this.element.removeAttribute(previous);
      }
      this.processChange();
    };
    RouteHref.prototype.processChange = function processChange() {
      var _this = this;
      return this.router.ensureConfigured().then(function() {
        if (!_this.isActive) {
          return;
        }
        var href = _this.router.generate(_this.route, _this.params);
        _this.element.setAttribute(_this.attribute, href);
      })['catch'](function(reason) {
        logger.error(reason);
      });
    };
    var _RouteHref = RouteHref;
    RouteHref = _aureliaDependencyInjection.inject(_aureliaRouter.Router, _aureliaPal.DOM.Element)(RouteHref) || RouteHref;
    RouteHref = _aureliaTemplating.bindable({
      name: 'attribute',
      defaultValue: 'href'
    })(RouteHref) || RouteHref;
    RouteHref = _aureliaTemplating.bindable({
      name: 'params',
      changeHandler: 'processChange'
    })(RouteHref) || RouteHref;
    RouteHref = _aureliaTemplating.bindable({
      name: 'route',
      changeHandler: 'processChange'
    })(RouteHref) || RouteHref;
    RouteHref = _aureliaTemplating.customAttribute('route-href')(RouteHref) || RouteHref;
    return RouteHref;
  })();
  exports.RouteHref = RouteHref;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-router@1.0.0-beta.1.1.2/router-view", ["exports", "npm:aurelia-dependency-injection@1.0.0-beta.1.1.5", "npm:aurelia-templating@1.0.0-beta.1.1.4", "npm:aurelia-router@1.0.0-beta.1.1.3", "npm:aurelia-metadata@1.0.0-beta.1.1.6", "npm:aurelia-pal@1.0.0-beta.1.1.1"], function(exports, _aureliaDependencyInjection, _aureliaTemplating, _aureliaRouter, _aureliaMetadata, _aureliaPal) {
  'use strict';
  exports.__esModule = true;
  var _createDecoratedClass = (function() {
    function defineProperties(target, descriptors, initializers) {
      for (var i = 0; i < descriptors.length; i++) {
        var descriptor = descriptors[i];
        var decorators = descriptor.decorators;
        var key = descriptor.key;
        delete descriptor.key;
        delete descriptor.decorators;
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor || descriptor.initializer)
          descriptor.writable = true;
        if (decorators) {
          for (var f = 0; f < decorators.length; f++) {
            var decorator = decorators[f];
            if (typeof decorator === 'function') {
              descriptor = decorator(target, key, descriptor) || descriptor;
            } else {
              throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator);
            }
          }
          if (descriptor.initializer !== undefined) {
            initializers[key] = descriptor;
            continue;
          }
        }
        Object.defineProperty(target, key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps, protoInitializers, staticInitializers) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps, protoInitializers);
      if (staticProps)
        defineProperties(Constructor, staticProps, staticInitializers);
      return Constructor;
    };
  })();
  function _defineDecoratedPropertyDescriptor(target, key, descriptors) {
    var _descriptor = descriptors[key];
    if (!_descriptor)
      return;
    var descriptor = {};
    for (var _key in _descriptor)
      descriptor[_key] = _descriptor[_key];
    descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined;
    Object.defineProperty(target, key, descriptor);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var SwapStrategies = (function() {
    function SwapStrategies() {
      _classCallCheck(this, SwapStrategies);
    }
    SwapStrategies.prototype.before = function before(viewSlot, previousView, callback) {
      var promise = Promise.resolve(callback());
      if (previousView !== undefined) {
        return promise.then(function() {
          return viewSlot.remove(previousView, true);
        });
      }
      return promise;
    };
    SwapStrategies.prototype['with'] = function _with(viewSlot, previousView, callback) {
      var promise = Promise.resolve(callback());
      if (previousView !== undefined) {
        return Promise.all([viewSlot.remove(previousView, true), promise]);
      }
      return promise;
    };
    SwapStrategies.prototype.after = function after(viewSlot, previousView, callback) {
      return Promise.resolve(viewSlot.removeAll(true)).then(callback);
    };
    return SwapStrategies;
  })();
  var swapStrategies = new SwapStrategies();
  var RouterView = (function() {
    var _instanceInitializers = {};
    _createDecoratedClass(RouterView, [{
      key: 'swapOrder',
      decorators: [_aureliaTemplating.bindable],
      initializer: null,
      enumerable: true
    }], null, _instanceInitializers);
    function RouterView(element, container, viewSlot, router, viewLocator, compositionTransaction) {
      _classCallCheck(this, _RouterView);
      _defineDecoratedPropertyDescriptor(this, 'swapOrder', _instanceInitializers);
      this.element = element;
      this.container = container;
      this.viewSlot = viewSlot;
      this.router = router;
      this.viewLocator = viewLocator;
      this.compositionTransaction = compositionTransaction;
      this.router.registerViewPort(this, this.element.getAttribute('name'));
      if (!('initialComposition' in compositionTransaction)) {
        compositionTransaction.initialComposition = true;
        this.compositionTransactionNotifier = compositionTransaction.enlist();
      }
    }
    RouterView.prototype.created = function created(owningView) {
      this.owningView = owningView;
    };
    RouterView.prototype.bind = function bind(bindingContext, overrideContext) {
      this.container.viewModel = bindingContext;
      this.overrideContext = overrideContext;
    };
    RouterView.prototype.process = function process(viewPortInstruction, waitToSwap) {
      var _this = this;
      var component = viewPortInstruction.component;
      var childContainer = component.childContainer;
      var viewModel = component.viewModel;
      var viewModelResource = component.viewModelResource;
      var metadata = viewModelResource.metadata;
      var viewStrategy = this.viewLocator.getViewStrategy(component.view || viewModel);
      if (viewStrategy) {
        viewStrategy.makeRelativeTo(_aureliaMetadata.Origin.get(component.router.container.viewModel.constructor).moduleId);
      }
      return metadata.load(childContainer, viewModelResource.value, null, viewStrategy, true).then(function(viewFactory) {
        if (!_this.compositionTransactionNotifier) {
          _this.compositionTransactionOwnershipToken = _this.compositionTransaction.tryCapture();
        }
        viewPortInstruction.controller = metadata.create(childContainer, _aureliaTemplating.BehaviorInstruction.dynamic(_this.element, viewModel, viewFactory));
        if (waitToSwap) {
          return;
        }
        _this.swap(viewPortInstruction);
      });
    };
    RouterView.prototype.swap = function swap(viewPortInstruction) {
      var _this2 = this;
      var work = function work() {
        var previousView = _this2.view;
        var viewSlot = _this2.viewSlot;
        var swapStrategy = undefined;
        swapStrategy = _this2.swapOrder in swapStrategies ? swapStrategies[_this2.swapOrder] : swapStrategies.after;
        swapStrategy(viewSlot, previousView, function() {
          return Promise.resolve(viewSlot.add(viewPortInstruction.controller.view)).then(function() {
            if (_this2.compositionTransactionNotifier) {
              _this2.compositionTransactionNotifier.done();
              _this2.compositionTransactionNotifier = null;
            }
          });
        });
        _this2.view = viewPortInstruction.controller.view;
      };
      viewPortInstruction.controller.automate(this.overrideContext, this.owningView);
      if (this.compositionTransactionOwnershipToken) {
        return this.compositionTransactionOwnershipToken.waitForCompositionComplete().then(function() {
          _this2.compositionTransactionOwnershipToken = null;
          work();
        });
      }
      work();
    };
    var _RouterView = RouterView;
    RouterView = _aureliaDependencyInjection.inject(_aureliaPal.DOM.Element, _aureliaDependencyInjection.Container, _aureliaTemplating.ViewSlot, _aureliaRouter.Router, _aureliaTemplating.ViewLocator, _aureliaTemplating.CompositionTransaction)(RouterView) || RouterView;
    RouterView = _aureliaTemplating.noView(RouterView) || RouterView;
    RouterView = _aureliaTemplating.customElement('router-view')(RouterView) || RouterView;
    return RouterView;
  })();
  exports.RouterView = RouterView;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-router@1.0.0-beta.1.1.2/route-loader", ["exports", "npm:aurelia-dependency-injection@1.0.0-beta.1.1.5", "npm:aurelia-templating@1.0.0-beta.1.1.4", "npm:aurelia-router@1.0.0-beta.1.1.3", "npm:aurelia-path@1.0.0-beta.1.1.1", "npm:aurelia-metadata@1.0.0-beta.1.1.6"], function(exports, _aureliaDependencyInjection, _aureliaTemplating, _aureliaRouter, _aureliaPath, _aureliaMetadata) {
  'use strict';
  exports.__esModule = true;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  var TemplatingRouteLoader = (function(_RouteLoader) {
    _inherits(TemplatingRouteLoader, _RouteLoader);
    function TemplatingRouteLoader(compositionEngine) {
      _classCallCheck(this, _TemplatingRouteLoader);
      _RouteLoader.call(this);
      this.compositionEngine = compositionEngine;
    }
    TemplatingRouteLoader.prototype.loadRoute = function loadRoute(router, config) {
      var childContainer = router.container.createChild();
      var instruction = {
        viewModel: _aureliaPath.relativeToFile(config.moduleId, _aureliaMetadata.Origin.get(router.container.viewModel.constructor).moduleId),
        childContainer: childContainer,
        view: config.view || config.viewStrategy,
        router: router
      };
      childContainer.getChildRouter = function() {
        var childRouter = undefined;
        childContainer.registerHandler(_aureliaRouter.Router, function(c) {
          return childRouter || (childRouter = router.createChild(childContainer));
        });
        return childContainer.get(_aureliaRouter.Router);
      };
      return this.compositionEngine.ensureViewModel(instruction);
    };
    var _TemplatingRouteLoader = TemplatingRouteLoader;
    TemplatingRouteLoader = _aureliaDependencyInjection.inject(_aureliaTemplating.CompositionEngine)(TemplatingRouteLoader) || TemplatingRouteLoader;
    return TemplatingRouteLoader;
  })(_aureliaRouter.RouteLoader);
  exports.TemplatingRouteLoader = TemplatingRouteLoader;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-router@1.0.0-beta.1.1.2/aurelia-templating-router", ["exports", "npm:aurelia-router@1.0.0-beta.1.1.3", "npm:aurelia-templating-router@1.0.0-beta.1.1.2/route-loader", "npm:aurelia-templating-router@1.0.0-beta.1.1.2/router-view", "npm:aurelia-templating-router@1.0.0-beta.1.1.2/route-href"], function(exports, _aureliaRouter, _routeLoader, _routerView, _routeHref) {
  'use strict';
  exports.__esModule = true;
  function configure(config) {
    config.singleton(_aureliaRouter.RouteLoader, _routeLoader.TemplatingRouteLoader).singleton(_aureliaRouter.Router, _aureliaRouter.AppRouter).globalResources('./router-view', './route-href');
    config.container.registerAlias(_aureliaRouter.Router, _aureliaRouter.AppRouter);
  }
  exports.TemplatingRouteLoader = _routeLoader.TemplatingRouteLoader;
  exports.RouterView = _routerView.RouterView;
  exports.RouteHref = _routeHref.RouteHref;
  exports.configure = configure;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-router@1.0.0-beta.1.1.2", ["npm:aurelia-templating-router@1.0.0-beta.1.1.2/aurelia-templating-router"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.1.3/update-trigger-binding-behavior", ["exports", "npm:aurelia-binding@1.0.0-beta.1.2.2"], function(exports, _aureliaBinding) {
  'use strict';
  exports.__esModule = true;
  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var eventNamesRequired = 'The updateTrigger binding behavior requires at least one event name argument: eg <input value.bind="firstName & updateTrigger:\'blur\'">';
  var notApplicableMessage = 'The updateTrigger binding behavior can only be applied to two-way bindings on input/select elements.';
  var UpdateTriggerBindingBehavior = (function() {
    _createClass(UpdateTriggerBindingBehavior, null, [{
      key: 'inject',
      value: [_aureliaBinding.EventManager],
      enumerable: true
    }]);
    function UpdateTriggerBindingBehavior(eventManager) {
      _classCallCheck(this, UpdateTriggerBindingBehavior);
      this.eventManager = eventManager;
    }
    UpdateTriggerBindingBehavior.prototype.bind = function bind(binding, source) {
      for (var _len = arguments.length,
          events = Array(_len > 2 ? _len - 2 : 0),
          _key = 2; _key < _len; _key++) {
        events[_key - 2] = arguments[_key];
      }
      if (events.length === 0) {
        throw new Error(eventNamesRequired);
      }
      if (binding.mode !== _aureliaBinding.bindingMode.twoWay) {
        throw new Error(notApplicableMessage);
      }
      var targetObserver = binding.observerLocator.getObserver(binding.target, binding.targetProperty);
      if (!targetObserver.handler) {
        throw new Error(notApplicableMessage);
      }
      binding.targetObserver = targetObserver;
      targetObserver.originalHandler = binding.targetObserver.handler;
      var handler = this.eventManager.createElementHandler(events);
      targetObserver.handler = handler;
    };
    UpdateTriggerBindingBehavior.prototype.unbind = function unbind(binding, source) {
      binding.targetObserver.handler = binding.targetObserver.originalHandler;
      binding.targetObserver.originalHandler = null;
    };
    return UpdateTriggerBindingBehavior;
  })();
  exports.UpdateTriggerBindingBehavior = UpdateTriggerBindingBehavior;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.1.3/binding-signaler", ["exports", "npm:aurelia-binding@1.0.0-beta.1.2.2"], function(exports, _aureliaBinding) {
  'use strict';
  exports.__esModule = true;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var BindingSignaler = (function() {
    function BindingSignaler() {
      _classCallCheck(this, BindingSignaler);
      this.signals = {};
    }
    BindingSignaler.prototype.signal = function signal(name) {
      var bindings = this.signals[name];
      if (!bindings) {
        return;
      }
      var i = bindings.length;
      while (i--) {
        bindings[i].call(_aureliaBinding.sourceContext);
      }
    };
    return BindingSignaler;
  })();
  exports.BindingSignaler = BindingSignaler;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.1.3/signal-binding-behavior", ["exports", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/binding-signaler"], function(exports, _bindingSignaler) {
  'use strict';
  exports.__esModule = true;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var SignalBindingBehavior = (function() {
    SignalBindingBehavior.inject = function inject() {
      return [_bindingSignaler.BindingSignaler];
    };
    function SignalBindingBehavior(bindingSignaler) {
      _classCallCheck(this, SignalBindingBehavior);
      this.signals = bindingSignaler.signals;
    }
    SignalBindingBehavior.prototype.bind = function bind(binding, source) {
      if (!binding.updateTarget) {
        throw new Error('Only property bindings and string interpolation bindings can be signaled.  Trigger, delegate and call bindings cannot be signaled.');
      }
      if (arguments.length === 3) {
        var _name = arguments[2];
        var bindings = this.signals[_name] || (this.signals[_name] = []);
        bindings.push(binding);
        binding.signalName = _name;
      } else if (arguments.length > 3) {
        var names = Array.prototype.slice.call(arguments, 2);
        var i = names.length;
        while (i--) {
          var _name2 = names[i];
          var bindings = this.signals[_name2] || (this.signals[_name2] = []);
          bindings.push(binding);
        }
        binding.signalName = names;
      } else {
        throw new Error('Signal name is required.');
      }
    };
    SignalBindingBehavior.prototype.unbind = function unbind(binding, source) {
      var name = binding.signalName;
      binding.signalName = null;
      if (Array.isArray(name)) {
        var names = name;
        var i = names.length;
        while (i--) {
          var n = names[i];
          var bindings = this.signals[n];
          bindings.splice(bindings.indexOf(binding), 1);
        }
      } else {
        var bindings = this.signals[name];
        bindings.splice(bindings.indexOf(binding), 1);
      }
    };
    return SignalBindingBehavior;
  })();
  exports.SignalBindingBehavior = SignalBindingBehavior;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.1.3/debounce-binding-behavior", ["exports", "npm:aurelia-binding@1.0.0-beta.1.2.2"], function(exports, _aureliaBinding) {
  'use strict';
  exports.__esModule = true;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function debounce(newValue) {
    var _this = this;
    var state = this.debounceState;
    if (state.immediate) {
      state.immediate = false;
      this.debouncedMethod(newValue);
      return;
    }
    clearTimeout(state.timeoutId);
    state.timeoutId = setTimeout(function() {
      return _this.debouncedMethod(newValue);
    }, state.delay);
  }
  var DebounceBindingBehavior = (function() {
    function DebounceBindingBehavior() {
      _classCallCheck(this, DebounceBindingBehavior);
    }
    DebounceBindingBehavior.prototype.bind = function bind(binding, source) {
      var delay = arguments.length <= 2 || arguments[2] === undefined ? 200 : arguments[2];
      var methodToDebounce = 'updateTarget';
      if (binding.callSource) {
        methodToDebounce = 'callSource';
      } else if (binding.updateSource && binding.mode === _aureliaBinding.bindingMode.twoWay) {
        methodToDebounce = 'updateSource';
      }
      binding.debouncedMethod = binding[methodToDebounce];
      binding.debouncedMethod.originalName = methodToDebounce;
      binding[methodToDebounce] = debounce;
      binding.debounceState = {
        delay: delay,
        timeoutId: null,
        immediate: methodToDebounce === 'updateTarget'
      };
    };
    DebounceBindingBehavior.prototype.unbind = function unbind(binding, source) {
      var methodToRestore = binding.debouncedMethod.originalName;
      binding[methodToRestore] = binding.debouncedMethod;
      binding.debouncedMethod = null;
      clearTimeout(binding.debounceState.timeoutId);
      binding.debounceState = null;
    };
    return DebounceBindingBehavior;
  })();
  exports.DebounceBindingBehavior = DebounceBindingBehavior;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.1.3/throttle-binding-behavior", ["exports", "npm:aurelia-binding@1.0.0-beta.1.2.2"], function(exports, _aureliaBinding) {
  'use strict';
  exports.__esModule = true;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function throttle(newValue) {
    var _this = this;
    var state = this.throttleState;
    var elapsed = +new Date() - state.last;
    if (elapsed >= state.delay) {
      clearTimeout(state.timeoutId);
      state.timeoutId = null;
      state.last = +new Date();
      this.throttledMethod(newValue);
      return;
    }
    state.newValue = newValue;
    if (state.timeoutId === null) {
      state.timeoutId = setTimeout(function() {
        state.timeoutId = null;
        state.last = +new Date();
        _this.throttledMethod(state.newValue);
      }, state.delay - elapsed);
    }
  }
  var ThrottleBindingBehavior = (function() {
    function ThrottleBindingBehavior() {
      _classCallCheck(this, ThrottleBindingBehavior);
    }
    ThrottleBindingBehavior.prototype.bind = function bind(binding, source) {
      var delay = arguments.length <= 2 || arguments[2] === undefined ? 200 : arguments[2];
      var methodToThrottle = 'updateTarget';
      if (binding.callSource) {
        methodToThrottle = 'callSource';
      } else if (binding.updateSource && binding.mode === _aureliaBinding.bindingMode.twoWay) {
        methodToThrottle = 'updateSource';
      }
      binding.throttledMethod = binding[methodToThrottle];
      binding.throttledMethod.originalName = methodToThrottle;
      binding[methodToThrottle] = throttle;
      binding.throttleState = {
        delay: delay,
        last: 0,
        timeoutId: null
      };
    };
    ThrottleBindingBehavior.prototype.unbind = function unbind(binding, source) {
      var methodToRestore = binding.throttledMethod.originalName;
      binding[methodToRestore] = binding.throttledMethod;
      binding.throttledMethod = null;
      clearTimeout(binding.throttleState.timeoutId);
      binding.throttleState = null;
    };
    return ThrottleBindingBehavior;
  })();
  exports.ThrottleBindingBehavior = ThrottleBindingBehavior;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.1.3/binding-mode-behaviors", ["exports", "npm:aurelia-binding@1.0.0-beta.1.2.2"], function(exports, _aureliaBinding) {
  'use strict';
  exports.__esModule = true;
  function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var ModeBindingBehavior = (function() {
    function ModeBindingBehavior(mode) {
      _classCallCheck(this, ModeBindingBehavior);
      this.mode = mode;
    }
    ModeBindingBehavior.prototype.bind = function bind(binding, source, lookupFunctions) {
      binding.originalMode = binding.mode;
      binding.mode = this.mode;
    };
    ModeBindingBehavior.prototype.unbind = function unbind(binding, source) {
      binding.mode = binding.originalMode;
      binding.originalMode = null;
    };
    return ModeBindingBehavior;
  })();
  var OneTimeBindingBehavior = (function(_ModeBindingBehavior) {
    _inherits(OneTimeBindingBehavior, _ModeBindingBehavior);
    function OneTimeBindingBehavior() {
      _classCallCheck(this, OneTimeBindingBehavior);
      _ModeBindingBehavior.call(this, _aureliaBinding.bindingMode.oneTime);
    }
    return OneTimeBindingBehavior;
  })(ModeBindingBehavior);
  exports.OneTimeBindingBehavior = OneTimeBindingBehavior;
  var OneWayBindingBehavior = (function(_ModeBindingBehavior2) {
    _inherits(OneWayBindingBehavior, _ModeBindingBehavior2);
    function OneWayBindingBehavior() {
      _classCallCheck(this, OneWayBindingBehavior);
      _ModeBindingBehavior2.call(this, _aureliaBinding.bindingMode.oneWay);
    }
    return OneWayBindingBehavior;
  })(ModeBindingBehavior);
  exports.OneWayBindingBehavior = OneWayBindingBehavior;
  var TwoWayBindingBehavior = (function(_ModeBindingBehavior3) {
    _inherits(TwoWayBindingBehavior, _ModeBindingBehavior3);
    function TwoWayBindingBehavior() {
      _classCallCheck(this, TwoWayBindingBehavior);
      _ModeBindingBehavior3.call(this, _aureliaBinding.bindingMode.twoWay);
    }
    return TwoWayBindingBehavior;
  })(ModeBindingBehavior);
  exports.TwoWayBindingBehavior = TwoWayBindingBehavior;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.1.3/css-resource", ["exports", "npm:aurelia-templating@1.0.0-beta.1.1.4", "npm:aurelia-loader@1.0.0-beta.1.1.1", "npm:aurelia-dependency-injection@1.0.0-beta.1.1.5", "npm:aurelia-path@1.0.0-beta.1.1.1", "npm:aurelia-pal@1.0.0-beta.1.1.1"], function(exports, _aureliaTemplating, _aureliaLoader, _aureliaDependencyInjection, _aureliaPath, _aureliaPal) {
  'use strict';
  exports.__esModule = true;
  exports._createCSSResource = _createCSSResource;
  function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var cssUrlMatcher = /url\((?!['"]data)([^)]+)\)/gi;
  function fixupCSSUrls(address, css) {
    return css.replace(cssUrlMatcher, function(match, p1) {
      var quote = p1.charAt(0);
      if (quote === '\'' || quote === '"') {
        p1 = p1.substr(1, p1.length - 2);
      }
      return 'url(\'' + _aureliaPath.relativeToFile(p1, address) + '\')';
    });
  }
  var CSSResource = (function() {
    function CSSResource(address) {
      _classCallCheck(this, CSSResource);
      this.address = address;
      this._global = null;
      this._scoped = null;
    }
    CSSResource.prototype.initialize = function initialize(container, target) {
      this._global = new target('global');
      this._scoped = new target('scoped');
    };
    CSSResource.prototype.register = function register(registry, name) {
      registry.registerViewEngineHooks(name === 'scoped' ? this._scoped : this._global);
    };
    CSSResource.prototype.load = function load(container) {
      var _this = this;
      return container.get(_aureliaLoader.Loader).loadText(this.address).then(function(text) {
        text = fixupCSSUrls(_this.address, text);
        _this._global.css = text;
        _this._scoped.css = text;
      });
    };
    return CSSResource;
  })();
  var CSSViewEngineHooks = (function() {
    function CSSViewEngineHooks(mode) {
      _classCallCheck(this, CSSViewEngineHooks);
      this.mode = mode;
      this.css = null;
      this._alreadyGloballyInjected = false;
    }
    CSSViewEngineHooks.prototype.beforeCompile = function beforeCompile(content, resources, instruction) {
      if (this.mode === 'scoped') {
        if (instruction.targetShadowDOM) {
          _aureliaPal.DOM.injectStyles(this.css, content, true);
        } else if (_aureliaPal.FEATURE.scopedCSS) {
          var styleNode = _aureliaPal.DOM.injectStyles(this.css, content, true);
          styleNode.setAttribute('scoped', 'scoped');
        } else if (!this._alreadyGloballyInjected) {
          _aureliaPal.DOM.injectStyles(this.css);
          this._alreadyGloballyInjected = true;
        }
      } else if (!this._alreadyGloballyInjected) {
        _aureliaPal.DOM.injectStyles(this.css);
        this._alreadyGloballyInjected = true;
      }
    };
    return CSSViewEngineHooks;
  })();
  function _createCSSResource(address) {
    var ViewCSS = (function(_CSSViewEngineHooks) {
      _inherits(ViewCSS, _CSSViewEngineHooks);
      function ViewCSS() {
        _classCallCheck(this, _ViewCSS);
        _CSSViewEngineHooks.apply(this, arguments);
      }
      var _ViewCSS = ViewCSS;
      ViewCSS = _aureliaTemplating.resource(new CSSResource(address))(ViewCSS) || ViewCSS;
      return ViewCSS;
    })(CSSViewEngineHooks);
    return ViewCSS;
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.1.3/dynamic-element", ["exports", "npm:aurelia-templating@1.0.0-beta.1.1.4"], function(exports, _aureliaTemplating) {
  'use strict';
  exports.__esModule = true;
  exports._createDynamicElement = _createDynamicElement;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function _createDynamicElement(name, viewUrl, bindableNames) {
    var DynamicElement = (function() {
      function DynamicElement() {
        _classCallCheck(this, _DynamicElement);
      }
      DynamicElement.prototype.bind = function bind(bindingContext) {
        this.$parent = bindingContext;
      };
      var _DynamicElement = DynamicElement;
      DynamicElement = _aureliaTemplating.useView(viewUrl)(DynamicElement) || DynamicElement;
      DynamicElement = _aureliaTemplating.customElement(name)(DynamicElement) || DynamicElement;
      return DynamicElement;
    })();
    for (var i = 0,
        ii = bindableNames.length; i < ii; ++i) {
      _aureliaTemplating.bindable(bindableNames[i])(DynamicElement);
    }
    return DynamicElement;
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.1.3/view-spy", ["exports", "npm:aurelia-templating@1.0.0-beta.1.1.4", "npm:aurelia-logging@1.0.0-beta.1.1.2"], function(exports, _aureliaTemplating, _aureliaLogging) {
  'use strict';
  exports.__esModule = true;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var ViewSpy = (function() {
    function ViewSpy() {
      _classCallCheck(this, _ViewSpy);
      this.logger = _aureliaLogging.getLogger('view-spy');
    }
    ViewSpy.prototype._log = function _log(lifecycleName, context) {
      if (!this.value && lifecycleName === 'created') {
        this.logger.info(lifecycleName, this.view);
      } else if (this.value && this.value.indexOf(lifecycleName) !== -1) {
        this.logger.info(lifecycleName, this.view, context);
      }
    };
    ViewSpy.prototype.created = function created(view) {
      this.view = view;
      this._log('created');
    };
    ViewSpy.prototype.bind = function bind(bindingContext) {
      this._log('bind', bindingContext);
    };
    ViewSpy.prototype.attached = function attached() {
      this._log('attached');
    };
    ViewSpy.prototype.detached = function detached() {
      this._log('detached');
    };
    ViewSpy.prototype.unbind = function unbind() {
      this._log('unbind');
    };
    var _ViewSpy = ViewSpy;
    ViewSpy = _aureliaTemplating.customAttribute('view-spy')(ViewSpy) || ViewSpy;
    return ViewSpy;
  })();
  exports.ViewSpy = ViewSpy;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.1.3/compile-spy", ["exports", "npm:aurelia-templating@1.0.0-beta.1.1.4", "npm:aurelia-dependency-injection@1.0.0-beta.1.1.5", "npm:aurelia-logging@1.0.0-beta.1.1.2", "npm:aurelia-pal@1.0.0-beta.1.1.1"], function(exports, _aureliaTemplating, _aureliaDependencyInjection, _aureliaLogging, _aureliaPal) {
  'use strict';
  exports.__esModule = true;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var CompileSpy = (function() {
    function CompileSpy(element, instruction) {
      _classCallCheck(this, _CompileSpy);
      _aureliaLogging.getLogger('compile-spy').info(element, instruction);
    }
    var _CompileSpy = CompileSpy;
    CompileSpy = _aureliaDependencyInjection.inject(_aureliaPal.DOM.Element, _aureliaTemplating.TargetInstruction)(CompileSpy) || CompileSpy;
    CompileSpy = _aureliaTemplating.customAttribute('compile-spy')(CompileSpy) || CompileSpy;
    return CompileSpy;
  })();
  exports.CompileSpy = CompileSpy;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.1.3/focus", ["exports", "npm:aurelia-templating@1.0.0-beta.1.1.4", "npm:aurelia-binding@1.0.0-beta.1.2.2", "npm:aurelia-dependency-injection@1.0.0-beta.1.1.5", "npm:aurelia-task-queue@1.0.0-beta.1.1.1", "npm:aurelia-pal@1.0.0-beta.1.1.1"], function(exports, _aureliaTemplating, _aureliaBinding, _aureliaDependencyInjection, _aureliaTaskQueue, _aureliaPal) {
  'use strict';
  exports.__esModule = true;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var Focus = (function() {
    function Focus(element, taskQueue) {
      var _this = this;
      _classCallCheck(this, _Focus);
      this.element = element;
      this.taskQueue = taskQueue;
      this.focusListener = function(e) {
        _this.value = true;
      };
      this.blurListener = function(e) {
        if (_aureliaPal.DOM.activeElement !== _this.element) {
          _this.value = false;
        }
      };
    }
    Focus.prototype.valueChanged = function valueChanged(newValue) {
      if (newValue) {
        this._giveFocus();
      } else {
        this.element.blur();
      }
    };
    Focus.prototype._giveFocus = function _giveFocus() {
      var _this2 = this;
      this.taskQueue.queueMicroTask(function() {
        if (_this2.value) {
          _this2.element.focus();
        }
      });
    };
    Focus.prototype.attached = function attached() {
      this.element.addEventListener('focus', this.focusListener);
      this.element.addEventListener('blur', this.blurListener);
    };
    Focus.prototype.detached = function detached() {
      this.element.removeEventListener('focus', this.focusListener);
      this.element.removeEventListener('blur', this.blurListener);
    };
    var _Focus = Focus;
    Focus = _aureliaDependencyInjection.inject(_aureliaPal.DOM.Element, _aureliaTaskQueue.TaskQueue)(Focus) || Focus;
    Focus = _aureliaTemplating.customAttribute('focus', _aureliaBinding.bindingMode.twoWay)(Focus) || Focus;
    return Focus;
  })();
  exports.Focus = Focus;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.1.3/replaceable", ["exports", "npm:aurelia-dependency-injection@1.0.0-beta.1.1.5", "npm:aurelia-templating@1.0.0-beta.1.1.4"], function(exports, _aureliaDependencyInjection, _aureliaTemplating) {
  'use strict';
  exports.__esModule = true;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var Replaceable = (function() {
    function Replaceable(viewFactory, viewSlot) {
      _classCallCheck(this, _Replaceable);
      this.viewFactory = viewFactory;
      this.viewSlot = viewSlot;
      this.view = null;
    }
    Replaceable.prototype.bind = function bind(bindingContext, overrideContext) {
      if (this.view === null) {
        this.view = this.viewFactory.create();
        this.viewSlot.add(this.view);
      }
      this.view.bind(bindingContext, overrideContext);
    };
    Replaceable.prototype.unbind = function unbind() {
      this.view.unbind();
    };
    var _Replaceable = Replaceable;
    Replaceable = _aureliaDependencyInjection.inject(_aureliaTemplating.BoundViewFactory, _aureliaTemplating.ViewSlot)(Replaceable) || Replaceable;
    Replaceable = _aureliaTemplating.templateController(Replaceable) || Replaceable;
    Replaceable = _aureliaTemplating.customAttribute('replaceable')(Replaceable) || Replaceable;
    return Replaceable;
  })();
  exports.Replaceable = Replaceable;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.1.3/html-sanitizer", ["exports"], function(exports) {
  'use strict';
  exports.__esModule = true;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  var HTMLSanitizer = (function() {
    function HTMLSanitizer() {
      _classCallCheck(this, HTMLSanitizer);
    }
    HTMLSanitizer.prototype.sanitize = function sanitize(input) {
      return input.replace(SCRIPT_REGEX, '');
    };
    return HTMLSanitizer;
  })();
  exports.HTMLSanitizer = HTMLSanitizer;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.1.3/sanitize-html", ["exports", "npm:aurelia-binding@1.0.0-beta.1.2.2", "npm:aurelia-dependency-injection@1.0.0-beta.1.1.5", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/html-sanitizer"], function(exports, _aureliaBinding, _aureliaDependencyInjection, _htmlSanitizer) {
  'use strict';
  exports.__esModule = true;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var SanitizeHTMLValueConverter = (function() {
    function SanitizeHTMLValueConverter(sanitizer) {
      _classCallCheck(this, _SanitizeHTMLValueConverter);
      this.sanitizer = sanitizer;
    }
    SanitizeHTMLValueConverter.prototype.toView = function toView(untrustedMarkup) {
      if (untrustedMarkup === null || untrustedMarkup === undefined) {
        return null;
      }
      return this.sanitizer.sanitize(untrustedMarkup);
    };
    var _SanitizeHTMLValueConverter = SanitizeHTMLValueConverter;
    SanitizeHTMLValueConverter = _aureliaDependencyInjection.inject(_htmlSanitizer.HTMLSanitizer)(SanitizeHTMLValueConverter) || SanitizeHTMLValueConverter;
    SanitizeHTMLValueConverter = _aureliaBinding.valueConverter('sanitizeHTML')(SanitizeHTMLValueConverter) || SanitizeHTMLValueConverter;
    return SanitizeHTMLValueConverter;
  })();
  exports.SanitizeHTMLValueConverter = SanitizeHTMLValueConverter;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.1.3/hide", ["exports", "npm:aurelia-dependency-injection@1.0.0-beta.1.1.5", "npm:aurelia-templating@1.0.0-beta.1.1.4", "npm:aurelia-pal@1.0.0-beta.1.1.1"], function(exports, _aureliaDependencyInjection, _aureliaTemplating, _aureliaPal) {
  'use strict';
  exports.__esModule = true;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var Hide = (function() {
    function Hide(element, animator) {
      _classCallCheck(this, _Hide);
      this.element = element;
      this.animator = animator;
    }
    Hide.prototype.valueChanged = function valueChanged(newValue) {
      if (newValue) {
        this.animator.addClass(this.element, 'aurelia-hide');
      } else {
        this.animator.removeClass(this.element, 'aurelia-hide');
      }
    };
    Hide.prototype.bind = function bind(bindingContext) {
      this.valueChanged(this.value);
    };
    var _Hide = Hide;
    Hide = _aureliaDependencyInjection.inject(_aureliaPal.DOM.Element, _aureliaTemplating.Animator)(Hide) || Hide;
    Hide = _aureliaTemplating.customAttribute('hide')(Hide) || Hide;
    return Hide;
  })();
  exports.Hide = Hide;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.1.3/show", ["exports", "npm:aurelia-dependency-injection@1.0.0-beta.1.1.5", "npm:aurelia-templating@1.0.0-beta.1.1.4", "npm:aurelia-pal@1.0.0-beta.1.1.1"], function(exports, _aureliaDependencyInjection, _aureliaTemplating, _aureliaPal) {
  'use strict';
  exports.__esModule = true;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var Show = (function() {
    function Show(element, animator) {
      _classCallCheck(this, _Show);
      this.element = element;
      this.animator = animator;
    }
    Show.prototype.valueChanged = function valueChanged(newValue) {
      if (newValue) {
        this.animator.removeClass(this.element, 'aurelia-hide');
      } else {
        this.animator.addClass(this.element, 'aurelia-hide');
      }
    };
    Show.prototype.bind = function bind(bindingContext) {
      this.valueChanged(this.value);
    };
    var _Show = Show;
    Show = _aureliaDependencyInjection.inject(_aureliaPal.DOM.Element, _aureliaTemplating.Animator)(Show) || Show;
    Show = _aureliaTemplating.customAttribute('show')(Show) || Show;
    return Show;
  })();
  exports.Show = Show;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.1.3/analyze-view-factory", ["exports"], function(exports) {
  'use strict';
  exports.__esModule = true;
  exports.viewsRequireLifecycle = viewsRequireLifecycle;
  var lifecycleOptionalBehaviors = ['focus', 'if', 'repeat', 'show', 'with'];
  exports.lifecycleOptionalBehaviors = lifecycleOptionalBehaviors;
  function behaviorRequiresLifecycle(instruction) {
    var t = instruction.type;
    var name = t.elementName !== null ? t.elementName : t.attributeName;
    if (lifecycleOptionalBehaviors.indexOf(name) === -1) {
      return t.handlesAttached || t.handlesBind || t.handlesCreated || t.handlesDetached || t.handlesUnbind;
    }
    return instruction.viewFactory && viewsRequireLifecycle(instruction.viewFactory);
  }
  function targetRequiresLifecycle(instruction) {
    var behaviors = instruction.behaviorInstructions;
    if (behaviors) {
      var i = behaviors.length;
      while (i--) {
        if (behaviorRequiresLifecycle(behaviors[i])) {
          return true;
        }
      }
    }
    return instruction.viewFactory && viewsRequireLifecycle(instruction.viewFactory);
  }
  function viewsRequireLifecycle(viewFactory) {
    if ('_viewsRequireLifecycle' in viewFactory) {
      return viewFactory._viewsRequireLifecycle;
    }
    if (viewFactory.viewFactory) {
      viewFactory._viewsRequireLifecycle = viewsRequireLifecycle(viewFactory.viewFactory);
      return viewFactory._viewsRequireLifecycle;
    }
    if (viewFactory.template.querySelector('.au-animate')) {
      viewFactory._viewsRequireLifecycle = true;
      return true;
    }
    for (var id in viewFactory.instructions) {
      if (targetRequiresLifecycle(viewFactory.instructions[id])) {
        viewFactory._viewsRequireLifecycle = true;
        return true;
      }
    }
    viewFactory._viewsRequireLifecycle = false;
    return false;
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.1.3/number-repeat-strategy", ["exports", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/repeat-utilities"], function(exports, _repeatUtilities) {
  'use strict';
  exports.__esModule = true;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var NumberRepeatStrategy = (function() {
    function NumberRepeatStrategy() {
      _classCallCheck(this, NumberRepeatStrategy);
    }
    NumberRepeatStrategy.prototype.getCollectionObserver = function getCollectionObserver() {
      return null;
    };
    NumberRepeatStrategy.prototype.instanceChanged = function instanceChanged(repeat, value) {
      var _this = this;
      var removePromise = repeat.viewSlot.removeAll(true);
      if (removePromise instanceof Promise) {
        removePromise.then(function() {
          return _this._standardProcessItems(repeat, value);
        });
        return;
      }
      this._standardProcessItems(repeat, value);
    };
    NumberRepeatStrategy.prototype._standardProcessItems = function _standardProcessItems(repeat, value) {
      var viewFactory = repeat.viewFactory;
      var viewSlot = repeat.viewSlot;
      var childrenLength = viewSlot.children.length;
      var i = undefined;
      var ii = undefined;
      var overrideContext = undefined;
      var view = undefined;
      var viewsToRemove = undefined;
      value = Math.floor(value);
      viewsToRemove = childrenLength - value;
      if (viewsToRemove > 0) {
        if (viewsToRemove > childrenLength) {
          viewsToRemove = childrenLength;
        }
        for (i = 0, ii = viewsToRemove; i < ii; ++i) {
          viewSlot.removeAt(childrenLength - (i + 1), true);
        }
        return;
      }
      for (i = childrenLength, ii = value; i < ii; ++i) {
        overrideContext = _repeatUtilities.createFullOverrideContext(repeat, i, i, ii);
        view = viewFactory.create();
        view.bind(overrideContext.bindingContext, overrideContext);
        viewSlot.add(view);
      }
      _repeatUtilities.updateOverrideContexts(repeat.viewSlot.children, 0);
    };
    return NumberRepeatStrategy;
  })();
  exports.NumberRepeatStrategy = NumberRepeatStrategy;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.1.3/set-repeat-strategy", ["exports", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/repeat-utilities"], function(exports, _repeatUtilities) {
  'use strict';
  exports.__esModule = true;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var SetRepeatStrategy = (function() {
    function SetRepeatStrategy() {
      _classCallCheck(this, SetRepeatStrategy);
    }
    SetRepeatStrategy.prototype.getCollectionObserver = function getCollectionObserver(observerLocator, items) {
      return observerLocator.getSetObserver(items);
    };
    SetRepeatStrategy.prototype.instanceChanged = function instanceChanged(repeat, items) {
      var _this = this;
      var removePromise = repeat.viewSlot.removeAll(true);
      if (removePromise instanceof Promise) {
        removePromise.then(function() {
          return _this._standardProcessItems(repeat, items);
        });
        return;
      }
      this._standardProcessItems(repeat, items);
    };
    SetRepeatStrategy.prototype._standardProcessItems = function _standardProcessItems(repeat, items) {
      var viewFactory = repeat.viewFactory;
      var viewSlot = repeat.viewSlot;
      var index = 0;
      var overrideContext = undefined;
      var view = undefined;
      items.forEach(function(value) {
        overrideContext = _repeatUtilities.createFullOverrideContext(repeat, value, index, items.size);
        view = viewFactory.create();
        view.bind(overrideContext.bindingContext, overrideContext);
        viewSlot.add(view);
        ++index;
      });
    };
    SetRepeatStrategy.prototype.instanceMutated = function instanceMutated(repeat, set, records) {
      var viewSlot = repeat.viewSlot;
      var value = undefined;
      var i = undefined;
      var ii = undefined;
      var view = undefined;
      var overrideContext = undefined;
      var removeIndex = undefined;
      var record = undefined;
      var rmPromises = [];
      var viewOrPromise = undefined;
      for (i = 0, ii = records.length; i < ii; ++i) {
        record = records[i];
        value = record.value;
        switch (record.type) {
          case 'add':
            overrideContext = _repeatUtilities.createFullOverrideContext(repeat, value, set.size - 1, set.size);
            view = repeat.viewFactory.create();
            view.bind(overrideContext.bindingContext, overrideContext);
            viewSlot.insert(set.size - 1, view);
            break;
          case 'delete':
            removeIndex = this._getViewIndexByValue(repeat, value);
            viewOrPromise = viewSlot.removeAt(removeIndex, true);
            if (viewOrPromise instanceof Promise) {
              rmPromises.push(viewOrPromise);
            }
            break;
          case 'clear':
            viewSlot.removeAll(true);
            break;
          default:
            continue;
        }
      }
      if (rmPromises.length > 0) {
        Promise.all(rmPromises).then(function() {
          _repeatUtilities.updateOverrideContexts(repeat.viewSlot.children, 0);
        });
      } else {
        _repeatUtilities.updateOverrideContexts(repeat.viewSlot.children, 0);
      }
    };
    SetRepeatStrategy.prototype._getViewIndexByValue = function _getViewIndexByValue(repeat, value) {
      var viewSlot = repeat.viewSlot;
      var i = undefined;
      var ii = undefined;
      var child = undefined;
      for (i = 0, ii = viewSlot.children.length; i < ii; ++i) {
        child = viewSlot.children[i];
        if (child.bindingContext[repeat.local] === value) {
          return i;
        }
      }
    };
    return SetRepeatStrategy;
  })();
  exports.SetRepeatStrategy = SetRepeatStrategy;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.1.3/map-repeat-strategy", ["exports", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/repeat-utilities"], function(exports, _repeatUtilities) {
  'use strict';
  exports.__esModule = true;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var MapRepeatStrategy = (function() {
    function MapRepeatStrategy() {
      _classCallCheck(this, MapRepeatStrategy);
    }
    MapRepeatStrategy.prototype.getCollectionObserver = function getCollectionObserver(observerLocator, items) {
      return observerLocator.getMapObserver(items);
    };
    MapRepeatStrategy.prototype.instanceChanged = function instanceChanged(repeat, items) {
      var _this = this;
      var removePromise = repeat.viewSlot.removeAll(true);
      if (removePromise instanceof Promise) {
        removePromise.then(function() {
          return _this._standardProcessItems(repeat, items);
        });
        return;
      }
      this._standardProcessItems(repeat, items);
    };
    MapRepeatStrategy.prototype._standardProcessItems = function _standardProcessItems(repeat, items) {
      var viewFactory = repeat.viewFactory;
      var viewSlot = repeat.viewSlot;
      var index = 0;
      var overrideContext = undefined;
      var view = undefined;
      items.forEach(function(value, key) {
        overrideContext = _repeatUtilities.createFullOverrideContext(repeat, value, index, items.size, key);
        view = viewFactory.create();
        view.bind(overrideContext.bindingContext, overrideContext);
        viewSlot.add(view);
        ++index;
      });
    };
    MapRepeatStrategy.prototype.instanceMutated = function instanceMutated(repeat, map, records) {
      var viewSlot = repeat.viewSlot;
      var key = undefined;
      var i = undefined;
      var ii = undefined;
      var view = undefined;
      var overrideContext = undefined;
      var removeIndex = undefined;
      var record = undefined;
      var rmPromises = [];
      var viewOrPromise = undefined;
      for (i = 0, ii = records.length; i < ii; ++i) {
        record = records[i];
        key = record.key;
        switch (record.type) {
          case 'update':
            removeIndex = this._getViewIndexByKey(repeat, key);
            viewOrPromise = viewSlot.removeAt(removeIndex, true);
            if (viewOrPromise instanceof Promise) {
              rmPromises.push(viewOrPromise);
            }
            overrideContext = _repeatUtilities.createFullOverrideContext(repeat, map.get(key), removeIndex, map.size, key);
            view = repeat.viewFactory.create();
            view.bind(overrideContext.bindingContext, overrideContext);
            viewSlot.insert(removeIndex, view);
            break;
          case 'add':
            overrideContext = _repeatUtilities.createFullOverrideContext(repeat, map.get(key), map.size - 1, map.size, key);
            view = repeat.viewFactory.create();
            view.bind(overrideContext.bindingContext, overrideContext);
            viewSlot.insert(map.size - 1, view);
            break;
          case 'delete':
            if (record.oldValue === undefined) {
              return;
            }
            removeIndex = this._getViewIndexByKey(repeat, key);
            viewOrPromise = viewSlot.removeAt(removeIndex, true);
            if (viewOrPromise instanceof Promise) {
              rmPromises.push(viewOrPromise);
            }
            break;
          case 'clear':
            viewSlot.removeAll(true);
            break;
          default:
            continue;
        }
      }
      if (rmPromises.length > 0) {
        Promise.all(rmPromises).then(function() {
          _repeatUtilities.updateOverrideContexts(repeat.viewSlot.children, 0);
        });
      } else {
        _repeatUtilities.updateOverrideContexts(repeat.viewSlot.children, 0);
      }
    };
    MapRepeatStrategy.prototype._getViewIndexByKey = function _getViewIndexByKey(repeat, key) {
      var viewSlot = repeat.viewSlot;
      var i = undefined;
      var ii = undefined;
      var child = undefined;
      for (i = 0, ii = viewSlot.children.length; i < ii; ++i) {
        child = viewSlot.children[i];
        if (child.bindingContext[repeat.key] === key) {
          return i;
        }
      }
    };
    return MapRepeatStrategy;
  })();
  exports.MapRepeatStrategy = MapRepeatStrategy;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.1.3/repeat-utilities", ["exports", "npm:aurelia-binding@1.0.0-beta.1.2.2"], function(exports, _aureliaBinding) {
  'use strict';
  exports.__esModule = true;
  exports.updateOverrideContexts = updateOverrideContexts;
  exports.createFullOverrideContext = createFullOverrideContext;
  exports.updateOverrideContext = updateOverrideContext;
  exports.getItemsSourceExpression = getItemsSourceExpression;
  exports.unwrapExpression = unwrapExpression;
  exports.isOneTime = isOneTime;
  exports.updateOneTimeBinding = updateOneTimeBinding;
  var oneTime = _aureliaBinding.bindingMode.oneTime;
  function updateOverrideContexts(views, startIndex) {
    var length = views.length;
    if (startIndex > 0) {
      startIndex = startIndex - 1;
    }
    for (; startIndex < length; ++startIndex) {
      updateOverrideContext(views[startIndex].overrideContext, startIndex, length);
    }
  }
  function createFullOverrideContext(repeat, data, index, length, key) {
    var bindingContext = {};
    var overrideContext = _aureliaBinding.createOverrideContext(bindingContext, repeat.scope.overrideContext);
    if (typeof key !== 'undefined') {
      bindingContext[repeat.key] = key;
      bindingContext[repeat.value] = data;
    } else {
      bindingContext[repeat.local] = data;
    }
    updateOverrideContext(overrideContext, index, length);
    return overrideContext;
  }
  function updateOverrideContext(overrideContext, index, length) {
    var first = index === 0;
    var last = index === length - 1;
    var even = index % 2 === 0;
    overrideContext.$index = index;
    overrideContext.$first = first;
    overrideContext.$last = last;
    overrideContext.$middle = !(first || last);
    overrideContext.$odd = !even;
    overrideContext.$even = even;
  }
  function getItemsSourceExpression(instruction, attrName) {
    return instruction.behaviorInstructions.filter(function(bi) {
      return bi.originalAttrName === attrName;
    })[0].attributes.items.sourceExpression;
  }
  function unwrapExpression(expression) {
    var unwrapped = false;
    while (expression instanceof _aureliaBinding.BindingBehavior) {
      expression = expression.expression;
    }
    while (expression instanceof _aureliaBinding.ValueConverter) {
      expression = expression.expression;
      unwrapped = true;
    }
    return unwrapped ? expression : null;
  }
  function isOneTime(expression) {
    while (expression instanceof _aureliaBinding.BindingBehavior) {
      if (expression.name === 'oneTime') {
        return true;
      }
      expression = expression.expression;
    }
    return false;
  }
  function updateOneTimeBinding(binding) {
    if (binding.call && binding.mode === oneTime) {
      binding.call(_aureliaBinding.sourceContext);
    } else if (binding.updateOneTimeBindings) {
      binding.updateOneTimeBindings();
    }
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.1.3/array-repeat-strategy", ["exports", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/repeat-utilities", "npm:aurelia-binding@1.0.0-beta.1.2.2"], function(exports, _repeatUtilities, _aureliaBinding) {
  'use strict';
  exports.__esModule = true;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var ArrayRepeatStrategy = (function() {
    function ArrayRepeatStrategy() {
      _classCallCheck(this, ArrayRepeatStrategy);
    }
    ArrayRepeatStrategy.prototype.getCollectionObserver = function getCollectionObserver(observerLocator, items) {
      return observerLocator.getArrayObserver(items);
    };
    ArrayRepeatStrategy.prototype.instanceChanged = function instanceChanged(repeat, items) {
      var _this = this;
      if (repeat.viewsRequireLifecycle) {
        var removePromise = repeat.viewSlot.removeAll(true);
        if (removePromise instanceof Promise) {
          removePromise.then(function() {
            return _this._standardProcessInstanceChanged(repeat, items);
          });
          return;
        }
        this._standardProcessInstanceChanged(repeat, items);
        return;
      }
      this._inPlaceProcessItems(repeat, items);
    };
    ArrayRepeatStrategy.prototype._standardProcessInstanceChanged = function _standardProcessInstanceChanged(repeat, items) {
      for (var i = 0,
          ii = items.length; i < ii; i++) {
        var overrideContext = _repeatUtilities.createFullOverrideContext(repeat, items[i], i, ii);
        var view = repeat.viewFactory.create();
        view.bind(overrideContext.bindingContext, overrideContext);
        repeat.viewSlot.add(view);
      }
    };
    ArrayRepeatStrategy.prototype._inPlaceProcessItems = function _inPlaceProcessItems(repeat, items) {
      var itemsLength = items.length;
      var viewsLength = repeat.viewSlot.children.length;
      while (viewsLength > itemsLength) {
        viewsLength--;
        repeat.viewSlot.removeAt(viewsLength, true);
      }
      var local = repeat.local;
      for (var i = 0; i < viewsLength; i++) {
        var view = repeat.viewSlot.children[i];
        var last = i === itemsLength - 1;
        var middle = i !== 0 && !last;
        if (view.bindingContext[local] === items[i] && view.overrideContext.$middle === middle && view.overrideContext.$last === last) {
          continue;
        }
        view.bindingContext[local] = items[i];
        view.overrideContext.$middle = middle;
        view.overrideContext.$last = last;
        var j = view.bindings.length;
        while (j--) {
          _repeatUtilities.updateOneTimeBinding(view.bindings[j]);
        }
        j = view.controllers.length;
        while (j--) {
          var k = view.controllers[j].boundProperties.length;
          while (k--) {
            var binding = view.controllers[j].boundProperties[k].binding;
            _repeatUtilities.updateOneTimeBinding(binding);
          }
        }
      }
      for (var i = viewsLength; i < itemsLength; i++) {
        var overrideContext = _repeatUtilities.createFullOverrideContext(repeat, items[i], i, itemsLength);
        var view = repeat.viewFactory.create();
        view.bind(overrideContext.bindingContext, overrideContext);
        repeat.viewSlot.add(view);
      }
    };
    ArrayRepeatStrategy.prototype.instanceMutated = function instanceMutated(repeat, array, splices) {
      if (repeat.viewsRequireLifecycle) {
        this._standardProcessInstanceMutated(repeat, array, splices);
        return;
      }
      this._inPlaceProcessItems(repeat, array);
    };
    ArrayRepeatStrategy.prototype._standardProcessInstanceMutated = function _standardProcessInstanceMutated(repeat, array, splices) {
      var _this2 = this;
      if (repeat.__queuedSplices) {
        for (var i = 0,
            ii = splices.length; i < ii; ++i) {
          var _splices$i = splices[i];
          var index = _splices$i.index;
          var removed = _splices$i.removed;
          var addedCount = _splices$i.addedCount;
          _aureliaBinding.mergeSplice(repeat.__queuedSplices, index, removed, addedCount);
        }
        repeat.__array = array.slice(0);
        return;
      }
      var maybePromise = this._runSplices(repeat, array.slice(0), splices);
      if (maybePromise instanceof Promise) {
        (function() {
          var queuedSplices = repeat.__queuedSplices = [];
          var runQueuedSplices = function runQueuedSplices() {
            if (!queuedSplices.length) {
              delete repeat.__queuedSplices;
              delete repeat.__array;
              return;
            }
            var nextPromise = _this2._runSplices(repeat, repeat.__array, queuedSplices) || Promise.resolve();
            queuedSplices = repeat.__queuedSplices = [];
            nextPromise.then(runQueuedSplices);
          };
          maybePromise.then(runQueuedSplices);
        })();
      }
    };
    ArrayRepeatStrategy.prototype._runSplices = function _runSplices(repeat, array, splices) {
      var _this3 = this;
      var removeDelta = 0;
      var viewSlot = repeat.viewSlot;
      var rmPromises = [];
      for (var i = 0,
          ii = splices.length; i < ii; ++i) {
        var splice = splices[i];
        var removed = splice.removed;
        for (var j = 0,
            jj = removed.length; j < jj; ++j) {
          var viewOrPromise = viewSlot.removeAt(splice.index + removeDelta + rmPromises.length, true);
          if (viewOrPromise instanceof Promise) {
            rmPromises.push(viewOrPromise);
          }
        }
        removeDelta -= splice.addedCount;
      }
      if (rmPromises.length > 0) {
        return Promise.all(rmPromises).then(function() {
          var spliceIndexLow = _this3._handleAddedSplices(repeat, array, splices);
          _repeatUtilities.updateOverrideContexts(repeat.viewSlot.children, spliceIndexLow);
        });
      }
      var spliceIndexLow = this._handleAddedSplices(repeat, array, splices);
      _repeatUtilities.updateOverrideContexts(repeat.viewSlot.children, spliceIndexLow);
    };
    ArrayRepeatStrategy.prototype._handleAddedSplices = function _handleAddedSplices(repeat, array, splices) {
      var spliceIndex = undefined;
      var spliceIndexLow = undefined;
      var arrayLength = array.length;
      for (var i = 0,
          ii = splices.length; i < ii; ++i) {
        var splice = splices[i];
        var addIndex = spliceIndex = splice.index;
        var end = splice.index + splice.addedCount;
        if (typeof spliceIndexLow === 'undefined' || spliceIndexLow === null || spliceIndexLow > splice.index) {
          spliceIndexLow = spliceIndex;
        }
        for (; addIndex < end; ++addIndex) {
          var overrideContext = _repeatUtilities.createFullOverrideContext(repeat, array[addIndex], addIndex, arrayLength);
          var view = repeat.viewFactory.create();
          view.bind(overrideContext.bindingContext, overrideContext);
          repeat.viewSlot.insert(addIndex, view);
        }
      }
      return spliceIndexLow;
    };
    return ArrayRepeatStrategy;
  })();
  exports.ArrayRepeatStrategy = ArrayRepeatStrategy;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.1.3/null-repeat-strategy", ["exports"], function(exports) {
  "use strict";
  exports.__esModule = true;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var NullRepeatStrategy = (function() {
    function NullRepeatStrategy() {
      _classCallCheck(this, NullRepeatStrategy);
    }
    NullRepeatStrategy.prototype.instanceChanged = function instanceChanged(repeat, items) {
      repeat.viewSlot.removeAll(true);
    };
    NullRepeatStrategy.prototype.getCollectionObserver = function getCollectionObserver(observerLocator, items) {};
    return NullRepeatStrategy;
  })();
  exports.NullRepeatStrategy = NullRepeatStrategy;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.1.3/repeat-strategy-locator", ["exports", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/null-repeat-strategy", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/array-repeat-strategy", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/map-repeat-strategy", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/set-repeat-strategy", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/number-repeat-strategy"], function(exports, _nullRepeatStrategy, _arrayRepeatStrategy, _mapRepeatStrategy, _setRepeatStrategy, _numberRepeatStrategy) {
  'use strict';
  exports.__esModule = true;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var RepeatStrategyLocator = (function() {
    function RepeatStrategyLocator() {
      _classCallCheck(this, RepeatStrategyLocator);
      this.matchers = [];
      this.strategies = [];
      this.addStrategy(function(items) {
        return items === null || items === undefined;
      }, new _nullRepeatStrategy.NullRepeatStrategy());
      this.addStrategy(function(items) {
        return items instanceof Array;
      }, new _arrayRepeatStrategy.ArrayRepeatStrategy());
      this.addStrategy(function(items) {
        return items instanceof Map;
      }, new _mapRepeatStrategy.MapRepeatStrategy());
      this.addStrategy(function(items) {
        return items instanceof Set;
      }, new _setRepeatStrategy.SetRepeatStrategy());
      this.addStrategy(function(items) {
        return typeof items === 'number';
      }, new _numberRepeatStrategy.NumberRepeatStrategy());
    }
    RepeatStrategyLocator.prototype.addStrategy = function addStrategy(matcher, strategy) {
      this.matchers.push(matcher);
      this.strategies.push(strategy);
    };
    RepeatStrategyLocator.prototype.getStrategy = function getStrategy(items) {
      var matchers = this.matchers;
      for (var i = 0,
          ii = matchers.length; i < ii; ++i) {
        if (matchers[i](items)) {
          return this.strategies[i];
        }
      }
      return null;
    };
    return RepeatStrategyLocator;
  })();
  exports.RepeatStrategyLocator = RepeatStrategyLocator;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.1.3/repeat", ["exports", "npm:aurelia-dependency-injection@1.0.0-beta.1.1.5", "npm:aurelia-binding@1.0.0-beta.1.2.2", "npm:aurelia-templating@1.0.0-beta.1.1.4", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/repeat-strategy-locator", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/repeat-utilities", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/analyze-view-factory"], function(exports, _aureliaDependencyInjection, _aureliaBinding, _aureliaTemplating, _repeatStrategyLocator, _repeatUtilities, _analyzeViewFactory) {
  'use strict';
  exports.__esModule = true;
  var _createDecoratedClass = (function() {
    function defineProperties(target, descriptors, initializers) {
      for (var i = 0; i < descriptors.length; i++) {
        var descriptor = descriptors[i];
        var decorators = descriptor.decorators;
        var key = descriptor.key;
        delete descriptor.key;
        delete descriptor.decorators;
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor || descriptor.initializer)
          descriptor.writable = true;
        if (decorators) {
          for (var f = 0; f < decorators.length; f++) {
            var decorator = decorators[f];
            if (typeof decorator === 'function') {
              descriptor = decorator(target, key, descriptor) || descriptor;
            } else {
              throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator);
            }
          }
          if (descriptor.initializer !== undefined) {
            initializers[key] = descriptor;
            continue;
          }
        }
        Object.defineProperty(target, key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps, protoInitializers, staticInitializers) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps, protoInitializers);
      if (staticProps)
        defineProperties(Constructor, staticProps, staticInitializers);
      return Constructor;
    };
  })();
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function _defineDecoratedPropertyDescriptor(target, key, descriptors) {
    var _descriptor = descriptors[key];
    if (!_descriptor)
      return;
    var descriptor = {};
    for (var _key in _descriptor)
      descriptor[_key] = _descriptor[_key];
    descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined;
    Object.defineProperty(target, key, descriptor);
  }
  var Repeat = (function() {
    var _instanceInitializers = {};
    _createDecoratedClass(Repeat, [{
      key: 'items',
      decorators: [_aureliaTemplating.bindable],
      initializer: null,
      enumerable: true
    }, {
      key: 'local',
      decorators: [_aureliaTemplating.bindable],
      initializer: null,
      enumerable: true
    }, {
      key: 'key',
      decorators: [_aureliaTemplating.bindable],
      initializer: null,
      enumerable: true
    }, {
      key: 'value',
      decorators: [_aureliaTemplating.bindable],
      initializer: null,
      enumerable: true
    }], null, _instanceInitializers);
    function Repeat(viewFactory, instruction, viewSlot, viewResources, observerLocator, strategyLocator) {
      _classCallCheck(this, _Repeat);
      _defineDecoratedPropertyDescriptor(this, 'items', _instanceInitializers);
      _defineDecoratedPropertyDescriptor(this, 'local', _instanceInitializers);
      _defineDecoratedPropertyDescriptor(this, 'key', _instanceInitializers);
      _defineDecoratedPropertyDescriptor(this, 'value', _instanceInitializers);
      this.viewFactory = viewFactory;
      this.instruction = instruction;
      this.viewSlot = viewSlot;
      this.lookupFunctions = viewResources.lookupFunctions;
      this.observerLocator = observerLocator;
      this.local = 'item';
      this.key = 'key';
      this.value = 'value';
      this.strategyLocator = strategyLocator;
      this.ignoreMutation = false;
      this.sourceExpression = _repeatUtilities.getItemsSourceExpression(this.instruction, 'repeat.for');
      this.isOneTime = _repeatUtilities.isOneTime(this.sourceExpression);
      this.viewsRequireLifecycle = _analyzeViewFactory.viewsRequireLifecycle(viewFactory);
    }
    Repeat.prototype.call = function call(context, changes) {
      this[context](this.items, changes);
    };
    Repeat.prototype.bind = function bind(bindingContext, overrideContext) {
      this.scope = {
        bindingContext: bindingContext,
        overrideContext: overrideContext
      };
      this.itemsChanged();
    };
    Repeat.prototype.unbind = function unbind() {
      this.scope = null;
      this.items = null;
      this.viewSlot.removeAll(true);
      this._unsubscribeCollection();
    };
    Repeat.prototype._unsubscribeCollection = function _unsubscribeCollection() {
      if (this.collectionObserver) {
        this.collectionObserver.unsubscribe(this.callContext, this);
        this.collectionObserver = null;
        this.callContext = null;
      }
    };
    Repeat.prototype.itemsChanged = function itemsChanged() {
      this._unsubscribeCollection();
      if (!this.scope) {
        return;
      }
      var items = this.items;
      this.strategy = this.strategyLocator.getStrategy(items);
      if (!this.isOneTime && !this._observeInnerCollection()) {
        this._observeCollection();
      }
      this.strategy.instanceChanged(this, items);
    };
    Repeat.prototype._getInnerCollection = function _getInnerCollection() {
      var expression = _repeatUtilities.unwrapExpression(this.sourceExpression);
      if (!expression) {
        return null;
      }
      return expression.evaluate(this.scope, null);
    };
    Repeat.prototype.handleCollectionMutated = function handleCollectionMutated(collection, changes) {
      this.strategy.instanceMutated(this, collection, changes);
    };
    Repeat.prototype.handleInnerCollectionMutated = function handleInnerCollectionMutated(collection, changes) {
      var _this = this;
      if (this.ignoreMutation) {
        return;
      }
      this.ignoreMutation = true;
      var newItems = this.sourceExpression.evaluate(this.scope, this.lookupFunctions);
      this.observerLocator.taskQueue.queueMicroTask(function() {
        return _this.ignoreMutation = false;
      });
      if (newItems === this.items) {
        this.itemsChanged();
      } else {
        this.items = newItems;
      }
    };
    Repeat.prototype._observeInnerCollection = function _observeInnerCollection() {
      var items = this._getInnerCollection();
      var strategy = this.strategyLocator.getStrategy(items);
      if (!strategy) {
        return false;
      }
      this.collectionObserver = strategy.getCollectionObserver(this.observerLocator, items);
      if (!this.collectionObserver) {
        return false;
      }
      this.callContext = 'handleInnerCollectionMutated';
      this.collectionObserver.subscribe(this.callContext, this);
      return true;
    };
    Repeat.prototype._observeCollection = function _observeCollection() {
      var items = this.items;
      this.collectionObserver = this.strategy.getCollectionObserver(this.observerLocator, items);
      if (this.collectionObserver) {
        this.callContext = 'handleCollectionMutated';
        this.collectionObserver.subscribe(this.callContext, this);
      }
    };
    var _Repeat = Repeat;
    Repeat = _aureliaDependencyInjection.inject(_aureliaTemplating.BoundViewFactory, _aureliaTemplating.TargetInstruction, _aureliaTemplating.ViewSlot, _aureliaTemplating.ViewResources, _aureliaBinding.ObserverLocator, _repeatStrategyLocator.RepeatStrategyLocator)(Repeat) || Repeat;
    Repeat = _aureliaTemplating.templateController(Repeat) || Repeat;
    Repeat = _aureliaTemplating.customAttribute('repeat')(Repeat) || Repeat;
    return Repeat;
  })();
  exports.Repeat = Repeat;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.1.3/with", ["exports", "npm:aurelia-dependency-injection@1.0.0-beta.1.1.5", "npm:aurelia-templating@1.0.0-beta.1.1.4", "npm:aurelia-binding@1.0.0-beta.1.2.2"], function(exports, _aureliaDependencyInjection, _aureliaTemplating, _aureliaBinding) {
  'use strict';
  exports.__esModule = true;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var With = (function() {
    function With(viewFactory, viewSlot) {
      _classCallCheck(this, _With);
      this.viewFactory = viewFactory;
      this.viewSlot = viewSlot;
      this.parentOverrideContext = null;
      this.view = null;
    }
    With.prototype.bind = function bind(bindingContext, overrideContext) {
      this.parentOverrideContext = overrideContext;
      this.valueChanged(this.value);
    };
    With.prototype.valueChanged = function valueChanged(newValue) {
      var overrideContext = _aureliaBinding.createOverrideContext(newValue, this.parentOverrideContext);
      if (!this.view) {
        this.view = this.viewFactory.create();
        this.view.bind(newValue, overrideContext);
        this.viewSlot.add(this.view);
      } else {
        this.view.bind(newValue, overrideContext);
      }
    };
    With.prototype.unbind = function unbind() {
      this.parentOverrideContext = null;
      if (this.view) {
        this.view.unbind();
      }
    };
    var _With = With;
    With = _aureliaDependencyInjection.inject(_aureliaTemplating.BoundViewFactory, _aureliaTemplating.ViewSlot)(With) || With;
    With = _aureliaTemplating.templateController(With) || With;
    With = _aureliaTemplating.customAttribute('with')(With) || With;
    return With;
  })();
  exports.With = With;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.1.3/if", ["exports", "npm:aurelia-templating@1.0.0-beta.1.1.4", "npm:aurelia-dependency-injection@1.0.0-beta.1.1.5", "npm:aurelia-task-queue@1.0.0-beta.1.1.1"], function(exports, _aureliaTemplating, _aureliaDependencyInjection, _aureliaTaskQueue) {
  'use strict';
  exports.__esModule = true;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var If = (function() {
    function If(viewFactory, viewSlot, taskQueue) {
      _classCallCheck(this, _If);
      this.viewFactory = viewFactory;
      this.viewSlot = viewSlot;
      this.showing = false;
      this.taskQueue = taskQueue;
      this.view = null;
      this.bindingContext = null;
      this.overrideContext = null;
    }
    If.prototype.bind = function bind(bindingContext, overrideContext) {
      this.bindingContext = bindingContext;
      this.overrideContext = overrideContext;
      this.valueChanged(this.value);
    };
    If.prototype.valueChanged = function valueChanged(newValue) {
      var _this = this;
      if (!newValue) {
        if (this.view !== null && this.showing) {
          this.taskQueue.queueMicroTask(function() {
            var viewOrPromise = _this.viewSlot.remove(_this.view);
            if (viewOrPromise instanceof Promise) {
              viewOrPromise.then(function() {
                return _this.view.unbind();
              });
            } else {
              _this.view.unbind();
            }
          });
        }
        this.showing = false;
        return;
      }
      if (this.view === null) {
        this.view = this.viewFactory.create();
      }
      if (!this.view.isBound) {
        this.view.bind(this.bindingContext, this.overrideContext);
      }
      if (!this.showing) {
        this.showing = true;
        this.viewSlot.add(this.view);
      }
    };
    If.prototype.unbind = function unbind() {
      if (this.view === null) {
        return;
      }
      this.view.unbind();
      if (!this.viewFactory.isCaching) {
        return;
      }
      if (this.showing) {
        this.showing = false;
        this.viewSlot.remove(this.view, true, true);
      }
      this.view.returnToCache();
      this.view = null;
    };
    var _If = If;
    If = _aureliaDependencyInjection.inject(_aureliaTemplating.BoundViewFactory, _aureliaTemplating.ViewSlot, _aureliaTaskQueue.TaskQueue)(If) || If;
    If = _aureliaTemplating.templateController(If) || If;
    If = _aureliaTemplating.customAttribute('if')(If) || If;
    return If;
  })();
  exports.If = If;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.1.3/compose", ["exports", "npm:aurelia-dependency-injection@1.0.0-beta.1.1.5", "npm:aurelia-task-queue@1.0.0-beta.1.1.1", "npm:aurelia-templating@1.0.0-beta.1.1.4", "npm:aurelia-pal@1.0.0-beta.1.1.1"], function(exports, _aureliaDependencyInjection, _aureliaTaskQueue, _aureliaTemplating, _aureliaPal) {
  'use strict';
  exports.__esModule = true;
  var _createDecoratedClass = (function() {
    function defineProperties(target, descriptors, initializers) {
      for (var i = 0; i < descriptors.length; i++) {
        var descriptor = descriptors[i];
        var decorators = descriptor.decorators;
        var key = descriptor.key;
        delete descriptor.key;
        delete descriptor.decorators;
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor || descriptor.initializer)
          descriptor.writable = true;
        if (decorators) {
          for (var f = 0; f < decorators.length; f++) {
            var decorator = decorators[f];
            if (typeof decorator === 'function') {
              descriptor = decorator(target, key, descriptor) || descriptor;
            } else {
              throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator);
            }
          }
          if (descriptor.initializer !== undefined) {
            initializers[key] = descriptor;
            continue;
          }
        }
        Object.defineProperty(target, key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps, protoInitializers, staticInitializers) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps, protoInitializers);
      if (staticProps)
        defineProperties(Constructor, staticProps, staticInitializers);
      return Constructor;
    };
  })();
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function _defineDecoratedPropertyDescriptor(target, key, descriptors) {
    var _descriptor = descriptors[key];
    if (!_descriptor)
      return;
    var descriptor = {};
    for (var _key in _descriptor)
      descriptor[_key] = _descriptor[_key];
    descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined;
    Object.defineProperty(target, key, descriptor);
  }
  var Compose = (function() {
    var _instanceInitializers = {};
    _createDecoratedClass(Compose, [{
      key: 'model',
      decorators: [_aureliaTemplating.bindable],
      initializer: null,
      enumerable: true
    }, {
      key: 'view',
      decorators: [_aureliaTemplating.bindable],
      initializer: null,
      enumerable: true
    }, {
      key: 'viewModel',
      decorators: [_aureliaTemplating.bindable],
      initializer: null,
      enumerable: true
    }], null, _instanceInitializers);
    function Compose(element, container, compositionEngine, viewSlot, viewResources, taskQueue) {
      _classCallCheck(this, _Compose);
      _defineDecoratedPropertyDescriptor(this, 'model', _instanceInitializers);
      _defineDecoratedPropertyDescriptor(this, 'view', _instanceInitializers);
      _defineDecoratedPropertyDescriptor(this, 'viewModel', _instanceInitializers);
      this.element = element;
      this.container = container;
      this.compositionEngine = compositionEngine;
      this.viewSlot = viewSlot;
      this.viewResources = viewResources;
      this.taskQueue = taskQueue;
      this.currentController = null;
      this.currentViewModel = null;
    }
    Compose.prototype.created = function created(owningView) {
      this.owningView = owningView;
    };
    Compose.prototype.bind = function bind(bindingContext, overrideContext) {
      this.bindingContext = bindingContext;
      this.overrideContext = overrideContext;
      processInstruction(this, createInstruction(this, {
        view: this.view,
        viewModel: this.viewModel,
        model: this.model
      }));
    };
    Compose.prototype.unbind = function unbind(bindingContext, overrideContext) {
      this.bindingContext = null;
      this.overrideContext = null;
      var returnToCache = true;
      var skipAnimation = true;
      this.viewSlot.removeAll(returnToCache, skipAnimation);
    };
    Compose.prototype.modelChanged = function modelChanged(newValue, oldValue) {
      var _this = this;
      if (this.currentInstruction) {
        this.currentInstruction.model = newValue;
        return;
      }
      this.taskQueue.queueMicroTask(function() {
        if (_this.currentInstruction) {
          _this.currentInstruction.model = newValue;
          return;
        }
        var vm = _this.currentViewModel;
        if (vm && typeof vm.activate === 'function') {
          vm.activate(newValue);
        }
      });
    };
    Compose.prototype.viewChanged = function viewChanged(newValue, oldValue) {
      var _this2 = this;
      var instruction = createInstruction(this, {
        view: newValue,
        viewModel: this.currentViewModel || this.viewModel,
        model: this.model
      });
      if (this.currentInstruction) {
        this.currentInstruction = instruction;
        return;
      }
      this.currentInstruction = instruction;
      this.taskQueue.queueMicroTask(function() {
        return processInstruction(_this2, _this2.currentInstruction);
      });
    };
    Compose.prototype.viewModelChanged = function viewModelChanged(newValue, oldValue) {
      var _this3 = this;
      var instruction = createInstruction(this, {
        viewModel: newValue,
        view: this.view,
        model: this.model
      });
      if (this.currentInstruction) {
        this.currentInstruction = instruction;
        return;
      }
      this.currentInstruction = instruction;
      this.taskQueue.queueMicroTask(function() {
        return processInstruction(_this3, _this3.currentInstruction);
      });
    };
    var _Compose = Compose;
    Compose = _aureliaDependencyInjection.inject(_aureliaPal.DOM.Element, _aureliaDependencyInjection.Container, _aureliaTemplating.CompositionEngine, _aureliaTemplating.ViewSlot, _aureliaTemplating.ViewResources, _aureliaTaskQueue.TaskQueue)(Compose) || Compose;
    Compose = _aureliaTemplating.noView(Compose) || Compose;
    Compose = _aureliaTemplating.customElement('compose')(Compose) || Compose;
    return Compose;
  })();
  exports.Compose = Compose;
  function createInstruction(composer, instruction) {
    return Object.assign(instruction, {
      bindingContext: composer.bindingContext,
      overrideContext: composer.overrideContext,
      owningView: composer.owningView,
      container: composer.container,
      viewSlot: composer.viewSlot,
      viewResources: composer.viewResources,
      currentController: composer.currentController,
      host: composer.element
    });
  }
  function processInstruction(composer, instruction) {
    composer.currentInstruction = null;
    composer.compositionEngine.compose(instruction).then(function(controller) {
      composer.currentController = controller;
      composer.currentViewModel = controller ? controller.viewModel : null;
    });
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.1.3/aurelia-templating-resources", ["exports", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/compose", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/if", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/with", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/repeat", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/show", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/hide", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/sanitize-html", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/replaceable", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/focus", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/compile-spy", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/view-spy", "npm:aurelia-templating@1.0.0-beta.1.1.4", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/dynamic-element", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/css-resource", "npm:aurelia-pal@1.0.0-beta.1.1.1", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/html-sanitizer", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/binding-mode-behaviors", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/throttle-binding-behavior", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/debounce-binding-behavior", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/signal-binding-behavior", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/binding-signaler", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3/update-trigger-binding-behavior"], function(exports, _compose, _if, _with, _repeat, _show, _hide, _sanitizeHtml, _replaceable, _focus, _compileSpy, _viewSpy, _aureliaTemplating, _dynamicElement, _cssResource, _aureliaPal, _htmlSanitizer, _bindingModeBehaviors, _throttleBindingBehavior, _debounceBindingBehavior, _signalBindingBehavior, _bindingSignaler, _updateTriggerBindingBehavior) {
  'use strict';
  exports.__esModule = true;
  function configure(config) {
    if (_aureliaPal.FEATURE.shadowDOM) {
      _aureliaPal.DOM.injectStyles('body /deep/ .aurelia-hide { display:none !important; }');
    } else {
      _aureliaPal.DOM.injectStyles('.aurelia-hide { display:none !important; }');
    }
    config.globalResources('./compose', './if', './with', './repeat', './show', './hide', './replaceable', './sanitize-html', './focus', './compile-spy', './view-spy', './binding-mode-behaviors', './throttle-binding-behavior', './debounce-binding-behavior', './signal-binding-behavior', './update-trigger-binding-behavior');
    var viewEngine = config.container.get(_aureliaTemplating.ViewEngine);
    var loader = config.aurelia.loader;
    viewEngine.addResourcePlugin('.html', {'fetch': function fetch(address) {
        return loader.loadTemplate(address).then(function(registryEntry) {
          var _ref;
          var bindable = registryEntry.template.getAttribute('bindable');
          var elementName = address.replace('.html', '');
          var index = elementName.lastIndexOf('/');
          if (index !== 0) {
            elementName = elementName.substring(index + 1);
          }
          if (bindable) {
            bindable = bindable.split(',').map(function(x) {
              return x.trim();
            });
            registryEntry.template.removeAttribute('bindable');
          } else {
            bindable = [];
          }
          return _ref = {}, _ref[elementName] = _dynamicElement._createDynamicElement(elementName, address, bindable), _ref;
        });
      }});
    viewEngine.addResourcePlugin('.css', {'fetch': function fetch(address) {
        var _ref2;
        return _ref2 = {}, _ref2[address] = _cssResource._createCSSResource(address), _ref2;
      }});
  }
  exports.Compose = _compose.Compose;
  exports.If = _if.If;
  exports.With = _with.With;
  exports.Repeat = _repeat.Repeat;
  exports.Show = _show.Show;
  exports.Hide = _hide.Hide;
  exports.HTMLSanitizer = _htmlSanitizer.HTMLSanitizer;
  exports.SanitizeHTMLValueConverter = _sanitizeHtml.SanitizeHTMLValueConverter;
  exports.Replaceable = _replaceable.Replaceable;
  exports.Focus = _focus.Focus;
  exports.CompileSpy = _compileSpy.CompileSpy;
  exports.ViewSpy = _viewSpy.ViewSpy;
  exports.configure = configure;
  exports.OneTimeBindingBehavior = _bindingModeBehaviors.OneTimeBindingBehavior;
  exports.OneWayBindingBehavior = _bindingModeBehaviors.OneWayBindingBehavior;
  exports.TwoWayBindingBehavior = _bindingModeBehaviors.TwoWayBindingBehavior;
  exports.ThrottleBindingBehavior = _throttleBindingBehavior.ThrottleBindingBehavior;
  exports.DebounceBindingBehavior = _debounceBindingBehavior.DebounceBindingBehavior;
  exports.SignalBindingBehavior = _signalBindingBehavior.SignalBindingBehavior;
  exports.BindingSignaler = _bindingSignaler.BindingSignaler;
  exports.UpdateTriggerBindingBehavior = _updateTriggerBindingBehavior.UpdateTriggerBindingBehavior;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-resources@1.0.0-beta.1.1.3", ["npm:aurelia-templating-resources@1.0.0-beta.1.1.3/aurelia-templating-resources"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-binding@1.0.0-beta.1.1.2/aurelia-templating-binding", ["exports", "npm:aurelia-logging@1.0.0-beta.1.1.2", "npm:aurelia-binding@1.0.0-beta.1.2.2", "npm:aurelia-templating@1.0.0-beta.1.1.4"], function(exports, _aureliaLogging, _aureliaBinding, _aureliaTemplating) {
  'use strict';
  exports.__esModule = true;
  exports.configure = configure;
  function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var InterpolationBindingExpression = (function() {
    function InterpolationBindingExpression(observerLocator, targetProperty, parts, mode, lookupFunctions, attribute) {
      _classCallCheck(this, InterpolationBindingExpression);
      this.observerLocator = observerLocator;
      this.targetProperty = targetProperty;
      this.parts = parts;
      this.mode = mode;
      this.lookupFunctions = lookupFunctions;
      this.attribute = this.attrToRemove = attribute;
      this.discrete = false;
    }
    InterpolationBindingExpression.prototype.createBinding = function createBinding(target) {
      if (this.parts.length === 3) {
        return new ChildInterpolationBinding(target, this.observerLocator, this.parts[1], this.mode, this.lookupFunctions, this.targetProperty, this.parts[0], this.parts[2]);
      }
      return new InterpolationBinding(this.observerLocator, this.parts, target, this.targetProperty, this.mode, this.lookupFunctions);
    };
    return InterpolationBindingExpression;
  })();
  exports.InterpolationBindingExpression = InterpolationBindingExpression;
  function validateTarget(target, propertyName) {
    if (propertyName === 'style') {
      _aureliaLogging.getLogger('templating-binding').info('Internet Explorer does not support interpolation in "style" attributes.  Use the style attribute\'s alias, "css" instead.');
    } else if (target.parentElement && target.parentElement.nodeName === 'TEXTAREA' && propertyName === 'textContent') {
      throw new Error('Interpolation binding cannot be used in the content of a textarea element.  Use <textarea value.bind="expression"></textarea> instead.');
    }
  }
  var InterpolationBinding = (function() {
    function InterpolationBinding(observerLocator, parts, target, targetProperty, mode, lookupFunctions) {
      _classCallCheck(this, InterpolationBinding);
      validateTarget(target, targetProperty);
      this.observerLocator = observerLocator;
      this.parts = parts;
      this.target = target;
      this.targetProperty = targetProperty;
      this.targetAccessor = observerLocator.getAccessor(target, targetProperty);
      this.mode = mode;
      this.lookupFunctions = lookupFunctions;
    }
    InterpolationBinding.prototype.interpolate = function interpolate() {
      if (this.isBound) {
        var value = '';
        var parts = this.parts;
        for (var i = 0,
            ii = parts.length; i < ii; i++) {
          value += i % 2 === 0 ? parts[i] : this['childBinding' + i].value;
        }
        this.targetAccessor.setValue(value, this.target, this.targetProperty);
      }
    };
    InterpolationBinding.prototype.updateOneTimeBindings = function updateOneTimeBindings() {
      for (var i = 1,
          ii = this.parts.length; i < ii; i += 2) {
        var child = this['childBinding' + i];
        if (child.mode === _aureliaBinding.bindingMode.oneTime) {
          child.call();
        }
      }
    };
    InterpolationBinding.prototype.bind = function bind(source) {
      if (this.isBound) {
        if (this.source === source) {
          return;
        }
        this.unbind();
      }
      this.source = source;
      var parts = this.parts;
      for (var i = 1,
          ii = parts.length; i < ii; i += 2) {
        var binding = new ChildInterpolationBinding(this, this.observerLocator, parts[i], this.mode, this.lookupFunctions);
        binding.bind(source);
        this['childBinding' + i] = binding;
      }
      this.isBound = true;
      this.interpolate();
    };
    InterpolationBinding.prototype.unbind = function unbind() {
      if (!this.isBound) {
        return;
      }
      this.isBound = false;
      this.source = null;
      var parts = this.parts;
      for (var i = 1,
          ii = parts.length; i < ii; i += 2) {
        var _name = 'childBinding' + i;
        this[_name].unbind();
      }
    };
    return InterpolationBinding;
  })();
  exports.InterpolationBinding = InterpolationBinding;
  var ChildInterpolationBinding = (function() {
    function ChildInterpolationBinding(target, observerLocator, sourceExpression, mode, lookupFunctions, targetProperty, left, right) {
      _classCallCheck(this, _ChildInterpolationBinding);
      if (target instanceof InterpolationBinding) {
        this.parent = target;
      } else {
        validateTarget(target, targetProperty);
        this.target = target;
        this.targetProperty = targetProperty;
        this.targetAccessor = observerLocator.getAccessor(target, targetProperty);
      }
      this.observerLocator = observerLocator;
      this.sourceExpression = sourceExpression;
      this.mode = mode;
      this.lookupFunctions = lookupFunctions;
      this.left = left;
      this.right = right;
    }
    ChildInterpolationBinding.prototype.updateTarget = function updateTarget(value) {
      value = value === null || value === undefined ? '' : value.toString();
      if (value !== this.value) {
        this.value = value;
        if (this.parent) {
          this.parent.interpolate();
        } else {
          this.targetAccessor.setValue(this.left + value + this.right, this.target, this.targetProperty);
        }
      }
    };
    ChildInterpolationBinding.prototype.call = function call() {
      if (!this.isBound) {
        return;
      }
      var value = this.sourceExpression.evaluate(this.source, this.lookupFunctions);
      this.updateTarget(value);
      if (this.mode !== _aureliaBinding.bindingMode.oneTime) {
        this._version++;
        this.sourceExpression.connect(this, this.source);
        if (value instanceof Array) {
          this.observeArray(value);
        }
        this.unobserve(false);
      }
    };
    ChildInterpolationBinding.prototype.bind = function bind(source) {
      if (this.isBound) {
        if (this.source === source) {
          return;
        }
        this.unbind();
      }
      this.isBound = true;
      this.source = source;
      var sourceExpression = this.sourceExpression;
      if (sourceExpression.bind) {
        sourceExpression.bind(this, source, this.lookupFunctions);
      }
      var value = sourceExpression.evaluate(source, this.lookupFunctions);
      this.updateTarget(value);
      if (this.mode === _aureliaBinding.bindingMode.oneWay) {
        _aureliaBinding.enqueueBindingConnect(this);
      }
    };
    ChildInterpolationBinding.prototype.unbind = function unbind() {
      if (!this.isBound) {
        return;
      }
      this.isBound = false;
      var sourceExpression = this.sourceExpression;
      if (sourceExpression.unbind) {
        sourceExpression.unbind(this, this.source);
      }
      this.source = null;
      this.unobserve(true);
    };
    ChildInterpolationBinding.prototype.connect = function connect(evaluate) {
      if (!this.isBound) {
        return;
      }
      if (evaluate) {
        var value = this.sourceExpression.evaluate(this.source, this.lookupFunctions);
        this.updateTarget(value);
      }
      this.sourceExpression.connect(this, this.source);
      if (this.value instanceof Array) {
        this.observeArray(this.value);
      }
    };
    var _ChildInterpolationBinding = ChildInterpolationBinding;
    ChildInterpolationBinding = _aureliaBinding.connectable()(ChildInterpolationBinding) || ChildInterpolationBinding;
    return ChildInterpolationBinding;
  })();
  exports.ChildInterpolationBinding = ChildInterpolationBinding;
  var SyntaxInterpreter = (function() {
    SyntaxInterpreter.inject = function inject() {
      return [_aureliaBinding.Parser, _aureliaBinding.ObserverLocator, _aureliaBinding.EventManager];
    };
    function SyntaxInterpreter(parser, observerLocator, eventManager) {
      _classCallCheck(this, SyntaxInterpreter);
      this.parser = parser;
      this.observerLocator = observerLocator;
      this.eventManager = eventManager;
    }
    SyntaxInterpreter.prototype.interpret = function interpret(resources, element, info, existingInstruction, context) {
      if (info.command in this) {
        return this[info.command](resources, element, info, existingInstruction, context);
      }
      return this.handleUnknownCommand(resources, element, info, existingInstruction, context);
    };
    SyntaxInterpreter.prototype.handleUnknownCommand = function handleUnknownCommand(resources, element, info, existingInstruction, context) {
      _aureliaLogging.getLogger('templating-binding').warn('Unknown binding command.', info);
      return existingInstruction;
    };
    SyntaxInterpreter.prototype.determineDefaultBindingMode = function determineDefaultBindingMode(element, attrName, context) {
      var tagName = element.tagName.toLowerCase();
      if (tagName === 'input') {
        return attrName === 'value' || attrName === 'checked' || attrName === 'files' ? _aureliaBinding.bindingMode.twoWay : _aureliaBinding.bindingMode.oneWay;
      } else if (tagName === 'textarea' || tagName === 'select') {
        return attrName === 'value' ? _aureliaBinding.bindingMode.twoWay : _aureliaBinding.bindingMode.oneWay;
      } else if (attrName === 'textcontent' || attrName === 'innerhtml') {
        return element.contentEditable === 'true' ? _aureliaBinding.bindingMode.twoWay : _aureliaBinding.bindingMode.oneWay;
      } else if (attrName === 'scrolltop' || attrName === 'scrollleft') {
        return _aureliaBinding.bindingMode.twoWay;
      }
      if (context && attrName in context.attributes) {
        return context.attributes[attrName].defaultBindingMode || _aureliaBinding.bindingMode.oneWay;
      }
      return _aureliaBinding.bindingMode.oneWay;
    };
    SyntaxInterpreter.prototype.bind = function bind(resources, element, info, existingInstruction, context) {
      var instruction = existingInstruction || _aureliaTemplating.BehaviorInstruction.attribute(info.attrName);
      instruction.attributes[info.attrName] = new _aureliaBinding.BindingExpression(this.observerLocator, this.attributeMap[info.attrName] || info.attrName, this.parser.parse(info.attrValue), info.defaultBindingMode || this.determineDefaultBindingMode(element, info.attrName, context), resources.lookupFunctions);
      return instruction;
    };
    SyntaxInterpreter.prototype.trigger = function trigger(resources, element, info) {
      return new _aureliaBinding.ListenerExpression(this.eventManager, info.attrName, this.parser.parse(info.attrValue), false, true, resources.lookupFunctions);
    };
    SyntaxInterpreter.prototype.delegate = function delegate(resources, element, info) {
      return new _aureliaBinding.ListenerExpression(this.eventManager, info.attrName, this.parser.parse(info.attrValue), true, true, resources.lookupFunctions);
    };
    SyntaxInterpreter.prototype.call = function call(resources, element, info, existingInstruction) {
      var instruction = existingInstruction || _aureliaTemplating.BehaviorInstruction.attribute(info.attrName);
      instruction.attributes[info.attrName] = new _aureliaBinding.CallExpression(this.observerLocator, info.attrName, this.parser.parse(info.attrValue), resources.lookupFunctions);
      return instruction;
    };
    SyntaxInterpreter.prototype.options = function options(resources, element, info, existingInstruction, context) {
      var instruction = existingInstruction || _aureliaTemplating.BehaviorInstruction.attribute(info.attrName);
      var attrValue = info.attrValue;
      var language = this.language;
      var name = null;
      var target = '';
      var current = undefined;
      var i = undefined;
      var ii = undefined;
      for (i = 0, ii = attrValue.length; i < ii; ++i) {
        current = attrValue[i];
        if (current === ';') {
          info = language.inspectAttribute(resources, name, target.trim());
          language.createAttributeInstruction(resources, element, info, instruction, context);
          if (!instruction.attributes[info.attrName]) {
            instruction.attributes[info.attrName] = info.attrValue;
          }
          target = '';
          name = null;
        } else if (current === ':' && name === null) {
          name = target.trim();
          target = '';
        } else {
          target += current;
        }
      }
      if (name !== null) {
        info = language.inspectAttribute(resources, name, target.trim());
        language.createAttributeInstruction(resources, element, info, instruction, context);
        if (!instruction.attributes[info.attrName]) {
          instruction.attributes[info.attrName] = info.attrValue;
        }
      }
      return instruction;
    };
    SyntaxInterpreter.prototype['for'] = function _for(resources, element, info, existingInstruction) {
      var parts = undefined;
      var keyValue = undefined;
      var instruction = undefined;
      var attrValue = undefined;
      var isDestructuring = undefined;
      attrValue = info.attrValue;
      isDestructuring = attrValue.match(/^ *[[].+[\]]/);
      parts = isDestructuring ? attrValue.split('of ') : attrValue.split(' of ');
      if (parts.length !== 2) {
        throw new Error('Incorrect syntax for "for". The form is: "$local of $items" or "[$key, $value] of $items".');
      }
      instruction = existingInstruction || _aureliaTemplating.BehaviorInstruction.attribute(info.attrName);
      if (isDestructuring) {
        keyValue = parts[0].replace(/[[\]]/g, '').replace(/,/g, ' ').replace(/\s+/g, ' ').trim().split(' ');
        instruction.attributes.key = keyValue[0];
        instruction.attributes.value = keyValue[1];
      } else {
        instruction.attributes.local = parts[0];
      }
      instruction.attributes.items = new _aureliaBinding.BindingExpression(this.observerLocator, 'items', this.parser.parse(parts[1]), _aureliaBinding.bindingMode.oneWay, resources.lookupFunctions);
      return instruction;
    };
    SyntaxInterpreter.prototype['two-way'] = function twoWay(resources, element, info, existingInstruction) {
      var instruction = existingInstruction || _aureliaTemplating.BehaviorInstruction.attribute(info.attrName);
      instruction.attributes[info.attrName] = new _aureliaBinding.BindingExpression(this.observerLocator, this.attributeMap[info.attrName] || info.attrName, this.parser.parse(info.attrValue), _aureliaBinding.bindingMode.twoWay, resources.lookupFunctions);
      return instruction;
    };
    SyntaxInterpreter.prototype['one-way'] = function oneWay(resources, element, info, existingInstruction) {
      var instruction = existingInstruction || _aureliaTemplating.BehaviorInstruction.attribute(info.attrName);
      instruction.attributes[info.attrName] = new _aureliaBinding.BindingExpression(this.observerLocator, this.attributeMap[info.attrName] || info.attrName, this.parser.parse(info.attrValue), _aureliaBinding.bindingMode.oneWay, resources.lookupFunctions);
      return instruction;
    };
    SyntaxInterpreter.prototype['one-time'] = function oneTime(resources, element, info, existingInstruction) {
      var instruction = existingInstruction || _aureliaTemplating.BehaviorInstruction.attribute(info.attrName);
      instruction.attributes[info.attrName] = new _aureliaBinding.BindingExpression(this.observerLocator, this.attributeMap[info.attrName] || info.attrName, this.parser.parse(info.attrValue), _aureliaBinding.bindingMode.oneTime, resources.lookupFunctions);
      return instruction;
    };
    return SyntaxInterpreter;
  })();
  exports.SyntaxInterpreter = SyntaxInterpreter;
  var info = {};
  var TemplatingBindingLanguage = (function(_BindingLanguage) {
    _inherits(TemplatingBindingLanguage, _BindingLanguage);
    TemplatingBindingLanguage.inject = function inject() {
      return [_aureliaBinding.Parser, _aureliaBinding.ObserverLocator, SyntaxInterpreter];
    };
    function TemplatingBindingLanguage(parser, observerLocator, syntaxInterpreter) {
      _classCallCheck(this, TemplatingBindingLanguage);
      _BindingLanguage.call(this);
      this.parser = parser;
      this.observerLocator = observerLocator;
      this.syntaxInterpreter = syntaxInterpreter;
      this.emptyStringExpression = this.parser.parse('\'\'');
      syntaxInterpreter.language = this;
      this.attributeMap = syntaxInterpreter.attributeMap = {
        'contenteditable': 'contentEditable',
        'for': 'htmlFor',
        'tabindex': 'tabIndex',
        'textcontent': 'textContent',
        'innerhtml': 'innerHTML',
        'maxlength': 'maxLength',
        'minlength': 'minLength',
        'formaction': 'formAction',
        'formenctype': 'formEncType',
        'formmethod': 'formMethod',
        'formnovalidate': 'formNoValidate',
        'formtarget': 'formTarget',
        'rowspan': 'rowSpan',
        'colspan': 'colSpan',
        'scrolltop': 'scrollTop',
        'scrollleft': 'scrollLeft',
        'readonly': 'readOnly'
      };
    }
    TemplatingBindingLanguage.prototype.inspectAttribute = function inspectAttribute(resources, attrName, attrValue) {
      var parts = attrName.split('.');
      info.defaultBindingMode = null;
      if (parts.length === 2) {
        info.attrName = parts[0].trim();
        info.attrValue = attrValue;
        info.command = parts[1].trim();
        if (info.command === 'ref') {
          info.expression = new _aureliaBinding.NameExpression(this.parser.parse(attrValue), info.attrName);
          info.command = null;
          info.attrName = 'ref';
        } else {
          info.expression = null;
        }
      } else if (attrName === 'ref') {
        info.attrName = attrName;
        info.attrValue = attrValue;
        info.command = null;
        info.expression = new _aureliaBinding.NameExpression(this.parser.parse(attrValue), 'element');
      } else {
        info.attrName = attrName;
        info.attrValue = attrValue;
        info.command = null;
        info.expression = this.parseContent(resources, attrName, attrValue);
      }
      return info;
    };
    TemplatingBindingLanguage.prototype.createAttributeInstruction = function createAttributeInstruction(resources, element, theInfo, existingInstruction, context) {
      var instruction = undefined;
      if (theInfo.expression) {
        if (theInfo.attrName === 'ref') {
          return theInfo.expression;
        }
        instruction = existingInstruction || _aureliaTemplating.BehaviorInstruction.attribute(theInfo.attrName);
        instruction.attributes[theInfo.attrName] = theInfo.expression;
      } else if (theInfo.command) {
        instruction = this.syntaxInterpreter.interpret(resources, element, theInfo, existingInstruction, context);
      }
      return instruction;
    };
    TemplatingBindingLanguage.prototype.parseText = function parseText(resources, value) {
      return this.parseContent(resources, 'textContent', value);
    };
    TemplatingBindingLanguage.prototype.parseContent = function parseContent(resources, attrName, attrValue) {
      var i = attrValue.indexOf('${', 0);
      var ii = attrValue.length;
      var char = undefined;
      var pos = 0;
      var open = 0;
      var quote = null;
      var interpolationStart = undefined;
      var parts = undefined;
      var partIndex = 0;
      while (i >= 0 && i < ii - 2) {
        open = 1;
        interpolationStart = i;
        i += 2;
        do {
          char = attrValue[i];
          i++;
          if (char === "'" || char === '"') {
            if (quote === null) {
              quote = char;
            } else if (quote === char) {
              quote = null;
            }
            continue;
          }
          if (char === '\\') {
            i++;
            continue;
          }
          if (quote !== null) {
            continue;
          }
          if (char === '{') {
            open++;
          } else if (char === '}') {
            open--;
          }
        } while (open > 0 && i < ii);
        if (open === 0) {
          parts = parts || [];
          if (attrValue[interpolationStart - 1] === '\\' && attrValue[interpolationStart - 2] !== '\\') {
            parts[partIndex] = attrValue.substring(pos, interpolationStart - 1) + attrValue.substring(interpolationStart, i);
            partIndex++;
            parts[partIndex] = this.emptyStringExpression;
            partIndex++;
          } else {
            parts[partIndex] = attrValue.substring(pos, interpolationStart);
            partIndex++;
            parts[partIndex] = this.parser.parse(attrValue.substring(interpolationStart + 2, i - 1));
            partIndex++;
          }
          pos = i;
          i = attrValue.indexOf('${', i);
        } else {
          break;
        }
      }
      if (partIndex === 0) {
        return null;
      }
      parts[partIndex] = attrValue.substr(pos);
      return new InterpolationBindingExpression(this.observerLocator, this.attributeMap[attrName] || attrName, parts, _aureliaBinding.bindingMode.oneWay, resources.lookupFunctions, attrName);
    };
    return TemplatingBindingLanguage;
  })(_aureliaTemplating.BindingLanguage);
  exports.TemplatingBindingLanguage = TemplatingBindingLanguage;
  function configure(config) {
    config.container.registerSingleton(_aureliaTemplating.BindingLanguage, TemplatingBindingLanguage);
    config.container.registerAlias(_aureliaTemplating.BindingLanguage, TemplatingBindingLanguage);
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating-binding@1.0.0-beta.1.1.2", ["npm:aurelia-templating-binding@1.0.0-beta.1.1.2/aurelia-templating-binding"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-router@1.0.0-beta.1.1.3/aurelia-router", ["exports", "npm:aurelia-logging@1.0.0-beta.1.1.2", "npm:aurelia-route-recognizer@1.0.0-beta.1.1.3", "npm:aurelia-dependency-injection@1.0.0-beta.1.1.5", "npm:aurelia-history@1.0.0-beta.1.1.1", "npm:aurelia-event-aggregator@1.0.0-beta.1.1.1"], function(exports, _aureliaLogging, _aureliaRouteRecognizer, _aureliaDependencyInjection, _aureliaHistory, _aureliaEventAggregator) {
  'use strict';
  exports.__esModule = true;
  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  exports._normalizeAbsolutePath = _normalizeAbsolutePath;
  exports._createRootedPath = _createRootedPath;
  exports._resolveUrl = _resolveUrl;
  exports.isNavigationCommand = isNavigationCommand;
  exports._buildNavigationPlan = _buildNavigationPlan;
  function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function _normalizeAbsolutePath(path, hasPushState) {
    if (!hasPushState && path[0] !== '#') {
      path = '#' + path;
    }
    return path;
  }
  function _createRootedPath(fragment, baseUrl, hasPushState) {
    if (isAbsoluteUrl.test(fragment)) {
      return fragment;
    }
    var path = '';
    if (baseUrl.length && baseUrl[0] !== '/') {
      path += '/';
    }
    path += baseUrl;
    if ((!path.length || path[path.length - 1] !== '/') && fragment[0] !== '/') {
      path += '/';
    }
    if (path.length && path[path.length - 1] === '/' && fragment[0] === '/') {
      path = path.substring(0, path.length - 1);
    }
    return _normalizeAbsolutePath(path + fragment, hasPushState);
  }
  function _resolveUrl(fragment, baseUrl, hasPushState) {
    if (isRootedPath.test(fragment)) {
      return _normalizeAbsolutePath(fragment, hasPushState);
    }
    return _createRootedPath(fragment, baseUrl, hasPushState);
  }
  var isRootedPath = /^#?\//;
  var isAbsoluteUrl = /^([a-z][a-z0-9+\-.]*:)?\/\//i;
  var pipelineStatus = {
    completed: 'completed',
    canceled: 'canceled',
    rejected: 'rejected',
    running: 'running'
  };
  exports.pipelineStatus = pipelineStatus;
  var Pipeline = (function() {
    function Pipeline() {
      _classCallCheck(this, Pipeline);
      this.steps = [];
    }
    Pipeline.prototype.addStep = function addStep(step) {
      var run = undefined;
      if (typeof step === 'function') {
        run = step;
      } else if (typeof step.getSteps === 'function') {
        var steps = step.getSteps();
        for (var i = 0,
            l = steps.length; i < l; i++) {
          this.addStep(steps[i]);
        }
        return this;
      } else {
        run = step.run.bind(step);
      }
      this.steps.push(run);
      return this;
    };
    Pipeline.prototype.run = function run(instruction) {
      var index = -1;
      var steps = this.steps;
      function next() {
        index++;
        if (index < steps.length) {
          var currentStep = steps[index];
          try {
            return currentStep(instruction, next);
          } catch (e) {
            return next.reject(e);
          }
        } else {
          return next.complete();
        }
      }
      next.complete = createCompletionHandler(next, pipelineStatus.completed);
      next.cancel = createCompletionHandler(next, pipelineStatus.canceled);
      next.reject = createCompletionHandler(next, pipelineStatus.rejected);
      return next();
    };
    return Pipeline;
  })();
  exports.Pipeline = Pipeline;
  function createCompletionHandler(next, status) {
    return function(output) {
      return Promise.resolve({
        status: status,
        output: output,
        completed: status === pipelineStatus.completed
      });
    };
  }
  var CommitChangesStep = (function() {
    function CommitChangesStep() {
      _classCallCheck(this, CommitChangesStep);
    }
    CommitChangesStep.prototype.run = function run(navigationInstruction, next) {
      return navigationInstruction._commitChanges(true).then(function() {
        navigationInstruction._updateTitle();
        return next();
      });
    };
    return CommitChangesStep;
  })();
  exports.CommitChangesStep = CommitChangesStep;
  var NavigationInstruction = (function() {
    function NavigationInstruction(init) {
      _classCallCheck(this, NavigationInstruction);
      this.plan = null;
      Object.assign(this, init);
      this.params = this.params || {};
      this.viewPortInstructions = {};
      var ancestorParams = [];
      var current = this;
      do {
        var currentParams = Object.assign({}, current.params);
        if (current.config && current.config.hasChildRouter) {
          delete currentParams[current.getWildCardName()];
        }
        ancestorParams.unshift(currentParams);
        current = current.parentInstruction;
      } while (current);
      var allParams = Object.assign.apply(Object, [{}, this.queryParams].concat(ancestorParams));
      this.lifecycleArgs = [allParams, this.config, this];
    }
    NavigationInstruction.prototype.getAllInstructions = function getAllInstructions() {
      var instructions = [this];
      for (var key in this.viewPortInstructions) {
        var childInstruction = this.viewPortInstructions[key].childNavigationInstruction;
        if (childInstruction) {
          instructions.push.apply(instructions, childInstruction.getAllInstructions());
        }
      }
      return instructions;
    };
    NavigationInstruction.prototype.getAllPreviousInstructions = function getAllPreviousInstructions() {
      return this.getAllInstructions().map(function(c) {
        return c.previousInstruction;
      }).filter(function(c) {
        return c;
      });
    };
    NavigationInstruction.prototype.addViewPortInstruction = function addViewPortInstruction(viewPortName, strategy, moduleId, component) {
      var viewportInstruction = this.viewPortInstructions[viewPortName] = {
        name: viewPortName,
        strategy: strategy,
        moduleId: moduleId,
        component: component,
        childRouter: component.childRouter,
        lifecycleArgs: this.lifecycleArgs.slice()
      };
      return viewportInstruction;
    };
    NavigationInstruction.prototype.getWildCardName = function getWildCardName() {
      var wildcardIndex = this.config.route.lastIndexOf('*');
      return this.config.route.substr(wildcardIndex + 1);
    };
    NavigationInstruction.prototype.getWildcardPath = function getWildcardPath() {
      var wildcardName = this.getWildCardName();
      var path = this.params[wildcardName] || '';
      if (this.queryString) {
        path += '?' + this.queryString;
      }
      return path;
    };
    NavigationInstruction.prototype.getBaseUrl = function getBaseUrl() {
      if (!this.params) {
        return this.fragment;
      }
      var wildcardName = this.getWildCardName();
      var path = this.params[wildcardName] || '';
      if (!path) {
        return this.fragment;
      }
      return this.fragment.substr(0, this.fragment.lastIndexOf(path));
    };
    NavigationInstruction.prototype._commitChanges = function _commitChanges(waitToSwap) {
      var _this = this;
      var router = this.router;
      router.currentInstruction = this;
      if (this.previousInstruction) {
        this.previousInstruction.config.navModel.isActive = false;
      }
      this.config.navModel.isActive = true;
      router._refreshBaseUrl();
      router.refreshNavigation();
      var loads = [];
      var delaySwaps = [];
      var _loop = function(viewPortName) {
        var viewPortInstruction = _this.viewPortInstructions[viewPortName];
        var viewPort = router.viewPorts[viewPortName];
        if (!viewPort) {
          throw new Error('There was no router-view found in the view for ' + viewPortInstruction.moduleId + '.');
        }
        if (viewPortInstruction.strategy === activationStrategy.replace) {
          if (waitToSwap) {
            delaySwaps.push({
              viewPort: viewPort,
              viewPortInstruction: viewPortInstruction
            });
          }
          loads.push(viewPort.process(viewPortInstruction, waitToSwap).then(function(x) {
            if (viewPortInstruction.childNavigationInstruction) {
              return viewPortInstruction.childNavigationInstruction._commitChanges();
            }
          }));
        } else {
          if (viewPortInstruction.childNavigationInstruction) {
            loads.push(viewPortInstruction.childNavigationInstruction._commitChanges(waitToSwap));
          }
        }
      };
      for (var viewPortName in this.viewPortInstructions) {
        _loop(viewPortName);
      }
      return Promise.all(loads).then(function() {
        delaySwaps.forEach(function(x) {
          return x.viewPort.swap(x.viewPortInstruction);
        });
        return null;
      }).then(function() {
        return prune(_this);
      });
    };
    NavigationInstruction.prototype._updateTitle = function _updateTitle() {
      var title = this._buildTitle();
      if (title) {
        this.router.history.setTitle(title);
      }
    };
    NavigationInstruction.prototype._buildTitle = function _buildTitle() {
      var separator = arguments.length <= 0 || arguments[0] === undefined ? ' | ' : arguments[0];
      var title = this.config.navModel.title || '';
      var childTitles = [];
      for (var viewPortName in this.viewPortInstructions) {
        var viewPortInstruction = this.viewPortInstructions[viewPortName];
        if (viewPortInstruction.childNavigationInstruction) {
          var childTitle = viewPortInstruction.childNavigationInstruction._buildTitle(separator);
          if (childTitle) {
            childTitles.push(childTitle);
          }
        }
      }
      if (childTitles.length) {
        title = childTitles.join(separator) + (title ? separator : '') + title;
      }
      if (this.router.title) {
        title += (title ? separator : '') + this.router.title;
      }
      return title;
    };
    return NavigationInstruction;
  })();
  exports.NavigationInstruction = NavigationInstruction;
  function prune(instruction) {
    instruction.previousInstruction = null;
    instruction.plan = null;
  }
  var NavModel = (function() {
    function NavModel(router, relativeHref) {
      _classCallCheck(this, NavModel);
      this.isActive = false;
      this.title = null;
      this.href = null;
      this.relativeHref = null;
      this.settings = {};
      this.config = null;
      this.router = router;
      this.relativeHref = relativeHref;
    }
    NavModel.prototype.setTitle = function setTitle(title) {
      this.title = title;
      if (this.isActive) {
        this.router.updateTitle();
      }
    };
    return NavModel;
  })();
  exports.NavModel = NavModel;
  function isNavigationCommand(obj) {
    return obj && typeof obj.navigate === 'function';
  }
  var Redirect = (function() {
    function Redirect(url) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      _classCallCheck(this, Redirect);
      this.url = url;
      this.options = Object.assign({
        trigger: true,
        replace: true
      }, options);
      this.shouldContinueProcessing = false;
    }
    Redirect.prototype.setRouter = function setRouter(router) {
      this.router = router;
    };
    Redirect.prototype.navigate = function navigate(appRouter) {
      var navigatingRouter = this.options.useAppRouter ? appRouter : this.router || appRouter;
      navigatingRouter.navigate(this.url, this.options);
    };
    return Redirect;
  })();
  exports.Redirect = Redirect;
  var RouterConfiguration = (function() {
    function RouterConfiguration() {
      _classCallCheck(this, RouterConfiguration);
      this.instructions = [];
      this.options = {};
      this.pipelineSteps = [];
    }
    RouterConfiguration.prototype.addPipelineStep = function addPipelineStep(name, step) {
      this.pipelineSteps.push({
        name: name,
        step: step
      });
      return this;
    };
    RouterConfiguration.prototype.addAuthorizeStep = function addAuthorizeStep(step) {
      return this.addPipelineStep('authorize', step);
    };
    RouterConfiguration.prototype.addPreActivateStep = function addPreActivateStep(step) {
      return this.addPipelineStep('preActivate', step);
    };
    RouterConfiguration.prototype.addPreRenderStep = function addPreRenderStep(step) {
      return this.addPipelineStep('preRender', step);
    };
    RouterConfiguration.prototype.addPostRenderStep = function addPostRenderStep(step) {
      return this.addPipelineStep('postRender', step);
    };
    RouterConfiguration.prototype.map = function map(route) {
      if (Array.isArray(route)) {
        route.forEach(this.map.bind(this));
        return this;
      }
      return this.mapRoute(route);
    };
    RouterConfiguration.prototype.mapRoute = function mapRoute(config) {
      this.instructions.push(function(router) {
        var routeConfigs = [];
        if (Array.isArray(config.route)) {
          for (var i = 0,
              ii = config.route.length; i < ii; ++i) {
            var current = Object.assign({}, config);
            current.route = config.route[i];
            routeConfigs.push(current);
          }
        } else {
          routeConfigs.push(Object.assign({}, config));
        }
        var navModel = undefined;
        for (var i = 0,
            ii = routeConfigs.length; i < ii; ++i) {
          var routeConfig = routeConfigs[i];
          routeConfig.settings = routeConfig.settings || {};
          if (!navModel) {
            navModel = router.createNavModel(routeConfig);
          }
          router.addRoute(routeConfig, navModel);
        }
      });
      return this;
    };
    RouterConfiguration.prototype.mapUnknownRoutes = function mapUnknownRoutes(config) {
      this.unknownRouteConfig = config;
      return this;
    };
    RouterConfiguration.prototype.exportToRouter = function exportToRouter(router) {
      var instructions = this.instructions;
      for (var i = 0,
          ii = instructions.length; i < ii; ++i) {
        instructions[i](router);
      }
      if (this.title) {
        router.title = this.title;
      }
      if (this.unknownRouteConfig) {
        router.handleUnknownRoutes(this.unknownRouteConfig);
      }
      router.options = this.options;
      var pipelineSteps = this.pipelineSteps;
      if (pipelineSteps.length) {
        if (!router.isRoot) {
          throw new Error('Pipeline steps can only be added to the root router');
        }
        var pipelineProvider = router.pipelineProvider;
        for (var i = 0,
            ii = pipelineSteps.length; i < ii; ++i) {
          var _pipelineSteps$i = pipelineSteps[i];
          var _name = _pipelineSteps$i.name;
          var step = _pipelineSteps$i.step;
          pipelineProvider.addStep(_name, step);
        }
      }
    };
    return RouterConfiguration;
  })();
  exports.RouterConfiguration = RouterConfiguration;
  var activationStrategy = {
    noChange: 'no-change',
    invokeLifecycle: 'invoke-lifecycle',
    replace: 'replace'
  };
  exports.activationStrategy = activationStrategy;
  var BuildNavigationPlanStep = (function() {
    function BuildNavigationPlanStep() {
      _classCallCheck(this, BuildNavigationPlanStep);
    }
    BuildNavigationPlanStep.prototype.run = function run(navigationInstruction, next) {
      return _buildNavigationPlan(navigationInstruction).then(function(plan) {
        navigationInstruction.plan = plan;
        return next();
      })['catch'](next.cancel);
    };
    return BuildNavigationPlanStep;
  })();
  exports.BuildNavigationPlanStep = BuildNavigationPlanStep;
  function _buildNavigationPlan(instruction, forceLifecycleMinimum) {
    var prev = instruction.previousInstruction;
    var config = instruction.config;
    var plan = {};
    if ('redirect' in config) {
      var redirectLocation = _resolveUrl(config.redirect, getInstructionBaseUrl(instruction));
      if (instruction.queryString) {
        redirectLocation += '?' + instruction.queryString;
      }
      return Promise.reject(new Redirect(redirectLocation));
    }
    if (prev) {
      var newParams = hasDifferentParameterValues(prev, instruction);
      var pending = [];
      var _loop2 = function(viewPortName) {
        var prevViewPortInstruction = prev.viewPortInstructions[viewPortName];
        var nextViewPortConfig = config.viewPorts[viewPortName];
        if (!nextViewPortConfig)
          throw new Error('Invalid Route Config: Configuration for viewPort "' + viewPortName + '" was not found for route: "' + instruction.config.route + '."');
        var viewPortPlan = plan[viewPortName] = {
          name: viewPortName,
          config: nextViewPortConfig,
          prevComponent: prevViewPortInstruction.component,
          prevModuleId: prevViewPortInstruction.moduleId
        };
        if (prevViewPortInstruction.moduleId !== nextViewPortConfig.moduleId) {
          viewPortPlan.strategy = activationStrategy.replace;
        } else if ('determineActivationStrategy' in prevViewPortInstruction.component.viewModel) {
          var _prevViewPortInstruction$component$viewModel;
          viewPortPlan.strategy = (_prevViewPortInstruction$component$viewModel = prevViewPortInstruction.component.viewModel).determineActivationStrategy.apply(_prevViewPortInstruction$component$viewModel, instruction.lifecycleArgs);
        } else if (config.activationStrategy) {
          viewPortPlan.strategy = config.activationStrategy;
        } else if (newParams || forceLifecycleMinimum) {
          viewPortPlan.strategy = activationStrategy.invokeLifecycle;
        } else {
          viewPortPlan.strategy = activationStrategy.noChange;
        }
        if (viewPortPlan.strategy !== activationStrategy.replace && prevViewPortInstruction.childRouter) {
          var path = instruction.getWildcardPath();
          var task = prevViewPortInstruction.childRouter._createNavigationInstruction(path, instruction).then(function(childInstruction) {
            viewPortPlan.childNavigationInstruction = childInstruction;
            return _buildNavigationPlan(childInstruction, viewPortPlan.strategy === activationStrategy.invokeLifecycle).then(function(childPlan) {
              childInstruction.plan = childPlan;
            });
          });
          pending.push(task);
        }
      };
      for (var viewPortName in prev.viewPortInstructions) {
        _loop2(viewPortName);
      }
      return Promise.all(pending).then(function() {
        return plan;
      });
    }
    for (var viewPortName in config.viewPorts) {
      plan[viewPortName] = {
        name: viewPortName,
        strategy: activationStrategy.replace,
        config: instruction.config.viewPorts[viewPortName]
      };
    }
    return Promise.resolve(plan);
  }
  function hasDifferentParameterValues(prev, next) {
    var prevParams = prev.params;
    var nextParams = next.params;
    var nextWildCardName = next.config.hasChildRouter ? next.getWildCardName() : null;
    for (var key in nextParams) {
      if (key === nextWildCardName) {
        continue;
      }
      if (prevParams[key] !== nextParams[key]) {
        return true;
      }
    }
    for (var key in prevParams) {
      if (key === nextWildCardName) {
        continue;
      }
      if (prevParams[key] !== nextParams[key]) {
        return true;
      }
    }
    return false;
  }
  function getInstructionBaseUrl(instruction) {
    var instructionBaseUrlParts = [];
    instruction = instruction.parentInstruction;
    while (instruction) {
      instructionBaseUrlParts.unshift(instruction.getBaseUrl());
      instruction = instruction.parentInstruction;
    }
    instructionBaseUrlParts.unshift('/');
    return instructionBaseUrlParts.join('');
  }
  var Router = (function() {
    function Router(container, history) {
      _classCallCheck(this, Router);
      this.parent = null;
      this.container = container;
      this.history = history;
      this.reset();
    }
    Router.prototype.reset = function reset() {
      var _this2 = this;
      this.viewPorts = {};
      this.routes = [];
      this.baseUrl = '';
      this.isConfigured = false;
      this.isNavigating = false;
      this.navigation = [];
      this.currentInstruction = null;
      this._fallbackOrder = 100;
      this._recognizer = new _aureliaRouteRecognizer.RouteRecognizer();
      this._childRecognizer = new _aureliaRouteRecognizer.RouteRecognizer();
      this._configuredPromise = new Promise(function(resolve) {
        _this2._resolveConfiguredPromise = resolve;
      });
    };
    Router.prototype.registerViewPort = function registerViewPort(viewPort, name) {
      name = name || 'default';
      this.viewPorts[name] = viewPort;
    };
    Router.prototype.ensureConfigured = function ensureConfigured() {
      return this._configuredPromise;
    };
    Router.prototype.configure = function configure(callbackOrConfig) {
      var _this3 = this;
      this.isConfigured = true;
      var result = callbackOrConfig;
      var config = undefined;
      if (typeof callbackOrConfig === 'function') {
        config = new RouterConfiguration();
        result = callbackOrConfig(config);
      }
      return Promise.resolve(result).then(function(c) {
        if (c && c.exportToRouter) {
          config = c;
        }
        config.exportToRouter(_this3);
        _this3.isConfigured = true;
        _this3._resolveConfiguredPromise();
      });
    };
    Router.prototype.navigate = function navigate(fragment, options) {
      if (!this.isConfigured && this.parent) {
        return this.parent.navigate(fragment, options);
      }
      return this.history.navigate(_resolveUrl(fragment, this.baseUrl, this.history._hasPushState), options);
    };
    Router.prototype.navigateToRoute = function navigateToRoute(route, params, options) {
      var path = this.generate(route, params);
      return this.navigate(path, options);
    };
    Router.prototype.navigateBack = function navigateBack() {
      this.history.navigateBack();
    };
    Router.prototype.createChild = function createChild(container) {
      var childRouter = new Router(container || this.container.createChild(), this.history);
      childRouter.parent = this;
      return childRouter;
    };
    Router.prototype.generate = function generate(name, params) {
      var hasRoute = this._recognizer.hasRoute(name);
      if ((!this.isConfigured || !hasRoute) && this.parent) {
        return this.parent.generate(name, params);
      }
      if (!hasRoute) {
        throw new Error('A route with name \'' + name + '\' could not be found. Check that `name: \'' + name + '\'` was specified in the route\'s config.');
      }
      var path = this._recognizer.generate(name, params);
      return _createRootedPath(path, this.baseUrl, this.history._hasPushState);
    };
    Router.prototype.createNavModel = function createNavModel(config) {
      var navModel = new NavModel(this, 'href' in config ? config.href : config.route);
      navModel.title = config.title;
      navModel.order = config.nav;
      navModel.href = config.href;
      navModel.settings = config.settings;
      navModel.config = config;
      return navModel;
    };
    Router.prototype.addRoute = function addRoute(config, navModel) {
      validateRouteConfig(config);
      if (!('viewPorts' in config) && !config.navigationStrategy) {
        config.viewPorts = {'default': {
            moduleId: config.moduleId,
            view: config.view
          }};
      }
      if (!navModel) {
        navModel = this.createNavModel(config);
      }
      this.routes.push(config);
      var path = config.route;
      if (path.charAt(0) === '/') {
        path = path.substr(1);
      }
      var state = this._recognizer.add({
        path: path,
        handler: config
      });
      if (path) {
        var _settings = config.settings;
        delete config.settings;
        var withChild = JSON.parse(JSON.stringify(config));
        config.settings = _settings;
        withChild.route = path + '/*childRoute';
        withChild.hasChildRouter = true;
        this._childRecognizer.add({
          path: withChild.route,
          handler: withChild
        });
        withChild.navModel = navModel;
        withChild.settings = config.settings;
      }
      config.navModel = navModel;
      if ((navModel.order || navModel.order === 0) && this.navigation.indexOf(navModel) === -1) {
        if (!navModel.href && navModel.href !== '' && (state.types.dynamics || state.types.stars)) {
          throw new Error('Invalid route config: dynamic routes must specify an href to be included in the navigation model.');
        }
        if (typeof navModel.order !== 'number') {
          navModel.order = ++this._fallbackOrder;
        }
        this.navigation.push(navModel);
        this.navigation = this.navigation.sort(function(a, b) {
          return a.order - b.order;
        });
      }
    };
    Router.prototype.hasRoute = function hasRoute(name) {
      return !!(this._recognizer.hasRoute(name) || this.parent && this.parent.hasRoute(name));
    };
    Router.prototype.hasOwnRoute = function hasOwnRoute(name) {
      return this._recognizer.hasRoute(name);
    };
    Router.prototype.handleUnknownRoutes = function handleUnknownRoutes(config) {
      var _this4 = this;
      if (!config) {
        throw new Error('Invalid unknown route handler');
      }
      this.catchAllHandler = function(instruction) {
        return _this4._createRouteConfig(config, instruction).then(function(c) {
          instruction.config = c;
          return instruction;
        });
      };
    };
    Router.prototype.updateTitle = function updateTitle() {
      if (this.parent) {
        return this.parent.updateTitle();
      }
      this.currentInstruction._updateTitle();
    };
    Router.prototype.refreshNavigation = function refreshNavigation() {
      var nav = this.navigation;
      for (var i = 0,
          _length = nav.length; i < _length; i++) {
        var current = nav[i];
        if (!current.href) {
          current.href = _createRootedPath(current.relativeHref, this.baseUrl, this.history._hasPushState);
        }
      }
    };
    Router.prototype._refreshBaseUrl = function _refreshBaseUrl() {
      if (this.parent) {
        var baseUrl = this.parent.currentInstruction.getBaseUrl();
        this.baseUrl = this.parent.baseUrl + baseUrl;
      }
    };
    Router.prototype._createNavigationInstruction = function _createNavigationInstruction() {
      var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
      var parentInstruction = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
      var fragment = url;
      var queryString = '';
      var queryIndex = url.indexOf('?');
      if (queryIndex !== -1) {
        fragment = url.substr(0, queryIndex);
        queryString = url.substr(queryIndex + 1);
      }
      var results = this._recognizer.recognize(url);
      if (!results || !results.length) {
        results = this._childRecognizer.recognize(url);
      }
      var instructionInit = {
        fragment: fragment,
        queryString: queryString,
        config: null,
        parentInstruction: parentInstruction,
        previousInstruction: this.currentInstruction,
        router: this
      };
      if (results && results.length) {
        var first = results[0];
        var _instruction = new NavigationInstruction(Object.assign({}, instructionInit, {
          params: first.params,
          queryParams: first.queryParams || results.queryParams,
          config: first.config || first.handler
        }));
        if (typeof first.handler === 'function') {
          return evaluateNavigationStrategy(_instruction, first.handler, first);
        } else if (first.handler && 'navigationStrategy' in first.handler) {
          return evaluateNavigationStrategy(_instruction, first.handler.navigationStrategy, first.handler);
        }
        return Promise.resolve(_instruction);
      } else if (this.catchAllHandler) {
        var _instruction2 = new NavigationInstruction(Object.assign({}, instructionInit, {
          params: {path: fragment},
          queryParams: results && results.queryParams,
          config: null
        }));
        return evaluateNavigationStrategy(_instruction2, this.catchAllHandler);
      }
      return Promise.reject(new Error('Route not found: ' + url));
    };
    Router.prototype._createRouteConfig = function _createRouteConfig(config, instruction) {
      var _this5 = this;
      return Promise.resolve(config).then(function(c) {
        if (typeof c === 'string') {
          return {moduleId: c};
        } else if (typeof c === 'function') {
          return c(instruction);
        }
        return c;
      }).then(function(c) {
        return typeof c === 'string' ? {moduleId: c} : c;
      }).then(function(c) {
        c.route = instruction.params.path;
        validateRouteConfig(c);
        if (!c.navModel) {
          c.navModel = _this5.createNavModel(c);
        }
        return c;
      });
    };
    _createClass(Router, [{
      key: 'isRoot',
      get: function get() {
        return !this.parent;
      }
    }]);
    return Router;
  })();
  exports.Router = Router;
  function validateRouteConfig(config) {
    if (typeof config !== 'object') {
      throw new Error('Invalid Route Config');
    }
    if (typeof config.route !== 'string') {
      throw new Error('Invalid Route Config: You must specify a route pattern.');
    }
    if (!('redirect' in config || config.moduleId || config.navigationStrategy || config.viewPorts)) {
      throw new Error('Invalid Route Config: You must specify a moduleId, redirect, navigationStrategy, or viewPorts.');
    }
  }
  function evaluateNavigationStrategy(instruction, evaluator, context) {
    return Promise.resolve(evaluator.call(context, instruction)).then(function() {
      if (!('viewPorts' in instruction.config)) {
        instruction.config.viewPorts = {'default': {moduleId: instruction.config.moduleId}};
      }
      return instruction;
    });
  }
  var CanDeactivatePreviousStep = (function() {
    function CanDeactivatePreviousStep() {
      _classCallCheck(this, CanDeactivatePreviousStep);
    }
    CanDeactivatePreviousStep.prototype.run = function run(navigationInstruction, next) {
      return processDeactivatable(navigationInstruction.plan, 'canDeactivate', next);
    };
    return CanDeactivatePreviousStep;
  })();
  exports.CanDeactivatePreviousStep = CanDeactivatePreviousStep;
  var CanActivateNextStep = (function() {
    function CanActivateNextStep() {
      _classCallCheck(this, CanActivateNextStep);
    }
    CanActivateNextStep.prototype.run = function run(navigationInstruction, next) {
      return processActivatable(navigationInstruction, 'canActivate', next);
    };
    return CanActivateNextStep;
  })();
  exports.CanActivateNextStep = CanActivateNextStep;
  var DeactivatePreviousStep = (function() {
    function DeactivatePreviousStep() {
      _classCallCheck(this, DeactivatePreviousStep);
    }
    DeactivatePreviousStep.prototype.run = function run(navigationInstruction, next) {
      return processDeactivatable(navigationInstruction.plan, 'deactivate', next, true);
    };
    return DeactivatePreviousStep;
  })();
  exports.DeactivatePreviousStep = DeactivatePreviousStep;
  var ActivateNextStep = (function() {
    function ActivateNextStep() {
      _classCallCheck(this, ActivateNextStep);
    }
    ActivateNextStep.prototype.run = function run(navigationInstruction, next) {
      return processActivatable(navigationInstruction, 'activate', next, true);
    };
    return ActivateNextStep;
  })();
  exports.ActivateNextStep = ActivateNextStep;
  function processDeactivatable(plan, callbackName, next, ignoreResult) {
    var infos = findDeactivatable(plan, callbackName);
    var i = infos.length;
    function inspect(val) {
      if (ignoreResult || shouldContinue(val)) {
        return iterate();
      }
      return next.cancel(val);
    }
    function iterate() {
      if (i--) {
        try {
          var viewModel = infos[i];
          var _result = viewModel[callbackName]();
          return processPotential(_result, inspect, next.cancel);
        } catch (error) {
          return next.cancel(error);
        }
      }
      return next();
    }
    return iterate();
  }
  function findDeactivatable(plan, callbackName) {
    var list = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
    for (var viewPortName in plan) {
      var viewPortPlan = plan[viewPortName];
      var prevComponent = viewPortPlan.prevComponent;
      if ((viewPortPlan.strategy === activationStrategy.invokeLifecycle || viewPortPlan.strategy === activationStrategy.replace) && prevComponent) {
        var viewModel = prevComponent.viewModel;
        if (callbackName in viewModel) {
          list.push(viewModel);
        }
      }
      if (viewPortPlan.childNavigationInstruction) {
        findDeactivatable(viewPortPlan.childNavigationInstruction.plan, callbackName, list);
      } else if (prevComponent) {
        addPreviousDeactivatable(prevComponent, callbackName, list);
      }
    }
    return list;
  }
  function addPreviousDeactivatable(component, callbackName, list) {
    var childRouter = component.childRouter;
    if (childRouter && childRouter.currentInstruction) {
      var viewPortInstructions = childRouter.currentInstruction.viewPortInstructions;
      for (var viewPortName in viewPortInstructions) {
        var viewPortInstruction = viewPortInstructions[viewPortName];
        var prevComponent = viewPortInstruction.component;
        var prevViewModel = prevComponent.viewModel;
        if (callbackName in prevViewModel) {
          list.push(prevViewModel);
        }
        addPreviousDeactivatable(prevComponent, callbackName, list);
      }
    }
  }
  function processActivatable(navigationInstruction, callbackName, next, ignoreResult) {
    var infos = findActivatable(navigationInstruction, callbackName);
    var length = infos.length;
    var i = -1;
    function inspect(val, router) {
      if (ignoreResult || shouldContinue(val, router)) {
        return iterate();
      }
      return next.cancel(val);
    }
    function iterate() {
      i++;
      if (i < length) {
        try {
          var _ret3 = (function() {
            var _current$viewModel;
            var current = infos[i];
            var result = (_current$viewModel = current.viewModel)[callbackName].apply(_current$viewModel, current.lifecycleArgs);
            return {v: processPotential(result, function(val) {
                return inspect(val, current.router);
              }, next.cancel)};
          })();
          if (typeof _ret3 === 'object')
            return _ret3.v;
        } catch (error) {
          return next.cancel(error);
        }
      }
      return next();
    }
    return iterate();
  }
  function findActivatable(navigationInstruction, callbackName, list, router) {
    if (list === undefined)
      list = [];
    var plan = navigationInstruction.plan;
    Object.keys(plan).filter(function(viewPortName) {
      var viewPortPlan = plan[viewPortName];
      var viewPortInstruction = navigationInstruction.viewPortInstructions[viewPortName];
      var viewModel = viewPortInstruction.component.viewModel;
      if ((viewPortPlan.strategy === activationStrategy.invokeLifecycle || viewPortPlan.strategy === activationStrategy.replace) && callbackName in viewModel) {
        list.push({
          viewModel: viewModel,
          lifecycleArgs: viewPortInstruction.lifecycleArgs,
          router: router
        });
      }
      if (viewPortPlan.childNavigationInstruction) {
        findActivatable(viewPortPlan.childNavigationInstruction, callbackName, list, viewPortInstruction.component.childRouter || router);
      }
    });
    return list;
  }
  function shouldContinue(output, router) {
    if (output instanceof Error) {
      return false;
    }
    if (isNavigationCommand(output)) {
      if (typeof output.setRouter === 'function') {
        output.setRouter(router);
      }
      return !!output.shouldContinueProcessing;
    }
    if (output === undefined) {
      return true;
    }
    return output;
  }
  function processPotential(obj, resolve, reject) {
    if (obj && typeof obj.then === 'function') {
      return Promise.resolve(obj).then(resolve)['catch'](reject);
    }
    try {
      return resolve(obj);
    } catch (error) {
      return reject(error);
    }
  }
  var RouteLoader = (function() {
    function RouteLoader() {
      _classCallCheck(this, RouteLoader);
    }
    RouteLoader.prototype.loadRoute = function loadRoute(router, config, navigationInstruction) {
      throw Error('Route loaders must implement "loadRoute(router, config, navigationInstruction)".');
    };
    return RouteLoader;
  })();
  exports.RouteLoader = RouteLoader;
  var LoadRouteStep = (function() {
    LoadRouteStep.inject = function inject() {
      return [RouteLoader];
    };
    function LoadRouteStep(routeLoader) {
      _classCallCheck(this, LoadRouteStep);
      this.routeLoader = routeLoader;
    }
    LoadRouteStep.prototype.run = function run(navigationInstruction, next) {
      return loadNewRoute(this.routeLoader, navigationInstruction).then(next)['catch'](next.cancel);
    };
    return LoadRouteStep;
  })();
  exports.LoadRouteStep = LoadRouteStep;
  function loadNewRoute(routeLoader, navigationInstruction) {
    var toLoad = determineWhatToLoad(navigationInstruction);
    var loadPromises = toLoad.map(function(current) {
      return loadRoute(routeLoader, current.navigationInstruction, current.viewPortPlan);
    });
    return Promise.all(loadPromises);
  }
  function determineWhatToLoad(navigationInstruction) {
    var toLoad = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
    var plan = navigationInstruction.plan;
    for (var viewPortName in plan) {
      var viewPortPlan = plan[viewPortName];
      if (viewPortPlan.strategy === activationStrategy.replace) {
        toLoad.push({
          viewPortPlan: viewPortPlan,
          navigationInstruction: navigationInstruction
        });
        if (viewPortPlan.childNavigationInstruction) {
          determineWhatToLoad(viewPortPlan.childNavigationInstruction, toLoad);
        }
      } else {
        var viewPortInstruction = navigationInstruction.addViewPortInstruction(viewPortName, viewPortPlan.strategy, viewPortPlan.prevModuleId, viewPortPlan.prevComponent);
        if (viewPortPlan.childNavigationInstruction) {
          viewPortInstruction.childNavigationInstruction = viewPortPlan.childNavigationInstruction;
          determineWhatToLoad(viewPortPlan.childNavigationInstruction, toLoad);
        }
      }
    }
    return toLoad;
  }
  function loadRoute(routeLoader, navigationInstruction, viewPortPlan) {
    var moduleId = viewPortPlan.config.moduleId;
    return loadComponent(routeLoader, navigationInstruction, viewPortPlan.config).then(function(component) {
      var viewPortInstruction = navigationInstruction.addViewPortInstruction(viewPortPlan.name, viewPortPlan.strategy, moduleId, component);
      var childRouter = component.childRouter;
      if (childRouter) {
        var path = navigationInstruction.getWildcardPath();
        return childRouter._createNavigationInstruction(path, navigationInstruction).then(function(childInstruction) {
          viewPortPlan.childNavigationInstruction = childInstruction;
          return _buildNavigationPlan(childInstruction).then(function(childPlan) {
            childInstruction.plan = childPlan;
            viewPortInstruction.childNavigationInstruction = childInstruction;
            return loadNewRoute(routeLoader, childInstruction);
          });
        });
      }
    });
  }
  function loadComponent(routeLoader, navigationInstruction, config) {
    var router = navigationInstruction.router;
    var lifecycleArgs = navigationInstruction.lifecycleArgs;
    return routeLoader.loadRoute(router, config, navigationInstruction).then(function(component) {
      var viewModel = component.viewModel;
      var childContainer = component.childContainer;
      component.router = router;
      component.config = config;
      if ('configureRouter' in viewModel) {
        var _ret4 = (function() {
          var childRouter = childContainer.getChildRouter();
          component.childRouter = childRouter;
          return {v: childRouter.configure(function(c) {
              return viewModel.configureRouter.apply(viewModel, [c, childRouter].concat(lifecycleArgs));
            }).then(function() {
              return component;
            })};
        })();
        if (typeof _ret4 === 'object')
          return _ret4.v;
      }
      return component;
    });
  }
  var PipelineProvider = (function() {
    PipelineProvider.inject = function inject() {
      return [_aureliaDependencyInjection.Container];
    };
    function PipelineProvider(container) {
      _classCallCheck(this, PipelineProvider);
      this.container = container;
      this.steps = [BuildNavigationPlanStep, CanDeactivatePreviousStep, LoadRouteStep, this._createPipelineSlot('authorize'), CanActivateNextStep, this._createPipelineSlot('preActivate', 'modelbind'), DeactivatePreviousStep, ActivateNextStep, this._createPipelineSlot('preRender', 'precommit'), CommitChangesStep, this._createPipelineSlot('postRender', 'postcomplete')];
    }
    PipelineProvider.prototype.createPipeline = function createPipeline() {
      var _this6 = this;
      var pipeline = new Pipeline();
      this.steps.forEach(function(step) {
        return pipeline.addStep(_this6.container.get(step));
      });
      return pipeline;
    };
    PipelineProvider.prototype.addStep = function addStep(name, step) {
      var found = this.steps.find(function(x) {
        return x.slotName === name || x.slotAlias === name;
      });
      if (found) {
        found.steps.push(step);
      } else {
        throw new Error('Invalid pipeline slot name: ' + name + '.');
      }
    };
    PipelineProvider.prototype._createPipelineSlot = function _createPipelineSlot(name, alias) {
      var PipelineSlot = (function() {
        _createClass(PipelineSlot, null, [{
          key: 'inject',
          value: [_aureliaDependencyInjection.Container],
          enumerable: true
        }, {
          key: 'slotName',
          value: name,
          enumerable: true
        }, {
          key: 'slotAlias',
          value: alias,
          enumerable: true
        }, {
          key: 'steps',
          value: [],
          enumerable: true
        }]);
        function PipelineSlot(container) {
          _classCallCheck(this, PipelineSlot);
          this.container = container;
        }
        PipelineSlot.prototype.getSteps = function getSteps() {
          var _this7 = this;
          return PipelineSlot.steps.map(function(x) {
            return _this7.container.get(x);
          });
        };
        return PipelineSlot;
      })();
      return PipelineSlot;
    };
    return PipelineProvider;
  })();
  exports.PipelineProvider = PipelineProvider;
  var logger = _aureliaLogging.getLogger('app-router');
  var AppRouter = (function(_Router) {
    _inherits(AppRouter, _Router);
    AppRouter.inject = function inject() {
      return [_aureliaDependencyInjection.Container, _aureliaHistory.History, PipelineProvider, _aureliaEventAggregator.EventAggregator];
    };
    function AppRouter(container, history, pipelineProvider, events) {
      _classCallCheck(this, AppRouter);
      _Router.call(this, container, history);
      this.pipelineProvider = pipelineProvider;
      this.events = events;
    }
    AppRouter.prototype.reset = function reset() {
      _Router.prototype.reset.call(this);
      this.maxInstructionCount = 10;
      if (!this._queue) {
        this._queue = [];
      } else {
        this._queue.length = 0;
      }
    };
    AppRouter.prototype.loadUrl = function loadUrl(url) {
      var _this8 = this;
      return this._createNavigationInstruction(url).then(function(instruction) {
        return _this8._queueInstruction(instruction);
      })['catch'](function(error) {
        logger.error(error);
        restorePreviousLocation(_this8);
      });
    };
    AppRouter.prototype.registerViewPort = function registerViewPort(viewPort, name) {
      var _this9 = this;
      _Router.prototype.registerViewPort.call(this, viewPort, name);
      if (!this.isActive) {
        var _ret5 = (function() {
          var viewModel = _this9._findViewModel(viewPort);
          if ('configureRouter' in viewModel) {
            if (!_this9.isConfigured) {
              var _ret6 = (function() {
                var resolveConfiguredPromise = _this9._resolveConfiguredPromise;
                _this9._resolveConfiguredPromise = function() {};
                return {v: {v: _this9.configure(function(config) {
                      return viewModel.configureRouter(config, _this9);
                    }).then(function() {
                      _this9.activate();
                      resolveConfiguredPromise();
                    })}};
              })();
              if (typeof _ret6 === 'object')
                return _ret6.v;
            }
          } else {
            _this9.activate();
          }
        })();
        if (typeof _ret5 === 'object')
          return _ret5.v;
      } else {
        this._dequeueInstruction();
      }
      return Promise.resolve();
    };
    AppRouter.prototype.activate = function activate(options) {
      if (this.isActive) {
        return;
      }
      this.isActive = true;
      this.options = Object.assign({routeHandler: this.loadUrl.bind(this)}, this.options, options);
      this.history.activate(this.options);
      this._dequeueInstruction();
    };
    AppRouter.prototype.deactivate = function deactivate() {
      this.isActive = false;
      this.history.deactivate();
    };
    AppRouter.prototype._queueInstruction = function _queueInstruction(instruction) {
      var _this10 = this;
      return new Promise(function(resolve) {
        instruction.resolve = resolve;
        _this10._queue.unshift(instruction);
        _this10._dequeueInstruction();
      });
    };
    AppRouter.prototype._dequeueInstruction = function _dequeueInstruction() {
      var _this11 = this;
      var instructionCount = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
      return Promise.resolve().then(function() {
        if (_this11.isNavigating && !instructionCount) {
          return undefined;
        }
        var instruction = _this11._queue.shift();
        _this11._queue.length = 0;
        if (!instruction) {
          return undefined;
        }
        _this11.isNavigating = true;
        instruction.previousInstruction = _this11.currentInstruction;
        if (!instructionCount) {
          _this11.events.publish('router:navigation:processing', {instruction: instruction});
        } else if (instructionCount === _this11.maxInstructionCount - 1) {
          logger.error(instructionCount + 1 + ' navigation instructions have been attempted without success. Restoring last known good location.');
          restorePreviousLocation(_this11);
          return _this11._dequeueInstruction(instructionCount + 1);
        } else if (instructionCount > _this11.maxInstructionCount) {
          throw new Error('Maximum navigation attempts exceeded. Giving up.');
        }
        var pipeline = _this11.pipelineProvider.createPipeline();
        return pipeline.run(instruction).then(function(result) {
          return processResult(instruction, result, instructionCount, _this11);
        })['catch'](function(error) {
          return {output: error instanceof Error ? error : new Error(error)};
        }).then(function(result) {
          return resolveInstruction(instruction, result, !!instructionCount, _this11);
        });
      });
    };
    AppRouter.prototype._findViewModel = function _findViewModel(viewPort) {
      if (this.container.viewModel) {
        return this.container.viewModel;
      }
      if (viewPort.container) {
        var container = viewPort.container;
        while (container) {
          if (container.viewModel) {
            this.container.viewModel = container.viewModel;
            return container.viewModel;
          }
          container = container.parent;
        }
      }
    };
    return AppRouter;
  })(Router);
  exports.AppRouter = AppRouter;
  function processResult(instruction, result, instructionCount, router) {
    if (!(result && 'completed' in result && 'output' in result)) {
      result = result || {};
      result.output = new Error('Expected router pipeline to return a navigation result, but got [' + JSON.stringify(result) + '] instead.');
    }
    var finalResult = null;
    if (isNavigationCommand(result.output)) {
      result.output.navigate(router);
    } else {
      finalResult = result;
      if (!result.completed) {
        if (result.output instanceof Error) {
          logger.error(result.output);
        }
        restorePreviousLocation(router);
      }
    }
    return router._dequeueInstruction(instructionCount + 1).then(function(innerResult) {
      return finalResult || innerResult || result;
    });
  }
  function resolveInstruction(instruction, result, isInnerInstruction, router) {
    instruction.resolve(result);
    if (!isInnerInstruction) {
      router.isNavigating = false;
      var eventArgs = {
        instruction: instruction,
        result: result
      };
      var eventName = undefined;
      if (result.output instanceof Error) {
        eventName = 'error';
      } else if (!result.completed) {
        eventName = 'canceled';
      } else {
        var _queryString = instruction.queryString ? '?' + instruction.queryString : '';
        router.history.previousLocation = instruction.fragment + _queryString;
        eventName = 'success';
      }
      router.events.publish('router:navigation:' + eventName, eventArgs);
      router.events.publish('router:navigation:complete', eventArgs);
    }
    return result;
  }
  function restorePreviousLocation(router) {
    var previousLocation = router.history.previousLocation;
    if (previousLocation) {
      router.navigate(router.history.previousLocation, {
        trigger: false,
        replace: true
      });
    } else {
      logger.error('Router navigation failed, and no previous location could be restored.');
    }
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-router@1.0.0-beta.1.1.3", ["npm:aurelia-router@1.0.0-beta.1.1.3/aurelia-router"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-route-recognizer@1.0.0-beta.1.1.3/aurelia-route-recognizer", ["exports", "npm:aurelia-path@1.0.0-beta.1.1.1"], function(exports, _aureliaPath) {
  'use strict';
  exports.__esModule = true;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var State = (function() {
    function State(charSpec) {
      _classCallCheck(this, State);
      this.charSpec = charSpec;
      this.nextStates = [];
    }
    State.prototype.get = function get(charSpec) {
      for (var _iterator = this.nextStates,
          _isArray = Array.isArray(_iterator),
          _i = 0,
          _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
        var _ref;
        if (_isArray) {
          if (_i >= _iterator.length)
            break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done)
            break;
          _ref = _i.value;
        }
        var child = _ref;
        var isEqual = child.charSpec.validChars === charSpec.validChars && child.charSpec.invalidChars === charSpec.invalidChars;
        if (isEqual) {
          return child;
        }
      }
    };
    State.prototype.put = function put(charSpec) {
      var state = this.get(charSpec);
      if (state) {
        return state;
      }
      state = new State(charSpec);
      this.nextStates.push(state);
      if (charSpec.repeat) {
        state.nextStates.push(state);
      }
      return state;
    };
    State.prototype.match = function match(ch) {
      var nextStates = this.nextStates;
      var results = [];
      for (var i = 0,
          l = nextStates.length; i < l; i++) {
        var child = nextStates[i];
        var charSpec = child.charSpec;
        if (charSpec.validChars !== undefined) {
          if (charSpec.validChars.indexOf(ch) !== -1) {
            results.push(child);
          }
        } else if (charSpec.invalidChars !== undefined) {
          if (charSpec.invalidChars.indexOf(ch) === -1) {
            results.push(child);
          }
        }
      }
      return results;
    };
    return State;
  })();
  exports.State = State;
  var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
  var escapeRegex = new RegExp('(\\' + specials.join('|\\') + ')', 'g');
  var StaticSegment = (function() {
    function StaticSegment(string) {
      _classCallCheck(this, StaticSegment);
      this.string = string;
    }
    StaticSegment.prototype.eachChar = function eachChar(callback) {
      var s = this.string;
      for (var i = 0,
          ii = s.length; i < ii; ++i) {
        var ch = s[i];
        callback({validChars: ch});
      }
    };
    StaticSegment.prototype.regex = function regex() {
      return this.string.replace(escapeRegex, '\\$1');
    };
    StaticSegment.prototype.generate = function generate() {
      return this.string;
    };
    return StaticSegment;
  })();
  exports.StaticSegment = StaticSegment;
  var DynamicSegment = (function() {
    function DynamicSegment(name) {
      _classCallCheck(this, DynamicSegment);
      this.name = name;
    }
    DynamicSegment.prototype.eachChar = function eachChar(callback) {
      callback({
        invalidChars: '/',
        repeat: true
      });
    };
    DynamicSegment.prototype.regex = function regex() {
      return '([^/]+)';
    };
    DynamicSegment.prototype.generate = function generate(params, consumed) {
      consumed[this.name] = true;
      return params[this.name];
    };
    return DynamicSegment;
  })();
  exports.DynamicSegment = DynamicSegment;
  var StarSegment = (function() {
    function StarSegment(name) {
      _classCallCheck(this, StarSegment);
      this.name = name;
    }
    StarSegment.prototype.eachChar = function eachChar(callback) {
      callback({
        invalidChars: '',
        repeat: true
      });
    };
    StarSegment.prototype.regex = function regex() {
      return '(.+)';
    };
    StarSegment.prototype.generate = function generate(params, consumed) {
      consumed[this.name] = true;
      return params[this.name];
    };
    return StarSegment;
  })();
  exports.StarSegment = StarSegment;
  var EpsilonSegment = (function() {
    function EpsilonSegment() {
      _classCallCheck(this, EpsilonSegment);
    }
    EpsilonSegment.prototype.eachChar = function eachChar() {};
    EpsilonSegment.prototype.regex = function regex() {
      return '';
    };
    EpsilonSegment.prototype.generate = function generate() {
      return '';
    };
    return EpsilonSegment;
  })();
  exports.EpsilonSegment = EpsilonSegment;
  var RouteRecognizer = (function() {
    function RouteRecognizer() {
      _classCallCheck(this, RouteRecognizer);
      this.rootState = new State();
      this.names = {};
    }
    RouteRecognizer.prototype.add = function add(route) {
      var _this = this;
      if (Array.isArray(route)) {
        route.forEach(function(r) {
          return _this.add(r);
        });
        return undefined;
      }
      var currentState = this.rootState;
      var regex = '^';
      var types = {
        statics: 0,
        dynamics: 0,
        stars: 0
      };
      var names = [];
      var routeName = route.handler.name;
      var isEmpty = true;
      var segments = parse(route.path, names, types);
      for (var i = 0,
          ii = segments.length; i < ii; i++) {
        var segment = segments[i];
        if (segment instanceof EpsilonSegment) {
          continue;
        }
        isEmpty = false;
        currentState = currentState.put({validChars: '/'});
        regex += '/';
        currentState = addSegment(currentState, segment);
        regex += segment.regex();
      }
      if (isEmpty) {
        currentState = currentState.put({validChars: '/'});
        regex += '/';
      }
      var handlers = [{
        handler: route.handler,
        names: names
      }];
      if (routeName) {
        var routeNames = Array.isArray(routeName) ? routeName : [routeName];
        for (var i = 0; i < routeNames.length; i++) {
          this.names[routeNames[i]] = {
            segments: segments,
            handlers: handlers
          };
        }
      }
      currentState.handlers = handlers;
      currentState.regex = new RegExp(regex + '$');
      currentState.types = types;
      return currentState;
    };
    RouteRecognizer.prototype.handlersFor = function handlersFor(name) {
      var route = this.names[name];
      if (!route) {
        throw new Error('There is no route named ' + name);
      }
      return [].concat(route.handlers);
    };
    RouteRecognizer.prototype.hasRoute = function hasRoute(name) {
      return !!this.names[name];
    };
    RouteRecognizer.prototype.generate = function generate(name, params) {
      var routeParams = Object.assign({}, params);
      var route = this.names[name];
      if (!route) {
        throw new Error('There is no route named ' + name);
      }
      var segments = route.segments;
      var consumed = {};
      var output = '';
      for (var i = 0,
          l = segments.length; i < l; i++) {
        var segment = segments[i];
        if (segment instanceof EpsilonSegment) {
          continue;
        }
        output += '/';
        var segmentValue = segment.generate(routeParams, consumed);
        if (segmentValue === null || segmentValue === undefined) {
          throw new Error('A value is required for route parameter \'' + segment.name + '\' in route \'' + name + '\'.');
        }
        output += segmentValue;
      }
      if (output.charAt(0) !== '/') {
        output = '/' + output;
      }
      for (var param in consumed) {
        delete routeParams[param];
      }
      var queryString = _aureliaPath.buildQueryString(routeParams);
      output += queryString ? '?' + queryString : '';
      return output;
    };
    RouteRecognizer.prototype.recognize = function recognize(path) {
      var states = [this.rootState];
      var queryParams = {};
      var isSlashDropped = false;
      var normalizedPath = path;
      var queryStart = normalizedPath.indexOf('?');
      if (queryStart !== -1) {
        var queryString = normalizedPath.substr(queryStart + 1, normalizedPath.length);
        normalizedPath = normalizedPath.substr(0, queryStart);
        queryParams = _aureliaPath.parseQueryString(queryString);
      }
      normalizedPath = decodeURI(normalizedPath);
      if (normalizedPath.charAt(0) !== '/') {
        normalizedPath = '/' + normalizedPath;
      }
      var pathLen = normalizedPath.length;
      if (pathLen > 1 && normalizedPath.charAt(pathLen - 1) === '/') {
        normalizedPath = normalizedPath.substr(0, pathLen - 1);
        isSlashDropped = true;
      }
      for (var i = 0,
          l = normalizedPath.length; i < l; i++) {
        states = recognizeChar(states, normalizedPath.charAt(i));
        if (!states.length) {
          break;
        }
      }
      var solutions = [];
      for (var i = 0,
          l = states.length; i < l; i++) {
        if (states[i].handlers) {
          solutions.push(states[i]);
        }
      }
      states = sortSolutions(solutions);
      var state = solutions[0];
      if (state && state.handlers) {
        if (isSlashDropped && state.regex.source.slice(-5) === '(.+)$') {
          normalizedPath = normalizedPath + '/';
        }
        return findHandler(state, normalizedPath, queryParams);
      }
    };
    return RouteRecognizer;
  })();
  exports.RouteRecognizer = RouteRecognizer;
  var RecognizeResults = function RecognizeResults(queryParams) {
    _classCallCheck(this, RecognizeResults);
    this.splice = Array.prototype.splice;
    this.slice = Array.prototype.slice;
    this.push = Array.prototype.push;
    this.length = 0;
    this.queryParams = queryParams || {};
  };
  function parse(route, names, types) {
    var normalizedRoute = route;
    if (route.charAt(0) === '/') {
      normalizedRoute = route.substr(1);
    }
    var results = [];
    var splitRoute = normalizedRoute.split('/');
    for (var i = 0,
        ii = splitRoute.length; i < ii; ++i) {
      var segment = splitRoute[i];
      var match = segment.match(/^:([^\/]+)$/);
      if (match) {
        results.push(new DynamicSegment(match[1]));
        names.push(match[1]);
        types.dynamics++;
        continue;
      }
      match = segment.match(/^\*([^\/]+)$/);
      if (match) {
        results.push(new StarSegment(match[1]));
        names.push(match[1]);
        types.stars++;
      } else if (segment === '') {
        results.push(new EpsilonSegment());
      } else {
        results.push(new StaticSegment(segment));
        types.statics++;
      }
    }
    return results;
  }
  function sortSolutions(states) {
    return states.sort(function(a, b) {
      if (a.types.stars !== b.types.stars) {
        return a.types.stars - b.types.stars;
      }
      if (a.types.stars) {
        if (a.types.statics !== b.types.statics) {
          return b.types.statics - a.types.statics;
        }
        if (a.types.dynamics !== b.types.dynamics) {
          return b.types.dynamics - a.types.dynamics;
        }
      }
      if (a.types.dynamics !== b.types.dynamics) {
        return a.types.dynamics - b.types.dynamics;
      }
      if (a.types.statics !== b.types.statics) {
        return b.types.statics - a.types.statics;
      }
      return 0;
    });
  }
  function recognizeChar(states, ch) {
    var nextStates = [];
    for (var i = 0,
        l = states.length; i < l; i++) {
      var state = states[i];
      nextStates.push.apply(nextStates, state.match(ch));
    }
    return nextStates;
  }
  function findHandler(state, path, queryParams) {
    var handlers = state.handlers;
    var regex = state.regex;
    var captures = path.match(regex);
    var currentCapture = 1;
    var result = new RecognizeResults(queryParams);
    for (var i = 0,
        l = handlers.length; i < l; i++) {
      var _handler = handlers[i];
      var _names = _handler.names;
      var _params = {};
      for (var j = 0,
          m = _names.length; j < m; j++) {
        _params[_names[j]] = captures[currentCapture++];
      }
      result.push({
        handler: _handler.handler,
        params: _params,
        isDynamic: !!_names.length
      });
    }
    return result;
  }
  function addSegment(currentState, segment) {
    var state = currentState;
    segment.eachChar(function(ch) {
      state = state.put(ch);
    });
    return state;
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-route-recognizer@1.0.0-beta.1.1.3", ["npm:aurelia-route-recognizer@1.0.0-beta.1.1.3/aurelia-route-recognizer"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-logging-console@1.0.0-beta.1.1.4/aurelia-logging-console", ["exports", "npm:aurelia-pal@1.0.0-beta.1.1.1", "npm:aurelia-logging@1.0.0-beta.1.1.2"], function(exports, _aureliaPal, _aureliaLogging) {
  'use strict';
  exports.__esModule = true;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  (function(global) {
    global.console = global.console || {};
    var con = global.console;
    var prop = undefined;
    var method = undefined;
    var empty = {};
    var dummy = function dummy() {};
    var properties = 'memory'.split(',');
    var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' + 'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' + 'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
    while (prop = properties.pop())
      if (!con[prop])
        con[prop] = empty;
    while (method = methods.pop())
      if (!con[method])
        con[method] = dummy;
  })(_aureliaPal.PLATFORM.global);
  if (_aureliaPal.PLATFORM.global.console && typeof console.log === 'object') {
    ['log', 'info', 'warn', 'error', 'assert', 'dir', 'clear', 'profile', 'profileEnd'].forEach(function(method) {
      console[method] = this.bind(console[method], console);
    }, Function.prototype.call);
  }
  var ConsoleAppender = (function() {
    function ConsoleAppender() {
      _classCallCheck(this, ConsoleAppender);
    }
    ConsoleAppender.prototype.debug = function debug(logger) {
      for (var _len = arguments.length,
          rest = Array(_len > 1 ? _len - 1 : 0),
          _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
      }
      console.debug.apply(console, ['DEBUG [' + logger.id + ']'].concat(rest));
    };
    ConsoleAppender.prototype.info = function info(logger) {
      for (var _len2 = arguments.length,
          rest = Array(_len2 > 1 ? _len2 - 1 : 0),
          _key2 = 1; _key2 < _len2; _key2++) {
        rest[_key2 - 1] = arguments[_key2];
      }
      console.info.apply(console, ['INFO [' + logger.id + ']'].concat(rest));
    };
    ConsoleAppender.prototype.warn = function warn(logger) {
      for (var _len3 = arguments.length,
          rest = Array(_len3 > 1 ? _len3 - 1 : 0),
          _key3 = 1; _key3 < _len3; _key3++) {
        rest[_key3 - 1] = arguments[_key3];
      }
      console.warn.apply(console, ['WARN [' + logger.id + ']'].concat(rest));
    };
    ConsoleAppender.prototype.error = function error(logger) {
      for (var _len4 = arguments.length,
          rest = Array(_len4 > 1 ? _len4 - 1 : 0),
          _key4 = 1; _key4 < _len4; _key4++) {
        rest[_key4 - 1] = arguments[_key4];
      }
      console.error.apply(console, ['ERROR [' + logger.id + ']'].concat(rest));
    };
    return ConsoleAppender;
  })();
  exports.ConsoleAppender = ConsoleAppender;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-logging-console@1.0.0-beta.1.1.4", ["npm:aurelia-logging-console@1.0.0-beta.1.1.4/aurelia-logging-console"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-loader-default@1.0.0-beta.1.1.3/aurelia-loader-default", ["exports", "npm:aurelia-loader@1.0.0-beta.1.1.1", "npm:aurelia-pal@1.0.0-beta.1.1.1", "npm:aurelia-metadata@1.0.0-beta.1.1.6"], function(exports, _aureliaLoader, _aureliaPal, _aureliaMetadata) {
  'use strict';
  exports.__esModule = true;
  function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var TextTemplateLoader = (function() {
    function TextTemplateLoader() {
      _classCallCheck(this, TextTemplateLoader);
    }
    TextTemplateLoader.prototype.loadTemplate = function loadTemplate(loader, entry) {
      return loader.loadText(entry.address).then(function(text) {
        entry.template = _aureliaPal.DOM.createTemplateFromMarkup(text);
      });
    };
    return TextTemplateLoader;
  })();
  exports.TextTemplateLoader = TextTemplateLoader;
  function ensureOriginOnExports(executed, name) {
    var target = executed;
    var key = undefined;
    var exportedValue = undefined;
    if (target.__useDefault) {
      target = target['default'];
    }
    _aureliaMetadata.Origin.set(target, new _aureliaMetadata.Origin(name, 'default'));
    for (key in target) {
      exportedValue = target[key];
      if (typeof exportedValue === 'function') {
        _aureliaMetadata.Origin.set(exportedValue, new _aureliaMetadata.Origin(name, key));
      }
    }
    return executed;
  }
  var DefaultLoader = (function(_Loader) {
    _inherits(DefaultLoader, _Loader);
    function DefaultLoader() {
      _classCallCheck(this, DefaultLoader);
      _Loader.call(this);
      this.textPluginName = 'text';
      this.moduleRegistry = {};
      this.useTemplateLoader(new TextTemplateLoader());
      var that = this;
      this.addPlugin('template-registry-entry', {'fetch': function fetch(address) {
          var entry = that.getOrCreateTemplateRegistryEntry(address);
          return entry.templateIsLoaded ? entry : that.templateLoader.loadTemplate(that, entry).then(function(x) {
            return entry;
          });
        }});
    }
    DefaultLoader.prototype.useTemplateLoader = function useTemplateLoader(templateLoader) {
      this.templateLoader = templateLoader;
    };
    DefaultLoader.prototype.loadAllModules = function loadAllModules(ids) {
      var loads = [];
      for (var i = 0,
          ii = ids.length; i < ii; ++i) {
        loads.push(this.loadModule(ids[i]));
      }
      return Promise.all(loads);
    };
    DefaultLoader.prototype.loadTemplate = function loadTemplate(url) {
      return this._import(this.applyPluginToUrl(url, 'template-registry-entry'));
    };
    DefaultLoader.prototype.loadText = function loadText(url) {
      return this._import(this.applyPluginToUrl(url, this.textPluginName));
    };
    return DefaultLoader;
  })(_aureliaLoader.Loader);
  exports.DefaultLoader = DefaultLoader;
  _aureliaPal.PLATFORM.Loader = DefaultLoader;
  if (!_aureliaPal.PLATFORM.global.System || !_aureliaPal.PLATFORM.global.System['import']) {
    if (_aureliaPal.PLATFORM.global.requirejs && requirejs.s && requirejs.s.contexts && requirejs.s.contexts._ && requirejs.s.contexts._.defined) {
      _aureliaPal.PLATFORM.eachModule = function(callback) {
        var defined = requirejs.s.contexts._.defined;
        for (var key in defined) {
          try {
            if (callback(key, defined[key]))
              return;
          } catch (e) {}
        }
      };
    } else {
      _aureliaPal.PLATFORM.eachModule = function(callback) {};
    }
    DefaultLoader.prototype._import = function(moduleId) {
      return new Promise(function(resolve, reject) {
        require([moduleId], resolve, reject);
      });
    };
    DefaultLoader.prototype.loadModule = function(id) {
      var _this = this;
      var existing = this.moduleRegistry[id];
      if (existing !== undefined) {
        return Promise.resolve(existing);
      }
      return new Promise(function(resolve, reject) {
        require([id], function(m) {
          _this.moduleRegistry[id] = m;
          resolve(ensureOriginOnExports(m, id));
        }, reject);
      });
    };
    DefaultLoader.prototype.map = function(id, source) {};
    DefaultLoader.prototype.normalize = function(moduleId, relativeTo) {
      return Promise.resolve(moduleId);
    };
    DefaultLoader.prototype.normalizeSync = function(moduleId, relativeTo) {
      return moduleId;
    };
    DefaultLoader.prototype.applyPluginToUrl = function(url, pluginName) {
      return pluginName + '!' + url;
    };
    DefaultLoader.prototype.addPlugin = function(pluginName, implementation) {
      var nonAnonDefine = define;
      nonAnonDefine(pluginName, [], {'load': function load(name, req, onload) {
          var address = req.toUrl(name);
          var result = implementation.fetch(address);
          Promise.resolve(result).then(onload);
        }});
    };
  } else {
    _aureliaPal.PLATFORM.eachModule = function(callback) {
      var modules = System._loader.modules;
      for (var key in modules) {
        try {
          if (callback(key, modules[key].module))
            return;
        } catch (e) {}
      }
    };
    System.set('text', System.newModule({'translate': function translate(load) {
        return 'module.exports = "' + load.source.replace(/(["\\])/g, '\\$1').replace(/[\f]/g, '\\f').replace(/[\b]/g, '\\b').replace(/[\n]/g, '\\n').replace(/[\t]/g, '\\t').replace(/[\r]/g, '\\r').replace(/[\u2028]/g, '\\u2028').replace(/[\u2029]/g, '\\u2029') + '";';
      }}));
    DefaultLoader.prototype._import = function(moduleId) {
      return System['import'](moduleId);
    };
    DefaultLoader.prototype.loadModule = function(id) {
      var _this2 = this;
      return System.normalize(id).then(function(newId) {
        var existing = _this2.moduleRegistry[newId];
        if (existing !== undefined) {
          return Promise.resolve(existing);
        }
        return System['import'](newId).then(function(m) {
          _this2.moduleRegistry[newId] = m;
          return ensureOriginOnExports(m, newId);
        });
      });
    };
    DefaultLoader.prototype.map = function(id, source) {
      System.map[id] = source;
    };
    DefaultLoader.prototype.normalizeSync = function(moduleId, relativeTo) {
      return System.normalizeSync(moduleId, relativeTo);
    };
    DefaultLoader.prototype.normalize = function(moduleId, relativeTo) {
      return System.normalize(moduleId, relativeTo);
    };
    DefaultLoader.prototype.applyPluginToUrl = function(url, pluginName) {
      return url + '!' + pluginName;
    };
    DefaultLoader.prototype.addPlugin = function(pluginName, implementation) {
      System.set(pluginName, System.newModule({
        'fetch': function fetch(load, _fetch) {
          var result = implementation.fetch(load.address);
          return Promise.resolve(result).then(function(x) {
            load.metadata.result = x;
            return '';
          });
        },
        'instantiate': function instantiate(load) {
          return load.metadata.result;
        }
      }));
    };
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-loader-default@1.0.0-beta.1.1.3", ["npm:aurelia-loader-default@1.0.0-beta.1.1.3/aurelia-loader-default"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-http-client@1.0.0-beta.1.1.2/aurelia-http-client", ["exports", "npm:aurelia-path@1.0.0-beta.1.1.1", "npm:aurelia-pal@1.0.0-beta.1.1.1"], function(exports, _aureliaPath, _aureliaPal) {
  'use strict';
  exports.__esModule = true;
  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  exports.timeoutTransformer = timeoutTransformer;
  exports.callbackParameterNameTransformer = callbackParameterNameTransformer;
  exports.credentialsTransformer = credentialsTransformer;
  exports.progressTransformer = progressTransformer;
  exports.responseTypeTransformer = responseTypeTransformer;
  exports.headerTransformer = headerTransformer;
  exports.contentTransformer = contentTransformer;
  exports.createJSONPRequestMessageProcessor = createJSONPRequestMessageProcessor;
  exports.createHttpRequestMessageProcessor = createHttpRequestMessageProcessor;
  function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var Headers = (function() {
    function Headers() {
      var headers = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      _classCallCheck(this, Headers);
      this.headers = headers;
    }
    Headers.prototype.add = function add(key, value) {
      this.headers[key] = value;
    };
    Headers.prototype.get = function get(key) {
      return this.headers[key];
    };
    Headers.prototype.clear = function clear() {
      this.headers = {};
    };
    Headers.prototype.has = function has(header) {
      var lowered = header.toLowerCase();
      var headers = this.headers;
      for (var _key in headers) {
        if (_key.toLowerCase() === lowered) {
          return true;
        }
      }
      return false;
    };
    Headers.prototype.configureXHR = function configureXHR(xhr) {
      var headers = this.headers;
      for (var _key2 in headers) {
        xhr.setRequestHeader(_key2, headers[_key2]);
      }
    };
    Headers.parse = function parse(headerStr) {
      var headers = new Headers();
      if (!headerStr) {
        return headers;
      }
      var headerPairs = headerStr.split('\r\n');
      for (var i = 0; i < headerPairs.length; i++) {
        var headerPair = headerPairs[i];
        var index = headerPair.indexOf(': ');
        if (index > 0) {
          var _key3 = headerPair.substring(0, index);
          var val = headerPair.substring(index + 2);
          headers.add(_key3, val);
        }
      }
      return headers;
    };
    return Headers;
  })();
  exports.Headers = Headers;
  var RequestMessage = (function() {
    function RequestMessage(method, url, content, headers) {
      _classCallCheck(this, RequestMessage);
      this.method = method;
      this.url = url;
      this.content = content;
      this.headers = headers || new Headers();
      this.baseUrl = '';
    }
    RequestMessage.prototype.buildFullUrl = function buildFullUrl() {
      var absoluteUrl = /^([a-z][a-z0-9+\-.]*:)?\/\//i;
      var url = absoluteUrl.test(this.url) ? this.url : _aureliaPath.join(this.baseUrl, this.url);
      if (this.params) {
        var qs = _aureliaPath.buildQueryString(this.params);
        url = qs ? url + '?' + qs : url;
      }
      return url;
    };
    return RequestMessage;
  })();
  exports.RequestMessage = RequestMessage;
  var HttpResponseMessage = (function() {
    function HttpResponseMessage(requestMessage, xhr, responseType, reviver) {
      _classCallCheck(this, HttpResponseMessage);
      this.requestMessage = requestMessage;
      this.statusCode = xhr.status;
      this.response = xhr.response || xhr.responseText;
      this.isSuccess = xhr.status >= 200 && xhr.status < 400;
      this.statusText = xhr.statusText;
      this.reviver = reviver;
      this.mimeType = null;
      if (xhr.getAllResponseHeaders) {
        try {
          this.headers = Headers.parse(xhr.getAllResponseHeaders());
        } catch (err) {
          if (xhr.requestHeaders)
            this.headers = {headers: xhr.requestHeaders};
        }
      } else {
        this.headers = new Headers();
      }
      var contentType = undefined;
      if (this.headers && this.headers.headers)
        contentType = this.headers.headers['Content-Type'];
      if (contentType) {
        this.mimeType = responseType = contentType.split(';')[0].trim();
        if (mimeTypes.hasOwnProperty(this.mimeType))
          responseType = mimeTypes[this.mimeType];
      }
      this.responseType = responseType;
    }
    _createClass(HttpResponseMessage, [{
      key: 'content',
      get: function get() {
        try {
          if (this._content !== undefined) {
            return this._content;
          }
          if (this.response === undefined || this.response === null) {
            this._content = this.response;
            return this._content;
          }
          if (this.responseType === 'json') {
            this._content = JSON.parse(this.response, this.reviver);
            return this._content;
          }
          if (this.reviver) {
            this._content = this.reviver(this.response);
            return this._content;
          }
          this._content = this.response;
          return this._content;
        } catch (e) {
          if (this.isSuccess) {
            throw e;
          }
          this._content = null;
          return this._content;
        }
      }
    }]);
    return HttpResponseMessage;
  })();
  exports.HttpResponseMessage = HttpResponseMessage;
  var mimeTypes = {
    'text/html': 'html',
    'text/javascript': 'js',
    'application/javascript': 'js',
    'text/json': 'json',
    'application/json': 'json',
    'application/rss+xml': 'rss',
    'application/atom+xml': 'atom',
    'application/xhtml+xml': 'xhtml',
    'text/markdown': 'md',
    'text/xml': 'xml',
    'text/mathml': 'mml',
    'application/xml': 'xml',
    'text/yml': 'yml',
    'text/csv': 'csv',
    'text/css': 'css',
    'text/less': 'less',
    'text/stylus': 'styl',
    'text/scss': 'scss',
    'text/sass': 'sass',
    'text/plain': 'txt'
  };
  exports.mimeTypes = mimeTypes;
  function applyXhrTransformers(xhrTransformers, client, processor, message, xhr) {
    var i = undefined;
    var ii = undefined;
    for (i = 0, ii = xhrTransformers.length; i < ii; ++i) {
      xhrTransformers[i](client, processor, message, xhr);
    }
  }
  var RequestMessageProcessor = (function() {
    function RequestMessageProcessor(xhrType, xhrTransformers) {
      _classCallCheck(this, RequestMessageProcessor);
      this.XHRType = xhrType;
      this.xhrTransformers = xhrTransformers;
      this.isAborted = false;
    }
    RequestMessageProcessor.prototype.abort = function abort() {
      if (this.xhr && this.xhr.readyState !== _aureliaPal.PLATFORM.XMLHttpRequest.UNSENT) {
        this.xhr.abort();
      }
      this.isAborted = true;
    };
    RequestMessageProcessor.prototype.process = function process(client, requestMessage) {
      var _this = this;
      var promise = new Promise(function(resolve, reject) {
        var xhr = _this.xhr = new _this.XHRType();
        xhr.onload = function(e) {
          var response = new HttpResponseMessage(requestMessage, xhr, requestMessage.responseType, requestMessage.reviver);
          if (response.isSuccess) {
            resolve(response);
          } else {
            reject(response);
          }
        };
        xhr.ontimeout = function(e) {
          reject(new HttpResponseMessage(requestMessage, {
            response: e,
            status: xhr.status,
            statusText: xhr.statusText
          }, 'timeout'));
        };
        xhr.onerror = function(e) {
          reject(new HttpResponseMessage(requestMessage, {
            response: e,
            status: xhr.status,
            statusText: xhr.statusText
          }, 'error'));
        };
        xhr.onabort = function(e) {
          reject(new HttpResponseMessage(requestMessage, {
            response: e,
            status: xhr.status,
            statusText: xhr.statusText
          }, 'abort'));
        };
      });
      return Promise.resolve(requestMessage).then(function(message) {
        var processRequest = function processRequest() {
          if (_this.isAborted) {
            _this.xhr.abort();
          } else {
            _this.xhr.open(message.method, message.buildFullUrl(), true, message.user, message.password);
            applyXhrTransformers(_this.xhrTransformers, client, _this, message, _this.xhr);
            _this.xhr.send(message.content);
          }
          return promise;
        };
        var chain = [[processRequest, undefined]];
        var interceptors = message.interceptors || [];
        interceptors.forEach(function(interceptor) {
          if (interceptor.request || interceptor.requestError) {
            chain.unshift([interceptor.request ? interceptor.request.bind(interceptor) : undefined, interceptor.requestError ? interceptor.requestError.bind(interceptor) : undefined]);
          }
          if (interceptor.response || interceptor.responseError) {
            chain.push([interceptor.response ? interceptor.response.bind(interceptor) : undefined, interceptor.responseError ? interceptor.responseError.bind(interceptor) : undefined]);
          }
        });
        var interceptorsPromise = Promise.resolve(message);
        while (chain.length) {
          var _interceptorsPromise;
          interceptorsPromise = (_interceptorsPromise = interceptorsPromise).then.apply(_interceptorsPromise, chain.shift());
        }
        return interceptorsPromise;
      });
    };
    return RequestMessageProcessor;
  })();
  exports.RequestMessageProcessor = RequestMessageProcessor;
  function timeoutTransformer(client, processor, message, xhr) {
    if (message.timeout !== undefined) {
      xhr.timeout = message.timeout;
    }
  }
  function callbackParameterNameTransformer(client, processor, message, xhr) {
    if (message.callbackParameterName !== undefined) {
      xhr.callbackParameterName = message.callbackParameterName;
    }
  }
  function credentialsTransformer(client, processor, message, xhr) {
    if (message.withCredentials !== undefined) {
      xhr.withCredentials = message.withCredentials;
    }
  }
  function progressTransformer(client, processor, message, xhr) {
    if (message.progressCallback) {
      xhr.upload.onprogress = message.progressCallback;
    }
  }
  function responseTypeTransformer(client, processor, message, xhr) {
    var responseType = message.responseType;
    if (responseType === 'json') {
      responseType = 'text';
    }
    xhr.responseType = responseType;
  }
  function headerTransformer(client, processor, message, xhr) {
    message.headers.configureXHR(xhr);
  }
  function contentTransformer(client, processor, message, xhr) {
    if (message.skipContentProcessing) {
      return;
    }
    if (_aureliaPal.PLATFORM.global.FormData && message.content instanceof FormData) {
      return;
    }
    if (_aureliaPal.PLATFORM.global.Blob && message.content instanceof Blob) {
      return;
    }
    if (_aureliaPal.PLATFORM.global.ArrayBufferView && message.content instanceof ArrayBufferView) {
      return;
    }
    if (message.content instanceof Document) {
      return;
    }
    if (typeof message.content === 'string') {
      return;
    }
    if (message.content === null || message.content === undefined) {
      return;
    }
    message.content = JSON.stringify(message.content, message.replacer);
    if (!message.headers.has('Content-Type')) {
      message.headers.add('Content-Type', 'application/json');
    }
  }
  var JSONPRequestMessage = (function(_RequestMessage) {
    _inherits(JSONPRequestMessage, _RequestMessage);
    function JSONPRequestMessage(url, callbackParameterName) {
      _classCallCheck(this, JSONPRequestMessage);
      _RequestMessage.call(this, 'JSONP', url);
      this.responseType = 'jsonp';
      this.callbackParameterName = callbackParameterName;
    }
    return JSONPRequestMessage;
  })(RequestMessage);
  exports.JSONPRequestMessage = JSONPRequestMessage;
  var JSONPXHR = (function() {
    function JSONPXHR() {
      _classCallCheck(this, JSONPXHR);
    }
    JSONPXHR.prototype.open = function open(method, url) {
      this.method = method;
      this.url = url;
      this.callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    };
    JSONPXHR.prototype.send = function send() {
      var _this2 = this;
      var url = this.url + (this.url.indexOf('?') >= 0 ? '&' : '?') + encodeURIComponent(this.callbackParameterName) + '=' + this.callbackName;
      var script = _aureliaPal.DOM.createElement('script');
      script.src = url;
      script.onerror = function(e) {
        cleanUp();
        _this2.status = 0;
        _this2.onerror(new Error('error'));
      };
      var cleanUp = function cleanUp() {
        delete _aureliaPal.PLATFORM.global[_this2.callbackName];
        _aureliaPal.DOM.removeNode(script);
      };
      _aureliaPal.PLATFORM.global[this.callbackName] = function(data) {
        cleanUp();
        if (_this2.status === undefined) {
          _this2.status = 200;
          _this2.statusText = 'OK';
          _this2.response = data;
          _this2.onload(_this2);
        }
      };
      _aureliaPal.DOM.appendNode(script);
      if (this.timeout !== undefined) {
        setTimeout(function() {
          if (_this2.status === undefined) {
            _this2.status = 0;
            _this2.ontimeout(new Error('timeout'));
          }
        }, this.timeout);
      }
    };
    JSONPXHR.prototype.abort = function abort() {
      if (this.status === undefined) {
        this.status = 0;
        this.onabort(new Error('abort'));
      }
    };
    JSONPXHR.prototype.setRequestHeader = function setRequestHeader() {};
    return JSONPXHR;
  })();
  function createJSONPRequestMessageProcessor() {
    return new RequestMessageProcessor(JSONPXHR, [timeoutTransformer, callbackParameterNameTransformer]);
  }
  var HttpRequestMessage = (function(_RequestMessage2) {
    _inherits(HttpRequestMessage, _RequestMessage2);
    function HttpRequestMessage(method, url, content, headers) {
      _classCallCheck(this, HttpRequestMessage);
      _RequestMessage2.call(this, method, url, content, headers);
      this.responseType = 'json';
    }
    return HttpRequestMessage;
  })(RequestMessage);
  exports.HttpRequestMessage = HttpRequestMessage;
  function createHttpRequestMessageProcessor() {
    return new RequestMessageProcessor(_aureliaPal.PLATFORM.XMLHttpRequest, [timeoutTransformer, credentialsTransformer, progressTransformer, responseTypeTransformer, contentTransformer, headerTransformer]);
  }
  var RequestBuilder = (function() {
    function RequestBuilder(client) {
      _classCallCheck(this, RequestBuilder);
      this.client = client;
      this.transformers = client.requestTransformers.slice(0);
      this.useJsonp = false;
    }
    RequestBuilder.prototype.asDelete = function asDelete() {
      return this._addTransformer(function(client, processor, message) {
        message.method = 'DELETE';
      });
    };
    RequestBuilder.prototype.asGet = function asGet() {
      return this._addTransformer(function(client, processor, message) {
        message.method = 'GET';
      });
    };
    RequestBuilder.prototype.asHead = function asHead() {
      return this._addTransformer(function(client, processor, message) {
        message.method = 'HEAD';
      });
    };
    RequestBuilder.prototype.asOptions = function asOptions() {
      return this._addTransformer(function(client, processor, message) {
        message.method = 'OPTIONS';
      });
    };
    RequestBuilder.prototype.asPatch = function asPatch() {
      return this._addTransformer(function(client, processor, message) {
        message.method = 'PATCH';
      });
    };
    RequestBuilder.prototype.asPost = function asPost() {
      return this._addTransformer(function(client, processor, message) {
        message.method = 'POST';
      });
    };
    RequestBuilder.prototype.asPut = function asPut() {
      return this._addTransformer(function(client, processor, message) {
        message.method = 'PUT';
      });
    };
    RequestBuilder.prototype.asJsonp = function asJsonp(callbackParameterName) {
      this.useJsonp = true;
      return this._addTransformer(function(client, processor, message) {
        message.callbackParameterName = callbackParameterName;
      });
    };
    RequestBuilder.prototype.withUrl = function withUrl(url) {
      return this._addTransformer(function(client, processor, message) {
        message.url = url;
      });
    };
    RequestBuilder.prototype.withContent = function withContent(content) {
      return this._addTransformer(function(client, processor, message) {
        message.content = content;
      });
    };
    RequestBuilder.prototype.withBaseUrl = function withBaseUrl(baseUrl) {
      return this._addTransformer(function(client, processor, message) {
        message.baseUrl = baseUrl;
      });
    };
    RequestBuilder.prototype.withParams = function withParams(params) {
      return this._addTransformer(function(client, processor, message) {
        message.params = params;
      });
    };
    RequestBuilder.prototype.withResponseType = function withResponseType(responseType) {
      return this._addTransformer(function(client, processor, message) {
        message.responseType = responseType;
      });
    };
    RequestBuilder.prototype.withTimeout = function withTimeout(timeout) {
      return this._addTransformer(function(client, processor, message) {
        message.timeout = timeout;
      });
    };
    RequestBuilder.prototype.withHeader = function withHeader(key, value) {
      return this._addTransformer(function(client, processor, message) {
        message.headers.add(key, value);
      });
    };
    RequestBuilder.prototype.withCredentials = function withCredentials(value) {
      return this._addTransformer(function(client, processor, message) {
        message.withCredentials = value;
      });
    };
    RequestBuilder.prototype.withLogin = function withLogin(user, password) {
      return this._addTransformer(function(client, processor, message) {
        message.user = user;
        message.password = password;
      });
    };
    RequestBuilder.prototype.withReviver = function withReviver(reviver) {
      return this._addTransformer(function(client, processor, message) {
        message.reviver = reviver;
      });
    };
    RequestBuilder.prototype.withReplacer = function withReplacer(replacer) {
      return this._addTransformer(function(client, processor, message) {
        message.replacer = replacer;
      });
    };
    RequestBuilder.prototype.withProgressCallback = function withProgressCallback(progressCallback) {
      return this._addTransformer(function(client, processor, message) {
        message.progressCallback = progressCallback;
      });
    };
    RequestBuilder.prototype.withCallbackParameterName = function withCallbackParameterName(callbackParameterName) {
      return this._addTransformer(function(client, processor, message) {
        message.callbackParameterName = callbackParameterName;
      });
    };
    RequestBuilder.prototype.withInterceptor = function withInterceptor(interceptor) {
      return this._addTransformer(function(client, processor, message) {
        message.interceptors = message.interceptors || [];
        message.interceptors.unshift(interceptor);
      });
    };
    RequestBuilder.prototype.skipContentProcessing = function skipContentProcessing() {
      return this._addTransformer(function(client, processor, message) {
        message.skipContentProcessing = true;
      });
    };
    RequestBuilder.prototype._addTransformer = function _addTransformer(fn) {
      this.transformers.push(fn);
      return this;
    };
    RequestBuilder.addHelper = function addHelper(name, fn) {
      RequestBuilder.prototype[name] = function() {
        return this._addTransformer(fn.apply(this, arguments));
      };
    };
    RequestBuilder.prototype.send = function send() {
      var message = this.useJsonp ? new JSONPRequestMessage() : new HttpRequestMessage();
      return this.client.send(message, this.transformers);
    };
    return RequestBuilder;
  })();
  exports.RequestBuilder = RequestBuilder;
  function trackRequestStart(client, processor) {
    client.pendingRequests.push(processor);
    client.isRequesting = true;
  }
  function trackRequestEnd(client, processor) {
    var index = client.pendingRequests.indexOf(processor);
    client.pendingRequests.splice(index, 1);
    client.isRequesting = client.pendingRequests.length > 0;
    if (!client.isRequesting) {
      (function() {
        var evt = _aureliaPal.DOM.createCustomEvent('aurelia-http-client-requests-drained', {
          bubbles: true,
          cancelable: true
        });
        setTimeout(function() {
          return _aureliaPal.DOM.dispatchEvent(evt);
        }, 1);
      })();
    }
  }
  var HttpClient = (function() {
    function HttpClient() {
      _classCallCheck(this, HttpClient);
      this.isRequesting = false;
      this.requestTransformers = [];
      this.requestProcessorFactories = new Map();
      this.requestProcessorFactories.set(HttpRequestMessage, createHttpRequestMessageProcessor);
      this.requestProcessorFactories.set(JSONPRequestMessage, createJSONPRequestMessageProcessor);
      this.pendingRequests = [];
    }
    HttpClient.prototype.configure = function configure(fn) {
      var builder = new RequestBuilder(this);
      fn(builder);
      this.requestTransformers = builder.transformers;
      return this;
    };
    HttpClient.prototype.createRequest = function createRequest(url) {
      var builder = new RequestBuilder(this);
      if (url) {
        builder.withUrl(url);
      }
      return builder;
    };
    HttpClient.prototype.send = function send(requestMessage, transformers) {
      var _this3 = this;
      var createProcessor = this.requestProcessorFactories.get(requestMessage.constructor);
      var processor = undefined;
      var promise = undefined;
      var i = undefined;
      var ii = undefined;
      if (!createProcessor) {
        throw new Error('No request message processor factory for ' + requestMessage.constructor + '.');
      }
      processor = createProcessor();
      trackRequestStart(this, processor);
      transformers = transformers || this.requestTransformers;
      promise = Promise.resolve(requestMessage).then(function(message) {
        for (i = 0, ii = transformers.length; i < ii; ++i) {
          transformers[i](_this3, processor, message);
        }
        return processor.process(_this3, message).then(function(response) {
          trackRequestEnd(_this3, processor);
          return response;
        })['catch'](function(response) {
          trackRequestEnd(_this3, processor);
          throw response;
        });
      });
      promise.abort = promise.cancel = function() {
        processor.abort();
      };
      return promise;
    };
    HttpClient.prototype['delete'] = function _delete(url) {
      return this.createRequest(url).asDelete().send();
    };
    HttpClient.prototype.get = function get(url) {
      return this.createRequest(url).asGet().send();
    };
    HttpClient.prototype.head = function head(url) {
      return this.createRequest(url).asHead().send();
    };
    HttpClient.prototype.jsonp = function jsonp(url) {
      var callbackParameterName = arguments.length <= 1 || arguments[1] === undefined ? 'jsoncallback' : arguments[1];
      return this.createRequest(url).asJsonp(callbackParameterName).send();
    };
    HttpClient.prototype.options = function options(url) {
      return this.createRequest(url).asOptions().send();
    };
    HttpClient.prototype.put = function put(url, content) {
      return this.createRequest(url).asPut().withContent(content).send();
    };
    HttpClient.prototype.patch = function patch(url, content) {
      return this.createRequest(url).asPatch().withContent(content).send();
    };
    HttpClient.prototype.post = function post(url, content) {
      return this.createRequest(url).asPost().withContent(content).send();
    };
    return HttpClient;
  })();
  exports.HttpClient = HttpClient;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-http-client@1.0.0-beta.1.1.2", ["npm:aurelia-http-client@1.0.0-beta.1.1.2/aurelia-http-client"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-history-browser@1.0.0-beta.1.1.4/aurelia-history-browser", ["exports", "npm:aurelia-pal@1.0.0-beta.1.1.1", "npm:aurelia-history@1.0.0-beta.1.1.1"], function(exports, _aureliaPal, _aureliaHistory) {
  'use strict';
  exports.__esModule = true;
  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  exports.configure = configure;
  function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var LinkHandler = (function() {
    function LinkHandler() {
      _classCallCheck(this, LinkHandler);
    }
    LinkHandler.prototype.activate = function activate(history) {};
    LinkHandler.prototype.deactivate = function deactivate() {};
    return LinkHandler;
  })();
  exports.LinkHandler = LinkHandler;
  var DefaultLinkHandler = (function(_LinkHandler) {
    _inherits(DefaultLinkHandler, _LinkHandler);
    function DefaultLinkHandler() {
      var _this = this;
      _classCallCheck(this, DefaultLinkHandler);
      _LinkHandler.call(this);
      this.handler = function(e) {
        var _DefaultLinkHandler$getEventInfo = DefaultLinkHandler.getEventInfo(e);
        var shouldHandleEvent = _DefaultLinkHandler$getEventInfo.shouldHandleEvent;
        var href = _DefaultLinkHandler$getEventInfo.href;
        if (shouldHandleEvent) {
          e.preventDefault();
          _this.history.navigate(href);
        }
      };
    }
    DefaultLinkHandler.prototype.activate = function activate(history) {
      if (history._hasPushState) {
        this.history = history;
        _aureliaPal.DOM.addEventListener('click', this.handler, true);
      }
    };
    DefaultLinkHandler.prototype.deactivate = function deactivate() {
      _aureliaPal.DOM.removeEventListener('click', this.handler);
    };
    DefaultLinkHandler.getEventInfo = function getEventInfo(event) {
      var info = {
        shouldHandleEvent: false,
        href: null,
        anchor: null
      };
      var target = DefaultLinkHandler.findClosestAnchor(event.target);
      if (!target || !DefaultLinkHandler.targetIsThisWindow(target)) {
        return info;
      }
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return info;
      }
      var href = target.getAttribute('href');
      info.anchor = target;
      info.href = href;
      var leftButtonClicked = event.which === 1;
      var isRelative = href && !(href.charAt(0) === '#' || /^[a-z]+:/i.test(href));
      info.shouldHandleEvent = leftButtonClicked && isRelative;
      return info;
    };
    DefaultLinkHandler.findClosestAnchor = function findClosestAnchor(el) {
      while (el) {
        if (el.tagName === 'A') {
          return el;
        }
        el = el.parentNode;
      }
    };
    DefaultLinkHandler.targetIsThisWindow = function targetIsThisWindow(target) {
      var targetWindow = target.getAttribute('target');
      var win = _aureliaPal.PLATFORM.global;
      return !targetWindow || targetWindow === win.name || targetWindow === '_self' || targetWindow === 'top' && win === win.top;
    };
    return DefaultLinkHandler;
  })(LinkHandler);
  exports.DefaultLinkHandler = DefaultLinkHandler;
  function configure(config) {
    config.singleton(_aureliaHistory.History, BrowserHistory);
    config.transient(LinkHandler, DefaultLinkHandler);
  }
  var BrowserHistory = (function(_History) {
    _inherits(BrowserHistory, _History);
    _createClass(BrowserHistory, null, [{
      key: 'inject',
      value: [LinkHandler],
      enumerable: true
    }]);
    function BrowserHistory(linkHandler) {
      _classCallCheck(this, BrowserHistory);
      _History.call(this);
      this._isActive = false;
      this._checkUrlCallback = this._checkUrl.bind(this);
      this.location = _aureliaPal.PLATFORM.location;
      this.history = _aureliaPal.PLATFORM.history;
      this.linkHandler = linkHandler;
    }
    BrowserHistory.prototype.activate = function activate(options) {
      if (this._isActive) {
        throw new Error('History has already been activated.');
      }
      var wantsPushState = !!options.pushState;
      this._isActive = true;
      this.options = Object.assign({}, {root: '/'}, this.options, options);
      this.root = ('/' + this.options.root + '/').replace(rootStripper, '/');
      this._wantsHashChange = this.options.hashChange !== false;
      this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
      var eventName = undefined;
      if (this._hasPushState) {
        eventName = 'popstate';
      } else if (this._wantsHashChange) {
        eventName = 'hashchange';
      }
      _aureliaPal.PLATFORM.addEventListener(eventName, this._checkUrlCallback);
      if (this._wantsHashChange && wantsPushState) {
        var loc = this.location;
        var atRoot = loc.pathname.replace(/[^\/]$/, '$&/') === this.root;
        if (!this._hasPushState && !atRoot) {
          this.fragment = this._getFragment(null, true);
          this.location.replace(this.root + this.location.search + '#' + this.fragment);
          return true;
        } else if (this._hasPushState && atRoot && loc.hash) {
          this.fragment = this._getHash().replace(routeStripper, '');
          this.history.replaceState({}, _aureliaPal.DOM.title, this.root + this.fragment + loc.search);
        }
      }
      if (!this.fragment) {
        this.fragment = this._getFragment();
      }
      this.linkHandler.activate(this);
      if (!this.options.silent) {
        return this._loadUrl();
      }
    };
    BrowserHistory.prototype.deactivate = function deactivate() {
      _aureliaPal.PLATFORM.removeEventListener('popstate', this._checkUrlCallback);
      _aureliaPal.PLATFORM.removeEventListener('hashchange', this._checkUrlCallback);
      this._isActive = false;
      this.linkHandler.deactivate();
    };
    BrowserHistory.prototype.navigate = function navigate(fragment) {
      var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var _ref$trigger = _ref.trigger;
      var trigger = _ref$trigger === undefined ? true : _ref$trigger;
      var _ref$replace = _ref.replace;
      var replace = _ref$replace === undefined ? false : _ref$replace;
      if (fragment && absoluteUrl.test(fragment)) {
        this.location.href = fragment;
        return true;
      }
      if (!this._isActive) {
        return false;
      }
      fragment = this._getFragment(fragment || '');
      if (this.fragment === fragment && !replace) {
        return false;
      }
      this.fragment = fragment;
      var url = this.root + fragment;
      if (fragment === '' && url !== '/') {
        url = url.slice(0, -1);
      }
      if (this._hasPushState) {
        url = url.replace('//', '/');
        this.history[replace ? 'replaceState' : 'pushState']({}, _aureliaPal.DOM.title, url);
      } else if (this._wantsHashChange) {
        updateHash(this.location, fragment, replace);
      } else {
        return this.location.assign(url);
      }
      if (trigger) {
        return this._loadUrl(fragment);
      }
    };
    BrowserHistory.prototype.navigateBack = function navigateBack() {
      this.history.back();
    };
    BrowserHistory.prototype.setTitle = function setTitle(title) {
      _aureliaPal.DOM.title = title;
    };
    BrowserHistory.prototype._getHash = function _getHash() {
      return this.location.hash.substr(1);
    };
    BrowserHistory.prototype._getFragment = function _getFragment(fragment, forcePushState) {
      var root = undefined;
      if (!fragment) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = this.location.pathname + this.location.search;
          root = this.root.replace(trailingSlash, '');
          if (!fragment.indexOf(root)) {
            fragment = fragment.substr(root.length);
          }
        } else {
          fragment = this._getHash();
        }
      }
      return '/' + fragment.replace(routeStripper, '');
    };
    BrowserHistory.prototype._checkUrl = function _checkUrl() {
      var current = this._getFragment();
      if (current !== this.fragment) {
        this._loadUrl();
      }
    };
    BrowserHistory.prototype._loadUrl = function _loadUrl(fragmentOverride) {
      var fragment = this.fragment = this._getFragment(fragmentOverride);
      return this.options.routeHandler ? this.options.routeHandler(fragment) : false;
    };
    return BrowserHistory;
  })(_aureliaHistory.History);
  exports.BrowserHistory = BrowserHistory;
  var routeStripper = /^#?\/*|\s+$/g;
  var rootStripper = /^\/+|\/+$/g;
  var trailingSlash = /\/$/;
  var absoluteUrl = /^([a-z][a-z0-9+\-.]*:)?\/\//i;
  function updateHash(location, fragment, replace) {
    if (replace) {
      var href = location.href.replace(/(javascript:|#).*$/, '');
      location.replace(href + '#' + fragment);
    } else {
      location.hash = '#' + fragment;
    }
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-history-browser@1.0.0-beta.1.1.4", ["npm:aurelia-history-browser@1.0.0-beta.1.1.4/aurelia-history-browser"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-history@1.0.0-beta.1.1.1/aurelia-history", ["exports"], function(exports) {
  'use strict';
  exports.__esModule = true;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var History = (function() {
    function History() {
      _classCallCheck(this, History);
    }
    History.prototype.activate = function activate(options) {
      throw new Error('History must implement activate().');
    };
    History.prototype.deactivate = function deactivate() {
      throw new Error('History must implement deactivate().');
    };
    History.prototype.navigate = function navigate(fragment, options) {
      throw new Error('History must implement navigate().');
    };
    History.prototype.navigateBack = function navigateBack() {
      throw new Error('History must implement navigateBack().');
    };
    History.prototype.setTitle = function setTitle(title) {
      throw new Error('History must implement setTitle().');
    };
    return History;
  })();
  exports.History = History;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-history@1.0.0-beta.1.1.1", ["npm:aurelia-history@1.0.0-beta.1.1.1/aurelia-history"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-loader@1.0.0-beta.1.1.1/aurelia-loader", ["exports", "npm:aurelia-path@1.0.0-beta.1.1.1", "npm:aurelia-metadata@1.0.0-beta.1.1.6"], function(exports, _aureliaPath, _aureliaMetadata) {
  'use strict';
  exports.__esModule = true;
  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var TemplateDependency = function TemplateDependency(src, name) {
    _classCallCheck(this, TemplateDependency);
    this.src = src;
    this.name = name;
  };
  exports.TemplateDependency = TemplateDependency;
  var TemplateRegistryEntry = (function() {
    function TemplateRegistryEntry(address) {
      _classCallCheck(this, TemplateRegistryEntry);
      this.templateIsLoaded = false;
      this.factoryIsReady = false;
      this.resources = null;
      this.dependencies = null;
      this.address = address;
      this.onReady = null;
      this._template = null;
      this._factory = null;
    }
    TemplateRegistryEntry.prototype.addDependency = function addDependency(src, name) {
      var finalSrc = typeof src === 'string' ? _aureliaPath.relativeToFile(src, this.address) : _aureliaMetadata.Origin.get(src).moduleId;
      this.dependencies.push(new TemplateDependency(finalSrc, name));
    };
    _createClass(TemplateRegistryEntry, [{
      key: 'template',
      get: function get() {
        return this._template;
      },
      set: function set(value) {
        var address = this.address;
        var requires = undefined;
        var current = undefined;
        var src = undefined;
        var dependencies = undefined;
        this._template = value;
        this.templateIsLoaded = true;
        requires = value.content.querySelectorAll('require');
        dependencies = this.dependencies = new Array(requires.length);
        for (var i = 0,
            ii = requires.length; i < ii; ++i) {
          current = requires[i];
          src = current.getAttribute('from');
          if (!src) {
            throw new Error('<require> element in ' + address + ' has no "from" attribute.');
          }
          dependencies[i] = new TemplateDependency(_aureliaPath.relativeToFile(src, address), current.getAttribute('as'));
          if (current.parentNode) {
            current.parentNode.removeChild(current);
          }
        }
      }
    }, {
      key: 'factory',
      get: function get() {
        return this._factory;
      },
      set: function set(value) {
        this._factory = value;
        this.factoryIsReady = true;
      }
    }]);
    return TemplateRegistryEntry;
  })();
  exports.TemplateRegistryEntry = TemplateRegistryEntry;
  var Loader = (function() {
    function Loader() {
      _classCallCheck(this, Loader);
      this.templateRegistry = {};
    }
    Loader.prototype.map = function map(id, source) {
      throw new Error('Loaders must implement map(id, source).');
    };
    Loader.prototype.normalizeSync = function normalizeSync(moduleId, relativeTo) {
      throw new Error('Loaders must implement normalizeSync(moduleId, relativeTo).');
    };
    Loader.prototype.normalize = function normalize(moduleId, relativeTo) {
      throw new Error('Loaders must implement normalize(moduleId: string, relativeTo: string): Promise<string>.');
    };
    Loader.prototype.loadModule = function loadModule(id) {
      throw new Error('Loaders must implement loadModule(id).');
    };
    Loader.prototype.loadAllModules = function loadAllModules(ids) {
      throw new Error('Loader must implement loadAllModules(ids).');
    };
    Loader.prototype.loadTemplate = function loadTemplate(url) {
      throw new Error('Loader must implement loadTemplate(url).');
    };
    Loader.prototype.loadText = function loadText(url) {
      throw new Error('Loader must implement loadText(url).');
    };
    Loader.prototype.applyPluginToUrl = function applyPluginToUrl(url, pluginName) {
      throw new Error('Loader must implement applyPluginToUrl(url, pluginName).');
    };
    Loader.prototype.addPlugin = function addPlugin(pluginName, implementation) {
      throw new Error('Loader must implement addPlugin(pluginName, implementation).');
    };
    Loader.prototype.getOrCreateTemplateRegistryEntry = function getOrCreateTemplateRegistryEntry(address) {
      return this.templateRegistry[address] || (this.templateRegistry[address] = new TemplateRegistryEntry(address));
    };
    return Loader;
  })();
  exports.Loader = Loader;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-loader@1.0.0-beta.1.1.1", ["npm:aurelia-loader@1.0.0-beta.1.1.1/aurelia-loader"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-path@1.0.0-beta.1.1.1/aurelia-path", ["exports"], function(exports) {
  'use strict';
  exports.__esModule = true;
  exports.relativeToFile = relativeToFile;
  exports.join = join;
  exports.buildQueryString = buildQueryString;
  exports.parseQueryString = parseQueryString;
  function trimDots(ary) {
    for (var i = 0; i < ary.length; ++i) {
      var part = ary[i];
      if (part === '.') {
        ary.splice(i, 1);
        i -= 1;
      } else if (part === '..') {
        if (i === 0 || i === 1 && ary[2] === '..' || ary[i - 1] === '..') {
          continue;
        } else if (i > 0) {
          ary.splice(i - 1, 2);
          i -= 2;
        }
      }
    }
  }
  function relativeToFile(name, file) {
    var fileParts = file && file.split('/');
    var nameParts = name.trim().split('/');
    if (nameParts[0].charAt(0) === '.' && fileParts) {
      var normalizedBaseParts = fileParts.slice(0, fileParts.length - 1);
      nameParts.unshift.apply(nameParts, normalizedBaseParts);
    }
    trimDots(nameParts);
    return nameParts.join('/');
  }
  function join(path1, path2) {
    if (!path1) {
      return path2;
    }
    if (!path2) {
      return path1;
    }
    var schemeMatch = path1.match(/^([^/]*?:)\//);
    var scheme = schemeMatch && schemeMatch.length > 0 ? schemeMatch[1] : '';
    path1 = path1.substr(scheme.length);
    var urlPrefix = undefined;
    if (path1.indexOf('///') === 0 && scheme === 'file:') {
      urlPrefix = '///';
    } else if (path1.indexOf('//') === 0) {
      urlPrefix = '//';
    } else if (path1.indexOf('/') === 0) {
      urlPrefix = '/';
    } else {
      urlPrefix = '';
    }
    var trailingSlash = path2.slice(-1) === '/' ? '/' : '';
    var url1 = path1.split('/');
    var url2 = path2.split('/');
    var url3 = [];
    for (var i = 0,
        ii = url1.length; i < ii; ++i) {
      if (url1[i] === '..') {
        url3.pop();
      } else if (url1[i] === '.' || url1[i] === '') {
        continue;
      } else {
        url3.push(url1[i]);
      }
    }
    for (var i = 0,
        ii = url2.length; i < ii; ++i) {
      if (url2[i] === '..') {
        url3.pop();
      } else if (url2[i] === '.' || url2[i] === '') {
        continue;
      } else {
        url3.push(url2[i]);
      }
    }
    return scheme + urlPrefix + url3.join('/') + trailingSlash;
  }
  var encode = encodeURIComponent;
  var encodeKey = function encodeKey(k) {
    return encode(k).replace('%24', '$');
  };
  function buildParam(key, value) {
    var result = [];
    if (value === null || value === undefined) {
      return result;
    }
    if (Array.isArray(value)) {
      for (var i = 0,
          l = value.length; i < l; i++) {
        var arrayKey = key + '[' + (typeof value[i] === 'object' && value[i] !== null ? i : '') + ']';
        result = result.concat(buildParam(arrayKey, value[i]));
      }
    } else if (typeof value === 'object') {
      for (var propertyName in value) {
        result = result.concat(buildParam(key + '[' + propertyName + ']', value[propertyName]));
      }
    } else {
      result.push(encodeKey(key) + '=' + encode(value));
    }
    return result;
  }
  function buildQueryString(params) {
    var pairs = [];
    var keys = Object.keys(params || {}).sort();
    for (var i = 0,
        len = keys.length; i < len; i++) {
      var key = keys[i];
      pairs = pairs.concat(buildParam(key, params[key]));
    }
    if (pairs.length === 0) {
      return '';
    }
    return pairs.join('&');
  }
  function processScalarParam(existedParam, value, isPrimitive) {
    if (Array.isArray(existedParam)) {
      existedParam.push(value);
      return existedParam;
    }
    if (existedParam !== undefined) {
      return isPrimitive ? value : [existedParam, value];
    }
    return value;
  }
  function parseComplexParam(queryParams, keys, value) {
    var currentParams = queryParams;
    var keysLastIndex = keys.length - 1;
    for (var j = 0; j <= keysLastIndex; j++) {
      var key = keys[j] === '' ? currentParams.length : keys[j];
      if (j < keysLastIndex) {
        currentParams = currentParams[key] = currentParams[key] || (keys[j + 1] ? {} : []);
      } else {
        currentParams = currentParams[key] = value;
      }
    }
  }
  function parseQueryString(queryString) {
    var queryParams = {};
    if (!queryString || typeof queryString !== 'string') {
      return queryParams;
    }
    var query = queryString;
    if (query.charAt(0) === '?') {
      query = query.substr(1);
    }
    var pairs = query.replace(/\+/g, ' ').split('&');
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split('=');
      var key = decodeURIComponent(pair[0]);
      var isPrimitive = false;
      if (!key) {
        continue;
      }
      var keys = key.split('][');
      var keysLastIndex = keys.length - 1;
      if (/\[/.test(keys[0]) && /\]$/.test(keys[keysLastIndex])) {
        keys[keysLastIndex] = keys[keysLastIndex].replace(/\]$/, '');
        keys = keys.shift().split('[').concat(keys);
        keysLastIndex = keys.length - 1;
      } else {
        isPrimitive = true;
        keysLastIndex = 0;
      }
      if (pair.length === 2) {
        var value = pair[1] ? decodeURIComponent(pair[1]) : '';
        if (keysLastIndex) {
          parseComplexParam(queryParams, keys, value);
        } else {
          queryParams[key] = processScalarParam(queryParams[key], value, isPrimitive);
        }
      } else {
        queryParams[key] = true;
      }
    }
    return queryParams;
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-path@1.0.0-beta.1.1.1", ["npm:aurelia-path@1.0.0-beta.1.1.1/aurelia-path"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating@1.0.0-beta.1.1.4/aurelia-templating", ["exports", "npm:aurelia-logging@1.0.0-beta.1.1.2", "npm:aurelia-pal@1.0.0-beta.1.1.1", "npm:aurelia-metadata@1.0.0-beta.1.1.6", "npm:aurelia-path@1.0.0-beta.1.1.1", "npm:aurelia-loader@1.0.0-beta.1.1.1", "npm:aurelia-binding@1.0.0-beta.1.2.2", "npm:aurelia-dependency-injection@1.0.0-beta.1.1.5", "npm:aurelia-task-queue@1.0.0-beta.1.1.1"], function(exports, _aureliaLogging, _aureliaPal, _aureliaMetadata, _aureliaPath, _aureliaLoader, _aureliaBinding, _aureliaDependencyInjection, _aureliaTaskQueue) {
  'use strict';
  exports.__esModule = true;
  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  exports._hyphenate = _hyphenate;
  exports.children = children;
  exports.child = child;
  exports.resource = resource;
  exports.behavior = behavior;
  exports.customElement = customElement;
  exports.customAttribute = customAttribute;
  exports.templateController = templateController;
  exports.bindable = bindable;
  exports.dynamicOptions = dynamicOptions;
  exports.useShadowDOM = useShadowDOM;
  exports.processAttributes = processAttributes;
  exports.processContent = processContent;
  exports.containerless = containerless;
  exports.useViewStrategy = useViewStrategy;
  exports.useView = useView;
  exports.inlineView = inlineView;
  exports.noView = noView;
  exports.elementConfig = elementConfig;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var animationEvent = {
    enterBegin: 'animation:enter:begin',
    enterActive: 'animation:enter:active',
    enterDone: 'animation:enter:done',
    enterTimeout: 'animation:enter:timeout',
    leaveBegin: 'animation:leave:begin',
    leaveActive: 'animation:leave:active',
    leaveDone: 'animation:leave:done',
    leaveTimeout: 'animation:leave:timeout',
    staggerNext: 'animation:stagger:next',
    removeClassBegin: 'animation:remove-class:begin',
    removeClassActive: 'animation:remove-class:active',
    removeClassDone: 'animation:remove-class:done',
    removeClassTimeout: 'animation:remove-class:timeout',
    addClassBegin: 'animation:add-class:begin',
    addClassActive: 'animation:add-class:active',
    addClassDone: 'animation:add-class:done',
    addClassTimeout: 'animation:add-class:timeout',
    animateBegin: 'animation:animate:begin',
    animateActive: 'animation:animate:active',
    animateDone: 'animation:animate:done',
    animateTimeout: 'animation:animate:timeout',
    sequenceBegin: 'animation:sequence:begin',
    sequenceDone: 'animation:sequence:done'
  };
  exports.animationEvent = animationEvent;
  var Animator = (function() {
    function Animator() {
      _classCallCheck(this, Animator);
    }
    Animator.prototype.enter = function enter(element) {
      return Promise.resolve(false);
    };
    Animator.prototype.leave = function leave(element) {
      return Promise.resolve(false);
    };
    Animator.prototype.removeClass = function removeClass(element, className) {
      element.classList.remove(className);
      return Promise.resolve(false);
    };
    Animator.prototype.addClass = function addClass(element, className) {
      element.classList.add(className);
      return Promise.resolve(false);
    };
    Animator.prototype.animate = function animate(element, className) {
      return Promise.resolve(false);
    };
    Animator.prototype.runSequence = function runSequence(animations) {};
    Animator.prototype.registerEffect = function registerEffect(effectName, properties) {};
    Animator.prototype.unregisterEffect = function unregisterEffect(effectName) {};
    return Animator;
  })();
  exports.Animator = Animator;
  var CompositionTransaction = (function() {
    function CompositionTransaction() {
      _classCallCheck(this, CompositionTransaction);
      this._ownershipToken = null;
      this._compositionCount = 0;
    }
    CompositionTransaction.prototype.tryCapture = function tryCapture() {
      if (this._ownershipToken !== null) {
        return null;
      }
      return this._ownershipToken = this._createOwnershipToken();
    };
    CompositionTransaction.prototype.enlist = function enlist() {
      var that = this;
      that._compositionCount++;
      return {done: function done() {
          that._compositionCount--;
          that._tryCompleteTransaction();
        }};
    };
    CompositionTransaction.prototype._tryCompleteTransaction = function _tryCompleteTransaction() {
      if (this._compositionCount <= 0) {
        this._compositionCount = 0;
        if (this._ownershipToken !== null) {
          var capture = this._ownershipToken;
          this._ownershipToken = null;
          capture._resolve();
        }
      }
    };
    CompositionTransaction.prototype._createOwnershipToken = function _createOwnershipToken() {
      var _this = this;
      var token = {};
      var promise = new Promise(function(resolve, reject) {
        token._resolve = resolve;
      });
      token.waitForCompositionComplete = function() {
        _this._tryCompleteTransaction();
        return promise;
      };
      return token;
    };
    return CompositionTransaction;
  })();
  exports.CompositionTransaction = CompositionTransaction;
  var capitalMatcher = /([A-Z])/g;
  function addHyphenAndLower(char) {
    return '-' + char.toLowerCase();
  }
  function _hyphenate(name) {
    return (name.charAt(0).toLowerCase() + name.slice(1)).replace(capitalMatcher, addHyphenAndLower);
  }
  var ElementEvents = (function() {
    function ElementEvents(element) {
      _classCallCheck(this, ElementEvents);
      this.element = element;
      this.subscriptions = {};
    }
    ElementEvents.prototype._enqueueHandler = function _enqueueHandler(handler) {
      this.subscriptions[handler.eventName] = this.subscriptions[handler.eventName] || [];
      this.subscriptions[handler.eventName].push(handler);
    };
    ElementEvents.prototype._dequeueHandler = function _dequeueHandler(handler) {
      var index = undefined;
      var subscriptions = this.subscriptions[handler.eventName];
      if (subscriptions) {
        index = subscriptions.indexOf(handler);
        if (index > -1) {
          subscriptions.splice(index, 1);
        }
      }
      return handler;
    };
    ElementEvents.prototype.publish = function publish(eventName) {
      var detail = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var bubbles = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
      var cancelable = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];
      var event = _aureliaPal.DOM.createCustomEvent(eventName, {
        cancelable: cancelable,
        bubbles: bubbles,
        detail: detail
      });
      this.element.dispatchEvent(event);
    };
    ElementEvents.prototype.subscribe = function subscribe(eventName, handler) {
      var _this2 = this;
      var bubbles = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
      if (handler && typeof handler === 'function') {
        handler.eventName = eventName;
        handler.handler = handler;
        handler.bubbles = bubbles;
        handler.dispose = function() {
          _this2.element.removeEventListener(eventName, handler, bubbles);
          _this2._dequeueHandler(handler);
        };
        this.element.addEventListener(eventName, handler, bubbles);
        this._enqueueHandler(handler);
        return handler;
      }
    };
    ElementEvents.prototype.subscribeOnce = function subscribeOnce(eventName, handler) {
      var _this3 = this;
      var bubbles = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
      if (handler && typeof handler === 'function') {
        var _ret = (function() {
          var _handler = function _handler(event) {
            handler(event);
            _handler.dispose();
          };
          return {v: _this3.subscribe(eventName, _handler, bubbles)};
        })();
        if (typeof _ret === 'object')
          return _ret.v;
      }
    };
    ElementEvents.prototype.dispose = function dispose(eventName) {
      if (eventName && typeof eventName === 'string') {
        var subscriptions = this.subscriptions[eventName];
        if (subscriptions) {
          while (subscriptions.length) {
            var subscription = subscriptions.pop();
            if (subscription) {
              subscription.dispose();
            }
          }
        }
      } else {
        this.disposeAll();
      }
    };
    ElementEvents.prototype.disposeAll = function disposeAll() {
      for (var key in this.subscriptions) {
        this.dispose(key);
      }
    };
    return ElementEvents;
  })();
  exports.ElementEvents = ElementEvents;
  var ResourceLoadContext = (function() {
    function ResourceLoadContext() {
      _classCallCheck(this, ResourceLoadContext);
      this.dependencies = {};
    }
    ResourceLoadContext.prototype.addDependency = function addDependency(url) {
      this.dependencies[url] = true;
    };
    ResourceLoadContext.prototype.hasDependency = function hasDependency(url) {
      return url in this.dependencies;
    };
    return ResourceLoadContext;
  })();
  exports.ResourceLoadContext = ResourceLoadContext;
  var ViewCompileInstruction = (function() {
    _createClass(ViewCompileInstruction, null, [{
      key: 'normal',
      value: new ViewCompileInstruction(),
      enumerable: true
    }]);
    function ViewCompileInstruction() {
      var targetShadowDOM = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
      var compileSurrogate = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
      _classCallCheck(this, ViewCompileInstruction);
      this.targetShadowDOM = targetShadowDOM;
      this.compileSurrogate = compileSurrogate;
      this.associatedModuleId = null;
    }
    return ViewCompileInstruction;
  })();
  exports.ViewCompileInstruction = ViewCompileInstruction;
  var BehaviorInstruction = (function() {
    BehaviorInstruction.enhance = function enhance() {
      var instruction = new BehaviorInstruction();
      instruction.enhance = true;
      return instruction;
    };
    BehaviorInstruction.unitTest = function unitTest(type, attributes) {
      var instruction = new BehaviorInstruction();
      instruction.type = type;
      instruction.attributes = attributes || {};
      return instruction;
    };
    BehaviorInstruction.element = function element(node, type) {
      var instruction = new BehaviorInstruction();
      instruction.type = type;
      instruction.attributes = {};
      instruction.anchorIsContainer = !(node.hasAttribute('containerless') || type.containerless);
      instruction.initiatedByBehavior = true;
      return instruction;
    };
    BehaviorInstruction.attribute = function attribute(attrName, type) {
      var instruction = new BehaviorInstruction();
      instruction.attrName = attrName;
      instruction.type = type || null;
      instruction.attributes = {};
      return instruction;
    };
    BehaviorInstruction.dynamic = function dynamic(host, viewModel, viewFactory) {
      var instruction = new BehaviorInstruction();
      instruction.host = host;
      instruction.viewModel = viewModel;
      instruction.viewFactory = viewFactory;
      instruction.inheritBindingContext = true;
      return instruction;
    };
    _createClass(BehaviorInstruction, null, [{
      key: 'normal',
      value: new BehaviorInstruction(),
      enumerable: true
    }]);
    function BehaviorInstruction() {
      _classCallCheck(this, BehaviorInstruction);
      this.initiatedByBehavior = false;
      this.enhance = false;
      this.partReplacements = null;
      this.viewFactory = null;
      this.originalAttrName = null;
      this.skipContentProcessing = false;
      this.contentFactory = null;
      this.viewModel = null;
      this.anchorIsContainer = false;
      this.host = null;
      this.attributes = null;
      this.type = null;
      this.attrName = null;
      this.inheritBindingContext = false;
    }
    return BehaviorInstruction;
  })();
  exports.BehaviorInstruction = BehaviorInstruction;
  var TargetInstruction = (function() {
    TargetInstruction.contentSelector = function contentSelector(node, parentInjectorId) {
      var instruction = new TargetInstruction();
      instruction.parentInjectorId = parentInjectorId;
      instruction.contentSelector = true;
      instruction.selector = node.getAttribute('select');
      return instruction;
    };
    TargetInstruction.contentExpression = function contentExpression(expression) {
      var instruction = new TargetInstruction();
      instruction.contentExpression = expression;
      return instruction;
    };
    TargetInstruction.lifting = function lifting(parentInjectorId, liftingInstruction) {
      var instruction = new TargetInstruction();
      instruction.parentInjectorId = parentInjectorId;
      instruction.expressions = TargetInstruction.noExpressions;
      instruction.behaviorInstructions = [liftingInstruction];
      instruction.viewFactory = liftingInstruction.viewFactory;
      instruction.providers = [liftingInstruction.type.target];
      instruction.lifting = true;
      return instruction;
    };
    TargetInstruction.normal = function normal(injectorId, parentInjectorId, providers, behaviorInstructions, expressions, elementInstruction) {
      var instruction = new TargetInstruction();
      instruction.injectorId = injectorId;
      instruction.parentInjectorId = parentInjectorId;
      instruction.providers = providers;
      instruction.behaviorInstructions = behaviorInstructions;
      instruction.expressions = expressions;
      instruction.anchorIsContainer = elementInstruction ? elementInstruction.anchorIsContainer : true;
      instruction.elementInstruction = elementInstruction;
      return instruction;
    };
    TargetInstruction.surrogate = function surrogate(providers, behaviorInstructions, expressions, values) {
      var instruction = new TargetInstruction();
      instruction.expressions = expressions;
      instruction.behaviorInstructions = behaviorInstructions;
      instruction.providers = providers;
      instruction.values = values;
      return instruction;
    };
    _createClass(TargetInstruction, null, [{
      key: 'noExpressions',
      value: Object.freeze([]),
      enumerable: true
    }]);
    function TargetInstruction() {
      _classCallCheck(this, TargetInstruction);
      this.injectorId = null;
      this.parentInjectorId = null;
      this.contentSelector = false;
      this.selector = null;
      this.contentExpression = null;
      this.expressions = null;
      this.behaviorInstructions = null;
      this.providers = null;
      this.viewFactory = null;
      this.anchorIsContainer = false;
      this.elementInstruction = null;
      this.lifting = false;
      this.values = null;
    }
    return TargetInstruction;
  })();
  exports.TargetInstruction = TargetInstruction;
  var viewStrategy = _aureliaMetadata.protocol.create('aurelia:view-strategy', {
    validate: function validate(target) {
      if (!(typeof target.loadViewFactory === 'function')) {
        return 'View strategies must implement: loadViewFactory(viewEngine: ViewEngine, compileInstruction: ViewCompileInstruction, loadContext?: ResourceLoadContext): Promise<ViewFactory>';
      }
      return true;
    },
    compose: function compose(target) {
      if (!(typeof target.makeRelativeTo === 'function')) {
        target.makeRelativeTo = _aureliaPal.PLATFORM.noop;
      }
    }
  });
  exports.viewStrategy = viewStrategy;
  var RelativeViewStrategy = (function() {
    function RelativeViewStrategy(path) {
      _classCallCheck(this, _RelativeViewStrategy);
      this.path = path;
      this.absolutePath = null;
    }
    RelativeViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext) {
      if (this.absolutePath === null && this.moduleId) {
        this.absolutePath = _aureliaPath.relativeToFile(this.path, this.moduleId);
      }
      compileInstruction.associatedModuleId = this.moduleId;
      return viewEngine.loadViewFactory(this.absolutePath || this.path, compileInstruction, loadContext);
    };
    RelativeViewStrategy.prototype.makeRelativeTo = function makeRelativeTo(file) {
      if (this.absolutePath === null) {
        this.absolutePath = _aureliaPath.relativeToFile(this.path, file);
      }
    };
    var _RelativeViewStrategy = RelativeViewStrategy;
    RelativeViewStrategy = viewStrategy()(RelativeViewStrategy) || RelativeViewStrategy;
    return RelativeViewStrategy;
  })();
  exports.RelativeViewStrategy = RelativeViewStrategy;
  var ConventionalViewStrategy = (function() {
    function ConventionalViewStrategy(viewLocator, origin) {
      _classCallCheck(this, _ConventionalViewStrategy);
      this.moduleId = origin.moduleId;
      this.viewUrl = viewLocator.convertOriginToViewUrl(origin);
    }
    ConventionalViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext) {
      compileInstruction.associatedModuleId = this.moduleId;
      return viewEngine.loadViewFactory(this.viewUrl, compileInstruction, loadContext);
    };
    var _ConventionalViewStrategy = ConventionalViewStrategy;
    ConventionalViewStrategy = viewStrategy()(ConventionalViewStrategy) || ConventionalViewStrategy;
    return ConventionalViewStrategy;
  })();
  exports.ConventionalViewStrategy = ConventionalViewStrategy;
  var NoViewStrategy = (function() {
    function NoViewStrategy() {
      _classCallCheck(this, _NoViewStrategy);
    }
    NoViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext) {
      return Promise.resolve(null);
    };
    var _NoViewStrategy = NoViewStrategy;
    NoViewStrategy = viewStrategy()(NoViewStrategy) || NoViewStrategy;
    return NoViewStrategy;
  })();
  exports.NoViewStrategy = NoViewStrategy;
  var TemplateRegistryViewStrategy = (function() {
    function TemplateRegistryViewStrategy(moduleId, entry) {
      _classCallCheck(this, _TemplateRegistryViewStrategy);
      this.moduleId = moduleId;
      this.entry = entry;
    }
    TemplateRegistryViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext) {
      var entry = this.entry;
      if (entry.factoryIsReady) {
        return Promise.resolve(entry.factory);
      }
      compileInstruction.associatedModuleId = this.moduleId;
      return viewEngine.loadViewFactory(entry, compileInstruction, loadContext);
    };
    var _TemplateRegistryViewStrategy = TemplateRegistryViewStrategy;
    TemplateRegistryViewStrategy = viewStrategy()(TemplateRegistryViewStrategy) || TemplateRegistryViewStrategy;
    return TemplateRegistryViewStrategy;
  })();
  exports.TemplateRegistryViewStrategy = TemplateRegistryViewStrategy;
  var InlineViewStrategy = (function() {
    function InlineViewStrategy(markup, dependencies, dependencyBaseUrl) {
      _classCallCheck(this, _InlineViewStrategy);
      this.markup = markup;
      this.dependencies = dependencies || null;
      this.dependencyBaseUrl = dependencyBaseUrl || '';
    }
    InlineViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext) {
      var entry = this.entry;
      var dependencies = this.dependencies;
      if (entry && entry.factoryIsReady) {
        return Promise.resolve(entry.factory);
      }
      this.entry = entry = new _aureliaLoader.TemplateRegistryEntry(this.moduleId || this.dependencyBaseUrl);
      entry.template = _aureliaPal.DOM.createTemplateFromMarkup(this.markup);
      if (dependencies !== null) {
        for (var i = 0,
            ii = dependencies.length; i < ii; ++i) {
          var current = dependencies[i];
          if (typeof current === 'string' || typeof current === 'function') {
            entry.addDependency(current);
          } else {
            entry.addDependency(current.from, current.as);
          }
        }
      }
      compileInstruction.associatedModuleId = this.moduleId;
      return viewEngine.loadViewFactory(entry, compileInstruction, loadContext);
    };
    var _InlineViewStrategy = InlineViewStrategy;
    InlineViewStrategy = viewStrategy()(InlineViewStrategy) || InlineViewStrategy;
    return InlineViewStrategy;
  })();
  exports.InlineViewStrategy = InlineViewStrategy;
  var ViewLocator = (function() {
    function ViewLocator() {
      _classCallCheck(this, ViewLocator);
    }
    ViewLocator.prototype.getViewStrategy = function getViewStrategy(value) {
      if (!value) {
        return null;
      }
      if (typeof value === 'object' && 'getViewStrategy' in value) {
        var _origin = _aureliaMetadata.Origin.get(value.constructor);
        value = value.getViewStrategy();
        if (typeof value === 'string') {
          value = new RelativeViewStrategy(value);
        }
        viewStrategy.assert(value);
        if (_origin) {
          value.makeRelativeTo(_origin.moduleId);
        }
        return value;
      }
      if (typeof value === 'string') {
        value = new RelativeViewStrategy(value);
      }
      if (viewStrategy.validate(value)) {
        return value;
      }
      if (typeof value !== 'function') {
        value = value.constructor;
      }
      var origin = _aureliaMetadata.Origin.get(value);
      var strategy = _aureliaMetadata.metadata.get(ViewLocator.viewStrategyMetadataKey, value);
      if (!strategy) {
        if (!origin) {
          throw new Error('Cannot determinte default view strategy for object.', value);
        }
        strategy = this.createFallbackViewStrategy(origin);
      } else if (origin) {
        strategy.moduleId = origin.moduleId;
      }
      return strategy;
    };
    ViewLocator.prototype.createFallbackViewStrategy = function createFallbackViewStrategy(origin) {
      return new ConventionalViewStrategy(this, origin);
    };
    ViewLocator.prototype.convertOriginToViewUrl = function convertOriginToViewUrl(origin) {
      var moduleId = origin.moduleId;
      var id = moduleId.endsWith('.js') || moduleId.endsWith('.ts') ? moduleId.substring(0, moduleId.length - 3) : moduleId;
      return id + '.html';
    };
    _createClass(ViewLocator, null, [{
      key: 'viewStrategyMetadataKey',
      value: 'aurelia:view-strategy',
      enumerable: true
    }]);
    return ViewLocator;
  })();
  exports.ViewLocator = ViewLocator;
  var BindingLanguage = (function() {
    function BindingLanguage() {
      _classCallCheck(this, BindingLanguage);
    }
    BindingLanguage.prototype.inspectAttribute = function inspectAttribute(resources, attrName, attrValue) {
      throw new Error('A BindingLanguage must implement inspectAttribute(...)');
    };
    BindingLanguage.prototype.createAttributeInstruction = function createAttributeInstruction(resources, element, info, existingInstruction) {
      throw new Error('A BindingLanguage must implement createAttributeInstruction(...)');
    };
    BindingLanguage.prototype.parseText = function parseText(resources, value) {
      throw new Error('A BindingLanguage must implement parseText(...)');
    };
    return BindingLanguage;
  })();
  exports.BindingLanguage = BindingLanguage;
  function register(lookup, name, resource, type) {
    if (!name) {
      return;
    }
    var existing = lookup[name];
    if (existing) {
      if (existing !== resource) {
        throw new Error('Attempted to register ' + type + ' when one with the same name already exists. Name: ' + name + '.');
      }
      return;
    }
    lookup[name] = resource;
  }
  var ViewResources = (function() {
    function ViewResources(parent, viewUrl) {
      _classCallCheck(this, ViewResources);
      this.bindingLanguage = null;
      this.parent = parent || null;
      this.hasParent = this.parent !== null;
      this.viewUrl = viewUrl || '';
      this.lookupFunctions = {
        valueConverters: this.getValueConverter.bind(this),
        bindingBehaviors: this.getBindingBehavior.bind(this)
      };
      this.attributes = {};
      this.elements = {};
      this.valueConverters = {};
      this.bindingBehaviors = {};
      this.attributeMap = {};
      this.hook1 = null;
      this.hook2 = null;
      this.hook3 = null;
      this.additionalHooks = null;
    }
    ViewResources.prototype._onBeforeCompile = function _onBeforeCompile(content, resources, instruction) {
      if (this.hasParent) {
        this.parent._onBeforeCompile(content, resources, instruction);
      }
      if (this.hook1 !== null) {
        this.hook1.beforeCompile(content, resources, instruction);
        if (this.hook2 !== null) {
          this.hook2.beforeCompile(content, resources, instruction);
          if (this.hook3 !== null) {
            this.hook3.beforeCompile(content, resources, instruction);
            if (this.additionalHooks !== null) {
              var hooks = this.additionalHooks;
              for (var i = 0,
                  _length = hooks.length; i < _length; ++i) {
                hooks[i].beforeCompile(content, resources, instruction);
              }
            }
          }
        }
      }
    };
    ViewResources.prototype._onAfterCompile = function _onAfterCompile(viewFactory) {
      if (this.hasParent) {
        this.parent._onAfterCompile(viewFactory);
      }
      if (this.hook1 !== null) {
        this.hook1.afterCompile(viewFactory);
        if (this.hook2 !== null) {
          this.hook2.afterCompile(viewFactory);
          if (this.hook3 !== null) {
            this.hook3.afterCompile(viewFactory);
            if (this.additionalHooks !== null) {
              var hooks = this.additionalHooks;
              for (var i = 0,
                  _length2 = hooks.length; i < _length2; ++i) {
                hooks[i].afterCompile(viewFactory);
              }
            }
          }
        }
      }
    };
    ViewResources.prototype._onBeforeCreate = function _onBeforeCreate(viewFactory, container, content, instruction, bindingContext) {
      if (this.hasParent) {
        this.parent._onBeforeCreate(viewFactory, container, content, instruction, bindingContext);
      }
      if (this.hook1 !== null) {
        this.hook1.beforeCreate(viewFactory, container, content, instruction, bindingContext);
        if (this.hook2 !== null) {
          this.hook2.beforeCreate(viewFactory, container, content, instruction, bindingContext);
          if (this.hook3 !== null) {
            this.hook3.beforeCreate(viewFactory, container, content, instruction, bindingContext);
            if (this.additionalHooks !== null) {
              var hooks = this.additionalHooks;
              for (var i = 0,
                  _length3 = hooks.length; i < _length3; ++i) {
                hooks[i].beforeCreate(viewFactory, container, content, instruction, bindingContext);
              }
            }
          }
        }
      }
    };
    ViewResources.prototype._onAfterCreate = function _onAfterCreate(view) {
      if (this.hasParent) {
        this.parent._onAfterCreate(view);
      }
      if (this.hook1 !== null) {
        this.hook1.afterCreate(view);
        if (this.hook2 !== null) {
          this.hook2.afterCreate(view);
          if (this.hook3 !== null) {
            this.hook3.afterCreate(view);
            if (this.additionalHooks !== null) {
              var hooks = this.additionalHooks;
              for (var i = 0,
                  _length4 = hooks.length; i < _length4; ++i) {
                hooks[i].afterCreate(view);
              }
            }
          }
        }
      }
    };
    ViewResources.prototype.registerViewEngineHooks = function registerViewEngineHooks(hooks) {
      if (hooks.beforeCompile === undefined)
        hooks.beforeCompile = _aureliaPal.PLATFORM.noop;
      if (hooks.afterCompile === undefined)
        hooks.afterCompile = _aureliaPal.PLATFORM.noop;
      if (hooks.beforeCreate === undefined)
        hooks.beforeCreate = _aureliaPal.PLATFORM.noop;
      if (hooks.afterCreate === undefined)
        hooks.afterCreate = _aureliaPal.PLATFORM.noop;
      if (this.hook1 === null)
        this.hook1 = hooks;
      else if (this.hook2 === null)
        this.hook2 = hooks;
      else if (this.hook3 === null)
        this.hook3 = hooks;
      else {
        if (this.additionalHooks === null) {
          this.additionalHooks = [];
        }
        this.additionalHooks.push(hooks);
      }
    };
    ViewResources.prototype.getBindingLanguage = function getBindingLanguage(bindingLanguageFallback) {
      return this.bindingLanguage || (this.bindingLanguage = bindingLanguageFallback);
    };
    ViewResources.prototype.patchInParent = function patchInParent(newParent) {
      var originalParent = this.parent;
      this.parent = newParent || null;
      this.hasParent = this.parent !== null;
      if (newParent.parent === null) {
        newParent.parent = originalParent;
        newParent.hasParent = originalParent !== null;
      }
    };
    ViewResources.prototype.relativeToView = function relativeToView(path) {
      return _aureliaPath.relativeToFile(path, this.viewUrl);
    };
    ViewResources.prototype.registerElement = function registerElement(tagName, behavior) {
      register(this.elements, tagName, behavior, 'an Element');
    };
    ViewResources.prototype.getElement = function getElement(tagName) {
      return this.elements[tagName] || (this.hasParent ? this.parent.getElement(tagName) : null);
    };
    ViewResources.prototype.mapAttribute = function mapAttribute(attribute) {
      return this.attributeMap[attribute] || (this.hasParent ? this.parent.mapAttribute(attribute) : null);
    };
    ViewResources.prototype.registerAttribute = function registerAttribute(attribute, behavior, knownAttribute) {
      this.attributeMap[attribute] = knownAttribute;
      register(this.attributes, attribute, behavior, 'an Attribute');
    };
    ViewResources.prototype.getAttribute = function getAttribute(attribute) {
      return this.attributes[attribute] || (this.hasParent ? this.parent.getAttribute(attribute) : null);
    };
    ViewResources.prototype.registerValueConverter = function registerValueConverter(name, valueConverter) {
      register(this.valueConverters, name, valueConverter, 'a ValueConverter');
    };
    ViewResources.prototype.getValueConverter = function getValueConverter(name) {
      return this.valueConverters[name] || (this.hasParent ? this.parent.getValueConverter(name) : null);
    };
    ViewResources.prototype.registerBindingBehavior = function registerBindingBehavior(name, bindingBehavior) {
      register(this.bindingBehaviors, name, bindingBehavior, 'a BindingBehavior');
    };
    ViewResources.prototype.getBindingBehavior = function getBindingBehavior(name) {
      return this.bindingBehaviors[name] || (this.hasParent ? this.parent.getBindingBehavior(name) : null);
    };
    return ViewResources;
  })();
  exports.ViewResources = ViewResources;
  var View = (function() {
    function View(viewFactory, fragment, controllers, bindings, children, contentSelectors) {
      _classCallCheck(this, View);
      this.viewFactory = viewFactory;
      this.fragment = fragment;
      this.controllers = controllers;
      this.bindings = bindings;
      this.children = children;
      this.contentSelectors = contentSelectors;
      this.firstChild = fragment.firstChild;
      this.lastChild = fragment.lastChild;
      this.fromCache = false;
      this.isBound = false;
      this.isAttached = false;
      this.fromCache = false;
      this.bindingContext = null;
      this.overrideContext = null;
      this.controller = null;
      this.viewModelScope = null;
      this._isUserControlled = false;
    }
    View.prototype.returnToCache = function returnToCache() {
      this.viewFactory.returnViewToCache(this);
    };
    View.prototype.created = function created() {
      var i = undefined;
      var ii = undefined;
      var controllers = this.controllers;
      for (i = 0, ii = controllers.length; i < ii; ++i) {
        controllers[i].created(this);
      }
    };
    View.prototype.bind = function bind(bindingContext, overrideContext, _systemUpdate) {
      var controllers = undefined;
      var bindings = undefined;
      var children = undefined;
      var i = undefined;
      var ii = undefined;
      if (_systemUpdate && this._isUserControlled) {
        return;
      }
      if (this.isBound) {
        if (this.bindingContext === bindingContext) {
          return;
        }
        this.unbind();
      }
      this.isBound = true;
      this.bindingContext = bindingContext;
      this.overrideContext = overrideContext || _aureliaBinding.createOverrideContext(bindingContext);
      bindings = this.bindings;
      for (i = 0, ii = bindings.length; i < ii; ++i) {
        bindings[i].bind(this);
      }
      if (this.viewModelScope !== null) {
        bindingContext.bind(this.viewModelScope.bindingContext, this.viewModelScope.overrideContext);
        this.viewModelScope = null;
      }
      controllers = this.controllers;
      for (i = 0, ii = controllers.length; i < ii; ++i) {
        controllers[i].bind(this);
      }
      children = this.children;
      for (i = 0, ii = children.length; i < ii; ++i) {
        children[i].bind(bindingContext, overrideContext, true);
      }
    };
    View.prototype.addBinding = function addBinding(binding) {
      this.bindings.push(binding);
      if (this.isBound) {
        binding.bind(this.bindingContext);
      }
    };
    View.prototype.unbind = function unbind() {
      var controllers = undefined;
      var bindings = undefined;
      var children = undefined;
      var i = undefined;
      var ii = undefined;
      if (this.isBound) {
        this.isBound = false;
        this.bindingContext = null;
        this.overrideContext = null;
        if (this.controller !== null) {
          this.controller.unbind();
        }
        bindings = this.bindings;
        for (i = 0, ii = bindings.length; i < ii; ++i) {
          bindings[i].unbind();
        }
        controllers = this.controllers;
        for (i = 0, ii = controllers.length; i < ii; ++i) {
          controllers[i].unbind();
        }
        children = this.children;
        for (i = 0, ii = children.length; i < ii; ++i) {
          children[i].unbind();
        }
      }
    };
    View.prototype.insertNodesBefore = function insertNodesBefore(refNode) {
      var parent = refNode.parentNode;
      parent.insertBefore(this.fragment, refNode);
    };
    View.prototype.appendNodesTo = function appendNodesTo(parent) {
      parent.appendChild(this.fragment);
    };
    View.prototype.removeNodes = function removeNodes() {
      var start = this.firstChild;
      var end = this.lastChild;
      var fragment = this.fragment;
      var next = undefined;
      var current = start;
      var loop = true;
      while (loop) {
        if (current === end) {
          loop = false;
        }
        next = current.nextSibling;
        fragment.appendChild(current);
        current = next;
      }
    };
    View.prototype.attached = function attached() {
      var controllers = undefined;
      var children = undefined;
      var i = undefined;
      var ii = undefined;
      if (this.isAttached) {
        return;
      }
      this.isAttached = true;
      if (this.controller !== null) {
        this.controller.attached();
      }
      controllers = this.controllers;
      for (i = 0, ii = controllers.length; i < ii; ++i) {
        controllers[i].attached();
      }
      children = this.children;
      for (i = 0, ii = children.length; i < ii; ++i) {
        children[i].attached();
      }
    };
    View.prototype.detached = function detached() {
      var controllers = undefined;
      var children = undefined;
      var i = undefined;
      var ii = undefined;
      if (this.isAttached) {
        this.isAttached = false;
        if (this.controller !== null) {
          this.controller.detached();
        }
        controllers = this.controllers;
        for (i = 0, ii = controllers.length; i < ii; ++i) {
          controllers[i].detached();
        }
        children = this.children;
        for (i = 0, ii = children.length; i < ii; ++i) {
          children[i].detached();
        }
      }
    };
    return View;
  })();
  exports.View = View;
  var placeholder = [];
  function findInsertionPoint(groups, index) {
    var insertionPoint = undefined;
    while (!insertionPoint && index >= 0) {
      insertionPoint = groups[index][0];
      index--;
    }
    return insertionPoint;
  }
  var _ContentSelector = (function() {
    _ContentSelector.applySelectors = function applySelectors(view, contentSelectors, callback) {
      var currentChild = view.fragment.firstChild;
      var contentMap = new Map();
      var nextSibling = undefined;
      var i = undefined;
      var ii = undefined;
      var contentSelector = undefined;
      while (currentChild) {
        nextSibling = currentChild.nextSibling;
        if (currentChild.isContentProjectionSource) {
          var viewSlotSelectors = contentSelectors.map(function(x) {
            return x.copyForViewSlot();
          });
          currentChild.viewSlot._installContentSelectors(viewSlotSelectors);
        } else {
          for (i = 0, ii = contentSelectors.length; i < ii; i++) {
            contentSelector = contentSelectors[i];
            if (contentSelector.matches(currentChild)) {
              var elements = contentMap.get(contentSelector);
              if (!elements) {
                elements = [];
                contentMap.set(contentSelector, elements);
              }
              elements.push(currentChild);
              break;
            }
          }
        }
        currentChild = nextSibling;
      }
      for (i = 0, ii = contentSelectors.length; i < ii; ++i) {
        contentSelector = contentSelectors[i];
        callback(contentSelector, contentMap.get(contentSelector) || placeholder);
      }
    };
    function _ContentSelector(anchor, selector) {
      _classCallCheck(this, _ContentSelector);
      this.anchor = anchor;
      this.selector = selector;
      this.all = !this.selector;
      this.groups = [];
    }
    _ContentSelector.prototype.copyForViewSlot = function copyForViewSlot() {
      return new _ContentSelector(this.anchor, this.selector);
    };
    _ContentSelector.prototype.matches = function matches(node) {
      return this.all || node.nodeType === 1 && node.matches(this.selector);
    };
    _ContentSelector.prototype.add = function add(group) {
      var anchor = this.anchor;
      var parent = anchor.parentNode;
      var i = undefined;
      var ii = undefined;
      for (i = 0, ii = group.length; i < ii; ++i) {
        parent.insertBefore(group[i], anchor);
      }
      this.groups.push(group);
    };
    _ContentSelector.prototype.insert = function insert(index, group) {
      if (group.length) {
        var anchor = findInsertionPoint(this.groups, index) || this.anchor;
        var _parent = anchor.parentNode;
        var i = undefined;
        var ii = undefined;
        for (i = 0, ii = group.length; i < ii; ++i) {
          _parent.insertBefore(group[i], anchor);
        }
      }
      this.groups.splice(index, 0, group);
    };
    _ContentSelector.prototype.removeAt = function removeAt(index, fragment) {
      var group = this.groups[index];
      var i = undefined;
      var ii = undefined;
      for (i = 0, ii = group.length; i < ii; ++i) {
        fragment.appendChild(group[i]);
      }
      this.groups.splice(index, 1);
    };
    return _ContentSelector;
  })();
  exports._ContentSelector = _ContentSelector;
  function getAnimatableElement(view) {
    var firstChild = view.firstChild;
    if (firstChild !== null && firstChild !== undefined && firstChild.nodeType === 8) {
      var _element = _aureliaPal.DOM.nextElementSibling(firstChild);
      if (_element !== null && _element !== undefined && _element.nodeType === 1 && _element.classList.contains('au-animate')) {
        return _element;
      }
    }
    return null;
  }
  var ViewSlot = (function() {
    function ViewSlot(anchor, anchorIsContainer) {
      var animator = arguments.length <= 2 || arguments[2] === undefined ? Animator.instance : arguments[2];
      _classCallCheck(this, ViewSlot);
      this.anchor = anchor;
      this.viewAddMethod = anchorIsContainer ? 'appendNodesTo' : 'insertNodesBefore';
      this.bindingContext = null;
      this.animator = animator;
      this.children = [];
      this.isBound = false;
      this.isAttached = false;
      this.contentSelectors = null;
      anchor.viewSlot = this;
      anchor.isContentProjectionSource = false;
    }
    ViewSlot.prototype.transformChildNodesIntoView = function transformChildNodesIntoView() {
      var parent = this.anchor;
      this.children.push({
        fragment: parent,
        firstChild: parent.firstChild,
        lastChild: parent.lastChild,
        returnToCache: function returnToCache() {},
        removeNodes: function removeNodes() {
          var last = undefined;
          while (last = parent.lastChild) {
            parent.removeChild(last);
          }
        },
        created: function created() {},
        bind: function bind() {},
        unbind: function unbind() {},
        attached: function attached() {},
        detached: function detached() {}
      });
    };
    ViewSlot.prototype.bind = function bind(bindingContext, overrideContext) {
      var i = undefined;
      var ii = undefined;
      var children = undefined;
      if (this.isBound) {
        if (this.bindingContext === bindingContext) {
          return;
        }
        this.unbind();
      }
      this.isBound = true;
      this.bindingContext = bindingContext = bindingContext || this.bindingContext;
      children = this.children;
      for (i = 0, ii = children.length; i < ii; ++i) {
        children[i].bind(bindingContext, overrideContext, true);
      }
    };
    ViewSlot.prototype.unbind = function unbind() {
      if (this.isBound) {
        var i = undefined;
        var ii = undefined;
        var _children = this.children;
        this.isBound = false;
        this.bindingContext = null;
        for (i = 0, ii = _children.length; i < ii; ++i) {
          _children[i].unbind();
        }
      }
    };
    ViewSlot.prototype.add = function add(view) {
      view[this.viewAddMethod](this.anchor);
      this.children.push(view);
      if (this.isAttached) {
        view.attached();
        var animatableElement = getAnimatableElement(view);
        if (animatableElement !== null) {
          return this.animator.enter(animatableElement);
        }
      }
    };
    ViewSlot.prototype.insert = function insert(index, view) {
      var children = this.children;
      var length = children.length;
      if (index === 0 && length === 0 || index >= length) {
        return this.add(view);
      }
      view.insertNodesBefore(children[index].firstChild);
      children.splice(index, 0, view);
      if (this.isAttached) {
        view.attached();
        var animatableElement = getAnimatableElement(view);
        if (animatableElement !== null) {
          return this.animator.enter(animatableElement);
        }
      }
    };
    ViewSlot.prototype.remove = function remove(view, returnToCache, skipAnimation) {
      return this.removeAt(this.children.indexOf(view), returnToCache, skipAnimation);
    };
    ViewSlot.prototype.removeAt = function removeAt(index, returnToCache, skipAnimation) {
      var _this4 = this;
      var view = this.children[index];
      var removeAction = function removeAction() {
        index = _this4.children.indexOf(view);
        view.removeNodes();
        _this4.children.splice(index, 1);
        if (_this4.isAttached) {
          view.detached();
        }
        if (returnToCache) {
          view.returnToCache();
        }
        return view;
      };
      if (!skipAnimation) {
        var animatableElement = getAnimatableElement(view);
        if (animatableElement !== null) {
          return this.animator.leave(animatableElement).then(function() {
            return removeAction();
          });
        }
      }
      return removeAction();
    };
    ViewSlot.prototype.removeAll = function removeAll(returnToCache, skipAnimation) {
      var _this5 = this;
      var children = this.children;
      var ii = children.length;
      var i = undefined;
      var rmPromises = [];
      children.forEach(function(child) {
        if (skipAnimation) {
          child.removeNodes();
          return;
        }
        var animatableElement = getAnimatableElement(child);
        if (animatableElement !== null) {
          rmPromises.push(_this5.animator.leave(animatableElement).then(function() {
            return child.removeNodes();
          }));
        } else {
          child.removeNodes();
        }
      });
      var removeAction = function removeAction() {
        if (_this5.isAttached) {
          for (i = 0; i < ii; ++i) {
            children[i].detached();
          }
        }
        if (returnToCache) {
          for (i = 0; i < ii; ++i) {
            children[i].returnToCache();
          }
        }
        _this5.children = [];
      };
      if (rmPromises.length > 0) {
        return Promise.all(rmPromises).then(function() {
          return removeAction();
        });
      }
      removeAction();
    };
    ViewSlot.prototype.attached = function attached() {
      var i = undefined;
      var ii = undefined;
      var children = undefined;
      var child = undefined;
      if (this.isAttached) {
        return;
      }
      this.isAttached = true;
      children = this.children;
      for (i = 0, ii = children.length; i < ii; ++i) {
        child = children[i];
        child.attached();
        var _element2 = child.firstChild ? _aureliaPal.DOM.nextElementSibling(child.firstChild) : null;
        if (child.firstChild && child.firstChild.nodeType === 8 && _element2 && _element2.nodeType === 1 && _element2.classList.contains('au-animate')) {
          this.animator.enter(_element2);
        }
      }
    };
    ViewSlot.prototype.detached = function detached() {
      var i = undefined;
      var ii = undefined;
      var children = undefined;
      if (this.isAttached) {
        this.isAttached = false;
        children = this.children;
        for (i = 0, ii = children.length; i < ii; ++i) {
          children[i].detached();
        }
      }
    };
    ViewSlot.prototype._installContentSelectors = function _installContentSelectors(contentSelectors) {
      this.contentSelectors = contentSelectors;
      this.add = this._contentSelectorAdd;
      this.insert = this._contentSelectorInsert;
      this.remove = this._contentSelectorRemove;
      this.removeAt = this._contentSelectorRemoveAt;
      this.removeAll = this._contentSelectorRemoveAll;
    };
    ViewSlot.prototype._contentSelectorAdd = function _contentSelectorAdd(view) {
      _ContentSelector.applySelectors(view, this.contentSelectors, function(contentSelector, group) {
        return contentSelector.add(group);
      });
      this.children.push(view);
      if (this.isAttached) {
        view.attached();
      }
    };
    ViewSlot.prototype._contentSelectorInsert = function _contentSelectorInsert(index, view) {
      if (index === 0 && !this.children.length || index >= this.children.length) {
        this.add(view);
      } else {
        _ContentSelector.applySelectors(view, this.contentSelectors, function(contentSelector, group) {
          return contentSelector.insert(index, group);
        });
        this.children.splice(index, 0, view);
        if (this.isAttached) {
          view.attached();
        }
      }
    };
    ViewSlot.prototype._contentSelectorRemove = function _contentSelectorRemove(view) {
      var index = this.children.indexOf(view);
      var contentSelectors = this.contentSelectors;
      var i = undefined;
      var ii = undefined;
      for (i = 0, ii = contentSelectors.length; i < ii; ++i) {
        contentSelectors[i].removeAt(index, view.fragment);
      }
      this.children.splice(index, 1);
      if (this.isAttached) {
        view.detached();
      }
    };
    ViewSlot.prototype._contentSelectorRemoveAt = function _contentSelectorRemoveAt(index) {
      var view = this.children[index];
      var contentSelectors = this.contentSelectors;
      var i = undefined;
      var ii = undefined;
      for (i = 0, ii = contentSelectors.length; i < ii; ++i) {
        contentSelectors[i].removeAt(index, view.fragment);
      }
      this.children.splice(index, 1);
      if (this.isAttached) {
        view.detached();
      }
      return view;
    };
    ViewSlot.prototype._contentSelectorRemoveAll = function _contentSelectorRemoveAll() {
      var children = this.children;
      var contentSelectors = this.contentSelectors;
      var ii = children.length;
      var jj = contentSelectors.length;
      var i = undefined;
      var j = undefined;
      var view = undefined;
      for (i = 0; i < ii; ++i) {
        view = children[i];
        for (j = 0; j < jj; ++j) {
          contentSelectors[j].removeAt(0, view.fragment);
        }
      }
      if (this.isAttached) {
        for (i = 0; i < ii; ++i) {
          children[i].detached();
        }
      }
      this.children = [];
    };
    return ViewSlot;
  })();
  exports.ViewSlot = ViewSlot;
  var ProviderResolver = (function() {
    function ProviderResolver() {
      _classCallCheck(this, _ProviderResolver);
    }
    ProviderResolver.prototype.get = function get(container, key) {
      var id = key.__providerId__;
      return id in container ? container[id] : container[id] = container.invoke(key);
    };
    var _ProviderResolver = ProviderResolver;
    ProviderResolver = _aureliaDependencyInjection.resolver(ProviderResolver) || ProviderResolver;
    return ProviderResolver;
  })();
  var providerResolverInstance = new ProviderResolver();
  function elementContainerGet(key) {
    if (key === _aureliaPal.DOM.Element) {
      return this.element;
    }
    if (key === BoundViewFactory) {
      if (this.boundViewFactory) {
        return this.boundViewFactory;
      }
      var factory = this.instruction.viewFactory;
      var _partReplacements = this.partReplacements;
      if (_partReplacements) {
        factory = _partReplacements[factory.part] || factory;
      }
      this.boundViewFactory = new BoundViewFactory(this, factory, _partReplacements);
      return this.boundViewFactory;
    }
    if (key === ViewSlot) {
      if (this.viewSlot === undefined) {
        this.viewSlot = new ViewSlot(this.element, this.instruction.anchorIsContainer);
        this.element.isContentProjectionSource = this.instruction.lifting;
        this.children.push(this.viewSlot);
      }
      return this.viewSlot;
    }
    if (key === ElementEvents) {
      return this.elementEvents || (this.elementEvents = new ElementEvents(this.element));
    }
    if (key === CompositionTransaction) {
      return this.compositionTransaction || (this.compositionTransaction = this.parent.get(key));
    }
    if (key === ViewResources) {
      return this.viewResources;
    }
    if (key === TargetInstruction) {
      return this.instruction;
    }
    return this.superGet(key);
  }
  function createElementContainer(parent, element, instruction, children, partReplacements, resources) {
    var container = parent.createChild();
    var providers = undefined;
    var i = undefined;
    container.element = element;
    container.instruction = instruction;
    container.children = children;
    container.viewResources = resources;
    container.partReplacements = partReplacements;
    providers = instruction.providers;
    i = providers.length;
    while (i--) {
      container._resolvers.set(providers[i], providerResolverInstance);
    }
    container.superGet = container.get;
    container.get = elementContainerGet;
    return container;
  }
  function makeElementIntoAnchor(element, elementInstruction) {
    var anchor = _aureliaPal.DOM.createComment('anchor');
    if (elementInstruction) {
      anchor.hasAttribute = function(name) {
        return element.hasAttribute(name);
      };
      anchor.getAttribute = function(name) {
        return element.getAttribute(name);
      };
      anchor.setAttribute = function(name, value) {
        element.setAttribute(name, value);
      };
    }
    _aureliaPal.DOM.replaceNode(anchor, element);
    return anchor;
  }
  function applyInstructions(containers, element, instruction, controllers, bindings, children, contentSelectors, partReplacements, resources) {
    var behaviorInstructions = instruction.behaviorInstructions;
    var expressions = instruction.expressions;
    var elementContainer = undefined;
    var i = undefined;
    var ii = undefined;
    var current = undefined;
    var instance = undefined;
    if (instruction.contentExpression) {
      bindings.push(instruction.contentExpression.createBinding(element.nextSibling));
      element.parentNode.removeChild(element);
      return;
    }
    if (instruction.contentSelector) {
      var commentAnchor = _aureliaPal.DOM.createComment('anchor');
      _aureliaPal.DOM.replaceNode(commentAnchor, element);
      contentSelectors.push(new _ContentSelector(commentAnchor, instruction.selector));
      return;
    }
    if (behaviorInstructions.length) {
      if (!instruction.anchorIsContainer) {
        element = makeElementIntoAnchor(element, instruction.elementInstruction);
      }
      containers[instruction.injectorId] = elementContainer = createElementContainer(containers[instruction.parentInjectorId], element, instruction, children, partReplacements, resources);
      for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
        current = behaviorInstructions[i];
        instance = current.type.create(elementContainer, current, element, bindings);
        if (instance.contentView) {
          children.push(instance.contentView);
        }
        controllers.push(instance);
      }
    }
    for (i = 0, ii = expressions.length; i < ii; ++i) {
      bindings.push(expressions[i].createBinding(element));
    }
  }
  function styleStringToObject(style, target) {
    var attributes = style.split(';');
    var firstIndexOfColon = undefined;
    var i = undefined;
    var current = undefined;
    var key = undefined;
    var value = undefined;
    target = target || {};
    for (i = 0; i < attributes.length; i++) {
      current = attributes[i];
      firstIndexOfColon = current.indexOf(':');
      key = current.substring(0, firstIndexOfColon).trim();
      value = current.substring(firstIndexOfColon + 1).trim();
      target[key] = value;
    }
    return target;
  }
  function styleObjectToString(obj) {
    var result = '';
    for (var key in obj) {
      result += key + ':' + obj[key] + ';';
    }
    return result;
  }
  function applySurrogateInstruction(container, element, instruction, controllers, bindings, children) {
    var behaviorInstructions = instruction.behaviorInstructions;
    var expressions = instruction.expressions;
    var providers = instruction.providers;
    var values = instruction.values;
    var i = undefined;
    var ii = undefined;
    var current = undefined;
    var instance = undefined;
    var currentAttributeValue = undefined;
    i = providers.length;
    while (i--) {
      container._resolvers.set(providers[i], providerResolverInstance);
    }
    for (var key in values) {
      currentAttributeValue = element.getAttribute(key);
      if (currentAttributeValue) {
        if (key === 'class') {
          element.setAttribute('class', currentAttributeValue + ' ' + values[key]);
        } else if (key === 'style') {
          var styleObject = styleStringToObject(values[key]);
          styleStringToObject(currentAttributeValue, styleObject);
          element.setAttribute('style', styleObjectToString(styleObject));
        }
      } else {
        element.setAttribute(key, values[key]);
      }
    }
    if (behaviorInstructions.length) {
      for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
        current = behaviorInstructions[i];
        instance = current.type.create(container, current, element, bindings);
        if (instance.contentView) {
          children.push(instance.contentView);
        }
        controllers.push(instance);
      }
    }
    for (i = 0, ii = expressions.length; i < ii; ++i) {
      bindings.push(expressions[i].createBinding(element));
    }
  }
  var BoundViewFactory = (function() {
    function BoundViewFactory(parentContainer, viewFactory, partReplacements) {
      _classCallCheck(this, BoundViewFactory);
      this.parentContainer = parentContainer;
      this.viewFactory = viewFactory;
      this.factoryCreateInstruction = {partReplacements: partReplacements};
    }
    BoundViewFactory.prototype.create = function create() {
      var view = this.viewFactory.create(this.parentContainer.createChild(), this.factoryCreateInstruction);
      view._isUserControlled = true;
      return view;
    };
    BoundViewFactory.prototype.setCacheSize = function setCacheSize(size, doNotOverrideIfAlreadySet) {
      this.viewFactory.setCacheSize(size, doNotOverrideIfAlreadySet);
    };
    BoundViewFactory.prototype.getCachedView = function getCachedView() {
      return this.viewFactory.getCachedView();
    };
    BoundViewFactory.prototype.returnViewToCache = function returnViewToCache(view) {
      this.viewFactory.returnViewToCache(view);
    };
    _createClass(BoundViewFactory, [{
      key: 'isCaching',
      get: function get() {
        return this.viewFactory.isCaching;
      }
    }]);
    return BoundViewFactory;
  })();
  exports.BoundViewFactory = BoundViewFactory;
  var ViewFactory = (function() {
    function ViewFactory(template, instructions, resources) {
      _classCallCheck(this, ViewFactory);
      this.isCaching = false;
      this.template = template;
      this.instructions = instructions;
      this.resources = resources;
      this.cacheSize = -1;
      this.cache = null;
    }
    ViewFactory.prototype.setCacheSize = function setCacheSize(size, doNotOverrideIfAlreadySet) {
      if (size) {
        if (size === '*') {
          size = Number.MAX_VALUE;
        } else if (typeof size === 'string') {
          size = parseInt(size, 10);
        }
      }
      if (this.cacheSize === -1 || !doNotOverrideIfAlreadySet) {
        this.cacheSize = size;
      }
      if (this.cacheSize > 0) {
        this.cache = [];
      } else {
        this.cache = null;
      }
      this.isCaching = this.cacheSize > 0;
    };
    ViewFactory.prototype.getCachedView = function getCachedView() {
      return this.cache !== null ? this.cache.pop() || null : null;
    };
    ViewFactory.prototype.returnViewToCache = function returnViewToCache(view) {
      if (view.isAttached) {
        view.detached();
      }
      if (view.isBound) {
        view.unbind();
      }
      if (this.cache !== null && this.cache.length < this.cacheSize) {
        view.fromCache = true;
        this.cache.push(view);
      }
    };
    ViewFactory.prototype.create = function create(container, createInstruction, element) {
      createInstruction = createInstruction || BehaviorInstruction.normal;
      element = element || null;
      var cachedView = this.getCachedView();
      if (cachedView !== null) {
        return cachedView;
      }
      var fragment = createInstruction.enhance ? this.template : this.template.cloneNode(true);
      var instructables = fragment.querySelectorAll('.au-target');
      var instructions = this.instructions;
      var resources = this.resources;
      var controllers = [];
      var bindings = [];
      var children = [];
      var contentSelectors = [];
      var containers = {root: container};
      var partReplacements = createInstruction.partReplacements;
      var i = undefined;
      var ii = undefined;
      var view = undefined;
      var instructable = undefined;
      var instruction = undefined;
      this.resources._onBeforeCreate(this, container, fragment, createInstruction);
      if (element !== null && this.surrogateInstruction !== null) {
        applySurrogateInstruction(container, element, this.surrogateInstruction, controllers, bindings, children);
      }
      for (i = 0, ii = instructables.length; i < ii; ++i) {
        instructable = instructables[i];
        instruction = instructions[instructable.getAttribute('au-target-id')];
        applyInstructions(containers, instructable, instruction, controllers, bindings, children, contentSelectors, partReplacements, resources);
      }
      view = new View(this, fragment, controllers, bindings, children, contentSelectors);
      if (!createInstruction.initiatedByBehavior) {
        view.created();
      }
      this.resources._onAfterCreate(view);
      return view;
    };
    return ViewFactory;
  })();
  exports.ViewFactory = ViewFactory;
  var nextInjectorId = 0;
  function getNextInjectorId() {
    return ++nextInjectorId;
  }
  function configureProperties(instruction, resources) {
    var type = instruction.type;
    var attrName = instruction.attrName;
    var attributes = instruction.attributes;
    var property = undefined;
    var key = undefined;
    var value = undefined;
    var knownAttribute = resources.mapAttribute(attrName);
    if (knownAttribute && attrName in attributes && knownAttribute !== attrName) {
      attributes[knownAttribute] = attributes[attrName];
      delete attributes[attrName];
    }
    for (key in attributes) {
      value = attributes[key];
      if (value !== null && typeof value === 'object') {
        property = type.attributes[key];
        if (property !== undefined) {
          value.targetProperty = property.name;
        } else {
          value.targetProperty = key;
        }
      }
    }
  }
  var lastAUTargetID = 0;
  function getNextAUTargetID() {
    return (++lastAUTargetID).toString();
  }
  function makeIntoInstructionTarget(element) {
    var value = element.getAttribute('class');
    var auTargetID = getNextAUTargetID();
    element.setAttribute('class', value ? value += ' au-target' : 'au-target');
    element.setAttribute('au-target-id', auTargetID);
    return auTargetID;
  }
  var ViewCompiler = (function() {
    function ViewCompiler(bindingLanguage, resources) {
      _classCallCheck(this, _ViewCompiler);
      this.bindingLanguage = bindingLanguage;
      this.resources = resources;
    }
    ViewCompiler.prototype.compile = function compile(source, resources, compileInstruction) {
      resources = resources || this.resources;
      compileInstruction = compileInstruction || ViewCompileInstruction.normal;
      source = typeof source === 'string' ? _aureliaPal.DOM.createTemplateFromMarkup(source) : source;
      var content = undefined;
      var part = undefined;
      var cacheSize = undefined;
      if (source.content) {
        part = source.getAttribute('part');
        cacheSize = source.getAttribute('view-cache');
        content = _aureliaPal.DOM.adoptNode(source.content);
      } else {
        content = source;
      }
      compileInstruction.targetShadowDOM = compileInstruction.targetShadowDOM && _aureliaPal.FEATURE.shadowDOM;
      resources._onBeforeCompile(content, resources, compileInstruction);
      var instructions = {};
      this._compileNode(content, resources, instructions, source, 'root', !compileInstruction.targetShadowDOM);
      content.insertBefore(_aureliaPal.DOM.createComment('<view>'), content.firstChild);
      content.appendChild(_aureliaPal.DOM.createComment('</view>'));
      var factory = new ViewFactory(content, instructions, resources);
      factory.surrogateInstruction = compileInstruction.compileSurrogate ? this._compileSurrogate(source, resources) : null;
      factory.part = part;
      if (cacheSize) {
        factory.setCacheSize(cacheSize);
      }
      resources._onAfterCompile(factory);
      return factory;
    };
    ViewCompiler.prototype._compileNode = function _compileNode(node, resources, instructions, parentNode, parentInjectorId, targetLightDOM) {
      switch (node.nodeType) {
        case 1:
          return this._compileElement(node, resources, instructions, parentNode, parentInjectorId, targetLightDOM);
        case 3:
          var expression = resources.getBindingLanguage(this.bindingLanguage).parseText(resources, node.wholeText);
          if (expression) {
            var marker = _aureliaPal.DOM.createElement('au-marker');
            var auTargetID = makeIntoInstructionTarget(marker);
            (node.parentNode || parentNode).insertBefore(marker, node);
            node.textContent = ' ';
            instructions[auTargetID] = TargetInstruction.contentExpression(expression);
            while (node.nextSibling && node.nextSibling.nodeType === 3) {
              (node.parentNode || parentNode).removeChild(node.nextSibling);
            }
          } else {
            while (node.nextSibling && node.nextSibling.nodeType === 3) {
              node = node.nextSibling;
            }
          }
          return node.nextSibling;
        case 11:
          var currentChild = node.firstChild;
          while (currentChild) {
            currentChild = this._compileNode(currentChild, resources, instructions, node, parentInjectorId, targetLightDOM);
          }
          break;
        default:
          break;
      }
      return node.nextSibling;
    };
    ViewCompiler.prototype._compileSurrogate = function _compileSurrogate(node, resources) {
      var attributes = node.attributes;
      var bindingLanguage = resources.getBindingLanguage(this.bindingLanguage);
      var knownAttribute = undefined;
      var property = undefined;
      var instruction = undefined;
      var i = undefined;
      var ii = undefined;
      var attr = undefined;
      var attrName = undefined;
      var attrValue = undefined;
      var info = undefined;
      var type = undefined;
      var expressions = [];
      var expression = undefined;
      var behaviorInstructions = [];
      var values = {};
      var hasValues = false;
      var providers = [];
      for (i = 0, ii = attributes.length; i < ii; ++i) {
        attr = attributes[i];
        attrName = attr.name;
        attrValue = attr.value;
        info = bindingLanguage.inspectAttribute(resources, attrName, attrValue);
        type = resources.getAttribute(info.attrName);
        if (type) {
          knownAttribute = resources.mapAttribute(info.attrName);
          if (knownAttribute) {
            property = type.attributes[knownAttribute];
            if (property) {
              info.defaultBindingMode = property.defaultBindingMode;
              if (!info.command && !info.expression) {
                info.command = property.hasOptions ? 'options' : null;
              }
            }
          }
        }
        instruction = bindingLanguage.createAttributeInstruction(resources, node, info, undefined, type);
        if (instruction) {
          if (instruction.alteredAttr) {
            type = resources.getAttribute(instruction.attrName);
          }
          if (instruction.discrete) {
            expressions.push(instruction);
          } else {
            if (type) {
              instruction.type = type;
              configureProperties(instruction, resources);
              if (type.liftsContent) {
                throw new Error('You cannot place a template controller on a surrogate element.');
              } else {
                behaviorInstructions.push(instruction);
              }
            } else {
              expressions.push(instruction.attributes[instruction.attrName]);
            }
          }
        } else {
          if (type) {
            instruction = BehaviorInstruction.attribute(attrName, type);
            instruction.attributes[resources.mapAttribute(attrName)] = attrValue;
            if (type.liftsContent) {
              throw new Error('You cannot place a template controller on a surrogate element.');
            } else {
              behaviorInstructions.push(instruction);
            }
          } else if (attrName !== 'id' && attrName !== 'part' && attrName !== 'replace-part') {
            hasValues = true;
            values[attrName] = attrValue;
          }
        }
      }
      if (expressions.length || behaviorInstructions.length || hasValues) {
        for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
          instruction = behaviorInstructions[i];
          instruction.type.compile(this, resources, node, instruction);
          providers.push(instruction.type.target);
        }
        for (i = 0, ii = expressions.length; i < ii; ++i) {
          expression = expressions[i];
          if (expression.attrToRemove !== undefined) {
            node.removeAttribute(expression.attrToRemove);
          }
        }
        return TargetInstruction.surrogate(providers, behaviorInstructions, expressions, values);
      }
      return null;
    };
    ViewCompiler.prototype._compileElement = function _compileElement(node, resources, instructions, parentNode, parentInjectorId, targetLightDOM) {
      var tagName = node.tagName.toLowerCase();
      var attributes = node.attributes;
      var expressions = [];
      var expression = undefined;
      var behaviorInstructions = [];
      var providers = [];
      var bindingLanguage = resources.getBindingLanguage(this.bindingLanguage);
      var liftingInstruction = undefined;
      var viewFactory = undefined;
      var type = undefined;
      var elementInstruction = undefined;
      var elementProperty = undefined;
      var i = undefined;
      var ii = undefined;
      var attr = undefined;
      var attrName = undefined;
      var attrValue = undefined;
      var instruction = undefined;
      var info = undefined;
      var property = undefined;
      var knownAttribute = undefined;
      var auTargetID = undefined;
      var injectorId = undefined;
      if (tagName === 'content') {
        if (targetLightDOM) {
          auTargetID = makeIntoInstructionTarget(node);
          instructions[auTargetID] = TargetInstruction.contentSelector(node, parentInjectorId);
        }
        return node.nextSibling;
      } else if (tagName === 'template') {
        viewFactory = this.compile(node, resources);
        viewFactory.part = node.getAttribute('part');
      } else {
        type = resources.getElement(node.getAttribute('as-element') || tagName);
        if (type) {
          elementInstruction = BehaviorInstruction.element(node, type);
          type.processAttributes(this, resources, attributes, elementInstruction);
          behaviorInstructions.push(elementInstruction);
        }
      }
      for (i = 0, ii = attributes.length; i < ii; ++i) {
        attr = attributes[i];
        attrName = attr.name;
        attrValue = attr.value;
        info = bindingLanguage.inspectAttribute(resources, attrName, attrValue);
        type = resources.getAttribute(info.attrName);
        elementProperty = null;
        if (type) {
          knownAttribute = resources.mapAttribute(info.attrName);
          if (knownAttribute) {
            property = type.attributes[knownAttribute];
            if (property) {
              info.defaultBindingMode = property.defaultBindingMode;
              if (!info.command && !info.expression) {
                info.command = property.hasOptions ? 'options' : null;
              }
            }
          }
        } else if (elementInstruction) {
          elementProperty = elementInstruction.type.attributes[info.attrName];
          if (elementProperty) {
            info.defaultBindingMode = elementProperty.defaultBindingMode;
          }
        }
        if (elementProperty) {
          instruction = bindingLanguage.createAttributeInstruction(resources, node, info, elementInstruction);
        } else {
          instruction = bindingLanguage.createAttributeInstruction(resources, node, info, undefined, type);
        }
        if (instruction) {
          if (instruction.alteredAttr) {
            type = resources.getAttribute(instruction.attrName);
          }
          if (instruction.discrete) {
            expressions.push(instruction);
          } else {
            if (type) {
              instruction.type = type;
              configureProperties(instruction, resources);
              if (type.liftsContent) {
                instruction.originalAttrName = attrName;
                liftingInstruction = instruction;
                break;
              } else {
                behaviorInstructions.push(instruction);
              }
            } else if (elementProperty) {
              elementInstruction.attributes[info.attrName].targetProperty = elementProperty.name;
            } else {
              expressions.push(instruction.attributes[instruction.attrName]);
            }
          }
        } else {
          if (type) {
            instruction = BehaviorInstruction.attribute(attrName, type);
            instruction.attributes[resources.mapAttribute(attrName)] = attrValue;
            if (type.liftsContent) {
              instruction.originalAttrName = attrName;
              liftingInstruction = instruction;
              break;
            } else {
              behaviorInstructions.push(instruction);
            }
          } else if (elementProperty) {
            elementInstruction.attributes[attrName] = attrValue;
          }
        }
      }
      if (liftingInstruction) {
        liftingInstruction.viewFactory = viewFactory;
        node = liftingInstruction.type.compile(this, resources, node, liftingInstruction, parentNode);
        auTargetID = makeIntoInstructionTarget(node);
        instructions[auTargetID] = TargetInstruction.lifting(parentInjectorId, liftingInstruction);
      } else {
        if (expressions.length || behaviorInstructions.length) {
          injectorId = behaviorInstructions.length ? getNextInjectorId() : false;
          for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
            instruction = behaviorInstructions[i];
            instruction.type.compile(this, resources, node, instruction, parentNode);
            providers.push(instruction.type.target);
          }
          for (i = 0, ii = expressions.length; i < ii; ++i) {
            expression = expressions[i];
            if (expression.attrToRemove !== undefined) {
              node.removeAttribute(expression.attrToRemove);
            }
          }
          auTargetID = makeIntoInstructionTarget(node);
          instructions[auTargetID] = TargetInstruction.normal(injectorId, parentInjectorId, providers, behaviorInstructions, expressions, elementInstruction);
        }
        if (elementInstruction && elementInstruction.skipContentProcessing) {
          return node.nextSibling;
        }
        var currentChild = node.firstChild;
        while (currentChild) {
          currentChild = this._compileNode(currentChild, resources, instructions, node, injectorId || parentInjectorId, targetLightDOM);
        }
      }
      return node.nextSibling;
    };
    var _ViewCompiler = ViewCompiler;
    ViewCompiler = _aureliaDependencyInjection.inject(BindingLanguage, ViewResources)(ViewCompiler) || ViewCompiler;
    return ViewCompiler;
  })();
  exports.ViewCompiler = ViewCompiler;
  var ResourceModule = (function() {
    function ResourceModule(moduleId) {
      _classCallCheck(this, ResourceModule);
      this.id = moduleId;
      this.moduleInstance = null;
      this.mainResource = null;
      this.resources = null;
      this.viewStrategy = null;
      this.isInitialized = false;
      this.onLoaded = null;
    }
    ResourceModule.prototype.initialize = function initialize(container) {
      var current = this.mainResource;
      var resources = this.resources;
      var vs = this.viewStrategy;
      if (this.isInitialized) {
        return;
      }
      this.isInitialized = true;
      if (current !== undefined) {
        current.metadata.viewStrategy = vs;
        current.initialize(container);
      }
      for (var i = 0,
          ii = resources.length; i < ii; ++i) {
        current = resources[i];
        current.metadata.viewStrategy = vs;
        current.initialize(container);
      }
    };
    ResourceModule.prototype.register = function register(registry, name) {
      var main = this.mainResource;
      var resources = this.resources;
      if (main !== undefined) {
        main.register(registry, name);
        name = null;
      }
      for (var i = 0,
          ii = resources.length; i < ii; ++i) {
        resources[i].register(registry, name);
        name = null;
      }
    };
    ResourceModule.prototype.load = function load(container, loadContext) {
      if (this.onLoaded !== null) {
        return this.onLoaded;
      }
      var main = this.mainResource;
      var resources = this.resources;
      var loads = undefined;
      if (main !== undefined) {
        loads = new Array(resources.length + 1);
        loads[0] = main.load(container, loadContext);
        for (var i = 0,
            ii = resources.length; i < ii; ++i) {
          loads[i + 1] = resources[i].load(container, loadContext);
        }
      } else {
        loads = new Array(resources.length);
        for (var i = 0,
            ii = resources.length; i < ii; ++i) {
          loads[i] = resources[i].load(container, loadContext);
        }
      }
      this.onLoaded = Promise.all(loads);
      return this.onLoaded;
    };
    return ResourceModule;
  })();
  exports.ResourceModule = ResourceModule;
  var ResourceDescription = (function() {
    function ResourceDescription(key, exportedValue, resourceTypeMeta) {
      _classCallCheck(this, ResourceDescription);
      if (!resourceTypeMeta) {
        resourceTypeMeta = _aureliaMetadata.metadata.get(_aureliaMetadata.metadata.resource, exportedValue);
        if (!resourceTypeMeta) {
          resourceTypeMeta = new HtmlBehaviorResource();
          resourceTypeMeta.elementName = _hyphenate(key);
          _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, resourceTypeMeta, exportedValue);
        }
      }
      if (resourceTypeMeta instanceof HtmlBehaviorResource) {
        if (resourceTypeMeta.elementName === undefined) {
          resourceTypeMeta.elementName = _hyphenate(key);
        } else if (resourceTypeMeta.attributeName === undefined) {
          resourceTypeMeta.attributeName = _hyphenate(key);
        } else if (resourceTypeMeta.attributeName === null && resourceTypeMeta.elementName === null) {
          HtmlBehaviorResource.convention(key, resourceTypeMeta);
        }
      } else if (!resourceTypeMeta.name) {
        resourceTypeMeta.name = _hyphenate(key);
      }
      this.metadata = resourceTypeMeta;
      this.value = exportedValue;
    }
    ResourceDescription.prototype.initialize = function initialize(container) {
      this.metadata.initialize(container, this.value);
    };
    ResourceDescription.prototype.register = function register(registry, name) {
      this.metadata.register(registry, name);
    };
    ResourceDescription.prototype.load = function load(container, loadContext) {
      return this.metadata.load(container, this.value, loadContext);
    };
    return ResourceDescription;
  })();
  exports.ResourceDescription = ResourceDescription;
  var ModuleAnalyzer = (function() {
    function ModuleAnalyzer() {
      _classCallCheck(this, ModuleAnalyzer);
      this.cache = {};
    }
    ModuleAnalyzer.prototype.getAnalysis = function getAnalysis(moduleId) {
      return this.cache[moduleId];
    };
    ModuleAnalyzer.prototype.analyze = function analyze(moduleId, moduleInstance, mainResourceKey) {
      var mainResource = undefined;
      var fallbackValue = undefined;
      var fallbackKey = undefined;
      var resourceTypeMeta = undefined;
      var key = undefined;
      var exportedValue = undefined;
      var resources = [];
      var conventional = undefined;
      var vs = undefined;
      var resourceModule = undefined;
      resourceModule = this.cache[moduleId];
      if (resourceModule) {
        return resourceModule;
      }
      resourceModule = new ResourceModule(moduleId);
      this.cache[moduleId] = resourceModule;
      if (typeof moduleInstance === 'function') {
        moduleInstance = {'default': moduleInstance};
      }
      if (mainResourceKey) {
        mainResource = new ResourceDescription(mainResourceKey, moduleInstance[mainResourceKey]);
      }
      for (key in moduleInstance) {
        exportedValue = moduleInstance[key];
        if (key === mainResourceKey || typeof exportedValue !== 'function') {
          continue;
        }
        resourceTypeMeta = _aureliaMetadata.metadata.get(_aureliaMetadata.metadata.resource, exportedValue);
        if (resourceTypeMeta) {
          if (resourceTypeMeta.attributeName === null && resourceTypeMeta.elementName === null) {
            HtmlBehaviorResource.convention(key, resourceTypeMeta);
          }
          if (resourceTypeMeta.attributeName === null && resourceTypeMeta.elementName === null) {
            resourceTypeMeta.elementName = _hyphenate(key);
          }
          if (!mainResource && resourceTypeMeta instanceof HtmlBehaviorResource && resourceTypeMeta.elementName !== null) {
            mainResource = new ResourceDescription(key, exportedValue, resourceTypeMeta);
          } else {
            resources.push(new ResourceDescription(key, exportedValue, resourceTypeMeta));
          }
        } else if (viewStrategy.decorates(exportedValue)) {
          vs = exportedValue;
        } else if (exportedValue instanceof _aureliaLoader.TemplateRegistryEntry) {
          vs = new TemplateRegistryViewStrategy(moduleId, exportedValue);
        } else {
          if (conventional = HtmlBehaviorResource.convention(key)) {
            if (conventional.elementName !== null && !mainResource) {
              mainResource = new ResourceDescription(key, exportedValue, conventional);
            } else {
              resources.push(new ResourceDescription(key, exportedValue, conventional));
            }
            _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, conventional, exportedValue);
          } else if (conventional = _aureliaBinding.ValueConverterResource.convention(key)) {
            resources.push(new ResourceDescription(key, exportedValue, conventional));
            _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, conventional, exportedValue);
          } else if (conventional = _aureliaBinding.BindingBehaviorResource.convention(key)) {
            resources.push(new ResourceDescription(key, exportedValue, conventional));
            _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, conventional, exportedValue);
          } else if (!fallbackValue) {
            fallbackValue = exportedValue;
            fallbackKey = key;
          }
        }
      }
      if (!mainResource && fallbackValue) {
        mainResource = new ResourceDescription(fallbackKey, fallbackValue);
      }
      resourceModule.moduleInstance = moduleInstance;
      resourceModule.mainResource = mainResource;
      resourceModule.resources = resources;
      resourceModule.viewStrategy = vs;
      return resourceModule;
    };
    return ModuleAnalyzer;
  })();
  exports.ModuleAnalyzer = ModuleAnalyzer;
  var logger = _aureliaLogging.getLogger('templating');
  function ensureRegistryEntry(loader, urlOrRegistryEntry) {
    if (urlOrRegistryEntry instanceof _aureliaLoader.TemplateRegistryEntry) {
      return Promise.resolve(urlOrRegistryEntry);
    }
    return loader.loadTemplate(urlOrRegistryEntry);
  }
  var ProxyViewFactory = (function() {
    function ProxyViewFactory(promise) {
      var _this6 = this;
      _classCallCheck(this, ProxyViewFactory);
      promise.then(function(x) {
        return _this6.viewFactory = x;
      });
    }
    ProxyViewFactory.prototype.create = function create(container, bindingContext, createInstruction, element) {
      return this.viewFactory.create(container, bindingContext, createInstruction, element);
    };
    ProxyViewFactory.prototype.setCacheSize = function setCacheSize(size, doNotOverrideIfAlreadySet) {
      this.viewFactory.setCacheSize(size, doNotOverrideIfAlreadySet);
    };
    ProxyViewFactory.prototype.getCachedView = function getCachedView() {
      return this.viewFactory.getCachedView();
    };
    ProxyViewFactory.prototype.returnViewToCache = function returnViewToCache(view) {
      this.viewFactory.returnViewToCache(view);
    };
    _createClass(ProxyViewFactory, [{
      key: 'isCaching',
      get: function get() {
        return this.viewFactory.isCaching;
      }
    }]);
    return ProxyViewFactory;
  })();
  var ViewEngine = (function() {
    function ViewEngine(loader, container, viewCompiler, moduleAnalyzer, appResources) {
      _classCallCheck(this, _ViewEngine);
      this.loader = loader;
      this.container = container;
      this.viewCompiler = viewCompiler;
      this.moduleAnalyzer = moduleAnalyzer;
      this.appResources = appResources;
      this._pluginMap = {};
    }
    ViewEngine.prototype.addResourcePlugin = function addResourcePlugin(extension, implementation) {
      var name = extension.replace('.', '') + '-resource-plugin';
      this._pluginMap[extension] = name;
      this.loader.addPlugin(name, implementation);
    };
    ViewEngine.prototype.loadViewFactory = function loadViewFactory(urlOrRegistryEntry, compileInstruction, loadContext) {
      var _this7 = this;
      loadContext = loadContext || new ResourceLoadContext();
      return ensureRegistryEntry(this.loader, urlOrRegistryEntry).then(function(registryEntry) {
        if (registryEntry.onReady) {
          if (!loadContext.hasDependency(urlOrRegistryEntry)) {
            loadContext.addDependency(urlOrRegistryEntry);
            return registryEntry.onReady;
          }
          return Promise.resolve(new ProxyViewFactory(registryEntry.onReady));
        }
        loadContext.addDependency(urlOrRegistryEntry);
        registryEntry.onReady = _this7.loadTemplateResources(registryEntry, compileInstruction, loadContext).then(function(resources) {
          registryEntry.resources = resources;
          var viewFactory = _this7.viewCompiler.compile(registryEntry.template, resources, compileInstruction);
          registryEntry.factory = viewFactory;
          return viewFactory;
        });
        return registryEntry.onReady;
      });
    };
    ViewEngine.prototype.loadTemplateResources = function loadTemplateResources(registryEntry, compileInstruction, loadContext) {
      var resources = new ViewResources(this.appResources, registryEntry.address);
      var dependencies = registryEntry.dependencies;
      var importIds = undefined;
      var names = undefined;
      compileInstruction = compileInstruction || ViewCompileInstruction.normal;
      if (dependencies.length === 0 && !compileInstruction.associatedModuleId) {
        return Promise.resolve(resources);
      }
      importIds = dependencies.map(function(x) {
        return x.src;
      });
      names = dependencies.map(function(x) {
        return x.name;
      });
      logger.debug('importing resources for ' + registryEntry.address, importIds);
      return this.importViewResources(importIds, names, resources, compileInstruction, loadContext);
    };
    ViewEngine.prototype.importViewModelResource = function importViewModelResource(moduleImport, moduleMember) {
      var _this8 = this;
      return this.loader.loadModule(moduleImport).then(function(viewModelModule) {
        var normalizedId = _aureliaMetadata.Origin.get(viewModelModule).moduleId;
        var resourceModule = _this8.moduleAnalyzer.analyze(normalizedId, viewModelModule, moduleMember);
        if (!resourceModule.mainResource) {
          throw new Error('No view model found in module "' + moduleImport + '".');
        }
        resourceModule.initialize(_this8.container);
        return resourceModule.mainResource;
      });
    };
    ViewEngine.prototype.importViewResources = function importViewResources(moduleIds, names, resources, compileInstruction, loadContext) {
      var _this9 = this;
      loadContext = loadContext || new ResourceLoadContext();
      compileInstruction = compileInstruction || ViewCompileInstruction.normal;
      moduleIds = moduleIds.map(function(x) {
        return _this9._applyLoaderPlugin(x);
      });
      return this.loader.loadAllModules(moduleIds).then(function(imports) {
        var i = undefined;
        var ii = undefined;
        var analysis = undefined;
        var normalizedId = undefined;
        var current = undefined;
        var associatedModule = undefined;
        var container = _this9.container;
        var moduleAnalyzer = _this9.moduleAnalyzer;
        var allAnalysis = new Array(imports.length);
        for (i = 0, ii = imports.length; i < ii; ++i) {
          current = imports[i];
          normalizedId = _aureliaMetadata.Origin.get(current).moduleId;
          analysis = moduleAnalyzer.analyze(normalizedId, current);
          analysis.initialize(container);
          analysis.register(resources, names[i]);
          allAnalysis[i] = analysis;
        }
        if (compileInstruction.associatedModuleId) {
          associatedModule = moduleAnalyzer.getAnalysis(compileInstruction.associatedModuleId);
          if (associatedModule) {
            associatedModule.register(resources);
          }
        }
        for (i = 0, ii = allAnalysis.length; i < ii; ++i) {
          allAnalysis[i] = allAnalysis[i].load(container, loadContext);
        }
        return Promise.all(allAnalysis).then(function() {
          return resources;
        });
      });
    };
    ViewEngine.prototype._applyLoaderPlugin = function _applyLoaderPlugin(id) {
      var index = id.lastIndexOf('.');
      if (index !== -1) {
        var ext = id.substring(index);
        var pluginName = this._pluginMap[ext];
        if (pluginName === undefined) {
          return id;
        }
        return this.loader.applyPluginToUrl(id, pluginName);
      }
      return id;
    };
    var _ViewEngine = ViewEngine;
    ViewEngine = _aureliaDependencyInjection.inject(_aureliaLoader.Loader, _aureliaDependencyInjection.Container, ViewCompiler, ModuleAnalyzer, ViewResources)(ViewEngine) || ViewEngine;
    return ViewEngine;
  })();
  exports.ViewEngine = ViewEngine;
  var Controller = (function() {
    function Controller(behavior, instruction, viewModel, elementEvents) {
      _classCallCheck(this, Controller);
      this.behavior = behavior;
      this.instruction = instruction;
      this.viewModel = viewModel;
      this.isAttached = false;
      this.view = null;
      this.isBound = false;
      this.scope = null;
      this.elementEvents = elementEvents || null;
      var observerLookup = behavior.observerLocator.getOrCreateObserversLookup(viewModel);
      var handlesBind = behavior.handlesBind;
      var attributes = instruction.attributes;
      var boundProperties = this.boundProperties = [];
      var properties = behavior.properties;
      var i = undefined;
      var ii = undefined;
      behavior._ensurePropertiesDefined(viewModel, observerLookup);
      for (i = 0, ii = properties.length; i < ii; ++i) {
        properties[i]._initialize(viewModel, observerLookup, attributes, handlesBind, boundProperties);
      }
    }
    Controller.prototype.created = function created(owningView) {
      if (this.behavior.handlesCreated) {
        this.viewModel.created(owningView, this.view);
      }
    };
    Controller.prototype.automate = function automate(overrideContext, owningView) {
      this.view.bindingContext = this.viewModel;
      this.view.overrideContext = overrideContext || _aureliaBinding.createOverrideContext(this.viewModel);
      this.view._isUserControlled = true;
      if (this.behavior.handlesCreated) {
        this.viewModel.created(owningView || null, this.view);
      }
      this.bind(this.view);
    };
    Controller.prototype.bind = function bind(scope) {
      var skipSelfSubscriber = this.behavior.handlesBind;
      var boundProperties = this.boundProperties;
      var i = undefined;
      var ii = undefined;
      var x = undefined;
      var observer = undefined;
      var selfSubscriber = undefined;
      if (this.isBound) {
        if (this.scope === scope) {
          return;
        }
        this.unbind();
      }
      this.isBound = true;
      this.scope = scope;
      for (i = 0, ii = boundProperties.length; i < ii; ++i) {
        x = boundProperties[i];
        observer = x.observer;
        selfSubscriber = observer.selfSubscriber;
        observer.publishing = false;
        if (skipSelfSubscriber) {
          observer.selfSubscriber = null;
        }
        x.binding.bind(scope);
        observer.call();
        observer.publishing = true;
        observer.selfSubscriber = selfSubscriber;
      }
      var overrideContext = undefined;
      if (this.view !== null) {
        if (skipSelfSubscriber) {
          this.view.viewModelScope = scope;
        }
        if (this.viewModel === scope.overrideContext.bindingContext) {
          overrideContext = scope.overrideContext;
        } else if (this.instruction.inheritBindingContext) {
          overrideContext = _aureliaBinding.createOverrideContext(this.viewModel, scope.overrideContext);
        } else {
          overrideContext = _aureliaBinding.createOverrideContext(this.viewModel);
          overrideContext.__parentOverrideContext = scope.overrideContext;
        }
        this.view.bind(this.viewModel, overrideContext);
      } else if (skipSelfSubscriber) {
        overrideContext = scope.overrideContext;
        if (scope.overrideContext.__parentOverrideContext !== undefined && this.viewModel.viewFactory && this.viewModel.viewFactory.factoryCreateInstruction.partReplacements) {
          overrideContext = Object.assign({}, scope.overrideContext);
          overrideContext.parentOverrideContext = scope.overrideContext.__parentOverrideContext;
        }
        this.viewModel.bind(scope.bindingContext, overrideContext);
      }
    };
    Controller.prototype.unbind = function unbind() {
      if (this.isBound) {
        var boundProperties = this.boundProperties;
        var i = undefined;
        var ii = undefined;
        this.isBound = false;
        this.scope = null;
        if (this.view !== null) {
          this.view.unbind();
        }
        if (this.behavior.handlesUnbind) {
          this.viewModel.unbind();
        }
        if (this.elementEvents !== null) {
          this.elementEvents.disposeAll();
        }
        for (i = 0, ii = boundProperties.length; i < ii; ++i) {
          boundProperties[i].binding.unbind();
        }
      }
    };
    Controller.prototype.attached = function attached() {
      if (this.isAttached) {
        return;
      }
      this.isAttached = true;
      if (this.behavior.handlesAttached) {
        this.viewModel.attached();
      }
      if (this.view !== null) {
        this.view.attached();
      }
    };
    Controller.prototype.detached = function detached() {
      if (this.isAttached) {
        this.isAttached = false;
        if (this.view !== null) {
          this.view.detached();
        }
        if (this.behavior.handlesDetached) {
          this.viewModel.detached();
        }
      }
    };
    return Controller;
  })();
  exports.Controller = Controller;
  var BehaviorPropertyObserver = (function() {
    function BehaviorPropertyObserver(taskQueue, obj, propertyName, selfSubscriber, initialValue) {
      _classCallCheck(this, _BehaviorPropertyObserver);
      this.taskQueue = taskQueue;
      this.obj = obj;
      this.propertyName = propertyName;
      this.notqueued = true;
      this.publishing = false;
      this.selfSubscriber = selfSubscriber;
      this.currentValue = this.oldValue = initialValue;
    }
    BehaviorPropertyObserver.prototype.getValue = function getValue() {
      return this.currentValue;
    };
    BehaviorPropertyObserver.prototype.setValue = function setValue(newValue) {
      var oldValue = this.currentValue;
      if (oldValue !== newValue) {
        if (this.publishing && this.notqueued) {
          this.notqueued = false;
          this.taskQueue.queueMicroTask(this);
        }
        this.oldValue = oldValue;
        this.currentValue = newValue;
      }
    };
    BehaviorPropertyObserver.prototype.call = function call() {
      var oldValue = this.oldValue;
      var newValue = this.currentValue;
      this.notqueued = true;
      if (newValue === oldValue) {
        return;
      }
      if (this.selfSubscriber) {
        this.selfSubscriber(newValue, oldValue);
      }
      this.callSubscribers(newValue, oldValue);
      this.oldValue = newValue;
    };
    BehaviorPropertyObserver.prototype.subscribe = function subscribe(context, callable) {
      this.addSubscriber(context, callable);
    };
    BehaviorPropertyObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
      this.removeSubscriber(context, callable);
    };
    var _BehaviorPropertyObserver = BehaviorPropertyObserver;
    BehaviorPropertyObserver = _aureliaBinding.subscriberCollection()(BehaviorPropertyObserver) || BehaviorPropertyObserver;
    return BehaviorPropertyObserver;
  })();
  exports.BehaviorPropertyObserver = BehaviorPropertyObserver;
  function getObserver(behavior, instance, name) {
    var lookup = instance.__observers__;
    if (lookup === undefined) {
      if (!behavior.isInitialized) {
        behavior.initialize(_aureliaDependencyInjection.Container.instance || new _aureliaDependencyInjection.Container(), instance.constructor);
      }
      lookup = behavior.observerLocator.getOrCreateObserversLookup(instance);
      behavior._ensurePropertiesDefined(instance, lookup);
    }
    return lookup[name];
  }
  var BindableProperty = (function() {
    function BindableProperty(nameOrConfig) {
      _classCallCheck(this, BindableProperty);
      if (typeof nameOrConfig === 'string') {
        this.name = nameOrConfig;
      } else {
        Object.assign(this, nameOrConfig);
      }
      this.attribute = this.attribute || _hyphenate(this.name);
      this.defaultBindingMode = this.defaultBindingMode || _aureliaBinding.bindingMode.oneWay;
      this.changeHandler = this.changeHandler || null;
      this.owner = null;
      this.descriptor = null;
    }
    BindableProperty.prototype.registerWith = function registerWith(target, behavior, descriptor) {
      behavior.properties.push(this);
      behavior.attributes[this.attribute] = this;
      this.owner = behavior;
      if (descriptor) {
        this.descriptor = descriptor;
        return this._configureDescriptor(behavior, descriptor);
      }
    };
    BindableProperty.prototype._configureDescriptor = function _configureDescriptor(behavior, descriptor) {
      var name = this.name;
      descriptor.configurable = true;
      descriptor.enumerable = true;
      if ('initializer' in descriptor) {
        this.defaultValue = descriptor.initializer;
        delete descriptor.initializer;
        delete descriptor.writable;
      }
      if ('value' in descriptor) {
        this.defaultValue = descriptor.value;
        delete descriptor.value;
        delete descriptor.writable;
      }
      descriptor.get = function() {
        return getObserver(behavior, this, name).getValue();
      };
      descriptor.set = function(value) {
        getObserver(behavior, this, name).setValue(value);
      };
      descriptor.get.getObserver = function(obj) {
        return getObserver(behavior, obj, name);
      };
      return descriptor;
    };
    BindableProperty.prototype.defineOn = function defineOn(target, behavior) {
      var name = this.name;
      var handlerName = undefined;
      if (this.changeHandler === null) {
        handlerName = name + 'Changed';
        if (handlerName in target.prototype) {
          this.changeHandler = handlerName;
        }
      }
      if (this.descriptor === null) {
        Object.defineProperty(target.prototype, name, this._configureDescriptor(behavior, {}));
      }
    };
    BindableProperty.prototype.createObserver = function createObserver(viewModel) {
      var selfSubscriber = null;
      var defaultValue = this.defaultValue;
      var changeHandlerName = this.changeHandler;
      var name = this.name;
      var initialValue = undefined;
      if (this.hasOptions) {
        return undefined;
      }
      if (changeHandlerName in viewModel) {
        if ('propertyChanged' in viewModel) {
          selfSubscriber = function(newValue, oldValue) {
            viewModel[changeHandlerName](newValue, oldValue);
            viewModel.propertyChanged(name, newValue, oldValue);
          };
        } else {
          selfSubscriber = function(newValue, oldValue) {
            return viewModel[changeHandlerName](newValue, oldValue);
          };
        }
      } else if ('propertyChanged' in viewModel) {
        selfSubscriber = function(newValue, oldValue) {
          return viewModel.propertyChanged(name, newValue, oldValue);
        };
      } else if (changeHandlerName !== null) {
        throw new Error('Change handler ' + changeHandlerName + ' was specified but not delcared on the class.');
      }
      if (defaultValue !== undefined) {
        initialValue = typeof defaultValue === 'function' ? defaultValue.call(viewModel) : defaultValue;
      }
      return new BehaviorPropertyObserver(this.owner.taskQueue, viewModel, this.name, selfSubscriber, initialValue);
    };
    BindableProperty.prototype._initialize = function _initialize(viewModel, observerLookup, attributes, behaviorHandlesBind, boundProperties) {
      var selfSubscriber = undefined;
      var observer = undefined;
      var attribute = undefined;
      var defaultValue = this.defaultValue;
      if (this.isDynamic) {
        for (var key in attributes) {
          this._createDynamicProperty(viewModel, observerLookup, behaviorHandlesBind, key, attributes[key], boundProperties);
        }
      } else if (!this.hasOptions) {
        observer = observerLookup[this.name];
        if (attributes !== null) {
          selfSubscriber = observer.selfSubscriber;
          attribute = attributes[this.attribute];
          if (behaviorHandlesBind) {
            observer.selfSubscriber = null;
          }
          if (typeof attribute === 'string') {
            viewModel[this.name] = attribute;
            observer.call();
          } else if (attribute) {
            boundProperties.push({
              observer: observer,
              binding: attribute.createBinding(viewModel)
            });
          } else if (defaultValue !== undefined) {
            observer.call();
          }
          observer.selfSubscriber = selfSubscriber;
        }
        observer.publishing = true;
      }
    };
    BindableProperty.prototype._createDynamicProperty = function _createDynamicProperty(viewModel, observerLookup, behaviorHandlesBind, name, attribute, boundProperties) {
      var changeHandlerName = name + 'Changed';
      var selfSubscriber = null;
      var observer = undefined;
      var info = undefined;
      if (changeHandlerName in viewModel) {
        if ('propertyChanged' in viewModel) {
          selfSubscriber = function(newValue, oldValue) {
            viewModel[changeHandlerName](newValue, oldValue);
            viewModel.propertyChanged(name, newValue, oldValue);
          };
        } else {
          selfSubscriber = function(newValue, oldValue) {
            return viewModel[changeHandlerName](newValue, oldValue);
          };
        }
      } else if ('propertyChanged' in viewModel) {
        selfSubscriber = function(newValue, oldValue) {
          return viewModel.propertyChanged(name, newValue, oldValue);
        };
      }
      observer = observerLookup[name] = new BehaviorPropertyObserver(this.owner.taskQueue, viewModel, name, selfSubscriber);
      Object.defineProperty(viewModel, name, {
        configurable: true,
        enumerable: true,
        get: observer.getValue.bind(observer),
        set: observer.setValue.bind(observer)
      });
      if (behaviorHandlesBind) {
        observer.selfSubscriber = null;
      }
      if (typeof attribute === 'string') {
        viewModel[name] = attribute;
        observer.call();
      } else if (attribute) {
        info = {
          observer: observer,
          binding: attribute.createBinding(viewModel)
        };
        boundProperties.push(info);
      }
      observer.publishing = true;
      observer.selfSubscriber = selfSubscriber;
    };
    return BindableProperty;
  })();
  exports.BindableProperty = BindableProperty;
  var contentSelectorViewCreateInstruction = {enhance: false};
  var lastProviderId = 0;
  function nextProviderId() {
    return ++lastProviderId;
  }
  function doProcessContent() {
    return true;
  }
  function doProcessAttributes() {}
  var HtmlBehaviorResource = (function() {
    function HtmlBehaviorResource() {
      _classCallCheck(this, HtmlBehaviorResource);
      this.elementName = null;
      this.attributeName = null;
      this.attributeDefaultBindingMode = undefined;
      this.liftsContent = false;
      this.targetShadowDOM = false;
      this.processAttributes = doProcessAttributes;
      this.processContent = doProcessContent;
      this.usesShadowDOM = false;
      this.childBindings = null;
      this.hasDynamicOptions = false;
      this.containerless = false;
      this.properties = [];
      this.attributes = {};
      this.isInitialized = false;
    }
    HtmlBehaviorResource.convention = function convention(name, existing) {
      var behavior = undefined;
      if (name.endsWith('CustomAttribute')) {
        behavior = existing || new HtmlBehaviorResource();
        behavior.attributeName = _hyphenate(name.substring(0, name.length - 15));
      }
      if (name.endsWith('CustomElement')) {
        behavior = existing || new HtmlBehaviorResource();
        behavior.elementName = _hyphenate(name.substring(0, name.length - 13));
      }
      return behavior;
    };
    HtmlBehaviorResource.prototype.addChildBinding = function addChildBinding(behavior) {
      if (this.childBindings === null) {
        this.childBindings = [];
      }
      this.childBindings.push(behavior);
    };
    HtmlBehaviorResource.prototype.initialize = function initialize(container, target) {
      var proto = target.prototype;
      var properties = this.properties;
      var attributeName = this.attributeName;
      var attributeDefaultBindingMode = this.attributeDefaultBindingMode;
      var i = undefined;
      var ii = undefined;
      var current = undefined;
      if (this.isInitialized) {
        return;
      }
      this.isInitialized = true;
      target.__providerId__ = nextProviderId();
      this.observerLocator = container.get(_aureliaBinding.ObserverLocator);
      this.taskQueue = container.get(_aureliaTaskQueue.TaskQueue);
      this.target = target;
      this.usesShadowDOM = this.targetShadowDOM && _aureliaPal.FEATURE.shadowDOM;
      this.handlesCreated = 'created' in proto;
      this.handlesBind = 'bind' in proto;
      this.handlesUnbind = 'unbind' in proto;
      this.handlesAttached = 'attached' in proto;
      this.handlesDetached = 'detached' in proto;
      this.htmlName = this.elementName || this.attributeName;
      if (attributeName !== null) {
        if (properties.length === 0) {
          new BindableProperty({
            name: 'value',
            changeHandler: 'valueChanged' in proto ? 'valueChanged' : null,
            attribute: attributeName,
            defaultBindingMode: attributeDefaultBindingMode
          }).registerWith(target, this);
        }
        current = properties[0];
        if (properties.length === 1 && current.name === 'value') {
          current.isDynamic = current.hasOptions = this.hasDynamicOptions;
          current.defineOn(target, this);
        } else {
          for (i = 0, ii = properties.length; i < ii; ++i) {
            properties[i].defineOn(target, this);
          }
          current = new BindableProperty({
            name: 'value',
            changeHandler: 'valueChanged' in proto ? 'valueChanged' : null,
            attribute: attributeName,
            defaultBindingMode: attributeDefaultBindingMode
          });
          current.hasOptions = true;
          current.registerWith(target, this);
        }
      } else {
        for (i = 0, ii = properties.length; i < ii; ++i) {
          properties[i].defineOn(target, this);
        }
      }
    };
    HtmlBehaviorResource.prototype.register = function register(registry, name) {
      if (this.attributeName !== null) {
        registry.registerAttribute(name || this.attributeName, this, this.attributeName);
      }
      if (this.elementName !== null) {
        registry.registerElement(name || this.elementName, this);
      }
    };
    HtmlBehaviorResource.prototype.load = function load(container, target, loadContext, viewStrategy, transientView) {
      var _this10 = this;
      var options = undefined;
      if (this.elementName !== null) {
        viewStrategy = container.get(ViewLocator).getViewStrategy(viewStrategy || this.viewStrategy || target);
        options = new ViewCompileInstruction(this.targetShadowDOM, true);
        if (!viewStrategy.moduleId) {
          viewStrategy.moduleId = _aureliaMetadata.Origin.get(target).moduleId;
        }
        return viewStrategy.loadViewFactory(container.get(ViewEngine), options, loadContext).then(function(viewFactory) {
          if (!transientView || !_this10.viewFactory) {
            _this10.viewFactory = viewFactory;
          }
          return viewFactory;
        });
      }
      return Promise.resolve(this);
    };
    HtmlBehaviorResource.prototype.compile = function compile(compiler, resources, node, instruction, parentNode) {
      if (this.liftsContent) {
        if (!instruction.viewFactory) {
          var template = _aureliaPal.DOM.createElement('template');
          var fragment = _aureliaPal.DOM.createDocumentFragment();
          var cacheSize = node.getAttribute('view-cache');
          var part = node.getAttribute('part');
          node.removeAttribute(instruction.originalAttrName);
          _aureliaPal.DOM.replaceNode(template, node, parentNode);
          fragment.appendChild(node);
          instruction.viewFactory = compiler.compile(fragment, resources);
          if (part) {
            instruction.viewFactory.part = part;
            node.removeAttribute('part');
          }
          if (cacheSize) {
            instruction.viewFactory.setCacheSize(cacheSize);
            node.removeAttribute('view-cache');
          }
          node = template;
        }
      } else if (this.elementName !== null) {
        var _partReplacements2 = {};
        if (this.processContent(compiler, resources, node, instruction) && node.hasChildNodes()) {
          if (this.usesShadowDOM) {
            var currentChild = node.firstChild;
            var nextSibling = undefined;
            var toReplace = undefined;
            while (currentChild) {
              nextSibling = currentChild.nextSibling;
              if (currentChild.tagName === 'TEMPLATE' && (toReplace = currentChild.getAttribute('replace-part'))) {
                _partReplacements2[toReplace] = compiler.compile(currentChild, resources);
                _aureliaPal.DOM.removeNode(currentChild, parentNode);
                instruction.partReplacements = _partReplacements2;
              }
              currentChild = nextSibling;
            }
            instruction.skipContentProcessing = false;
          } else {
            var fragment = _aureliaPal.DOM.createDocumentFragment();
            var currentChild = node.firstChild;
            var nextSibling = undefined;
            var toReplace = undefined;
            while (currentChild) {
              nextSibling = currentChild.nextSibling;
              if (currentChild.tagName === 'TEMPLATE' && (toReplace = currentChild.getAttribute('replace-part'))) {
                _partReplacements2[toReplace] = compiler.compile(currentChild, resources);
                _aureliaPal.DOM.removeNode(currentChild, parentNode);
                instruction.partReplacements = _partReplacements2;
              } else {
                fragment.appendChild(currentChild);
              }
              currentChild = nextSibling;
            }
            instruction.contentFactory = compiler.compile(fragment, resources);
            instruction.skipContentProcessing = true;
          }
        } else {
          instruction.skipContentProcessing = true;
        }
      }
      return node;
    };
    HtmlBehaviorResource.prototype.create = function create(container, instruction, element, bindings) {
      var host = undefined;
      var au = null;
      instruction = instruction || BehaviorInstruction.normal;
      element = element || null;
      bindings = bindings || null;
      if (this.elementName !== null && element) {
        if (this.usesShadowDOM) {
          host = element.createShadowRoot();
          container.registerInstance(_aureliaPal.DOM.boundary, host);
        } else {
          host = element;
          if (this.targetShadowDOM) {
            container.registerInstance(_aureliaPal.DOM.boundary, host);
          }
        }
      }
      if (element !== null) {
        element.au = au = element.au || {};
      }
      var viewModel = instruction.viewModel || container.get(this.target);
      var controller = new Controller(this, instruction, viewModel, container.elementEvents);
      var childBindings = this.childBindings;
      var viewFactory = undefined;
      if (this.liftsContent) {
        au.controller = controller;
      } else if (this.elementName !== null) {
        viewFactory = instruction.viewFactory || this.viewFactory;
        container.viewModel = viewModel;
        if (viewFactory) {
          controller.view = viewFactory.create(container, instruction, element);
        }
        if (element !== null) {
          au.controller = controller;
          if (controller.view) {
            if (!this.usesShadowDOM) {
              if (instruction.contentFactory) {
                var contentView = instruction.contentFactory.create(container, contentSelectorViewCreateInstruction);
                _ContentSelector.applySelectors(contentView, controller.view.contentSelectors, function(contentSelector, group) {
                  return contentSelector.add(group);
                });
                controller.contentView = contentView;
              }
            }
            if (instruction.anchorIsContainer) {
              if (childBindings !== null) {
                for (var i = 0,
                    ii = childBindings.length; i < ii; ++i) {
                  controller.view.addBinding(childBindings[i].create(element, viewModel));
                }
              }
              controller.view.appendNodesTo(host);
            } else {
              controller.view.insertNodesBefore(host);
            }
          } else if (childBindings !== null) {
            for (var i = 0,
                ii = childBindings.length; i < ii; ++i) {
              bindings.push(childBindings[i].create(element, viewModel));
            }
          }
        } else if (controller.view) {
          controller.view.controller = controller;
          if (childBindings !== null) {
            for (var i = 0,
                ii = childBindings.length; i < ii; ++i) {
              controller.view.addBinding(childBindings[i].create(instruction.host, viewModel));
            }
          }
        } else if (childBindings !== null) {
          for (var i = 0,
              ii = childBindings.length; i < ii; ++i) {
            bindings.push(childBindings[i].create(instruction.host, viewModel));
          }
        }
      } else if (childBindings !== null) {
        for (var i = 0,
            ii = childBindings.length; i < ii; ++i) {
          bindings.push(childBindings[i].create(element, viewModel));
        }
      }
      if (au !== null) {
        au[this.htmlName] = controller;
      }
      if (instruction.initiatedByBehavior && viewFactory) {
        controller.view.created();
      }
      return controller;
    };
    HtmlBehaviorResource.prototype._ensurePropertiesDefined = function _ensurePropertiesDefined(instance, lookup) {
      var properties = undefined;
      var i = undefined;
      var ii = undefined;
      var observer = undefined;
      if ('__propertiesDefined__' in lookup) {
        return;
      }
      lookup.__propertiesDefined__ = true;
      properties = this.properties;
      for (i = 0, ii = properties.length; i < ii; ++i) {
        observer = properties[i].createObserver(instance);
        if (observer !== undefined) {
          lookup[observer.propertyName] = observer;
        }
      }
    };
    return HtmlBehaviorResource;
  })();
  exports.HtmlBehaviorResource = HtmlBehaviorResource;
  function createChildObserverDecorator(selectorOrConfig, all) {
    return function(target, key, descriptor) {
      var actualTarget = typeof key === 'string' ? target.constructor : target;
      var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, actualTarget);
      if (typeof selectorOrConfig === 'string') {
        selectorOrConfig = {
          selector: selectorOrConfig,
          name: key
        };
      }
      if (descriptor) {
        descriptor.writable = true;
      }
      selectorOrConfig.all = all;
      r.addChildBinding(new ChildObserver(selectorOrConfig));
    };
  }
  function children(selectorOrConfig) {
    return createChildObserverDecorator(selectorOrConfig, true);
  }
  function child(selectorOrConfig) {
    return createChildObserverDecorator(selectorOrConfig, false);
  }
  var ChildObserver = (function() {
    function ChildObserver(config) {
      _classCallCheck(this, ChildObserver);
      this.name = config.name;
      this.changeHandler = config.changeHandler || this.name + 'Changed';
      this.selector = config.selector;
      this.all = config.all;
    }
    ChildObserver.prototype.create = function create(target, viewModel) {
      return new ChildObserverBinder(this.selector, target, this.name, viewModel, this.changeHandler, this.all);
    };
    return ChildObserver;
  })();
  var noMutations = [];
  function trackMutation(groupedMutations, binder, record) {
    var mutations = groupedMutations.get(binder);
    if (!mutations) {
      mutations = [];
      groupedMutations.set(binder, mutations);
    }
    mutations.push(record);
  }
  function onChildChange(mutations, observer) {
    var binders = observer.binders;
    var bindersLength = binders.length;
    var groupedMutations = new Map();
    for (var i = 0,
        ii = mutations.length; i < ii; ++i) {
      var record = mutations[i];
      var added = record.addedNodes;
      var removed = record.removedNodes;
      for (var j = 0,
          jj = removed.length; j < jj; ++j) {
        var node = removed[j];
        if (node.nodeType === 1) {
          for (var k = 0; k < bindersLength; ++k) {
            var binder = binders[k];
            if (binder.onRemove(node)) {
              trackMutation(groupedMutations, binder, record);
            }
          }
        }
      }
      for (var j = 0,
          jj = added.length; j < jj; ++j) {
        var node = added[j];
        if (node.nodeType === 1) {
          for (var k = 0; k < bindersLength; ++k) {
            var binder = binders[k];
            if (binder.onAdd(node)) {
              trackMutation(groupedMutations, binder, record);
            }
          }
        }
      }
    }
    groupedMutations.forEach(function(value, key) {
      if (key.changeHandler !== null) {
        key.viewModel[key.changeHandler](value);
      }
    });
  }
  var ChildObserverBinder = (function() {
    function ChildObserverBinder(selector, target, property, viewModel, changeHandler, all) {
      _classCallCheck(this, ChildObserverBinder);
      this.selector = selector;
      this.target = target;
      this.property = property;
      this.viewModel = viewModel;
      this.changeHandler = changeHandler in viewModel ? changeHandler : null;
      this.all = all;
    }
    ChildObserverBinder.prototype.bind = function bind(source) {
      var target = this.target;
      var viewModel = this.viewModel;
      var selector = this.selector;
      var current = target.firstElementChild;
      var observer = target.__childObserver__;
      if (!observer) {
        observer = target.__childObserver__ = _aureliaPal.DOM.createMutationObserver(onChildChange);
        observer.observe(target, {childList: true});
        observer.binders = [];
      }
      observer.binders.push(this);
      if (this.all) {
        var items = viewModel[this.property];
        if (!items) {
          items = viewModel[this.property] = [];
        } else {
          items.length = 0;
        }
        while (current) {
          if (current.matches(selector)) {
            items.push(current.au && current.au.controller ? current.au.controller.viewModel : current);
          }
          current = current.nextElementSibling;
        }
        if (this.changeHandler !== null) {
          this.viewModel[this.changeHandler](noMutations);
        }
      } else {
        while (current) {
          if (current.matches(selector)) {
            var value = current.au && current.au.controller ? current.au.controller.viewModel : current;
            this.viewModel[this.property] = value;
            if (this.changeHandler !== null) {
              this.viewModel[this.changeHandler](value);
            }
            break;
          }
          current = current.nextElementSibling;
        }
      }
    };
    ChildObserverBinder.prototype.onRemove = function onRemove(element) {
      if (element.matches(this.selector)) {
        var value = element.au && element.au.controller ? element.au.controller.viewModel : element;
        if (this.all) {
          var items = this.viewModel[this.property];
          var index = items.indexOf(value);
          if (index !== -1) {
            items.splice(index, 1);
          }
          return true;
        }
        return false;
      }
    };
    ChildObserverBinder.prototype.onAdd = function onAdd(element) {
      var selector = this.selector;
      if (element.matches(selector)) {
        var value = element.au && element.au.controller ? element.au.controller.viewModel : element;
        if (this.all) {
          var items = this.viewModel[this.property];
          var index = 0;
          var prev = element.previousElementSibling;
          while (prev) {
            if (prev.matches(selector)) {
              index++;
            }
            prev = prev.previousElementSibling;
          }
          items.splice(index, 0, value);
          return true;
        }
        this.viewModel[this.property] = value;
        if (this.changeHandler !== null) {
          this.viewModel[this.changeHandler](value);
        }
      }
      return false;
    };
    ChildObserverBinder.prototype.unbind = function unbind() {
      if (this.target.__childObserver__) {
        this.target.__childObserver__.disconnect();
        this.target.__childObserver__ = null;
      }
    };
    return ChildObserverBinder;
  })();
  function tryActivateViewModel(context) {
    if (context.skipActivation || typeof context.viewModel.activate !== 'function') {
      return Promise.resolve();
    }
    return context.viewModel.activate(context.model) || Promise.resolve();
  }
  var CompositionEngine = (function() {
    function CompositionEngine(viewEngine, viewLocator) {
      _classCallCheck(this, _CompositionEngine);
      this.viewEngine = viewEngine;
      this.viewLocator = viewLocator;
    }
    CompositionEngine.prototype._createControllerAndSwap = function _createControllerAndSwap(context) {
      function swap(controller) {
        return Promise.resolve(context.viewSlot.removeAll(true)).then(function() {
          if (context.currentController) {
            context.currentController.unbind();
          }
          context.viewSlot.add(controller.view);
          if (context.compositionTransactionNotifier) {
            context.compositionTransactionNotifier.done();
          }
          return controller;
        });
      }
      return this.createController(context).then(function(controller) {
        controller.automate(context.overrideContext, context.owningView);
        if (context.compositionTransactionOwnershipToken) {
          return context.compositionTransactionOwnershipToken.waitForCompositionComplete().then(function() {
            return swap(controller);
          });
        }
        return swap(controller);
      });
    };
    CompositionEngine.prototype.createController = function createController(context) {
      var _this11 = this;
      var childContainer = undefined;
      var viewModel = undefined;
      var viewModelResource = undefined;
      var m = undefined;
      return this.ensureViewModel(context).then(tryActivateViewModel).then(function() {
        childContainer = context.childContainer;
        viewModel = context.viewModel;
        viewModelResource = context.viewModelResource;
        m = viewModelResource.metadata;
        var viewStrategy = _this11.viewLocator.getViewStrategy(context.view || viewModel);
        if (context.viewResources) {
          viewStrategy.makeRelativeTo(context.viewResources.viewUrl);
        }
        return m.load(childContainer, viewModelResource.value, null, viewStrategy, true);
      }).then(function(viewFactory) {
        return m.create(childContainer, BehaviorInstruction.dynamic(context.host, viewModel, viewFactory));
      });
    };
    CompositionEngine.prototype.ensureViewModel = function ensureViewModel(context) {
      var childContainer = context.childContainer = context.childContainer || context.container.createChild();
      if (typeof context.viewModel === 'string') {
        context.viewModel = context.viewResources ? context.viewResources.relativeToView(context.viewModel) : context.viewModel;
        return this.viewEngine.importViewModelResource(context.viewModel).then(function(viewModelResource) {
          childContainer.autoRegister(viewModelResource.value);
          if (context.host) {
            childContainer.registerInstance(_aureliaPal.DOM.Element, context.host);
          }
          context.viewModel = childContainer.viewModel = childContainer.get(viewModelResource.value);
          context.viewModelResource = viewModelResource;
          return context;
        });
      }
      var m = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, context.viewModel.constructor);
      m.elementName = m.elementName || 'dynamic-element';
      m.initialize(context.container || childContainer, context.viewModel.constructor);
      context.viewModelResource = {
        metadata: m,
        value: context.viewModel.constructor
      };
      childContainer.viewModel = context.viewModel;
      return Promise.resolve(context);
    };
    CompositionEngine.prototype.compose = function compose(context) {
      context.childContainer = context.childContainer || context.container.createChild();
      context.view = this.viewLocator.getViewStrategy(context.view);
      var transaction = context.childContainer.get(CompositionTransaction);
      var compositionTransactionOwnershipToken = transaction.tryCapture();
      if (compositionTransactionOwnershipToken) {
        context.compositionTransactionOwnershipToken = compositionTransactionOwnershipToken;
      } else {
        context.compositionTransactionNotifier = transaction.enlist();
      }
      if (context.viewModel) {
        return this._createControllerAndSwap(context);
      } else if (context.view) {
        if (context.viewResources) {
          context.view.makeRelativeTo(context.viewResources.viewUrl);
        }
        return context.view.loadViewFactory(this.viewEngine, new ViewCompileInstruction()).then(function(viewFactory) {
          var result = viewFactory.create(context.childContainer);
          result.bind(context.bindingContext, context.overrideContext);
          var work = function work() {
            return Promise.resolve(context.viewSlot.removeAll(true)).then(function() {
              context.viewSlot.add(result);
              if (context.compositionTransactionNotifier) {
                context.compositionTransactionNotifier.done();
              }
              return result;
            });
          };
          if (context.compositionTransactionOwnershipToken) {
            return context.compositionTransactionOwnershipToken.waitForCompositionComplete().then(work);
          }
          return work();
        });
      } else if (context.viewSlot) {
        context.viewSlot.removeAll();
        if (context.compositionTransactionNotifier) {
          context.compositionTransactionNotifier.done();
        }
        return Promise.resolve(null);
      }
    };
    var _CompositionEngine = CompositionEngine;
    CompositionEngine = _aureliaDependencyInjection.inject(ViewEngine, ViewLocator)(CompositionEngine) || CompositionEngine;
    return CompositionEngine;
  })();
  exports.CompositionEngine = CompositionEngine;
  var ElementConfigResource = (function() {
    function ElementConfigResource() {
      _classCallCheck(this, ElementConfigResource);
    }
    ElementConfigResource.prototype.initialize = function initialize(container, target) {};
    ElementConfigResource.prototype.register = function register(registry, name) {};
    ElementConfigResource.prototype.load = function load(container, target) {
      var config = new target();
      var eventManager = container.get(_aureliaBinding.EventManager);
      eventManager.registerElementConfig(config);
    };
    return ElementConfigResource;
  })();
  exports.ElementConfigResource = ElementConfigResource;
  function validateBehaviorName(name, type) {
    if (/[A-Z]/.test(name)) {
      var newName = _hyphenate(name);
      _aureliaLogging.getLogger('templating').warn('\'' + name + '\' is not a valid ' + type + ' name and has been converted to \'' + newName + '\'. Upper-case letters are not allowed because the DOM is not case-sensitive.');
      return newName;
    }
    return name;
  }
  function resource(instance) {
    return function(target) {
      _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, instance, target);
    };
  }
  function behavior(override) {
    return function(target) {
      if (override instanceof HtmlBehaviorResource) {
        _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, override, target);
      } else {
        var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, target);
        Object.assign(r, override);
      }
    };
  }
  function customElement(name) {
    return function(target) {
      var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, target);
      r.elementName = validateBehaviorName(name, 'custom element');
    };
  }
  function customAttribute(name, defaultBindingMode) {
    return function(target) {
      var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, target);
      r.attributeName = validateBehaviorName(name, 'custom attribute');
      r.attributeDefaultBindingMode = defaultBindingMode;
    };
  }
  function templateController(target) {
    var deco = function deco(t) {
      var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
      r.liftsContent = true;
    };
    return target ? deco(target) : deco;
  }
  function bindable(nameOrConfigOrTarget, key, descriptor) {
    var deco = function deco(target, key2, descriptor2) {
      var actualTarget = key2 ? target.constructor : target;
      var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, actualTarget);
      var prop = undefined;
      if (key2) {
        nameOrConfigOrTarget = nameOrConfigOrTarget || {};
        nameOrConfigOrTarget.name = key2;
      }
      prop = new BindableProperty(nameOrConfigOrTarget);
      return prop.registerWith(actualTarget, r, descriptor2);
    };
    if (!nameOrConfigOrTarget) {
      return deco;
    }
    if (key) {
      var target = nameOrConfigOrTarget;
      nameOrConfigOrTarget = null;
      return deco(target, key, descriptor);
    }
    return deco;
  }
  function dynamicOptions(target) {
    var deco = function deco(t) {
      var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
      r.hasDynamicOptions = true;
    };
    return target ? deco(target) : deco;
  }
  function useShadowDOM(target) {
    var deco = function deco(t) {
      var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
      r.targetShadowDOM = true;
    };
    return target ? deco(target) : deco;
  }
  function processAttributes(processor) {
    return function(t) {
      var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
      r.processAttributes = processor;
    };
  }
  function doNotProcessContent() {
    return false;
  }
  function processContent(processor) {
    return function(t) {
      var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
      r.processContent = processor || doNotProcessContent;
    };
  }
  function containerless(target) {
    var deco = function deco(t) {
      var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
      r.containerless = true;
    };
    return target ? deco(target) : deco;
  }
  function useViewStrategy(strategy) {
    return function(target) {
      _aureliaMetadata.metadata.define(ViewLocator.viewStrategyMetadataKey, strategy, target);
    };
  }
  function useView(path) {
    return useViewStrategy(new RelativeViewStrategy(path));
  }
  function inlineView(markup, dependencies, dependencyBaseUrl) {
    return useViewStrategy(new InlineViewStrategy(markup, dependencies, dependencyBaseUrl));
  }
  function noView(target) {
    var deco = function deco(t) {
      _aureliaMetadata.metadata.define(ViewLocator.viewStrategyMetadataKey, new NoViewStrategy(), t);
    };
    return target ? deco(target) : deco;
  }
  function elementConfig(target) {
    var deco = function deco(t) {
      _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, new ElementConfigResource(), t);
    };
    return target ? deco(target) : deco;
  }
  var TemplatingEngine = (function() {
    function TemplatingEngine(container, moduleAnalyzer, viewCompiler, compositionEngine) {
      _classCallCheck(this, _TemplatingEngine);
      this._container = container;
      this._moduleAnalyzer = moduleAnalyzer;
      this._viewCompiler = viewCompiler;
      this._compositionEngine = compositionEngine;
      container.registerInstance(Animator, Animator.instance = new Animator());
    }
    TemplatingEngine.prototype.configureAnimator = function configureAnimator(animator) {
      this._container.unregister(Animator);
      this._container.registerInstance(Animator, Animator.instance = animator);
    };
    TemplatingEngine.prototype.compose = function compose(context) {
      return this._compositionEngine.compose(context);
    };
    TemplatingEngine.prototype.enhance = function enhance(instruction) {
      if (instruction instanceof _aureliaPal.DOM.Element) {
        instruction = {element: instruction};
      }
      var compilerInstructions = {};
      var resources = instruction.resources || this._container.get(ViewResources);
      this._viewCompiler._compileNode(instruction.element, resources, compilerInstructions, instruction.element.parentNode, 'root', true);
      var factory = new ViewFactory(instruction.element, compilerInstructions, resources);
      var container = instruction.container || this._container.createChild();
      var view = factory.create(container, BehaviorInstruction.enhance());
      view.bind(instruction.bindingContext || {});
      return view;
    };
    TemplatingEngine.prototype.createControllerForUnitTest = function createControllerForUnitTest(viewModelType, attributesFromHTML) {
      var _moduleAnalyzer$analyze;
      var exportName = viewModelType.name;
      var resourceModule = this._moduleAnalyzer.analyze('test-module', (_moduleAnalyzer$analyze = {}, _moduleAnalyzer$analyze[exportName] = viewModelType, _moduleAnalyzer$analyze), exportName);
      var description = resourceModule.mainResource;
      description.initialize(this._container);
      var viewModel = this._container.get(viewModelType);
      var instruction = BehaviorInstruction.unitTest(description, attributesFromHTML);
      return new Controller(description.metadata, instruction, viewModel);
    };
    TemplatingEngine.prototype.createViewModelForUnitTest = function createViewModelForUnitTest(viewModelType, attributesFromHTML, bindingContext) {
      var controller = this.createControllerForUnitTest(viewModelType, attributesFromHTML);
      controller.bind(_aureliaBinding.createScopeForTest(bindingContext));
      return controller.viewModel;
    };
    var _TemplatingEngine = TemplatingEngine;
    TemplatingEngine = _aureliaDependencyInjection.inject(_aureliaDependencyInjection.Container, ModuleAnalyzer, ViewCompiler, CompositionEngine)(TemplatingEngine) || TemplatingEngine;
    return TemplatingEngine;
  })();
  exports.TemplatingEngine = TemplatingEngine;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-templating@1.0.0-beta.1.1.4", ["npm:aurelia-templating@1.0.0-beta.1.1.4/aurelia-templating"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-framework@1.0.0-beta.1.1.4/aurelia-framework", ["exports", "npm:aurelia-logging@1.0.0-beta.1.1.2", "npm:aurelia-templating@1.0.0-beta.1.1.4", "npm:aurelia-path@1.0.0-beta.1.1.1", "npm:aurelia-dependency-injection@1.0.0-beta.1.1.5", "npm:aurelia-loader@1.0.0-beta.1.1.1", "npm:aurelia-pal@1.0.0-beta.1.1.1", "npm:aurelia-binding@1.0.0-beta.1.2.2", "npm:aurelia-metadata@1.0.0-beta.1.1.6", "npm:aurelia-task-queue@1.0.0-beta.1.1.1"], function(exports, _aureliaLogging, _aureliaTemplating, _aureliaPath, _aureliaDependencyInjection, _aureliaLoader, _aureliaPal, _aureliaBinding, _aureliaMetadata, _aureliaTaskQueue) {
  'use strict';
  exports.__esModule = true;
  function _interopExportWildcard(obj, defaults) {
    var newObj = defaults({}, obj);
    delete newObj['default'];
    return newObj;
  }
  function _defaults(obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = Object.getOwnPropertyDescriptor(defaults, key);
      if (value && value.configurable && obj[key] === undefined) {
        Object.defineProperty(obj, key, value);
      }
    }
    return obj;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var logger = _aureliaLogging.getLogger('aurelia');
  function runTasks(config, tasks) {
    var current = undefined;
    var next = function next() {
      if (current = tasks.shift()) {
        return Promise.resolve(current(config)).then(next);
      }
      return Promise.resolve();
    };
    return next();
  }
  function loadPlugin(config, loader, info) {
    logger.debug('Loading plugin ' + info.moduleId + '.');
    config.resourcesRelativeTo = info.resourcesRelativeTo;
    return loader.loadModule(info.moduleId).then(function(m) {
      if ('configure' in m) {
        return Promise.resolve(m.configure(config, info.config || {})).then(function() {
          config.resourcesRelativeTo = null;
          logger.debug('Configured plugin ' + info.moduleId + '.');
        });
      }
      config.resourcesRelativeTo = null;
      logger.debug('Loaded plugin ' + info.moduleId + '.');
    });
  }
  function loadResources(container, resourcesToLoad, appResources) {
    var viewEngine = container.get(_aureliaTemplating.ViewEngine);
    var importIds = Object.keys(resourcesToLoad);
    var names = new Array(importIds.length);
    for (var i = 0,
        ii = importIds.length; i < ii; ++i) {
      names[i] = resourcesToLoad[importIds[i]];
    }
    return viewEngine.importViewResources(importIds, names, appResources);
  }
  function assertProcessed(plugins) {
    if (plugins.processed) {
      throw new Error('This config instance has already been applied. To load more plugins or global resources, create a new FrameworkConfiguration instance.');
    }
  }
  var FrameworkConfiguration = (function() {
    function FrameworkConfiguration(aurelia) {
      var _this = this;
      _classCallCheck(this, FrameworkConfiguration);
      this.aurelia = aurelia;
      this.container = aurelia.container;
      this.info = [];
      this.processed = false;
      this.preTasks = [];
      this.postTasks = [];
      this.resourcesToLoad = {};
      this.preTask(function() {
        return aurelia.loader.normalize('aurelia-bootstrapper').then(function(name) {
          return _this.bootstrapperName = name;
        });
      });
      this.postTask(function() {
        return loadResources(aurelia.container, _this.resourcesToLoad, aurelia.resources);
      });
    }
    FrameworkConfiguration.prototype.instance = function instance(type, _instance) {
      this.container.registerInstance(type, _instance);
      return this;
    };
    FrameworkConfiguration.prototype.singleton = function singleton(type, implementation) {
      this.container.registerSingleton(type, implementation);
      return this;
    };
    FrameworkConfiguration.prototype.transient = function transient(type, implementation) {
      this.container.registerTransient(type, implementation);
      return this;
    };
    FrameworkConfiguration.prototype.preTask = function preTask(task) {
      assertProcessed(this);
      this.preTasks.push(task);
      return this;
    };
    FrameworkConfiguration.prototype.postTask = function postTask(task) {
      assertProcessed(this);
      this.postTasks.push(task);
      return this;
    };
    FrameworkConfiguration.prototype.feature = function feature(plugin, config) {
      plugin = plugin.endsWith('.js') || plugin.endsWith('.ts') ? plugin.substring(0, plugin.length - 3) : plugin;
      return this.plugin({
        moduleId: plugin + '/index',
        resourcesRelativeTo: plugin,
        config: config || {}
      });
    };
    FrameworkConfiguration.prototype.globalResources = function globalResources(resources) {
      assertProcessed(this);
      var toAdd = Array.isArray(resources) ? resources : arguments;
      var resource = undefined;
      var path = undefined;
      var resourcesRelativeTo = this.resourcesRelativeTo || '';
      for (var i = 0,
          ii = toAdd.length; i < ii; ++i) {
        resource = toAdd[i];
        if (typeof resource !== 'string') {
          throw new Error('Invalid resource path [' + resource + ']. Resources must be specified as relative module IDs.');
        }
        path = _aureliaPath.join(resourcesRelativeTo, resource);
        this.resourcesToLoad[path] = this.resourcesToLoad[path];
      }
      return this;
    };
    FrameworkConfiguration.prototype.globalName = function globalName(resourcePath, newName) {
      assertProcessed(this);
      this.resourcesToLoad[resourcePath] = newName;
      return this;
    };
    FrameworkConfiguration.prototype.plugin = function plugin(_plugin, config) {
      assertProcessed(this);
      if (typeof _plugin === 'string') {
        _plugin = _plugin.endsWith('.js') || _plugin.endsWith('.ts') ? _plugin.substring(0, _plugin.length - 3) : _plugin;
        return this.plugin({
          moduleId: _plugin,
          resourcesRelativeTo: _plugin,
          config: config || {}
        });
      }
      this.info.push(_plugin);
      return this;
    };
    FrameworkConfiguration.prototype._addNormalizedPlugin = function _addNormalizedPlugin(name, config) {
      var _this2 = this;
      var plugin = {
        moduleId: name,
        resourcesRelativeTo: name,
        config: config || {}
      };
      this.plugin(plugin);
      this.preTask(function() {
        return _this2.aurelia.loader.normalize(name, _this2.bootstrapperName).then(function(normalizedName) {
          normalizedName = normalizedName.endsWith('.js') || normalizedName.endsWith('.ts') ? normalizedName.substring(0, normalizedName.length - 3) : normalizedName;
          plugin.moduleId = normalizedName;
          plugin.resourcesRelativeTo = normalizedName;
          _this2.aurelia.loader.map(name, normalizedName);
        });
      });
      return this;
    };
    FrameworkConfiguration.prototype.defaultBindingLanguage = function defaultBindingLanguage() {
      return this._addNormalizedPlugin('aurelia-templating-binding');
    };
    FrameworkConfiguration.prototype.router = function router() {
      return this._addNormalizedPlugin('aurelia-templating-router');
    };
    FrameworkConfiguration.prototype.history = function history() {
      return this._addNormalizedPlugin('aurelia-history-browser');
    };
    FrameworkConfiguration.prototype.defaultResources = function defaultResources() {
      return this._addNormalizedPlugin('aurelia-templating-resources');
    };
    FrameworkConfiguration.prototype.eventAggregator = function eventAggregator() {
      return this._addNormalizedPlugin('aurelia-event-aggregator');
    };
    FrameworkConfiguration.prototype.standardConfiguration = function standardConfiguration() {
      return this.defaultBindingLanguage().defaultResources().history().router().eventAggregator();
    };
    FrameworkConfiguration.prototype.developmentLogging = function developmentLogging() {
      var _this3 = this;
      this.preTask(function() {
        return _this3.aurelia.loader.normalize('aurelia-logging-console', _this3.bootstrapperName).then(function(name) {
          return _this3.aurelia.loader.loadModule(name).then(function(m) {
            _aureliaLogging.addAppender(new m.ConsoleAppender());
            _aureliaLogging.setLevel(_aureliaLogging.logLevel.debug);
          });
        });
      });
      return this;
    };
    FrameworkConfiguration.prototype.apply = function apply() {
      var _this4 = this;
      if (this.processed) {
        return Promise.resolve();
      }
      return runTasks(this, this.preTasks).then(function() {
        var loader = _this4.aurelia.loader;
        var info = _this4.info;
        var current = undefined;
        var next = function next() {
          if (current = info.shift()) {
            return loadPlugin(_this4, loader, current).then(next);
          }
          _this4.processed = true;
          return Promise.resolve();
        };
        return next().then(function() {
          return runTasks(_this4, _this4.postTasks);
        });
      });
    };
    return FrameworkConfiguration;
  })();
  exports.FrameworkConfiguration = FrameworkConfiguration;
  function preventActionlessFormSubmit() {
    _aureliaPal.DOM.addEventListener('submit', function(evt) {
      var target = evt.target;
      var action = target.action;
      if (target.tagName.toLowerCase() === 'form' && !action) {
        evt.preventDefault();
      }
    });
  }
  var Aurelia = (function() {
    function Aurelia(loader, container, resources) {
      _classCallCheck(this, Aurelia);
      this.loader = loader || new _aureliaPal.PLATFORM.Loader();
      this.container = container || new _aureliaDependencyInjection.Container().makeGlobal();
      this.resources = resources || new _aureliaTemplating.ViewResources();
      this.use = new FrameworkConfiguration(this);
      this.logger = _aureliaLogging.getLogger('aurelia');
      this.hostConfigured = false;
      this.host = null;
      this.use.instance(Aurelia, this);
      this.use.instance(_aureliaLoader.Loader, this.loader);
      this.use.instance(_aureliaTemplating.ViewResources, this.resources);
    }
    Aurelia.prototype.start = function start() {
      var _this5 = this;
      if (this.started) {
        return Promise.resolve(this);
      }
      this.started = true;
      this.logger.info('Aurelia Starting');
      return this.use.apply().then(function() {
        preventActionlessFormSubmit();
        if (!_this5.container.hasResolver(_aureliaTemplating.BindingLanguage)) {
          var message = 'You must configure Aurelia with a BindingLanguage implementation.';
          _this5.logger.error(message);
          throw new Error(message);
        }
        _this5.logger.info('Aurelia Started');
        var evt = _aureliaPal.DOM.createCustomEvent('aurelia-started', {
          bubbles: true,
          cancelable: true
        });
        _aureliaPal.DOM.dispatchEvent(evt);
        return _this5;
      });
    };
    Aurelia.prototype.enhance = function enhance() {
      var _this6 = this;
      var bindingContext = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var applicationHost = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
      this._configureHost(applicationHost);
      return new Promise(function(resolve) {
        var engine = _this6.container.get(_aureliaTemplating.TemplatingEngine);
        _this6.root = engine.enhance({
          container: _this6.container,
          element: _this6.host,
          resources: _this6.resources,
          bindingContext: bindingContext
        });
        _this6.root.attached();
        _this6._onAureliaComposed();
        return _this6;
      });
    };
    Aurelia.prototype.setRoot = function setRoot() {
      var _this7 = this;
      var root = arguments.length <= 0 || arguments[0] === undefined ? 'app' : arguments[0];
      var applicationHost = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
      var instruction = {};
      if (this.root && this.root.viewModel && this.root.viewModel.router) {
        this.root.viewModel.router.deactivate();
        this.root.viewModel.router.reset();
      }
      this._configureHost(applicationHost);
      var engine = this.container.get(_aureliaTemplating.TemplatingEngine);
      var transaction = this.container.get(_aureliaTemplating.CompositionTransaction);
      delete transaction.initialComposition;
      instruction.viewModel = root;
      instruction.container = instruction.childContainer = this.container;
      instruction.viewSlot = this.hostSlot;
      instruction.host = this.host;
      return engine.compose(instruction).then(function(r) {
        _this7.root = r;
        instruction.viewSlot.attached();
        _this7._onAureliaComposed();
        return _this7;
      });
    };
    Aurelia.prototype._configureHost = function _configureHost(applicationHost) {
      if (this.hostConfigured) {
        return;
      }
      applicationHost = applicationHost || this.host;
      if (!applicationHost || typeof applicationHost === 'string') {
        this.host = _aureliaPal.DOM.getElementById(applicationHost || 'applicationHost');
      } else {
        this.host = applicationHost;
      }
      if (!this.host) {
        throw new Error('No applicationHost was specified.');
      }
      this.hostConfigured = true;
      this.host.aurelia = this;
      this.hostSlot = new _aureliaTemplating.ViewSlot(this.host, true);
      this.hostSlot.transformChildNodesIntoView();
      this.container.registerInstance(_aureliaPal.DOM.boundary, this.host);
    };
    Aurelia.prototype._onAureliaComposed = function _onAureliaComposed() {
      var evt = _aureliaPal.DOM.createCustomEvent('aurelia-composed', {
        bubbles: true,
        cancelable: true
      });
      setTimeout(function() {
        return _aureliaPal.DOM.dispatchEvent(evt);
      }, 1);
    };
    return Aurelia;
  })();
  exports.Aurelia = Aurelia;
  _defaults(exports, _interopExportWildcard(_aureliaDependencyInjection, _defaults));
  _defaults(exports, _interopExportWildcard(_aureliaBinding, _defaults));
  _defaults(exports, _interopExportWildcard(_aureliaMetadata, _defaults));
  _defaults(exports, _interopExportWildcard(_aureliaTemplating, _defaults));
  _defaults(exports, _interopExportWildcard(_aureliaLoader, _defaults));
  _defaults(exports, _interopExportWildcard(_aureliaTaskQueue, _defaults));
  _defaults(exports, _interopExportWildcard(_aureliaPath, _defaults));
  _defaults(exports, _interopExportWildcard(_aureliaPal, _defaults));
  var LogManager = _aureliaLogging;
  exports.LogManager = LogManager;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-framework@1.0.0-beta.1.1.4", ["npm:aurelia-framework@1.0.0-beta.1.1.4/aurelia-framework"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-fetch-client@1.0.0-beta.1.1.1/aurelia-fetch-client", ["exports"], function(exports) {
  'use strict';
  exports.__esModule = true;
  exports.json = json;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function json(body) {
    return new Blob([JSON.stringify(body)], {type: 'application/json'});
  }
  var HttpClientConfiguration = (function() {
    function HttpClientConfiguration() {
      _classCallCheck(this, HttpClientConfiguration);
      this.baseUrl = '';
      this.defaults = {};
      this.interceptors = [];
    }
    HttpClientConfiguration.prototype.withBaseUrl = function withBaseUrl(baseUrl) {
      this.baseUrl = baseUrl;
      return this;
    };
    HttpClientConfiguration.prototype.withDefaults = function withDefaults(defaults) {
      this.defaults = defaults;
      return this;
    };
    HttpClientConfiguration.prototype.withInterceptor = function withInterceptor(interceptor) {
      this.interceptors.push(interceptor);
      return this;
    };
    HttpClientConfiguration.prototype.useStandardConfiguration = function useStandardConfiguration() {
      var standardConfig = {credentials: 'same-origin'};
      Object.assign(this.defaults, standardConfig, this.defaults);
      return this.rejectErrorResponses();
    };
    HttpClientConfiguration.prototype.rejectErrorResponses = function rejectErrorResponses() {
      return this.withInterceptor({response: rejectOnError});
    };
    return HttpClientConfiguration;
  })();
  exports.HttpClientConfiguration = HttpClientConfiguration;
  function rejectOnError(response) {
    if (!response.ok) {
      throw response;
    }
    return response;
  }
  var HttpClient = (function() {
    function HttpClient() {
      _classCallCheck(this, HttpClient);
      this.activeRequestCount = 0;
      this.isRequesting = false;
      this.isConfigured = false;
      this.baseUrl = '';
      this.defaults = null;
      this.interceptors = [];
      if (typeof fetch === 'undefined') {
        throw new Error('HttpClient requires a Fetch API implementation, but the current environment doesn\'t support it. You may need to load a polyfill such as https://github.com/github/fetch.');
      }
    }
    HttpClient.prototype.configure = function configure(config) {
      var _interceptors;
      var normalizedConfig = undefined;
      if (typeof config === 'object') {
        normalizedConfig = {defaults: config};
      } else if (typeof config === 'function') {
        normalizedConfig = new HttpClientConfiguration();
        var c = config(normalizedConfig);
        if (HttpClientConfiguration.prototype.isPrototypeOf(c)) {
          normalizedConfig = c;
        }
      } else {
        throw new Error('invalid config');
      }
      var defaults = normalizedConfig.defaults;
      if (defaults && Headers.prototype.isPrototypeOf(defaults.headers)) {
        throw new Error('Default headers must be a plain object.');
      }
      this.baseUrl = normalizedConfig.baseUrl;
      this.defaults = defaults;
      (_interceptors = this.interceptors).push.apply(_interceptors, normalizedConfig.interceptors || []);
      this.isConfigured = true;
      return this;
    };
    HttpClient.prototype.fetch = (function(_fetch) {
      function fetch(_x, _x2) {
        return _fetch.apply(this, arguments);
      }
      fetch.toString = function() {
        return _fetch.toString();
      };
      return fetch;
    })(function(input, init) {
      var _this = this;
      trackRequestStart.call(this);
      var request = Promise.resolve().then(function() {
        return buildRequest.call(_this, input, init, _this.defaults);
      });
      var promise = processRequest(request, this.interceptors).then(function(result) {
        var response = null;
        if (Response.prototype.isPrototypeOf(result)) {
          response = result;
        } else if (Request.prototype.isPrototypeOf(result)) {
          request = Promise.resolve(result);
          response = fetch(result);
        } else {
          throw new Error('An invalid result was returned by the interceptor chain. Expected a Request or Response instance, but got [' + result + ']');
        }
        return request.then(function(_request) {
          return processResponse(response, _this.interceptors, _request);
        });
      });
      return trackRequestEndWith.call(this, promise);
    });
    return HttpClient;
  })();
  exports.HttpClient = HttpClient;
  var absoluteUrlRegexp = /^([a-z][a-z0-9+\-.]*:)?\/\//i;
  function trackRequestStart() {
    this.isRequesting = !!++this.activeRequestCount;
  }
  function trackRequestEnd() {
    this.isRequesting = !!--this.activeRequestCount;
  }
  function trackRequestEndWith(promise) {
    var handle = trackRequestEnd.bind(this);
    promise.then(handle, handle);
    return promise;
  }
  function parseHeaderValues(headers) {
    var parsedHeaders = {};
    for (var _name in headers || {}) {
      if (headers.hasOwnProperty(_name)) {
        parsedHeaders[_name] = typeof headers[_name] === 'function' ? headers[_name]() : headers[_name];
      }
    }
    return parsedHeaders;
  }
  function buildRequest(input, init) {
    init || (init = {});
    var defaults = this.defaults || {};
    var source = undefined;
    var url = undefined;
    var body = undefined;
    if (Request.prototype.isPrototypeOf(input)) {
      if (!this.isConfigured) {
        return input;
      }
      source = input;
      url = input.url;
      if (input.method !== 'GET' && input.method !== 'HEAD') {
        body = input.blob();
      }
    } else {
      source = init;
      url = input;
      body = init.body;
    }
    var bodyObj = body ? {body: body} : null;
    var parsedDefaultHeaders = parseHeaderValues(defaults.headers);
    var requestInit = Object.assign({}, defaults, {headers: {}}, source, bodyObj);
    var requestContentType = new Headers(requestInit.headers).get('Content-Type');
    var request = new Request(getRequestUrl(this.baseUrl, url), requestInit);
    if (!requestContentType && new Headers(parsedDefaultHeaders).has('content-type')) {
      request.headers.set('Content-Type', new Headers(parsedDefaultHeaders).get('content-type'));
    }
    setDefaultHeaders(request.headers, parsedDefaultHeaders);
    if (body && Blob.prototype.isPrototypeOf(body) && body.type) {
      request.headers.set('Content-Type', body.type);
    }
    return request;
  }
  function getRequestUrl(baseUrl, url) {
    if (absoluteUrlRegexp.test(url)) {
      return url;
    }
    return (baseUrl || '') + url;
  }
  function setDefaultHeaders(headers, defaultHeaders) {
    for (var _name2 in defaultHeaders || {}) {
      if (defaultHeaders.hasOwnProperty(_name2) && !headers.has(_name2)) {
        headers.set(_name2, defaultHeaders[_name2]);
      }
    }
  }
  function processRequest(request, interceptors) {
    return applyInterceptors(request, interceptors, 'request', 'requestError');
  }
  function processResponse(response, interceptors, request) {
    return applyInterceptors(response, interceptors, 'response', 'responseError', request);
  }
  function applyInterceptors(input, interceptors, successName, errorName) {
    for (var _len = arguments.length,
        interceptorArgs = Array(_len > 4 ? _len - 4 : 0),
        _key = 4; _key < _len; _key++) {
      interceptorArgs[_key - 4] = arguments[_key];
    }
    return (interceptors || []).reduce(function(chain, interceptor) {
      var successHandler = interceptor[successName];
      var errorHandler = interceptor[errorName];
      return chain.then(successHandler && function(value) {
        return successHandler.call.apply(successHandler, [interceptor, value].concat(interceptorArgs));
      }, errorHandler && function(reason) {
        return errorHandler.call.apply(errorHandler, [interceptor, reason].concat(interceptorArgs));
      });
    }, Promise.resolve(input));
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-fetch-client@1.0.0-beta.1.1.1", ["npm:aurelia-fetch-client@1.0.0-beta.1.1.1/aurelia-fetch-client"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-logging@1.0.0-beta.1.1.2/aurelia-logging", ["exports"], function(exports) {
  'use strict';
  exports.__esModule = true;
  exports.getLogger = getLogger;
  exports.addAppender = addAppender;
  exports.setLevel = setLevel;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var logLevel = {
    none: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4
  };
  exports.logLevel = logLevel;
  var loggers = {};
  var currentLevel = logLevel.none;
  var appenders = [];
  var slice = Array.prototype.slice;
  var loggerConstructionKey = {};
  function log(logger, level, args) {
    var i = appenders.length;
    var current = undefined;
    args = slice.call(args);
    args.unshift(logger);
    while (i--) {
      current = appenders[i];
      current[level].apply(current, args);
    }
  }
  function debug() {
    if (currentLevel < 4) {
      return;
    }
    log(this, 'debug', arguments);
  }
  function info() {
    if (currentLevel < 3) {
      return;
    }
    log(this, 'info', arguments);
  }
  function warn() {
    if (currentLevel < 2) {
      return;
    }
    log(this, 'warn', arguments);
  }
  function error() {
    if (currentLevel < 1) {
      return;
    }
    log(this, 'error', arguments);
  }
  function connectLogger(logger) {
    logger.debug = debug;
    logger.info = info;
    logger.warn = warn;
    logger.error = error;
  }
  function createLogger(id) {
    var logger = new Logger(id, loggerConstructionKey);
    if (appenders.length) {
      connectLogger(logger);
    }
    return logger;
  }
  function getLogger(id) {
    return loggers[id] || (loggers[id] = createLogger(id));
  }
  function addAppender(appender) {
    appenders.push(appender);
    if (appenders.length === 1) {
      for (var key in loggers) {
        connectLogger(loggers[key]);
      }
    }
  }
  function setLevel(level) {
    currentLevel = level;
  }
  var Logger = (function() {
    function Logger(id, key) {
      _classCallCheck(this, Logger);
      if (key !== loggerConstructionKey) {
        throw new Error('You cannot instantiate "Logger". Use the "getLogger" API instead.');
      }
      this.id = id;
    }
    Logger.prototype.debug = function debug(message) {};
    Logger.prototype.info = function info(message) {};
    Logger.prototype.warn = function warn(message) {};
    Logger.prototype.error = function error(message) {};
    return Logger;
  })();
  exports.Logger = Logger;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-logging@1.0.0-beta.1.1.2", ["npm:aurelia-logging@1.0.0-beta.1.1.2/aurelia-logging"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-event-aggregator@1.0.0-beta.1.1.1/aurelia-event-aggregator", ["exports", "npm:aurelia-logging@1.0.0-beta.1.1.2"], function(exports, _aureliaLogging) {
  'use strict';
  exports.__esModule = true;
  exports.includeEventsIn = includeEventsIn;
  exports.configure = configure;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var logger = _aureliaLogging.getLogger('event-aggregator');
  var Handler = (function() {
    function Handler(messageType, callback) {
      _classCallCheck(this, Handler);
      this.messageType = messageType;
      this.callback = callback;
    }
    Handler.prototype.handle = function handle(message) {
      if (message instanceof this.messageType) {
        this.callback.call(null, message);
      }
    };
    return Handler;
  })();
  var EventAggregator = (function() {
    function EventAggregator() {
      _classCallCheck(this, EventAggregator);
      this.eventLookup = {};
      this.messageHandlers = [];
    }
    EventAggregator.prototype.publish = function publish(event, data) {
      var subscribers = undefined;
      var i = undefined;
      if (!event) {
        throw new Error('Event was invalid.');
      }
      if (typeof event === 'string') {
        subscribers = this.eventLookup[event];
        if (subscribers) {
          subscribers = subscribers.slice();
          i = subscribers.length;
          try {
            while (i--) {
              subscribers[i](data, event);
            }
          } catch (e) {
            logger.error(e);
          }
        }
      } else {
        subscribers = this.messageHandlers.slice();
        i = subscribers.length;
        try {
          while (i--) {
            subscribers[i].handle(event);
          }
        } catch (e) {
          logger.error(e);
        }
      }
    };
    EventAggregator.prototype.subscribe = function subscribe(event, callback) {
      var handler = undefined;
      var subscribers = undefined;
      if (!event) {
        throw new Error('Event channel/type was invalid.');
      }
      if (typeof event === 'string') {
        handler = callback;
        subscribers = this.eventLookup[event] || (this.eventLookup[event] = []);
      } else {
        handler = new Handler(event, callback);
        subscribers = this.messageHandlers;
      }
      subscribers.push(handler);
      return {dispose: function dispose() {
          var idx = subscribers.indexOf(handler);
          if (idx !== -1) {
            subscribers.splice(idx, 1);
          }
        }};
    };
    EventAggregator.prototype.subscribeOnce = function subscribeOnce(event, callback) {
      var sub = this.subscribe(event, function(a, b) {
        sub.dispose();
        return callback(a, b);
      });
      return sub;
    };
    return EventAggregator;
  })();
  exports.EventAggregator = EventAggregator;
  function includeEventsIn(obj) {
    var ea = new EventAggregator();
    obj.subscribeOnce = function(event, callback) {
      return ea.subscribeOnce(event, callback);
    };
    obj.subscribe = function(event, callback) {
      return ea.subscribe(event, callback);
    };
    obj.publish = function(event, data) {
      ea.publish(event, data);
    };
    return ea;
  }
  function configure(config) {
    config.instance(EventAggregator, includeEventsIn(config.aurelia));
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-event-aggregator@1.0.0-beta.1.1.1", ["npm:aurelia-event-aggregator@1.0.0-beta.1.1.1/aurelia-event-aggregator"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-dependency-injection@1.0.0-beta.1.1.5/aurelia-dependency-injection", ["exports", "npm:aurelia-metadata@1.0.0-beta.1.1.6", "npm:aurelia-pal@1.0.0-beta.1.1.1"], function(exports, _aureliaMetadata, _aureliaPal) {
  'use strict';
  exports.__esModule = true;
  var _classInvokers;
  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  exports.invoker = invoker;
  exports.factory = factory;
  exports.registration = registration;
  exports.transient = transient;
  exports.singleton = singleton;
  exports.autoinject = autoinject;
  exports.inject = inject;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var resolver = _aureliaMetadata.protocol.create('aurelia:resolver', function(target) {
    if (!(typeof target.get === 'function')) {
      return 'Resolvers must implement: get(container: Container, key: any): any';
    }
    return true;
  });
  exports.resolver = resolver;
  var Lazy = (function() {
    function Lazy(key) {
      _classCallCheck(this, _Lazy);
      this._key = key;
    }
    Lazy.prototype.get = function get(container) {
      var _this = this;
      return function() {
        return container.get(_this._key);
      };
    };
    Lazy.of = function of(key) {
      return new Lazy(key);
    };
    var _Lazy = Lazy;
    Lazy = resolver()(Lazy) || Lazy;
    return Lazy;
  })();
  exports.Lazy = Lazy;
  var All = (function() {
    function All(key) {
      _classCallCheck(this, _All);
      this._key = key;
    }
    All.prototype.get = function get(container) {
      return container.getAll(this._key);
    };
    All.of = function of(key) {
      return new All(key);
    };
    var _All = All;
    All = resolver()(All) || All;
    return All;
  })();
  exports.All = All;
  var Optional = (function() {
    function Optional(key) {
      var checkParent = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
      _classCallCheck(this, _Optional);
      this._key = key;
      this._checkParent = checkParent;
    }
    Optional.prototype.get = function get(container) {
      if (container.hasResolver(this._key, this._checkParent)) {
        return container.get(this._key);
      }
      return null;
    };
    Optional.of = function of(key) {
      var checkParent = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
      return new Optional(key, checkParent);
    };
    var _Optional = Optional;
    Optional = resolver()(Optional) || Optional;
    return Optional;
  })();
  exports.Optional = Optional;
  var Parent = (function() {
    function Parent(key) {
      _classCallCheck(this, _Parent);
      this._key = key;
    }
    Parent.prototype.get = function get(container) {
      return container.parent ? container.parent.get(this._key) : null;
    };
    Parent.of = function of(key) {
      return new Parent(key);
    };
    var _Parent = Parent;
    Parent = resolver()(Parent) || Parent;
    return Parent;
  })();
  exports.Parent = Parent;
  var StrategyResolver = (function() {
    function StrategyResolver(strategy, state) {
      _classCallCheck(this, _StrategyResolver);
      this.strategy = strategy;
      this.state = state;
    }
    StrategyResolver.prototype.get = function get(container, key) {
      switch (this.strategy) {
        case 0:
          return this.state;
        case 1:
          var singleton = container.invoke(this.state);
          this.state = singleton;
          this.strategy = 0;
          return singleton;
        case 2:
          return container.invoke(this.state);
        case 3:
          return this.state(container, key, this);
        case 4:
          return this.state[0].get(container, key);
        case 5:
          return container.get(this.state);
        default:
          throw new Error('Invalid strategy: ' + this.strategy);
      }
    };
    var _StrategyResolver = StrategyResolver;
    StrategyResolver = resolver()(StrategyResolver) || StrategyResolver;
    return StrategyResolver;
  })();
  exports.StrategyResolver = StrategyResolver;
  var Factory = (function() {
    function Factory(key) {
      _classCallCheck(this, _Factory);
      this._key = key;
    }
    Factory.prototype.get = function get(container) {
      var _this2 = this;
      return function() {
        for (var _len = arguments.length,
            rest = Array(_len),
            _key = 0; _key < _len; _key++) {
          rest[_key] = arguments[_key];
        }
        return container.invoke(_this2._key, rest);
      };
    };
    Factory.of = function of(key) {
      return new Factory(key);
    };
    var _Factory = Factory;
    Factory = resolver()(Factory) || Factory;
    return Factory;
  })();
  exports.Factory = Factory;
  function invoker(value) {
    return function(target) {
      _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.invoker, value, target);
    };
  }
  function factory(potentialTarget) {
    var deco = function deco(target) {
      _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.invoker, FactoryInvoker.instance, target);
    };
    return potentialTarget ? deco(potentialTarget) : deco;
  }
  var FactoryInvoker = (function() {
    function FactoryInvoker() {
      _classCallCheck(this, FactoryInvoker);
    }
    FactoryInvoker.prototype.invoke = function invoke(container, fn, dependencies) {
      var i = dependencies.length;
      var args = new Array(i);
      while (i--) {
        args[i] = container.get(dependencies[i]);
      }
      return fn.apply(undefined, args);
    };
    FactoryInvoker.prototype.invokeWithDynamicDependencies = function invokeWithDynamicDependencies(container, fn, staticDependencies, dynamicDependencies) {
      var i = staticDependencies.length;
      var args = new Array(i);
      while (i--) {
        args[i] = container.get(staticDependencies[i]);
      }
      if (dynamicDependencies !== undefined) {
        args = args.concat(dynamicDependencies);
      }
      return fn.apply(undefined, args);
    };
    _createClass(FactoryInvoker, null, [{
      key: 'instance',
      value: new FactoryInvoker(),
      enumerable: true
    }]);
    return FactoryInvoker;
  })();
  exports.FactoryInvoker = FactoryInvoker;
  function registration(value) {
    return function(target) {
      _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.registration, value, target);
    };
  }
  function transient(key) {
    return registration(new TransientRegistration(key));
  }
  function singleton(keyOrRegisterInChild) {
    var registerInChild = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
    return registration(new SingletonRegistration(keyOrRegisterInChild, registerInChild));
  }
  var TransientRegistration = (function() {
    function TransientRegistration(key) {
      _classCallCheck(this, TransientRegistration);
      this._key = key;
    }
    TransientRegistration.prototype.registerResolver = function registerResolver(container, key, fn) {
      var resolver = new StrategyResolver(2, fn);
      container.registerResolver(this._key || key, resolver);
      return resolver;
    };
    return TransientRegistration;
  })();
  exports.TransientRegistration = TransientRegistration;
  var SingletonRegistration = (function() {
    function SingletonRegistration(keyOrRegisterInChild) {
      var registerInChild = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
      _classCallCheck(this, SingletonRegistration);
      if (typeof keyOrRegisterInChild === 'boolean') {
        this._registerInChild = keyOrRegisterInChild;
      } else {
        this._key = keyOrRegisterInChild;
        this._registerInChild = registerInChild;
      }
    }
    SingletonRegistration.prototype.registerResolver = function registerResolver(container, key, fn) {
      var resolver = new StrategyResolver(1, fn);
      if (this._registerInChild) {
        container.registerResolver(this._key || key, resolver);
      } else {
        container.root.registerResolver(this._key || key, resolver);
      }
      return resolver;
    };
    return SingletonRegistration;
  })();
  exports.SingletonRegistration = SingletonRegistration;
  var badKeyError = 'key/value cannot be null or undefined. Are you trying to inject/register something that doesn\'t exist with DI?';
  var _emptyParameters = Object.freeze([]);
  exports._emptyParameters = _emptyParameters;
  _aureliaMetadata.metadata.registration = 'aurelia:registration';
  _aureliaMetadata.metadata.invoker = 'aurelia:invoker';
  var resolverDecorates = resolver.decorates;
  var InvocationHandler = (function() {
    function InvocationHandler(fn, invoker, dependencies) {
      _classCallCheck(this, InvocationHandler);
      this.fn = fn;
      this.invoker = invoker;
      this.dependencies = dependencies;
    }
    InvocationHandler.prototype.invoke = function invoke(container, dynamicDependencies) {
      return dynamicDependencies !== undefined ? this.invoker.invokeWithDynamicDependencies(container, this.fn, this.dependencies, dynamicDependencies) : this.invoker.invoke(container, this.fn, this.dependencies);
    };
    return InvocationHandler;
  })();
  exports.InvocationHandler = InvocationHandler;
  function invokeWithDynamicDependencies(container, fn, staticDependencies, dynamicDependencies) {
    var i = staticDependencies.length;
    var args = new Array(i);
    while (i--) {
      args[i] = container.get(staticDependencies[i]);
    }
    if (dynamicDependencies !== undefined) {
      args = args.concat(dynamicDependencies);
    }
    return Reflect.construct(fn, args);
  }
  var classInvokers = (_classInvokers = {}, _classInvokers[0] = {
    invoke: function invoke(container, Type) {
      return new Type();
    },
    invokeWithDynamicDependencies: invokeWithDynamicDependencies
  }, _classInvokers[1] = {
    invoke: function invoke(container, Type, deps) {
      return new Type(container.get(deps[0]));
    },
    invokeWithDynamicDependencies: invokeWithDynamicDependencies
  }, _classInvokers[2] = {
    invoke: function invoke(container, Type, deps) {
      return new Type(container.get(deps[0]), container.get(deps[1]));
    },
    invokeWithDynamicDependencies: invokeWithDynamicDependencies
  }, _classInvokers[3] = {
    invoke: function invoke(container, Type, deps) {
      return new Type(container.get(deps[0]), container.get(deps[1]), container.get(deps[2]));
    },
    invokeWithDynamicDependencies: invokeWithDynamicDependencies
  }, _classInvokers[4] = {
    invoke: function invoke(container, Type, deps) {
      return new Type(container.get(deps[0]), container.get(deps[1]), container.get(deps[2]), container.get(deps[3]));
    },
    invokeWithDynamicDependencies: invokeWithDynamicDependencies
  }, _classInvokers[5] = {
    invoke: function invoke(container, Type, deps) {
      return new Type(container.get(deps[0]), container.get(deps[1]), container.get(deps[2]), container.get(deps[3]), container.get(deps[4]));
    },
    invokeWithDynamicDependencies: invokeWithDynamicDependencies
  }, _classInvokers.fallback = {
    invoke: invokeWithDynamicDependencies,
    invokeWithDynamicDependencies: invokeWithDynamicDependencies
  }, _classInvokers);
  var Container = (function() {
    function Container(configuration) {
      _classCallCheck(this, Container);
      if (configuration === undefined) {
        configuration = {};
      }
      this._configuration = configuration;
      this._onHandlerCreated = configuration.onHandlerCreated;
      this._handlers = configuration.handlers || (configuration.handlers = new Map());
      this._resolvers = new Map();
      this.root = this;
      this.parent = null;
    }
    Container.prototype.makeGlobal = function makeGlobal() {
      Container.instance = this;
      return this;
    };
    Container.prototype.setHandlerCreatedCallback = function setHandlerCreatedCallback(onHandlerCreated) {
      this._onHandlerCreated = onHandlerCreated;
      this._configuration.onHandlerCreated = onHandlerCreated;
    };
    Container.prototype.registerInstance = function registerInstance(key, instance) {
      this.registerResolver(key, new StrategyResolver(0, instance === undefined ? key : instance));
    };
    Container.prototype.registerSingleton = function registerSingleton(key, fn) {
      this.registerResolver(key, new StrategyResolver(1, fn === undefined ? key : fn));
    };
    Container.prototype.registerTransient = function registerTransient(key, fn) {
      this.registerResolver(key, new StrategyResolver(2, fn === undefined ? key : fn));
    };
    Container.prototype.registerHandler = function registerHandler(key, handler) {
      this.registerResolver(key, new StrategyResolver(3, handler));
    };
    Container.prototype.registerAlias = function registerAlias(originalKey, aliasKey) {
      this.registerResolver(aliasKey, new StrategyResolver(5, originalKey));
    };
    Container.prototype.registerResolver = function registerResolver(key, resolver) {
      if (key === null || key === undefined) {
        throw new Error(badKeyError);
      }
      var allResolvers = this._resolvers;
      var result = allResolvers.get(key);
      if (result === undefined) {
        allResolvers.set(key, resolver);
      } else if (result.strategy === 4) {
        result.state.push(resolver);
      } else {
        allResolvers.set(key, new StrategyResolver(4, [result, resolver]));
      }
    };
    Container.prototype.autoRegister = function autoRegister(fn, key) {
      var resolver = undefined;
      if (typeof fn === 'function') {
        var _registration = _aureliaMetadata.metadata.get(_aureliaMetadata.metadata.registration, fn);
        if (_registration === undefined) {
          resolver = new StrategyResolver(1, fn);
          this.registerResolver(key === undefined ? fn : key, resolver);
        } else {
          resolver = _registration.registerResolver(this, key === undefined ? fn : key, fn);
        }
      } else {
        resolver = new StrategyResolver(0, fn);
        this.registerResolver(key === undefined ? fn : key, resolver);
      }
      return resolver;
    };
    Container.prototype.autoRegisterAll = function autoRegisterAll(fns) {
      var i = fns.length;
      while (i--) {
        this.autoRegister(fns[i]);
      }
    };
    Container.prototype.unregister = function unregister(key) {
      this._resolvers['delete'](key);
    };
    Container.prototype.hasResolver = function hasResolver(key) {
      var checkParent = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
      if (key === null || key === undefined) {
        throw new Error(badKeyError);
      }
      return this._resolvers.has(key) || checkParent && this.parent !== null && this.parent.hasResolver(key, checkParent);
    };
    Container.prototype.get = function get(key) {
      if (key === null || key === undefined) {
        throw new Error(badKeyError);
      }
      if (key === Container) {
        return this;
      }
      if (resolverDecorates(key)) {
        return key.get(this, key);
      }
      var resolver = this._resolvers.get(key);
      if (resolver === undefined) {
        if (this.parent === null) {
          return this.autoRegister(key).get(this, key);
        }
        return this.parent._get(key);
      }
      return resolver.get(this, key);
    };
    Container.prototype._get = function _get(key) {
      var resolver = this._resolvers.get(key);
      if (resolver === undefined) {
        if (this.parent === null) {
          return this.autoRegister(key).get(this, key);
        }
        return this.parent._get(key);
      }
      return resolver.get(this, key);
    };
    Container.prototype.getAll = function getAll(key) {
      if (key === null || key === undefined) {
        throw new Error(badKeyError);
      }
      var resolver = this._resolvers.get(key);
      if (resolver === undefined) {
        if (this.parent === null) {
          return _emptyParameters;
        }
        return this.parent.getAll(key);
      }
      if (resolver.strategy === 4) {
        var state = resolver.state;
        var i = state.length;
        var results = new Array(i);
        while (i--) {
          results[i] = state[i].get(this, key);
        }
        return results;
      }
      return [resolver.get(this, key)];
    };
    Container.prototype.createChild = function createChild() {
      var child = new Container(this._configuration);
      child.root = this.root;
      child.parent = this;
      return child;
    };
    Container.prototype.invoke = function invoke(fn, dynamicDependencies) {
      try {
        var _handler = this._handlers.get(fn);
        if (_handler === undefined) {
          _handler = this._createInvocationHandler(fn);
          this._handlers.set(fn, _handler);
        }
        return _handler.invoke(this, dynamicDependencies);
      } catch (e) {
        throw new _aureliaPal.AggregateError('Error invoking ' + fn.name + '. Check the inner error for details.', e, true);
      }
    };
    Container.prototype._createInvocationHandler = function _createInvocationHandler(fn) {
      var dependencies = undefined;
      if (typeof fn.inject === 'function') {
        dependencies = fn.inject();
      } else if (fn.inject === undefined) {
        dependencies = _aureliaMetadata.metadata.getOwn(_aureliaMetadata.metadata.paramTypes, fn) || _emptyParameters;
      } else {
        dependencies = fn.inject;
      }
      var invoker = _aureliaMetadata.metadata.getOwn(_aureliaMetadata.metadata.invoker, fn) || classInvokers[dependencies.length] || classInvokers.fallback;
      var handler = new InvocationHandler(fn, invoker, dependencies);
      return this._onHandlerCreated !== undefined ? this._onHandlerCreated(handler) : handler;
    };
    return Container;
  })();
  exports.Container = Container;
  function autoinject(potentialTarget) {
    var deco = function deco(target) {
      target.inject = _aureliaMetadata.metadata.getOwn(_aureliaMetadata.metadata.paramTypes, target) || _emptyParameters;
    };
    return potentialTarget ? deco(potentialTarget) : deco;
  }
  function inject() {
    for (var _len2 = arguments.length,
        rest = Array(_len2),
        _key2 = 0; _key2 < _len2; _key2++) {
      rest[_key2] = arguments[_key2];
    }
    return function(target, key, descriptor) {
      if (descriptor) {
        var _fn = descriptor.value;
        _fn.inject = rest;
      } else {
        target.inject = rest;
      }
    };
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-dependency-injection@1.0.0-beta.1.1.5", ["npm:aurelia-dependency-injection@1.0.0-beta.1.1.5/aurelia-dependency-injection"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-pal-browser@1.0.0-beta.1.1.4/aurelia-pal-browser", ["exports", "npm:aurelia-pal@1.0.0-beta.1.1.1"], function(exports, _aureliaPal) {
  'use strict';
  exports.__esModule = true;
  exports._ensureFunctionName = _ensureFunctionName;
  exports._ensureClassList = _ensureClassList;
  exports._ensurePerformance = _ensurePerformance;
  exports._ensureCustomEvent = _ensureCustomEvent;
  exports._ensureElementMatches = _ensureElementMatches;
  exports._ensureHTMLTemplateElement = _ensureHTMLTemplateElement;
  exports.initialize = initialize;
  function _ensureFunctionName() {
    function test() {}
    if (!test.name) {
      Object.defineProperty(Function.prototype, 'name', {get: function get() {
          var name = this.toString().match(/^\s*function\s*(\S*)\s*\(/)[1];
          Object.defineProperty(this, 'name', {value: name});
          return name;
        }});
    }
  }
  function _ensureClassList() {
    if (!('classList' in document.createElement('_')) || document.createElementNS && !('classList' in document.createElementNS('http://www.w3.org/2000/svg', 'g'))) {
      (function() {
        var protoProp = 'prototype';
        var strTrim = String.prototype.trim;
        var arrIndexOf = Array.prototype.indexOf;
        var emptyArray = [];
        var DOMEx = function DOMEx(type, message) {
          this.name = type;
          this.code = DOMException[type];
          this.message = message;
        };
        var checkTokenAndGetIndex = function checkTokenAndGetIndex(classList, token) {
          if (token === '') {
            throw new DOMEx('SYNTAX_ERR', 'An invalid or illegal string was specified');
          }
          if (/\s/.test(token)) {
            throw new DOMEx('INVALID_CHARACTER_ERR', 'String contains an invalid character');
          }
          return arrIndexOf.call(classList, token);
        };
        var ClassList = function ClassList(elem) {
          var trimmedClasses = strTrim.call(elem.getAttribute('class') || '');
          var classes = trimmedClasses ? trimmedClasses.split(/\s+/) : emptyArray;
          for (var i = 0,
              ii = classes.length; i < ii; ++i) {
            this.push(classes[i]);
          }
          this._updateClassName = function() {
            elem.setAttribute('class', this.toString());
          };
        };
        var classListProto = ClassList[protoProp] = [];
        DOMEx[protoProp] = Error[protoProp];
        classListProto.item = function(i) {
          return this[i] || null;
        };
        classListProto.contains = function(token) {
          token += '';
          return checkTokenAndGetIndex(this, token) !== -1;
        };
        classListProto.add = function() {
          var tokens = arguments;
          var i = 0;
          var ii = tokens.length;
          var token = undefined;
          var updated = false;
          do {
            token = tokens[i] + '';
            if (checkTokenAndGetIndex(this, token) === -1) {
              this.push(token);
              updated = true;
            }
          } while (++i < ii);
          if (updated) {
            this._updateClassName();
          }
        };
        classListProto.remove = function() {
          var tokens = arguments;
          var i = 0;
          var ii = tokens.length;
          var token = undefined;
          var updated = false;
          var index = undefined;
          do {
            token = tokens[i] + '';
            index = checkTokenAndGetIndex(this, token);
            while (index !== -1) {
              this.splice(index, 1);
              updated = true;
              index = checkTokenAndGetIndex(this, token);
            }
          } while (++i < ii);
          if (updated) {
            this._updateClassName();
          }
        };
        classListProto.toggle = function(token, force) {
          token += '';
          var result = this.contains(token);
          var method = result ? force !== true && 'remove' : force !== false && 'add';
          if (method) {
            this[method](token);
          }
          if (force === true || force === false) {
            return force;
          }
          return !result;
        };
        classListProto.toString = function() {
          return this.join(' ');
        };
        Object.defineProperty(Element.prototype, 'classList', {
          get: function get() {
            return new ClassList(this);
          },
          enumerable: true,
          configurable: true
        });
      })();
    } else {
      var testElement = document.createElement('_');
      testElement.classList.add('c1', 'c2');
      if (!testElement.classList.contains('c2')) {
        var createMethod = function createMethod(method) {
          var original = DOMTokenList.prototype[method];
          DOMTokenList.prototype[method] = function(token) {
            for (var i = 0,
                ii = arguments.length; i < ii; ++i) {
              token = arguments[i];
              original.call(this, token);
            }
          };
        };
        createMethod('add');
        createMethod('remove');
      }
      testElement.classList.toggle('c3', false);
      if (testElement.classList.contains('c3')) {
        (function() {
          var _toggle = DOMTokenList.prototype.toggle;
          DOMTokenList.prototype.toggle = function(token, force) {
            if (1 in arguments && !this.contains(token) === !force) {
              return force;
            }
            return _toggle.call(this, token);
          };
        })();
      }
      testElement = null;
    }
  }
  function _ensurePerformance() {
    if ('performance' in window === false) {
      window.performance = {};
    }
    Date.now = Date.now || function() {
      return new Date().getTime();
    };
    if ('now' in window.performance === false) {
      (function() {
        var nowOffset = Date.now();
        if (performance.timing && performance.timing.navigationStart) {
          nowOffset = performance.timing.navigationStart;
        }
        window.performance.now = function now() {
          return Date.now() - nowOffset;
        };
      })();
    }
  }
  function _ensureCustomEvent() {
    if (!window.CustomEvent || typeof window.CustomEvent !== 'function') {
      var _CustomEvent = function _CustomEvent(event, params) {
        params = params || {
          bubbles: false,
          cancelable: false,
          detail: undefined
        };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      };
      _CustomEvent.prototype = window.Event.prototype;
      window.CustomEvent = _CustomEvent;
    }
  }
  function _ensureElementMatches() {
    if (Element && !Element.prototype.matches) {
      var proto = Element.prototype;
      proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
    }
  }
  var _FEATURE = {};
  exports._FEATURE = _FEATURE;
  _FEATURE.shadowDOM = (function() {
    return !!HTMLElement.prototype.createShadowRoot;
  })();
  _FEATURE.scopedCSS = (function() {
    return 'scoped' in document.createElement('style');
  })();
  _FEATURE.htmlTemplateElement = (function() {
    return 'content' in document.createElement('template');
  })();
  _FEATURE.mutationObserver = (function() {
    return !!(window.MutationObserver || window.WebKitMutationObserver);
  })();
  function _ensureHTMLTemplateElement() {
    function isSVGTemplate(el) {
      return el.tagName === 'template' && el.namespaceURI === 'http://www.w3.org/2000/svg';
    }
    function fixSVGTemplateElement(el) {
      var template = el.ownerDocument.createElement('template');
      var attrs = el.attributes;
      var length = attrs.length;
      var attr = undefined;
      el.parentNode.insertBefore(template, el);
      while (length-- > 0) {
        attr = attrs[length];
        template.setAttribute(attr.name, attr.value);
        el.removeAttribute(attr.name);
      }
      el.parentNode.removeChild(el);
      return fixHTMLTemplateElement(template);
    }
    function fixHTMLTemplateElement(template) {
      var content = template.content = document.createDocumentFragment();
      var child = undefined;
      while (child = template.firstChild) {
        content.appendChild(child);
      }
      return template;
    }
    function fixHTMLTemplateElementRoot(template) {
      var content = fixHTMLTemplateElement(template).content;
      var childTemplates = content.querySelectorAll('template');
      for (var i = 0,
          ii = childTemplates.length; i < ii; ++i) {
        var child = childTemplates[i];
        if (isSVGTemplate(child)) {
          fixSVGTemplateElement(child);
        } else {
          fixHTMLTemplateElement(child);
        }
      }
      return template;
    }
    if (_FEATURE.htmlTemplateElement) {
      _FEATURE.ensureHTMLTemplateElement = function(template) {
        return template;
      };
    } else {
      _FEATURE.ensureHTMLTemplateElement = fixHTMLTemplateElementRoot;
    }
  }
  var shadowPoly = window.ShadowDOMPolyfill || null;
  var _DOM = {
    Element: Element,
    SVGElement: SVGElement,
    boundary: 'aurelia-dom-boundary',
    addEventListener: function addEventListener(eventName, callback, capture) {
      document.addEventListener(eventName, callback, capture);
    },
    removeEventListener: function removeEventListener(eventName, callback, capture) {
      document.removeEventListener(eventName, callback, capture);
    },
    adoptNode: function adoptNode(node) {
      return document.adoptNode(node, true);
    },
    createElement: function createElement(tagName) {
      return document.createElement(tagName);
    },
    createTextNode: function createTextNode(text) {
      return document.createTextNode(text);
    },
    createComment: function createComment(text) {
      return document.createComment(text);
    },
    createDocumentFragment: function createDocumentFragment() {
      return document.createDocumentFragment();
    },
    createMutationObserver: function createMutationObserver(callback) {
      return new (window.MutationObserver || window.WebKitMutationObserver)(callback);
    },
    createCustomEvent: function createCustomEvent(eventType, options) {
      return new window.CustomEvent(eventType, options);
    },
    dispatchEvent: function dispatchEvent(evt) {
      document.dispatchEvent(evt);
    },
    getComputedStyle: function getComputedStyle(element) {
      return window.getComputedStyle(element);
    },
    getElementById: function getElementById(id) {
      return document.getElementById(id);
    },
    querySelectorAll: function querySelectorAll(query) {
      return document.querySelectorAll(query);
    },
    nextElementSibling: function nextElementSibling(element) {
      if (element.nextElementSibling) {
        return element.nextElementSibling;
      }
      do {
        element = element.nextSibling;
      } while (element && element.nodeType !== 1);
      return element;
    },
    createTemplateFromMarkup: function createTemplateFromMarkup(markup) {
      var parser = document.createElement('div');
      parser.innerHTML = markup;
      var temp = parser.firstElementChild;
      if (!temp || temp.nodeName !== 'TEMPLATE') {
        throw new Error('Template markup must be wrapped in a <template> element e.g. <template> <!-- markup here --> </template>');
      }
      return _FEATURE.ensureHTMLTemplateElement(temp);
    },
    appendNode: function appendNode(newNode, parentNode) {
      (parentNode || document.body).appendChild(newNode);
    },
    replaceNode: function replaceNode(newNode, node, parentNode) {
      if (node.parentNode) {
        node.parentNode.replaceChild(newNode, node);
      } else if (shadowPoly !== null) {
        shadowPoly.unwrap(parentNode).replaceChild(shadowPoly.unwrap(newNode), shadowPoly.unwrap(node));
      } else {
        parentNode.replaceChild(newNode, node);
      }
    },
    removeNode: function removeNode(node, parentNode) {
      if (node.parentNode) {
        node.parentNode.removeChild(node);
      } else if (shadowPoly !== null) {
        shadowPoly.unwrap(parentNode).removeChild(shadowPoly.unwrap(node));
      } else {
        parentNode.removeChild(node);
      }
    },
    injectStyles: function injectStyles(styles, destination, prepend) {
      var node = document.createElement('style');
      node.innerHTML = styles;
      node.type = 'text/css';
      destination = destination || document.head;
      if (prepend && destination.childNodes.length > 0) {
        destination.insertBefore(node, destination.childNodes[0]);
      } else {
        destination.appendChild(node);
      }
      return node;
    }
  };
  exports._DOM = _DOM;
  var _PLATFORM = {
    location: window.location,
    history: window.history,
    addEventListener: function addEventListener(eventName, callback, capture) {
      this.global.addEventListener(eventName, callback, capture);
    },
    removeEventListener: function removeEventListener(eventName, callback, capture) {
      this.global.removeEventListener(eventName, callback, capture);
    },
    performance: window.performance,
    requestAnimationFrame: function requestAnimationFrame(callback) {
      return this.global.requestAnimationFrame(callback);
    }
  };
  exports._PLATFORM = _PLATFORM;
  var isInitialized = false;
  function initialize() {
    if (isInitialized) {
      return;
    }
    isInitialized = true;
    _ensureCustomEvent();
    _ensureFunctionName();
    _ensureHTMLTemplateElement();
    _ensureElementMatches();
    _ensureClassList();
    _ensurePerformance();
    _aureliaPal.initializePAL(function(platform, feature, dom) {
      Object.assign(platform, _PLATFORM);
      Object.assign(feature, _FEATURE);
      Object.assign(dom, _DOM);
      Object.defineProperty(dom, 'title', {
        get: function get() {
          return document.title;
        },
        set: function set(value) {
          document.title = value;
        }
      });
      Object.defineProperty(dom, 'activeElement', {get: function get() {
          return document.activeElement;
        }});
      Object.defineProperty(platform, 'XMLHttpRequest', {get: function get() {
          return platform.global.XMLHttpRequest;
        }});
    });
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-pal-browser@1.0.0-beta.1.1.4", ["npm:aurelia-pal-browser@1.0.0-beta.1.1.4/aurelia-pal-browser"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-polyfills@1.0.0-beta.1.0.1/aurelia-polyfills", ["exports", "npm:aurelia-pal@1.0.0-beta.1.1.1"], function(exports, _aureliaPal) {
  'use strict';
  Number.isNaN = Number.isNaN || function(value) {
    return value !== value;
  };
  Number.isFinite = Number.isFinite || function(value) {
    return typeof value === "number" && isFinite(value);
  };
  if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    };
  }
  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position) {
      position = position || 0;
      return this.substr(position, searchString.length) === searchString;
    };
  }
  if (!Array.from) {
    Array.from = (function() {
      var toStr = Object.prototype.toString;
      var isCallable = function isCallable(fn) {
        return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
      };
      var toInteger = function toInteger(value) {
        var number = Number(value);
        if (isNaN(number)) {
          return 0;
        }
        if (number === 0 || !isFinite(number)) {
          return number;
        }
        return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
      };
      var maxSafeInteger = Math.pow(2, 53) - 1;
      var toLength = function toLength(value) {
        var len = toInteger(value);
        return Math.min(Math.max(len, 0), maxSafeInteger);
      };
      return function from(arrayLike) {
        var C = this;
        var items = Object(arrayLike);
        if (arrayLike == null) {
          throw new TypeError("Array.from requires an array-like object - not null or undefined");
        }
        var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
        var T;
        if (typeof mapFn !== 'undefined') {
          if (!isCallable(mapFn)) {
            throw new TypeError('Array.from: when provided, the second argument must be a function');
          }
          if (arguments.length > 2) {
            T = arguments[2];
          }
        }
        var len = toLength(items.length);
        var A = isCallable(C) ? Object(new C(len)) : new Array(len);
        var k = 0;
        var kValue;
        while (k < len) {
          kValue = items[k];
          if (mapFn) {
            A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
          } else {
            A[k] = kValue;
          }
          k += 1;
        }
        A.length = len;
        return A;
      };
    })();
  }
  if (!Array.prototype.find) {
    Array.prototype.find = function(predicate) {
      if (this === null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;
      for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return value;
        }
      }
      return undefined;
    };
  }
  if (!Array.prototype.findIndex) {
    Array.prototype.findIndex = function(predicate) {
      if (this === null) {
        throw new TypeError('Array.prototype.findIndex called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;
      for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return i;
        }
      }
      return -1;
    };
  }
  if (!Array.prototype.includes) {
    Array.prototype.includes = function(searchElement) {
      var O = Object(this);
      var len = parseInt(O.length) || 0;
      if (len === 0) {
        return false;
      }
      var n = parseInt(arguments[1]) || 0;
      var k;
      if (n >= 0) {
        k = n;
      } else {
        k = len + n;
        if (k < 0) {
          k = 0;
        }
      }
      var currentElement;
      while (k < len) {
        currentElement = O[k];
        if (searchElement === currentElement || searchElement !== searchElement && currentElement !== currentElement) {
          return true;
        }
        k++;
      }
      return false;
    };
  }
  if (typeof Object.assign !== 'function') {
    Object.assign = function(target) {
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }
      var output = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (source.hasOwnProperty(nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
  }
  (function(global) {
    var i;
    var defineProperty = Object.defineProperty,
        is = function is(a, b) {
          return a === b || a !== a && b !== b;
        };
    if (typeof WeakMap == 'undefined') {
      global.WeakMap = createCollection({
        'delete': sharedDelete,
        clear: sharedClear,
        get: sharedGet,
        has: mapHas,
        set: sharedSet
      }, true);
    }
    if (typeof Map == 'undefined' || typeof new Map().values !== 'function' || !new Map().values().next) {
      global.Map = createCollection({
        'delete': sharedDelete,
        has: mapHas,
        get: sharedGet,
        set: sharedSet,
        keys: sharedKeys,
        values: sharedValues,
        entries: mapEntries,
        forEach: sharedForEach,
        clear: sharedClear
      });
    }
    if (typeof Set == 'undefined' || typeof new Set().values !== 'function' || !new Set().values().next) {
      global.Set = createCollection({
        has: setHas,
        add: sharedAdd,
        'delete': sharedDelete,
        clear: sharedClear,
        keys: sharedValues,
        values: sharedValues,
        entries: setEntries,
        forEach: sharedForEach
      });
    }
    if (typeof WeakSet == 'undefined') {
      global.WeakSet = createCollection({
        'delete': sharedDelete,
        add: sharedAdd,
        clear: sharedClear,
        has: setHas
      }, true);
    }
    function createCollection(proto, objectOnly) {
      function Collection(a) {
        if (!this || this.constructor !== Collection)
          return new Collection(a);
        this._keys = [];
        this._values = [];
        this._itp = [];
        this.objectOnly = objectOnly;
        if (a)
          init.call(this, a);
      }
      if (!objectOnly) {
        defineProperty(proto, 'size', {get: sharedSize});
      }
      proto.constructor = Collection;
      Collection.prototype = proto;
      return Collection;
    }
    function init(a) {
      var i;
      if (this.add)
        a.forEach(this.add, this);
      else
        a.forEach(function(a) {
          this.set(a[0], a[1]);
        }, this);
    }
    function sharedDelete(key) {
      if (this.has(key)) {
        this._keys.splice(i, 1);
        this._values.splice(i, 1);
        this._itp.forEach(function(p) {
          if (i < p[0])
            p[0]--;
        });
      }
      return -1 < i;
    }
    ;
    function sharedGet(key) {
      return this.has(key) ? this._values[i] : undefined;
    }
    function has(list, key) {
      if (this.objectOnly && key !== Object(key))
        throw new TypeError("Invalid value used as weak collection key");
      if (key != key || key === 0)
        for (i = list.length; i-- && !is(list[i], key); ) {}
      else
        i = list.indexOf(key);
      return -1 < i;
    }
    function setHas(value) {
      return has.call(this, this._values, value);
    }
    function mapHas(value) {
      return has.call(this, this._keys, value);
    }
    function sharedSet(key, value) {
      this.has(key) ? this._values[i] = value : this._values[this._keys.push(key) - 1] = value;
      return this;
    }
    function sharedAdd(value) {
      if (!this.has(value))
        this._values.push(value);
      return this;
    }
    function sharedClear() {
      (this._keys || 0).length = this._values.length = 0;
    }
    function sharedKeys() {
      return sharedIterator(this._itp, this._keys);
    }
    function sharedValues() {
      return sharedIterator(this._itp, this._values);
    }
    function mapEntries() {
      return sharedIterator(this._itp, this._keys, this._values);
    }
    function setEntries() {
      return sharedIterator(this._itp, this._values, this._values);
    }
    function sharedIterator(itp, array, array2) {
      var p = [0],
          done = false;
      itp.push(p);
      return {next: function next() {
          var v,
              k = p[0];
          if (!done && k < array.length) {
            v = array2 ? [array[k], array2[k]] : array[k];
            p[0]++;
          } else {
            done = true;
            itp.splice(itp.indexOf(p), 1);
          }
          return {
            done: done,
            value: v
          };
        }};
    }
    function sharedSize() {
      return this._values.length;
    }
    function sharedForEach(callback, context) {
      var it = this.entries();
      for (; ; ) {
        var r = it.next();
        if (r.done)
          break;
        callback.call(context, r.value[1], r.value[0], this);
      }
    }
  })(_aureliaPal.PLATFORM.global);
  var emptyMetadata = Object.freeze({});
  var metadataContainerKey = '__metadata__';
  var bind = Function.prototype.bind;
  if (typeof _aureliaPal.PLATFORM.global.Reflect === 'undefined') {
    _aureliaPal.PLATFORM.global.Reflect = {};
  }
  if (typeof Reflect.getOwnMetadata !== 'function') {
    Reflect.getOwnMetadata = function(metadataKey, target, targetKey) {
      return ((target[metadataContainerKey] || emptyMetadata)[targetKey] || emptyMetadata)[metadataKey];
    };
  }
  if (typeof Reflect.defineMetadata !== 'function') {
    Reflect.defineMetadata = function(metadataKey, metadataValue, target, targetKey) {
      var metadataContainer = target.hasOwnProperty(metadataContainerKey) ? target[metadataContainerKey] : target[metadataContainerKey] = {};
      var targetContainer = metadataContainer[targetKey] || (metadataContainer[targetKey] = {});
      targetContainer[metadataKey] = metadataValue;
    };
  }
  if (typeof Reflect.metadata !== 'function') {
    Reflect.metadata = function(metadataKey, metadataValue) {
      return function(target, targetKey) {
        Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
      };
    };
  }
  if (typeof Reflect.construct !== 'function') {
    Reflect.construct = function(Target, args) {
      if (args) {
        switch (args.length) {
          case 0:
            return new Target();
          case 1:
            return new Target(args[0]);
          case 2:
            return new Target(args[0], args[1]);
          case 3:
            return new Target(args[0], args[1], args[2]);
          case 4:
            return new Target(args[0], args[1], args[2], args[3]);
        }
      }
      var a = [null];
      a.push.apply(a, args);
      return new (bind.apply(Target, a))();
    };
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-polyfills@1.0.0-beta.1.0.1", ["npm:aurelia-polyfills@1.0.0-beta.1.0.1/aurelia-polyfills"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-bootstrapper@1.0.0-beta.1.1.4/aurelia-bootstrapper", ["exports", "npm:aurelia-polyfills@1.0.0-beta.1.0.1", "npm:aurelia-pal@1.0.0-beta.1.1.1", "npm:aurelia-pal-browser@1.0.0-beta.1.1.4"], function(exports, _aureliaPolyfills, _aureliaPal, _aureliaPalBrowser) {
  'use strict';
  exports.__esModule = true;
  exports.bootstrap = bootstrap;
  var bootstrapQueue = [];
  var sharedLoader = null;
  var Aurelia = null;
  function onBootstrap(callback) {
    return new Promise(function(resolve, reject) {
      if (sharedLoader) {
        resolve(callback(sharedLoader));
      } else {
        bootstrapQueue.push(function() {
          try {
            resolve(callback(sharedLoader));
          } catch (e) {
            reject(e);
          }
        });
      }
    });
  }
  function ready(global) {
    return new Promise(function(resolve, reject) {
      if (global.document.readyState === 'complete') {
        resolve(global.document);
      } else {
        global.document.addEventListener('DOMContentLoaded', completed);
        global.addEventListener('load', completed);
      }
      function completed() {
        global.document.removeEventListener('DOMContentLoaded', completed);
        global.removeEventListener('load', completed);
        resolve(global.document);
      }
    });
  }
  function createLoader() {
    if (_aureliaPal.PLATFORM.Loader) {
      return Promise.resolve(new _aureliaPal.PLATFORM.Loader());
    }
    if (window.System && typeof window.System['import'] === 'function') {
      return System.normalize('aurelia-bootstrapper').then(function(bootstrapperName) {
        return System.normalize('aurelia-loader-default', bootstrapperName);
      }).then(function(loaderName) {
        return System['import'](loaderName).then(function(m) {
          return new m.DefaultLoader();
        });
      });
    }
    if (typeof window.require === 'function') {
      return new Promise(function(resolve, reject) {
        return require(['aurelia-loader-default'], function(m) {
          return resolve(new m.DefaultLoader());
        }, reject);
      });
    }
    return Promise.reject('No PLATFORM.Loader is defined and there is neither a System API (ES6) or a Require API (AMD) globally available to load your app.');
  }
  function preparePlatform(loader) {
    return loader.normalize('aurelia-bootstrapper').then(function(bootstrapperName) {
      return loader.normalize('aurelia-framework', bootstrapperName).then(function(frameworkName) {
        loader.map('aurelia-framework', frameworkName);
        return Promise.all([loader.normalize('aurelia-dependency-injection', frameworkName).then(function(diName) {
          return loader.map('aurelia-dependency-injection', diName);
        }), loader.normalize('aurelia-router', bootstrapperName).then(function(routerName) {
          return loader.map('aurelia-router', routerName);
        }), loader.normalize('aurelia-logging-console', bootstrapperName).then(function(loggingConsoleName) {
          return loader.map('aurelia-logging-console', loggingConsoleName);
        })]).then(function() {
          return loader.loadModule(frameworkName).then(function(m) {
            return Aurelia = m.Aurelia;
          });
        });
      });
    });
  }
  function handleApp(loader, appHost) {
    return config(loader, appHost, appHost.getAttribute('aurelia-app'));
  }
  function config(loader, appHost, configModuleId) {
    var aurelia = new Aurelia(loader);
    aurelia.host = appHost;
    if (configModuleId) {
      return loader.loadModule(configModuleId).then(function(customConfig) {
        return customConfig.configure(aurelia);
      });
    }
    aurelia.use.standardConfiguration().developmentLogging();
    return aurelia.start().then(function() {
      return aurelia.setRoot();
    });
  }
  function run() {
    return ready(window).then(function(doc) {
      _aureliaPalBrowser.initialize();
      var appHost = doc.querySelectorAll('[aurelia-app]');
      return createLoader().then(function(loader) {
        return preparePlatform(loader).then(function() {
          for (var i = 0,
              ii = appHost.length; i < ii; ++i) {
            handleApp(loader, appHost[i])['catch'](console.error.bind(console));
          }
          sharedLoader = loader;
          for (var i = 0,
              ii = bootstrapQueue.length; i < ii; ++i) {
            bootstrapQueue[i]();
          }
          bootstrapQueue = null;
        });
      });
    });
  }
  function bootstrap(configure) {
    return onBootstrap(function(loader) {
      var aurelia = new Aurelia(loader);
      return configure(aurelia);
    });
  }
  run();
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-bootstrapper@1.0.0-beta.1.1.4", ["npm:aurelia-bootstrapper@1.0.0-beta.1.1.4/aurelia-bootstrapper"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-metadata@1.0.0-beta.1.1.6/aurelia-metadata", ["exports", "npm:aurelia-pal@1.0.0-beta.1.1.1"], function(exports, _aureliaPal) {
  'use strict';
  exports.__esModule = true;
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  exports.decorators = decorators;
  exports.deprecated = deprecated;
  exports.mixin = mixin;
  exports.protocol = protocol;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var metadata = {
    resource: 'aurelia:resource',
    paramTypes: 'design:paramtypes',
    properties: 'design:properties',
    get: function get(metadataKey, target, targetKey) {
      if (!target) {
        return undefined;
      }
      var result = metadata.getOwn(metadataKey, target, targetKey);
      return result === undefined ? metadata.get(metadataKey, Object.getPrototypeOf(target), targetKey) : result;
    },
    getOwn: function getOwn(metadataKey, target, targetKey) {
      if (!target) {
        return undefined;
      }
      return Reflect.getOwnMetadata(metadataKey, target, targetKey);
    },
    define: function define(metadataKey, metadataValue, target, targetKey) {
      Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
    },
    getOrCreateOwn: function getOrCreateOwn(metadataKey, Type, target, targetKey) {
      var result = metadata.getOwn(metadataKey, target, targetKey);
      if (result === undefined) {
        result = new Type();
        Reflect.defineMetadata(metadataKey, result, target, targetKey);
      }
      return result;
    }
  };
  exports.metadata = metadata;
  var originStorage = new Map();
  var unknownOrigin = Object.freeze({
    moduleId: undefined,
    moduleMember: undefined
  });
  var Origin = (function() {
    function Origin(moduleId, moduleMember) {
      _classCallCheck(this, Origin);
      this.moduleId = moduleId;
      this.moduleMember = moduleMember;
    }
    Origin.get = function get(fn) {
      var origin = originStorage.get(fn);
      if (origin === undefined) {
        _aureliaPal.PLATFORM.eachModule(function(key, value) {
          for (var _name in value) {
            var exp = value[_name];
            if (exp === fn) {
              originStorage.set(fn, origin = new Origin(key, _name));
              return true;
            }
          }
          if (value === fn) {
            originStorage.set(fn, origin = new Origin(key, 'default'));
            return true;
          }
        });
      }
      return origin || unknownOrigin;
    };
    Origin.set = function set(fn, origin) {
      originStorage.set(fn, origin);
    };
    return Origin;
  })();
  exports.Origin = Origin;
  function decorators() {
    for (var _len = arguments.length,
        rest = Array(_len),
        _key = 0; _key < _len; _key++) {
      rest[_key] = arguments[_key];
    }
    var applicator = function applicator(target, key, descriptor) {
      var i = rest.length;
      if (key) {
        descriptor = descriptor || {
          value: target[key],
          writable: true,
          configurable: true,
          enumerable: true
        };
        while (i--) {
          descriptor = rest[i](target, key, descriptor) || descriptor;
        }
        Object.defineProperty(target, key, descriptor);
      } else {
        while (i--) {
          target = rest[i](target) || target;
        }
      }
      return target;
    };
    applicator.on = applicator;
    return applicator;
  }
  function deprecated(optionsOrTarget, maybeKey, maybeDescriptor) {
    function decorator(target, key, descriptor) {
      var methodSignature = target.constructor.name + '#' + key;
      var options = maybeKey ? {} : optionsOrTarget || {};
      var message = 'DEPRECATION - ' + methodSignature;
      if (typeof descriptor.value !== 'function') {
        throw new SyntaxError('Only methods can be marked as deprecated.');
      }
      if (options.message) {
        message += ' - ' + options.message;
      }
      return _extends({}, descriptor, {value: function deprecationWrapper() {
          if (options.error) {
            throw new Error(message);
          } else {
            console.warn(message);
          }
          return descriptor.value.apply(this, arguments);
        }});
    }
    return maybeKey ? decorator(optionsOrTarget, maybeKey, maybeDescriptor) : decorator;
  }
  function mixin(behavior) {
    var instanceKeys = Object.keys(behavior);
    function _mixin(possible) {
      var decorator = function decorator(target) {
        var resolvedTarget = typeof target === 'function' ? target.prototype : target;
        var i = instanceKeys.length;
        while (i--) {
          var property = instanceKeys[i];
          Object.defineProperty(resolvedTarget, property, {
            value: behavior[property],
            writable: true
          });
        }
      };
      return possible ? decorator(possible) : decorator;
    }
    return _mixin;
  }
  function alwaysValid() {
    return true;
  }
  function noCompose() {}
  function ensureProtocolOptions(options) {
    if (options === undefined) {
      options = {};
    } else if (typeof options === 'function') {
      options = {validate: options};
    }
    if (!options.validate) {
      options.validate = alwaysValid;
    }
    if (!options.compose) {
      options.compose = noCompose;
    }
    return options;
  }
  function createProtocolValidator(validate) {
    return function(target) {
      var result = validate(target);
      return result === true;
    };
  }
  function createProtocolAsserter(name, validate) {
    return function(target) {
      var result = validate(target);
      if (result !== true) {
        throw new Error(result || name + ' was not correctly implemented.');
      }
    };
  }
  function protocol(name, options) {
    options = ensureProtocolOptions(options);
    var result = function result(target) {
      var resolvedTarget = typeof target === 'function' ? target.prototype : target;
      options.compose(resolvedTarget);
      result.assert(resolvedTarget);
      Object.defineProperty(resolvedTarget, 'protocol:' + name, {
        enumerable: false,
        configurable: false,
        writable: false,
        value: true
      });
    };
    result.validate = createProtocolValidator(options.validate);
    result.assert = createProtocolAsserter(name, options.validate);
    return result;
  }
  protocol.create = function(name, options) {
    options = ensureProtocolOptions(options);
    var hidden = 'protocol:' + name;
    var result = function result(target) {
      var decorator = protocol(name, options);
      return target ? decorator(target) : decorator;
    };
    result.decorates = function(obj) {
      return obj[hidden] === true;
    };
    result.validate = createProtocolValidator(options.validate);
    result.assert = createProtocolAsserter(name, options.validate);
    return result;
  };
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-metadata@1.0.0-beta.1.1.6", ["npm:aurelia-metadata@1.0.0-beta.1.1.6/aurelia-metadata"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-task-queue@1.0.0-beta.1.1.1/aurelia-task-queue", ["exports", "npm:aurelia-pal@1.0.0-beta.1.1.1"], function(exports, _aureliaPal) {
  'use strict';
  exports.__esModule = true;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var hasSetImmediate = typeof setImmediate === 'function';
  function makeRequestFlushFromMutationObserver(flush) {
    var toggle = 1;
    var observer = _aureliaPal.DOM.createMutationObserver(flush);
    var node = _aureliaPal.DOM.createTextNode('');
    observer.observe(node, {characterData: true});
    return function requestFlush() {
      toggle = -toggle;
      node.data = toggle;
    };
  }
  function makeRequestFlushFromTimer(flush) {
    return function requestFlush() {
      var timeoutHandle = setTimeout(handleFlushTimer, 0);
      var intervalHandle = setInterval(handleFlushTimer, 50);
      function handleFlushTimer() {
        clearTimeout(timeoutHandle);
        clearInterval(intervalHandle);
        flush();
      }
    };
  }
  function onError(error, task) {
    if ('onError' in task) {
      task.onError(error);
    } else if (hasSetImmediate) {
      setImmediate(function() {
        throw error;
      });
    } else {
      setTimeout(function() {
        throw error;
      }, 0);
    }
  }
  var TaskQueue = (function() {
    function TaskQueue() {
      var _this = this;
      _classCallCheck(this, TaskQueue);
      this.microTaskQueue = [];
      this.microTaskQueueCapacity = 1024;
      this.taskQueue = [];
      if (_aureliaPal.FEATURE.mutationObserver) {
        this.requestFlushMicroTaskQueue = makeRequestFlushFromMutationObserver(function() {
          return _this.flushMicroTaskQueue();
        });
      } else {
        this.requestFlushMicroTaskQueue = makeRequestFlushFromTimer(function() {
          return _this.flushMicroTaskQueue();
        });
      }
      this.requestFlushTaskQueue = makeRequestFlushFromTimer(function() {
        return _this.flushTaskQueue();
      });
    }
    TaskQueue.prototype.queueMicroTask = function queueMicroTask(task) {
      if (this.microTaskQueue.length < 1) {
        this.requestFlushMicroTaskQueue();
      }
      this.microTaskQueue.push(task);
    };
    TaskQueue.prototype.queueTask = function queueTask(task) {
      if (this.taskQueue.length < 1) {
        this.requestFlushTaskQueue();
      }
      this.taskQueue.push(task);
    };
    TaskQueue.prototype.flushTaskQueue = function flushTaskQueue() {
      var queue = this.taskQueue;
      var index = 0;
      var task = undefined;
      this.taskQueue = [];
      try {
        while (index < queue.length) {
          task = queue[index];
          task.call();
          index++;
        }
      } catch (error) {
        onError(error, task);
      }
    };
    TaskQueue.prototype.flushMicroTaskQueue = function flushMicroTaskQueue() {
      var queue = this.microTaskQueue;
      var capacity = this.microTaskQueueCapacity;
      var index = 0;
      var task = undefined;
      try {
        while (index < queue.length) {
          task = queue[index];
          task.call();
          index++;
          if (index > capacity) {
            for (var scan = 0,
                newLength = queue.length - index; scan < newLength; scan++) {
              queue[scan] = queue[scan + index];
            }
            queue.length -= index;
            index = 0;
          }
        }
      } catch (error) {
        onError(error, task);
      }
      queue.length = 0;
    };
    return TaskQueue;
  })();
  exports.TaskQueue = TaskQueue;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-task-queue@1.0.0-beta.1.1.1", ["npm:aurelia-task-queue@1.0.0-beta.1.1.1/aurelia-task-queue"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-pal@1.0.0-beta.1.1.1/aurelia-pal", ["exports"], function(exports) {
  'use strict';
  exports.__esModule = true;
  exports.AggregateError = AggregateError;
  exports.initializePAL = initializePAL;
  function AggregateError(message, innerError, skipIfAlreadyAggregate) {
    if (innerError) {
      if (innerError.innerError && skipIfAlreadyAggregate) {
        return innerError;
      }
      if (innerError.stack) {
        message += '\n------------------------------------------------\ninner error: ' + innerError.stack;
      }
    }
    var e = new Error(message);
    if (innerError) {
      e.innerError = innerError;
    }
    return e;
  }
  var FEATURE = {};
  exports.FEATURE = FEATURE;
  var PLATFORM = {
    noop: function noop() {},
    eachModule: function eachModule() {}
  };
  exports.PLATFORM = PLATFORM;
  PLATFORM.global = (function() {
    if (typeof self !== 'undefined') {
      return self;
    }
    if (typeof global !== 'undefined') {
      return global;
    }
    return new Function('return this')();
  })();
  var DOM = {};
  exports.DOM = DOM;
  function initializePAL(callback) {
    if (typeof Object.getPropertyDescriptor !== 'function') {
      Object.getPropertyDescriptor = function(subject, name) {
        var pd = Object.getOwnPropertyDescriptor(subject, name);
        var proto = Object.getPrototypeOf(subject);
        while (typeof pd === 'undefined' && proto !== null) {
          pd = Object.getOwnPropertyDescriptor(proto, name);
          proto = Object.getPrototypeOf(proto);
        }
        return pd;
      };
    }
    callback(PLATFORM, FEATURE, DOM);
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-pal@1.0.0-beta.1.1.1", ["npm:aurelia-pal@1.0.0-beta.1.1.1/aurelia-pal"], function(main) {
  return main;
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-binding@1.0.0-beta.1.2.2/aurelia-binding", ["exports", "npm:aurelia-pal@1.0.0-beta.1.1.1", "npm:aurelia-task-queue@1.0.0-beta.1.1.1", "npm:aurelia-metadata@1.0.0-beta.1.1.6"], function(exports, _aureliaPal, _aureliaTaskQueue, _aureliaMetadata) {
  'use strict';
  exports.__esModule = true;
  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  exports.camelCase = camelCase;
  exports.createOverrideContext = createOverrideContext;
  exports.getContextFor = getContextFor;
  exports.createScopeForTest = createScopeForTest;
  exports.connectable = connectable;
  exports.enqueueBindingConnect = enqueueBindingConnect;
  exports.subscriberCollection = subscriberCollection;
  exports.calcSplices = calcSplices;
  exports.mergeSplice = mergeSplice;
  exports.projectArraySplices = projectArraySplices;
  exports.getChangeRecords = getChangeRecords;
  exports.getArrayObserver = _getArrayObserver;
  exports.getMapObserver = _getMapObserver;
  exports.hasDeclaredDependencies = hasDeclaredDependencies;
  exports.declarePropertyDependencies = declarePropertyDependencies;
  exports.computedFrom = computedFrom;
  exports.valueConverter = valueConverter;
  exports.bindingBehavior = bindingBehavior;
  exports.getSetObserver = _getSetObserver;
  exports.observable = observable;
  function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function camelCase(name) {
    return name.charAt(0).toLowerCase() + name.slice(1);
  }
  function createOverrideContext(bindingContext, parentOverrideContext) {
    return {
      bindingContext: bindingContext,
      parentOverrideContext: parentOverrideContext || null
    };
  }
  function getContextFor(name, scope, ancestor) {
    var oc = scope.overrideContext;
    if (ancestor) {
      while (ancestor && oc) {
        ancestor--;
        oc = oc.parentOverrideContext;
      }
      if (ancestor || !oc) {
        return undefined;
      }
      return name in oc ? oc : oc.bindingContext;
    }
    while (oc && !(name in oc) && !(oc.bindingContext && name in oc.bindingContext)) {
      oc = oc.parentOverrideContext;
    }
    if (oc) {
      return name in oc ? oc : oc.bindingContext;
    }
    return scope.bindingContext || scope.overrideContext;
  }
  function createScopeForTest(bindingContext, parentBindingContext) {
    if (parentBindingContext) {
      return {
        bindingContext: bindingContext,
        overrideContext: createOverrideContext(bindingContext, createOverrideContext(parentBindingContext))
      };
    }
    return {
      bindingContext: bindingContext,
      overrideContext: createOverrideContext(bindingContext)
    };
  }
  var sourceContext = 'Binding:source';
  exports.sourceContext = sourceContext;
  var slotNames = [];
  var versionSlotNames = [];
  for (var i = 0; i < 100; i++) {
    slotNames.push('_observer' + i);
    versionSlotNames.push('_observerVersion' + i);
  }
  function addObserver(observer) {
    var observerSlots = this._observerSlots === undefined ? 0 : this._observerSlots;
    var i = observerSlots;
    while (i-- && this[slotNames[i]] !== observer) {}
    if (i === -1) {
      i = 0;
      while (this[slotNames[i]]) {
        i++;
      }
      this[slotNames[i]] = observer;
      observer.subscribe(sourceContext, this);
      if (i === observerSlots) {
        this._observerSlots = i + 1;
      }
    }
    if (this._version === undefined) {
      this._version = 0;
    }
    this[versionSlotNames[i]] = this._version;
  }
  function observeProperty(obj, propertyName) {
    var observer = this.observerLocator.getObserver(obj, propertyName);
    addObserver.call(this, observer);
  }
  function observeArray(array) {
    var observer = this.observerLocator.getArrayObserver(array);
    addObserver.call(this, observer);
  }
  function unobserve(all) {
    var i = this._observerSlots;
    while (i--) {
      if (all || this[versionSlotNames[i]] !== this._version) {
        var observer = this[slotNames[i]];
        this[slotNames[i]] = null;
        if (observer) {
          observer.unsubscribe(sourceContext, this);
        }
      }
    }
  }
  function connectable() {
    return function(target) {
      target.prototype.observeProperty = observeProperty;
      target.prototype.observeArray = observeArray;
      target.prototype.unobserve = unobserve;
      target.prototype.addObserver = addObserver;
    };
  }
  var bindings = new Map();
  var minimumImmediate = 100;
  var frameBudget = 15;
  var isFlushRequested = false;
  var immediate = 0;
  function flush(animationFrameStart) {
    var i = 0;
    var keys = bindings.keys();
    var item = undefined;
    while (item = keys.next()) {
      if (item.done) {
        break;
      }
      var binding = item.value;
      bindings['delete'](binding);
      binding.connect(true);
      i++;
      if (i % 100 === 0 && _aureliaPal.PLATFORM.performance.now() - animationFrameStart > frameBudget) {
        break;
      }
    }
    if (bindings.size) {
      _aureliaPal.PLATFORM.requestAnimationFrame(flush);
    } else {
      isFlushRequested = false;
      immediate = 0;
    }
  }
  function enqueueBindingConnect(binding) {
    if (immediate < minimumImmediate) {
      immediate++;
      binding.connect(false);
    } else {
      bindings.set(binding);
    }
    if (!isFlushRequested) {
      isFlushRequested = true;
      _aureliaPal.PLATFORM.requestAnimationFrame(flush);
    }
  }
  function addSubscriber(context, callable) {
    if (this.hasSubscriber(context, callable)) {
      return false;
    }
    if (!this._context0) {
      this._context0 = context;
      this._callable0 = callable;
      return true;
    }
    if (!this._context1) {
      this._context1 = context;
      this._callable1 = callable;
      return true;
    }
    if (!this._context2) {
      this._context2 = context;
      this._callable2 = callable;
      return true;
    }
    if (!this._contextsRest) {
      this._contextsRest = [context];
      this._callablesRest = [callable];
      return true;
    }
    this._contextsRest.push(context);
    this._callablesRest.push(callable);
    return true;
  }
  function removeSubscriber(context, callable) {
    if (this._context0 === context && this._callable0 === callable) {
      this._context0 = null;
      this._callable0 = null;
      return true;
    }
    if (this._context1 === context && this._callable1 === callable) {
      this._context1 = null;
      this._callable1 = null;
      return true;
    }
    if (this._context2 === context && this._callable2 === callable) {
      this._context2 = null;
      this._callable2 = null;
      return true;
    }
    var rest = this._contextsRest;
    var index = undefined;
    if (!rest || !rest.length || (index = rest.indexOf(context)) === -1 || this._callablesRest[index] !== callable) {
      return false;
    }
    rest.splice(index, 1);
    this._callablesRest.splice(index, 1);
    return true;
  }
  var arrayPool1 = [];
  var arrayPool2 = [];
  var poolUtilization = [];
  function callSubscribers(newValue, oldValue) {
    var context0 = this._context0;
    var callable0 = this._callable0;
    var context1 = this._context1;
    var callable1 = this._callable1;
    var context2 = this._context2;
    var callable2 = this._callable2;
    var length = this._contextsRest ? this._contextsRest.length : 0;
    var contextsRest = undefined;
    var callablesRest = undefined;
    var poolIndex = undefined;
    var i = undefined;
    if (length) {
      poolIndex = poolUtilization.length;
      while (poolIndex-- && poolUtilization[poolIndex]) {}
      if (poolIndex < 0) {
        poolIndex = poolUtilization.length;
        contextsRest = [];
        callablesRest = [];
        poolUtilization.push(true);
        arrayPool1.push(contextsRest);
        arrayPool2.push(callablesRest);
      } else {
        poolUtilization[poolIndex] = true;
        contextsRest = arrayPool1[poolIndex];
        callablesRest = arrayPool2[poolIndex];
      }
      i = length;
      while (i--) {
        contextsRest[i] = this._contextsRest[i];
        callablesRest[i] = this._callablesRest[i];
      }
    }
    if (context0) {
      if (callable0) {
        callable0.call(context0, newValue, oldValue);
      } else {
        context0(newValue, oldValue);
      }
    }
    if (context1) {
      if (callable1) {
        callable1.call(context1, newValue, oldValue);
      } else {
        context1(newValue, oldValue);
      }
    }
    if (context2) {
      if (callable2) {
        callable2.call(context2, newValue, oldValue);
      } else {
        context2(newValue, oldValue);
      }
    }
    if (length) {
      for (i = 0; i < length; i++) {
        var callable = callablesRest[i];
        var context = contextsRest[i];
        if (callable) {
          callable.call(context, newValue, oldValue);
        } else {
          context(newValue, oldValue);
        }
        contextsRest[i] = null;
        callablesRest[i] = null;
      }
      poolUtilization[poolIndex] = false;
    }
  }
  function hasSubscribers() {
    return !!(this._context0 || this._context1 || this._context2 || this._contextsRest && this._contextsRest.length);
  }
  function hasSubscriber(context, callable) {
    var has = this._context0 === context && this._callable0 === callable || this._context1 === context && this._callable1 === callable || this._context2 === context && this._callable2 === callable;
    if (has) {
      return true;
    }
    var index = undefined;
    var contexts = this._contextsRest;
    if (!contexts || (index = contexts.length) === 0) {
      return false;
    }
    var callables = this._callablesRest;
    while (index--) {
      if (contexts[index] === context && callables[index] === callable) {
        return true;
      }
    }
    return false;
  }
  function subscriberCollection() {
    return function(target) {
      target.prototype.addSubscriber = addSubscriber;
      target.prototype.removeSubscriber = removeSubscriber;
      target.prototype.callSubscribers = callSubscribers;
      target.prototype.hasSubscribers = hasSubscribers;
      target.prototype.hasSubscriber = hasSubscriber;
    };
  }
  function isIndex(s) {
    return +s === s >>> 0;
  }
  function toNumber(s) {
    return +s;
  }
  function newSplice(index, removed, addedCount) {
    return {
      index: index,
      removed: removed,
      addedCount: addedCount
    };
  }
  var EDIT_LEAVE = 0;
  var EDIT_UPDATE = 1;
  var EDIT_ADD = 2;
  var EDIT_DELETE = 3;
  function ArraySplice() {}
  ArraySplice.prototype = {
    calcEditDistances: function calcEditDistances(current, currentStart, currentEnd, old, oldStart, oldEnd) {
      var rowCount = oldEnd - oldStart + 1;
      var columnCount = currentEnd - currentStart + 1;
      var distances = new Array(rowCount);
      var i,
          j,
          north,
          west;
      for (i = 0; i < rowCount; ++i) {
        distances[i] = new Array(columnCount);
        distances[i][0] = i;
      }
      for (j = 0; j < columnCount; ++j) {
        distances[0][j] = j;
      }
      for (i = 1; i < rowCount; ++i) {
        for (j = 1; j < columnCount; ++j) {
          if (this.equals(current[currentStart + j - 1], old[oldStart + i - 1]))
            distances[i][j] = distances[i - 1][j - 1];
          else {
            north = distances[i - 1][j] + 1;
            west = distances[i][j - 1] + 1;
            distances[i][j] = north < west ? north : west;
          }
        }
      }
      return distances;
    },
    spliceOperationsFromEditDistances: function spliceOperationsFromEditDistances(distances) {
      var i = distances.length - 1;
      var j = distances[0].length - 1;
      var current = distances[i][j];
      var edits = [];
      while (i > 0 || j > 0) {
        if (i == 0) {
          edits.push(EDIT_ADD);
          j--;
          continue;
        }
        if (j == 0) {
          edits.push(EDIT_DELETE);
          i--;
          continue;
        }
        var northWest = distances[i - 1][j - 1];
        var west = distances[i - 1][j];
        var north = distances[i][j - 1];
        var min;
        if (west < north)
          min = west < northWest ? west : northWest;
        else
          min = north < northWest ? north : northWest;
        if (min == northWest) {
          if (northWest == current) {
            edits.push(EDIT_LEAVE);
          } else {
            edits.push(EDIT_UPDATE);
            current = northWest;
          }
          i--;
          j--;
        } else if (min == west) {
          edits.push(EDIT_DELETE);
          i--;
          current = west;
        } else {
          edits.push(EDIT_ADD);
          j--;
          current = north;
        }
      }
      edits.reverse();
      return edits;
    },
    calcSplices: function calcSplices(current, currentStart, currentEnd, old, oldStart, oldEnd) {
      var prefixCount = 0;
      var suffixCount = 0;
      var minLength = Math.min(currentEnd - currentStart, oldEnd - oldStart);
      if (currentStart == 0 && oldStart == 0)
        prefixCount = this.sharedPrefix(current, old, minLength);
      if (currentEnd == current.length && oldEnd == old.length)
        suffixCount = this.sharedSuffix(current, old, minLength - prefixCount);
      currentStart += prefixCount;
      oldStart += prefixCount;
      currentEnd -= suffixCount;
      oldEnd -= suffixCount;
      if (currentEnd - currentStart == 0 && oldEnd - oldStart == 0)
        return [];
      if (currentStart == currentEnd) {
        var splice = newSplice(currentStart, [], 0);
        while (oldStart < oldEnd)
          splice.removed.push(old[oldStart++]);
        return [splice];
      } else if (oldStart == oldEnd)
        return [newSplice(currentStart, [], currentEnd - currentStart)];
      var ops = this.spliceOperationsFromEditDistances(this.calcEditDistances(current, currentStart, currentEnd, old, oldStart, oldEnd));
      var splice = undefined;
      var splices = [];
      var index = currentStart;
      var oldIndex = oldStart;
      for (var i = 0; i < ops.length; ++i) {
        switch (ops[i]) {
          case EDIT_LEAVE:
            if (splice) {
              splices.push(splice);
              splice = undefined;
            }
            index++;
            oldIndex++;
            break;
          case EDIT_UPDATE:
            if (!splice)
              splice = newSplice(index, [], 0);
            splice.addedCount++;
            index++;
            splice.removed.push(old[oldIndex]);
            oldIndex++;
            break;
          case EDIT_ADD:
            if (!splice)
              splice = newSplice(index, [], 0);
            splice.addedCount++;
            index++;
            break;
          case EDIT_DELETE:
            if (!splice)
              splice = newSplice(index, [], 0);
            splice.removed.push(old[oldIndex]);
            oldIndex++;
            break;
        }
      }
      if (splice) {
        splices.push(splice);
      }
      return splices;
    },
    sharedPrefix: function sharedPrefix(current, old, searchLength) {
      for (var i = 0; i < searchLength; ++i)
        if (!this.equals(current[i], old[i]))
          return i;
      return searchLength;
    },
    sharedSuffix: function sharedSuffix(current, old, searchLength) {
      var index1 = current.length;
      var index2 = old.length;
      var count = 0;
      while (count < searchLength && this.equals(current[--index1], old[--index2]))
        count++;
      return count;
    },
    calculateSplices: function calculateSplices(current, previous) {
      return this.calcSplices(current, 0, current.length, previous, 0, previous.length);
    },
    equals: function equals(currentValue, previousValue) {
      return currentValue === previousValue;
    }
  };
  var arraySplice = new ArraySplice();
  function calcSplices(current, currentStart, currentEnd, old, oldStart, oldEnd) {
    return arraySplice.calcSplices(current, currentStart, currentEnd, old, oldStart, oldEnd);
  }
  function intersect(start1, end1, start2, end2) {
    if (end1 < start2 || end2 < start1)
      return -1;
    if (end1 == start2 || end2 == start1)
      return 0;
    if (start1 < start2) {
      if (end1 < end2)
        return end1 - start2;
      else
        return end2 - start2;
    } else {
      if (end2 < end1)
        return end2 - start1;
      else
        return end1 - start1;
    }
  }
  function mergeSplice(splices, index, removed, addedCount) {
    var splice = newSplice(index, removed, addedCount);
    var inserted = false;
    var insertionOffset = 0;
    for (var i = 0; i < splices.length; i++) {
      var current = splices[i];
      current.index += insertionOffset;
      if (inserted)
        continue;
      var intersectCount = intersect(splice.index, splice.index + splice.removed.length, current.index, current.index + current.addedCount);
      if (intersectCount >= 0) {
        splices.splice(i, 1);
        i--;
        insertionOffset -= current.addedCount - current.removed.length;
        splice.addedCount += current.addedCount - intersectCount;
        var deleteCount = splice.removed.length + current.removed.length - intersectCount;
        if (!splice.addedCount && !deleteCount) {
          inserted = true;
        } else {
          var removed = current.removed;
          if (splice.index < current.index) {
            var prepend = splice.removed.slice(0, current.index - splice.index);
            Array.prototype.push.apply(prepend, removed);
            removed = prepend;
          }
          if (splice.index + splice.removed.length > current.index + current.addedCount) {
            var append = splice.removed.slice(current.index + current.addedCount - splice.index);
            Array.prototype.push.apply(removed, append);
          }
          splice.removed = removed;
          if (current.index < splice.index) {
            splice.index = current.index;
          }
        }
      } else if (splice.index < current.index) {
        inserted = true;
        splices.splice(i, 0, splice);
        i++;
        var offset = splice.addedCount - splice.removed.length;
        current.index += offset;
        insertionOffset += offset;
      }
    }
    if (!inserted)
      splices.push(splice);
  }
  function createInitialSplices(array, changeRecords) {
    var splices = [];
    for (var i = 0; i < changeRecords.length; i++) {
      var record = changeRecords[i];
      switch (record.type) {
        case 'splice':
          mergeSplice(splices, record.index, record.removed.slice(), record.addedCount);
          break;
        case 'add':
        case 'update':
        case 'delete':
          if (!isIndex(record.name))
            continue;
          var index = toNumber(record.name);
          if (index < 0)
            continue;
          mergeSplice(splices, index, [record.oldValue], record.type === 'delete' ? 0 : 1);
          break;
        default:
          console.error('Unexpected record type: ' + JSON.stringify(record));
          break;
      }
    }
    return splices;
  }
  function projectArraySplices(array, changeRecords) {
    var splices = [];
    createInitialSplices(array, changeRecords).forEach(function(splice) {
      if (splice.addedCount == 1 && splice.removed.length == 1) {
        if (splice.removed[0] !== array[splice.index])
          splices.push(splice);
        return;
      }
      ;
      splices = splices.concat(calcSplices(array, splice.index, splice.index + splice.addedCount, splice.removed, 0, splice.removed.length));
    });
    return splices;
  }
  function newRecord(type, object, key, oldValue) {
    return {
      type: type,
      object: object,
      key: key,
      oldValue: oldValue
    };
  }
  function getChangeRecords(map) {
    var entries = new Array(map.size);
    var keys = map.keys();
    var i = 0;
    var item = undefined;
    while (item = keys.next()) {
      if (item.done) {
        break;
      }
      entries[i] = newRecord('added', map, item.value);
      i++;
    }
    return entries;
  }
  var ModifyCollectionObserver = (function() {
    function ModifyCollectionObserver(taskQueue, collection) {
      _classCallCheck(this, _ModifyCollectionObserver);
      this.taskQueue = taskQueue;
      this.queued = false;
      this.changeRecords = null;
      this.oldCollection = null;
      this.collection = collection;
      this.lengthPropertyName = collection instanceof Map || collection instanceof Set ? 'size' : 'length';
    }
    ModifyCollectionObserver.prototype.subscribe = function subscribe(context, callable) {
      this.addSubscriber(context, callable);
    };
    ModifyCollectionObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
      this.removeSubscriber(context, callable);
    };
    ModifyCollectionObserver.prototype.addChangeRecord = function addChangeRecord(changeRecord) {
      if (!this.hasSubscribers() && !this.lengthObserver) {
        return;
      }
      if (changeRecord.type === 'splice') {
        var index = changeRecord.index;
        var arrayLength = changeRecord.object.length;
        if (index > arrayLength) {
          index = arrayLength - changeRecord.addedCount;
        } else if (index < 0) {
          index = arrayLength + changeRecord.removed.length + index - changeRecord.addedCount;
        }
        if (index < 0) {
          index = 0;
        }
        changeRecord.index = index;
      }
      if (this.changeRecords === null) {
        this.changeRecords = [changeRecord];
      } else {
        this.changeRecords.push(changeRecord);
      }
      if (!this.queued) {
        this.queued = true;
        this.taskQueue.queueMicroTask(this);
      }
    };
    ModifyCollectionObserver.prototype.flushChangeRecords = function flushChangeRecords() {
      if (this.changeRecords && this.changeRecords.length || this.oldCollection) {
        this.call();
      }
    };
    ModifyCollectionObserver.prototype.reset = function reset(oldCollection) {
      this.oldCollection = oldCollection;
      if (this.hasSubscribers() && !this.queued) {
        this.queued = true;
        this.taskQueue.queueMicroTask(this);
      }
    };
    ModifyCollectionObserver.prototype.getLengthObserver = function getLengthObserver() {
      return this.lengthObserver || (this.lengthObserver = new CollectionLengthObserver(this.collection));
    };
    ModifyCollectionObserver.prototype.call = function call() {
      var changeRecords = this.changeRecords;
      var oldCollection = this.oldCollection;
      var records = undefined;
      this.queued = false;
      this.changeRecords = [];
      this.oldCollection = null;
      if (this.hasSubscribers()) {
        if (oldCollection) {
          if (this.collection instanceof Map || this.collection instanceof Set) {
            records = getChangeRecords(oldCollection);
          } else {
            records = calcSplices(this.collection, 0, this.collection.length, oldCollection, 0, oldCollection.length);
          }
        } else {
          if (this.collection instanceof Map || this.collection instanceof Set) {
            records = changeRecords;
          } else {
            records = projectArraySplices(this.collection, changeRecords);
          }
        }
        this.callSubscribers(records);
      }
      if (this.lengthObserver) {
        this.lengthObserver.call(this.collection[this.lengthPropertyName]);
      }
    };
    var _ModifyCollectionObserver = ModifyCollectionObserver;
    ModifyCollectionObserver = subscriberCollection()(ModifyCollectionObserver) || ModifyCollectionObserver;
    return ModifyCollectionObserver;
  })();
  exports.ModifyCollectionObserver = ModifyCollectionObserver;
  var CollectionLengthObserver = (function() {
    function CollectionLengthObserver(collection) {
      _classCallCheck(this, _CollectionLengthObserver);
      this.collection = collection;
      this.lengthPropertyName = collection instanceof Map || collection instanceof Set ? 'size' : 'length';
      this.currentValue = collection[this.lengthPropertyName];
    }
    CollectionLengthObserver.prototype.getValue = function getValue() {
      return this.collection[this.lengthPropertyName];
    };
    CollectionLengthObserver.prototype.setValue = function setValue(newValue) {
      this.collection[this.lengthPropertyName] = newValue;
    };
    CollectionLengthObserver.prototype.subscribe = function subscribe(context, callable) {
      this.addSubscriber(context, callable);
    };
    CollectionLengthObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
      this.removeSubscriber(context, callable);
    };
    CollectionLengthObserver.prototype.call = function call(newValue) {
      var oldValue = this.currentValue;
      this.callSubscribers(newValue, oldValue);
      this.currentValue = newValue;
    };
    var _CollectionLengthObserver = CollectionLengthObserver;
    CollectionLengthObserver = subscriberCollection()(CollectionLengthObserver) || CollectionLengthObserver;
    return CollectionLengthObserver;
  })();
  exports.CollectionLengthObserver = CollectionLengthObserver;
  var pop = Array.prototype.pop;
  var push = Array.prototype.push;
  var reverse = Array.prototype.reverse;
  var shift = Array.prototype.shift;
  var sort = Array.prototype.sort;
  var splice = Array.prototype.splice;
  var unshift = Array.prototype.unshift;
  Array.prototype.pop = function() {
    var methodCallResult = pop.apply(this, arguments);
    if (this.__array_observer__ !== undefined) {
      this.__array_observer__.addChangeRecord({
        type: 'delete',
        object: this,
        name: this.length,
        oldValue: methodCallResult
      });
    }
    return methodCallResult;
  };
  Array.prototype.push = function() {
    var methodCallResult = push.apply(this, arguments);
    if (this.__array_observer__ !== undefined) {
      this.__array_observer__.addChangeRecord({
        type: 'splice',
        object: this,
        index: this.length - arguments.length,
        removed: [],
        addedCount: arguments.length
      });
    }
    return methodCallResult;
  };
  Array.prototype.reverse = function() {
    var oldArray = undefined;
    if (this.__array_observer__ !== undefined) {
      this.__array_observer__.flushChangeRecords();
      oldArray = this.slice();
    }
    var methodCallResult = reverse.apply(this, arguments);
    if (this.__array_observer__ !== undefined) {
      this.__array_observer__.reset(oldArray);
    }
    return methodCallResult;
  };
  Array.prototype.shift = function() {
    var methodCallResult = shift.apply(this, arguments);
    if (this.__array_observer__ !== undefined) {
      this.__array_observer__.addChangeRecord({
        type: 'delete',
        object: this,
        name: 0,
        oldValue: methodCallResult
      });
    }
    return methodCallResult;
  };
  Array.prototype.sort = function() {
    var oldArray = undefined;
    if (this.__array_observer__ !== undefined) {
      this.__array_observer__.flushChangeRecords();
      oldArray = this.slice();
    }
    var methodCallResult = sort.apply(this, arguments);
    if (this.__array_observer__ !== undefined) {
      this.__array_observer__.reset(oldArray);
    }
    return methodCallResult;
  };
  Array.prototype.splice = function() {
    var methodCallResult = splice.apply(this, arguments);
    if (this.__array_observer__ !== undefined) {
      this.__array_observer__.addChangeRecord({
        type: 'splice',
        object: this,
        index: arguments[0],
        removed: methodCallResult,
        addedCount: arguments.length > 2 ? arguments.length - 2 : 0
      });
    }
    return methodCallResult;
  };
  Array.prototype.unshift = function() {
    var methodCallResult = unshift.apply(this, arguments);
    if (this.__array_observer__ !== undefined) {
      this.__array_observer__.addChangeRecord({
        type: 'splice',
        object: this,
        index: 0,
        removed: [],
        addedCount: arguments.length
      });
    }
    return methodCallResult;
  };
  function _getArrayObserver(taskQueue, array) {
    return ModifyArrayObserver['for'](taskQueue, array);
  }
  var ModifyArrayObserver = (function(_ModifyCollectionObserver2) {
    _inherits(ModifyArrayObserver, _ModifyCollectionObserver2);
    function ModifyArrayObserver(taskQueue, array) {
      _classCallCheck(this, ModifyArrayObserver);
      _ModifyCollectionObserver2.call(this, taskQueue, array);
    }
    ModifyArrayObserver['for'] = function _for(taskQueue, array) {
      if (!('__array_observer__' in array)) {
        var observer = ModifyArrayObserver.create(taskQueue, array);
        Object.defineProperty(array, '__array_observer__', {
          value: observer,
          enumerable: false,
          configurable: false
        });
      }
      return array.__array_observer__;
    };
    ModifyArrayObserver.create = function create(taskQueue, array) {
      var observer = new ModifyArrayObserver(taskQueue, array);
      return observer;
    };
    return ModifyArrayObserver;
  })(ModifyCollectionObserver);
  var Expression = (function() {
    function Expression() {
      _classCallCheck(this, Expression);
      this.isChain = false;
      this.isAssignable = false;
    }
    Expression.prototype.evaluate = function evaluate(scope, lookupFunctions, args) {
      throw new Error('Binding expression "' + this + '" cannot be evaluated.');
    };
    Expression.prototype.assign = function assign(scope, value, lookupFunctions) {
      throw new Error('Binding expression "' + this + '" cannot be assigned to.');
    };
    Expression.prototype.toString = function toString() {
      return Unparser.unparse(this);
    };
    return Expression;
  })();
  exports.Expression = Expression;
  var Chain = (function(_Expression) {
    _inherits(Chain, _Expression);
    function Chain(expressions) {
      _classCallCheck(this, Chain);
      _Expression.call(this);
      this.expressions = expressions;
      this.isChain = true;
    }
    Chain.prototype.evaluate = function evaluate(scope, lookupFunctions) {
      var result,
          expressions = this.expressions,
          length = expressions.length,
          i,
          last;
      for (i = 0; i < length; ++i) {
        last = expressions[i].evaluate(scope, lookupFunctions);
        if (last !== null) {
          result = last;
        }
      }
      return result;
    };
    Chain.prototype.accept = function accept(visitor) {
      visitor.visitChain(this);
    };
    return Chain;
  })(Expression);
  exports.Chain = Chain;
  var BindingBehavior = (function(_Expression2) {
    _inherits(BindingBehavior, _Expression2);
    function BindingBehavior(expression, name, args) {
      _classCallCheck(this, BindingBehavior);
      _Expression2.call(this);
      this.expression = expression;
      this.name = name;
      this.args = args;
    }
    BindingBehavior.prototype.evaluate = function evaluate(scope, lookupFunctions) {
      return this.expression.evaluate(scope, lookupFunctions);
    };
    BindingBehavior.prototype.assign = function assign(scope, value, lookupFunctions) {
      return this.expression.assign(scope, value, lookupFunctions);
    };
    BindingBehavior.prototype.accept = function accept(visitor) {
      visitor.visitBindingBehavior(this);
    };
    BindingBehavior.prototype.connect = function connect(binding, scope) {
      this.expression.connect(binding, scope);
    };
    BindingBehavior.prototype.bind = function bind(binding, scope, lookupFunctions) {
      if (this.expression.expression && this.expression.bind) {
        this.expression.bind(binding, scope, lookupFunctions);
      }
      var behavior = lookupFunctions.bindingBehaviors(this.name);
      if (!behavior) {
        throw new Error('No BindingBehavior named "' + this.name + '" was found!');
      }
      var behaviorKey = 'behavior-' + this.name;
      if (binding[behaviorKey]) {
        throw new Error('A binding behavior named "' + this.name + '" has already been applied to "' + this.expression + '"');
      }
      binding[behaviorKey] = behavior;
      behavior.bind.apply(behavior, [binding, scope].concat(evalList(scope, this.args, binding.lookupFunctions)));
    };
    BindingBehavior.prototype.unbind = function unbind(binding, scope) {
      var behaviorKey = 'behavior-' + this.name;
      binding[behaviorKey].unbind(binding, scope);
      binding[behaviorKey] = null;
      if (this.expression.expression && this.expression.unbind) {
        this.expression.unbind(binding, scope);
      }
    };
    return BindingBehavior;
  })(Expression);
  exports.BindingBehavior = BindingBehavior;
  var ValueConverter = (function(_Expression3) {
    _inherits(ValueConverter, _Expression3);
    function ValueConverter(expression, name, args, allArgs) {
      _classCallCheck(this, ValueConverter);
      _Expression3.call(this);
      this.expression = expression;
      this.name = name;
      this.args = args;
      this.allArgs = allArgs;
    }
    ValueConverter.prototype.evaluate = function evaluate(scope, lookupFunctions) {
      var converter = lookupFunctions.valueConverters(this.name);
      if (!converter) {
        throw new Error('No ValueConverter named "' + this.name + '" was found!');
      }
      if ('toView' in converter) {
        return converter.toView.apply(converter, evalList(scope, this.allArgs, lookupFunctions));
      }
      return this.allArgs[0].evaluate(scope, lookupFunctions);
    };
    ValueConverter.prototype.assign = function assign(scope, value, lookupFunctions) {
      var converter = lookupFunctions.valueConverters(this.name);
      if (!converter) {
        throw new Error('No ValueConverter named "' + this.name + '" was found!');
      }
      if ('fromView' in converter) {
        value = converter.fromView.apply(converter, [value].concat(evalList(scope, this.args, lookupFunctions)));
      }
      return this.allArgs[0].assign(scope, value, lookupFunctions);
    };
    ValueConverter.prototype.accept = function accept(visitor) {
      visitor.visitValueConverter(this);
    };
    ValueConverter.prototype.connect = function connect(binding, scope) {
      var expressions = this.allArgs;
      var i = expressions.length;
      while (i--) {
        expressions[i].connect(binding, scope);
      }
    };
    return ValueConverter;
  })(Expression);
  exports.ValueConverter = ValueConverter;
  var Assign = (function(_Expression4) {
    _inherits(Assign, _Expression4);
    function Assign(target, value) {
      _classCallCheck(this, Assign);
      _Expression4.call(this);
      this.target = target;
      this.value = value;
    }
    Assign.prototype.evaluate = function evaluate(scope, lookupFunctions) {
      return this.target.assign(scope, this.value.evaluate(scope, lookupFunctions));
    };
    Assign.prototype.accept = function accept(vistor) {
      vistor.visitAssign(this);
    };
    Assign.prototype.connect = function connect(binding, scope) {};
    return Assign;
  })(Expression);
  exports.Assign = Assign;
  var Conditional = (function(_Expression5) {
    _inherits(Conditional, _Expression5);
    function Conditional(condition, yes, no) {
      _classCallCheck(this, Conditional);
      _Expression5.call(this);
      this.condition = condition;
      this.yes = yes;
      this.no = no;
    }
    Conditional.prototype.evaluate = function evaluate(scope, lookupFunctions) {
      return !!this.condition.evaluate(scope) ? this.yes.evaluate(scope) : this.no.evaluate(scope);
    };
    Conditional.prototype.accept = function accept(visitor) {
      visitor.visitConditional(this);
    };
    Conditional.prototype.connect = function connect(binding, scope) {
      this.condition.connect(binding, scope);
      if (this.condition.evaluate(scope)) {
        this.yes.connect(binding, scope);
      } else {
        this.no.connect(binding, scope);
      }
    };
    return Conditional;
  })(Expression);
  exports.Conditional = Conditional;
  var AccessThis = (function(_Expression6) {
    _inherits(AccessThis, _Expression6);
    function AccessThis(ancestor) {
      _classCallCheck(this, AccessThis);
      _Expression6.call(this);
      this.ancestor = ancestor;
    }
    AccessThis.prototype.evaluate = function evaluate(scope, lookupFunctions) {
      var oc = scope.overrideContext;
      var i = this.ancestor;
      while (i-- && oc) {
        oc = oc.parentOverrideContext;
      }
      return i < 1 && oc ? oc.bindingContext : undefined;
    };
    AccessThis.prototype.accept = function accept(visitor) {
      visitor.visitAccessThis(this);
    };
    AccessThis.prototype.connect = function connect(binding, scope) {};
    return AccessThis;
  })(Expression);
  exports.AccessThis = AccessThis;
  var AccessScope = (function(_Expression7) {
    _inherits(AccessScope, _Expression7);
    function AccessScope(name, ancestor) {
      _classCallCheck(this, AccessScope);
      _Expression7.call(this);
      this.name = name;
      this.ancestor = ancestor;
      this.isAssignable = true;
    }
    AccessScope.prototype.evaluate = function evaluate(scope, lookupFunctions) {
      var context = getContextFor(this.name, scope, this.ancestor);
      return context[this.name];
    };
    AccessScope.prototype.assign = function assign(scope, value) {
      var context = getContextFor(this.name, scope, this.ancestor);
      return context ? context[this.name] = value : undefined;
    };
    AccessScope.prototype.accept = function accept(visitor) {
      visitor.visitAccessScope(this);
    };
    AccessScope.prototype.connect = function connect(binding, scope) {
      var context = getContextFor(this.name, scope, this.ancestor);
      binding.observeProperty(context, this.name);
    };
    return AccessScope;
  })(Expression);
  exports.AccessScope = AccessScope;
  var AccessMember = (function(_Expression8) {
    _inherits(AccessMember, _Expression8);
    function AccessMember(object, name) {
      _classCallCheck(this, AccessMember);
      _Expression8.call(this);
      this.object = object;
      this.name = name;
      this.isAssignable = true;
    }
    AccessMember.prototype.evaluate = function evaluate(scope, lookupFunctions) {
      var instance = this.object.evaluate(scope, lookupFunctions);
      return instance === null || instance === undefined ? instance : instance[this.name];
    };
    AccessMember.prototype.assign = function assign(scope, value) {
      var instance = this.object.evaluate(scope);
      if (instance === null || instance === undefined) {
        instance = {};
        this.object.assign(scope, instance);
      }
      return instance[this.name] = value;
    };
    AccessMember.prototype.accept = function accept(visitor) {
      visitor.visitAccessMember(this);
    };
    AccessMember.prototype.connect = function connect(binding, scope) {
      this.object.connect(binding, scope);
      var obj = this.object.evaluate(scope);
      if (obj) {
        binding.observeProperty(obj, this.name);
      }
    };
    return AccessMember;
  })(Expression);
  exports.AccessMember = AccessMember;
  var AccessKeyed = (function(_Expression9) {
    _inherits(AccessKeyed, _Expression9);
    function AccessKeyed(object, key) {
      _classCallCheck(this, AccessKeyed);
      _Expression9.call(this);
      this.object = object;
      this.key = key;
      this.isAssignable = true;
    }
    AccessKeyed.prototype.evaluate = function evaluate(scope, lookupFunctions) {
      var instance = this.object.evaluate(scope, lookupFunctions);
      var lookup = this.key.evaluate(scope, lookupFunctions);
      return getKeyed(instance, lookup);
    };
    AccessKeyed.prototype.assign = function assign(scope, value) {
      var instance = this.object.evaluate(scope);
      var lookup = this.key.evaluate(scope);
      return setKeyed(instance, lookup, value);
    };
    AccessKeyed.prototype.accept = function accept(visitor) {
      visitor.visitAccessKeyed(this);
    };
    AccessKeyed.prototype.connect = function connect(binding, scope) {
      this.object.connect(binding, scope);
      var obj = this.object.evaluate(scope);
      if (obj instanceof Object) {
        this.key.connect(binding, scope);
        var key = this.key.evaluate(scope);
        if (key !== null && key !== undefined && !(Array.isArray(obj) && typeof key === 'number')) {
          binding.observeProperty(obj, key);
        }
      }
    };
    return AccessKeyed;
  })(Expression);
  exports.AccessKeyed = AccessKeyed;
  var CallScope = (function(_Expression10) {
    _inherits(CallScope, _Expression10);
    function CallScope(name, args, ancestor) {
      _classCallCheck(this, CallScope);
      _Expression10.call(this);
      this.name = name;
      this.args = args;
      this.ancestor = ancestor;
    }
    CallScope.prototype.evaluate = function evaluate(scope, lookupFunctions, mustEvaluate) {
      var args = evalList(scope, this.args, lookupFunctions);
      var context = getContextFor(this.name, scope, this.ancestor);
      var func = getFunction(context, this.name, mustEvaluate);
      if (func) {
        return func.apply(context, args);
      }
      return undefined;
    };
    CallScope.prototype.accept = function accept(visitor) {
      visitor.visitCallScope(this);
    };
    CallScope.prototype.connect = function connect(binding, scope) {
      var args = this.args;
      var i = args.length;
      while (i--) {
        args[i].connect(binding, scope);
      }
    };
    return CallScope;
  })(Expression);
  exports.CallScope = CallScope;
  var CallMember = (function(_Expression11) {
    _inherits(CallMember, _Expression11);
    function CallMember(object, name, args) {
      _classCallCheck(this, CallMember);
      _Expression11.call(this);
      this.object = object;
      this.name = name;
      this.args = args;
    }
    CallMember.prototype.evaluate = function evaluate(scope, lookupFunctions, mustEvaluate) {
      var instance = this.object.evaluate(scope, lookupFunctions);
      var args = evalList(scope, this.args, lookupFunctions);
      var func = getFunction(instance, this.name, mustEvaluate);
      if (func) {
        return func.apply(instance, args);
      }
      return undefined;
    };
    CallMember.prototype.accept = function accept(visitor) {
      visitor.visitCallMember(this);
    };
    CallMember.prototype.connect = function connect(binding, scope) {
      this.object.connect(binding, scope);
      var obj = this.object.evaluate(scope);
      if (getFunction(obj, this.name, false)) {
        var args = this.args;
        var i = args.length;
        while (i--) {
          args[i].connect(binding, scope);
        }
      }
    };
    return CallMember;
  })(Expression);
  exports.CallMember = CallMember;
  var CallFunction = (function(_Expression12) {
    _inherits(CallFunction, _Expression12);
    function CallFunction(func, args) {
      _classCallCheck(this, CallFunction);
      _Expression12.call(this);
      this.func = func;
      this.args = args;
    }
    CallFunction.prototype.evaluate = function evaluate(scope, lookupFunctions, mustEvaluate) {
      var func = this.func.evaluate(scope, lookupFunctions);
      if (typeof func === 'function') {
        return func.apply(null, evalList(scope, this.args, lookupFunctions));
      }
      if (!mustEvaluate && (func === null || func === undefined)) {
        return undefined;
      }
      throw new Error(this.func + ' is not a function');
    };
    CallFunction.prototype.accept = function accept(visitor) {
      visitor.visitCallFunction(this);
    };
    CallFunction.prototype.connect = function connect(binding, scope) {
      this.func.connect(binding, scope);
      var func = this.func.evaluate(scope);
      if (typeof func === 'function') {
        var args = this.args;
        var i = args.length;
        while (i--) {
          args[i].connect(binding, scope);
        }
      }
    };
    return CallFunction;
  })(Expression);
  exports.CallFunction = CallFunction;
  var Binary = (function(_Expression13) {
    _inherits(Binary, _Expression13);
    function Binary(operation, left, right) {
      _classCallCheck(this, Binary);
      _Expression13.call(this);
      this.operation = operation;
      this.left = left;
      this.right = right;
    }
    Binary.prototype.evaluate = function evaluate(scope, lookupFunctions) {
      var left = this.left.evaluate(scope);
      switch (this.operation) {
        case '&&':
          return left && this.right.evaluate(scope);
        case '||':
          return left || this.right.evaluate(scope);
      }
      var right = this.right.evaluate(scope);
      switch (this.operation) {
        case '==':
          return left == right;
        case '===':
          return left === right;
        case '!=':
          return left != right;
        case '!==':
          return left !== right;
      }
      if (left === null || right === null) {
        switch (this.operation) {
          case '+':
            if (left != null)
              return left;
            if (right != null)
              return right;
            return 0;
          case '-':
            if (left != null)
              return left;
            if (right != null)
              return 0 - right;
            return 0;
        }
        return null;
      }
      switch (this.operation) {
        case '+':
          return autoConvertAdd(left, right);
        case '-':
          return left - right;
        case '*':
          return left * right;
        case '/':
          return left / right;
        case '%':
          return left % right;
        case '<':
          return left < right;
        case '>':
          return left > right;
        case '<=':
          return left <= right;
        case '>=':
          return left >= right;
        case '^':
          return left ^ right;
      }
      throw new Error('Internal error [' + this.operation + '] not handled');
    };
    Binary.prototype.accept = function accept(visitor) {
      visitor.visitBinary(this);
    };
    Binary.prototype.connect = function connect(binding, scope) {
      this.left.connect(binding, scope);
      var left = this.left.evaluate(scope);
      if (this.operation === '&&' && !left || this.operation === '||' && left) {
        return;
      }
      this.right.connect(binding, scope);
    };
    return Binary;
  })(Expression);
  exports.Binary = Binary;
  var PrefixNot = (function(_Expression14) {
    _inherits(PrefixNot, _Expression14);
    function PrefixNot(operation, expression) {
      _classCallCheck(this, PrefixNot);
      _Expression14.call(this);
      this.operation = operation;
      this.expression = expression;
    }
    PrefixNot.prototype.evaluate = function evaluate(scope, lookupFunctions) {
      return !this.expression.evaluate(scope);
    };
    PrefixNot.prototype.accept = function accept(visitor) {
      visitor.visitPrefix(this);
    };
    PrefixNot.prototype.connect = function connect(binding, scope) {
      this.expression.connect(binding, scope);
    };
    return PrefixNot;
  })(Expression);
  exports.PrefixNot = PrefixNot;
  var LiteralPrimitive = (function(_Expression15) {
    _inherits(LiteralPrimitive, _Expression15);
    function LiteralPrimitive(value) {
      _classCallCheck(this, LiteralPrimitive);
      _Expression15.call(this);
      this.value = value;
    }
    LiteralPrimitive.prototype.evaluate = function evaluate(scope, lookupFunctions) {
      return this.value;
    };
    LiteralPrimitive.prototype.accept = function accept(visitor) {
      visitor.visitLiteralPrimitive(this);
    };
    LiteralPrimitive.prototype.connect = function connect(binding, scope) {};
    return LiteralPrimitive;
  })(Expression);
  exports.LiteralPrimitive = LiteralPrimitive;
  var LiteralString = (function(_Expression16) {
    _inherits(LiteralString, _Expression16);
    function LiteralString(value) {
      _classCallCheck(this, LiteralString);
      _Expression16.call(this);
      this.value = value;
    }
    LiteralString.prototype.evaluate = function evaluate(scope, lookupFunctions) {
      return this.value;
    };
    LiteralString.prototype.accept = function accept(visitor) {
      visitor.visitLiteralString(this);
    };
    LiteralString.prototype.connect = function connect(binding, scope) {};
    return LiteralString;
  })(Expression);
  exports.LiteralString = LiteralString;
  var LiteralArray = (function(_Expression17) {
    _inherits(LiteralArray, _Expression17);
    function LiteralArray(elements) {
      _classCallCheck(this, LiteralArray);
      _Expression17.call(this);
      this.elements = elements;
    }
    LiteralArray.prototype.evaluate = function evaluate(scope, lookupFunctions) {
      var elements = this.elements,
          length = elements.length,
          result = [],
          i;
      for (i = 0; i < length; ++i) {
        result[i] = elements[i].evaluate(scope, lookupFunctions);
      }
      return result;
    };
    LiteralArray.prototype.accept = function accept(visitor) {
      visitor.visitLiteralArray(this);
    };
    LiteralArray.prototype.connect = function connect(binding, scope) {
      var length = this.elements.length;
      for (var i = 0; i < length; i++) {
        this.elements[i].connect(binding, scope);
      }
    };
    return LiteralArray;
  })(Expression);
  exports.LiteralArray = LiteralArray;
  var LiteralObject = (function(_Expression18) {
    _inherits(LiteralObject, _Expression18);
    function LiteralObject(keys, values) {
      _classCallCheck(this, LiteralObject);
      _Expression18.call(this);
      this.keys = keys;
      this.values = values;
    }
    LiteralObject.prototype.evaluate = function evaluate(scope, lookupFunctions) {
      var instance = {},
          keys = this.keys,
          values = this.values,
          length = keys.length,
          i;
      for (i = 0; i < length; ++i) {
        instance[keys[i]] = values[i].evaluate(scope, lookupFunctions);
      }
      return instance;
    };
    LiteralObject.prototype.accept = function accept(visitor) {
      visitor.visitLiteralObject(this);
    };
    LiteralObject.prototype.connect = function connect(binding, scope) {
      var length = this.keys.length;
      for (var i = 0; i < length; i++) {
        this.values[i].connect(binding, scope);
      }
    };
    return LiteralObject;
  })(Expression);
  exports.LiteralObject = LiteralObject;
  var Unparser = (function() {
    function Unparser(buffer) {
      _classCallCheck(this, Unparser);
      this.buffer = buffer;
    }
    Unparser.unparse = function unparse(expression) {
      var buffer = [],
          visitor = new Unparser(buffer);
      expression.accept(visitor);
      return buffer.join('');
    };
    Unparser.prototype.write = function write(text) {
      this.buffer.push(text);
    };
    Unparser.prototype.writeArgs = function writeArgs(args) {
      var i,
          length;
      this.write('(');
      for (i = 0, length = args.length; i < length; ++i) {
        if (i !== 0) {
          this.write(',');
        }
        args[i].accept(this);
      }
      this.write(')');
    };
    Unparser.prototype.visitChain = function visitChain(chain) {
      var expressions = chain.expressions,
          length = expressions.length,
          i;
      for (i = 0; i < length; ++i) {
        if (i !== 0) {
          this.write(';');
        }
        expressions[i].accept(this);
      }
    };
    Unparser.prototype.visitBindingBehavior = function visitBindingBehavior(behavior) {
      var args = behavior.args,
          length = args.length,
          i;
      this.write('(');
      behavior.expression.accept(this);
      this.write('&' + behavior.name);
      for (i = 0; i < length; ++i) {
        this.write(' :');
        args[i].accept(this);
      }
      this.write(')');
    };
    Unparser.prototype.visitValueConverter = function visitValueConverter(converter) {
      var args = converter.args,
          length = args.length,
          i;
      this.write('(');
      converter.expression.accept(this);
      this.write('|' + converter.name);
      for (i = 0; i < length; ++i) {
        this.write(' :');
        args[i].accept(this);
      }
      this.write(')');
    };
    Unparser.prototype.visitAssign = function visitAssign(assign) {
      assign.target.accept(this);
      this.write('=');
      assign.value.accept(this);
    };
    Unparser.prototype.visitConditional = function visitConditional(conditional) {
      conditional.condition.accept(this);
      this.write('?');
      conditional.yes.accept(this);
      this.write(':');
      conditional.no.accept(this);
    };
    Unparser.prototype.visitAccessThis = function visitAccessThis(access) {
      if (access.ancestor === 0) {
        this.write('$this');
        return;
      }
      this.write('$parent');
      var i = access.ancestor - 1;
      while (i--) {
        this.write('.$parent');
      }
    };
    Unparser.prototype.visitAccessScope = function visitAccessScope(access) {
      var i = access.ancestor;
      while (i--) {
        this.write('$parent.');
      }
      this.write(access.name);
    };
    Unparser.prototype.visitAccessMember = function visitAccessMember(access) {
      access.object.accept(this);
      this.write('.' + access.name);
    };
    Unparser.prototype.visitAccessKeyed = function visitAccessKeyed(access) {
      access.object.accept(this);
      this.write('[');
      access.key.accept(this);
      this.write(']');
    };
    Unparser.prototype.visitCallScope = function visitCallScope(call) {
      var i = call.ancestor;
      while (i--) {
        this.write('$parent.');
      }
      this.write(call.name);
      this.writeArgs(call.args);
    };
    Unparser.prototype.visitCallFunction = function visitCallFunction(call) {
      call.func.accept(this);
      this.writeArgs(call.args);
    };
    Unparser.prototype.visitCallMember = function visitCallMember(call) {
      call.object.accept(this);
      this.write('.' + call.name);
      this.writeArgs(call.args);
    };
    Unparser.prototype.visitPrefix = function visitPrefix(prefix) {
      this.write('(' + prefix.operation);
      prefix.expression.accept(this);
      this.write(')');
    };
    Unparser.prototype.visitBinary = function visitBinary(binary) {
      this.write('(');
      binary.left.accept(this);
      this.write(binary.operation);
      binary.right.accept(this);
      this.write(')');
    };
    Unparser.prototype.visitLiteralPrimitive = function visitLiteralPrimitive(literal) {
      this.write('' + literal.value);
    };
    Unparser.prototype.visitLiteralArray = function visitLiteralArray(literal) {
      var elements = literal.elements,
          length = elements.length,
          i;
      this.write('[');
      for (i = 0; i < length; ++i) {
        if (i !== 0) {
          this.write(',');
        }
        elements[i].accept(this);
      }
      this.write(']');
    };
    Unparser.prototype.visitLiteralObject = function visitLiteralObject(literal) {
      var keys = literal.keys,
          values = literal.values,
          length = keys.length,
          i;
      this.write('{');
      for (i = 0; i < length; ++i) {
        if (i !== 0) {
          this.write(',');
        }
        this.write('\'' + keys[i] + '\':');
        values[i].accept(this);
      }
      this.write('}');
    };
    Unparser.prototype.visitLiteralString = function visitLiteralString(literal) {
      var escaped = literal.value.replace(/'/g, "\'");
      this.write('\'' + escaped + '\'');
    };
    return Unparser;
  })();
  exports.Unparser = Unparser;
  var evalListCache = [[], [0], [0, 0], [0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0, 0]];
  function evalList(scope, list, lookupFunctions) {
    var length = list.length,
        cacheLength,
        i;
    for (cacheLength = evalListCache.length; cacheLength <= length; ++cacheLength) {
      evalListCache.push([]);
    }
    var result = evalListCache[length];
    for (i = 0; i < length; ++i) {
      result[i] = list[i].evaluate(scope, lookupFunctions);
    }
    return result;
  }
  function autoConvertAdd(a, b) {
    if (a != null && b != null) {
      if (typeof a == 'string' && typeof b != 'string') {
        return a + b.toString();
      }
      if (typeof a != 'string' && typeof b == 'string') {
        return a.toString() + b;
      }
      return a + b;
    }
    if (a != null) {
      return a;
    }
    if (b != null) {
      return b;
    }
    return 0;
  }
  function getFunction(obj, name, mustExist) {
    var func = obj === null || obj === undefined ? null : obj[name];
    if (typeof func === 'function') {
      return func;
    }
    if (!mustExist && (func === null || func === undefined)) {
      return null;
    }
    throw new Error(name + ' is not a function');
  }
  function getKeyed(obj, key) {
    if (Array.isArray(obj)) {
      return obj[parseInt(key)];
    } else if (obj) {
      return obj[key];
    } else if (obj === null || obj === undefined) {
      return undefined;
    } else {
      return obj[key];
    }
  }
  function setKeyed(obj, key, value) {
    if (Array.isArray(obj)) {
      var index = parseInt(key);
      if (obj.length <= index) {
        obj.length = index + 1;
      }
      obj[index] = value;
    } else {
      obj[key] = value;
    }
    return value;
  }
  var bindingMode = {
    oneTime: 0,
    oneWay: 1,
    twoWay: 2
  };
  exports.bindingMode = bindingMode;
  var Token = (function() {
    function Token(index, text) {
      _classCallCheck(this, Token);
      this.index = index;
      this.text = text;
    }
    Token.prototype.withOp = function withOp(op) {
      this.opKey = op;
      return this;
    };
    Token.prototype.withGetterSetter = function withGetterSetter(key) {
      this.key = key;
      return this;
    };
    Token.prototype.withValue = function withValue(value) {
      this.value = value;
      return this;
    };
    Token.prototype.toString = function toString() {
      return 'Token(' + this.text + ')';
    };
    return Token;
  })();
  exports.Token = Token;
  var Lexer = (function() {
    function Lexer() {
      _classCallCheck(this, Lexer);
    }
    Lexer.prototype.lex = function lex(text) {
      var scanner = new Scanner(text);
      var tokens = [];
      var token = scanner.scanToken();
      while (token) {
        tokens.push(token);
        token = scanner.scanToken();
      }
      return tokens;
    };
    return Lexer;
  })();
  exports.Lexer = Lexer;
  var Scanner = (function() {
    function Scanner(input) {
      _classCallCheck(this, Scanner);
      this.input = input;
      this.length = input.length;
      this.peek = 0;
      this.index = -1;
      this.advance();
    }
    Scanner.prototype.scanToken = function scanToken() {
      while (this.peek <= $SPACE) {
        if (++this.index >= this.length) {
          this.peek = $EOF;
          return null;
        } else {
          this.peek = this.input.charCodeAt(this.index);
        }
      }
      if (isIdentifierStart(this.peek)) {
        return this.scanIdentifier();
      }
      if (isDigit(this.peek)) {
        return this.scanNumber(this.index);
      }
      var start = this.index;
      switch (this.peek) {
        case $PERIOD:
          this.advance();
          return isDigit(this.peek) ? this.scanNumber(start) : new Token(start, '.');
        case $LPAREN:
        case $RPAREN:
        case $LBRACE:
        case $RBRACE:
        case $LBRACKET:
        case $RBRACKET:
        case $COMMA:
        case $COLON:
        case $SEMICOLON:
          return this.scanCharacter(start, String.fromCharCode(this.peek));
        case $SQ:
        case $DQ:
          return this.scanString();
        case $PLUS:
        case $MINUS:
        case $STAR:
        case $SLASH:
        case $PERCENT:
        case $CARET:
        case $QUESTION:
          return this.scanOperator(start, String.fromCharCode(this.peek));
        case $LT:
        case $GT:
        case $BANG:
        case $EQ:
          return this.scanComplexOperator(start, $EQ, String.fromCharCode(this.peek), '=');
        case $AMPERSAND:
          return this.scanComplexOperator(start, $AMPERSAND, '&', '&');
        case $BAR:
          return this.scanComplexOperator(start, $BAR, '|', '|');
        case $NBSP:
          while (isWhitespace(this.peek)) {
            this.advance();
          }
          return this.scanToken();
      }
      var character = String.fromCharCode(this.peek);
      this.error('Unexpected character [' + character + ']');
      return null;
    };
    Scanner.prototype.scanCharacter = function scanCharacter(start, text) {
      assert(this.peek === text.charCodeAt(0));
      this.advance();
      return new Token(start, text);
    };
    Scanner.prototype.scanOperator = function scanOperator(start, text) {
      assert(this.peek === text.charCodeAt(0));
      assert(OPERATORS.indexOf(text) !== -1);
      this.advance();
      return new Token(start, text).withOp(text);
    };
    Scanner.prototype.scanComplexOperator = function scanComplexOperator(start, code, one, two) {
      assert(this.peek === one.charCodeAt(0));
      this.advance();
      var text = one;
      if (this.peek === code) {
        this.advance();
        text += two;
      }
      if (this.peek === code) {
        this.advance();
        text += two;
      }
      assert(OPERATORS.indexOf(text) != -1);
      return new Token(start, text).withOp(text);
    };
    Scanner.prototype.scanIdentifier = function scanIdentifier() {
      assert(isIdentifierStart(this.peek));
      var start = this.index;
      this.advance();
      while (isIdentifierPart(this.peek)) {
        this.advance();
      }
      var text = this.input.substring(start, this.index);
      var result = new Token(start, text);
      if (OPERATORS.indexOf(text) !== -1) {
        result.withOp(text);
      } else {
        result.withGetterSetter(text);
      }
      return result;
    };
    Scanner.prototype.scanNumber = function scanNumber(start) {
      assert(isDigit(this.peek));
      var simple = this.index === start;
      this.advance();
      while (true) {
        if (isDigit(this.peek)) {} else if (this.peek === $PERIOD) {
          simple = false;
        } else if (isExponentStart(this.peek)) {
          this.advance();
          if (isExponentSign(this.peek)) {
            this.advance();
          }
          if (!isDigit(this.peek)) {
            this.error('Invalid exponent', -1);
          }
          simple = false;
        } else {
          break;
        }
        this.advance();
      }
      var text = this.input.substring(start, this.index);
      var value = simple ? parseInt(text) : parseFloat(text);
      return new Token(start, text).withValue(value);
    };
    Scanner.prototype.scanString = function scanString() {
      assert(this.peek === $SQ || this.peek === $DQ);
      var start = this.index;
      var quote = this.peek;
      this.advance();
      var buffer = undefined;
      var marker = this.index;
      while (this.peek !== quote) {
        if (this.peek === $BACKSLASH) {
          if (!buffer) {
            buffer = [];
          }
          buffer.push(this.input.substring(marker, this.index));
          this.advance();
          var _unescaped = undefined;
          if (this.peek === $u) {
            var hex = this.input.substring(this.index + 1, this.index + 5);
            if (!/[A-Z0-9]{4}/.test(hex)) {
              this.error('Invalid unicode escape [\\u' + hex + ']');
            }
            _unescaped = parseInt(hex, 16);
            for (var i = 0; i < 5; ++i) {
              this.advance();
            }
          } else {
            _unescaped = unescape(this.peek);
            this.advance();
          }
          buffer.push(String.fromCharCode(_unescaped));
          marker = this.index;
        } else if (this.peek === $EOF) {
          this.error('Unterminated quote');
        } else {
          this.advance();
        }
      }
      var last = this.input.substring(marker, this.index);
      this.advance();
      var text = this.input.substring(start, this.index);
      var unescaped = last;
      if (buffer != null) {
        buffer.push(last);
        unescaped = buffer.join('');
      }
      return new Token(start, text).withValue(unescaped);
    };
    Scanner.prototype.advance = function advance() {
      if (++this.index >= this.length) {
        this.peek = $EOF;
      } else {
        this.peek = this.input.charCodeAt(this.index);
      }
    };
    Scanner.prototype.error = function error(message) {
      var offset = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var position = this.index + offset;
      throw new Error('Lexer Error: ' + message + ' at column ' + position + ' in expression [' + this.input + ']');
    };
    return Scanner;
  })();
  exports.Scanner = Scanner;
  var OPERATORS = ['undefined', 'null', 'true', 'false', '+', '-', '*', '/', '%', '^', '=', '==', '===', '!=', '!==', '<', '>', '<=', '>=', '&&', '||', '&', '|', '!', '?'];
  var $EOF = 0;
  var $TAB = 9;
  var $LF = 10;
  var $VTAB = 11;
  var $FF = 12;
  var $CR = 13;
  var $SPACE = 32;
  var $BANG = 33;
  var $DQ = 34;
  var $$ = 36;
  var $PERCENT = 37;
  var $AMPERSAND = 38;
  var $SQ = 39;
  var $LPAREN = 40;
  var $RPAREN = 41;
  var $STAR = 42;
  var $PLUS = 43;
  var $COMMA = 44;
  var $MINUS = 45;
  var $PERIOD = 46;
  var $SLASH = 47;
  var $COLON = 58;
  var $SEMICOLON = 59;
  var $LT = 60;
  var $EQ = 61;
  var $GT = 62;
  var $QUESTION = 63;
  var $0 = 48;
  var $9 = 57;
  var $A = 65;
  var $E = 69;
  var $Z = 90;
  var $LBRACKET = 91;
  var $BACKSLASH = 92;
  var $RBRACKET = 93;
  var $CARET = 94;
  var $_ = 95;
  var $a = 97;
  var $e = 101;
  var $f = 102;
  var $n = 110;
  var $r = 114;
  var $t = 116;
  var $u = 117;
  var $v = 118;
  var $z = 122;
  var $LBRACE = 123;
  var $BAR = 124;
  var $RBRACE = 125;
  var $NBSP = 160;
  function isWhitespace(code) {
    return code >= $TAB && code <= $SPACE || code === $NBSP;
  }
  function isIdentifierStart(code) {
    return $a <= code && code <= $z || $A <= code && code <= $Z || code === $_ || code === $$;
  }
  function isIdentifierPart(code) {
    return $a <= code && code <= $z || $A <= code && code <= $Z || $0 <= code && code <= $9 || code === $_ || code === $$;
  }
  function isDigit(code) {
    return $0 <= code && code <= $9;
  }
  function isExponentStart(code) {
    return code === $e || code === $E;
  }
  function isExponentSign(code) {
    return code === $MINUS || code === $PLUS;
  }
  function unescape(code) {
    switch (code) {
      case $n:
        return $LF;
      case $f:
        return $FF;
      case $r:
        return $CR;
      case $t:
        return $TAB;
      case $v:
        return $VTAB;
      default:
        return code;
    }
  }
  function assert(condition, message) {
    if (!condition) {
      throw message || "Assertion failed";
    }
  }
  var EOF = new Token(-1, null);
  var Parser = (function() {
    function Parser() {
      _classCallCheck(this, Parser);
      this.cache = {};
      this.lexer = new Lexer();
    }
    Parser.prototype.parse = function parse(input) {
      input = input || '';
      return this.cache[input] || (this.cache[input] = new ParserImplementation(this.lexer, input).parseChain());
    };
    return Parser;
  })();
  exports.Parser = Parser;
  var ParserImplementation = (function() {
    function ParserImplementation(lexer, input) {
      _classCallCheck(this, ParserImplementation);
      this.index = 0;
      this.input = input;
      this.tokens = lexer.lex(input);
    }
    ParserImplementation.prototype.parseChain = function parseChain() {
      var isChain = false;
      var expressions = [];
      while (this.optional(';')) {
        isChain = true;
      }
      while (this.index < this.tokens.length) {
        if (this.peek.text === ')' || this.peek.text === '}' || this.peek.text === ']') {
          this.error('Unconsumed token ' + this.peek.text);
        }
        var expr = this.parseBindingBehavior();
        expressions.push(expr);
        while (this.optional(';')) {
          isChain = true;
        }
        if (isChain) {
          this.error('Multiple expressions are not allowed.');
        }
      }
      return expressions.length === 1 ? expressions[0] : new Chain(expressions);
    };
    ParserImplementation.prototype.parseBindingBehavior = function parseBindingBehavior() {
      var result = this.parseValueConverter();
      while (this.optional('&')) {
        var _name = this.peek.text;
        var args = [];
        this.advance();
        while (this.optional(':')) {
          args.push(this.parseExpression());
        }
        result = new BindingBehavior(result, _name, args);
      }
      return result;
    };
    ParserImplementation.prototype.parseValueConverter = function parseValueConverter() {
      var result = this.parseExpression();
      while (this.optional('|')) {
        var _name2 = this.peek.text;
        var args = [];
        this.advance();
        while (this.optional(':')) {
          args.push(this.parseExpression());
        }
        result = new ValueConverter(result, _name2, args, [result].concat(args));
      }
      return result;
    };
    ParserImplementation.prototype.parseExpression = function parseExpression() {
      var start = this.peek.index;
      var result = this.parseConditional();
      while (this.peek.text === '=') {
        if (!result.isAssignable) {
          var end = this.index < this.tokens.length ? this.peek.index : this.input.length;
          var expression = this.input.substring(start, end);
          this.error('Expression ' + expression + ' is not assignable');
        }
        this.expect('=');
        result = new Assign(result, this.parseConditional());
      }
      return result;
    };
    ParserImplementation.prototype.parseConditional = function parseConditional() {
      var start = this.peek.index;
      var result = this.parseLogicalOr();
      if (this.optional('?')) {
        var yes = this.parseExpression();
        if (!this.optional(':')) {
          var end = this.index < this.tokens.length ? this.peek.index : this.input.length;
          var expression = this.input.substring(start, end);
          this.error('Conditional expression ' + expression + ' requires all 3 expressions');
        }
        var no = this.parseExpression();
        result = new Conditional(result, yes, no);
      }
      return result;
    };
    ParserImplementation.prototype.parseLogicalOr = function parseLogicalOr() {
      var result = this.parseLogicalAnd();
      while (this.optional('||')) {
        result = new Binary('||', result, this.parseLogicalAnd());
      }
      return result;
    };
    ParserImplementation.prototype.parseLogicalAnd = function parseLogicalAnd() {
      var result = this.parseEquality();
      while (this.optional('&&')) {
        result = new Binary('&&', result, this.parseEquality());
      }
      return result;
    };
    ParserImplementation.prototype.parseEquality = function parseEquality() {
      var result = this.parseRelational();
      while (true) {
        if (this.optional('==')) {
          result = new Binary('==', result, this.parseRelational());
        } else if (this.optional('!=')) {
          result = new Binary('!=', result, this.parseRelational());
        } else if (this.optional('===')) {
          result = new Binary('===', result, this.parseRelational());
        } else if (this.optional('!==')) {
          result = new Binary('!==', result, this.parseRelational());
        } else {
          return result;
        }
      }
    };
    ParserImplementation.prototype.parseRelational = function parseRelational() {
      var result = this.parseAdditive();
      while (true) {
        if (this.optional('<')) {
          result = new Binary('<', result, this.parseAdditive());
        } else if (this.optional('>')) {
          result = new Binary('>', result, this.parseAdditive());
        } else if (this.optional('<=')) {
          result = new Binary('<=', result, this.parseAdditive());
        } else if (this.optional('>=')) {
          result = new Binary('>=', result, this.parseAdditive());
        } else {
          return result;
        }
      }
    };
    ParserImplementation.prototype.parseAdditive = function parseAdditive() {
      var result = this.parseMultiplicative();
      while (true) {
        if (this.optional('+')) {
          result = new Binary('+', result, this.parseMultiplicative());
        } else if (this.optional('-')) {
          result = new Binary('-', result, this.parseMultiplicative());
        } else {
          return result;
        }
      }
    };
    ParserImplementation.prototype.parseMultiplicative = function parseMultiplicative() {
      var result = this.parsePrefix();
      while (true) {
        if (this.optional('*')) {
          result = new Binary('*', result, this.parsePrefix());
        } else if (this.optional('%')) {
          result = new Binary('%', result, this.parsePrefix());
        } else if (this.optional('/')) {
          result = new Binary('/', result, this.parsePrefix());
        } else {
          return result;
        }
      }
    };
    ParserImplementation.prototype.parsePrefix = function parsePrefix() {
      if (this.optional('+')) {
        return this.parsePrefix();
      } else if (this.optional('-')) {
        return new Binary('-', new LiteralPrimitive(0), this.parsePrefix());
      } else if (this.optional('!')) {
        return new PrefixNot('!', this.parsePrefix());
      } else {
        return this.parseAccessOrCallMember();
      }
    };
    ParserImplementation.prototype.parseAccessOrCallMember = function parseAccessOrCallMember() {
      var result = this.parsePrimary();
      while (true) {
        if (this.optional('.')) {
          var _name3 = this.peek.text;
          this.advance();
          if (this.optional('(')) {
            var args = this.parseExpressionList(')');
            this.expect(')');
            if (result instanceof AccessThis) {
              result = new CallScope(_name3, args, result.ancestor);
            } else {
              result = new CallMember(result, _name3, args);
            }
          } else {
            if (result instanceof AccessThis) {
              result = new AccessScope(_name3, result.ancestor);
            } else {
              result = new AccessMember(result, _name3);
            }
          }
        } else if (this.optional('[')) {
          var key = this.parseExpression();
          this.expect(']');
          result = new AccessKeyed(result, key);
        } else if (this.optional('(')) {
          var args = this.parseExpressionList(')');
          this.expect(')');
          result = new CallFunction(result, args);
        } else {
          return result;
        }
      }
    };
    ParserImplementation.prototype.parsePrimary = function parsePrimary() {
      if (this.optional('(')) {
        var result = this.parseExpression();
        this.expect(')');
        return result;
      } else if (this.optional('null')) {
        return new LiteralPrimitive(null);
      } else if (this.optional('undefined')) {
        return new LiteralPrimitive(undefined);
      } else if (this.optional('true')) {
        return new LiteralPrimitive(true);
      } else if (this.optional('false')) {
        return new LiteralPrimitive(false);
      } else if (this.optional('[')) {
        var _elements = this.parseExpressionList(']');
        this.expect(']');
        return new LiteralArray(_elements);
      } else if (this.peek.text == '{') {
        return this.parseObject();
      } else if (this.peek.key != null) {
        return this.parseAccessOrCallScope();
      } else if (this.peek.value != null) {
        var value = this.peek.value;
        this.advance();
        return value instanceof String || typeof value === 'string' ? new LiteralString(value) : new LiteralPrimitive(value);
      } else if (this.index >= this.tokens.length) {
        throw new Error('Unexpected end of expression: ' + this.input);
      } else {
        this.error('Unexpected token ' + this.peek.text);
      }
    };
    ParserImplementation.prototype.parseAccessOrCallScope = function parseAccessOrCallScope() {
      var name = this.peek.key;
      this.advance();
      if (name === '$this') {
        return new AccessThis(0);
      }
      var ancestor = 0;
      while (name === '$parent') {
        ancestor++;
        if (this.optional('.')) {
          name = this.peek.key;
          this.advance();
        } else if (this.peek === EOF || this.peek.text === '(' || this.peek.text === '[' || this.peek.text === '}') {
          return new AccessThis(ancestor);
        } else {
          this.error('Unexpected token ' + this.peek.text);
        }
      }
      if (this.optional('(')) {
        var args = this.parseExpressionList(')');
        this.expect(')');
        return new CallScope(name, args, ancestor);
      }
      return new AccessScope(name, ancestor);
    };
    ParserImplementation.prototype.parseObject = function parseObject() {
      var keys = [];
      var values = [];
      this.expect('{');
      if (this.peek.text !== '}') {
        do {
          var peek = this.peek;
          var value = peek.value;
          keys.push(typeof value === 'string' ? value : peek.text);
          this.advance();
          if (peek.key && (this.peek.text === ',' || this.peek.text === '}')) {
            --this.index;
            values.push(this.parseAccessOrCallScope());
          } else {
            this.expect(':');
            values.push(this.parseExpression());
          }
        } while (this.optional(','));
      }
      this.expect('}');
      return new LiteralObject(keys, values);
    };
    ParserImplementation.prototype.parseExpressionList = function parseExpressionList(terminator) {
      var result = [];
      if (this.peek.text != terminator) {
        do {
          result.push(this.parseExpression());
        } while (this.optional(','));
      }
      return result;
    };
    ParserImplementation.prototype.optional = function optional(text) {
      if (this.peek.text === text) {
        this.advance();
        return true;
      }
      return false;
    };
    ParserImplementation.prototype.expect = function expect(text) {
      if (this.peek.text === text) {
        this.advance();
      } else {
        this.error('Missing expected ' + text);
      }
    };
    ParserImplementation.prototype.advance = function advance() {
      this.index++;
    };
    ParserImplementation.prototype.error = function error(message) {
      var location = this.index < this.tokens.length ? 'at column ' + (this.tokens[this.index].index + 1) + ' in' : 'at the end of the expression';
      throw new Error('Parser Error: ' + message + ' ' + location + ' [' + this.input + ']');
    };
    _createClass(ParserImplementation, [{
      key: 'peek',
      get: function get() {
        return this.index < this.tokens.length ? this.tokens[this.index] : EOF;
      }
    }]);
    return ParserImplementation;
  })();
  exports.ParserImplementation = ParserImplementation;
  var mapProto = Map.prototype;
  function _getMapObserver(taskQueue, map) {
    return ModifyMapObserver['for'](taskQueue, map);
  }
  var ModifyMapObserver = (function(_ModifyCollectionObserver3) {
    _inherits(ModifyMapObserver, _ModifyCollectionObserver3);
    function ModifyMapObserver(taskQueue, map) {
      _classCallCheck(this, ModifyMapObserver);
      _ModifyCollectionObserver3.call(this, taskQueue, map);
    }
    ModifyMapObserver['for'] = function _for(taskQueue, map) {
      if (!('__map_observer__' in map)) {
        var observer = ModifyMapObserver.create(taskQueue, map);
        Object.defineProperty(map, '__map_observer__', {
          value: observer,
          enumerable: false,
          configurable: false
        });
      }
      return map.__map_observer__;
    };
    ModifyMapObserver.create = function create(taskQueue, map) {
      var observer = new ModifyMapObserver(taskQueue, map);
      var proto = mapProto;
      if (proto.add !== map.add || proto['delete'] !== map['delete'] || proto.clear !== map.clear) {
        proto = {
          add: map.add,
          'delete': map['delete'],
          clear: map.clear
        };
      }
      map['set'] = function() {
        var hasValue = map.has(arguments[0]);
        var type = hasValue ? 'update' : 'add';
        var oldValue = map.get(arguments[0]);
        var methodCallResult = proto['set'].apply(map, arguments);
        if (!hasValue || oldValue !== map.get(arguments[0])) {
          observer.addChangeRecord({
            type: type,
            object: map,
            key: arguments[0],
            oldValue: oldValue
          });
        }
        return methodCallResult;
      };
      map['delete'] = function() {
        var hasValue = map.has(arguments[0]);
        var oldValue = map.get(arguments[0]);
        var methodCallResult = proto['delete'].apply(map, arguments);
        if (hasValue) {
          observer.addChangeRecord({
            type: 'delete',
            object: map,
            key: arguments[0],
            oldValue: oldValue
          });
        }
        return methodCallResult;
      };
      map['clear'] = function() {
        var methodCallResult = proto['clear'].apply(map, arguments);
        observer.addChangeRecord({
          type: 'clear',
          object: map
        });
        return methodCallResult;
      };
      return observer;
    };
    return ModifyMapObserver;
  })(ModifyCollectionObserver);
  function findOriginalEventTarget(event) {
    return event.path && event.path[0] || event.deepPath && event.deepPath[0] || event.target;
  }
  function handleDelegatedEvent(event) {
    var target = findOriginalEventTarget(event);
    var callback = undefined;
    while (target && !callback) {
      if (target.delegatedCallbacks) {
        callback = target.delegatedCallbacks[event.type];
      }
      if (!callback) {
        target = target.parentNode;
      }
    }
    if (callback) {
      callback(event);
    }
  }
  var DelegateHandlerEntry = (function() {
    function DelegateHandlerEntry(eventName) {
      _classCallCheck(this, DelegateHandlerEntry);
      this.eventName = eventName;
      this.count = 0;
    }
    DelegateHandlerEntry.prototype.increment = function increment() {
      this.count++;
      if (this.count === 1) {
        _aureliaPal.DOM.addEventListener(this.eventName, handleDelegatedEvent, false);
      }
    };
    DelegateHandlerEntry.prototype.decrement = function decrement() {
      this.count--;
      if (this.count === 0) {
        _aureliaPal.DOM.removeEventListener(this.eventName, handleDelegatedEvent);
      }
    };
    return DelegateHandlerEntry;
  })();
  var DefaultEventStrategy = (function() {
    function DefaultEventStrategy() {
      _classCallCheck(this, DefaultEventStrategy);
      this.delegatedHandlers = [];
    }
    DefaultEventStrategy.prototype.subscribe = function subscribe(target, targetEvent, callback, delegate) {
      var _this = this;
      if (delegate) {
        var _ret = (function() {
          var delegatedHandlers = _this.delegatedHandlers;
          var handlerEntry = delegatedHandlers[targetEvent] || (delegatedHandlers[targetEvent] = new DelegateHandlerEntry(targetEvent));
          var delegatedCallbacks = target.delegatedCallbacks || (target.delegatedCallbacks = {});
          handlerEntry.increment();
          delegatedCallbacks[targetEvent] = callback;
          return {v: function() {
              handlerEntry.decrement();
              delegatedCallbacks[targetEvent] = null;
            }};
        })();
        if (typeof _ret === 'object')
          return _ret.v;
      } else {
        target.addEventListener(targetEvent, callback, false);
        return function() {
          target.removeEventListener(targetEvent, callback);
        };
      }
    };
    return DefaultEventStrategy;
  })();
  var EventManager = (function() {
    function EventManager() {
      _classCallCheck(this, EventManager);
      this.elementHandlerLookup = {};
      this.eventStrategyLookup = {};
      this.registerElementConfig({
        tagName: 'input',
        properties: {
          value: ['change', 'input'],
          checked: ['change', 'input'],
          files: ['change', 'input']
        }
      });
      this.registerElementConfig({
        tagName: 'textarea',
        properties: {value: ['change', 'input']}
      });
      this.registerElementConfig({
        tagName: 'select',
        properties: {value: ['change']}
      });
      this.registerElementConfig({
        tagName: 'content editable',
        properties: {value: ['change', 'input', 'blur', 'keyup', 'paste']}
      });
      this.registerElementConfig({
        tagName: 'scrollable element',
        properties: {
          scrollTop: ['scroll'],
          scrollLeft: ['scroll']
        }
      });
      this.defaultEventStrategy = new DefaultEventStrategy();
    }
    EventManager.prototype.registerElementConfig = function registerElementConfig(config) {
      var tagName = config.tagName.toLowerCase();
      var properties = config.properties;
      var propertyName = undefined;
      this.elementHandlerLookup[tagName] = {};
      for (propertyName in properties) {
        if (properties.hasOwnProperty(propertyName)) {
          this.registerElementPropertyConfig(tagName, propertyName, properties[propertyName]);
        }
      }
    };
    EventManager.prototype.registerElementPropertyConfig = function registerElementPropertyConfig(tagName, propertyName, events) {
      this.elementHandlerLookup[tagName][propertyName] = this.createElementHandler(events);
    };
    EventManager.prototype.createElementHandler = function createElementHandler(events) {
      return {subscribe: function subscribe(target, callback) {
          events.forEach(function(changeEvent) {
            target.addEventListener(changeEvent, callback, false);
          });
          return function() {
            events.forEach(function(changeEvent) {
              target.removeEventListener(changeEvent, callback);
            });
          };
        }};
    };
    EventManager.prototype.registerElementHandler = function registerElementHandler(tagName, handler) {
      this.elementHandlerLookup[tagName.toLowerCase()] = handler;
    };
    EventManager.prototype.registerEventStrategy = function registerEventStrategy(eventName, strategy) {
      this.eventStrategyLookup[eventName] = strategy;
    };
    EventManager.prototype.getElementHandler = function getElementHandler(target, propertyName) {
      var tagName = undefined;
      var lookup = this.elementHandlerLookup;
      if (target.tagName) {
        tagName = target.tagName.toLowerCase();
        if (lookup[tagName] && lookup[tagName][propertyName]) {
          return lookup[tagName][propertyName];
        }
        if (propertyName === 'textContent' || propertyName === 'innerHTML') {
          return lookup['content editable']['value'];
        }
        if (propertyName === 'scrollTop' || propertyName === 'scrollLeft') {
          return lookup['scrollable element'][propertyName];
        }
      }
      return null;
    };
    EventManager.prototype.addEventListener = function addEventListener(target, targetEvent, callback, delegate) {
      return (this.eventStrategyLookup[targetEvent] || this.defaultEventStrategy).subscribe(target, targetEvent, callback, delegate);
    };
    return EventManager;
  })();
  exports.EventManager = EventManager;
  var DirtyChecker = (function() {
    function DirtyChecker() {
      _classCallCheck(this, DirtyChecker);
      this.tracked = [];
      this.checkDelay = 120;
    }
    DirtyChecker.prototype.addProperty = function addProperty(property) {
      var tracked = this.tracked;
      tracked.push(property);
      if (tracked.length === 1) {
        this.scheduleDirtyCheck();
      }
    };
    DirtyChecker.prototype.removeProperty = function removeProperty(property) {
      var tracked = this.tracked;
      tracked.splice(tracked.indexOf(property), 1);
    };
    DirtyChecker.prototype.scheduleDirtyCheck = function scheduleDirtyCheck() {
      var _this2 = this;
      setTimeout(function() {
        return _this2.check();
      }, this.checkDelay);
    };
    DirtyChecker.prototype.check = function check() {
      var tracked = this.tracked,
          i = tracked.length;
      while (i--) {
        var current = tracked[i];
        if (current.isDirty()) {
          current.call();
        }
      }
      if (tracked.length) {
        this.scheduleDirtyCheck();
      }
    };
    return DirtyChecker;
  })();
  exports.DirtyChecker = DirtyChecker;
  var DirtyCheckProperty = (function() {
    function DirtyCheckProperty(dirtyChecker, obj, propertyName) {
      _classCallCheck(this, _DirtyCheckProperty);
      this.dirtyChecker = dirtyChecker;
      this.obj = obj;
      this.propertyName = propertyName;
    }
    DirtyCheckProperty.prototype.getValue = function getValue() {
      return this.obj[this.propertyName];
    };
    DirtyCheckProperty.prototype.setValue = function setValue(newValue) {
      this.obj[this.propertyName] = newValue;
    };
    DirtyCheckProperty.prototype.call = function call() {
      var oldValue = this.oldValue;
      var newValue = this.getValue();
      this.callSubscribers(newValue, oldValue);
      this.oldValue = newValue;
    };
    DirtyCheckProperty.prototype.isDirty = function isDirty() {
      return this.oldValue !== this.obj[this.propertyName];
    };
    DirtyCheckProperty.prototype.subscribe = function subscribe(context, callable) {
      if (!this.hasSubscribers()) {
        this.oldValue = this.getValue();
        this.dirtyChecker.addProperty(this);
      }
      this.addSubscriber(context, callable);
    };
    DirtyCheckProperty.prototype.unsubscribe = function unsubscribe(context, callable) {
      if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
        this.dirtyChecker.removeProperty(this);
      }
    };
    var _DirtyCheckProperty = DirtyCheckProperty;
    DirtyCheckProperty = subscriberCollection()(DirtyCheckProperty) || DirtyCheckProperty;
    return DirtyCheckProperty;
  })();
  exports.DirtyCheckProperty = DirtyCheckProperty;
  var propertyAccessor = {
    getValue: function getValue(obj, propertyName) {
      return obj[propertyName];
    },
    setValue: function setValue(value, obj, propertyName) {
      return obj[propertyName] = value;
    }
  };
  exports.propertyAccessor = propertyAccessor;
  var PrimitiveObserver = (function() {
    function PrimitiveObserver(primitive, propertyName) {
      _classCallCheck(this, PrimitiveObserver);
      this.doNotCache = true;
      this.primitive = primitive;
      this.propertyName = propertyName;
    }
    PrimitiveObserver.prototype.getValue = function getValue() {
      return this.primitive[this.propertyName];
    };
    PrimitiveObserver.prototype.setValue = function setValue() {
      var type = typeof this.primitive;
      throw new Error('The ' + this.propertyName + ' property of a ' + type + ' (' + this.primitive + ') cannot be assigned.');
    };
    PrimitiveObserver.prototype.subscribe = function subscribe() {};
    PrimitiveObserver.prototype.unsubscribe = function unsubscribe() {};
    return PrimitiveObserver;
  })();
  exports.PrimitiveObserver = PrimitiveObserver;
  var SetterObserver = (function() {
    function SetterObserver(taskQueue, obj, propertyName) {
      _classCallCheck(this, _SetterObserver);
      this.taskQueue = taskQueue;
      this.obj = obj;
      this.propertyName = propertyName;
      this.queued = false;
      this.observing = false;
    }
    SetterObserver.prototype.getValue = function getValue() {
      return this.obj[this.propertyName];
    };
    SetterObserver.prototype.setValue = function setValue(newValue) {
      this.obj[this.propertyName] = newValue;
    };
    SetterObserver.prototype.getterValue = function getterValue() {
      return this.currentValue;
    };
    SetterObserver.prototype.setterValue = function setterValue(newValue) {
      var oldValue = this.currentValue;
      if (oldValue !== newValue) {
        if (!this.queued) {
          this.oldValue = oldValue;
          this.queued = true;
          this.taskQueue.queueMicroTask(this);
        }
        this.currentValue = newValue;
      }
    };
    SetterObserver.prototype.call = function call() {
      var oldValue = this.oldValue;
      var newValue = this.currentValue;
      this.queued = false;
      this.callSubscribers(newValue, oldValue);
    };
    SetterObserver.prototype.subscribe = function subscribe(context, callable) {
      if (!this.observing) {
        this.convertProperty();
      }
      this.addSubscriber(context, callable);
    };
    SetterObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
      this.removeSubscriber(context, callable);
    };
    SetterObserver.prototype.convertProperty = function convertProperty() {
      this.observing = true;
      this.currentValue = this.obj[this.propertyName];
      this.setValue = this.setterValue;
      this.getValue = this.getterValue;
      try {
        Object.defineProperty(this.obj, this.propertyName, {
          configurable: true,
          enumerable: true,
          get: this.getValue.bind(this),
          set: this.setValue.bind(this)
        });
      } catch (_) {}
    };
    var _SetterObserver = SetterObserver;
    SetterObserver = subscriberCollection()(SetterObserver) || SetterObserver;
    return SetterObserver;
  })();
  exports.SetterObserver = SetterObserver;
  var XLinkAttributeObserver = (function() {
    function XLinkAttributeObserver(element, propertyName, attributeName) {
      _classCallCheck(this, XLinkAttributeObserver);
      this.element = element;
      this.propertyName = propertyName;
      this.attributeName = attributeName;
    }
    XLinkAttributeObserver.prototype.getValue = function getValue() {
      return this.element.getAttributeNS('http://www.w3.org/1999/xlink', this.attributeName);
    };
    XLinkAttributeObserver.prototype.setValue = function setValue(newValue) {
      return this.element.setAttributeNS('http://www.w3.org/1999/xlink', this.attributeName, newValue);
    };
    XLinkAttributeObserver.prototype.subscribe = function subscribe() {
      throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "' + this.propertyName + '" property is not supported.');
    };
    return XLinkAttributeObserver;
  })();
  exports.XLinkAttributeObserver = XLinkAttributeObserver;
  var dataAttributeAccessor = {
    getValue: function getValue(obj, propertyName) {
      return obj.getAttribute(propertyName);
    },
    setValue: function setValue(value, obj, propertyName) {
      return obj.setAttribute(propertyName, value);
    }
  };
  exports.dataAttributeAccessor = dataAttributeAccessor;
  var DataAttributeObserver = (function() {
    function DataAttributeObserver(element, propertyName) {
      _classCallCheck(this, DataAttributeObserver);
      this.element = element;
      this.propertyName = propertyName;
    }
    DataAttributeObserver.prototype.getValue = function getValue() {
      return this.element.getAttribute(this.propertyName);
    };
    DataAttributeObserver.prototype.setValue = function setValue(newValue) {
      return this.element.setAttribute(this.propertyName, newValue);
    };
    DataAttributeObserver.prototype.subscribe = function subscribe() {
      throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "' + this.propertyName + '" property is not supported.');
    };
    return DataAttributeObserver;
  })();
  exports.DataAttributeObserver = DataAttributeObserver;
  var StyleObserver = (function() {
    function StyleObserver(element, propertyName) {
      _classCallCheck(this, StyleObserver);
      this.element = element;
      this.propertyName = propertyName;
      this.styles = null;
      this.version = 0;
    }
    StyleObserver.prototype.getValue = function getValue() {
      return this.element.style.cssText;
    };
    StyleObserver.prototype.setValue = function setValue(newValue) {
      var styles = this.styles || {},
          style = undefined,
          version = this.version;
      if (newValue !== null && newValue !== undefined) {
        if (newValue instanceof Object) {
          for (style in newValue) {
            if (newValue.hasOwnProperty(style)) {
              styles[style] = version;
              this.element.style[style] = newValue[style];
            }
          }
        } else if (newValue.length) {
          var pairs = newValue.split(/(?:;|:(?!\/))\s*/);
          for (var i = 0,
              _length = pairs.length; i < _length; i++) {
            style = pairs[i].trim();
            if (!style) {
              continue;
            }
            styles[style] = version;
            this.element.style[style] = pairs[++i];
          }
        }
      }
      this.styles = styles;
      this.version += 1;
      if (version === 0) {
        return;
      }
      version -= 1;
      for (style in styles) {
        if (!styles.hasOwnProperty(style) || styles[style] !== version) {
          continue;
        }
        this.element.style[style] = '';
      }
    };
    StyleObserver.prototype.subscribe = function subscribe() {
      throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "' + this.propertyName + '" property is not supported.');
    };
    return StyleObserver;
  })();
  exports.StyleObserver = StyleObserver;
  var ValueAttributeObserver = (function() {
    function ValueAttributeObserver(element, propertyName, handler) {
      _classCallCheck(this, _ValueAttributeObserver);
      this.element = element;
      this.propertyName = propertyName;
      this.handler = handler;
      if (propertyName === 'files') {
        this.setValue = function() {};
      }
    }
    ValueAttributeObserver.prototype.getValue = function getValue() {
      return this.element[this.propertyName];
    };
    ValueAttributeObserver.prototype.setValue = function setValue(newValue) {
      newValue = newValue === undefined || newValue === null ? '' : newValue;
      if (this.element[this.propertyName] !== newValue) {
        this.element[this.propertyName] = newValue;
        this.notify();
      }
    };
    ValueAttributeObserver.prototype.notify = function notify() {
      var oldValue = this.oldValue;
      var newValue = this.getValue();
      this.callSubscribers(newValue, oldValue);
      this.oldValue = newValue;
    };
    ValueAttributeObserver.prototype.subscribe = function subscribe(context, callable) {
      if (!this.hasSubscribers()) {
        this.oldValue = this.getValue();
        this.disposeHandler = this.handler.subscribe(this.element, this.notify.bind(this));
      }
      this.addSubscriber(context, callable);
    };
    ValueAttributeObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
      if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
        this.disposeHandler();
        this.disposeHandler = null;
      }
    };
    var _ValueAttributeObserver = ValueAttributeObserver;
    ValueAttributeObserver = subscriberCollection()(ValueAttributeObserver) || ValueAttributeObserver;
    return ValueAttributeObserver;
  })();
  exports.ValueAttributeObserver = ValueAttributeObserver;
  var checkedArrayContext = 'CheckedObserver:array';
  var CheckedObserver = (function() {
    function CheckedObserver(element, handler, observerLocator) {
      _classCallCheck(this, _CheckedObserver);
      this.element = element;
      this.handler = handler;
      this.observerLocator = observerLocator;
    }
    CheckedObserver.prototype.getValue = function getValue() {
      return this.value;
    };
    CheckedObserver.prototype.setValue = function setValue(newValue) {
      if (this.value === newValue) {
        return;
      }
      if (this.arrayObserver) {
        this.arrayObserver.unsubscribe(checkedArrayContext, this);
        this.arrayObserver = null;
      }
      if (this.element.type === 'checkbox' && Array.isArray(newValue)) {
        this.arrayObserver = this.observerLocator.getArrayObserver(newValue);
        this.arrayObserver.subscribe(checkedArrayContext, this);
      }
      this.oldValue = this.value;
      this.value = newValue;
      this.synchronizeElement();
      this.notify();
      if (!this.initialSync) {
        this.initialSync = true;
        this.observerLocator.taskQueue.queueMicroTask(this);
      }
    };
    CheckedObserver.prototype.call = function call(context, splices) {
      this.synchronizeElement();
    };
    CheckedObserver.prototype.synchronizeElement = function synchronizeElement() {
      var value = this.value,
          element = this.element,
          elementValue = element.hasOwnProperty('model') ? element.model : element.value,
          isRadio = element.type === 'radio',
          matcher = element.matcher || function(a, b) {
            return a === b;
          };
      element.checked = isRadio && !!matcher(value, elementValue) || !isRadio && value === true || !isRadio && Array.isArray(value) && !!value.find(function(item) {
        return !!matcher(item, elementValue);
      });
    };
    CheckedObserver.prototype.synchronizeValue = function synchronizeValue() {
      var value = this.value,
          element = this.element,
          elementValue = element.hasOwnProperty('model') ? element.model : element.value,
          index = undefined,
          matcher = element.matcher || function(a, b) {
            return a === b;
          };
      if (element.type === 'checkbox') {
        if (Array.isArray(value)) {
          index = value.findIndex(function(item) {
            return !!matcher(item, elementValue);
          });
          if (element.checked && index === -1) {
            value.push(elementValue);
          } else if (!element.checked && index !== -1) {
            value.splice(index, 1);
          }
          return;
        } else {
          value = element.checked;
        }
      } else if (element.checked) {
        value = elementValue;
      } else {
        return;
      }
      this.oldValue = this.value;
      this.value = value;
      this.notify();
    };
    CheckedObserver.prototype.notify = function notify() {
      var oldValue = this.oldValue;
      var newValue = this.value;
      this.callSubscribers(newValue, oldValue);
    };
    CheckedObserver.prototype.subscribe = function subscribe(context, callable) {
      if (!this.hasSubscribers()) {
        this.disposeHandler = this.handler.subscribe(this.element, this.synchronizeValue.bind(this, false));
      }
      this.addSubscriber(context, callable);
    };
    CheckedObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
      if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
        this.disposeHandler();
        this.disposeHandler = null;
      }
    };
    CheckedObserver.prototype.unbind = function unbind() {
      if (this.arrayObserver) {
        this.arrayObserver.unsubscribe(checkedArrayContext, this);
        this.arrayObserver = null;
      }
    };
    var _CheckedObserver = CheckedObserver;
    CheckedObserver = subscriberCollection()(CheckedObserver) || CheckedObserver;
    return CheckedObserver;
  })();
  exports.CheckedObserver = CheckedObserver;
  var selectArrayContext = 'SelectValueObserver:array';
  var SelectValueObserver = (function() {
    function SelectValueObserver(element, handler, observerLocator) {
      _classCallCheck(this, _SelectValueObserver);
      this.element = element;
      this.handler = handler;
      this.observerLocator = observerLocator;
    }
    SelectValueObserver.prototype.getValue = function getValue() {
      return this.value;
    };
    SelectValueObserver.prototype.setValue = function setValue(newValue) {
      if (newValue !== null && newValue !== undefined && this.element.multiple && !Array.isArray(newValue)) {
        throw new Error('Only null or Array instances can be bound to a multi-select.');
      }
      if (this.value === newValue) {
        return;
      }
      if (this.arrayObserver) {
        this.arrayObserver.unsubscribe(selectArrayContext, this);
        this.arrayObserver = null;
      }
      if (Array.isArray(newValue)) {
        this.arrayObserver = this.observerLocator.getArrayObserver(newValue);
        this.arrayObserver.subscribe(selectArrayContext, this);
      }
      this.oldValue = this.value;
      this.value = newValue;
      this.synchronizeOptions();
      this.notify();
      if (!this.initialSync) {
        this.initialSync = true;
        this.observerLocator.taskQueue.queueMicroTask(this);
      }
    };
    SelectValueObserver.prototype.call = function call(context, splices) {
      this.synchronizeOptions();
    };
    SelectValueObserver.prototype.synchronizeOptions = function synchronizeOptions() {
      var value = this.value,
          clear = undefined,
          isArray = undefined;
      if (value === null || value === undefined) {
        clear = true;
      } else if (Array.isArray(value)) {
        isArray = true;
      }
      var options = this.element.options;
      var i = options.length;
      var matcher = this.element.matcher || function(a, b) {
        return a === b;
      };
      var _loop = function() {
        var option = options.item(i);
        if (clear) {
          option.selected = false;
          return 'continue';
        }
        var optionValue = option.hasOwnProperty('model') ? option.model : option.value;
        if (isArray) {
          option.selected = !!value.find(function(item) {
            return !!matcher(optionValue, item);
          });
          return 'continue';
        }
        option.selected = !!matcher(optionValue, value);
      };
      while (i--) {
        var _ret2 = _loop();
        if (_ret2 === 'continue')
          continue;
      }
    };
    SelectValueObserver.prototype.synchronizeValue = function synchronizeValue() {
      var _this3 = this;
      var options = this.element.options,
          count = 0,
          value = [];
      for (var i = 0,
          ii = options.length; i < ii; i++) {
        var option = options.item(i);
        if (!option.selected) {
          continue;
        }
        value.push(option.hasOwnProperty('model') ? option.model : option.value);
        count++;
      }
      if (this.element.multiple) {
        if (Array.isArray(this.value)) {
          var _ret3 = (function() {
            var matcher = _this3.element.matcher || function(a, b) {
              return a === b;
            };
            var i = 0;
            var _loop2 = function() {
              var a = _this3.value[i];
              if (value.findIndex(function(b) {
                return matcher(a, b);
              }) === -1) {
                _this3.value.splice(i, 1);
              } else {
                i++;
              }
            };
            while (i < _this3.value.length) {
              _loop2();
            }
            i = 0;
            var _loop3 = function() {
              var a = value[i];
              if (_this3.value.findIndex(function(b) {
                return matcher(a, b);
              }) === -1) {
                _this3.value.push(a);
              }
              i++;
            };
            while (i < value.length) {
              _loop3();
            }
            return {v: undefined};
          })();
          if (typeof _ret3 === 'object')
            return _ret3.v;
        }
      } else {
        if (count === 0) {
          value = null;
        } else {
          value = value[0];
        }
      }
      if (value !== this.value) {
        this.oldValue = this.value;
        this.value = value;
        this.notify();
      }
    };
    SelectValueObserver.prototype.notify = function notify() {
      var oldValue = this.oldValue;
      var newValue = this.value;
      this.callSubscribers(newValue, oldValue);
    };
    SelectValueObserver.prototype.subscribe = function subscribe(context, callable) {
      if (!this.hasSubscribers()) {
        this.disposeHandler = this.handler.subscribe(this.element, this.synchronizeValue.bind(this, false));
      }
      this.addSubscriber(context, callable);
    };
    SelectValueObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
      if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
        this.disposeHandler();
        this.disposeHandler = null;
      }
    };
    SelectValueObserver.prototype.bind = function bind() {
      var _this4 = this;
      this.domObserver = _aureliaPal.DOM.createMutationObserver(function() {
        _this4.synchronizeOptions();
        _this4.synchronizeValue();
      });
      this.domObserver.observe(this.element, {
        childList: true,
        subtree: true
      });
    };
    SelectValueObserver.prototype.unbind = function unbind() {
      this.domObserver.disconnect();
      this.domObserver = null;
      if (this.arrayObserver) {
        this.arrayObserver.unsubscribe(selectArrayContext, this);
        this.arrayObserver = null;
      }
    };
    var _SelectValueObserver = SelectValueObserver;
    SelectValueObserver = subscriberCollection()(SelectValueObserver) || SelectValueObserver;
    return SelectValueObserver;
  })();
  exports.SelectValueObserver = SelectValueObserver;
  var ClassObserver = (function() {
    function ClassObserver(element) {
      _classCallCheck(this, ClassObserver);
      this.element = element;
      this.doNotCache = true;
      this.value = '';
      this.version = 0;
    }
    ClassObserver.prototype.getValue = function getValue() {
      return this.value;
    };
    ClassObserver.prototype.setValue = function setValue(newValue) {
      var nameIndex = this.nameIndex || {},
          version = this.version,
          names,
          name;
      if (newValue !== null && newValue !== undefined && newValue.length) {
        names = newValue.split(/\s+/);
        for (var i = 0,
            _length2 = names.length; i < _length2; i++) {
          name = names[i];
          if (name === '') {
            continue;
          }
          nameIndex[name] = version;
          this.element.classList.add(name);
        }
      }
      this.value = newValue;
      this.nameIndex = nameIndex;
      this.version += 1;
      if (version === 0) {
        return;
      }
      version -= 1;
      for (name in nameIndex) {
        if (!nameIndex.hasOwnProperty(name) || nameIndex[name] !== version) {
          continue;
        }
        this.element.classList.remove(name);
      }
    };
    ClassObserver.prototype.subscribe = function subscribe() {
      throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "class" property is not supported.');
    };
    return ClassObserver;
  })();
  exports.ClassObserver = ClassObserver;
  var computedContext = 'ComputedPropertyObserver';
  var ComputedPropertyObserver = (function() {
    function ComputedPropertyObserver(obj, propertyName, descriptor, observerLocator) {
      _classCallCheck(this, _ComputedPropertyObserver);
      this.obj = obj;
      this.propertyName = propertyName;
      this.descriptor = descriptor;
      this.observerLocator = observerLocator;
    }
    ComputedPropertyObserver.prototype.getValue = function getValue() {
      return this.obj[this.propertyName];
    };
    ComputedPropertyObserver.prototype.setValue = function setValue(newValue) {
      this.obj[this.propertyName] = newValue;
    };
    ComputedPropertyObserver.prototype.call = function call(context) {
      var newValue = this.getValue();
      if (this.oldValue === newValue)
        return;
      this.callSubscribers(newValue, this.oldValue);
      this.oldValue = newValue;
      return;
    };
    ComputedPropertyObserver.prototype.subscribe = function subscribe(context, callable) {
      if (!this.hasSubscribers()) {
        this.oldValue = this.getValue();
        var dependencies = this.descriptor.get.dependencies;
        this.observers = [];
        for (var i = 0,
            ii = dependencies.length; i < ii; i++) {
          var observer = this.observerLocator.getObserver(this.obj, dependencies[i]);
          this.observers.push(observer);
          observer.subscribe(computedContext, this);
        }
      }
      this.addSubscriber(context, callable);
    };
    ComputedPropertyObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
      if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
        this.oldValue = undefined;
        var i = this.observers.length;
        while (i--) {
          this.observers[i].unsubscribe(computedContext, this);
        }
        this.observers = null;
      }
    };
    var _ComputedPropertyObserver = ComputedPropertyObserver;
    ComputedPropertyObserver = subscriberCollection()(ComputedPropertyObserver) || ComputedPropertyObserver;
    return ComputedPropertyObserver;
  })();
  exports.ComputedPropertyObserver = ComputedPropertyObserver;
  function hasDeclaredDependencies(descriptor) {
    return descriptor && descriptor.get && descriptor.get.dependencies && descriptor.get.dependencies.length > 0;
  }
  function declarePropertyDependencies(ctor, propertyName, dependencies) {
    var descriptor = Object.getOwnPropertyDescriptor(ctor.prototype, propertyName);
    descriptor.get.dependencies = dependencies;
  }
  function computedFrom() {
    for (var _len = arguments.length,
        rest = Array(_len),
        _key = 0; _key < _len; _key++) {
      rest[_key] = arguments[_key];
    }
    return function(target, key, descriptor) {
      descriptor.get.dependencies = rest;
      return descriptor;
    };
  }
  var elements = {
    a: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'target', 'transform', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
    altGlyph: ['class', 'dx', 'dy', 'externalResourcesRequired', 'format', 'glyphRef', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    altGlyphDef: ['id', 'xml:base', 'xml:lang', 'xml:space'],
    altGlyphItem: ['id', 'xml:base', 'xml:lang', 'xml:space'],
    animate: ['accumulate', 'additive', 'attributeName', 'attributeType', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
    animateColor: ['accumulate', 'additive', 'attributeName', 'attributeType', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
    animateMotion: ['accumulate', 'additive', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keyPoints', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'origin', 'path', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'rotate', 'systemLanguage', 'to', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
    animateTransform: ['accumulate', 'additive', 'attributeName', 'attributeType', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'type', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
    circle: ['class', 'cx', 'cy', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'r', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
    clipPath: ['class', 'clipPathUnits', 'externalResourcesRequired', 'id', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
    'color-profile': ['id', 'local', 'name', 'rendering-intent', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
    cursor: ['externalResourcesRequired', 'id', 'requiredExtensions', 'requiredFeatures', 'systemLanguage', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    defs: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
    desc: ['class', 'id', 'style', 'xml:base', 'xml:lang', 'xml:space'],
    ellipse: ['class', 'cx', 'cy', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rx', 'ry', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
    feBlend: ['class', 'height', 'id', 'in', 'in2', 'mode', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    feColorMatrix: ['class', 'height', 'id', 'in', 'result', 'style', 'type', 'values', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    feComponentTransfer: ['class', 'height', 'id', 'in', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    feComposite: ['class', 'height', 'id', 'in', 'in2', 'k1', 'k2', 'k3', 'k4', 'operator', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    feConvolveMatrix: ['bias', 'class', 'divisor', 'edgeMode', 'height', 'id', 'in', 'kernelMatrix', 'kernelUnitLength', 'order', 'preserveAlpha', 'result', 'style', 'targetX', 'targetY', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    feDiffuseLighting: ['class', 'diffuseConstant', 'height', 'id', 'in', 'kernelUnitLength', 'result', 'style', 'surfaceScale', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    feDisplacementMap: ['class', 'height', 'id', 'in', 'in2', 'result', 'scale', 'style', 'width', 'x', 'xChannelSelector', 'xml:base', 'xml:lang', 'xml:space', 'y', 'yChannelSelector'],
    feDistantLight: ['azimuth', 'elevation', 'id', 'xml:base', 'xml:lang', 'xml:space'],
    feFlood: ['class', 'height', 'id', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    feFuncA: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
    feFuncB: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
    feFuncG: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
    feFuncR: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
    feGaussianBlur: ['class', 'height', 'id', 'in', 'result', 'stdDeviation', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    feImage: ['class', 'externalResourcesRequired', 'height', 'id', 'preserveAspectRatio', 'result', 'style', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    feMerge: ['class', 'height', 'id', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    feMergeNode: ['id', 'xml:base', 'xml:lang', 'xml:space'],
    feMorphology: ['class', 'height', 'id', 'in', 'operator', 'radius', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    feOffset: ['class', 'dx', 'dy', 'height', 'id', 'in', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    fePointLight: ['id', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y', 'z'],
    feSpecularLighting: ['class', 'height', 'id', 'in', 'kernelUnitLength', 'result', 'specularConstant', 'specularExponent', 'style', 'surfaceScale', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    feSpotLight: ['id', 'limitingConeAngle', 'pointsAtX', 'pointsAtY', 'pointsAtZ', 'specularExponent', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y', 'z'],
    feTile: ['class', 'height', 'id', 'in', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    feTurbulence: ['baseFrequency', 'class', 'height', 'id', 'numOctaves', 'result', 'seed', 'stitchTiles', 'style', 'type', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    filter: ['class', 'externalResourcesRequired', 'filterRes', 'filterUnits', 'height', 'id', 'primitiveUnits', 'style', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    font: ['class', 'externalResourcesRequired', 'horiz-adv-x', 'horiz-origin-x', 'horiz-origin-y', 'id', 'style', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'xml:base', 'xml:lang', 'xml:space'],
    'font-face': ['accent-height', 'alphabetic', 'ascent', 'bbox', 'cap-height', 'descent', 'font-family', 'font-size', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'hanging', 'id', 'ideographic', 'mathematical', 'overline-position', 'overline-thickness', 'panose-1', 'slope', 'stemh', 'stemv', 'strikethrough-position', 'strikethrough-thickness', 'underline-position', 'underline-thickness', 'unicode-range', 'units-per-em', 'v-alphabetic', 'v-hanging', 'v-ideographic', 'v-mathematical', 'widths', 'x-height', 'xml:base', 'xml:lang', 'xml:space'],
    'font-face-format': ['id', 'string', 'xml:base', 'xml:lang', 'xml:space'],
    'font-face-name': ['id', 'name', 'xml:base', 'xml:lang', 'xml:space'],
    'font-face-src': ['id', 'xml:base', 'xml:lang', 'xml:space'],
    'font-face-uri': ['id', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
    foreignObject: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    g: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
    glyph: ['arabic-form', 'class', 'd', 'glyph-name', 'horiz-adv-x', 'id', 'lang', 'orientation', 'style', 'unicode', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'xml:base', 'xml:lang', 'xml:space'],
    glyphRef: ['class', 'dx', 'dy', 'format', 'glyphRef', 'id', 'style', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    hkern: ['g1', 'g2', 'id', 'k', 'u1', 'u2', 'xml:base', 'xml:lang', 'xml:space'],
    image: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'preserveAspectRatio', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    line: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'x1', 'x2', 'xml:base', 'xml:lang', 'xml:space', 'y1', 'y2'],
    linearGradient: ['class', 'externalResourcesRequired', 'gradientTransform', 'gradientUnits', 'id', 'spreadMethod', 'style', 'x1', 'x2', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y1', 'y2'],
    marker: ['class', 'externalResourcesRequired', 'id', 'markerHeight', 'markerUnits', 'markerWidth', 'orient', 'preserveAspectRatio', 'refX', 'refY', 'style', 'viewBox', 'xml:base', 'xml:lang', 'xml:space'],
    mask: ['class', 'externalResourcesRequired', 'height', 'id', 'maskContentUnits', 'maskUnits', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    metadata: ['id', 'xml:base', 'xml:lang', 'xml:space'],
    'missing-glyph': ['class', 'd', 'horiz-adv-x', 'id', 'style', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'xml:base', 'xml:lang', 'xml:space'],
    mpath: ['externalResourcesRequired', 'id', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
    path: ['class', 'd', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'pathLength', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
    pattern: ['class', 'externalResourcesRequired', 'height', 'id', 'patternContentUnits', 'patternTransform', 'patternUnits', 'preserveAspectRatio', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'viewBox', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    polygon: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'points', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
    polyline: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'points', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
    radialGradient: ['class', 'cx', 'cy', 'externalResourcesRequired', 'fx', 'fy', 'gradientTransform', 'gradientUnits', 'id', 'r', 'spreadMethod', 'style', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
    rect: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rx', 'ry', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    script: ['externalResourcesRequired', 'id', 'type', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
    set: ['attributeName', 'attributeType', 'begin', 'dur', 'end', 'externalResourcesRequired', 'fill', 'id', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
    stop: ['class', 'id', 'offset', 'style', 'xml:base', 'xml:lang', 'xml:space'],
    style: ['id', 'media', 'title', 'type', 'xml:base', 'xml:lang', 'xml:space'],
    svg: ['baseProfile', 'class', 'contentScriptType', 'contentStyleType', 'externalResourcesRequired', 'height', 'id', 'onabort', 'onactivate', 'onclick', 'onerror', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onresize', 'onscroll', 'onunload', 'onzoom', 'preserveAspectRatio', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'version', 'viewBox', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y', 'zoomAndPan'],
    'switch': ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
    symbol: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'preserveAspectRatio', 'style', 'viewBox', 'xml:base', 'xml:lang', 'xml:space'],
    text: ['class', 'dx', 'dy', 'externalResourcesRequired', 'id', 'lengthAdjust', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'textLength', 'transform', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    textPath: ['class', 'externalResourcesRequired', 'id', 'lengthAdjust', 'method', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'spacing', 'startOffset', 'style', 'systemLanguage', 'textLength', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
    title: ['class', 'id', 'style', 'xml:base', 'xml:lang', 'xml:space'],
    tref: ['class', 'dx', 'dy', 'externalResourcesRequired', 'id', 'lengthAdjust', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'textLength', 'x', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    tspan: ['class', 'dx', 'dy', 'externalResourcesRequired', 'id', 'lengthAdjust', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'textLength', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    use: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
    view: ['externalResourcesRequired', 'id', 'preserveAspectRatio', 'viewBox', 'viewTarget', 'xml:base', 'xml:lang', 'xml:space', 'zoomAndPan'],
    vkern: ['g1', 'g2', 'id', 'k', 'u1', 'u2', 'xml:base', 'xml:lang', 'xml:space']
  };
  exports.elements = elements;
  var presentationElements = {
    'a': true,
    'altGlyph': true,
    'animate': true,
    'animateColor': true,
    'circle': true,
    'clipPath': true,
    'defs': true,
    'ellipse': true,
    'feBlend': true,
    'feColorMatrix': true,
    'feComponentTransfer': true,
    'feComposite': true,
    'feConvolveMatrix': true,
    'feDiffuseLighting': true,
    'feDisplacementMap': true,
    'feFlood': true,
    'feGaussianBlur': true,
    'feImage': true,
    'feMerge': true,
    'feMorphology': true,
    'feOffset': true,
    'feSpecularLighting': true,
    'feTile': true,
    'feTurbulence': true,
    'filter': true,
    'font': true,
    'foreignObject': true,
    'g': true,
    'glyph': true,
    'glyphRef': true,
    'image': true,
    'line': true,
    'linearGradient': true,
    'marker': true,
    'mask': true,
    'missing-glyph': true,
    'path': true,
    'pattern': true,
    'polygon': true,
    'polyline': true,
    'radialGradient': true,
    'rect': true,
    'stop': true,
    'svg': true,
    'switch': true,
    'symbol': true,
    'text': true,
    'textPath': true,
    'tref': true,
    'tspan': true,
    'use': true
  };
  exports.presentationElements = presentationElements;
  var presentationAttributes = {
    'alignment-baseline': true,
    'baseline-shift': true,
    'clip-path': true,
    'clip-rule': true,
    'clip': true,
    'color-interpolation-filters': true,
    'color-interpolation': true,
    'color-profile': true,
    'color-rendering': true,
    'color': true,
    'cursor': true,
    'direction': true,
    'display': true,
    'dominant-baseline': true,
    'enable-background': true,
    'fill-opacity': true,
    'fill-rule': true,
    'fill': true,
    'filter': true,
    'flood-color': true,
    'flood-opacity': true,
    'font-family': true,
    'font-size-adjust': true,
    'font-size': true,
    'font-stretch': true,
    'font-style': true,
    'font-variant': true,
    'font-weight': true,
    'glyph-orientation-horizontal': true,
    'glyph-orientation-vertical': true,
    'image-rendering': true,
    'kerning': true,
    'letter-spacing': true,
    'lighting-color': true,
    'marker-end': true,
    'marker-mid': true,
    'marker-start': true,
    'mask': true,
    'opacity': true,
    'overflow': true,
    'pointer-events': true,
    'shape-rendering': true,
    'stop-color': true,
    'stop-opacity': true,
    'stroke-dasharray': true,
    'stroke-dashoffset': true,
    'stroke-linecap': true,
    'stroke-linejoin': true,
    'stroke-miterlimit': true,
    'stroke-opacity': true,
    'stroke-width': true,
    'stroke': true,
    'text-anchor': true,
    'text-decoration': true,
    'text-rendering': true,
    'unicode-bidi': true,
    'visibility': true,
    'word-spacing': true,
    'writing-mode': true
  };
  exports.presentationAttributes = presentationAttributes;
  function createElement(html) {
    var div = _aureliaPal.DOM.createElement('div');
    div.innerHTML = html;
    return div.firstChild;
  }
  var SVGAnalyzer = (function() {
    function SVGAnalyzer() {
      _classCallCheck(this, SVGAnalyzer);
      if (createElement('<svg><altGlyph /></svg>').firstElementChild.nodeName === 'altglyph' && elements.altGlyph) {
        elements.altglyph = elements.altGlyph;
        delete elements.altGlyph;
        elements.altglyphdef = elements.altGlyphDef;
        delete elements.altGlyphDef;
        elements.altglyphitem = elements.altGlyphItem;
        delete elements.altGlyphItem;
        elements.glyphref = elements.glyphRef;
        delete elements.glyphRef;
      }
    }
    SVGAnalyzer.prototype.isStandardSvgAttribute = function isStandardSvgAttribute(nodeName, attributeName) {
      return presentationElements[nodeName] && presentationAttributes[attributeName] || elements[nodeName] && elements[nodeName].indexOf(attributeName) !== -1;
    };
    return SVGAnalyzer;
  })();
  exports.SVGAnalyzer = SVGAnalyzer;
  var ObserverLocator = (function() {
    _createClass(ObserverLocator, null, [{
      key: 'inject',
      value: [_aureliaTaskQueue.TaskQueue, EventManager, DirtyChecker, SVGAnalyzer],
      enumerable: true
    }]);
    function ObserverLocator(taskQueue, eventManager, dirtyChecker, svgAnalyzer) {
      _classCallCheck(this, ObserverLocator);
      this.taskQueue = taskQueue;
      this.eventManager = eventManager;
      this.dirtyChecker = dirtyChecker;
      this.svgAnalyzer = svgAnalyzer;
      this.adapters = [];
    }
    ObserverLocator.prototype.getObserver = function getObserver(obj, propertyName) {
      var observersLookup = obj.__observers__;
      var observer = undefined;
      if (observersLookup && propertyName in observersLookup) {
        return observersLookup[propertyName];
      }
      observer = this.createPropertyObserver(obj, propertyName);
      if (!observer.doNotCache) {
        if (observersLookup === undefined) {
          observersLookup = this.getOrCreateObserversLookup(obj);
        }
        observersLookup[propertyName] = observer;
      }
      return observer;
    };
    ObserverLocator.prototype.getOrCreateObserversLookup = function getOrCreateObserversLookup(obj) {
      return obj.__observers__ || this.createObserversLookup(obj);
    };
    ObserverLocator.prototype.createObserversLookup = function createObserversLookup(obj) {
      var value = {};
      try {
        Object.defineProperty(obj, "__observers__", {
          enumerable: false,
          configurable: false,
          writable: false,
          value: value
        });
      } catch (_) {}
      return value;
    };
    ObserverLocator.prototype.addAdapter = function addAdapter(adapter) {
      this.adapters.push(adapter);
    };
    ObserverLocator.prototype.getAdapterObserver = function getAdapterObserver(obj, propertyName, descriptor) {
      for (var i = 0,
          ii = this.adapters.length; i < ii; i++) {
        var adapter = this.adapters[i];
        var observer = adapter.getObserver(obj, propertyName, descriptor);
        if (observer) {
          return observer;
        }
      }
      return null;
    };
    ObserverLocator.prototype.createPropertyObserver = function createPropertyObserver(obj, propertyName) {
      var observerLookup = undefined;
      var descriptor = undefined;
      var handler = undefined;
      var xlinkResult = undefined;
      if (!(obj instanceof Object)) {
        return new PrimitiveObserver(obj, propertyName);
      }
      if (obj instanceof _aureliaPal.DOM.Element) {
        if (propertyName === 'class') {
          return new ClassObserver(obj);
        }
        if (propertyName === 'style' || propertyName === 'css') {
          return new StyleObserver(obj, propertyName);
        }
        handler = this.eventManager.getElementHandler(obj, propertyName);
        if (propertyName === 'value' && obj.tagName.toLowerCase() === 'select') {
          return new SelectValueObserver(obj, handler, this);
        }
        if (propertyName === 'checked' && obj.tagName.toLowerCase() === 'input') {
          return new CheckedObserver(obj, handler, this);
        }
        if (handler) {
          return new ValueAttributeObserver(obj, propertyName, handler);
        }
        xlinkResult = /^xlink:(.+)$/.exec(propertyName);
        if (xlinkResult) {
          return new XLinkAttributeObserver(obj, propertyName, xlinkResult[1]);
        }
        if (/^\w+:|^data-|^aria-/.test(propertyName) || obj instanceof _aureliaPal.DOM.SVGElement && this.svgAnalyzer.isStandardSvgAttribute(obj.nodeName, propertyName)) {
          return new DataAttributeObserver(obj, propertyName);
        }
      }
      descriptor = Object.getPropertyDescriptor(obj, propertyName);
      if (hasDeclaredDependencies(descriptor)) {
        return new ComputedPropertyObserver(obj, propertyName, descriptor, this);
      }
      var existingGetterOrSetter = undefined;
      if (descriptor && (existingGetterOrSetter = descriptor.get || descriptor.set)) {
        if (existingGetterOrSetter.getObserver) {
          return existingGetterOrSetter.getObserver(obj);
        }
        var adapterObserver = this.getAdapterObserver(obj, propertyName, descriptor);
        if (adapterObserver) {
          return adapterObserver;
        }
        return new DirtyCheckProperty(this.dirtyChecker, obj, propertyName);
      }
      if (obj instanceof Array) {
        if (propertyName === 'length') {
          return this.getArrayObserver(obj).getLengthObserver();
        } else {
          return new DirtyCheckProperty(this.dirtyChecker, obj, propertyName);
        }
      } else if (obj instanceof Map) {
        if (propertyName === 'size') {
          return this.getMapObserver(obj).getLengthObserver();
        } else {
          return new DirtyCheckProperty(this.dirtyChecker, obj, propertyName);
        }
      } else if (obj instanceof Set) {
        if (propertyName === 'size') {
          return this.getSetObserver(obj).getLengthObserver();
        } else {
          return new DirtyCheckProperty(this.dirtyChecker, obj, propertyName);
        }
      }
      return new SetterObserver(this.taskQueue, obj, propertyName);
    };
    ObserverLocator.prototype.getAccessor = function getAccessor(obj, propertyName) {
      if (obj instanceof _aureliaPal.DOM.Element) {
        if (propertyName === 'class' || propertyName === 'style' || propertyName === 'css' || propertyName === 'value' && (obj.tagName.toLowerCase() === 'input' || obj.tagName.toLowerCase() === 'select') || propertyName === 'checked' && obj.tagName.toLowerCase() === 'input' || /^xlink:.+$/.exec(propertyName)) {
          return this.getObserver(obj, propertyName);
        }
        if (/^\w+:|^data-|^aria-/.test(propertyName) || obj instanceof _aureliaPal.DOM.SVGElement && this.svgAnalyzer.isStandardSvgAttribute(obj.nodeName, propertyName)) {
          return dataAttributeAccessor;
        }
      }
      return propertyAccessor;
    };
    ObserverLocator.prototype.getArrayObserver = function getArrayObserver(array) {
      return _getArrayObserver(this.taskQueue, array);
    };
    ObserverLocator.prototype.getMapObserver = function getMapObserver(map) {
      return _getMapObserver(this.taskQueue, map);
    };
    ObserverLocator.prototype.getSetObserver = function getSetObserver(set) {
      return _getSetObserver(this.taskQueue, set);
    };
    return ObserverLocator;
  })();
  exports.ObserverLocator = ObserverLocator;
  var ObjectObservationAdapter = (function() {
    function ObjectObservationAdapter() {
      _classCallCheck(this, ObjectObservationAdapter);
    }
    ObjectObservationAdapter.prototype.getObserver = function getObserver(object, propertyName, descriptor) {
      throw new Error('BindingAdapters must implement getObserver(object, propertyName).');
    };
    return ObjectObservationAdapter;
  })();
  exports.ObjectObservationAdapter = ObjectObservationAdapter;
  var BindingExpression = (function() {
    function BindingExpression(observerLocator, targetProperty, sourceExpression, mode, lookupFunctions, attribute) {
      _classCallCheck(this, BindingExpression);
      this.observerLocator = observerLocator;
      this.targetProperty = targetProperty;
      this.sourceExpression = sourceExpression;
      this.mode = mode;
      this.lookupFunctions = lookupFunctions;
      this.attribute = attribute;
      this.discrete = false;
    }
    BindingExpression.prototype.createBinding = function createBinding(target) {
      return new Binding(this.observerLocator, this.sourceExpression, target, this.targetProperty, this.mode, this.lookupFunctions);
    };
    return BindingExpression;
  })();
  exports.BindingExpression = BindingExpression;
  var targetContext = 'Binding:target';
  var Binding = (function() {
    function Binding(observerLocator, sourceExpression, target, targetProperty, mode, lookupFunctions) {
      _classCallCheck(this, _Binding);
      this.observerLocator = observerLocator;
      this.sourceExpression = sourceExpression;
      this.target = target;
      this.targetProperty = targetProperty;
      this.mode = mode;
      this.lookupFunctions = lookupFunctions;
    }
    Binding.prototype.updateTarget = function updateTarget(value) {
      this.targetObserver.setValue(value, this.target, this.targetProperty);
    };
    Binding.prototype.updateSource = function updateSource(value) {
      this.sourceExpression.assign(this.source, value, this.lookupFunctions);
    };
    Binding.prototype.call = function call(context, newValue, oldValue) {
      if (!this.isBound) {
        return;
      }
      if (context === sourceContext) {
        oldValue = this.targetObserver.getValue(this.target, this.targetProperty);
        newValue = this.sourceExpression.evaluate(this.source, this.lookupFunctions);
        if (newValue !== oldValue) {
          this.updateTarget(newValue);
        }
        if (this.mode !== bindingMode.oneTime) {
          this._version++;
          this.sourceExpression.connect(this, this.source);
          this.unobserve(false);
        }
        return;
      }
      if (context === targetContext) {
        if (newValue !== this.sourceExpression.evaluate(this.source, this.lookupFunctions)) {
          this.updateSource(newValue);
        }
        return;
      }
      throw new Error('Unexpected call context ' + context);
    };
    Binding.prototype.bind = function bind(source) {
      if (this.isBound) {
        if (this.source === source) {
          return;
        }
        this.unbind();
      }
      this.isBound = true;
      this.source = source;
      var sourceExpression = this.sourceExpression;
      if (sourceExpression.bind) {
        sourceExpression.bind(this, source, this.lookupFunctions);
      }
      var mode = this.mode;
      if (!this.targetObserver) {
        var method = mode === bindingMode.twoWay ? 'getObserver' : 'getAccessor';
        this.targetObserver = this.observerLocator[method](this.target, this.targetProperty);
      }
      if ('bind' in this.targetObserver) {
        this.targetObserver.bind();
      }
      var value = sourceExpression.evaluate(source, this.lookupFunctions);
      this.updateTarget(value);
      if (mode === bindingMode.oneWay) {
        enqueueBindingConnect(this);
      } else if (mode === bindingMode.twoWay) {
        sourceExpression.connect(this, source);
        this.targetObserver.subscribe(targetContext, this);
      }
    };
    Binding.prototype.unbind = function unbind() {
      if (!this.isBound) {
        return;
      }
      this.isBound = false;
      if (this.sourceExpression.unbind) {
        this.sourceExpression.unbind(this, this.source);
      }
      this.source = null;
      if ('unbind' in this.targetObserver) {
        this.targetObserver.unbind();
      }
      if (this.targetObserver.unsubscribe) {
        this.targetObserver.unsubscribe(targetContext, this);
      }
      this.unobserve(true);
    };
    Binding.prototype.connect = function connect(evaluate) {
      if (!this.isBound) {
        return;
      }
      if (evaluate) {
        var value = this.sourceExpression.evaluate(this.source, this.lookupFunctions);
        this.updateTarget(value);
      }
      this.sourceExpression.connect(this, this.source);
    };
    var _Binding = Binding;
    Binding = connectable()(Binding) || Binding;
    return Binding;
  })();
  exports.Binding = Binding;
  var CallExpression = (function() {
    function CallExpression(observerLocator, targetProperty, sourceExpression, lookupFunctions) {
      _classCallCheck(this, CallExpression);
      this.observerLocator = observerLocator;
      this.targetProperty = targetProperty;
      this.sourceExpression = sourceExpression;
      this.lookupFunctions = lookupFunctions;
    }
    CallExpression.prototype.createBinding = function createBinding(target) {
      return new Call(this.observerLocator, this.sourceExpression, target, this.targetProperty, this.lookupFunctions);
    };
    return CallExpression;
  })();
  exports.CallExpression = CallExpression;
  var Call = (function() {
    function Call(observerLocator, sourceExpression, target, targetProperty, lookupFunctions) {
      _classCallCheck(this, Call);
      this.sourceExpression = sourceExpression;
      this.target = target;
      this.targetProperty = observerLocator.getObserver(target, targetProperty);
      this.lookupFunctions = lookupFunctions;
    }
    Call.prototype.callSource = function callSource($event) {
      var overrideContext = this.source.overrideContext;
      Object.assign(overrideContext, $event);
      overrideContext.$event = $event;
      var mustEvaluate = true;
      var result = this.sourceExpression.evaluate(this.source, this.lookupFunctions, mustEvaluate);
      delete overrideContext.$event;
      for (var prop in $event) {
        delete overrideContext[prop];
      }
      return result;
    };
    Call.prototype.bind = function bind(source) {
      var _this5 = this;
      if (this.isBound) {
        if (this.source === source) {
          return;
        }
        this.unbind();
      }
      this.isBound = true;
      this.source = source;
      var sourceExpression = this.sourceExpression;
      if (sourceExpression.bind) {
        sourceExpression.bind(this, source, this.lookupFunctions);
      }
      this.targetProperty.setValue(function($event) {
        return _this5.callSource($event);
      });
    };
    Call.prototype.unbind = function unbind() {
      if (!this.isBound) {
        return;
      }
      this.isBound = false;
      if (this.sourceExpression.unbind) {
        this.sourceExpression.unbind(this, this.source);
      }
      this.source = null;
      this.targetProperty.setValue(null);
    };
    return Call;
  })();
  exports.Call = Call;
  var ValueConverterResource = (function() {
    function ValueConverterResource(name) {
      _classCallCheck(this, ValueConverterResource);
      this.name = name;
    }
    ValueConverterResource.convention = function convention(name) {
      if (name.endsWith('ValueConverter')) {
        return new ValueConverterResource(camelCase(name.substring(0, name.length - 14)));
      }
    };
    ValueConverterResource.prototype.initialize = function initialize(container, target) {
      this.instance = container.get(target);
    };
    ValueConverterResource.prototype.register = function register(registry, name) {
      registry.registerValueConverter(name || this.name, this.instance);
    };
    ValueConverterResource.prototype.load = function load(container, target) {};
    return ValueConverterResource;
  })();
  exports.ValueConverterResource = ValueConverterResource;
  function valueConverter(nameOrTarget) {
    if (nameOrTarget === undefined || typeof nameOrTarget === 'string') {
      return function(target) {
        _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, new ValueConverterResource(nameOrTarget), target);
      };
    }
    _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, new ValueConverterResource(), nameOrTarget);
  }
  var BindingBehaviorResource = (function() {
    function BindingBehaviorResource(name) {
      _classCallCheck(this, BindingBehaviorResource);
      this.name = name;
    }
    BindingBehaviorResource.convention = function convention(name) {
      if (name.endsWith('BindingBehavior')) {
        return new BindingBehaviorResource(camelCase(name.substring(0, name.length - 15)));
      }
    };
    BindingBehaviorResource.prototype.initialize = function initialize(container, target) {
      this.instance = container.get(target);
    };
    BindingBehaviorResource.prototype.register = function register(registry, name) {
      registry.registerBindingBehavior(name || this.name, this.instance);
    };
    BindingBehaviorResource.prototype.load = function load(container, target) {};
    return BindingBehaviorResource;
  })();
  exports.BindingBehaviorResource = BindingBehaviorResource;
  function bindingBehavior(nameOrTarget) {
    if (nameOrTarget === undefined || typeof nameOrTarget === 'string') {
      return function(target) {
        _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, new BindingBehaviorResource(nameOrTarget), target);
      };
    }
    _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, new BindingBehaviorResource(), nameOrTarget);
  }
  var ListenerExpression = (function() {
    function ListenerExpression(eventManager, targetEvent, sourceExpression, delegate, preventDefault, lookupFunctions) {
      _classCallCheck(this, ListenerExpression);
      this.eventManager = eventManager;
      this.targetEvent = targetEvent;
      this.sourceExpression = sourceExpression;
      this.delegate = delegate;
      this.discrete = true;
      this.preventDefault = preventDefault;
      this.lookupFunctions = lookupFunctions;
    }
    ListenerExpression.prototype.createBinding = function createBinding(target) {
      return new Listener(this.eventManager, this.targetEvent, this.delegate, this.sourceExpression, target, this.preventDefault, this.lookupFunctions);
    };
    return ListenerExpression;
  })();
  exports.ListenerExpression = ListenerExpression;
  var Listener = (function() {
    function Listener(eventManager, targetEvent, delegate, sourceExpression, target, preventDefault, lookupFunctions) {
      _classCallCheck(this, Listener);
      this.eventManager = eventManager;
      this.targetEvent = targetEvent;
      this.delegate = delegate;
      this.sourceExpression = sourceExpression;
      this.target = target;
      this.preventDefault = preventDefault;
      this.lookupFunctions = lookupFunctions;
    }
    Listener.prototype.callSource = function callSource(event) {
      var overrideContext = this.source.overrideContext;
      overrideContext.$event = event;
      var mustEvaluate = true;
      var result = this.sourceExpression.evaluate(this.source, this.lookupFunctions, mustEvaluate);
      delete overrideContext.$event;
      if (result !== true && this.preventDefault) {
        event.preventDefault();
      }
      return result;
    };
    Listener.prototype.bind = function bind(source) {
      var _this6 = this;
      if (this.isBound) {
        if (this.source === source) {
          return;
        }
        this.unbind();
      }
      this.isBound = true;
      this.source = source;
      var sourceExpression = this.sourceExpression;
      if (sourceExpression.bind) {
        sourceExpression.bind(this, source, this.lookupFunctions);
      }
      this._disposeListener = this.eventManager.addEventListener(this.target, this.targetEvent, function(event) {
        return _this6.callSource(event);
      }, this.delegate);
    };
    Listener.prototype.unbind = function unbind() {
      if (!this.isBound) {
        return;
      }
      this.isBound = false;
      if (this.sourceExpression.unbind) {
        this.sourceExpression.unbind(this, this.source);
      }
      this.source = null;
      this._disposeListener();
      this._disposeListener = null;
    };
    return Listener;
  })();
  exports.Listener = Listener;
  function getAU(element) {
    var au = element.au;
    if (au === undefined) {
      throw new Error('No Aurelia APIs are defined for the referenced element.');
    }
    return au;
  }
  var NameExpression = (function() {
    function NameExpression(sourceExpression, apiName) {
      _classCallCheck(this, NameExpression);
      this.sourceExpression = sourceExpression;
      this.apiName = apiName;
      this.discrete = true;
    }
    NameExpression.prototype.createBinding = function createBinding(target) {
      return new NameBinder(this.sourceExpression, NameExpression.locateAPI(target, this.apiName));
    };
    NameExpression.locateAPI = function locateAPI(element, apiName) {
      switch (apiName) {
        case 'element':
          return element;
        case 'controller':
          return getAU(element).controller;
        case 'view-model':
          return getAU(element).controller.viewModel;
        case 'view':
          return getAU(element).controller.view;
        default:
          var target = getAU(element)[apiName];
          if (target === undefined) {
            throw new Error('Attempted to reference "' + apiName + '", but it was not found amongst the target\'s API.');
          }
          return target.viewModel;
      }
    };
    return NameExpression;
  })();
  exports.NameExpression = NameExpression;
  var NameBinder = (function() {
    function NameBinder(sourceExpression, target) {
      _classCallCheck(this, NameBinder);
      this.sourceExpression = sourceExpression;
      this.target = target;
    }
    NameBinder.prototype.bind = function bind(source) {
      if (this.isBound) {
        if (this.source === source) {
          return;
        }
        this.unbind();
      }
      this.isBound = true;
      this.source = source;
      this.sourceExpression.assign(this.source, this.target);
    };
    NameBinder.prototype.unbind = function unbind() {
      if (!this.isBound) {
        return;
      }
      this.isBound = false;
      this.sourceExpression.assign(this.source, null);
      this.source = null;
    };
    return NameBinder;
  })();
  var lookupFunctions = {
    bindingBehaviors: function bindingBehaviors(name) {
      return null;
    },
    valueConverters: function valueConverters(name) {
      return null;
    }
  };
  var BindingEngine = (function() {
    _createClass(BindingEngine, null, [{
      key: 'inject',
      value: [ObserverLocator, Parser],
      enumerable: true
    }]);
    function BindingEngine(observerLocator, parser) {
      _classCallCheck(this, BindingEngine);
      this.observerLocator = observerLocator;
      this.parser = parser;
    }
    BindingEngine.prototype.createBindingExpression = function createBindingExpression(targetProperty, sourceExpression) {
      var mode = arguments.length <= 2 || arguments[2] === undefined ? bindingMode.oneWay : arguments[2];
      var lookupFunctions = arguments.length <= 3 || arguments[3] === undefined ? lookupFunctions : arguments[3];
      return (function() {
        return new BindingExpression(this.observerLocator, targetProperty, this.parser.parse(sourceExpression), mode, lookupFunctions);
      }).apply(this, arguments);
    };
    BindingEngine.prototype.propertyObserver = function propertyObserver(obj, propertyName) {
      var _this7 = this;
      return {subscribe: function subscribe(callback) {
          var observer = _this7.observerLocator.getObserver(obj, propertyName);
          observer.subscribe(callback);
          return {dispose: function dispose() {
              return observer.unsubscribe(callback);
            }};
        }};
    };
    BindingEngine.prototype.collectionObserver = function collectionObserver(collection) {
      var _this8 = this;
      return {subscribe: function subscribe(callback) {
          var observer = undefined;
          if (collection instanceof Array) {
            observer = _this8.observerLocator.getArrayObserver(collection);
          } else if (collection instanceof Map) {
            observer = _this8.observerLocator.getMapObserver(collection);
          } else if (collection instanceof Set) {
            observer = _this8.observerLocator.getSetObserver(collection);
          } else {
            throw new Error('collection must be an instance of Array, Map or Set.');
          }
          observer.subscribe(callback);
          return {dispose: function dispose() {
              return observer.unsubscribe(callback);
            }};
        }};
    };
    BindingEngine.prototype.expressionObserver = function expressionObserver(bindingContext, expression) {
      var scope = {
        bindingContext: bindingContext,
        overrideContext: createOverrideContext(bindingContext)
      };
      return new ExpressionObserver(scope, this.parser.parse(expression), this.observerLocator);
    };
    BindingEngine.prototype.parseExpression = function parseExpression(expression) {
      return this.parser.parse(expression);
    };
    BindingEngine.prototype.registerAdapter = function registerAdapter(adapter) {
      this.observerLocator.addAdapter(adapter);
    };
    return BindingEngine;
  })();
  exports.BindingEngine = BindingEngine;
  var ExpressionObserver = (function() {
    function ExpressionObserver(scope, expression, observerLocator) {
      _classCallCheck(this, _ExpressionObserver);
      this.scope = scope;
      this.expression = expression;
      this.observerLocator = observerLocator;
    }
    ExpressionObserver.prototype.subscribe = function subscribe(callback) {
      var _this9 = this;
      if (!this.hasSubscribers()) {
        this.oldValue = this.expression.evaluate(this.scope, lookupFunctions);
        this.expression.connect(this, this.scope);
      }
      this.addSubscriber(callback);
      return {dispose: function dispose() {
          if (_this9.removeSubscriber(callback) && !_this9.hasSubscribers()) {
            _this9.unobserve(true);
          }
        }};
    };
    ExpressionObserver.prototype.call = function call() {
      var newValue = this.expression.evaluate(this.scope, lookupFunctions);
      var oldValue = this.oldValue;
      if (newValue !== oldValue) {
        this.oldValue = newValue;
        this.callSubscribers(newValue, oldValue);
      }
      this._version++;
      this.expression.connect(this, this.scope);
      this.unobserve(false);
    };
    var _ExpressionObserver = ExpressionObserver;
    ExpressionObserver = subscriberCollection()(ExpressionObserver) || ExpressionObserver;
    ExpressionObserver = connectable()(ExpressionObserver) || ExpressionObserver;
    return ExpressionObserver;
  })();
  var setProto = Set.prototype;
  function _getSetObserver(taskQueue, set) {
    return ModifySetObserver['for'](taskQueue, set);
  }
  var ModifySetObserver = (function(_ModifyCollectionObserver4) {
    _inherits(ModifySetObserver, _ModifyCollectionObserver4);
    function ModifySetObserver(taskQueue, set) {
      _classCallCheck(this, ModifySetObserver);
      _ModifyCollectionObserver4.call(this, taskQueue, set);
    }
    ModifySetObserver['for'] = function _for(taskQueue, set) {
      if (!('__set_observer__' in set)) {
        var observer = ModifySetObserver.create(taskQueue, set);
        Object.defineProperty(set, '__set_observer__', {
          value: observer,
          enumerable: false,
          configurable: false
        });
      }
      return set.__set_observer__;
    };
    ModifySetObserver.create = function create(taskQueue, set) {
      var observer = new ModifySetObserver(taskQueue, set);
      var proto = setProto;
      if (proto.add !== set.add || proto['delete'] !== set['delete'] || proto.clear !== set.clear) {
        proto = {
          add: set.add,
          'delete': set['delete'],
          clear: set.clear
        };
      }
      set['add'] = function() {
        var type = 'add';
        var oldSize = set.size;
        var methodCallResult = proto['add'].apply(set, arguments);
        var hasValue = set.size === oldSize;
        if (!hasValue) {
          observer.addChangeRecord({
            type: type,
            object: set,
            value: Array.from(set).pop()
          });
        }
        return methodCallResult;
      };
      set['delete'] = function() {
        var hasValue = set.has(arguments[0]);
        var methodCallResult = proto['delete'].apply(set, arguments);
        if (hasValue) {
          observer.addChangeRecord({
            type: 'delete',
            object: set,
            value: arguments[0]
          });
        }
        return methodCallResult;
      };
      set['clear'] = function() {
        var methodCallResult = proto['clear'].apply(set, arguments);
        observer.addChangeRecord({
          type: 'clear',
          object: set
        });
        return methodCallResult;
      };
      return observer;
    };
    return ModifySetObserver;
  })(ModifyCollectionObserver);
  function observable(targetOrConfig, key, descriptor) {
    var deco = function deco(target, key2, descriptor2) {
      var innerPropertyName = '_' + key2;
      var callbackName = targetOrConfig && targetOrConfig.changeHandler || key2 + 'Changed';
      var babel = descriptor2 !== undefined;
      if (babel) {
        if (typeof descriptor2.initializer === 'function') {
          target[innerPropertyName] = descriptor2.initializer();
        }
      } else {
        descriptor2 = {};
      }
      delete descriptor2.writable;
      delete descriptor2.initializer;
      descriptor2.get = function() {
        return this[innerPropertyName];
      };
      descriptor2.set = function(newValue) {
        var oldValue = this[innerPropertyName];
        this[innerPropertyName] = newValue;
        if (this[callbackName]) {
          this[callbackName](newValue, oldValue);
        }
      };
      descriptor2.get.dependencies = [innerPropertyName];
      if (!babel) {
        Object.defineProperty(target, key2, descriptor2);
      }
    };
    if (key) {
      var target = targetOrConfig;
      targetOrConfig = null;
      return deco(target, key, descriptor);
    }
    return deco;
  }
});

_removeDefine();
})();
(function() {
var _removeDefine = System.get("@@amd-helpers").createDefine();
define("npm:aurelia-binding@1.0.0-beta.1.2.2", ["npm:aurelia-binding@1.0.0-beta.1.2.2/aurelia-binding"], function(main) {
  return main;
});

_removeDefine();
})();
System.register("zzzz", ["npm:aurelia-binding@1.0.0-beta.1.2.2", "npm:aurelia-bootstrapper@1.0.0-beta.1.1.4", "npm:aurelia-dependency-injection@1.0.0-beta.1.1.5", "npm:aurelia-event-aggregator@1.0.0-beta.1.1.1", "npm:aurelia-fetch-client@1.0.0-beta.1.1.1", "npm:aurelia-framework@1.0.0-beta.1.1.4", "npm:aurelia-history@1.0.0-beta.1.1.1", "npm:aurelia-history-browser@1.0.0-beta.1.1.4", "npm:aurelia-http-client@1.0.0-beta.1.1.2", "npm:aurelia-loader@1.0.0-beta.1.1.1", "npm:aurelia-loader-default@1.0.0-beta.1.1.3", "npm:aurelia-logging@1.0.0-beta.1.1.2", "npm:aurelia-logging-console@1.0.0-beta.1.1.4", "npm:aurelia-metadata@1.0.0-beta.1.1.6", "npm:aurelia-path@1.0.0-beta.1.1.1", "npm:aurelia-polyfills@1.0.0-beta.1.0.1", "npm:aurelia-route-recognizer@1.0.0-beta.1.1.3", "npm:aurelia-router@1.0.0-beta.1.1.3", "npm:aurelia-task-queue@1.0.0-beta.1.1.1", "npm:aurelia-templating@1.0.0-beta.1.1.4", "npm:aurelia-templating-binding@1.0.0-beta.1.1.2", "npm:aurelia-templating-resources@1.0.0-beta.1.1.3", "npm:aurelia-templating-router@1.0.0-beta.1.1.2", "github:systemjs/plugin-css@0.1.20", "github:github/fetch@0.11.0", "npm:moment@2.11.2", "npm:numeral@1.5.3", "github:systemjs/plugin-text@0.0.7"], function(_export) {
  'use strict';
  return {
    setters: [function(_aureliaBinding) {}, function(_aureliaBootstrapper) {}, function(_aureliaDependencyInjection) {}, function(_aureliaEventAggregator) {}, function(_aureliaFetchClient) {}, function(_aureliaFramework) {}, function(_aureliaHistory) {}, function(_aureliaHistoryBrowser) {}, function(_aureliaHttpClient) {}, function(_aureliaLoader) {}, function(_aureliaLoaderDefault) {}, function(_aureliaLogging) {}, function(_aureliaLoggingConsole) {}, function(_aureliaMetadata) {}, function(_aureliaPath) {}, function(_aureliaPolyfills) {}, function(_aureliaRouteRecognizer) {}, function(_aureliaRouter) {}, function(_aureliaTaskQueue) {}, function(_aureliaTemplating) {}, function(_aureliaTemplatingBinding) {}, function(_aureliaTemplatingResources) {}, function(_aureliaTemplatingRouter) {}, function(_css) {}, function(_fetch) {}, function(_moment) {}, function(_numeral) {}, function(_text) {}],
    execute: function() {}
  };
});

//# sourceMappingURL=aurelia-bundle.js.map
/* */ 
var $ = require('./_'),
    $export = require('./_export'),
    ownKeys = require('./_own-keys'),
    toIObject = require('./_to-iobject'),
    createDesc = require('./_property-desc');
$export($export.S, 'Object', {getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object),
        setDesc = $.setDesc,
        getDesc = $.getDesc,
        keys = ownKeys(O),
        result = {},
        i = 0,
        key,
        D;
    while (keys.length > i) {
      D = getDesc(O, key = keys[i++]);
      if (key in result)
        setDesc(result, key, createDesc(0, D));
      else
        result[key] = D;
    }
    return result;
  }});

/**
 * @since 15.04
 * @author Sven Hofrichter - 15.04 - initial version
 * @author Sven Hofrichter - 15.05 - 'watch' and 'unwatch' added
 */
 
/**
 * Extension for the JavaScript-Object. This function implements a recursive
 * lookup for keys. The parameter keys can be an object (json-expression) too,
 * to define a recursive search.
 * 
 * Example usage:
 * var obj = {
 *     k1: {
 *         k11:'v11',
 *         k12:'v12',
 *         k13:'v13'
 *     },
 *     k2: {
 *         k21:'v21',
 *         k22: {
 *             k221:'v221',
 *             k222:'v222',
 *             k223:'v223'
 *         }
 *         k23:'v23'
 *     }
 * };
 * var search1 = {k2:{k22:'k223'}}; // the deepest key is the value of its parent
 * var result1 = obj.containsKey(search1); // returns true
 *
 * var search2 = {k2:{k22:['k221','k223']}}; // the deepest keys are listed as array of their parent
 * var result2 = obj.containsKey(search2); // returns true
 * 
 * @param Object keys is the key or key-structure to search for
 * @return true, if the key or key-structure was found
 */
if (typeof(Object.prototype.containsKey) !== 'function') {
    Object.prototype.containsKey = function(keys) {
        var result = true;
        if (typeof(keys) === 'string') {
            result = typeof(this[keys]) != 'undefined';
        } else if (keys instanceof Array) {
            for (var i in keys) {
                result = this.containsKey(keys[i]);
                if (!result) {
                    break;
                }
            }
        } else if (typeof(keys) === 'object') {
            for (var key in keys) {
                result = this.containsKey(key);
                if (result) {
                    if (typeof(keys[key]) === 'object') {
                        result = this[key].containsKey(keys[key]);
                    } else {
                        result = this.containsKey(keys[key]);
                    }
                }
                if (!result) {
                    break;
                }
            }
        }
        return result;
    };
};
if (typeof(Object.prototype.length) !== 'function') {
    Object.prototype.length = function(deep) {
        var result = 0;
        for (var key in this) {
            if (deep && typeof(this[key]) === 'object') {
                result += this[key].length(deep);
            } else {
                result++;
            }
        }
        return result;
    };
};
/**
 * Extension for the JavaScript-base-Object that implements a deep-copy of the
 * object. It returns the copy of the object.
 * 
 * Example usage:
 * var obj = {
 *      'attr1': 1,
 *      'attr2': [1,2,3,4,5,6,7],
 *      'attr3': {
 *          'subAttr1': 1,
 *          'subAttr2': [1,2,3,4,5,6,7],
 *          'subAttr3': {
 *              'subAttr31': 1,
 *              'subAttr32': [1,2,3,4,5,6,7]
 *          }
 *      }
 * }
 * var result = obj.clone();
 * 
 * @return the copy of the object
 */
if (typeof(Object.clone) !== 'function') {
    Object.defineProperty(Object.prototype, "clone", {
        enumerable:false,
        value:function() {
            var result = (this instanceof Array) ? [] : {};
            for (var key in this) {
                if (this[key] && typeof(this[key]) === 'object') {
                    result[key] = this[key].clone();
                } else {
                    result[key] = this[key];
                }
            }
            return result;
        }
    });
};

/**
 * This function implements a value change listener on a object structure.
 *
 * Example usage:
 * var obj = {
 *      'attr1': 1,
 *      'attr2': [1,2,3,4,5,6,7],
 *      'attr3': {
 *          'subAttr1': 1,
 *          'subAttr2': [1,2,3,4,5,6,7],
 *          'subAttr3': {
 *              'subAttr31': 1,
 *              'subAttr32': [1,2,3,4,5,6,7]
 *          }
 *      }
 * }
 * obj.watch('attr1', function(property, oldValue, newValue) {
 *     console.log('Property "' + property + '" changed from "' + oldValue + '" to  "' + newValue + '".');
 *     // here you can do something with the new value, before setting it to the object
 *     return newValue;
 * });
 *
 * @see https://gist.github.com/eligrey/384583
 */
if (typeof(Object.prototype.watch) !== 'function') {
    Object.defineProperty(Object.prototype, "watch", {
          enumerable: false
        , configurable: true
        , writable: false
        , value: function (prop, handler) {
            var
              oldval = this[prop]
            , newval = oldval
            , getter = function () {
                return newval;
            }
            , setter = function (val) {
                oldval = newval;
                return newval = handler.call(this, prop, oldval, val);
            }
            ;
            
            if (delete this[prop]) { // can't watch constants, arrays and sub-objects
                console.log('Can not watch ' + prop + ': it is either a constant, an array or a sub-object.');
                Object.defineProperty(this, prop, {
                      get: getter
                    , set: setter
                    , enumerable: true
                    , configurable: true
                });
            } else {
                console.log('watching "' + prop + '" ...');
            }
        }
    });
}

/**
 * This function removes the value change listener from the object structure.
 *
 * Example usage:
 * var obj = {
 *      'attr1': 1,
 *      'attr2': [1,2,3,4,5,6,7],
 *      'attr3': {
 *          'subAttr1': 1,
 *          'subAttr2': [1,2,3,4,5,6,7],
 *          'subAttr3': {
 *              'subAttr31': 1,
 *              'subAttr32': [1,2,3,4,5,6,7]
 *          }
 *      }
 * }
 * obj.unwatch('attr1');
 *
 * @see https://gist.github.com/eligrey/384583
 */
if (!Object.prototype.unwatch) {
    Object.defineProperty(Object.prototype, "unwatch", {
          enumerable: false
        , configurable: true
        , writable: false
        , value: function (prop) {
            var val = this[prop];
            delete this[prop]; // remove accessors
            this[prop] = val;
        }
    });
}
/**
 * (c) 2015 - http://www.hofrichter.net - Sven Hofrichter - javascript@hofrichter.net
 * 
 * 
 * <p>
 * This js-utility-function implements recursion on java-script objects. It
 * traverses its calls as soon, as the value is an javascript-object (not array).
 * </p>
 * <p>
 * An example:
 * </p>
 * <pre>
 * // The object
 * var myObject = {
 *      'one': 1,
 *      'two': 2,
 *      'many': {
 *          'one': 3,
 *          'two': 4,
 *       }
 * };
 * // The function to recursive:
 * function addOne(value) {
 *     return value + 1;
 * }
 * // just do it
 * var result = recurive(addOne, myObject);
 * // the result should be now:
 * value of result: {
 *      'one': 2,
 *      'two': 3,
 *      'many': {
 *          'one': 4,
 *          'two': 5,
 *       }
 * };
 * </pre>
 * 
 * @since 15.03
 * @author Sven Hofrichter - 15.03 - initial version
 */
if (typeof(recursive) == 'undefined') {
    function recursive(callback, data) {
        if (typeof(data) == 'undefined' || data == null) {
            Logger.debug('recursive(<callback>, <data>): <data> was undefined!');
            return null;
        } else if (typeof(callback) == 'undefined' || callback == null) {
            Logger.debug('recursive(<callback>, <data>): <callback> was undefined!');
            return null;
        } else if (typeof(data) == 'object') {
            var result = {};
            for (var key in data) {
                result[key] = recursive(callback, data[key]);
            }
            return result;
        } else if (typeof(data) != 'function') {
            if (!Logger.trace('recursive(<callback>, <data>): Running callback-function for "' + data + '"')) {
                Logger.debug('recursive(<callback>, <data>): Running callback-function');
            }
            return callback(data);
        }
    }
}

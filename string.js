/**
 * @since 14.04
 * @author Sven Hofrichter - 14.04 - initial version
 */
 
/**
 * Extension for the JavaScript-String-object. This function implements 'endsWidth',
 * a well known function in other languages. It returns true, as soon as the given
 * string was found in the current String-object.
 * 
 * An example:
 * var str = 'This is a test';
 * var result1 = str.endsWith('a test');  // this returns true, because 'a test' can be found at the end of the value of the variable 'str'
 * var result2 = str.endsWith('This is'); // this returns false, because the 'This is' is part of the variable 'str', but not at the end of it
 * 
 * @param suffix is the value that we are looking for in the current String-instance
 * @return true, as soon as the suffix can be 
 */
if (typeof(String.prototype.endsWith) !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
};
/**
 * Extension for the JavaScript-String-object. This function implements escaping
 * of special character in the current String-object and can be used to prepare
 * a string for the uses of regulare expression.
 * 
 * Example usage:
 * var str = 'This is a test';
 * var result = str.escape();
 * 
 * @return the escaped String
 */
if (typeof(String.prototype.escape) !== 'function') {
    String.prototype.escape = function() {
        return this.replace(/[\\"'\!\<\>\?\.\:\(\)\[\]\{\}\-\+\~]/g, '\\$&').replace(/\u0000/g, '\\0');
    };
};
/**
 * Extension for the JavaScript-String-object to check, whether the string is
 * empty or not. A string is empty, whenever it has a length of 0 or contains
 * whitespace-characters only.
 * 
 * Example usage:
 * var str = 'This is a test';
 * var result = str.isEmpty();
 * 
 * @return true, as soon as the string was empty (see function description)
 */
if (typeof(String.prototype.isEmpty) !== 'function') {
    String.prototype.isEmpty = function() {
        return /^[\s\u0000]*$/g.test(('' + this));
    };
};
/**
 * Extension for the JavaScript-String-object to trim the content by removing
 * leading and trailing whitespace characters.
 * 
 * Example usage:
 * var str = '   This is a test   ';
 * var result = str.trim();
 * -> result == 'This is a test';
 * 
 * @return the trimmed string
 */
if (typeof(String.prototype.trim) !== 'function') {
    String.prototype.trim = function() {
        return ('' + this).replace(/^\s+/, '').replace(/\s+$/, '');
    };
};

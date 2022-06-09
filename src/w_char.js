/**
 * Module dependencies.
 */

const ref = require('ref-napi');
const Iconv = require('iconv').Iconv;

// vars used by the "wchar_t" type
let wchar_size, getter, setter;

// On Windows they're UTF-16 (2-bytes), but on Unix platform they're UTF-32
// (4-bytes).
if ('win32' == process.platform) {
    wchar_size = 2;
    getter = new Iconv('UTF-16' + ref.endianness, 'UTF-8');
    setter = new Iconv('UTF-8', 'UTF-16' + ref.endianness);
} else {
    wchar_size = 4;
    getter = new Iconv('UTF-32' + ref.endianness, 'UTF-8');
    setter = new Iconv('UTF-8', 'UTF-32' + ref.endianness);
}

// Create a "wchar_t *" type. We use the "CString" type as a base since it's pretty
// close to what we actually want. We just have to define custom "get" and "set"
// functions and then we can use this type in FFI functions.
const wchar_t = Object.create(ref.types.CString);
wchar_t.get = function get(buf, offset) {
    const _buf = buf.readPointer(offset);
    if (_buf.isNull()) {
        return null;
    }
    const stringBuf = _buf.reinterpretUntilZeros(wchar_size);
    return getter.convert(stringBuf).toString('utf8');
};
wchar_t.set = function set(buf, offset, val) {
    let _buf = val; // val is a Buffer? it better be \0 terminated...
    if ('string' == typeof val) {
        _buf = setter.convert(val + '\0');
    }
    return buf.writePointer(_buf, offset);
};

export default wchar_t;

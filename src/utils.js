import ref from 'ref-napi';

export function getDllPath() {
    const arch = require('os').arch();
    if (['x64', 'arm64', 'mipsel', 'ppc64']) {
        //64Bit proccessor
        return 'EZClient64';
    } else {
        //32Bit or something else
        return 'EZClient';
    }
}

export function fromOADate(oadate) {
    var date = new Date((oadate - 25569) * 86400000);
    var tz = date.getTimezoneOffset();
    return new Date((oadate - 25569 + tz / (60 * 24)) * 86400000);
}

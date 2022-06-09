import ref from 'ref-napi';

export function getDllPath() {
    const arch = require('os').arch();
    if (['x64', 'arm64', 'mipsel', 'ppc64'].includes(arch)) {
        //64Bit proccessor
        return 'EZClient64';
    } else {
        //32Bit or something else
        return 'EZClient';
    }
}

export function pumpStatustoStr(status_id) {
    switch (status_id) {
        case '0':
            return 'Estado inválido';
        case '1':
            return 'Nao instalada.';
        case '2':
            return 'Bomba nao responde.';
        case '3':
            return 'Em espera (desocupada).';
        case '4':
            return 'Troca de preco.';
        case '5':
            return 'Bomba Autorizada';
        case '6':
            return 'Esperando autorizacao.';
        case '7':
            return 'Abastecimeneto iniciando.';
        case '8':
            return 'Abastecendo';
        case '9':
            return 'Parada temporaria (no meio de uma abastecimento) (STOP).';
        case ':':
            return 'Abastecimento finalizando (fluxo de produto diminuindo).';
        case ';':
            return 'Abastecimento finalizado (parou de sair combustivel).';
        case '<':
            return 'Abastecimento excedeu tempo maximo.';
        case '=':
            return 'Bico fora do guarda-bico (CALL).';
        case '>':
            return 'Prazo de pre-determinacao esgotado.';
        case '?':
            return 'Abastecimento terminado (EOT)';
        case '@':
            return 'Erro (resposta de erro da bomba).';
        case 'A':
            return 'EZID nao responde.';
        case 'B':
            return 'Ultimo estado da bomba?';
        default:
            return 'Estado Inválido';
    }
}

export function fromOADate(oadate) {
    const date = new Date((oadate - 25569) * 86400000);
    const tz = date.getTimezoneOffset();
    return new Date((oadate - 25569 + tz / (60 * 24)) * 86400000);
}

export function toOADate(date) {
    const timezoneOffset = date.getTimezoneOffset() / (60 * 24);
    const msDateObj = date.getTime() / 86400000 + (25569 - timezoneOffset);
    return msDateObj;
}

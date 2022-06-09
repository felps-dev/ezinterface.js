import EZInterface from '.';

const test = new EZInterface();

test.testConnection();
console.log('Conexão OK');
const count = test.getDeliveriesCount();
console.log('Encontrado ' + count + ' abastecimentos.');

for (let index = count; index !== 0; index--) {
    const del_id = test.getDeliveryByOrdinal(index);
    console.log('Abastecimento ' + del_id + ': ');
    const abast = test.getDeliveryPropertiesEx4(del_id);
    console.log(abast);
    test.lockDelivery(del_id);
    test.clearDelivery(del_id, abast.dtype);
}

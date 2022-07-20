import EZInterface from '.';
import { pumpStatustoStr } from './utils';

const test = new EZInterface();

test.testConnection();
console.log('Conexão OK');

console.log('Testando grades');
const grade_count = test.getGradesCount();
console.log('Encontrado ' + grade_count + ' grades.');
for (let index = grade_count; index !== 0; index--) {
    const grade_id = test.getGradeByOrdinal(index);
    console.log('Grade ' + grade_id + ': ');
    const grade = test.getGradePropertiesEx(grade_id);
    console.log(grade);
}

console.log('Testando tanques');
const tank_count = test.getTanksCount();
console.log('Encontrado ' + tank_count + ' tanques.');
for (let index = tank_count; index !== 0; index--) {
    const tank_id = test.getTankByOrdinal(index);
    console.log('Tank ' + tank_id + ': ');
    const tank = test.getTankPropertiesEx(tank_id);
    console.log(tank);
}

console.log('Testando bombas');
const pump_count = test.getPumpsCount();
console.log('Encontrado ' + pump_count + ' bombas.');
for (let index = pump_count; index !== 0; index--) {
    const pump_id = test.getPumpByOrdinal(index);
    console.log('Pump ' + pump_id + ': ');
    const pump = test.getPumpPropertiesEx(pump_id);
    console.log(pump);
}

console.log('Testando bicos');
const hose_count = test.getHosesCount();
console.log('Encontrado ' + hose_count + ' bicos.');
for (let index = hose_count; index !== 0; index--) {
    const hose_id = test.getHoseByOrdinal(index);
    console.log('Hose ' + hose_id + ': ');
    const hose = test.getHosePropertiesEx2(hose_id);
    console.log(hose);
}

console.log('Testando abastecimentos');
const del_count = test.getDeliveriesCount();
console.log('Encontrado ' + del_count + ' abastecimentos.');

for (let index = del_count; index !== 0; index--) {
    const del_id = test.getDeliveryByOrdinal(index);
    console.log('Abastecimento ' + del_id + ': ');
    const abast = test.getDeliveryPropertiesEx4(del_id);
    console.log(abast);
    test.lockDelivery(del_id);
    test.clearDelivery(del_id, abast.dtype);
}

console.log('Testando Atendentes');
const attendant_count = test.getAttendantsCount();
console.log('Encontrado ' + attendant_count + ' atendentes.');

for (let index = attendant_count; index !== 0; index--) {
    const attendant_id = test.getAttendantByOrdinal(index);
    console.log('Abastecimento ' + attendant_id + ': ');
    const attendant = test.getAttendantPropertiesEx(attendant_id);
    console.log(attendant);
}

console.log('Lendo estado das bombas');
setInterval(() => {
    const all_status = test.getAllPumpStatuses();
    for (let index = 0; index < pump_count; index++) {
        console.log({
            bico: all_status.current_hose[index],
            status_num: all_status.pump_states[index],
            status: pumpStatustoStr(all_status.pump_states[index]),
        });
    }
}, 1000);

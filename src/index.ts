import ref from 'ref-napi';
import DLL from './dll.js';
import { fromOADate, toOADate } from './utils.js';
import wchar from './w_char.js';

class EZInterface {
    dll: ReturnType<typeof DLL>;

    constructor(host: string = '127.0.0.1', port: number = 5123, timeout: number = 10000, dll_path: string = '') {
        this.dll = DLL(dll_path);
        this.clientLogonEx(host, port, timeout);
    }

    goodResult(res: number) {
        if (res === 0) {
            return true;
        } else {
            throw new Error(this.dll.ResultString(res) || '');
        }
    }

    testConnection() {
        return this.goodResult(this.dll.TestConnection());
    }

    clientLogonEx(host: string, port: number = 5123, timeout: number = 10000) {
        this.goodResult(this.dll.ClientLogonEx(1, 1, host, port, 5124, timeout, 0, 0, 0));
    }

    clientLogoff() {
        this.goodResult(this.dll.ClientLogoff());
    }

    setDateTime(dt: Date) {
        this.goodResult(this.dll.SetDateTime(toOADate(dt)));
    }

    // ------------------------ PUMPS ------------------------
    getPumpsCount() {
        const ret = ref.alloc('int32*');
        this.goodResult(this.dll.GetPumpsCount(ret));
        return ret.readInt32LE();
    }

    getPumpByOrdinal(index: number) {
        const id = ref.alloc('int32*');
        this.goodResult(this.dll.GetPumpByOrdinal(index, id));
        return id.readInt32LE();
    }

    getPumpPropertiesEx(id: number) {
        const number = ref.alloc('int32*');
        const name = ref.alloc(wchar);
        const physical_number = ref.alloc('int16*');
        const side = ref.alloc('int16*');
        const address = ref.alloc('int16*');
        const price_level_1 = ref.alloc('int16*');
        const price_level_2 = ref.alloc('int16*');
        const price_dps_format = ref.alloc('int16*');
        const volume_dsp_format = ref.alloc('int16*');
        const value_dsp_format = ref.alloc('int16*');
        const type = ref.alloc('int16*');
        const port_id = ref.alloc('int32*');
        const attendant_id = ref.alloc('int32*');
        const auth_mode = ref.alloc('int16*');
        const stack_mode = ref.alloc('int16*');
        const prepay_allowed = ref.alloc('int16*');
        const preauth_allowed = ref.alloc('int16*');
        const slot_zig_bee_id = ref.alloc('int32*');
        const mux_slot_zig_bee_id = ref.alloc('int32*');
        const price_control = ref.alloc('int16*');
        const has_preset = ref.alloc('int16*');
        this.goodResult(
            this.dll.GetPumpPropertiesEx(
                id,
                number,
                name,
                physical_number,
                side,
                address,
                price_level_1,
                price_level_2,
                price_dps_format,
                volume_dsp_format,
                value_dsp_format,
                type,
                port_id,
                attendant_id,
                auth_mode,
                stack_mode,
                prepay_allowed,
                preauth_allowed,
                slot_zig_bee_id,
                mux_slot_zig_bee_id,
                price_control,
                has_preset,
            ),
        );
        return {
            number: number.readInt32LE(),
            name: name.deref(),
            physical_number: physical_number.readInt16LE(),
            side: side.readInt16LE(),
            address: address.readInt16LE(),
            price_level_1: price_level_1.readInt16LE(),
            price_level_2: price_level_2.readInt16LE(),
            price_dps_format: price_dps_format.readInt16LE(),
            volume_dsp_format: volume_dsp_format.readInt16LE(),
            value_dsp_format: value_dsp_format.readInt16LE(),
            type: type.readInt16LE(),
            port_id: port_id.readInt32LE(),
            attendant_id: attendant_id.readInt32LE(),
            auth_mode: auth_mode.readInt16LE(),
            stack_mode: stack_mode.readInt16LE(),
            prepay_allowed: prepay_allowed.readInt16LE(),
            preauth_allowed: preauth_allowed.readInt16LE(),
            slot_zig_bee_id: slot_zig_bee_id.readInt32LE(),
            mux_slot_zig_bee_id: mux_slot_zig_bee_id.readInt32LE(),
            price_control: price_control.readInt16LE(),
            has_preset: has_preset.readInt16LE(),
        };
    }

    getPumpHoseByNumber(bomba: number, bico: number) {
        const ret = ref.alloc('int32*');
        this.goodResult(this.dll.GetPumpHoseByNumber(bomba, bico, ret));
        return ret.readInt32LE();
    }

    getAllPumpStatuses() {
        const pump_states = ref.alloc(wchar);
        const current_hose = ref.alloc(wchar);
        const deliveries_count = ref.alloc(wchar);
        this.goodResult(this.dll.GetAllPumpStatuses(pump_states, current_hose, deliveries_count));
        return {
            pump_states: pump_states.deref(),
            current_hose: current_hose.deref(),
            deliveries_count: deliveries_count.deref(),
        };
    }

    // -------------------- DELIVERIES ----------------------
    getDeliveriesCount() {
        const ret = ref.alloc('int32*');
        this.goodResult(this.dll.GetDeliveriesCount(ret));
        return ret.readInt32LE();
    }

    getDeliveryByOrdinal(index: number) {
        const id = ref.alloc('int32*');
        this.goodResult(this.dll.GetDeliveryByOrdinal(index, id));
        return id.readInt32LE();
    }

    getDeliveryPropertiesEx4(id: number) {
        const hose_id = ref.alloc('int32*');
        const state = ref.alloc('int16*');
        const dtype = ref.alloc('int16*');
        const volume = ref.alloc('double*');
        const price_level = ref.alloc('int16*');
        const price = ref.alloc('double*');
        const value = ref.alloc('double*');
        const volume_2 = ref.alloc('double*');
        const completed_dt = ref.alloc('double*');
        const locked_by = ref.alloc('int32*');
        const reserved_by = ref.alloc('int32*');
        const attendant_id = ref.alloc('int32*');
        const age = ref.alloc('int32*');
        const cleared_dt = ref.alloc('double*');
        const old_volume_etot = ref.alloc('double*');
        const oldvolume2_etot = ref.alloc('double*');
        const oldvalue_etot = ref.alloc('double*');
        const newvolume_etot = ref.alloc('double*');
        const newvolume2_etot = ref.alloc('double*');
        const newvalue_etot = ref.alloc('double*');
        const tag = ref.alloc('int64*');
        const duration = ref.alloc('int32*');
        const card_cliente_id = ref.alloc('int32*');
        const peak_flow_rate = ref.alloc('double*');
        this.goodResult(
            this.dll.GetDeliveryPropertiesEx4(
                id,
                hose_id,
                state,
                dtype,
                volume,
                price_level,
                price,
                value,
                volume_2,
                completed_dt,
                locked_by,
                reserved_by,
                attendant_id,
                age,
                cleared_dt,
                old_volume_etot,
                oldvolume2_etot,
                oldvalue_etot,
                newvolume_etot,
                newvolume2_etot,
                newvalue_etot,
                tag,
                duration,
                card_cliente_id,
                peak_flow_rate,
            ),
        );
        return {
            id: id,
            hose_id: hose_id.readInt32LE(),
            state: state.readInt16LE(),
            dtype: dtype.readInt16LE(),
            volume: volume.readDoubleLE(),
            price_level: price_level.readInt16LE(),
            price: price.readDoubleLE(),
            value: value.readDoubleLE(),
            volume_2: volume_2.readDoubleLE(),
            completed_dt: fromOADate(completed_dt.readDoubleLE()),
            locked_by: locked_by.readInt32LE(),
            reserved_by: reserved_by.readInt32LE(),
            attendant_id: attendant_id.readInt32LE(),
            age: age.readInt32LE(),
            cleared_dt: fromOADate(cleared_dt.readDoubleLE()),
            old_volume_etot: old_volume_etot.readDoubleLE(),
            oldvolume2_etot: oldvolume2_etot.readDoubleLE(),
            oldvalue_etot: oldvalue_etot.readDoubleLE(),
            newvolume_etot: newvolume_etot.readDoubleLE(),
            newvolume2_etot: newvolume2_etot.readDoubleLE(),
            newvalue_etot: newvalue_etot.readDoubleLE(),
            tag: tag.readInt64LE(),
            duration: duration.readInt32LE(),
            card_cliente_id: card_cliente_id.readInt32LE(),
            peak_flow_rate: peak_flow_rate.readDoubleLE(),
        };
    }

    lockDelivery(id: number) {
        return this.goodResult(this.dll.LockDelivery(id));
    }

    clearDelivery(id: number, dtype: number) {
        return this.goodResult(this.dll.ClearDelivery(id, dtype));
    }

    // ------------------- HOSES ------------------------
    getHosesCount() {
        const ret = ref.alloc('int32*');
        this.goodResult(this.dll.GetHosesCount(ret));
        return ret.readInt32LE();
    }

    getHoseByOrdinal(index: number) {
        const id = ref.alloc('int32*');
        this.goodResult(this.dll.GetHoseByOrdinal(index, id));
        return id.readInt32LE();
    }

    getHosePropertiesEx2(id: number) {
        const number = ref.alloc('int32*');
        const pump_id = ref.alloc('int32*');
        const tank_id = ref.alloc('int32*');
        const physical_number = ref.alloc('int32*');
        const mtr_theo_value = ref.alloc('double*');
        const mtr_theo_volume = ref.alloc('double*');
        const mtr_elec_value = ref.alloc('double*');
        const mtr_elec_volume = ref.alloc('double*');
        const uve_antenna = ref.alloc('int16*');
        const price_1 = ref.alloc('double*');
        const price_2 = ref.alloc('double*');
        const enabled = ref.alloc('int16*');
        this.goodResult(
            this.dll.GetHosePropertiesEx2(
                id,
                number,
                pump_id,
                tank_id,
                physical_number,
                mtr_theo_value,
                mtr_theo_volume,
                mtr_elec_value,
                mtr_elec_volume,
                uve_antenna,
                price_1,
                price_2,
                enabled,
            ),
        );
        return {
            number: number.readInt32LE(),
            pump_id: pump_id.readInt32LE(),
            tank_id: tank_id.readInt32LE(),
            physical_number: physical_number.readInt32LE(),
            mtr_theo_value: mtr_theo_value.readDoubleLE(),
            mtr_theo_volume: mtr_theo_volume.readDoubleLE(),
            mtr_elec_value: mtr_elec_value.readDoubleLE(),
            mtr_elec_volume: mtr_elec_volume.readDoubleLE(),
            uve_antenna: uve_antenna.readInt16LE(),
            price_1: price_1.readDoubleLE(),
            price_2: price_2.readDoubleLE(),
            enabled: enabled.readInt16LE(),
        };
    }

    getHoseSummaryEx(id: number) {
        const number = ref.alloc('int32*');
        const physical_number = ref.alloc('int32*');
        const pump_id = ref.alloc('int32*');
        const pump_number = ref.alloc('int32*');
        const pump_name = ref.alloc(wchar);
        const tank_id = ref.alloc('int32*');
        const tank_number = ref.alloc('int32*');
        const tank_name = ref.alloc(wchar);
        const grade_id = ref.alloc('int32*');
        const grade_number = ref.alloc('int32*');
        const grade_name = ref.alloc(wchar);
        const grade_short_name = ref.alloc(wchar);
        const grade_code = ref.alloc(wchar);
        const mtr_theo_value = ref.alloc('double*');
        const mtr_theo_volume = ref.alloc('double*');
        const mtr_elec_value = ref.alloc('double*');
        const mtr_elec_volume = ref.alloc('double*');
        const price_1 = ref.alloc('double*');
        const price_2 = ref.alloc('double*');
        const enabled = ref.alloc('int16*');
        this.goodResult(
            this.dll.GetHoseSummaryEx(
                id,
                number,
                physical_number,
                pump_id,
                pump_number,
                pump_name,
                tank_id,
                tank_number,
                tank_name,
                grade_id,
                grade_number,
                grade_name,
                grade_short_name,
                grade_code,
                mtr_theo_value,
                mtr_theo_volume,
                mtr_elec_value,
                mtr_elec_volume,
                price_1,
                price_2,
                enabled,
            ),
        );
        return {
            number: number.readInt32LE(),
            physical_number: physical_number.readInt32LE(),
            pump_id: pump_id.readInt32LE(),
            pump_number: pump_number.readInt32LE(),
            pump_name: pump_name.deref(),
            tank_id: tank_id.readInt32LE(),
            tank_number: tank_number.readInt32LE(),
            tank_name: tank_name.deref(),
            grade_id: grade_id.readInt32LE(),
            grade_number: grade_number.readInt32LE(),
            grade_name: grade_name.deref(),
            grade_short_name: grade_short_name.deref(),
            grade_code: grade_code.deref(),
            mtr_theo_value: mtr_theo_value.readDoubleLE(),
            mtr_theo_volume: mtr_theo_volume.readDoubleLE(),
            mtr_elec_value: mtr_elec_value.readDoubleLE(),
            mtr_elec_volume: mtr_elec_volume.readDoubleLE(),
            price_1: price_1.readDoubleLE(),
            price_2: price_2.readDoubleLE(),
            enabled: enabled.readInt16LE(),
        };
    }

    SetHosePrices(hose_id: number, duration_type: number, price_type: number, price_1: number, price2: number) {
        return this.goodResult(this.dll.SetHosePrices(hose_id, duration_type, price_type, price_1, price2));
    }

    // ------------------- GRADES --------------------------------
    getGradesCount() {
        const ret = ref.alloc('int32*');
        this.goodResult(this.dll.GetGradesCount(ret));
        return ret.readInt32LE();
    }

    getGradeByOrdinal(index: number) {
        const id = ref.alloc('int32*');
        this.goodResult(this.dll.GetGradeByOrdinal(index, id));
        return id.readInt32LE();
    }

    getGradePropertiesEx(id: number) {
        const number = ref.alloc('int32*');
        const name = ref.alloc(wchar);
        const short_name = ref.alloc(wchar);
        const code = ref.alloc(wchar);
        const type = ref.alloc('int16*');
        this.goodResult(this.dll.GetGradePropertiesEx(id, number, name, short_name, code, type));
        return {
            number: number.readInt32LE(),
            name: name.deref(),
            short_name: short_name.deref(),
            code: code.deref(),
            type: type.readInt16LE(),
        };
    }

    setGradePropertiesEx(id: number, number: number, name: string, short_name: string, code: string, type: number) {
        return this.goodResult(this.dll.SetGradePropertiesEx(id, number, name, short_name, code, type));
    }

    deleteGrade(id: number) {
        return this.goodResult(this.dll.DeleteGrade(id));
    }

    setGradePrice(id: number, level: number, price: number) {
        return this.goodResult(this.dll.SetGradePrice(id, level, price));
    }

    getGradePrice(id: number, level: number) {
        const price = ref.alloc('double*');
        this.goodResult(this.dll.GetGradePrice(id, level, price));
        return price;
    }

    // ------------------------- TANKS -------------------------
    getTanksCount() {
        const ret = ref.alloc('int32*');
        this.goodResult(this.dll.GetTanksCount(ret));
        return ret.readInt32LE();
    }

    getTankByOrdinal(index: number) {
        const id = ref.alloc('int32*');
        this.goodResult(this.dll.GetTankByOrdinal(index, id));
        return id.readInt32LE();
    }

    getTankPropertiesEx(id: number) {
        const number = ref.alloc('int32*');
        const name = ref.alloc(wchar);
        const grade_id = ref.alloc('int32*');
        const type = ref.alloc('int16*');
        const capacity = ref.alloc('double*');
        const diameter = ref.alloc('double*');
        const theo_volume = ref.alloc('double*');
        const gauge_volume = ref.alloc('double*');
        const gauge_tc_volume = ref.alloc('double*');
        const gauge_ull_lage = ref.alloc('double*');
        const gauge_temperature = ref.alloc('double*');
        const gauge_level = ref.alloc('double*');
        const gauge_water_volume = ref.alloc('double*');
        const gauge_water_level = ref.alloc('double*');
        const gauge_id = ref.alloc('int32*');
        const probe_no = ref.alloc('int16*');
        const gauge_alarms_mark = ref.alloc('int32*');
        this.goodResult(
            this.dll.GetTankPropertiesEx(
                id,
                number,
                name,
                grade_id,
                type,
                capacity,
                diameter,
                theo_volume,
                gauge_volume,
                gauge_tc_volume,
                gauge_ull_lage,
                gauge_temperature,
                gauge_level,
                gauge_water_volume,
                gauge_water_level,
                gauge_id,
                probe_no,
                gauge_alarms_mark,
            ),
        );
        return {
            number: number.readInt32LE(),
            name: name.deref(),
            grade_id: grade_id.readInt32LE(),
            type: type.readInt16LE(),
            capacity: capacity.readDoubleLE(),
            diameter: diameter.readDoubleLE(),
            theo_volume: theo_volume.readDoubleLE(),
            gauge_volume: gauge_volume.readDoubleLE(),
            gauge_tc_volume: gauge_tc_volume.readDoubleLE(),
            gauge_ull_lage: gauge_ull_lage.readDoubleLE(),
            gauge_temperature: gauge_temperature.readDoubleLE(),
            gauge_level: gauge_level.readDoubleLE(),
            gauge_water_volume: gauge_water_volume.readDoubleLE(),
            gauge_water_level: gauge_water_level.readDoubleLE(),
            gauge_id: gauge_id.readInt32LE(),
            probe_no: probe_no.readInt16LE(),
            gauge_alarms_mark: gauge_alarms_mark.readInt32LE(),
        };
    }
}

export default EZInterface;

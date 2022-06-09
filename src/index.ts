import ref from 'ref-napi';
import DLL from './dll.js';
import { fromOADate } from './utils.js';

class EZInterface {
    dll = DLL;

    constructor(host: string = '127.0.0.1', port: number = 5123, timeout: number = 10000) {
        this.clientLogonEx(host, port, timeout);
    }

    goodResult(res: number) {
        if (res === 0) {
            return true;
        } else {
            throw new Error(this.dll.ResultString(res) || '');
        }
    }

    clientLogonEx(host: string, port: number = 5123, timeout: number = 10000) {
        this.goodResult(this.dll.ClientLogonEx(1, 1, host, port, 5124, timeout, 0, 0, 0));
    }

    testConnection() {
        return this.goodResult(this.dll.TestConnection());
    }

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
}

export default EZInterface;

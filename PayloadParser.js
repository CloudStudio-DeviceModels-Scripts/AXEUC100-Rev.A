function parseUplink(device, payload)
{
    var payloadb = payload.asBytes();
    var decoded = Decoder(payloadb, device.port)
    env.log (decoded);
    
    //Canal 1
    var corriente1 = decoded.modbus_chn_1;
    env.log("Corriente 1:", corriente1);
    var ep = device.endpoints.byAddress("1");
    ep.updateCurrentSensorStatus(corriente1);

    //Canal 2
    var corriente2 = decoded.modbus_chn_2;
    env.log("Corriente 2:", corriente2);
    var ep = device.endpoints.byAddress("2");
    ep.updateCurrentSensorStatus(corriente2);

    //Canal 3
    var corriente3 = decoded.modbus_chn_3;
    env.log("Corriente 3:", corriente3);
    var ep = device.endpoints.byAddress("3");
    ep.updateCurrentSensorStatus(corriente3);

    //Canal 4
    var voltaje1 = decoded.modbus_chn_4;
    env.log("Voltaje 1:", voltaje1);
    var ep = device.endpoints.byAddress("4");
    ep.updateVoltageSensorStatus(voltaje1);

    //Canal 5
    var voltaje2 = decoded.modbus_chn_5;
    env.log("Voltaje 2:", voltaje2);
    var ep = device.endpoints.byAddress("5");
    ep.updateVoltageSensorStatus(voltaje2);

    //Canal 6
    var voltaje3 = decoded.modbus_chn_6;
    env.log("Voltaje 3:", voltaje3);
    var ep = device.endpoints.byAddress("6");
    ep.updateVoltageSensorStatus(voltaje3);

    //Canal 7
    var factpot1 = decoded.modbus_chn_7;
    env.log("Factor de Potencia 1:", factpot1);
    var ep = device.endpoints.byAddress("7");
    ep.updateCosPhiSensorStatus(factpot1);

    //Canal 8
    var factpot2 = decoded.modbus_chn_8;
    env.log("Factor de Potencia 2:", factpot2);
    var ep = device.endpoints.byAddress("8");
    ep.updateCosPhiSensorStatus(factpot2);

    //Canal 9
    var factpot3 = decoded.modbus_chn_9;
    env.log("Factor de Potencia 3:", factpot3);
    var ep = device.endpoints.byAddress("9");
    ep.updateCosPhiSensorStatus(factpot3);

    //Canal 10
    var P = decoded.modbus_chn_10;
    env.log("P:", P);
    var ep = device.endpoints.byAddress("10");
    ep.updateActivePowerSensorStatus(P);

    //Canal 11
    var Q = decoded.modbus_chn_11;
    env.log("Q:", Q);
    var ep = device.endpoints.byAddress("11");
    ep.updateReactivePowerSensorStatus(Q);

    //Canal 12
    var S = decoded.modbus_chn_12;
    env.log("S:", S);
    var ep = device.endpoints.byAddress("12");
    ep.updateApparentPowerSensorStatus(S);

    //Canal 13
    var FQ1 = decoded.modbus_chn_13;
    env.log("FQ1:", FQ1);
    var ep = device.endpoints.byAddress("13");
    ep.updateFrequencySensorStatus(FQ1);

    //Canal 14
    var FQ2 = decoded.modbus_chn_14;
    env.log("FQ2:", FQ2);
    var ep = device.endpoints.byAddress("14");
    ep.updateFrequencySensorStatus(FQ2);

    //Canal 15
    var FQ3 = decoded.modbus_chn_15;
    env.log("FQ3:", FQ3);
    var ep = device.endpoints.byAddress("15");
    ep.updateFrequencySensorStatus(FQ3);

    //Canal 16
    var ET = decoded.modbus_chn_16;
    env.log("ET:", ET);
    var ep = device.endpoints.byAddress("16");
    ep.updateGenericSensorStatus(ET);

}

function buildDownlink(device, endpoint, command, payload) 
{ 
	// Esta función permite convertir un comando de la plataforma en un
	// payload que pueda enviarse al dispositivo.
	// Más información en https://wiki.cloud.studio/page/200

	// Los parámetros de esta función, son:
	// - device: objeto representando el dispositivo al cual se enviará el comando.
	// - endpoint: objeto endpoint representando el endpoint al que se enviará el 
	//   comando. Puede ser null si el comando se envía al dispositivo, y no a 
	//   un endpoint individual dentro del dispositivo.
	// - command: objeto que contiene el comando que se debe enviar. Más
	//   información en https://wiki.cloud.studio/page/1195.

	// Este ejemplo está escrito asumiendo un dispositivo que contiene un único 
	// endpoint, de tipo appliance, que se puede encender, apagar y alternar. 
	// Se asume que se debe enviar un solo byte en el payload, que indica el tipo 
	// de operación.

/*
	 payload.port = 25; 	 	 // Este dispositivo recibe comandos en el puerto LoRaWAN 25 
	 payload.buildResult = downlinkBuildResult.ok; 

	 switch (command.type) { 
	 	 case commandType.onOff: 
	 	 	 switch (command.onOff.type) { 
	 	 	 	 case onOffCommandType.turnOn: 
	 	 	 	 	 payload.setAsBytes([30]); 	 	 // El comando 30 indica "encender" 
	 	 	 	 	 break; 
	 	 	 	 case onOffCommandType.turnOff: 
	 	 	 	 	 payload.setAsBytes([31]); 	 	 // El comando 31 indica "apagar" 
	 	 	 	 	 break; 
	 	 	 	 case onOffCommandType.toggle: 
	 	 	 	 	 payload.setAsBytes([32]); 	 	 // El comando 32 indica "alternar" 
	 	 	 	 	 break; 
	 	 	 	 default: 
	 	 	 	 	 payload.buildResult = downlinkBuildResult.unsupported; 
	 	 	 	 	 break; 
	 	 	 } 
	 	 	 break; 
	 	 default: 
	 	 	 payload.buildResult = downlinkBuildResult.unsupported; 
	 	 	 break; 
	 }
*/

}

//https://github.com/Milesight-IoT/SensorDecoders/blob/main/UC_Series/UC50x/UC50x_TTN.js

/**
 * Payload Decoder for The Things Network
 *
 * Copyright 2023 Milesight IoT
 *
 * @product UC300
 */
function Decoder(bytes, fport) {
    return milesight(bytes);
}

var gpio_in_chns = [0x03, 0x04, 0x05, 0x06];
var gpio_out_chns = [0x07, 0x08];
var pt100_chns = [0x09, 0x0a];
var ai_chns = [0x0b, 0x0c];
var av_chns = [0x0d, 0x0e];

function milesight(bytes) {
    var decoded = {};

    for (i = 0; i < bytes.length; ) {
        var channel_id = bytes[i++];
        var channel_type = bytes[i++];
        // PROTOCOL VESION
        if (channel_id === 0xff && channel_type === 0x01) {
            decoded.protocol_version = bytes[i];
            i += 1;
        }
        // POWER ON
        else if (channel_id === 0xff && channel_type === 0x0b) {
            decoded.power = "on";
            i += 1;
        }
        // SERIAL NUMBER
        else if (channel_id === 0xff && channel_type === 0x16) {
            decoded.sn = readString(bytes.slice(i, i + 8));
            i += 8;
        }
        // HARDWARE VERSION
        else if (channel_id === 0xff && channel_type === 0x09) {
            decoded.hardware_version = readHardwareVersion(bytes.slice(i, i + 2));
            i += 2;
        }
        // FIRMWARE VERSION
        else if (channel_id === 0xff && channel_type === 0x0a) {
            decoded.firmware_version = readFirmwareVersion(bytes.slice(i, i + 2));
            i += 2;
        }
        // GPIO INPUT
        else if (includes(gpio_in_chns, channel_id) && channel_type === 0x00) {
            var id = channel_id - gpio_in_chns[0] + 1;
            var gpio_in_name = "gpio_in_" + id;
            decoded[gpio_in_name] = bytes[i] === 0 ? "off" : "on";
            i += 1;
        }
        // GPIO OUTPUT
        else if (includes(gpio_out_chns, channel_id) && channel_type === 0x01) {
            var id = channel_id - gpio_out_chns[0] + 1;
            var gpio_out_name = "gpio_out_" + id;
            decoded[gpio_out_name] = bytes[i] === 0 ? "off" : "on";
            i += 1;
        }
        // GPIO AS COUNTER
        else if (includes(gpio_in_chns, channel_id) && channel_type === 0xc8) {
            var id = channel_id - gpio_in_chns[0] + 1;
            var counter_name = "counter_" + id;
            decoded[counter_name] = readUInt32LE(bytes.slice(i, i + 4));
            i += 4;
        }
        // PT100
        else if (includes(pt100_chns, channel_id) && channel_type === 0x67) {
            var id = channel_id - pt100_chns[0] + 1;
            var pt100_name = "pt100_" + id;
            decoded[pt100_name] = readInt16LE(bytes.slice(i, i + 2)) / 10;
            i += 2;
        }
        // ADC CHANNEL
        else if (includes(ai_chns, channel_id) && channel_type === 0x02) {
            var id = channel_id - ai_chns[0] + 1;
            var adc_name = "adc_" + id;
            decoded[adc_name] = readUInt32LE(bytes.slice(i, i + 4)) / 100;
            i += 4;
            continue;
        }
        // ADC CHANNEL FOR VOLTAGE
        else if (includes(av_chns, channel_id) && channel_type === 0x02) {
            var id = channel_id - av_chns[0] + 1;
            var adv_name = "adv_" + id;
            decoded[adv_name] = readUInt32LE(bytes.slice(i, i + 4)) / 100;
            i += 4;
            continue;
        }
        // MODBUS
        else if (channel_id === 0xff && channel_type === 0x19) {
            var modbus_chn_id = bytes[i++] + 1;
            var data_length = bytes[i++];
            var data_type = bytes[i++];
            var sign = (data_type >>> 7) & 0x01;
            var type = data_type & 0x7f; // 0b01111111
            var chn = "modbus_chn_" + modbus_chn_id;
            switch (type) {
                case 0:
                    decoded[chn] = bytes[i] ? "on" : "off";
                    i += 1;
                    break;
                case 1:
                    decoded[chn] = sign ? readInt8(bytes.slice(i, i + 1)) : readUInt8(bytes.slice(i, i + 1));
                    i += 1;
                    break;
                case 2:
                case 3:
                    decoded[chn] = sign ? readInt16LE(bytes.slice(i, i + 2)) : readUInt16LE(bytes.slice(i, i + 2));
                    i += 2;
                    break;
                case 4:
                case 6:
                    decoded[chn] = sign ? readInt32LE(bytes.slice(i, i + 4)) : readUInt32LE(bytes.slice(i, i + 4));
                    i += 4;
                    break;
                case 8:
                case 10:
                    decoded[chn] = sign ? readInt16LE(bytes.slice(i, i + 2)) : readUInt16LE(bytes.slice(i, i + 2));
                    i += 4;
                    break;
                case 9:
                case 11:
                    decoded[chn] = sign ? readInt16LE(bytes.slice(i + 2, i + 4)) : readUInt16LE(bytes.slice(i + 2, i + 4));
                    i += 4;
                    break;
                case 5:
                case 7:
                    decoded[chn] = readFloatLE(bytes.slice(i, i + 4));
                    i += 4;
                    break;
            }
        }
        // MODBUS READ ERROR
        else if (channel_id === 0xff && channel_type === 0x15) {
            var modbus_chn_id = bytes[i] + 1;
            var channel_name = "modbus_chn_" + modbus_chn_id + "_alert";
            decoded[channel_name] = "read error";
            i += 1;
        }
        // ANALOG INPUT STATISTICS
        else if (includes(ai_chns, channel_id) && channel_type === 0xe2) {
            var id = channel_id - ai_chns[0] + 1;
            var adc_name = "adc_" + id;
            decoded[adc_name] = readFloat16LE(bytes.slice(i, i + 2));
            decoded[adc_name + "_max"] = readFloat16LE(bytes.slice(i + 2, i + 4));
            decoded[adc_name + "_min"] = readFloat16LE(bytes.slice(i + 4, i + 6));
            decoded[adc_name + "_avg"] = readFloat16LE(bytes.slice(i + 6, i + 8));
            i += 8;
        }
        // ANALOG VOLTAGE STATISTICS
        else if (includes(av_chns, channel_id) && channel_type === 0xe2) {
            var id = channel_id - av_chns[0] + 1;
            var adc_name = "adv_" + id;
            decoded[adc_name] = readFloat16LE(bytes.slice(i, i + 2));
            decoded[adc_name + "_max"] = readFloat16LE(bytes.slice(i + 2, i + 4));
            decoded[adc_name + "_min"] = readFloat16LE(bytes.slice(i + 4, i + 6));
            decoded[adc_name + "_avg"] = readFloat16LE(bytes.slice(i + 6, i + 8));
            i += 8;
        }
        // PT100 ARGS
        else if (includes(pt100_chns, channel_id) && channel_type === 0xe2) {
            var id = channel_id - pt100_chns[0] + 1;
            var pt100_name = "pt100_" + id;
            decoded[pt100_name] = readFloat16LE(bytes.slice(i, i + 2));
            decoded[pt100_name + "_max"] = readFloat16LE(bytes.slice(i + 2, i + 4));
            decoded[pt100_name + "_min"] = readFloat16LE(bytes.slice(i + 4, i + 6));
            decoded[pt100_name + "_avg"] = readFloat16LE(bytes.slice(i + 6, i + 8));
            i += 8;
        }
        // CHANNEL HISTORICAL DATA
        else if (channel_id === 0x20 && channel_type === 0xdc) {
            decoded.channel_history_data = decoded.channel_history_data || [];

            var timestamp = readUInt32LE(bytes.slice(i, i + 4));
            var channel_mask = numToBits(readUInt16LE(bytes.slice(i + 4, i + 6)), 16);
            i += 6;

            var data = { timestamp: timestamp };
            for (j = 0; j < channel_mask.length; j++) {
                // SKIP UNUSED CHANNELS
                if (channel_mask[j] !== 1) continue;

                // GPIO INPUT
                if (j < 4) {
                    var type = bytes[i++];
                    // AS GPIO INPUT
                    if (type === 0) {
                        var name = "gpio_in_" + (j + 1);
                        data[name] = readUInt32LE(bytes.slice(i, i + 4)) === 0 ? "off" : "on";
                        i += 4;
                    }
                    // AS COUNTER
                    else {
                        var name = "counter_" + (j + 1);
                        data[name] = readUInt32LE(bytes.slice(i, i + 4));
                        i += 4;
                    }
                }
                // GPIO OUTPUT
                else if (j < 6) {
                    var name = "gpio_out_" + (j - 4 + 1);
                    data[name] = bytes[i] ? "on" : "off";
                    i += 1;
                }
                // PT100
                else if (j < 8) {
                    var name = "pt100_" + (j - 6 + 1);
                    data[name] = readFloat16LE(bytes.slice(i, i + 2));
                    i += 2;
                }
                // ADC
                else if (j < 10) {
                    var name = "adc_" + (j - 8 + 1);
                    data[name] = readFloat16LE(bytes.slice(i, i + 2));
                    data[name + "_max"] = readFloat16LE(bytes.slice(i + 2, i + 4));
                    data[name + "_min"] = readFloat16LE(bytes.slice(i + 4, i + 6));
                    data[name + "_avg"] = readFloat16LE(bytes.slice(i + 6, i + 8));
                    i += 8;
                }
                // ADV
                else if (j < 12) {
                    var name = "adv_" + (j - 10 + 1);
                    data[name] = readFloat16LE(bytes.slice(i, i + 2));
                    data[name + "_max"] = readFloat16LE(bytes.slice(i + 2, i + 4));
                    data[name + "_min"] = readFloat16LE(bytes.slice(i + 4, i + 6));
                    data[name + "_avg"] = readFloat16LE(bytes.slice(i + 6, i + 8));
                    i += 8;
                }
                // CUSTOM MESSAGE
                else if (j < 13) {
                    data.text = readAscii(bytes.slice(i, 48));
                    i += 48;
                }
            }

            decoded.channel_history_data.push(data);
        }
        // MODBUS HISTORICAL DATA
        else if (channel_id === 0x20 && channel_type === 0xdd) {
            decoded.modbus_history_data = decoded.modbus_history_data || [];

            var timestamp = readUInt32LE(bytes.slice(i, i + 4));
            var modbus_chn_mask = numToBits(readUInt32LE(bytes.slice(i + 4, i + 8)), 32);
            i += 8;

            var data = { timestamp: timestamp };
            for (j = 0; j < modbus_chn_mask.length; j++) {
                if (modbus_chn_mask[j] !== 1) continue;

                var chn = "modbus_chn_" + (j + 1);
                var data_type = bytes[i++];
                var sign = (data_type >>> 7) & 0x01;
                var type = data_type & 0x7f; // 0b01111111
                switch (type) {
                    case 0: // MB_COIL
                        decoded[chn] = bytes[i] ? "on" : "off";
                        break;
                    case 1: // MB_DISCRETE
                        data[chn] = sign ? readInt8(bytes.slice(i, i + 1)) : readUInt8(bytes.slice(i, i + 1));
                        break;
                    case 2: // MB_INPUT_INT16
                    case 3: // MB_HOLDING_INT16
                        data[chn] = sign ? readInt16LE(bytes.slice(i, i + 2)) : readUInt16LE(bytes.slice(i, i + 2));
                        break;
                    case 4: // MB_HOLDING_INT32
                    case 6: // MB_INPUT_INT32
                        data[chn] = sign ? readInt32LE(bytes.slice(i, i + 4)) : readUInt32LE(bytes.slice(i, i + 4));
                        break;
                    case 8: // MB_INPUT_INT32_AB
                    case 10: // MB_HOLDING_INT32_AB
                        data[chn] = sign ? readInt16LE(bytes.slice(i, i + 2)) : readUInt16LE(bytes.slice(i, i + 2));
                        break;
                    case 9: // MB_INPUT_INT32_CD
                    case 11: // MB_HOLDING_INT32_CD
                        data[chn] = sign ? readInt16LE(bytes.slice(i + 2, i + 4)) : readUInt16LE(bytes.slice(i + 2, i + 4));
                        break;
                    case 5: // MB_HOLDING_FLOAT
                    case 7: // MB_INPUT_FLOAT
                        data[chn] = readFloatLE(bytes.slice(i, i + 4));
                        break;
                }
                i += 4;
            }

            modbus_history_data.push(data);
        }
        // TEXT
        else {
            decoded.text = readAscii(bytes.slice(i - 2, bytes.length));
            i = bytes.length;
        }
    }

    return decoded;
}

/* ******************************************
 * bytes to number
 ********************************************/
function numToBits(num, bit_count) {
    var bits = [];
    for (var i = 0; i < bit_count; i++) {
        bits.push((num >> i) & 1);
    }
    return bits;
}

function readUInt8(bytes) {
    return bytes & 0xff;
}

function readInt8(bytes) {
    var ref = readUInt8(bytes);
    return ref > 0x7f ? ref - 0x100 : ref;
}

function readUInt16LE(bytes) {
    var value = (bytes[1] << 8) + bytes[0];
    return value & 0xffff;
}

function readInt16LE(bytes) {
    var ref = readUInt16LE(bytes);
    return ref > 0x7fff ? ref - 0x10000 : ref;
}

function readUInt32LE(bytes) {
    var value = (bytes[3] << 24) + (bytes[2] << 16) + (bytes[1] << 8) + bytes[0];
    return (value & 0xffffffff) >>> 0;
}

function readInt32LE(bytes) {
    var ref = readUInt32LE(bytes);
    return ref > 0x7fffffff ? ref - 0x100000000 : ref;
}

function readFloatLE(bytes) {
    // JavaScript bitwise operators yield a 32 bits integer, not a float.
    // Assume LSB (least significant byte first).
    var bits = (bytes[3] << 24) | (bytes[2] << 16) | (bytes[1] << 8) | bytes[0];
    var sign = bits >>> 31 === 0 ? 1.0 : -1.0;
    var e = (bits >>> 23) & 0xff;
    var m = e === 0 ? (bits & 0x7fffff) << 1 : (bits & 0x7fffff) | 0x800000;
    var f = sign * m * Math.pow(2, e - 150);

    var n = Number(f.toFixed(2));
    return n;
}

function readFloat16LE(bytes) {
    var bits = (bytes[1] << 8) | bytes[0];
    var sign = bits >>> 15 === 0 ? 1.0 : -1.0;
    var e = (bits >>> 10) & 0x1f;
    var m = e === 0 ? (bits & 0x3ff) << 1 : (bits & 0x3ff) | 0x400;
    var f = sign * m * Math.pow(2, e - 25);

    var n = Number(f.toFixed(2));
    return n;
}

function readAscii(bytes) {
    var str = "";
    for (var i = 0; i < bytes.length; i++) {
        str += String.fromCharCode(bytes[i]);
    }
    return str;
}

function includes(datas, value) {
    var size = datas.length;
    for (var i = 0; i < size; i++) {
        if (datas[i] == value) {
            return true;
        }
    }
    return false;
}

function readHardwareVersion(bytes) {
    var major = bytes[0] & 0xff;
    var minor = (bytes[1] & 0xff) >> 4;
    return "v" + major + "." + minor;
}

function readFirmwareVersion(bytes) {
    var major = bytes[0] & 0xff;
    var minor = bytes[1] & 0xff;
    return "v" + major + "." + minor;
}

// bytes to string
function readString(bytes) {
    var temp = [];
    for (var idx = 0; idx < bytes.length; idx++) {
        temp.push(("0" + (bytes[idx] & 0xff).toString(16)).slice(-2));
    }
    return temp.join("");
}
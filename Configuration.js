function getConfiguration(config) {
    // This function allows you to indicate general configuration values
    // for all devices of this model.

    // Depending on the meaning of the "device address" in this device, 
    // you may want to change the label that is used to refer to the 
    // address in the user interface.
    // For instance, if the address of the device is actually a MAC 
    // address, you may want to use the code below.

    config.addressLabel = { en: "DevEUI", es: "DevEUI" };
}

function getEndpoints(deviceAddress, endpoints) {

    endpoints.addEndpoint("1", "Corriente L1", endpointType.currentSensor);
    endpoints.addEndpoint("2", "Corriente L2", endpointType.currentSensor);
    endpoints.addEndpoint("3", "Corriente L3", endpointType.currentSensor);
    endpoints.addEndpoint("4", "Voltaje L1", endpointType.voltageSensor);
    endpoints.addEndpoint("5", "Voltaje L2", endpointType.voltageSensor);    
    endpoints.addEndpoint("6", "Voltaje L3", endpointType.voltageSensor);
    endpoints.addEndpoint("7", "Factor de Potencia L1", endpointType.cosPhiSensor);    
    endpoints.addEndpoint("8", "Factor de Potencia L2", endpointType.cosPhiSensor);
    endpoints.addEndpoint("9", "Factor de Potencia L3", endpointType.cosPhiSensor);
    endpoints.addEndpoint("10", "P Total", endpointType.activePowerSensor);
    endpoints.addEndpoint("11", "Q Total", endpointType.reactivePowerSensor);
    endpoints.addEndpoint("12", "S Total", endpointType.apparentPowerSensor);
    endpoints.addEndpoint("13", "Frecuencia L1", endpointType.frequencyMeter);
    endpoints.addEndpoint("14", "Frecuencia L2", endpointType.frequencyMeter);
    endpoints.addEndpoint("15", "Frecuencia L3", endpointType.frequencyMeter);
    var e = endpoints.addEndpoint("16", "Energía Activa Total", endpointType.genericSensor);
    e.variableTypeId = 1011;

}

function validateDeviceAddress(address, result)
{
  // Esta función permite validar la dirección de un dispositivo, cuando el usuario 
  // lo está creando. Si el dispositivo tiene reglas de validación especiales para 
  // la dirección, pueden verificarse aquí y devolver un mensaje de error en 
  // caso de que el formato de la dirección sea incorrecto.
  
  // En el código siguiente, se realiza una validación para asegurarse de que la 
  // dirección tiene exactamente 10 caracteres.
  
  // if (address.length != 10) {
  //   result.ok = false;
  //   result.errorMessage = {
  //     en: "The address must be 10 characters long", 
  //     es: "La dirección debe tener exactamente 10 caracteres"
  //   };
  // }
}

function updateDeviceUIRules(device, rules)
{
  // Esta función permite especificar reglas de interfaz de usuario en el nivel de 
  // dispositivo. Por ejemplo, es posible habilitar o deshabilitar la creación 
  // de endpoints manualmente al dispositivo después de que se creó.

  // En el código siguiente, el agregado manual de endpoints está deshabilitada 
  // en la interfaz de usuario. Esto significa que el dispositivo se limitará a los 
  // endpoints definidos por la función getEndpoints() anterior.
  
  // rules.canCreateEndpoints = false;
}

function updateEndpointUIRules(endpoint, rules)
{
  // Esta función permite especificar reglas de interfaz de usuario para cada
  // endpoint del dispositivo. Por ejemplo, es posible habilitar o inhabilitar la
  // eliminación de endpoints, o la edición de subtipo de endpoint.

  // En el código siguiente, se definen las siguientes reglas:
  // - Los endpoints no se pueden eliminar.
  // - El subtipo de endpoint se puede cambiar, pero solo para el segundo endpoint.
  
  rules.canDelete = true;
  // rules.canEditSubType = (endpoint.address == "2");
}

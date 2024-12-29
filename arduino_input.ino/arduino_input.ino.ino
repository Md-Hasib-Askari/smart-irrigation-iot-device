#include <ArduinoJson.h>
#include <SoftwareSerial.h>
#include <DHT.h>



#define DHTPIN A0
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);
SoftwareSerial ESPSerial(2, 3);

int chk;
float hum;
float temp;

void setup() {
  Serial.begin(9600);
  ESPSerial.begin(57600);

  dht.begin();
}

void loop() {
  hum = dht.readHumidity();
  temp = dht.readTemperature();

  StaticJsonDocument<200> jsonDoc;
  // Add sensor values to the JSON object
  jsonDoc["temperature"] = temp;
  jsonDoc["humidity"] = hum;
  // jsonDoc["soilMoisture"] = soilMoisture;
  // jsonDoc["waterLevel"] = waterLevel;

  String jsonString;
  serializeJson(jsonDoc, jsonString);

  ESPSerial.println(jsonString);
  Serial.print("Humidity: ");
  Serial.println(hum);

  Serial.print("Temperature: ");
  Serial.println(temp);

  delay(3000);
}
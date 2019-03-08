var app = new Vue({
  el: '#app',
  data: {
    trains: [],
    jsonText: "",
  },
  methods: {
    addWagon(type, subtype) {
      switch (type) {
        case "Open":
          this.trains.push({ "type": "Open", "subtype": "Default" });
          break;
        case "Covered":
          switch (subtype) {
            case "Refrigerated":
              this.trains.push({ "type": "Covered", "subtype": "Refrigerated" });
              break;
            case "Livestock":
              this.trains.push({ "type": "Covered", "subtype": "Livestock" });
              break;
            case "Regular":
              this.trains.push({ "type": "Covered", "subtype": "Regular" });
              break;
            default:
              this.trains.push({ "type": "Covered", "subtype": "Default" });
          }
          break;
        case "Tank":
          switch (subtype) {
            case "Liquid":
              this.trains.push({ "type": "Tank", "subtype": "Liquid" });
              break;
            case "Gas":
              this.trains.push({ "type": "Tank", "subtype": "Gas" });
              break;
            case "Refrigerated Liquid":
              this.trains.push({ "type": "Tank", "subtype": "Refrigerated Liquid" });
              break;
            case "Refrigerated Gas":
              this.trains.push({ "type": "Tank", "subtype": "Refrigerated Gas" });
              break;
            default:  // Liquid subtype
              this.trains.push({ "type": "Tank", "subtype": "Default" });
          }
          break;
        default:  // Flat Wagon
          this.trains.push({ "type": "Flat", "subtype": "Default" });
      }
    },

    removeWagon(index) {
      if (typeof this.trains[index] === 'undefined') {
        return;
      }
      this.trains.splice(index, 1);
    },

    switchWagon() {
      let indexOneValue = parseInt(document.getElementById("index_1").value) - 1;
      let indexTwoValue = parseInt(document.getElementById("index_2").value) - 1;
      if (typeof this.trains[indexOneValue] === 'undefined' ||
          typeof this.trains[indexTwoValue] === 'undefined') {
        return;
      }
      let x = this.trains[indexOneValue];
      // Using splice so we can detect array changes
      this.trains.splice(indexOneValue, 1, this.trains[indexTwoValue]);
      this.trains.splice(indexTwoValue, 1, x);
    },

    submitWagons() {
      this.jsonText = "";
      this.jsonText += "{\n";
      this.jsonText += "  \"trains\":" + " [\n";
      for (var i = 0; i < this.trains.length; i++) {
        this.jsonText += "    {\n";
        this.jsonText += "      \"order\": " + (i+1) + ",\n";
        this.jsonText += "      \"type\": " + "\"" + this.trains[i].type + "\"" + ",\n";
        this.jsonText += "      \"subtype:\": " + "\"" + this.trains[i].subtype + "\"" + "\n";
        if (i === this.trains.length - 1) {
          this.jsonText += "    }\n";
        } else {
          this.jsonText += "    },\n";
        }
      }
      this.jsonText += "  ],\n";
      this.jsonText += "  \"totalWagons\": " + this.trains.length + "\n";
      this.jsonText += "}";
    }
  }
});

// For Tooltips
$(document).ready(function() {
  $("body").tooltip({ selector: '[data-toggle=tooltip]' });
});
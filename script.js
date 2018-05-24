//Optional improvements: answers with long decimals can be rounded

//Lesson learned - If you are passing in variables and then altering 
//those variables later inside the function, be sure to name the 
//passed in variables different than the global outside variables.

//Lesson learned - decimal errors will happen in javascript b/c of floating
//point numbers and the fact that 1/3 can not be represented as
// .33333..... b/c only a finite amount of storage, so js rounds it.
//This can make some of the outcomes and representations incorrect.

//Lesson learned - parseFloat turns a decimal string into a decimal number
//Used over parseInt b/c not dealing with just integers.

//Lesson learned - if val is zero, should not parseFloat b/c I guess 
//the logic eliminates the zero. So, added an (if !== 0) then you can
//parseFloat.

//Lesson learned - when all else fails, run through code line by line as
//the logic progresses and understand what is happening.

var operators = {
  '+': function(a, b) { return a + b },
  '-': function(a, b) { return a - b },
  'x': function(a, b) { return a * b }, // edit
  '/': function(a, b) { return a / b },
};

let operatorKey = undefined;
let valA = undefined;
let decimalA = false;
let valB = undefined;
let decimalB = false;
let total = undefined;
let string = "";

var numberClick = function(val) {
  //total = undefined;
  let num = "";
  if (total) {
    total = undefined;
    string = "";
  }
  if (valB === undefined) {
    if (operatorKey === undefined) {
      if (valA) {
        if (valA === ".") {
          valA = valA + val.toString();
          console.log(valA);
          if (val !== 0) {
              valA = parseFloat(valA); //
          }
          console.log(valA);
          $("#screen").html(valA);
        } else {
          console.log("valA before: " + valA);
          valA = valA.toString();
          console.log("valA to string: " + valA);
          num = val.toString();
          console.log("num:" + num);
          valA = valA + num;
          console.log("valA + num: " + valA);
          if (val !== 0) {
              valA = parseFloat(valA);
          }
          //valA = parseFloat(valA);
          //valA = parseInt(valA);
          console.log("new valA: " + valA);
          $("#screen").html(valA);
        }
      } else {
        valA = val;
        string = "";
        console.log("valA:" + valA);
        $("#screen").html(valA);
      }
    } else {
      
      valB = val;
      console.log("valB: " + valB);
      $("#screen").html(valB);
    }
  } else {
    if (valB === ".") {
      valB = valB + val.toString();
      // should I parseFloat here ------------------------ yeaaaaaaaaaaaa
      if (val !== 0) {
          valB = parseFloat(valB); //
      }
      //valB = parseFloat(valB);
      console.log(valB);
      $("#screen").html(valB);
    } else {
      valB = valB.toString();
      num = val.toString();
      valB += num;
      if (val !== 0) {
          valB = parseFloat(valB);
      }
      // valB = parseInt(valB);
      console.log("new valB: " + valB);
      $("#screen").html(valB);
    }
  }
  
  string = string + val;
  $("#equation").html(string);
  let stringValA = "";
  let stringValB = "";
  if (valA) {
  stringValA = valA.toString();
  
  }
  if (valB) {
  stringValB = valB.toString();
  }
  if (stringValA.length === 16) {
      console.log("digit limit");
      $("#equation").html("digit limit");
      string = "";
      valA = undefined;
      $("#screen").html(0);
  }
  if (stringValB.length === 16) {
      $("#equation").html("digit limit");
      /*valB = valB.toString(); //
      lengthB = valB.length;
      string = string.slice(0, -(lengthB));*/
      valB = undefined;
      valA = undefined;
      operatorKey = undefined;
      decimalA = false;
      decimalB = false;
      string = "";
      $("#screen").html(0);
  }

  if (string.length === 35) {
      alert("string too long, calculator broke :(");
      string = "";
      $("#equation").html("calculator reset");
      $("#screen").html(0);
      valA = undefined;
      valB = undefined;
      operatorKey = undefined;
      decimalA = false;
      decimalB = false;
      total = undefined;
      //string = "string too long, calculator broke :(";
      //$("#equation").html(string);
  }
};

var decimalClick = function() {
  if (valB === undefined) {
    if (operatorKey === undefined) {
      if (valA) {
        if (decimalA === false) {
          // decimal in valA after integer
          decimalA = true;
          valA = valA + "."; //might need toString
          console.log("valA: " + valA);
          string = string + ".";
          $("#screen").html(valA);
        }
      } else {
        if (decimalA === false) {
          // valA starts with decimal
          decimalA = true;
          valA = ".";
          console.log("valA:" + valA);
          string = string + ".";
          $("#screen").html(valA);
        }
        // have switch on saying decimal present
        // and add decimal to finished number
        // and add decimal to string and screen
      }
    } else {
      if (decimalB === false) {
        // valB starts with decimal
        decimalB = true;
        valB = ".";
        console.log("valB:" + valB);
        string = string + ".";
        $("#screen").html(valB);
      }
    }
  } else {
    if (decimalB === false) {
      // decimal in valB after integer
      decimalB = true;
      valB = valB + ".";
      console.log("valB: " + valB);
      string = string + ".";
      $("#screen").html(valB); 
    }
  }
  $("#equation").html(string);
};


var operatorClick = function(operator) {
  if (total) {
    valA = total;
    total = undefined;
    string = valA;
  }
  if (valA) {
    if (operatorKey) {
      if (valB) {
        valA = operators[operatorKey](valA, valB);
        valB = undefined;
        decimalB = false;
        console.log("new valA" + valA);
        console.log("new operator" + operator);
        operatorKey = operator;
        $("#screen").html(operator);
        string = string + operator;
        $("#equation").html(string);
      }  
    } else {
      operatorKey = operator;
      if (operator === "/") {
        $("#screen").html("&#xf7;");
        string = string + "&#xf7;"
        $("#equation").html(string);
      } else {
        $("#screen").html(operator);
        string = string + operator;
        $("#equation").html(string);
      }
    }
  }
  if (string.length === 35) {
      alert("string too long, calculator broke :(");
      string = "";
      $("#equation").html("calculator reset");
      $("#screen").html(0);
      valA = undefined;
      valB = undefined;
      operatorKey = undefined;
      decimalA = false;
      decimalB = false;
      total = undefined;
  }
};


var equalsClick = function(a, b, c) {
  if (a && b && c) {
    total = operators[c](a, b);
    console.log(a + c + b + "=" + total);
    $("#screen").html(total);
    string += "=" + total;
    $("#equation").html(string);
    valA = undefined;
    operatorKey = undefined;
    valB = undefined;
    decimalA = false;
    decimalB = false;
  }
  if (string.length > 34) {
      alert("string too long, calculator broke :(");
      string = "";
      $("#equation").html("calculator reset");
      $("#screen").html(0);
      valA = undefined;
      valB = undefined;
      operatorKey = undefined;
      decimalA = false;
      decimalB = false;
      total = undefined;
  }
};

var clearButton = function() {
  valA = undefined;
  valB = undefined;
  operatorKey = undefined;
  total = undefined;
  decimalA = false;
  decimalB = false;
  $("#screen").html("0");
  string = "0";
  $("#equation").html(string);
};

var clearEntryButton = function() {
  let lengthB;
  if (total) {
    valA = undefined;
    valB = undefined;
    operatorKey = undefined;
    total = undefined;
    decimalA = false;
    decimalB = false;
    string = "0";
    $("#screen").html("0");
    $("#equation").html(string);
  } else if (valB === undefined) {
    if (operatorKey === undefined) {
      if (valA) {
        valA = undefined;
        decimalA = false; //
        $("#screen").html("0");
        string = "0";
        $("#equation").html(string);
      } else {
        $("#screen").html("0");
        decimalA = false; //
        string = "0";
        $("#equation").html(string);
      }
    } else {
      operatorKey = undefined;
      $("#screen").html(valA);
      string = string.slice(0, -1);
      $("#equation").html(string);
    }
  } else {
    valB = valB.toString(); //
    lengthB = valB.length; //
    console.log("valB length: " + lengthB); //
    valB = undefined;
    decimalB = false;
    $("#screen").html("0");
    string = string.slice(0, -(lengthB)); //
    console.log(string);
    $("#equation").html(string);
  }
}
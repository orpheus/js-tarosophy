"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.to-string");

//tarological alphabet cycle table
const TACT = {
  a: 1,
  b: 2,
  g: 3,
  d: 4,
  e: 5,
  w: 6,
  v: 6,
  u: 6,
  z: 7,
  h: 8,
  th: 9,
  y: 10,
  j: 10,
  i: 10,
  k: 11,
  c: 11,
  l: 12,
  m: 13,
  n: 14,
  x: 15,
  o: 16,
  p: 17,
  f: 17,
  tz: 18,
  q: 19,
  r: 20,
  s: 21,
  t: 22
};

class Taroscope {
  constructor(name, birthday) {
    this.name = name;
    this.birthday = birthday;
  } //generate birth taroscope


  generateBTS() {
    let name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.name;
    let soul_path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getSoulPath(this.birthday);

    if (!name || !soul_path) {
      return new Error('Must provide name and soul path');
    }

    const taro_name = Taroscope.extendName(Taroscope._formatName(name));
    let taroscope = [];
    let counter = 0;
    counter += soul_path - 1;

    for (let i = 0; i < taro_name.length; i++) {
      for (let letter in TACT) {
        if (letter === taro_name[i]) {
          //check for Th, Tz
          if (letter === 't') {
            if (taro_name[i + 1] === 'z') {
              letter = 'tz';
            }

            if (taro_name[i + 1] === 'h') {
              letter = 'th';
            }
          }

          const number = TACT[letter];

          const map_search = number => {
            let tmp_number = number;
            tmp_number += counter;

            if (tmp_number > 22) {
              tmp_number -= 22;
            }

            if (!taroscope.includes(tmp_number)) {
              taroscope.push(tmp_number);
            } else {
              counter++;

              if (counter > 22) {
                counter = 0;
              }

              map_search(number);
            }
          };

          map_search(number);
        }
      }
    }

    return taroscope;
  }

  static extendName(name) {
    if (typeof name !== 'string') {
      return new Error('Name must be of type string');
    }

    const max_len = 22;
    let name_ext = '';
    let counter = 0;

    for (let i = 0; i < max_len; i++) {
      if (counter === name.length) {
        counter = 0;
      }

      name_ext += name[counter];
      counter++;
    }

    return name_ext;
  }

  getSoulPath() {
    let birthday = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.birthday;
    return Taroscope.reduceNumber(Taroscope._formatBirthday(birthday));
  }

  getNamePath() {
    let fullName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.name;

    let name = Taroscope._formatName(fullName);

    return Taroscope.reduceString(name);
  }

  static reduceNumber(arg) {
    if (typeof arg !== 'number') {
      return new Error('Arg must be of type number');
    }

    let string_num = arg.toString();

    while (arg > 9) {
      arg = 0;

      for (let num of string_num) {
        arg += parseInt(num);
      }

      string_num = arg.toString();
    }

    return arg;
  }

  static reduceString(arg) {
    if (typeof arg !== 'string') {
      return new Error('Arg must be of type string');
    }

    let counter = 0;

    for (let i = 0; i < arg.length; i++) {
      for (let letter in TACT) {
        if (letter === arg[i]) {
          counter += TACT[letter];
        }
      }
    }

    return Taroscope.reduceNumber(counter);
  }

  static _formatName(name) {
    if (typeof name !== 'string') {
      return new Error('Name must be of type string');
    }

    name = name.toLowerCase();
    let nameSplit = name.split(" ");

    if (nameSplit.length > 1) {
      let tmparr = [];

      for (let name of nameSplit) {
        if (name !== "") {
          tmparr.push(name);
        }
      }

      name = tmparr.join("");
    }

    return name;
  }

  static _formatBirthday(birthday) {
    if (typeof birthday === 'string') {
      if (birthday.includes("/")) {
        let bday_split = birthday.split("/");

        if (bday_split.length > 3) {
          return new Error('Birthday must be of format: mm/dd/yyyy');
        }

        birthday = bday_split.join("");
        return Taroscope.reduceNumber(parseInt(birthday));
      } else {
        return Taroscope.reduceNumber(parseInt(birthday));
      }
    } else if (typeof birthday === 'number') {
      if (birthday.toString().length < 6 || birthday.toString().length > 8) {
        return new Error('Birthday must be of format: mmddyyyy or mdyyyy');
      } else {
        return Taroscope.reduceNumber(birthday);
      }
    } else {
      return new Error('Birthday must be of type (String: mdyyyy || mmddyyy || mm/dd/yyyy) or of type (Number: mmddyyyy || mdyyyy)');
    }
  }

  setName(name) {
    this.name = name;
  }

  setBirthday(birthday) {
    this.birthday = birthday;
  }

  getName() {
    return this.name;
  }

  getBirthday() {
    return this.birthday;
  }

}

var _default = Taroscope;
exports.default = _default;
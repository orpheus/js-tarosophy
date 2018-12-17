const ryan_chacon = 'ryanandrewchacon'
const ryan_chacon_birthday = '12/29/1995'
const ryan_soul_path = 2

const shane_luna = 'shanetenayaluna'
const shane_luna_birthday = "05/29/1995"
const luna_soul_path = 4

const emily_loisel = 'emilyamandaloisel'
const emily_loisel_birthday = '7/6/1996'
const emily_soul_path = 2

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
}	

class Taroscope {
	constructor(name, birthday) {
		this.name = name
		this.birthday = birthday
	}

	generateMap(name = this.name, soul_path = this.getSoulPath(this.birthday)) {
		if (!name || !soul_path) {
			return new Error('Must provide name and soul path')
		}
	
		const taro_name = this.extendName(this._formatName(name))
		
		let taroscope = []
		let counter = 0
		counter += soul_path - 1

		for (let i = 0; i < taro_name.length; i++) {
			for (let letter in TACT) {
				if (letter === taro_name[i]) {
					//check for Th, Tz
					if (letter === 't') {
						if (taro_name[i+1] === 'z') {
							letter = 'tz'
						} 
						if (taro_name[i+1] === 'h') {
							letter = 'th'
						}
					}

					const number = TACT[letter]

					function map_search(number) {
						let tmp_number = number
						tmp_number += counter
						if (tmp_number > 22) {
							tmp_number -= 22
						}
						if (!taroscope.includes(tmp_number)) {
							taroscope.push(tmp_number)
						} else {
							counter++
							if (counter > 22) {
								counter = 0
							}
							map_search(number)
						}
					}
					map_search(number)
				}
			}
		}
		return taroscope
	}

	extendName(name) {
		if (typeof name !== 'string') {
			return new Error('Name must be of type string')
		}
		const max_len = 22
		let name_ext = ''
		let counter = 0
		for (let i = 0; i < max_len; i++) {
			if (counter === name.length) {
				counter = 0
			}
			name_ext += name[counter]
			counter++
		}
		return name_ext
	}

	getSoulPath(birthday = this.birthday) {
		return this.reduceNumber(this._formatBirthday(birthday))
	}

	getNamePath(fullName = this.name) {
		let name = this._formatName(fullName)
		return this.reduceString(name)
	}

	reduceNumber(arg) {
		if (typeof arg !== 'number') {
			return new Error('Arg must be of type number')
		}
		let string_num = arg.toString()
		while (arg > 9) {
			arg = 0
			for (let num of string_num) {
			arg += parseInt(num)
			}
			string_num = arg.toString()
		}
		return arg
	}

	reduceString(arg) {
		if (typeof arg !== 'string') {
			return new Error('Arg must be of type string')
		}
		let counter = 0
		for (let i = 0; i < arg.length; i++) {
			for (let letter in TACT) {
				if (letter === arg[i]) {
					counter += TACT[letter]
				}
			}
		}
		return this.reduceNumber(counter)
	}

	_formatName(name) {
		if (typeof name !== 'string') {
			return new Error('Name must be of type string')
		}
		name = name.toLowerCase()
		let nameSplit = name.split(" ")

		if (nameSplit.length > 1) {
			let tmparr = []
			for (let name of nameSplit) {
				if (name !== "") {
					tmparr.push(name)
				}
			}
			name = tmparr.join("")
		
		} 
		return name
	}

	_formatBirthday(birthday) {
		if (typeof birthday === 'string') {
			if (birthday.includes("/")) {
				let bday_split = birthday.split("/")
				if (bday_split.length > 3) {
					return new Error('Birthday must be of format: mm/dd/yyyy')
				}
				birthday = bday_split.join("")
				return this.reduceNumber(parseInt(birthday))
			} else {
				return this.reduceNumber(parseInt(birthday))
			}
		} else if (typeof birthday === 'number') {
			if (birthday.toString().length < 6 || birthday.toString().length > 8) {
				return new Error('Birthday must be of format: mmddyyyy or mdyyyy')
			} else {
				return this.reduceNumber(birthday)
			}
		} else {
			return new Error('Birthday must be of type (String: mdyyyy || mmddyyy || mm/dd/yyyy) or of type (Number: mmddyyyy || mdyyyy)')
		}
	}
}

let ryan = new Taroscope('ryan andrew chacon', '12/29/1995')
let ryan_map = ryan.generateMap()
console.log(ryan_map)
console.log("Ryan's soul path: ", ryan.getSoulPath())
console.log("Ryan's name path: ", ryan.getNamePath())

let erik = new Taroscope('erik andres chacon', '5/31/1997')
let erik_map = erik.generateMap()
console.log(erik_map)
console.log("Erik's soul path: ", erik.getSoulPath())
console.log("Erik's name path: ", erik.getNamePath())

let shane = new Taroscope("shanetenayaluna", shane_luna_birthday)
let shane_map = shane.generateMap()
console.log(shane_map)
console.log("Shane's soul path: ", shane.getSoulPath())
console.log("Shane's name path: ", shane.getNamePath())

module.exports = Taroscope






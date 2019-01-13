import Taroscope from "../src/taroscope";

describe('Tarosophy', () => {
	describe('Birth Taroscope', () => {
		it('for Ryan Chacon', () => {
			const name = 'ryanandrewchacon'
			const bday = '12/29/1995'

			let t = new Taroscope(name, bday)
			let bts = t.generateBTS()

			expect(bts).toEqual([ 21, 11, 2, 15, 3, 16, 6, 22, 7, 8, 13, 10, 4, 14, 19, 17, 1, 18, 9, 5, 20, 12 ])
			expect(t.getNamePath()).toEqual(3)
			expect(t.getSoulPath()).toEqual(2)
		})
		it('for Shane Luna', () => {
			const name = 'shanetenayaluna'
			const bday = "05/29/1995"

			let t = new Taroscope(name, bday)
			let bts = t.generateBTS()

			expect(bts).toEqual([ 2, 11, 4, 17, 8, 3, 9, 18, 5, 14, 6, 19, 13, 21, 10, 12, 22, 15, 7, 20, 16, 1 ])
			expect(t.getNamePath()).toEqual(9)
			expect(t.getSoulPath()).toEqual(4)
		})
		it('for Emily Loisel', () => {
			const name = 'emilyamandaloisel'
			const bday = '7/6/1996'

			let t = new Taroscope(name, bday)
			let bts = t.generateBTS()

			expect(bts).toEqual([ 6, 14, 11, 13, 12, 3, 15, 4, 17, 7, 5, 16, 20, 18, 8, 19, 9, 2, 10, 21, 1, 22 ])
			expect(t.getNamePath()).toEqual(7)
			expect(t.getSoulPath()).toEqual(2)
		})
		it('for Erik Chacon', () => {
			const name = 'erikandreschacon'
			const bday = "05/31/1997"

			let t = new Taroscope(name, bday)
			let bts = t.generateBTS()

			expect(bts).toEqual([ 12, 5, 17, 18, 8, 21, 11, 6, 13, 7, 19, 16, 9, 20, 3, 1, 14, 10, 22, 2, 15, 4 ])
			expect(t.getNamePath()).toEqual(1)
			expect(t.getSoulPath()).toEqual(8)
		})
	})
	describe('Natural Taroscope', () => {

	})
	describe('Paths', () => {

	})
	describe('Formatting', () => {

	})
})
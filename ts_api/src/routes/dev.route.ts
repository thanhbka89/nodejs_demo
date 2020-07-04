import { Router } from 'express'

import { catchErrorsAsync } from '../middleware'
import { log } from 'console'

const router = Router()

router.route('/').get((req, res) => {
	let myObj = { size: 10, label: 'Size 10 Object' }
	printLabel(myObj)

	let mySquare = createSquare({ color: 'black' })
	console.log(mySquare)

	let p1: Point = { x: 10, y: 20 }
	// p1.x = 5 // error!
	console.log(p1)

	const arr3: (Date | string[])[] = [new Date(), new Date(), ['1', 'a']]
	console.log(arr3)

	let arrayFromString = genericFunc<string>('beep')
	console.log(arrayFromString[0]) // "beep"
	console.log(typeof arrayFromString[0]) // String

	let arrayFromNumber = genericFunc(42)
	console.log(arrayFromNumber[0]) // 42

	const pessi = new Adroid.Number()
	pessi.test()

	// new Animal('Cat').name // Error: 'name' is private;
	const cat = new Animal('Cat')
	console.log(cat.age, cat)
	cat.showName()

	const dog = new Dog('Becgie')
	dog.showName()

	res.json('DEV...')
})

interface Point {
	readonly x: number
	readonly y: number
}

interface LabeledValue {
	label: string
}

function printLabel(labeledObj: LabeledValue): void {
	console.log(labeledObj.label)
}

interface SquareConfig {
	color?: string
	width?: number
}

function createSquare(config: SquareConfig): { color: string; area: number } {
	let newSquare = { color: 'white', area: 100 }
	if (config.color) {
		newSquare.color = config.color
	}
	if (config.width) {
		newSquare.area = config.width * config.width
	}
	return newSquare
}

function genericFunc<T>(argument: T): T[] {
	var arrayOfT: T[] = [] // Create empty array of type T.
	arrayOfT.push(argument) // Push, now arrayOfT = [argument].

	return arrayOfT
}

class Animal {
	private name: string
	age: number

	constructor(theName: string) {
		this.name = theName
		this.age = 123
	}

	showName(): void {
		console.log('showName', this.name)
	}
}

class Dog extends Animal {
	constructor(name: string) {
		super(name)
	}

	// overwrite
	showName(): void {
		console.log('showName of Dog')
	}
}

interface TuongInterface {
	ten: string
	mau: number
	satthuong: number
	mota: string

	XemTuong(): void
	donkinang(): any
	bienve(): void
}

//class tuong ke thua lai Interface TuongInterface
class Tuong implements TuongInterface {
	ten: string
	mau: number
	satthuong: number
	mota: string

	XemTuong(): void {
		console.log('xem')
	}

	donkinang(): any {
		return 'don ky nang'
	}

	bienve(): void {
		console.log('bien ve')
	}
}

// namespace
module Adroid {
	export class String {}

	export class Number {
		test(): void {
			console.log('ahihi')
		}
	}
}

export default router

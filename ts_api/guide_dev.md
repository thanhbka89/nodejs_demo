# Enviroment:
- OS: win10
- Node: v10

# Setup
- npm install
- npm run dev // --> DEV
- npm run watch // --> hot reload in DEV
- npm run test  // --> Unit Test

# Docs
- Type, Interface : User defined type
    + interface: kiểm tra kiểu các tham số của một hàm
    + type: 
- Computed Property Names, ex:
    var n = "Name"
    var student = { ["student" + n] : "Vũ Thanh Tài",
                    age: 22 }
    console.log(student) // {studentName: "Vũ Thanh Tài", age: 22}
- Tuples Type:  khai báo mảng với các giá trị có kiểu dữ liệu mà bạn đã biết
    type Tuple = [number, number]
    interface ITuple {
        0: number;
        1: number;
    }
    [1, 2, 3] as Tuple // Conversion of type '[number, number, number]' to type '[number, number]' may be a mistake
    [1, 2, 3] as ITuple // Ok
- Array:
    let list: number[] = [1, 2, 3]
    let list: Array<number> = [1, 2, 3]
- Enum:
    enum Color {Red, Green, Blue};
    let c: Color = Color.Green;
- Biến:
    let unusable: void = undefined // chỉ có thể gán 2 giá trị là null và undefined
    let u: undefined = undefined;
    let n: null = null
- Cast type (type assertion)
    let someValue: any = "this is a string";
    let strLength: number = (<string>someValue).length
    or
    let strLength: number = (someValue as string).length
- Default values: b? indicates that b is optional, so it may be undefined
    function keepWholeObject(wholeObject: { a: string, b?: number }) {
        let { a, b = 1001 } = wholeObject;
    }
- Variables use `const` whereas properties use `readonly`
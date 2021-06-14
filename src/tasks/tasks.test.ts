import {calculator, div, getDeepCopyStudent, sub, sum} from "./tasks";

test("sum", ()=>{
     //1.Тестовые данные
     const a: number = 10
     const b: number = 5
     //2.Выполнение тестируемого кода с тестовыми данными
     const result = sum(a, b)
     //3. Проверка ожидаемого результата
    expect(result).toBe(15 )
 })

test("div", ()=>{
     //1.Тестовые данные
     const a: number = 10
     const b: number = 5
     //2.Выполнение тестируемого кода с тестовыми данными
     const result = div(a, b)
     //3. Проверка ожидаемого результата
    expect(result).toBe(2 )
 })

test ("sub", ()=> {
    expect(sub(10,5)).toBe(5)
})

test("calculator", () => {
    const a: number = 10
    const b: number = 5
    expect(calculator(a,b, {type:"sum"})).toBe(15)
    expect(calculator(a,b, {type:"mult"})).toBe(50)
    expect(calculator(a,b, {type:"div"})).toBe(2)
    expect(calculator(a,b, {type:"sub"})).toBe(5)
})



///TDD

test("deep of student", () => {
    const student = {
        name: "Bob",
        age: 23,
        isMarried: true,
        friends: ["Alex", "Mike"]
    }
    const copyStudent = getDeepCopyStudent(student)
    expect(copyStudent === student).toBe(false)
    expect(copyStudent.name === student.name).toBe(true)
    expect(copyStudent.age === student.age).toBe(true)
    expect(copyStudent.friends === student.friends).not.toBe(true)
    expect(copyStudent.friends[0] === student.friends[0]).not.toBe(true)
})
일반 함수
var add = function (num1, num2) {
    return num1 + num2;
}

화살표 함수(Arrow function)
var add = (num1, num2) => num1 + num2

자바스크립트 일반 함수와 화살표 함수의 차이
1. 'this'
    - 일반 함수의 'this'는 함수가 호출될 때 결정되며, 호출 컨텍스트에 따라 달라짐
    ```
    function normalFunction() {
        console.log(this);
    }

    // 일반 함수를 메서드로 사용
    const obj1 = { normalFunction };
    obj1.normalFunction(); // obj1 출력

    // 일반 함수를 일반 함수로 호출
    normalFunction(); // 전역 객체 또는 undefined(strict mode) 출력

    ```

    - 화살표 함수는 자체의 'this'를 가지지 않고 'this'값은 항상 상위 범위에서 상속되므로 어디서 호출되던지에 관계 없이 항상 일관성을 유지하는 'this'값을 가짐
    ```
    const arrowFunction = () => {
      console.log(this);
    };

    // 화살표 함수를 메서드로 사용
    const obj2 = { arrowFunction };
    obj2.arrowFunction(); // 상위 범위에서 상속받은 this 출력

    // 화살표 함수를 일반 함수로 호출
    arrowFunction(); // 상위 범위에서 상속받은 this 출력
    ```

2. arguments
    - 일반함수에서는 'arguments'객체를 사용하여 모든 입력 인자에 접근 가능함
    ```
    function normalFunction(a, b) {
      console.log(arguments);
    }
    normalFunction(1, 2, 3, 4, 5); // Arguments(5) [1, 2, 3, 4, 5]

    ```

    - 화살표 함수는 'arguments'객체가 없음. 함수 인자를 모두 포함하는 배열이 필요한 경우, 나머지 매개변수('...args')를 사용함
    ```
    const arrowFunction = (a, b) => {
      console.log(arguments); // ReferenceError: arguments is not defined
    };
    arrowFunction(1, 2, 3, 4, 5);
    ```

3. 생성자 함수
    - 일반 함수에서는 'new'키워드를 사용하여 생성자 함수로 사용할 수 있음. 새로 생성된 객체는 함수의 'prototype'을 상속받음
    ```
    function NormalFunction() {
      this.value = "normal function";
    }
    const instance1 = new NormalFunction();
    console.log(instance1.value); // "normal function"
    ```

    - 화살표 함수는 생성자 함수로 사용할 수 없음. 따라서 'new'키워드를 사용하여 화살표 함수를 호출하면 오류 발생
    ```
    const ArrowFunction = () => {
      this.value = "arrow function";
    };
    // TypeError: ArrowFunction is not a constructor
    const instance2 = new ArrowFunction();
    ```

4. yield
    - 일반 함수에서는 'function*'문법을 사용하면 제너레이터 함수를 만들 수 있음. 제너레이터 함수 내에서는 'yield'키워드를 사용할 수 있음
    ```
    function* normalGeneratorFunction() {
      yield 1;
      yield 2;
      yield 3;
    }
    const generator = normalGeneratorFunction();
    console.log(generator.next()); // { value: 1, done: false }
    ```

    - 화살표 함수는 제너레이터 함수를 만들 수 없고, 'yield'키워드를 사용할 수 없음
    ```
    const arrowGeneratorFunction = *() => { // SyntaxError
      yield 1;
      yield 2;
      yield 3;
    };
    ```

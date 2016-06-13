# chai-and-then
A simple helper for multiple async assertions. It allows for easy and natural
chaining of your assertions, for example to observe side effects.

Instead of using this you would need to use `.then`, which can make the code
harder to read.

## Example
This is taken from the tests and shows how easy it is to observe side effects.

```javascript
describe("a small example", function exampleTest() {
  it("correctly observers side effects", function sideEffects() {
    var target = { count : 0 }

    function foo() {
      target.count++
      return true
    }

    expect(target).to.have.property("count", 0)
    return expect(Promise.resolve().then(foo)).to.become(true)
      .andThen(target).to.have.property("count", 1)
  })
})
```

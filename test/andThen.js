var chai = require("chai"),
    expect = chai.expect

chai.use(require("../andThen.js"))
chai.use(require("chai-as-promised"))

describe("andThen", function andThenSuite() {
  var first = { first: true },
      second = { second: true }

  it("is properly registerd with chai", function chaiRegistration() {
    expect(chai.Assertion).to.respondTo("andThen")
  })

  it("changes the test subject synchronously", function changeSubject() {
    expect(first).to.equal(first).andThen(second).to.not.equal(first)
  })

  it("doesn't interfer with chai-as-promised", function nonInterference() {
    return expect(Promise.reject(new TypeError("nope"))).to.be.rejectedWith(TypeError)
      .then(function() { return expect(Promise.resolve()).to.be.fufilled })
  })


  it("integrates with chai-as-promised", function integration() {
    return expect(Promise.resolve(first)).to.become(first).andThen(second).to.equal(second)
  })

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

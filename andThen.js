module.exports = exports = function chaiAndThen(chai, utils) {
  chai.Assertion.addMethod("andThen", function andThen(newExpected) {
    // By setting the `eventually` flag, chai as promised plays along nicely
    this._obj = Promise.resolve(newExpected)
    utils.flag(this, "eventually", true)
  })
}

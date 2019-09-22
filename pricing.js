function volLife(product, price, dollarsOff) {
  if (product.employerContribution.mode === 'dollar') {
    price = price - product.employerContribution.contribution
  } else {
    dollarsOff = price * (product.employerContribution.contribution / 100)
    price = price - dollarsOff
  }
  return price
}
function formatPrice(price) {
  price = parseInt(price * 100) / 100
  return price
}
function ltdCoverage(price, employee, product) {
  var salaryPercentage = product.coveragePercentage / 100
  price += ((employee.salary * salaryPercentage) / product.cost.costDivisor) * product.cost.price
  return price
}
function ourCoverageAmount(price, coverageLevels, product) {
  for (var i = 0; i < coverageLevels.length; i++) {
    var coverageAmount = coverageLevels[i].coverage
    price += (coverageAmount / product.cost.costDivisor) * product.cost.price
  }
  return price
}
module.exports.calculateProductPrice = function (product, employee, coverageLevels) {
  var price = 0
  var dollarsOff = 0

  switch (product.type) {
    case 'volLife':
      price = ourCoverageAmount(price, coverageLevels, product)
      price = volLife(product, price, dollarsOff)
      return formatPrice(price)
    case 'ltd':
      price = ltdCoverage(price, employee, product)
      price = volLife(product, price, dollarsOff)
      return formatPrice(price)
    default:
      return 0
  }
}

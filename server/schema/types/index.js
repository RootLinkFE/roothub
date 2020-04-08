const fs = require('fs')
const path = require('path')
const { mergeTypes } = require('merge-graphql-schemas')

const findGqlFiles = dir => {
  var results = []
  var list = fs.readdirSync(dir)
  list.forEach(file => {
    file = path.join(dir, file).toString('utf-8')
    var stat = fs.statSync(file)
    if (stat && stat.isDirectory()) {
      // Recurse into a subdirectory
      results = results.concat(findGqlFiles(file))
    } else {
      if (path.extname(file) === '.gql') {
        // Is a gql file
        results.push(file)
      }
    }
  })
  return results
}

const typeDefs = []

findGqlFiles(__dirname).forEach(file => {
  typeDefs.push(fs.readFileSync(file).toString('utf-8'))
})

module.exports = mergeTypes(typeDefs, { all: true })
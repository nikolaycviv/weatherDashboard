const chai = require('chai')
chai.config.includeStack = true
chai.use(require('chai-as-promised'))
chai.use(require('dirty-chai'))
chai.use(require('sinon-chai'))
global.sinon = require('sinon')
global.sandbox = sinon.createSandbox()
global.expect = chai.expect

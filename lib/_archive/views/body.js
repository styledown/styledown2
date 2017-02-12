const { h } = require('preact')
const c = require('classnames')
const map = require('object-loops/map')
const values = require('object-loops/values')

const Section = require('./section')

function Body ({ sections }) {
  return <div class='styleguide-body'>
    {values(map(sections, section =>
      <Section section={section} />))}
  </div>
}

module.exports = Body

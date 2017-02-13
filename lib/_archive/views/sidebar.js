const { h } = require('preact')
const Menu = require('./menu')

function Sidebar ({ toc, active }) {
  return <div className='styleguide-sidebar'>
    <input type='checkbox' id='sidebar-toggle' />
    <label className='button' for='sidebar-toggle'></label>
    <label className='screen' for='sidebar-toggle'></label>
    <div className='menu'><Menu toc={toc} active={active} /></div>
  </div>
}

module.exports = Sidebar

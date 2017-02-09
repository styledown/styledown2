const { h } = require('preact')
const c = require('classnames')
const map = require('object-loops/map')

function Menu ({ toc, active }) {
  return <ul className='styleguide-menu'>
  {map(toc.sections, section => [
    <MenuItemLi section={section} depth={1} active={active} />,
    <MenuItemHeadings section={section} depth={1} active={active} />
  ])}
  </ul>
}

/*
 * List item per heading
 */

function MenuItemLi ({ section, depth, active }) {
  const href = section.basename &&
    (section.basename + '.html' + (section.anchor || ''))

  return <li className={c(
    'styleguide-menu-item',
    `-level-${depth}`,
    { '-parent': section.sections }
  )}>

    {/* Text */}
    {section.basename ?
      <a href={href} className='link title'>{section.title}</a>
    : section.title ?
      <span className='title'>{section.title}</span>
    : null}

    {/* Headings */}
    {(section.headings && section.basename === active && !section.expand && !section.anchor) ?
      <ul class='headings styleguide-heading-list'>
        {map(m.headings, (heading, key) =>
          <MenuHeading heading={heading} depth={0} />
        )}
      </ul>
    : null}

    {/* Sub-pages */}
    {section.sections ?
      <ul class='submenu'>
        {map(section.sections, (section, key) => [
          <MenuItemLi section={section} depth={depth + 1} active={active} />,
          <MenuItemHeadings section={section} depth={depth + 1} active={active} />
        ])}
      </ul>
    : null}
  </li>
}

/*
 * Menu item headings
 * Taken from latter part `+menu`
 */

function MenuItemHeadings ({ section, depth, active }) {
  if (section.headings && section.basename === active && section.expand && !section.anchor) {
    return map(section.headings, heading =>
      <HeadingMenu heading={heading} depth={depth} active={active} />
    )
  }
}

/*
 * Heading
 * Taken from `+heading`
 */

function MenuHeading ({ heading, depth }) {
  // TODO
  return <li className={c('styleguide-heading-item', `-depth-${heading.depth}`)}>
  </li>
}

/*
 * Taken from `+heading-menu`
 */

function HeadingMenu ({ heading, depth }) {
  return <li className={c(
    'styleguide-menu-item',
    `-level-${depth}`,
    { '-parent': heading.headings }
  )}>
    <a className={c(
      'link', 'title', `link-${heading.id}`
    )}>
      {heading.title}
    </a>

    {heading.headings ?
      <ul className='submenu'>
        {map(heading.headings, heading =>
          <HeadingMenu heading={heading} depth={depth + 1} />
        )}
      </ul>
    : null}
  </li>
}

module.exports = Menu

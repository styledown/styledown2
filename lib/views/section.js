const { h } = require('preact')
const c = require('classnames')
const map = require('object-loops/map')
const values = require('object-loops/values')

function Section ({ section }) {
  return <section className={c('styleguide-section', `-h${section.depth}`)}>
    {/* h2 */}
    {h(`h${section.depth}`, { id: section.id }, section.title)}

    {values(map(section.parts, part =>
      part.type === 'text' ?
        <TextPart part={part} />
      : part.type === 'code' ?
        <CodePart part={part} />
      : part.type === 'example' ?
        <ExamplePart part={part} />
      : <div />
    ))}
  </section>
}

function TextPart ({ part }) {
  return <div
    className='styleguide-text'
    dangerouslySetInnerHTML={{__html: part.content}} />
}

function CodePart ({ part }) {
  return <div className='styleguide-code'>
    <pre className={c(part.class, part.language && `lang-${part.language}`)}>
      <code>{part.content}</code>
    </pre>
  </div>
}

function ExamplePart ({ part }) {
  return <div className={c('styleguide-example', part.class, part.language && `lang-${part.language}`)}>
    <div className='figure' dangerouslySetInnerHTML={{__html: part.content}} />
    <div className='source'>
      <pre className={c(part.class, part.language && `lang-${part.language}`)}>
        <code>{part.source || part.content}</code>
      </pre>
    </div>
  </div>
}

module.exports = Section

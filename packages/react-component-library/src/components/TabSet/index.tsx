import React, { useState, Children } from 'react'
import uuid from 'uuid'

interface TabSetProps {
  className?: string
  children?: any
  onChangeCallback?: (id: number, title: string) => void
}

const TabSet: React.FC<TabSetProps> = ({
  className = '',
  children,
  onChangeCallback,
}) => {
  const [activeTab, setActiveTab] = useState(0)

  function handleClick(index: number, title: string) {
    setActiveTab(index)

    if (typeof onChangeCallback === 'function') {
      onChangeCallback(activeTab, title)
    }
  }

  return (
    <article className={`rn-tab-set ${className}`}>
      <header className="rn-tab-set__head">
        <nav>
          <ol className="rn-tab-set__tabs">
            {Children.map(children, ({ props }, index: number) => {
              const { title } = props

              return (
                <li
                  key={uuid()}
                  className={`rn-tab-set__tab-item ${
                    index === activeTab ? 'is-active' : ''
                  }`}
                  data-testid="tab"
                >
                  <button
                    className="rn-tab-set__tab"
                    onClick={() => handleClick(index, title)}
                    data-testid={`select-tab-${index}`}
                  >
                    {title}
                  </button>
                </li>
              )
            })}
          </ol>
        </nav>
      </header>
      <div className="rn-tab-set__body">
        {Children.map(children, (Child: any, index: number) => {
          return (
            <div
              key={uuid()}
              className={`rn-tab-set__content ${
                index === activeTab ? 'is-active' : ''
              }`}
              data-testid="content"
            >
              {Child}
            </div>
          )
        })}
      </div>
    </article>
  )
}

TabSet.displayName = 'TabSet'

export default TabSet

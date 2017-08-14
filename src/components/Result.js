import React from 'react'

const Result = ({ warning = false, list = [], prepareForm, url }) => {
  return (
    <div className={`card ${warning ? "border-warning" : ""}`} style={{ marginBottom: 10 }}>
      <div className="card-header">
        <h4>
          {url}
        </h4>
      </div>
      <div className="card-body">
        {list.map((item, index) => (
          <div className="card" style={{ marginTop: 10 }} key={index}>
            <div className="card-body">
              <strong>{`<${item.name}>: `}</strong>

              {item.selector}

              <pre>{item.value}</pre>

              {prepareForm ?
                <div>
                  <input type="hidden" name={`name[${index}]`} value={item.name}/>
                  <input type="hidden" name={`selector[${index}]`} value={item.selector}/>
                  <input type="hidden" name={`value[${index}]`} value={item.value}/>
                </div>
              : false}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Result

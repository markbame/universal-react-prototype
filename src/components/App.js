//smart Component
import React from 'react'
import universal from 'react-universal-component'
import styles from '../css/App.css'
import Loading from './Loading'


//1st param : component(async)
//2nd param : options
    // loading: LoadingComponent, -- default: a simple one is provided for you
    // error: ErrorComponent, -- default: a simple one is provided for you
    // resolve: () => require.resolveWeak('./Foo')
    // path: path.join(__dirname, './Example')
    // key: 'foo' || module => module.foo -- default: default export in ES6 and module.exports in ES5
    // chunkName: 'myChunkName'
    // timeout: 15000 -- default
    // onLoad: `module => doSomething(module)
    // minDelay: 0 -- default
const UniversalExample = universal(() => import('./Example'), {
  resolve: () => require.resolveWeak('./Example'),
  minDelay: 500,
  loading: <Loading />
})

export default class App extends React.Component {
  // set `show` to `true` to see dynamic chunks served by initial request
  // set `show` to `false` to test how asynchronously loaded chunks behave,
  // specifically how css injection is embedded in chunks + corresponding HMR
  state = {
    show: false
  }

  componentDidMount() {
    if (this.state.show) return

    setTimeout(() => {
      console.log('now showing <Example />')
      this.setState({ show: true })
    }, 1500)
  }

  render() {
    return (
      <div>
        <h6 className={styles.title}>test</h6>
        {this.state.show && <UniversalExample />}
        {!this.state.show && '1. Async Component Not Requested Yet'}
      </div>
    )
  }
}

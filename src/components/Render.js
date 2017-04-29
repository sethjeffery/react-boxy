import React, { Component } from 'react';
import Matter from 'matter-js'
import PropTypes from 'prop-types'

import './App.css'

export default class World extends Component {
  static defaultProps = {
    width: 800,
    height: 600
  }

  static contextTypes = {
    engine: PropTypes.object
  }

  componentDidMount() {
    this.render = Matter.Render.create({
      element: this.el,
      engine: this.context.engine,
      options: this.props
    })

    Matter.Render.run(this.render)
  }

  componentWillUnmount() {
    Matter.Render.stop(this.render)
  }

  render() {
    return (
      <div ref={el => { this.el = el }} style={this.props.style} className={this.props.className}></div>
    )
  }
}

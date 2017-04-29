import React, { Component } from 'react';
import Matter from 'matter-js'
import PropTypes from 'prop-types'

export default class Render extends Component {
  static defaultProps = {
    width: 800,
    height: 600
  }

  static contextTypes = {
    engine: PropTypes.object
  }

  componentDidMount() {
    this.matterRender = Matter.Render.create({
      element: this.el,
      engine: this.context.engine,
      options: this.props
    })

    Matter.Render.run(this.matterRender)
  }

  componentWillUnmount() {
    Matter.Render.stop(this.matterRender)
  }

  render() {
    return (
      <div ref={el => { this.el = el }} style={this.props.style} className={this.props.className}></div>
    )
  }
}

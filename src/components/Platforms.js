import React from 'react';
import PropTypes from 'prop-types'
import { Body } from 'react-game-kit'

const Platforms = ({
  platforms
}) => (
  <div>
    { platforms.map((platform, index) => (
      <Body
        key={index}
        args={platform.args}
        collisionFilter={{ group: 1}}
        isStatic
        chamfer={{radius: 5}}
        friction={1}
        >
          <span></span>
      </Body>
    ))}
  </div>
)

Platforms.propTypes = {
  platforms: PropTypes.array
}

export default Platforms

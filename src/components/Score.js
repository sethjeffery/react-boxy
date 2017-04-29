import React from 'react';
import PropTypes from 'prop-types'

export default ({
  score
}) => (
  <div className='info'>
    Score: { parseInt(score) }
  </div>
)
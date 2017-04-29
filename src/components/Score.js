import React from 'react';
import PropTypes from 'prop-types'

const Score = ({
  score
}) => (
  <div className='info'>
    Score: { parseInt(score, 0) }
  </div>
)

Score.propTypes = {
  score: PropTypes.number.isRequired
}

export default Score

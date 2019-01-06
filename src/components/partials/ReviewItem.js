import React from 'react'
import {
  Media
} from 'reactstrap'
import Moment from 'react-moment';
import { Star, Egg } from './Icons'

const ReviewItem = (props) => {
  const { review } = props
  
  return (
    <Media key={review.id} style={{margin: 20, border: "1px solid grey"}}>
      <Media left href="#">
        <Media object src="https://cdn1.iconfinder.com/data/icons/female-avatars-vol-1/256/female-portrait-avatar-profile-woman-sexy-redhead-512.png"
        style={{width: 120, height: 120, marginRight: '2vw'}} alt={review.user_id + " image"} />
      </Media>
      <Media body>
        <Media heading>
          {review.rating > 0 ?
            Array(review.rating).fill().map((star, i) => <Star key={i}/>) :
            <Egg/>
          }
        </Media>
          {review.content}
          <div>
            <Moment fromNow>{review.created_at}</Moment>
          </div>
      </Media>
    </Media>
  )
}

export default ReviewItem

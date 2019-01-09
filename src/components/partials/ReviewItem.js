import React, { Component } from 'react'
import {
  Media,
  Button
} from 'reactstrap'
import Moment from 'react-moment';
import { Star, Egg } from './Icons'
import Comment from './Comment'
import { Link } from 'react-router-dom'

export default class ReviewItem extends Component {

  state = {
    comments: []
  }

  fetchComments = async () => {
    try {
      const token = localStorage.getItem('token')
      const { restaurant_id, id}  = this.props.review

      const res = await fetch(`http://localhost:3000/restaurants/${restaurant_id}/reviews/${id}/comments`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`
         }
      })
      const comments = await res.json()
      this.setState({ comments })

    } catch (error) {
      console.log(error);
    }
  }

  clearComments = () => {
    this.setState({ comments: [] })
  }

  render() {
    const { review } = this.props

  return (
    <Media className="box" key={review.id}>
      <Media left href="#">
        <Link to={`/user/${review.user_id}`}>
          <Media object src="https://cdn1.iconfinder.com/data/icons/female-avatars-vol-1/256/female-portrait-avatar-profile-woman-sexy-redhead-512.png"
          style={{width: 120, height: 120, marginRight: '2vw'}} alt={review.user_id + " image"} />
        </Link>
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
          <div>
          {this.state.comments.length === 0 &&
            <Button color="secondary" size="md" onClick={() => this.fetchComments(review.id)}>
              Show Comments
            </Button>
          }

          {this.state.comments.length > 0 &&
            <div>
              <Button color="secondary" size="md" onClick={() => this.clearComments()}>
                Hide Comments
              </Button>
              {this.state.comments.map(comment => <Comment comment={comment} key={comment.id}/>)}
            </div>

          }
          </div>
      </Media>

    </Media>
  )}
}

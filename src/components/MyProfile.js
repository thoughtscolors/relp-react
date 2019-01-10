import React, { Component } from 'react'
import ReviewItem from './partials/ReviewItem'

export default class MyProfile extends Component {

  state = {
    user: {},
    reviews: []
  }

  fetchReviews = async () => {
    try {
      const token = localStorage.getItem('token')
      const {id} = this.props.user

      const res = await fetch(`http://localhost:3000/users/${id}/reviews`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`
         }
      })
      const reviews = await res.json()
      this.setState({ reviews })
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount = () => {
    this.fetchReviews()
  }

  render() {
    const { reviews } = this.state
    console.log("PROPS IN MY PROFILE", this.props);
    console.log("STATE IN MY PROFILE", this.state);
    return (
      <div className="container">
        <div style={{ textAlign: "center" }}>
          <h1> My Reviews </h1>
        </div>
        <div>
          {reviews.length > 0 &&
            reviews.map(review => (
              <ReviewItem review={review} key={review.id} user={this.props.user} restaurantId={review.restaurant_id}/>
            )) }
        </div>
      </div>
    )
  }
}

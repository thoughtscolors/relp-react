import React, { Component } from 'react'
import ReviewItem from './partials/ReviewItem'
import RestaurantListItem from './partials/RestaurantListItem'
import AddReview from './partials/AddReview'

export default class User extends Component {

  state = {
    user: {},
    reviews: []
  }

  fetchUser = async () => {
    try {
      const token = localStorage.getItem('token')
      const id = this.props.match.params.id

      const res = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`
         }
      })
      const user = await res.json()
      this.setState({ user })
    } catch (error) {
      console.log(error);
    }
  }

  fetchReviews = async () => {
    try {
      const token = localStorage.getItem('token')
      const id = this.props.match.params.id

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
    this.fetchUser()
    this.fetchReviews()
  }

  render() {
    const { reviews, user } = this.state
    console.log("PROPS IN USER", this.props)
    console.log("STATE IN USER", this.state);
    return (
      <div className="container">
        <div style={{ textAlign: "center" }}>
          <h1> {`${user.name}'s Reviews`} </h1>
        </div>
        <div>
          {reviews.length > 0 &&
            reviews.map(review => (
              <ReviewItem review={review} key={review.id}/>
            )) }
        </div>
      </div>
    )
  }
}

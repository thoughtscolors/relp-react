import React, { Component } from 'react'
import ReviewItem from './partials/ReviewItem'

export default class Restaurant extends Component {

  state = {
    restaurant: {},
    reviews: []
  }

  fetchRestaurant = async () => {
    try {
      const token = localStorage.getItem('token')
      const id = this.props.match.params.id

      const res = await fetch(`http://localhost:3000/restaurants/${id}`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`
         }
      })
      const restaurant = await res.json()
      this.setState({ restaurant })
    } catch (error) {
      console.log(error);
    }
  }

  fetchReviews = async () => {
    try {
      const token = localStorage.getItem('token')
      const id = this.props.match.params.id

      const res = await fetch(`http://localhost:3000/restaurants/${id}/reviews`, {
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
    this.fetchRestaurant()
    this.fetchReviews()
  }

  render() {
    const { reviews } = this.state
    
    return (
      <div className="container">
        <div style={{ textAlign: "center" }}>
          <h1> {this.state.restaurant.name} </h1>
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

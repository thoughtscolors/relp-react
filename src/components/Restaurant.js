import React, { Component } from 'react'
import ReviewItem from './partials/ReviewItem'
import RestaurantListItem from './partials/RestaurantListItem'
import AddReview from './partials/AddReview'

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
    const { reviews, restaurant } = this.state
    console.log("PROPS IN RESTAURANT", this.props);
    
    return (
      <div className="container">
        <div>
          <RestaurantListItem history={this.props.history} restaurant={restaurant} user={this.props.user} />
        </div>
        <div>
          {!this.props.user.owner &&
            <AddReview
            restaurant_id={restaurant.id}
            fetchReviews={this.fetchReviews}
            user={this.props.user}/> }
          {reviews.length > 0 &&
            reviews.map(review => (
              <ReviewItem review={review} key={review.id}/>
            )) }
        </div>
      </div>
    )
  }
}

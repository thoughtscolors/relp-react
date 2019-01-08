import React, { Component } from 'react'
import RestaurantListItem from './partials/RestaurantListItem'
import { Button } from 'reactstrap'

export default class OwnerHomePage extends Component {
  state = {
    restaurants: []
  }

  fetchRestaurants = async () => {
    try {
      const token = localStorage.getItem('token')

      const res = await fetch('http://localhost:3000/restaurants', {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const data = await res.json()
      const restaurants = data.filter(restaurant => restaurant.user_id === this.props.user.id)
      this.setState({ restaurants })
    } catch (error) {
      console.log(error);
    }
  }
  
  addRestaurant = () => {
    console.log('clicked')
    this.props.history.push('/addrestaurant')
  }

  componentDidMount = () => {
    this.fetchRestaurants();
    console.log(this.props)
  }

  render() {

    const { restaurants } = this.state
    return (
      <div className="container">
        <div style={{ justifyContent: "space-between", display: "flex" }}>
          <h1>Your Restaurants </h1>
          <Button onClick={this.addRestaurant}>Add a Restaurant</Button>
        </div>
        <div>
          {restaurants.length > 0 &&
            restaurants.map(restaurant => (
              <RestaurantListItem restaurant={restaurant} key={restaurant.id} />
            ))}
        </div>
      </div>
    )
  }
}
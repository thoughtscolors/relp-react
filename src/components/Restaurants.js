import React, { Component } from 'react'
import RestaurantListItem from './partials/RestaurantListItem'

export default class Restaurants extends Component {

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
      const restaurants = await res.json()
      this.setState({ restaurants })
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount = () => {
    this.fetchRestaurants()
  }

  render() {

    const { restaurants } = this.state
    return (
      <div className="container">
        <div style={{ textAlign: "center" }}>
          <h1> Restaurants </h1>
        </div>
        <div>
        {restaurants.length > 0 &&
          restaurants.map(restaurant => (
            <RestaurantListItem restaurant={restaurant} key={restaurant.id}/>
          )) }
        </div>
      </div>
    )
  }
}

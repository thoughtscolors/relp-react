import React, { Component } from 'react';
import Search from './partials/Search'
import RestaurantListItem from './partials/RestaurantListItem'

export default class SearchPage extends Component {

  state = {
    restaurant: {}
  }

  fetchRestaurant = async (e, searchTerm) => {
    try {
      e.preventDefault()
      console.log('clicked');
      const token = localStorage.getItem('token')

      const res = await fetch(`http://localhost:3000/restaurants/${searchTerm}`, {
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

  render() {

    return (
      <div className="container">
        <div className="box">
          <Search search={this.fetchRestaurant}/>
        </div>
        <RestaurantListItem restaurant={this.state.restaurant}/>
      </div>
    )
  }
}

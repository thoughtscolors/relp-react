import React, { Component } from 'react';
import { Alert } from 'reactstrap'
import Search from './partials/Search'
import RestaurantListItem from './partials/RestaurantListItem'

export default class SearchPage extends Component {

  state = {
    restaurant: {},
    errors: []
  }

  fetchRestaurant = async (e, searchTerm) => {
    try {
      e.preventDefault()
      this.setState({ restaurant: {}, errors: [] })
      const token = localStorage.getItem('token')

      const res = await fetch(`http://localhost:3000/restaurants/search/?q=${searchTerm}`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`
         }
      })
      const restaurant = await res.json()
      if (restaurant.errors) {
        this.setState({ errors: restaurant.errors })
      } else {
        this.setState({ restaurant })
      }
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
        {this.state.errors.length > 0 &&
          <Alert color="info">
            <ul>
              {this.state.errors.map(error => (
                <li>{error}</li>
              ))}
            </ul>
          </Alert>
        }
      </div>
    )
  }
}

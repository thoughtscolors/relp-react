import React, { Component } from 'react'
import {
  Media
} from 'reactstrap'

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
            <Media key={restaurant.id} style={{margin: 20}}>
              <Media left href="#">
                <Media object src="https://resizer.otstatic.com/v2/photos/medium/24162862.jpg"
                style={{width: 120, height: 120, marginRight: '2vw'}} alt={restaurant.name + " image"} />
              </Media>
              <Media body>
                <Media heading>
                  {restaurant.name}
                </Media>
                  {restaurant.description}
                <Media>
                </Media>
                  {`${restaurant.address} ${restaurant.city}, ${restaurant.state} ${restaurant.zip}`}
                <Media>
                </Media>
                  {restaurant.phone}
                <Media>
                </Media>
              </Media>
            </Media>
          )) }
        </div>
      </div>
    )
  }
}

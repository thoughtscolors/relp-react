import React from 'react'
import {
  Media
} from 'reactstrap'
import { Link } from 'react-router-dom'

const RestaurantListItem = (props) => {
  const { restaurant } = props

  return (
    <Media className="box" key={restaurant.id}>
      <Media left href="#">
        <Media object src="https://previews.123rf.com/images/dmitrymoi/dmitrymoi1702/dmitrymoi170200016/71707598-restaurant-or-cafe-exterior-building-vector-cartoon-illustration.jpg"
        style={{width: 120, height: 120, marginRight: '2vw'}} alt={restaurant.name + " image"} />
      </Media>
      <Media body>
        <Media heading>
          <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link>
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
  )
}

export default RestaurantListItem

import React from 'react'
import {
  Media
} from 'reactstrap'
import { Link } from 'react-router-dom'

const RestaurantListItem = (props) => {
  const { restaurant } = props
  
  return (
    <Media key={restaurant.id} style={{margin: 20}}>
      <Media left href="#">
        <Media object src="https://resizer.otstatic.com/v2/photos/medium/24162862.jpg"
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

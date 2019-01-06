import React, { Component } from 'react'
import {
  Media
} from 'reactstrap'

export default class Restaurant extends Component {

  state = {
    reviews: []
  }

  fetchReviews = async () => {
    try {
      const token = localStorage.getItem('token')

      const res = await fetch(`http://localhost:3000/restaurants/1/reviews`, {
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
    this.fetchReviews()
  }

  createStars = (numberOfStars) => {
    const star = <img src='https://vignette.wikia.nocookie.net/nintendo/images/0/0d/Artwork_-_SUPER_STAR_%28Simple%29.svg/revision/latest/scale-to-width-down/502?cb=20160716213643&path-prefix=en' style={{width: 20, height: 20}} alt="star"/>
    let stars = []
    for (var i = 0; i < numberOfStars; i++) {
      stars.push(star)
    }
    return stars
  }

  render() {

    const { reviews } = this.state
    return (
      <div className="container">
        <div style={{ textAlign: "center" }}>
          <h1> {/*TODO: restaurant name and details*/} </h1>
        </div>
        <div>
          {reviews.length > 0 &&
            reviews.map(review => (
              <Media key={review.id} style={{margin: 20, border: "1px solid grey"}}>
                <Media left href="#">
                  <Media object src="https://cdn1.iconfinder.com/data/icons/female-avatars-vol-1/256/female-portrait-avatar-profile-woman-sexy-redhead-512.png"
                  style={{width: 120, height: 120, marginRight: '2vw'}} alt={review.user_id + " image"} />
                </Media>
                <Media body>
                  <Media heading>
                    {this.createStars(review.rating).map(star => star)}
                  </Media>
                    {review.content}
                    <div>
                      {review.created_at}
                    </div>
                </Media>
              </Media>
            )) }
        </div>
      </div>
    )
  }
}

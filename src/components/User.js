import React, { Component } from 'react'
import ReviewItem from './partials/ReviewItem'
import { Button, Alert } from 'reactstrap'

export default class User extends Component {

  state = {
    user: {},
    reviews: [],
    followed: false,
    follow: {},
    errors: []
  }

  fetchUser = async () => {
    try {
      const token = localStorage.getItem('token')
      const id = this.props.match.params.id

      const res = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`
         }
      })
      const user = await res.json()
      this.setState({ user })
    } catch (error) {
      console.log(error);
    }
  }

  fetchReviews = async () => {
    try {
      const token = localStorage.getItem('token')
      const id = this.props.match.params.id

      const res = await fetch(`http://localhost:3000/users/${id}/reviews`, {
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

  fetchFollow = async () => {
    try {
      const token = localStorage.getItem('token')
      const id = this.props.match.params.id
      const { user } = this.props

      const res = await fetch(`http://localhost:3000/users/${user.id}/follows/${id}`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`
         }
      })
      const follow = await res.json()
      if (follow.length > 0) {
        this.setState({ followed: true, follow })
      }

    } catch (error) {
      console.log(error);
    }
  }

  followUser = async (e) => {
    try {
      e.preventDefault()
      const token = localStorage.getItem('token')
      const { user } = this.props

      const follow = {
        follower_id: user.id,
        followee_id: this.state.user.id
      }



      const res = await fetch(`http://localhost:3000/users/${user.id}/follows`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          "content-type": 'application/json'
        },
        body: JSON.stringify({ follow })
      })
      if (res.status === 201 ) {
        console.log("SUCCESS", await res.json());
        this.fetchFollow()
      }

    } catch (error) {
      console.log(error);
    }
  }

  unfollowUser = async (e) => {
    try {
      e.preventDefault()
      const token = localStorage.getItem('token')
      const { user } = this.props
      const id = this.state.follow[0].id

      const res = await fetch(`http://localhost:3000/users/${user.id}/follows/${id}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${token}`,
          "content-type": 'application/json'
        }
      })
      if (res.status === 204 ) {
        console.log("SUCCESS")
        this.setState({ followed: false, follow: [] })
      }

    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount = () => {
    this.fetchFollow()
    this.fetchUser()
    this.fetchReviews()
  }

  render() {
    const { reviews, user } = this.state
    console.log("PROPS IN USER", this.props)
    console.log("STATE IN USER", this.state);

    const followButton = <Button color="primary" onClick={this.followUser}>Follow</Button>
    const unfollowButton = <Button onClick={this.unfollowUser}>Following</Button>

    return (
      <div className="container">
        {this.state.errors.length > 0 && <div>
          <Alert color="danger">
            <ul>
              {this.state.errors.map(error => (
                <li>{error}</li>
              ))}
            </ul>
          </Alert>
        </div>}
        <div style={{ textAlign: "center" }}>
          <h1> {`${user.name}'s Reviews`} </h1>
          {this.state.followed ? unfollowButton : followButton}
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

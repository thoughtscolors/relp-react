import React, { Component } from 'react'
import {
  Button,
  Label,
  Input,
  FormGroup,
  Form
} from 'reactstrap'
import { Star } from './Icons'

export default class AddReview extends Component {

  state = {
      rating: 0,
      content: ''
  }

  addReview = async (e) => {
    try {
      e.preventDefault()
      const token = localStorage.getItem('token')
      const { restaurant_id, user } = this.props
      const review  = {...this.state, user_id: user.id, restaurant_id }
      console.log(JSON.stringify(review));

      const res = await fetch(`http://localhost:3000/restaurants/${restaurant_id}/reviews/`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          "content-type": 'application/json'
        },
        body: JSON.stringify(review)
      })
      if (res.status === 201 ) {
        this.setState({ rating: 0, content: '' })
        this.props.fetchReviews()
      }

    } catch (error) {
      console.log(error);
    }
  }

  render() {

    const { rating, content } = this.state

  return (
    <div className="box">
      <Form onSubmit={this.addReview}>
      <FormGroup>
          <Label for="review">Add Review</Label>
          <Input type="textarea" name="text" id="review" value={content} onChange={(e) => this.setState({ content: e.target.value })}/>
        </FormGroup>
        <div className="box">
          <FormGroup>
          <Label for="rating">Rating</Label>
          <select className="margins" type="select" name="select" id="rating" value={rating} onChange={(e) => this.setState({ rating: e.target.value })}>
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          <Star/>
          <Button className="float-right" color="primary" type="submit">Submit</Button>
          </FormGroup>
        </div>
      </Form>
    </div>
  )}
}

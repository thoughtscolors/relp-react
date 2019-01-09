import React, { Component } from 'react'
import {
    Button,
    Label,
    Input,
    FormGroup,
    Form
} from 'reactstrap'

export default class AddComment extends Component {
  state = {
    comment: "",
  }

  addComment = async (e) => {
    try {
        e.preventDefault()
        const token = localStorage.getItem('token')
        const { restaurant, user, review } = this.props
        const comment = { user_id: user.id, review_id: review.id, content: this.state.comment }
        // console.log(JSON.stringify(review));

        const res = await fetch(`http://localhost:3000/restaurants/${restaurant.id}/reviews/${review.id}/comments`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "content-type": 'application/json'
            },
            body: JSON.stringify(comment)
        })
        if (res.status === 201) {
            this.setState({ comment: '' })
            this.props.fetchComments()
        }
    } catch (error) {
        console.log(error);
    }
  }

  render() {
    return (
        <div className="box">
            <Form onSubmit={this.addComment}>
                <FormGroup>
                    <Label for="comment">Add Comment</Label>
                    <Input type="textarea" name="text" id="review" value={this.state.comment} onChange={(e) => this.setState({ comment: e.target.value })} />
                </FormGroup>
                <Button size="sm" color="primary" type="submit">Submit</Button>
            </Form>
        </div>
    )
  }
}
import React from 'react'
import {
  Media
} from 'reactstrap'
import Moment from 'react-moment';

const Comment = (props) => {
  const { comment } = props
  console.log("in comment cmpnt", comment);
  return (
    <Media style={{margin: 20, border: "1px solid lightgrey"}}>
      <Media left href="#">
        <Media object src="https://image.shutterstock.com/image-vector/avatar-flat-icons-260nw-1148229878.jpg"
        style={{width: 100, height: 100, marginRight: '2vw'}} alt={comment.user_id + " image"} />
      </Media>
      <Media body>
        <Media heading>
          {comment.user_id}
        </Media>
          {comment.content}
          <div>
            <Moment fromNow>{comment.created_at}</Moment>
          </div>
      </Media>
    </Media>
  )
}

export default Comment

import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class Search extends Component {

  state = {
    searchTerm: ''
  }
  
  render() {
    const { searchTerm } = this.state

    return (
      <Form inline onSubmit={(e) => this.props.search(e, searchTerm)}
        style={{margin: "40px"}}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="search" className="mr-sm-2">Search</Label>
          <Input type="search" name="search" id="search" placeholder="restaurant name" value={searchTerm}
            onChange={(e) => this.setState({searchTerm: e.target.value})}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

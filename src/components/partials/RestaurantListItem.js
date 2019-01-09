import React from 'react'
import { 
  Media,
  Button,
  Input,
  FormGroup,
  Form,
  Label,
  Alert
} from 'reactstrap'
import { Link } from 'react-router-dom'
import Modal from 'react-responsive-modal';

export default class RestaurantListItem extends React.Component {
  state = {
    open: false,
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '', // convert to number before creating
    disabled: false,
    errors: []
  }

  componentDidMount = () => {
    if (Object.keys(this.props.restaurant).length === 0) {
      return null
    }
  }

  onOpenModal = () => {
    this.setState({ open: true, ...this.props.restaurant });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  renderEditButton = () => {
    if (this.props.user.id === this.props.restaurant.user_id) {
      return (
        <div style={{ float: 'right' }}>
          {this.renderDisabled()}
          <Button onClick={this.onOpenModal} >Edit</Button>
        </div>
      )
    }
  }

  renderDisabled = () => {
    if (this.props.restaurant.disabled) {
      return <span style={{ paddingRight: '20px', color: 'red' }}>Disabled</span>
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, description, address, city, state, zip, phone, disabled } = this.state;
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3000/restaurants/${this.props.restaurant.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        mode: 'cors',
        body: JSON.stringify({
          user_id: this.props.user.id,
          name,
          description,
          address,
          city,
          state,
          zip,
          phone: Number(phone),
          disabled,
        })
      })

      res.json().then(() => this.props.history.push(`/restaurants/${this.props.restaurant.id}`));
    } catch (error) {
      console.log(error);
      this.setState({ errors: ['Something went wrong :('] })
    }
  }

  render() {
    const { restaurant } = this.props;
    const { open, name, description, address, city, state, zip, phone } = this.state;
    console.log('history',this.props.history)
    return (
      <Media className="box" key={restaurant.id}>
        <Modal open={open} onClose={this.onCloseModal} center>
          <div className="restaurant-edit-modal-container">
            {this.state.errors.length > 0 && <div>
              <Alert color="danger">
                <ul>
                  {this.state.errors.map(error => (
                    <li>{error}</li>
                  ))}
                </ul>
              </Alert>
            </div>}
            <h2 style={{ textAlign: "center" }}>Edit {`${name}`}</h2>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input
                  value={name}
                  type="name"
                  required
                  onChange={e => this.setState({ name: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="description">Description</Label>
                <Input
                  value={description}
                  type="description"
                  required
                  onChange={e => this.setState({ description: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="address">Address</Label>
                <Input
                  value={address}
                  type="address"
                  required
                  onChange={e => this.setState({ address: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="city">City</Label>
                <Input
                  value={city}
                  type="city"
                  required
                  onChange={e => this.setState({ city: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="state">State</Label>
                <Input
                  value={state}
                  type="state"
                  required
                  onChange={e => this.setState({ state: e.target.value })}
                  maxLength={2}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="zip">Zipcode</Label>
                <Input
                  value={zip}
                  type="zip"
                  required
                  onChange={e => this.setState({ zip: e.target.value })}
                  maxLength={10}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  value={phone}
                  type="number"
                  required
                  onChange={e => this.setState({ phone: e.target.value })}
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" checked={this.state.disabled} onClick={async () => {
                    await this.setState({ disabled: !this.state.disabled })
                    console.log("disabled", this.state.disabled);
                  }} />{' '}
                  Disable Restaurant
              </Label>
              </FormGroup>
              <Button color="primary" size="lg" block>
                Update Restaurant
              </Button>
            </Form>
          </div>
        </Modal>

        <Media left href="#">
          <Media object src="https://previews.123rf.com/images/dmitrymoi/dmitrymoi1702/dmitrymoi170200016/71707598-restaurant-or-cafe-exterior-building-vector-cartoon-illustration.jpg"
            style={{ width: 120, height: 120, marginRight: '2vw' }} alt={restaurant.name + " image"} />
        </Media>
        <Media body>
          <Media heading>
            <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link>
            {this.renderEditButton()}
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
}

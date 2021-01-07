import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails } from '../actions/orderActions'

const OrderScreen = ({ match }) => {
	const orderId = match.params.id

	const dispatch = useDispatch()

	const orderDetails = useSelector((state) => state.orderDetails)
	const { order, loading, error } = orderDetails

	if (!loading) {
		// Calculate prices
		// Add two decimals to price if needed
		const addDecimals = (num) => {
			return (Math.round(num * 100) / 100).toFixed(2)
		}
		// Items price
		order.itemsPrice = addDecimals(
			order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
		)
	}

	useEffect(() => {
		dispatch(getOrderDetails(orderId))
	}, [dispatch, orderId]) // Dependencies, on change they fire off useEffect

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<>
			<h1>Order {order._id}</h1>
			<Row>
				{/* Left Steps Summary */}
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>

							<p>
								<span className='pushToRight'>
									<strong>Name: </strong> {order.user.name}
								</span>
							</p>

							<p>
								<span className='pushToRight'>
									<strong>Email: </strong>
									<a href={`mailto:${order.user.email}`}>{order.user.email}</a>
								</span>
							</p>

							<p>
								<span className='pushToRight'>
									<strong>Address: </strong>
									{order.shippingAddress.address}, {order.shippingAddress.city}{' '}
									{order.shippingAddress.postalCode},{' '}
									{order.shippingAddress.country}
								</span>
							</p>
							{order.isDelivered ? (
								<Message variant='success'>
									Delivered on {order.deliveredAt}
								</Message>
							) : (
								<Message variant='danger'>Not Delivered</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<span className='pushToRight'>
									<strong>Method: </strong>
									{order.paymentMethod}
								</span>
							</p>
							{order.isPaid ? (
								<Message variant='success'>Paid on {order.paidAt}</Message>
							) : (
								<Message variant='danger'>Not Paid</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order Items</h2>
							{order.orderItems.length === 0 ? (
								<Message>Your order is empty</Message>
							) : (
								<ListGroup variant='flush'>
									{order.orderItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.qty} x R{item.price} = R{item.qty * item.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				{/* Right Order Summary */}
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item className='pushToRight'>
								<Row>
									<Col>Items</Col>
									<Col>R{order.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item className='pushToRight'>
								<Row>
									<Col>Shipping</Col>
									<Col>R{order.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item className='pushToRight'>
								<Row>
									<Col>Tax</Col>
									<Col>R{order.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item className='pushToRight'>
								<Row>
									<Col>
										<strong>Total</strong>
									</Col>
									<Col>
										<strong>R{order.totalPrice}</strong>
									</Col>
								</Row>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default OrderScreen
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            {/* saurabh  */}
            <a
              rel="noopener noreferrer"
              target="_blank"
              className="Saurabh_Shrestha "
            >
              <i className="fas fa-user-circle"></i> Saurabh Shrestha
            </a>
            Copyright &copy; React Rental House
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer

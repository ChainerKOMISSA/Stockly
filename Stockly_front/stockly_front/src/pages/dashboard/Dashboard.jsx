import React from 'react'
import '../styles/dashboard.css'
import { Card, Row } from 'react-bootstrap'

function Dashboard() {
  return (
    <div id="main" class="main">
      <div class="pagetitle">
        <h1>Tableau de bord</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Acceuil</a></li>
            <li class="breadcrumb-item active">Tableau de bord</li>
          </ol>
        </nav>
      </div>
      <section class="dashboard">
        <Row>
          <Card style={{ width: '18rem' }} id='card'>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }} id='card'>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }} id='card'>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        </Row>
      </section>

    </div>
  )
}

export default Dashboard
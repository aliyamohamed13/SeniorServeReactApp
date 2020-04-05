import React, { Component } from "react";
import { Container, Col, Row } from "reactstrap";

class Welcome extends Component {
  render() {
    return (
      <div>
        <br />
        <h1> Welcome to SeniorServe </h1>
        <Container>
          <h3 style={{ padding: "8px" }}>
            SeniorServe has several features to connect seniors needing help
            with volunteers that can help them.{" "}
          </h3>
          <Row>
            <Col className="description-card">
              <h5>SENIORS</h5>
              <h6>
                Seniors using SeniorServe can ask for assistance with anything
                they need. If you are a senior, you can post tasks you need help
                with and when volunteers request to help you can accept or
                decline their request. After they have helped you give them a
                review.
              </h6>
            </Col>
            <br />
            <Col className="description-card">
              <h5>VOLUNTEERS</h5>
              <h6>
                Volunteers using Senior Serve Tasks can easily view all
                available tasks in one place and filter by preference. Once you
                find a task you want to do, send a request and wait to be
                approved. See all your volunteer hours in your volunteer record
                and view how other volunteers compare in the leaderboard.
              </h6>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Welcome;

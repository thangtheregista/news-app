import React from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import spinner from "./Spinner-1s-200px.svg";
import { BsLightningChargeFill } from "react-icons/bs";

function Testing(props) {
  const {
    textbounce,
    loading,
    error,
    data,
    headlines,
    componentDidMount,
    searchbycategory,
  } = props;
  const categories = [
    {
      title: "Business",
    },
    {
      title: "Entertainment",
    },
    {
      title: "General",
    },
    {
      title: "Health",
    },
    {
      title: "Science",
    },
    {
      title: "Sports",
    },
    {
      title: "Technology",
    },
  ];
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container fluid className="news-container">
          <Navbar.Brand href="#home" onClick={componentDidMount}>
            <BsLightningChargeFill />
            FLASH NEWS
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav.Link
              href="#headlines"
              onClick={() => {
                headlines();
              }}
            >
              Top Headlines
            </Nav.Link>
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              {categories.map((categories, idx) => (
                <NavDropdown.Item
                  href={categories.title}
                  key={idx}
                  onClick={(e) => {
                    searchbycategory(e.target.value);
                    console.log(e);
                  }}
                >
                  {categories.title}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <input
              type="text"
              onChange={(event) => {
                textbounce(event.target.value);
              }}
              placeholder="For example: Tesla"
            />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {loading ? (
        <div className="center-screen">
          <img src={spinner} alt="Loading" className="spinner" />
        </div>
      ) : data === undefined && !error ? (
        <h1>For example: Tesla</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : data === [] ? (
        <h1>Can't find any articles.</h1>
      ) : (
        <Container fluid className="wrapper">
          <Row xs={1} md={2} lg={3} xl={4} /*xxl={5}*/ className="g-4">
            {data.articles.map((article, id) => (
              <Col>
                <Card
                  bg="light"
                  key={id}
                  style={{
                    width: "auto",
                    height: "350px",
                  }}
                  className="mb-2 card"
                >
                  <a href={article.url} target="_blank">
                    <Card.Img
                      variant="top"
                      src={article.urlToImage}
                      style={{ height: "200px" }}
                      className="card-image"
                    />
                  </a>
                  <Card.Body style={{ cursor: "default" }}>
                    <Card.Title>
                      <a href={article.url} target="_blank">
                        {article.title}
                      </a>
                    </Card.Title>
                    {/* <Card.Text className="card-text">
                      {article.description}
                    </Card.Text> */}
                  </Card.Body>
                  {/* <Card.Footer className="card-footer">
                    <a href={article.url} target="_blank">
                      Link to article
                    </a>
                  </Card.Footer> */}
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
}

export default Testing;

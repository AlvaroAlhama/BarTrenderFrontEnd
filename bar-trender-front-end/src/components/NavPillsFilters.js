import React from "react";

// reactstrap components
import {
    Button,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Container,
    Row,
    Col,
    UncontrolledTooltip,
} from "reactstrap";

// core components
// import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
// import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
// import DefaultFooter from "components/Footers/DefaultFooter.js";

import image_0 from '../assets/img/expositions/hU-kQ3Epxeq2dhaBpUgYfYaPhHEOKXnHXSeUqLjTygYBV05OHhUSZEWilh_Da9zkI1d_cgz91KIPevD_BBhBWhaKevognkx6Bv7-QwkQdRG9oznKG6wOae4avH8ksi6bkJBLWl4.png';
import image_left from '../assets/img/expositions/hU-kQ3Epxeq2dhaBpUgYfYaPhHEOKXnHXSeUqLjTygYBV05OHhUSZEWilh_Da9zkI1d_cgz91KIPevD_BBhBWhaKevognkx6Bv7-QwkQdRG9oznKG6wOae4avH8ksi6bkJBLWl4.png';
import image_left_2 from "../assets/img/expositions/Yn0xRl4G5E1eabgf9nyC9j6DVQVHd5DBNcPehVZwakLHYP-toRbW22a8kFesYK_taX0ZY_WviWVcT3bQ40tlKhaKSuAQAu6graIF.png";
import image_right from "../assets/img/expositions/TR9IDnSgMV79XktfRCxesUmLacTZJI9fb3Cv3-aMamIGyWdL_OagKWYcJJAPqgm62bjW9I6yHlMsOhowVROsAUiNui0CGo-qmPU-.png";


function NavPillsFilters() {
    const [pills, setPills] = React.useState("2");
    React.useEffect(() => {
        document.body.classList.add("profile-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("profile-page");
            document.body.classList.remove("sidebar-collapse");
        };
    }, []);
    return (
        <>
            <Container>
                <Row>
                    <Col className="ml-auto mr-auto" >

                        <div className="nav-align-center">
                            <Nav
                                className="nav-pills-info nav-pills-just-icons"
                                pills
                                role="tablist"
                            >
                                <NavItem>
                                    <NavLink
                                        className={pills === "1" ? "active" : ""}
                                        href="#pablo"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setPills("1");
                                        }}
                                    >
                                        <i className="now-ui-icons design_image"></i>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={pills === "2" ? "active" : ""}
                                        href="#pablo"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setPills("2");
                                        }}
                                    >
                                        <i className="now-ui-icons location_world"></i>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={pills === "3" ? "active" : ""}
                                        href="#pablo"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setPills("3");
                                        }}
                                    >
                                        <i className="now-ui-icons sport_user-run"></i>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                    </Col>
                    <TabContent className="gallery" activeTab={"pills" + pills}>
                        <TabPane tabId="pills1">
                            <Col className="ml-auto mr-auto" md="10">
                                <Row className="collections">
                                    <Col md="6">
                                        <img
                                            alt="..."
                                            className="img-raised"
                                            src={image_0}
                                        ></img>
                                        <img
                                            alt="..."
                                            className="img-raised"
                                            src={image_0}
                                        ></img>
                                    </Col>
                                    <Col md="6">
                                        <img
                                            alt="..."
                                            className="img-raised"
                                            src={image_0}
                                        ></img>
                                        <img
                                            alt="..."
                                            className="img-raised"
                                            src={image_0}
                                        ></img>
                                    </Col>
                                </Row>
                            </Col>
                        </TabPane>
                        <TabPane tabId="pills2">
                            <Col className="ml-auto mr-auto" md="10">
                                <Row className="collections">
                                    <Col md="6">
                                        <img
                                            alt="..."
                                            className="img-raised"
                                            src={image_left_2}
                                        ></img>
                                        <img
                                            alt="..."
                                            className="img-raised"
                                            src={image_0}
                                        ></img>
                                    </Col>
                                    <Col md="6">
                                        <img
                                            alt="..."
                                            className="img-raised"
                                            src={image_0}
                                        ></img>
                                        <img
                                            alt="..."
                                            className="img-raised"
                                            src={image_0}
                                        ></img>
                                    </Col>
                                </Row>
                            </Col>
                        </TabPane>
                        <TabPane tabId="pills3">
                            
                            <Col className="ml-auto mr-auto" md="10">
                            OCio
                                <Row className="collections">
                                    <Col md="6">
                                        <img
                                            alt="..."
                                            className="img-raised"
                                            src={image_right}
                                        ></img>
                                        <img
                                            alt="..."
                                            className="img-raised"
                                            src={image_0}
                                        ></img>
                                    </Col>
                                    <Col md="6">
                                        <img
                                            alt="..."
                                            className="img-raised"
                                            src={image_0}
                                        ></img>
                                        <img
                                            alt="..."
                                            className="img-raised"
                                            src={image_0}
                                        ></img>
                                    </Col>
                                </Row>
                            </Col>
                        </TabPane>
                    </TabContent>
                </Row>
            </Container>
        </>
    );
}

export default NavPillsFilters;

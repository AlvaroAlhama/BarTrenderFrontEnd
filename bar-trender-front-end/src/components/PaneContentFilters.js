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
import {  Form, FormGroup, Label, Input } from "reactstrap";


function PaneContentFilters() {
    const [pills, setPills] = React.useState("2");
    var tags = [
        {
            name: "Cruzcampo",
            type: "Bebida"
        },
        {
            name: "Paluaner",
            type: "Bebida"
        },
        {
            name: "Billar",
            type: "Instalacion"
        },
    ];
    function groupBy(xs, f) {
        return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
    }
    var tags_grouped = groupBy(tags, (t) => t.type);

    React.useEffect(() => {


    }, []);

    return (
        <>
            <Container>
                <Row>
                    <Col className="ml-auto mr-auto" >

                        <div className="nav-align-center">



                            {this.navLinks}



                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>

                        <Form className="searchbox" onSubmit={this.handleSubmit}>
                            {/* {this.panes} */}
                    Probando
                    {Object.entries(tags_grouped).map(([key, index]) => {
                                return (
                                    <>
                                        Probando 2
                                {/* {key}  */}
                                        <TabContent className="gallery" activeTab={"pills" + pills['pills']}>

                                            <TabPane tabId={"pills" + "Bebida"}>
                                                {/* <h3 className="text-center mt-2"> Bebida </h3> */}

                                                {tags_grouped[key].map((key) => {
                                                    return (
                                                        <>
                                                            {key.name}
                                                            {/* {this.state['pills']} */}
                                                        </>
                                                    );
                                                })}
                                            </TabPane>
                                        </TabContent>
                                    </>
                                );
                            })}
                        </Form>
                    </Col>

                </Row>

            </Container>




        </>
    );

}

export default PaneContentFilters;

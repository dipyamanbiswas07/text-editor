import "./navigation.css";
import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

class Navigation extends React.Component {
  render() {
    return (
      <div className="navigation-container">
        <Tabs
          id="tabs"
          activeKey={this.props.active}
          onSelect={(k) => this.props.navBarClick(k)}
        >
          <Tab eventKey="" title="+"></Tab>
          {this.props.data.map((x) => (
            <Tab eventKey={x} title={x} key={x}></Tab>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default Navigation;

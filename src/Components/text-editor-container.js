import React from "react";
import Container from "react-bootstrap/Container";
import Navigation from "./Navigation/navigation";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Modal from "react-bootstrap/Modal";
import TextEditor from "./Text/texteditor";
import "./text-editor-container.css";
class TextEditorContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      active: "",
      showModal: false,
      modalMessage: "",
    };
    this.textInput = React.createRef();
    this.navBarClick = this.navBarClick.bind(this);
    this.addClick = this.addClick.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.currentData = this.currentData.bind(this);
    this.addData = this.addData.bind(this);
    this.addTopic = this.addTopic.bind(this);
  }

  navBarData() {
    return this.state.data.map((x) => x.topic);
  }

  navBarClick(value) {
    this.setState({
      active: value,
    });
  }

  showModal(msg) {
    this.setState({ showModal: true, modalMessage: msg });
  }

  hideModal() {
    this.setState({ showModal: false, modalMessage: "" });
  }

  currentData() {
    return this.state.data.find((x) => x.topic === this.state.active);
  }

  addClick() {
    if (this.textInput.current.value !== "") {
      const value = this.textInput.current.value;
      this.textInput.current.value = "";
      let exists = this.state.data.find((x) => x.topic === value);
      if (!exists) {
        let dataInsert = [...this.state.data, { topic: value, ideas: [] }];
        this.setState({ data: dataInsert });
        this.setState({ active: value });
      } else {
        this.showModal("A topic with the same name already exists");
      }
    } else {
      this.showModal("Please Enter a non empty value");
    }
  }

  addData(topic) {
    let stateData = this.state.data;
    stateData.find((x) => x.topic === topic.topic).ideas = topic.ideas;
    this.setState({ data: stateData });
  }

  addTopic(value) {
    let exists = this.state.data.find((x) => x.topic === value);
    if (!exists) {
      let dataInsert = [...this.state.data, { topic: value, ideas: [] }];
      this.setState({ data: dataInsert });
      this.setState({ active: value });
    } else {
      this.showModal("A topic with the same name already exists");
    }
  }

  render() {
    const isEntry = this.state.active === "";
    return (
      <Container fluid>
        <Navigation
          data={this.navBarData()}
          active={this.state.active}
          navBarClick={this.navBarClick}
        ></Navigation>
        {!isEntry && (
          <TextEditor
            data={this.currentData()}
            addData={this.addData}
            addTopic={this.addTopic}
          ></TextEditor>
        )}
        {isEntry && (
          <InputGroup className="mt-5">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-default">
                Enter Topic
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              ref={this.textInput}
            />
            <Button onClick={() => this.addClick()}>Add </Button>
          </InputGroup>
        )}
        <Modal
          show={this.state.showModal}
          onHide={this.hideModal}
          animation={false}
        >
          <Modal.Header>Message</Modal.Header>
          <Modal.Body>{this.state.modalMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

export default TextEditorContainer;

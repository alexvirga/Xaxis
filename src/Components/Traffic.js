import React, { Component } from "react";
import "../App.css";
import firebase from "firebase/app";
import "firebase/firestore";

class Traffic extends Component {
  state = {
      client: "Indeed",
      data: [],
      ISCI: "",
      Start: "",
      End: ""
    }


    getTraffic = () => {
      firebase
        .firestore()
        .collection(this.state.client)
        .onSnapshot(
          querySnapshot => {
            this.setState({ data: [] })
            querySnapshot.forEach(doc => {
              let docInfo = doc.data()
              docInfo.id = doc.id
              this.setState({
                data: [...this.state.data, docInfo]
              });
            });
          }
        )
    };

  componentDidMount() {
    this.getTraffic();
  }

  deleteEntry = (e) => {
    firebase
        .firestore()
        .collection(this.state.client).doc(e).delete()
  }

  dataIndex = () => {
    return this.state.data.map(traffic => {
      return (
        <div key={traffic.id}>
          <strong>ISCI: </strong>
          {traffic.ISCI} 
          <strong> Start Date: </strong> {traffic.Start}
          <strong> End Date: </strong> {traffic.End}
          <button type="button" onClick={() => this.deleteEntry(traffic.id)}> Delete </button>
        </div>
      );
    });
  };
  
  
  handleSubmit = event => {
    event.preventDefault();

    // Add a new document with a generated id.
    firebase
      .firestore()
      .collection(this.state.client)
      .add({
        ISCI: this.state.ISCI,
        Start: this.state.Start,
        End: this.state.End
      })
      .then(this.setState({ data: [] })) // Clears the current data
      .then(() => this.getTraffic())
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  dataForm = () => {
    return (
      <form>
        <input
          type="text"
          name="ISCI"
          placeholder="New Task"
          onChange={this.handleChange}
        />
        <input
          type="date"
          name="Start"
          placeholder="Task Start"
          onChange={this.handleChange}
        />
                <input
          type="date"
          name="End"
          placeholder="Task End"
          onChange={this.handleChange}
        />
        <button type="submit" onClick={this.handleSubmit}>
          {" "}
          Submit{" "}
        </button>
      </form>
    );
  };

  render() {
    return (
      <div className="App">
        <h1> Traffic Dashboard </h1>
        {this.dataForm()}
        <div>
          <br />
          {this.dataIndex()}
        </div>
      </div>
    );
  }
}

export default Traffic;

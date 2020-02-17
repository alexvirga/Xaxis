import React, { Component } from "react";
import "../App.css";
import firebase from "firebase/app";
import "firebase/firestore";

class ToDo extends Component {
  state = {
      data: [],
      title: "",
      description: ""
    }


    getTasks = () => {
      firebase
        .firestore()
        .collection("tasks")
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
    this.getTasks();
  }

  deleteTask = (e) => {
    firebase
        .firestore()
        .collection("tasks").doc(e).delete()
  }

  dataIndex = () => {
    return this.state.data.map(task => {
      return (
        <div key={task.id}>
          <strong>Title: </strong>
          {task.title} <strong>Description: </strong> {task.description}
          <button type="button" onClick={() => this.deleteTask(task.id)}> Delete </button>
        </div>
      );
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    // Add a new document with a generated id.
    firebase
      .firestore()
      .collection("tasks")
      .add({
        title: this.state.title,
        description: this.state.description
      })
      .then(this.setState({ data: [] })) // Clears the current data
      .then(() => this.getTasks())
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
          name="title"
          placeholder="New Task"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Task Description"
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
        <h1> FireList </h1>
        {this.dataForm()}
        <div>
          <br />
          {this.dataIndex()}
        </div>
      </div>
    );
  }
}

export default ToDo;

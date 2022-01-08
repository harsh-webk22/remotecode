import React, { Component } from "react";
import "./index.css";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      result: "",
      code: "",
      input: "",
    };
  }

  handleTab = async (e) => {
    if (e.keyCode === 9) {
      e.preventDefault();
      await this.setState({ code: this.state.code + "    " });
    }
  };

  handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:4000", {
      method: "POST",
      body: JSON.stringify({
        code: this.state.code,
        input: this.state.input,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({ result: json.result });
      });
  }

  render() {
    return (
      <div>
        <form
          action="http://localhost:4000/"
          method="POST"
          onSubmit={async (e) => {
            await this.setState({ code: e.target.code.value });
            this.handleSubmit(e);
          }}
        >
          <textarea
            value={this.state.code}
            id="textarea"
            name="code"
            onKeyDown={this.handleTab}
            onChange={async (e) => {
              await this.setState({ code: e.target.value });
            }}
          ></textarea>
          <input
            value={this.state.input}
            name="input"
            onChange={async (e) => {
              await this.setState({ input: e.target.value });
            }}
          ></input>
          <button type="submit">Submit</button>
        </form>

        <div class="result">
          <p>{this.state.result}</p>
        </div>
      </div>
    );
  }
}

export default Main;

import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    birthday: "",
    data: ""
  };
  handelCreateDay = e => {
    const { birthday } = e.target;
    this.setState({
      birthday: birthday
    });
  };
  handelLottoBtn = () => {
    axios.get("http://askat.me:8000/api/lotto/").then(response => {
      this.setState({
        data: response.data.join(" ")
      });
    });
  };

  handelFortuneBtn = birthday => {
    axios
      .get("http://askat.me:8000/api/fortune/" + birthday)
      .then(response => {
        this.setState({
          data: response.data
        });
      })
      .catch(error => {
        console.log(error);
        alert("생년월일을 입력해주세요.");
      });
  };
  handelBadBtn = () => {
    axios
      .get("http://askat.me:8000/api/bad/")
      .then(response => {
        this.setState({
          data: response.data
        });
      })
      .catch(error => {
        console.log(error);
        alert("oops!");
      });
  };

  render() {
    return (
      <div>
        <button onClick={this.handelLottoBtn}>Lotto</button>
        <input type="date" name="birthday" onChange={this.handelCreateDay} />
        <button onClick={() => this.handelFortuneBtn(this.state.birthday)}>
          Fortune
        </button>
        <button onClick={this.handelBadBtn}>Bad</button>
        <p>{this.state.data}</p>
      </div>
    );
  }
}

export default App;

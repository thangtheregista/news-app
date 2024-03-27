import React, { Component } from "react";
import Axios from "axios";
import { debounce } from "debounce";
import Testing from "./components/Testing";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.css";

export class App extends Component {
  state = {
    data: undefined,
    loading: false,
    error: undefined,
  };
  setLoadingToTrue = () => {
    this.setState({ loading: true });
  };
  setLoadingToFalse = () => {
    this.setState({ loading: false });
  };
  componentDidMount = () => {
    this.setLoadingToTrue();
    const date = new Date().toISOString().slice(0, 10);
    const url = `https://newsapi.org/v2/everything?q=apple&from=${date}&apiKey=d1216dc511d44ea98102fc461ae18ae0`;
    Axios.get(url)
      .then((response) => {
        const data = response.data;
        if (data.articles.length !== 0) {
          this.setState({
            data: data,
            loading: false,
          });
        } else {
          this.setLoadingToFalse();
          console.log("No data available");
        }
      })
      .catch((errors) => {
        const error = errors.toString();
        console.log(error);
        this.setState({
          loading: false,
          error: error,
        });
      });
  };
  topheadlines = () => {
    this.setLoadingToTrue();
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=d1216dc511d44ea98102fc461ae18ae0`;
    Axios.get(url)
      .then((response) => {
        const data = response.data;
        if (data.articles.length !== 0) {
          this.setState({
            data: data,
            loading: false,
          });
          // console.log(this.state.data);
        } else {
          this.setLoadingToFalse();
          console.log("No data available");
        }
      })
      .catch((errors) => {
        const error = errors.toString();
        console.log(error);
        this.setState({
          loading: false,
          error: error,
        });
      });
  };
  searchbycategory = (category) => {
    this.setLoadingToTrue();
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=d1216dc511d44ea98102fc461ae18ae0`;
    Axios.get(url)
      .then((response) => {
        const data = response.data;
        if (data.articles.length !== 0) {
          this.setState({
            data: data,
            loading: false,
          });
          // console.log(this.state.data);
        } else {
          this.setLoadingToFalse();
          console.log("No data available");
        }
      })
      .catch((errors) => {
        const error = errors.toString();
        console.log(error);
        this.setState({
          loading: false,
          error: error,
        });
      });
  };
  textbounce = debounce((text) => {
    this.setLoadingToTrue();
    if (text.length > 2) {
      const url = `https://newsapi.org/v2/everything?q=${text}&apiKey=d1216dc511d44ea98102fc461ae18ae0`;
      Axios.get(url)
        .then((response) => {
          const data = response.data;
          console.log(data);
          if (data.articles.length !== 0) {
            this.setState({
              data: data,
              loading: false,
            });
            // console.log(this.state.data);
          } else {
            this.setLoadingToFalse();
            console.log("No data available");
          }
        })
        .catch((errors) => {
          const error = errors.toString();
          console.log(error);
          this.setState({
            loading: false,
            error: error,
          });
        });
    } else {
      this.setLoadingToFalse();
    }

    // console.log(text);
  }, 1000);
  render() {
    return (
      <div>
        <Testing
          textbounce={this.textbounce}
          loading={this.state.loading}
          error={this.state.error}
          data={this.state.data}
          headlines={this.topheadlines}
          componentDidMount={this.componentDidMount}
          searchbycategory={this.searchbycategory}
        />
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";

class SearchPlaces extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = this.currentState;
    this.search_places = this.search_places.bind(this);
  }

  async search_places(event) {

    event.preventDefault();

    console.log(this.textInput.value)

    console.log(this.props.center);
    try {
      const url_prefix =
        "https://places.api.here.com/places/v1/discover/search";
      const url =
        url_prefix +
        "?app_id=" +
        process.env.REACT_APP_HERE_APP_ID +
        "&app_code=" +
        process.env.REACT_APP_HERE_APP_CODE +
        "&at=" +
        this.props.center.latitude +
        "," +
        this.props.center.longitude +
        "&q=" +
        this.textInput.value
      let response = await fetch(url)
      let responseJson = await response.json()
      this.props.action(responseJson.results.items[0])
      console.log(responseJson.results.items[0])

      return responseJson
    } catch (error) {}
  }

  render() {
    return (
      <div ref="search-places-container">
        <div id="map-detail2">
        <form onSubmit={this.search_places}>
          <input type="text" ref={(input) => this.textInput = input} defaultValue="Roncade" />
          <button >Search</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SearchPlaces;

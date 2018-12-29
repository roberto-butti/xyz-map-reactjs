import React, { Component } from "react";

class SearchPlaces extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.currentState = {}
    this.state = this.currentState
    this.search_places = this.search_places.bind(this);
    this.state.isloadingplaces=false
  }

  componentDidMount(){
    this.textInput.focus()
 }

  async search_places(event) {

    event.preventDefault();

    console.log(this.textInput.value)

    console.log(this.props.center);
    try {
      //this.isloadingplaces=true
      this.setState({ 'isloadingplaces': true })
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
      //this.isloadingplaces=false
      this.setState({ 'isloadingplaces': false })
      return responseJson
    } catch (error) {
      //this.isloadingplaces=false
      this.setState({ 'isloadingplaces': false })
    }
  }

  render() {
    return (
      <div className="subtitle seach_box" ref="search-places-container">
        <div id="map-detail2">
        <form onSubmit={this.search_places}>
          <div className="field has-addons">
            <div className={this.state.isloadingplaces ? "is-loading control" : "control"}>
              <input className="input " type="text" ref={(input) => this.textInput = input} defaultValue="Roncade" placeholder="Large loading input" />
            </div>
            <div className="control">
              <button className="button">
                <span class="icon">
                  <i class="fas fa-search"></i>
                </span>
              </button>
            </div>

          </div>

          </form>
        </div>
      </div>
    );
  }
}

export default SearchPlaces;

import React, { Component } from 'react'
import SearchPlaces from './SearchPlaces.jsx'

class Map extends Component {

  constructor(props) {
    super(props)

    this.currentState = {
      center:{
        longitude: -117.15406,
        latitude: 32.72966
      },
      zoom: 12,
      title: 'Initial Position',
      display: {}
    }
    // Don't call this.setState() here!
    this.state = this.currentState

    this.updateLocation = this.updateLocation.bind(this)

  }




  createMap () {
    //var YOUR_ACCESS_TOKEN="xxx"
    const here = window.here
    var layers = [
      new here.xyz.maps.layers.TileLayer({
        name: 'Image Layer',
        min: 2,
        max: 20,
        provider: new here.xyz.maps.providers.ImageProvider({
          name: this.state.name,
          //url : 'https://{SUBDOMAIN_INT_1_4}.mapcreator.tilehub.api.here.com/tilehub/wv_livemap_bc/png/sat/256/{QUADKEY}?access_token='+YOUR_ACCESS_TOKEN
          //url: '//stamen-tiles-{SUBDOMAIN_INT_1_4}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg'
          //url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg'
          //url: '//{SUBDOMAIN_CHAR}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          //url: '//{SUBDOMAIN_CHAR}.tilessputnik.ru/tiles/kmt2/{z}/{x}/{y}.png'
          url: '//worldtiles{SUBDOMAIN_INT_1_4}.waze.com/tiles/{z}/{x}/{y}.png'
          //url: 'https://{SUBDOMAIN_INT_1_4}.base.maps.api.here.com/maptile/2.1/maptile/newest/normal.day/{Z}/{X}/{Y}/256/png8?access_token='+YOUR_ACCESS_TOKEN
        })
      })
    ]
    this.display = new  here.xyz.maps.Map( document.getElementById("map"), {
      zoomLevel : this.state.zoom,
      center: this.state.center,
      layers: layers
    })

    //mapviewchange
    this.display.addEventListener('mapviewchangeend', (event) => {
      console.log(event);
      // here you can set the state
      this.setState(this.currentState)
    })

    this.display.addObserver('zoomlevel',(name, newValue, oldValue) => {
      console.log(name + " new: "+ newValue + " old:" + oldValue, newValue)
      this.currentState.title= (newValue > oldValue ? "Zoom in": "Zoom out")
      this.currentState.zoom = newValue
    })

    this.display.addObserver('center',(name, newValue, oldValue) => {
      console.log(name + " new: "+ newValue + " old:" + oldValue, newValue)
      this.currentState.title= "Moved on map"
      this.currentState.center = newValue
    })



  }


  componentDidMount () {
    this.createMap()
  }

  updateLocation ( center ) {
    console.log("UPDATE LOCATION", center)
    this.display.setCenter(center.position[1],center.position[0])
    this.display.setZoomlevel(16)
    this.currentState.title=center.title
    this.currentState.zoom = 16
    this.setState({title : center.title, zoom: 3})
    console.log("CENTERD AT", center.position)
  }

  render() {

    return (
      <div ref="map-container">
        <div className="map-container" id="map"></div>
        <div id="map-detail">
        { this.state.title } : { this.state.center.latitude },{ this.state.center.longitude }x{ this.state.zoom }
        </div>
        <SearchPlaces center={ this.currentState.center } action={this.updateLocation} />
      </div>
    )
  }

}

export default Map;

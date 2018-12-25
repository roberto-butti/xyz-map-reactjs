import React, { Component } from 'react'

class Map extends Component {

  constructor(props) {
    super(props)
    
    this.currentState = {
      center:{
        longitude: -117.15406,
        latitude: 32.72966 
      },
      zoom: 12,
      title: 'Initial Position'
    }
    // Don't call this.setState() here!
    this.state = this.currentState
  }


  handleChange = event => {
    const {
      name,
      value
    } = event.target;

    this.setState({
      [name]: value
    });
  }

  createMap () {
    var YOUR_ACCESS_TOKEN="xxx"
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
    var display = new  here.xyz.maps.Map( document.getElementById("map"), {
      zoomLevel : this.state.zoom,
      center: this.state.center,
      layers: layers
    })

    //mapviewchange
    display.addEventListener('mapviewchangeend', (event) => {
      console.log(event);
      // here you can set the state
      this.setState(this.currentState)
    })

    display.addObserver('zoomlevel',(name, newValue, oldValue) => {
      console.log(name + " new: "+ newValue + " old:" + oldValue, newValue)
      this.currentState.zoom = newValue
    })

    display.addObserver('center',(name, newValue, oldValue) => {
      console.log(name + " new: "+ newValue + " old:" + oldValue, newValue)
      this.currentState.center = newValue
    })
    
  }


  componentDidMount () {
    this.createMap()
  }

  render() {

    return (
      <div ref="map-container">
        <div className="map-container" id="map"></div>
        <div id="map-detail">
        { this.state.center.latitude },{ this.state.center.longitude }x{ this.state.zoom }
        </div>
      </div>
    )
  }

}

export default Map;
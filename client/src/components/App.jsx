import { gapi } from 'gapi-script';
import React, {Component} from 'react';
import styled from 'styled-components';
import Map from './Map.jsx';
import Calendar from './Calendar.jsx';
import UserProfile from './UserProfile.jsx';
import { withScriptjs, withGoogleMap } from 'react-google-maps';
import { apiKey } from '../../../key.js';
const AppStyles = styled.div`
`;
class App extends Component {
  constructor() {
    super();
    this.state = {
      isSignedIn: null
    };
    this.initializeGoogleSignin = this.initializeGoogleSignin.bind(this);
  }
  initializeGoogleSignin() {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '636707500167-jl0be6d4pi4e96ttgqkvt1v0758a3r9p.apps.googleusercontent.com'
      });
      console.log('api init successful');
      gapi.load('signin2', () => {
        const params = {
          onSuccess: () => {
            console.log('User has finished signing in!');
          }
        };
        gapi.signin2.render('loginButton', params);
      });
    });
  }
  componentDidMount() {
    console.log('Loading');
    this.initializeGoogleSignin();
  }
  render() {
    const WrappedMap = withScriptjs(withGoogleMap(Map));
    return (
      <AppStyles>
        <div>
          <header>
            <h1>Bike Around and Find Out</h1>
            <h3>New Orleans Interactive Community Bike Map</h3>
          </header>
          <div id="loginButton">Sign in with Google</div>
          <div style={{width: '100vw', height: '100vh'}}>
            <WrappedMap
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${apiKey}`}
              loadingElement={<div style={{ height: '50%' }} />}
              containerElement={<div style={{ height: '100%' }} />}
              mapElement={<div style={{ height: '100%' }} />}
            />
          </div>
          <Calendar />
          <UserProfile />
        </div>
      </AppStyles>
    );
  }
}
export default App;

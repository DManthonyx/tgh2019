import React, { Component } from 'react';
import VRViz from "vr-viz";
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import DataOne from './DataOne'
import DataTwo from './DataTwo'
import DataOneMap from './DataOneMap'
import DataTwoMap from './DataTwoMap'
import {
  Container,
  Section1,
  Section2,
  Section3,
  BtnDiv,
  Button,
  Title,
  NewBlock,
  Img
} from './style.js'

PouchDB.plugin(PouchDBFind)

class App extends Component {

  state ={
    remoteDB: new PouchDB('https://2aeca32c-420b-42c5-96ef-8032e3b74711-bluemix:c4401364a26441bb9839a382f32c5965b6dd1969afd80b1cf0a4d2a704eb94dd@2aeca32c-420b-42c5-96ef-8032e3b74711-bluemix.cloudant.com/tgh2019'),
    localDB: new PouchDB('tgh2019b'),
    blocks: [],
    toggle: true,
    newBlock: false
  }

  componentDidMount = () => {
    if (this.state.remoteDB) {
      this.syncToRemote();
      // this.getBlocks();
      this.filter()
    }
  }

  getPouchDocs = (change) => {
    console.log(this.state.localDB, change.change.docs,  'this is get pouch')
    // this.setState({
    //   blocks: [this.filter()]
    // })
  }

  syncToRemote = () => {
    this.state.localDB.sync(this.state.remoteDB, {live: true, retry: true})
    .on('change', change => {
      console.log('---------------')
      this.getPouchDocs(change);
      this.setState({
        newBlock: true
      })
    })
    .on('error', err => console.log('uh oh! an error occured while synching.'));
    console.log(this.state.localDB, 'this is localDB sync ')
    console.log(this.state.remoteDB, 'this is remoteDB sync ')
  }
  
  filter = () => {
    this.state.localDB.allDocs({
      include_docs: true,
      attachments: true
     }).then((result) => this.setState({ blocks: [result.rows]}) 
     ).then((result) =>  result.rows) 
      .catch(function (err) {
      console.log(err);
     });
  }

  switchDataTen = () => {
    this.setState({
      toggle: true
    })
  }

  switchDataTwenty = () => {
    this.setState({
      toggle: false
    })
  }

  render() {
    console.log(this.state.blocks, 'this is blocks render')
    console.log(this.state.localDB,   'this is get pouch')
    return (
    <Container>
      {
        this.state.newBlock
        ?
        <NewBlock>New Block Added</NewBlock>
        :
        null
      }
      <Section1>
        <Img src="https://i.imgur.com/YbT52yZ.png"/>
        <BtnDiv>
          <Button onClick={() => this.switchDataTen()}>Today</Button>
          <Button onClick={() => this.switchDataTwenty()}>This Week</Button>
        </BtnDiv>
    </Section1>
    <Section2>
      {this.state.toggle ? <DataOne /> : <DataTwo />}
    </Section2>
    <Section3>
    {this.state.toggle ? <DataOneMap blocks={this.state.blocks} /> : <DataTwoMap blocks={this.state.blocks} />}
    </Section3>
     </Container>
    );
  }
}

export default App;

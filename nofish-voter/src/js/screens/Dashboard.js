import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import Button from 'grommet/components/Button';

import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Notification from 'grommet/components/Notification';
import Paragraph from 'grommet/components/Paragraph';
import Value from 'grommet/components/Value';
import Meter from 'grommet/components/Meter';
import Spinning from 'grommet/components/icons/Spinning';
import { getMessage } from 'grommet/utils/Intl';
import Section from 'grommet/components/Section';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';

import NavControl from '../components/NavControl';
import sdk from '../api/sdk'

import {
  loadDashboard, unloadDashboard
} from '../actions/dashboard';

import { pageLoaded } from './utils';

class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      hasVote: null
    }
    this.vote = this._vote.bind(this)
  }
  componentDidMount() {
    pageLoaded('Dashboard');
    sdk.getRanksInfo().then(function(res){
      this.setState({
        rank: res.filter(function(a){return a.name === '全球区块链黑客马拉松'})[0]
      })
      this.props.dispatch(unloadDashboard());
    }.bind(this))
    this.props.dispatch(loadDashboard());
  }

  _vote(id) {
    sdk.vote('全球区块链黑客马拉松', localStorage.getItem('user'), id).then(function(res){
      this.setState({
        hasVote: id
      })
      alert('投票成功')
    }.bind(this))
  }

  render() {
    const { error, tasks } = this.props;
    const { intl } = this.context;
    if(!this.state.rank || !this.state.rank.items){
      return null
    }
    console.log('this.state.rank.items', this.state.rank.items);
    return (
      <Article primary={true}>
        <Header
          direction='row'
          justify='between'
          size='large'
          pad={{ horizontal: 'medium', between: 'small' }}
        >
          <NavControl name="黑客马拉松排行榜"/>
        </Header>
        <Section>

<Tiles fill={true}>
  {this.state.rank.items.map(function(item){
    return (
    <Tile
        align='start'>
          <Header size='small'
            pad={{"horizontal": "large"}}>
            <Heading tag='h4'
              strong={true}
              margin='none'>
              {item.item_name}
            </Heading>
          </Header>
          <Box pad={{"horizontal": "large"}}>
            <Paragraph margin='none'>
            {item.desc}
            </Paragraph>
          </Box>
           <Box pad='large'>
            <Button
            disabled={this.state.hasVote}
            onClick={function(){
              this.vote(item.item_name)
            }.bind(this)}
            label='点击投票' />
          </Box>
  </Tile>
    )
  }.bind(this))}  
</Tiles>
        </Section>
      </Article>
    );
  }
}

Dashboard.defaultProps = {
  error: undefined,
  tasks: []
};

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
  tasks: PropTypes.arrayOf(PropTypes.object)
};

Dashboard.contextTypes = {
  intl: PropTypes.object
};

const select = state => ({ ...state.dashboard });

export default connect(select)(Dashboard);

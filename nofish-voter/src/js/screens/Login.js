import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Split from 'grommet/components/Split';
import Sidebar from 'grommet/components/Sidebar';
import LoginForm from 'grommet/components/LoginForm';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';

import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import Footer from 'grommet/components/Footer';
import Logo from 'grommet/components/icons/Grommet';

import { login } from '../actions/session';
import { navEnable } from '../actions/nav';
import { pageLoaded } from './utils';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: ''
    }
    this._onSubmit = this._onSubmit.bind(this);
    this._onUsernameChange = this._onUsernameChange.bind(this);
    
  }
 
  _onUsernameChange (event) {
    const username = event.target.value;
    this.setState({ username });
  }


  _onSubmit(fields) {
    fields.nativeEvent.preventDefault();
    const { dispatch } = this.props;
    const { router } = this.context;
    localStorage.setItem('user', this.state.username)
    router.history.push('/dashboard')
  }

  render() {
    const { session: { error } } = this.props;

    return (
      <Split flex='left' separator={true}>

        <Article>
          <Section
            full={true}
            colorIndex='brand'
            texture='url(img/splash.png)'
            pad='large'
            justify='center'
            align='center'
          >
            <Heading tag='h1' strong={true}>Nofish Voter</Heading>
            <Paragraph align='center' size='large'>
              Development with Grommet is cool.
            </Paragraph>
          </Section>
        </Article>

        <Sidebar justify='start' align='center' pad='none' size='large'>
          <span />
          <Form
            pad="large"
          >
            <FormField size="large" label="投票人姓名">
              <TextInput placeHolder="请输入投票人姓名" onDOMChange={this._onUsernameChange} />
            </FormField>
          </Form>
          <Button label='开始投票'
            type="submit"
            onClick={this._onSubmit}
            critical={false}
          />
        </Sidebar>

      </Split>
    );
  }
}

Login.defaultProps = {
  session: {
    error: undefined
  }
};

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  session: PropTypes.shape({
    error: PropTypes.string
  })
};

Login.contextTypes = {
  router: PropTypes.object.isRequired,
};

const select = state => ({
  session: state.session
});

export default connect(select)(Login);

import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

import Note from './Note';

const COOKIE_KEY = 'NOTES';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      notes: [],
    };
  }

  componentDidMount() {
    const notes = read_cookie(COOKIE_KEY);

    this.setState({ notes });
  }

  submit(e) {
    e.preventDefault();
    const { notes, text } = this.state;

    this.setState(
      {
        notes: [...notes, { text }],
        text: '',
      },
      () => bake_cookie(COOKIE_KEY, this.state.notes),
    );
  }

  clear() {
    delete_cookie(COOKIE_KEY);
    this.setState({ notes: [] });
  }

  render() {
    return (
      <div>
        <h2>Note to Self</h2>
        <Form inline onSubmit={(e) => this.submit(e)}>
          <FormControl
            onChange={event => this.setState({ text: event.target.value })}
            value={this.state.text}
          />
          <Button
            onClick={(e) => this.submit(e)}
          >Submit</Button>
        </Form>
        {
          this.state.notes.map((note, index) =>(
            <Note key={index} note={note} />
          ))
        }
        <hr />
        <Button
          onClick={() => this.clear()}
        >Clear Notes</Button>
      </div>
    );
  }
}

export default App;
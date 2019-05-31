import React from 'react';
import { mount } from 'enzyme';

import App from './App'

describe('App', () => {
  let app = mount(<App />);

  it('should render App title', () => {
    expect(app.find('h2').text()).toEqual('Note to Self');
  });

  it('should render the Clear button', () => {
    expect(app.find('.btn').at(1).text()).toEqual('Clear Notes');
  });
  
  describe('when rendering the Form', () => {
    it('should create a Form component', () => {
      expect(app.find('Form').exists()).toBe(true);
    });
    
    it('should render FormControl component', () => {
      expect(app.find('FormControl').exists()).toBe(true);
    });

    it('should render the Submit button', () => {
      expect(app.find('.btn').at(0).text()).toEqual('Submit')
    });
    
    
  });

  describe('when creating a note', () => {
    let testNote = 'test note';
    beforeEach(() => {
      app.find('FormControl').simulate('change', { target: { value: testNote } });
    });

    it('should update the text in state', () => {
      expect(app.state().text).toEqual(testNote);
    });

    describe('and submitting a form', () => {
      beforeEach(() => {
        app.find('form').simulate('submit');
      });

      afterEach(() => {
        app.find('.btn').at(1).simulate('click');
      });

      it('should add new note to state', () => {
        expect(app.state().notes[0].text).toEqual(testNote);
      });
    })
    

    describe('and clicking a Submit button', () => {
      beforeEach(() => {
        app.find('.btn').at(0).simulate('click');
      });

      afterEach(() => {
        app.find('.btn').at(1).simulate('click');
      });

      it('should add new note to state', () => {
        expect(app.state().notes[0].text).toEqual(testNote);
      });

      describe('and remounting the component', () => {
        let app2;

        beforeEach(() => {
          app2 = mount(<App />);
        });

        it('should read the stored note cookies', () => {
          expect(app2.state().notes).toEqual([{ text: testNote }]);
        });
        
      });
      

      describe('and clicking a Clear button', () => {
        beforeEach(() => {
          app.find('.btn').at(1).simulate('click');
        });

        it('should clear the notes in the state', () => {
          expect(app.state().notes).toEqual([]);
        });
        
      });
      
      
    });
  });
  
  
});

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
  
});

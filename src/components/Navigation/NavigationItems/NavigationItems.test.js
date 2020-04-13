import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems/>);
        wrapper.setProps({
            isAuthenticated: true
        });
    });

    it('should render two <NavigationItem /> elements if not authenticated', () => {
        wrapper.setProps({
            isAuthenticated: false
        });
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItem /> elements if authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it(`should render <NavigationItem link={'/logout'}>Log Out</NavigationItem> element only if authenticated`, () => {
        expect(wrapper.contains(<NavigationItem link={'/logout'}>Log Out</NavigationItem>)).toEqual(true);
    });

    it(`should not render <NavigationItem link={'/logout'}>Log Out</NavigationItem> if not authenticated`, () => {
        wrapper.setProps({
            isAuthenticated: false
        });
        expect(wrapper.contains(<NavigationItem link={'/logout'}>Log Out</NavigationItem>)).toEqual(false);
    });
});
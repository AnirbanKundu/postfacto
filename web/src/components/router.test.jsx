/*
 * Postfacto, a free, open-source and self-hosted retro tool aimed at helping
 * remote teams.
 *
 * Copyright (C) 2016 - Present Pivotal Software, Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 *
 * it under the terms of the GNU Affero General Public License as
 *
 * published by the Free Software Foundation, either version 3 of the
 *
 * License, or (at your option) any later version.
 *
 *
 *
 * This program is distributed in the hope that it will be useful,
 *
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 *
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *
 * GNU Affero General Public License for more details.
 *
 *
 *
 * You should have received a copy of the GNU Affero General Public License
 *
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react';
import {shallow} from 'enzyme';
import {SpyDispatcher} from '../spec_helper';

import Alert from './shared/alert';
import Router from './router';
import EmptyPage from './shared/empty_page';
import HomePage from './home/home_page';
import ApiServerNotFoundPage from './server-lost/api_server_not_found_page';

describe('Router', () => {
  let rendered;
  const fakeRouter = {get: () => {}};

  beforeEach(() => {
    rendered = shallow(<Router alert={{}} router={fakeRouter}/>);
  });

  it('renders alert', () => {
    expect(rendered.find(Alert)).toExist();
  });

  describe('when changed to a different page', () => {
    beforeEach(() => {
      rendered.setState({Page: HomePage});
    });

    it('dispatches hide alert', () => {
      expect(SpyDispatcher).toHaveReceived('hideAlert');
    });
  });

  describe('when changed to the same page', () => {
    beforeEach(() => {
      rendered.setState({Page: EmptyPage});
    });

    it('does not dispatch hide alert', () => {
      expect(SpyDispatcher).not.toHaveReceived('hideAlert');
    });
  });

  it('renders ApiServerNotFoundPage when api_server_not_found is true', () => {
    rendered.setProps({api_server_not_found: true});

    const pages = rendered.find(ApiServerNotFoundPage);
    expect(pages.length).toEqual(1);
  });

  it('does not render ApiServerNotFoundPage when api_server_not_found is false', () => {
    rendered.setProps({api_server_not_found: false});

    const pages = rendered.find(ApiServerNotFoundPage);
    expect(pages.length).toEqual(0);
  });
});

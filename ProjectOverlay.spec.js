import React from 'react';
import {render, fireEvent, cleanup} from '@testing-library/react';
import {ProjectOverlay} from '../components/ProjectOverlay';
import {useProjectValue} from '../context';

beforeEach(cleanup); //thanks!

jest.mock('../context', () => ({
  useProjectValue: jest.fn(() => ({
    projects: [
      {
        name: '💻COMPUTER SCIENCE',
        projectId: '3',
        userId: 'abcdefg',
        docId: 'wjQ77vuDMTTESljRKDPG',
      },
    ],
  })),
}));



describe('<ProjectOverlay', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('Sucess', () => {
    it('renders the project overlay and calls setShowProjectOverlay using onClick', () => {
      const showProjectOverlay = true;
      const setProject = jest.fn();
      const setShowProjectOverlay = jest.fn(() => !showProjectOverlay);

      const {queryByTestId} = render(
        <ProjectOverlay
        showProjectOverlay
        setProject={setProject}
        setShowProjectOverlay={setShowProjectOverlay}
        />
      );

      expect(queryByTestId('project-overlay')).toBeTruthy();
      fireEvent.click(queryByTestId('project-overlay-action'));
      expect(setProject).toHaveBeenCalled();
    });

    it('renders the project overlay and calls setShowProjectOverlay using onKeyDown', () => {
      const showProjectOverlay = true;
      const setProject = jest.fn();
      const setShowProjectOverlay = jest.fn(() => !showProjectOverlay);

      const {queryByTestId} = render(
        <ProjectOverlay
        showProjectOverlay
        setProject={setProject}
        setShowProjectOverlay={setShowProjectOverlay}
        />
      );

      expect(queryByTestId('project-overlay')).toBeTruthy();
      fireEvent.keyDown(queryByTestId('project-overlay-action'));
      expect(setProject).toHaveBeenCalled();
    });
  });

  describe('Failure', () => {
    it('does not render the project overlay with any projects', () => {
      useProjectsValue.mockImplementation(() => ({
        projects: [],
      }));

      const {queryByTestId} = render(<ProjectOverlay showProjectOverlay />);
      expect(queryByTestId('project-overlay')).toBeTruthy();
      expect(queryByTestId('project-overlay-action')).toBeFalsy();

    })
  });
});

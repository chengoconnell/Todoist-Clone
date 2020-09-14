import React from 'react';
import {render, fireEvent, cleanup} from '@testing-library/react';
import {AddProject} from '../components/AddProject';
import {useSelectedProjectValue} from '../context';

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(),
  useProjectValue: jest.fn(() => ({
    projects: [
      {
        name: '🧹CHORES',
        projectId: '-MGIqG8P------------',
        userId:'abcdefg',
        docId: 'ItaM53osDwNQp1zLhiKQ',
      },
      {
        name: '📚SCHOOL',
        projectId: '1',
        userId:'abcdefg',
        docId: 'Rp2s5mcE57dSDLka2taC',
      },
      {
        name: '👨‍💻JOB APPLICATIONS',
        projectId: '2',
        userId:'abcdefg',
        docId: 'X6urnew8zJjC9QMFxp89',
      },
      {
        name: '💻COMPUTER SCIENCE',
        projectId: '3',
        userId:'abcdefg',
        docId: 'wjQ77vuDMTTESljRKDPG',
      },
    ],
    setProjects: jest.fn(),
 })),
}));

jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve('I am resolved')),
      })),
    })),
  },
}));

beforeEach(cleanup);

describe('<AddProject />', () => {
  describe('Success', () => {
    it('renders <AddProject />', () => {
      const {queryByTestId} = render(<AddProject shouldShow />);
      expect(queryByTestId('add-project')).toBeTruthy();
    });

    it('renders <AddProject /> and adds a project using onClick', () => {
      const {queryByTestId} = render(<AddProject shouldShow />);
      expect(queryByTestId('add-project')).toBeTruthy();

      fireEvent.change(queryByTestId('project-name'), {
        target: {value: 'Best project in the world!'},
      });
      expect(queryByTestId('project-name').value).toBe('Best project in the world!');

      fireEvent.click(queryByTestId('add-project-submit'));
    });

    it('renders <AddProject /> and adds a project using onKeyDown', () => {
      const {queryByTestId} = render(<AddProject shouldShow />);
      expect(queryByTestId('add-project')).toBeTruthy();

      fireEvent.change(queryByTestId('project-name'), {
        target: {value: 'Best project in the world!'},
      });
      expect(queryByTestId('project-name').value).toBe('Best project in the world!');

      fireEvent.keyDown(queryByTestId('add-project-submit'));
    });

    it('hides the project overlay when cancelled using onClick', () => {
      const {queryByTestId, getByText} = render(<AddProject shouldShow />);
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();


      fireEvent.click(getByText('Cancel'));
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeFalsy();
    });

    it('hides the project overlay when cancelled using onKeyDown', () => {
      const {queryByTestId, getByText} = render(<AddProject shouldShow />);
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();


      fireEvent.keyDown(getByText('Cancel'));
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeFalsy();
    });

    it('hides the project overlay using onClick singular and reverse action', () => {
      const {queryByTestId} = render(<AddProject shouldShow />);
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();


      fireEvent.click(getByText('add-project-action'));
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeFalsy();
    });

    it('hides the project overlay using onKeyDown singular and reverse action', () => {
      const {queryByTestId} = render(<AddProject shouldShow />);
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();


      fireEvent.keyDown(getByText('add-project-action'));
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeFalsy();
    });
  });
});

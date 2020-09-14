import React from 'react';
import {render, fireEvent, cleanup} from '@testing-library/react';
import {Tasks} from '../components/Tasks';
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
 })),
}));

jest.mock('../hooks', () => ({
  useTasks: () => ({
    tasks: [
      {
        id: '0RiS0UdIuX0iGo6lggIY',
        archived: false,
        date: '',
        projectId: '2',
        task:'Apply to Google',
        userId: 'abcdefg',
      },
    ],
  }),
}));

beforeEach(cleanup);

describe('<Tasks />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders tasks', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      setSelectedProject: jest.fn(() => 'INBOX'),
      selectedProject: 'INBOX',
    }));

    const { queryByTestId } = render(<Tasks />);
    expect(queryByTestId('tasks')).toBeTruthy();
    expect(queryByTestId('project-name').textContent).toBe('Inbox');
  });

  it('renders a task with a project title', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      setSelectedProject: jest.fn(() => '2'),
      selectedProject: '2',
    }));

    const { queryByTestId } = render(<Tasks />);
    expect(queryByTestId('tasks')).toBeTruthy();
    expect(queryByTestId('project-name').textContent).toBe('👨‍💻JOB APPLICATIONS');
  });

  it('renders a task with a collated title', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      setSelectedProject: jest.fn(() => 'INBOX'),
      selectedProject: 'INBOX',
    }));

    const { queryByTestId } = render(<Tasks />);
    expect(queryByTestId('tasks')).toBeTruthy();
    expect(queryByTestId('project-name').textContent).toBe('👨‍💻JOB APPLICATIONS');
  });
});

jest.mock('next/image', () => () => <></>);
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Episode } from '@types';
import Home from 'pages';

describe('Home page', () => {
  it('should render 2 episodes on the latest episodes', () => {
    const latestEpisodes: Episode[] = [
      {
        id: 'podcast-1',
        title: 'Podcast 1',
        members: 'Membro 1, Membro 2, Membro 3',
        publishedAt: '8 jan 21',
        thumbnail:
          'https://storage.googleapis.com/golden-wind/nextlevelweek/05-podcastr/opensource.jpg',
        description: 'Descrição mockada 1',
        url: '',
        duration: 3981,
        durationString: '01:06:00',
      },
      {
        id: 'podcast-2',
        title: 'Podcast 2',
        members: 'Membro 1, Membro 2, Membro 3',
        publishedAt: '10 jan 21',
        thumbnail:
          'https://storage.googleapis.com/golden-wind/nextlevelweek/05-podcastr/opensource.jpg',
        description: 'Descrição mockada 2',
        url: '',
        duration: 4000,
        durationString: '01:15:00',
      },
      {
        id: 'podcast-3',
        title: 'Podcast 3',
        members: 'Membro 1, Membro 2, Membro 3',
        publishedAt: '3 fev 21',
        thumbnail:
          'https://storage.googleapis.com/golden-wind/nextlevelweek/05-podcastr/opensource.jpg',
        description: 'Descrição mockada 3',
        url: '',
        duration: 500,
        durationString: '01:25:00',
      },
    ];

    render(<Home latestEpisodes={latestEpisodes} allEpisodes={[]} />);

    const latestEpisodesWrapper = screen.getByTestId;
  });
});

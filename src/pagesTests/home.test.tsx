jest.mock('next/image', () => () => <></>);
import { render, screen } from '@testing-library/react';
import { Episode } from '@types';
import Home from 'pages';

describe('Home page', () => {
  it('should render the latest episodes correctly', () => {
    const latestEpisodes: Episode[] = [
      {
        id: 'podcast-1',
        title: 'Podcast 1',
        members: 'Membro 1, Membro 2, Membro 3',
        publishedAt: '8 jan 21',
        thumbnail: '',
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
        thumbnail: '',
        description: 'Descrição mockada 2',
        url: '',
        duration: 4000,
        durationString: '01:15:00',
      },
    ];

    render(<Home latestEpisodes={latestEpisodes} allEpisodes={[]} />);

    expect(screen.getByRole('list').children).toHaveLength(2);
    expect(screen.queryByRole('link', { name: /podcast 1/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /podcast 2/i })).toBeInTheDocument();
  });
});

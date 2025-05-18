import ExecBoardClient from './ExecClient'

export const metadata = {
  title: 'Executive Board | UT Habitat for Humanity',
  description: 'Meet our executive board members!',
}

export default function ExecBoard() {
  return (
    <div>
      <ExecBoardClient />
    </div>
  );
}
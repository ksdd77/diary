import { Link } from 'react-router-dom';

const Board = () => {
  const posts = [
    { id: 1, title: '첫 번째 글' },
    { id: 2, title: '두 번째 글' },
  ];
  
  return (
    <div>
      <h1>게시판</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/detail/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Board;
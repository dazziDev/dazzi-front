import { useState } from 'react';

interface CommentSectionProps {
  articleId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ articleId }) => {
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <div className="p-8">
      <h3 className="text-2xl font-bold mb-4">코멘트</h3>
      <div className="mb-4">
        <textarea
          className="w-full p-2 border rounded"
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button
          onClick={handleCommentSubmit}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          등록
        </button>
      </div>
      <ul>
        {comments.map((comment, index) => (
          <li key={index} className="mb-2 border-b pb-2">
            {comment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;

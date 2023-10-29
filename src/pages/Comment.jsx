import React from 'react';

const Comments = ({comments}) => {
    return (
        <div className="comments">
            {comments.map((comment, index) => (
                <div key={index}>
                    {comment}
                </div>
            ))}
        </div>
    );
};

export default Comments;

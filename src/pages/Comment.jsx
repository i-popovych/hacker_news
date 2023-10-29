import React from 'react';
import parse from 'html-react-parser';

const Comments = ({by, text}) => {
    console.log(parse(text)[0])

    return (
        <div className="comments">
            <span>author name: {by}</span>
            <span>{parse(text)[0]}</span>
        </div>
    );
};

export default Comments;

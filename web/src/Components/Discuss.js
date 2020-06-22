import "braft-editor/dist/index.css";
import React, { useState, createElement } from "react";
import BraftEditor from "braft-editor";
import { Avatar, Button, Tooltip, Comment } from "antd";
import { LikeOutlined, LikeFilled, DislikeOutlined, DislikeFilled } from '@ant-design/icons'

function Discuss() {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const [comments, setComments] = useState([]);
  const [editor, setEditor] = useState(null);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };

  const controls = ["bold", "underline", "separator", "font-size", "italic"];
  const actions = [
    <span key="comment-basic-like">
      <Tooltip title="Like">
        {createElement(action === "liked" ? LikeFilled : LikeOutlined , {
          onClick: like,
        })}
      </Tooltip>
      <span className="comment-action">{likes}</span>
    </span>,
    <span key="comment-basic-dislike">
      <Tooltip title="Dislike">
        {React.createElement(action === "disliked" ? DislikeFilled : DislikeOutlined, {
          onClick: dislike,
        })}
      </Tooltip>
      <span className="comment-action">{dislikes}</span>
    </span>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];
  return (
    <div>
      {comments.map((item) => (
        <Comment
          key={item.content}
          actions={actions}
          author={item.username}
          avatar={<Avatar src={item.avatar}></Avatar>}
          content={<p dangerouslySetInnerHTML={{ __html: item.content }}></p>}
        ></Comment>
      ))}
      <div style={{ display: "flex", direction: "row", marginTop: "30px" }}>
        <Avatar
          src={`http://localhost:8888/static/images/${window.auth.avatar}`}
          style={{ margin: "20px" }}
        />
        <div style={{ flexGrow: 1, border: "solid" }}>
          <BraftEditor
            controls={controls}
            contentStyle={{
              minHeight: "150px",
              maxHeight: "150px",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,.1)",
              marginBottom: "20px",
            }}
            placeholder="快来分享你的想法吧"
            onChange={(editor) => setEditor(editor)}
          />
          <Button
            type="primary"
            onClick={() => {
              setComments([
                ...comments,
                {
                  avatar: window.auth.avatar,
                  username: window.auth.username,
                  content: editor.toHTML(),
                },
              ]);
            }}
          >
            发表
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Discuss;

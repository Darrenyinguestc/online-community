import "braft-editor/dist/index.css";
import React from "react";
import BraftEditor from "braft-editor";
import { Avatar, Button } from "antd";

class Discuss extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    console.log(window.auth.avatar);
    const controls = ["bold", "underline", "separator", "font-size", "italic"];
    return (
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
          />
          <Button type="primary">发表</Button>
        </div>
      </div>
    );
  }
}

export default Discuss;

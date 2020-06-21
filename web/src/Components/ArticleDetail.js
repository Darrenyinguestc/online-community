import React from "react";
import server from "../server";
import { Card, Avatar, Button, Icon, Tag, Empty, Input, message } from "antd";
import Discuss from "./Discuss";
import img from "../resources/qkteam.png";

class ArticleDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      author: null,
      loading: true,
    };
  }

  componentWillMount() {
    server
      .get(`article/detail/${this.props.match.params.article_id}`)
      .then((response) => {
        this.setState({ article: response.data }, function () {
          server
            .get(`user/profile/${this.state.article.user_id}`)
            .then((response) => {
              this.setState({
                author: response.data,
                loading: false,
              });
            });
        });
      });
  }


  logined() {
    return window.auth;
  } 

  access(reviewed) {
    const params = {
      article_id: this.state.article.id,
      reviewed,
    }
    server.post('/article/reviewed', params).then(() => {
      message.success("审核完毕")
    })
  }

  render() {
    const InfoTitle = (
      <div>
        <span style={{ fontSize: "20px" }}>
          {this.state.loading ? null : this.state.author.username}{" "}
        </span>
        {this.state.loading ? null : (
          <span>
            {this.state.author.gender === 1 ? (
              <Icon type="woman" />
            ) : (
              <Icon type="man" />
            )}
          </span>
        )}
      </div>
    );

    const InfoDescription = (
      <div style={{ color: "black", marginTop: "10px" }}>
        <div className="articleDetail-infoDescription">
          <div>
            <p>好友数</p>
            <p>
              <strong>0</strong>
            </p>
          </div>
          <div
            style={{ border: "1px solid gray", width: "1px", height: "60px" }}
          ></div>
          <div>
            <p>作品数</p>
            <p>
              <strong>3</strong>
            </p>
          </div>
        </div>
        <p>邮箱:{this.state.loading ? null : this.state.author.email}</p>
        <p>
          个性签名:
          {this.state.loading ? null : this.state.author.introduction || "暂无"}
        </p>
      </div>
    );

    const articleType = {
      comprehensive: "综合",
      technology: "科技",
      study: "学习",
      life: "生活",
    };

    return (
      <div className="articleDetail-container">
        <Card className="articleDetail-authorInfo">
          <Card.Meta
            avatar={
              <Avatar
                src={
                  this.state.loading
                    ? img
                    : `http://localhost:8888/static/images/${this.state.author.avatar}`
                }
              />
            }
            title={InfoTitle}
            description={InfoDescription}
          ></Card.Meta>
        </Card>

        <div style={{ width: "70%" }}>
          <Card className="articleDetail-article">
            <Card.Meta
              title={
                <div>
                  {this.state.loading ? null : (
                    <span style={{ fontSize: "25px" }}>
                      {this.state.article.title}
                    </span>
                  )}
                  {this.state.loading ? null : (
                    <Tag color="cyan" style={{ float: "right" }}>
                      {articleType[this.state.article.article_type]}
                    </Tag>
                  )}
                </div>
              }
              description={
                this.state.loading
                  ? null
                  : this.state.article.tags.split("/").map((value) => (
                      <Tag color="blue" key={value}>
                        {value}
                      </Tag>
                    ))
              }
            ></Card.Meta>
            <div
              style={{ padding: "20px", minHeight: "30vh" }}
              dangerouslySetInnerHTML={{
                __html: this.state.loading
                  ? null
                  : this.state.article.html_content,
              }}
            />
            <div style={{ float: "right" }}>
              <p>
                发表于：
                {this.state.loading
                  ? null
                  : new Date(this.state.article.created_at).toDateString()}
              </p>
              <p>
                上次更新于：
                {this.state.loading
                  ? null
                  : new Date(this.state.article.updated_at).toDateString()}
              </p>
            </div>
          </Card>
          {
            this.logined() && (
              (!this.state.article.reviewed && window.auth.role.alias === "admin") ?   
              <Card title="审核" style={{margin: 20}}>
                <Input.TextArea></Input.TextArea>
                <div style={{margin: 10}}>
                  <Button type="primary" style={{marginRight: 20}} onClick={() => this.access(1)}>通过</Button>
                  <Button type="danger" onClick={() => this.access(-1)}>不通过</Button>
                </div>
              </Card>     :     <Card className="articleDetail-comment">
              <Empty description={<span>抢沙发咯！！！</span>} />
              <Discuss />
              </Card> 
            )
          }
        </div>
      </div>
    );
  }
}

export default ArticleDetail;

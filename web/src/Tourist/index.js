import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ShowBoard from "../Components/ShowBoard";
import ArticleDetail from '../Components/ArticleDetail';

class TouristRouter extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact path="/tourist" component={ () => <Redirect to="/tourist/all" /> } />
                <Route path="/tourist/comprehensive" component={ props => <ShowBoard {...props} articleType="comprehensive" /> }/>
                <Route path="/tourist/study" component={ props => <ShowBoard {...props} articleType="study" /> } />
                <Route path="/tourist/life" component={ props => <ShowBoard {...props} articleType="life" /> } />
                <Route path="/tourist/technology" component={ props => <ShowBoard {...props} articleType="technology" /> }/>
                <Route path="/tourist/all" component={ props => <ShowBoard {...props} articleType="all"  /> } />
                <Route path="/tourist/articleDetail/:article_id" component={ ArticleDetail } />
            </Switch>
        )
    }
}

export default TouristRouter;
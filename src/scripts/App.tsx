import * as React from 'react';
import { Route } from 'react-router-dom';
import Navigation from "./components/navigation/Navigation";
import Document from "./components/document/Document";
import Example from "./components/example/Example";
import Api from "./components/api/Api";
import Header from "./components/header/Header";

require('../styles/main.scss');


function Home() {
	return (
		<Document document='README'/>
	)
}

export default class App extends React.Component<any, undefined> {

	render() {
		return (
			<div className="site">
				<div className="site__navigation">
					<Header />
					<Navigation />
				</div>
				<div className="site__content">
					<Route exact path="/" component={Home} />
					<Route path="/examples/:dir/:name" component={Example} />
					<Route path="/api/:name" component={Api} />
				</div>
			</div>
		)
	}
}

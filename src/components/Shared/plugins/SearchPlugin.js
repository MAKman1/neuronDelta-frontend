import React from "react";

import { searchPlugin } from '@react-pdf-viewer/search';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { printPlugin } from '@react-pdf-viewer/print';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/full-screen/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import '@react-pdf-viewer/print/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';


// const searchPluginInstance = ;
// const defaultLayoutPluginInstance = defaultLayoutPlugin();
// const fullScreenPluginInstance = fullScreenPlugin();
// const pageNavigationPluginInstance = pageNavigationPlugin();
// const printPluginInstance = printPlugin();
// const zoomPluginInstance = zoomPlugin();

function withSearchHook(Component) {
	return function WrappedComponent(props) {
		const myHookValue = searchPlugin();
		return <Component {...props} myHookValue={myHookValue} />;
	}
}
class SearchPlugin extends React.Component {
	render() {
		const myHookValue = this.props.myHookValue;
		return myHookValue;
	}
}
export default withSearchHook(SearchPlugin);
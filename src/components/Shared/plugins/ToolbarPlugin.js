import React from "react";

import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';


// const defaultLayoutPluginInstance = defaultLayoutPlugin();
// const fullScreenPluginInstance = fullScreenPlugin();
// const pageNavigationPluginInstance = pageNavigationPlugin();
// const printPluginInstance = printPlugin();
// const zoomPluginInstance = zoomPlugin();

function withToolbarHook(Component) {
	return function WrappedComponent(props) {
		const myHookValue = defaultLayoutPlugin();
		return <Component {...props} myHookValue={myHookValue} />;
	}
}
class ToolbarPlugin extends React.Component {
	render() {
		const myHookValue = this.props.myHookValue;
		return myHookValue;
	}
}
export default withToolbarHook(ToolbarPlugin);
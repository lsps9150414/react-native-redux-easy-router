# react-native-redux-easy-router
React Native Router based on new React Native Navigation API and Redux.

## Show Cases
To be added.

## Getting Started
### Installation
For faster updates: `npm i git+ssh://git@github.com/lsps9150414/react-native-redux-easy-router.git --save`

~~For stable: `npm i react-native-redux-easy-router --save`~~


### Basic Usage
#### Simple Steps
1. Definie the **initial navigation state** of your app.
2. Define the **navigation structure** of your app.
3. Render your navigation structure definition in the app index file.
4. Connect **`RNR-easy-router` to your redux store** and call `navigate()` from any where you want.

#### 1. Definie the initial navigation state of your app.
```javascript
import { createNavigationReducer } from 'react-native-redux-easy-router';

const initialState = {
  MAIN_ROUTER: {
    index: 0,
    routes: [ { key: 'SPLASH_SCREEN' } ],
  },
};

export default createNavigationReducer(initialState);
```
The `createNavigationReducer()` returns a regular redux reducer that manage the changes of the navigation state. Provide the returned reducer to your redux store as usual.

#### 2. Define the navigation structure of your app.
```javascript
import React from 'react';
import { StackRouter, Scene, Router } from 'react-native-redux-easy-router';

import SplashScreen from '../components/SplashScreen';
import Home from '../components/Home';

export default class MainRouter extends React.Component {
  render() {
    return (
      // The `routeKey` should be 'ROOT' for the root <Router />.
      // the `navStateName` should match the key of your navigation state.
      <Router routeKey={'ROOT'} component={StackRouter} navStateName={'MAIN_ROUTER'}>

        // The `routeKey` should match the key of the init routes of your navigation state.
        <Scene routeKey={'SPLASH_SCREEN'} component={SplashScreen} />
        <Scene routeKey={'HOME'} component={Home} />
      </Router>
    );
  }
}
```

#### 3. Render your navigation structure definition in the app index file.
```javascript
import React from 'react';
import { AppRegistry } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux';

import reducer from './reducers/index';
import MainRouter from './containers/MainRouter';

const store = createStore(reducer);

class YourApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainRouter />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('YourApp', () => YourApp);
```

#### 4. Connect `RNR-easy-router` to your redux store and call `navigate()` from any where you want.
Connect `RNR-easy-router` to your redux store:
```javascript
import React from 'react';
import { AppRegistry } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux';

import reducer from '../reducers';
import MainRouter from './src/containers/routers/MainRouter';

import { connectStore } from 'react-native-redux-easy-router';  // <-- Add this.

const store = createStore(reducer);
connectStore(store);  // <-- Add this.

class YourApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainRouter />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('YourApp', () => YourApp);
```
Call `navigate()` from any where you want:
```javascript
import { navigate } from 'react-native-redux-easy-router';
...
// Navigate to the HOME scene.
navigate.push('MAIN_ROUTER', { key: 'HOME' });
...
```

## Key Concepts
- Navigation Reducer Creator
- Carriers
- Routers
- Navigation Methods

### Navigation Reducer Creator
`createNavigationReducer()` has the following signature: `(initNavState) => redux reducer`

The navigation reducer creator takes in an inital navigation state and **returns a regular redux reducer that manage the changes of the navigation state**.

**The initial navigation state should have the following structure:**
```javascript
const initialState = {
  STACK_ROUTER_NAV_STATE: {
    index: 0,
    routes: [ { key: 'route_1' } ],
  },
  TAB_ROUTER_NAV_STATE: {
    index: 0,
  },
};
```

### Carriers
Carriers are used to **define and configure the navigation structure** of your app.

A simple navigation structure may look like this:
```javascript
<Router routeKey={'ROOT'} component={StackRouter} navStateName={'MAIN_ROUTER'}>
    <Scene routeKey={'HOME'} component={Home} />
</Router>
```

The `<Router/>` and `<Scene />` *carry* the routing configurations as props and pass them to the `component`s whitch are actually rendered. (carriers renders `null` themselves).

#### Available Carriers
- `<Scene />`
- `<Router />`

#### <Scene />
##### Basic props:
|Property|Type|Default|Description|
|--------|--------|--------|--------|
|routeKey|`string`|required|   |
|component|`React.Component`|required|   |
|container|`React.Component`|   |   |

##### Props to customize the parent `StackRouter`:
|Property|Type|Default|Description|
|--------|--------|--------|--------|
|hideParentNavBar|`bool`|`false`|   |
|leftComponent|`function`|   |   |
|leftTitle|`string`|   |   |
|leftOnPress|`function`|   |   |
|leftStyle|`React.View.Style`|   |   |
|leftTitleStyle|`React.Text.Style`|   |   |
|
|rightComponent|`function`|   |   |
|rightTitle|`string`|   |   |
|rightOnPress|`function`|   |   |
|rightStyle|`React.View.Style`|   |   |
|rightTitleStyle|`React.Text.Style`|   |   |

##### Props to customize the parent `TabRouter`:
|Property|Type|Default|Description|
|--------|--------|--------|--------|
|tabIcon|`React.Component`|required|See *Routers: TabRouter*|
|handleTabSelection|`function`|   |   |

###### Customize Tab Icon for Tab Scenes
The component your provide to the tab scene via the `tabIcon` prop recieves two props:

|Property|Type|Description|
|--------|--------|--------|
|tabKey|`string`|The key of the tab scene|
|selected|`bool`|Whether the tab scene is focused|

You can use the `selected` props to render tab icons in different styles when the scene is focused.

#### `<Router />`
##### Basic props
|Property|Type|Default|Description|
|--------|--------|--------|--------|
|routeKey|`string`|required|   |
|component|`StackRouter|TabRouter|SwitchRouter`|required|   |
|navStateName|`string`|required for `StackRouter|TabRouter`|   |
|switchingKey|`string`|required for `SwitchRouter`|   |

### Routers
**Routers** are the components that handle the routing work based on the `navigation state`. They should be provided to the `<Router />` carrier as the `component` prop.

#### Available Router Types
- StackRouter
- TabRouter
- SwitchRouter

#### StackRouter
Router that manages a stack of scenes. Renders scenes base on the navState.

#### TabRouter
Router that manages tab scenes. Renders scenes base on the navState.

#### SwitchRouter
Router that is similar to StackRouter but render scenes base on the `switchingKey` prop instead of navState

### Navigation Methods
- `navigate.push(targetRouterKey, newRoute)`
- `navigate.pop(targetRouterKey)`
- `navigate.replace(targetRouterKey, newRoute, RouteKeyToReplace)`
- `navigate.reset(targetRouterKey)`
- `navigate.selectTab(targetRouterKey)`

## Roadmap
- [x] Customizable navBar/TabBar styles
- [x] Hide TabBar by giving a control prop
- [ ] Provide option to control whether to keep tab scenes mounted when not focused
- [ ] Support getting navBar button onPress handler from scenes
- [ ] [Android] Double press back button to quit app

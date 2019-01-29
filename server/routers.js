import Loadable from 'react-loadable';

const AsyncHello = Loadable({
  loading: <div>loading...</div>,
  loader: () => import(/* webpackChunkName: 'Hello' */'./Hello'), 
})
const AsyncHome = Loadable({
  loading: <div>loading...</div>,
  loader: () => import(/* webpackChunkName: 'Home' */'./Home'), 
})
function AppRoutes(props) {
  <Switch>
    <Route exact path="/hello" component={AsyncHello} />
    <Route path="/" component={AsyncHome} />
  </Switch>  
}

export default AppRoutes
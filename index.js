import {directive} from 'lit-html';

export const connect = (mapStateToProps=null, mapDispatchToProps=null, mergeProps=null, options=null) => component => ownProps => {
  const {storeKey} = {
    storeKey: 'store',
    ...options,
  };
  const store = ownProps[storeKey];
  const update = state => {
    const stateProps = mapStateToProps ? mapStateToProps(state, ownProps): null;
    const dispatchProps = mapDispatchToProps ? mapDispatchToProps(store.dispatch, ownProps): null;
    return component(
      mergeProps
        ? mergeProps(stateProps, dispatchProps, ownProps)
        : { ...stateProps, ...dispatchProps, ...ownProps }
    );
  };
  return directive(part => {
    store.subscribe(() => part.setValue(update(store.getState())));
    return update(store.getState());
  });            
};

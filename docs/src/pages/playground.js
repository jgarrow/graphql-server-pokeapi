import React from 'react';
import { Provider } from 'react-redux';
import { Playground, store } from 'graphql-playground-react';

const GraphqlPlayground = () => (
    <Playground endpoint="https://dex-server.herokuapp.com/" setTitle={false} />
);

const GqlPlayground = () => {
    return (
        <Provider store={store}>
            <GraphqlPlayground />
        </Provider>
    );
};

export default GqlPlayground;

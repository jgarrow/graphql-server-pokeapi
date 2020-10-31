import React from 'react';
import { Provider } from 'react-redux';
import loadable from '@loadable/component';

// import via loadable because graphql-playground-react relies on the `window` object being available, which causes the build to crash since `window` is not available during SSR
const GraphqlPlayground = loadable.lib(() =>
    import('graphql-playground-react')
);

const GqlPlayground = () => {
    return (
        <>
            <GraphqlPlayground>
                {({ Playground, store }) => {
                    return (
                        <Provider store={store}>
                            <Playground
                                endpoint="https://dex-server.herokuapp.com/"
                                setTitle={false}
                            />
                        </Provider>
                    );
                }}
            </GraphqlPlayground>
        </>
    );
};

export default GqlPlayground;

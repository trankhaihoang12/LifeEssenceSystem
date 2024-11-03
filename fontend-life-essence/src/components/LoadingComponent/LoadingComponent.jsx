import React from 'react'
import { LoadingContainer, Square } from './Style'
import PropTypes from 'prop-types';

const LoadingComponent = ({ isPending = true, delay = 0.2, children }) => {
    if (!isPending) return null;

    return (
        <LoadingContainer>
            <Square delay={`${delay * 0}s`} />
            <Square delay={`${delay * 1}s`} />
            <Square delay={`${delay * 2}s`} />
            <Square delay={`${delay * 3}s`} />
            {children}
        </LoadingContainer>
    );
};

LoadingComponent.propTypes = {
    isPending: PropTypes.bool,
    delay: PropTypes.number,
    children: PropTypes.node,
};

export default LoadingComponent
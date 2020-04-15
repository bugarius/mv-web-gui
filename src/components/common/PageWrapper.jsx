import React from 'react';
import {useTranslation} from 'react-i18next';
import ContentWrapper from "../Layout/ContentWrapper";
import 'loaders.css/loaders.css';
import 'spinkit/css/spinkit.css';
import PropTypes from 'prop-types';

const PageWrapper = ({title, subtitle, loading, disabled, children}) => {

    const {t} = useTranslation();

    return (
            <>
                {
                    disabled ?
                            <div className={loading ? "whirl double-up" : ""}>{children}</div>
                            :
                            <ContentWrapper>
                                <div className="content-heading">
                                    <div>{t(title)}
                                        <small>{t(subtitle)}</small>
                                    </div>
                                </div>
                                <div className={loading ? "whirl traditional" : ""}>
                                    {children}
                                </div>
                            </ContentWrapper>
                }
            </>
    );
};

PageWrapper.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.any
};

export default PageWrapper;

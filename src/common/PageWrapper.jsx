import React from 'react';
import {useTranslation} from 'react-i18next';
import ContentWrapper from "../components/Layout/ContentWrapper";
import 'loaders.css/loaders.css';
import 'spinkit/css/spinkit.css';

const PageWrapper = ({title, subtitle, loading, disabled, children}) => {

    // state = {
    //     dropdownOpen: false
    // }
    //
    // changeLanguage = lng => {
    //     this.props.i18n.changeLanguage(lng);
    // };
    //
    // toggle = () => {
    //     this.setState({
    //         dropdownOpen: !this.state.dropdownOpen
    //     });
    // };

    const {t} = useTranslation();

    return (
            <>
                {
                    disabled ?
                            <div>{children}</div>
                            :
                            <ContentWrapper>
                                <div className="content-heading">
                                    <div>{t(title)}
                                        <small>{t(subtitle)}</small>
                                    </div>
                                    {/*<div className="ml-auto">*/}
                                    {/*    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>*/}
                                    {/*        <DropdownToggle>*/}
                                    {/*            Polski*/}
                                    {/*        </DropdownToggle>*/}
                                    {/*        <DropdownMenu className="dropdown-menu-right-forced animated fadeInUpShort">*/}
                                    {/*            <DropdownItem onClick={() => this.changeLanguage('en')}>English</DropdownItem>*/}
                                    {/*            <DropdownItem onClick={() => this.changeLanguage('pl')}>Polski</DropdownItem>*/}
                                    {/*        </DropdownMenu>*/}
                                    {/*    </Dropdown>*/}
                                    {/*</div>*/}

                                </div>
                                <div className={loading ? "whirl oval right" : ""}>
                                    {children}
                                </div>
                            </ContentWrapper>
                }
            </>
    );
};

export default PageWrapper;

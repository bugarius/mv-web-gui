import React from 'react';

import Header from './Header'
import Sidebar from './Sidebar'
import Offsidebar from './Offsidebar'
import Footer from './Footer'
import {useResponsiveContext} from "../platform/ResponsiveContext";

const Base = props => {
        const {isMobile} = useResponsiveContext();
        return (
                <div className="wrapper">
                        <Header isMobile={isMobile}/>

                        <Sidebar />

                        <Offsidebar />

                        <section className="section-container">
                                { props.children }
                        </section>

                        <Footer />
                </div>
        )
}

export default Base;

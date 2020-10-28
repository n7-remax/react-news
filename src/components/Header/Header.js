import React from 'react';

function Header() {
    return (
        <header className="header">
            <div className="header-logo">
                <a className="header-link" href="/">
                    <div className="header-news-text" >React
                    <span className="header-api-text">News</span>
                    </div>
                </a>
                <a className="header-powered-text" href="https://newsapi.org/">
                    Powered by News Api
                </a>
            </div>

        </header>
    );
}

export default Header;

import React from 'react';


function AboutPage() {
    return (
        <div className="container">
            <section>
                <h1> Getting Started </h1>
                    <div>
                    <h3>Reddit</h3>
                        <p>
                            Any subreddit can be converted into an RSS
                            source by putting <code>.rss</code> onto the end of the URL.
                        </p>
                        <h4>Example</h4>
                        <a>https://www.reddit.com/r/Showerthoughts/.rss</a>
                    </div>
                    <br/>
                    <br/>
                    <div>
                    <h3> Youtube </h3>
                        <p>Any YouTube channel can be turned into an RSS source using the channel ID.</p>
                        <h4>Example:</h4>
                        <a>https://www.youtube.com/feeds/videos.xml?channel_id=channel_id</a>
                    </div>
                    <br/>
                </section>
                    <br/>
                    <br/>
                <section>
                    <table>
                        <caption> A few example sources to get you started </caption>
                        <thead>
                            <tr>
                                <th> Source Name </th>
                                <th> Source URL </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> Hacker News Best </td>
                                <td><a>https://hnrss.org/best</a></td>
                            </tr>
                            <tr>
                                <td>Ars Technica Technology</td>
                                <td><a>https://feeds.arstechnica.com/arstechnica/technology-lab</a></td>
                            </tr>
                            <tr>
                                <td>New York Times - World</td>
                                <td><a>https://rss.nytimes.com/services/xml/rss/nyt/World.xml</a></td>
                            </tr>
                            <tr>
                                <td>Splash 247</td>
                                <td><a>https://splash247.com/feed/</a></td>
                            </tr>
                            <tr>
                                <td>Weather.co</td>
                                <td><a>https://weather.co/rss</a></td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                <section>
                    <h2> About </h2>
                    <h3> Tech Stack </h3>
                        <ul>
                            <li>Node</li>
                            <li>Express</li>
                            <li>React</li>
                            <li>Redux</li>
                            <li>Postgresql</li>
                            <li>RSS Parser</li>
                            <li>Terminal CSS </li>
                        </ul>
                    
                </section>
        </div>
    );
}

export default AboutPage;

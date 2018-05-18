import React from 'react';
import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  RedditShareButton,
  FacebookIcon,
  TwitterIcon,
  GooglePlusIcon,
  LinkedinIcon,
  RedditIcon,
} from 'react-share';


export default () => {
  const shareUrl = 'http://github.com/jenjenw23/greenboots';
  const title = 'Greenboots';
    return (
      <footer className="footer">
        <div className="container">
          <div className="footer-container bg-dark navbar-dark">
              <a href="/">Greenboots © 2018</a>
          <div className="social">
              <FacebookShareButton
                url={shareUrl}
                quote={title}
              >
              <FacebookIcon
                  size={32}
                  round />
              </FacebookShareButton>
              <TwitterShareButton
                url={shareUrl}
                title={title}
              >
              <TwitterIcon
                  size={32}
                  round />
              </TwitterShareButton>
              <GooglePlusShareButton
                url={shareUrl}
                >
              <GooglePlusIcon
                  size={32}
                  round />
              </GooglePlusShareButton>
              <LinkedinShareButton
                url={shareUrl}
                title={title}
                windowWidth={750}
                windowHeight={600}
                >
              <LinkedinIcon
                  size={32}
                  round />
              </LinkedinShareButton>
              <RedditShareButton
                url={shareUrl}
                title={title}
                windowWidth={660}
                windowHeight={460}
                >
              <RedditIcon
                  size={32}
                  round />
              </RedditShareButton>
            </div>
          </div>  
        </div>
      </footer>
    )
  }

 
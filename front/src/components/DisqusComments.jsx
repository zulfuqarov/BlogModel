// DisqusComments.js
import React, { useEffect } from 'react';

const DisqusComments = () => {
    useEffect(() => {
        (function () { // DON'T EDIT BELOW THIS LINE
            var d = document, s = d.createElement('script');
            s.src = 'https://blog-tyizdksicq.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
        })();
    }, []);

    return (
        <div className="diss">
            <div className="container  mx-auto  justify-center pt-[60px]" id="disqus_thread"></div>
        </div>
    );
};

export default DisqusComments;
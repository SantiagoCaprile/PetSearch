"use client";

import React, { useEffect } from "react";

const AdBanner = ({ dataAdSlot, dataAdFormat, dataFullWidthResponsive, }) => {
    useEffect(() => {
        try {
            ((window).adsbygoogle = (window).adsbygoogle || []).push({});
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-9956234514200358"
            data-ad-slot={dataAdSlot}
            data-ad-format={dataAdFormat}
            data-full-width-responsive={dataFullWidthResponsive.toString()}
        ></ins>
    );
};

export default AdBanner;

{/* <ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-9956234514200358"
     data-ad-slot="6430493933"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script> */}
import Script from "next/script";

const GoogleAdScript = ({ pId }) => {
    if (process.env.ALLOW_ADS !== "true") {
        return null;
    }
    return (
        <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
    );
};

export default GoogleAdScript;
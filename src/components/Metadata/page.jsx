// components/Metadata.js
const Metadata = ({ title, description, keywords, openGraph, twitter }) => (
    <>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join(", ")} />
        <meta property="og:title" content={openGraph?.title} />
        <meta property="og:description" content={openGraph?.description} />
        <meta property="og:image" content={openGraph?.image} />
        <meta property="og:url" content={openGraph?.url} />
        <meta property="og:type" content={openGraph?.type} />
        <meta name="twitter:card" content={twitter.card} />
        <meta name="twitter:site" content={twitter.site} />
        <meta name="twitter:creator" content={twitter.creator} />
        <meta name="twitter:title" content={twitter.title} />
        <meta name="twitter:description" content={twitter.description} />
        <meta name="twitter:image" content={twitter.image} />
    </>
);

export default Metadata;

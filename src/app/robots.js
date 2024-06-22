export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: ['/', '/pets', '/helpMap', '/rescuers', '/faq'],
            disallow: '/adminDashboard/',
        },
        sitemap: 'https://www.petsearch.com.ar/sitemap.xml',
    }
}
import Pet from "@/classes/Pet";

export default async function sitemap() {
    const petsUrl = await Pet.getAllPets().then((pets) => {
        return pets.map((pet) => {
            return {
                url: `https://www.petsearch.com.ar/pets/${pet._id}`,
                lastModified: new Date(pet.updatedAt),
                changeFrequency: 'weekly',
                priority: 0.8,
            }
        });
    });

    const baseUrl = 'https://www.petsearch.com.ar';
    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            priority: 1,
        },
        {
            url: baseUrl + '/pets',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: baseUrl + '/helpMap',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: baseUrl + '/rescuers',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: baseUrl + '/faq',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.2,
        },
        {
            url: baseUrl + '/faq/PrivacyPolicy',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.2,
        },
        {
            url: baseUrl + '/faq/TermsOfService',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.2,
        },
        ...petsUrl
    ]
}
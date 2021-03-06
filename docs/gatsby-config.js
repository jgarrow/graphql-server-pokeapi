module.exports = {
    siteMetadata: {
        siteTitle: `Dex Docs`,
        defaultTitle: `Dex Docs`,
        siteTitleShort: `Dex Docs`,
        siteDescription: `Documentation for the GraphQL Pokédex Server using PokéAPI's SQLite3 database`,
        siteUrl: `https://dex-docs.netlify.app`,
        siteAuthor: `Janessa Garrow`,
        siteImage: `/favicon.png`,
        siteLanguage: `en`,
        themeColor: `#8257E6`,
        basePath: `/`,
    },
    plugins: [
        {
            resolve: `@rocketseat/gatsby-theme-docs`,
            options: {
                configPath: `src/config`,
                docsPath: `src/docs`,
                githubUrl: `https://github.com/jgarrow/graphql-server-pokeapi`,
                baseDir: `docs`,
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Rocketseat Gatsby Themes`,
                short_name: `RS Gatsby Themes`,
                start_url: `/`,
                background_color: `#ffffff`,
                display: `standalone`,
                icon: `static/favicon.png`,
            },
        },
        `gatsby-plugin-sitemap`,
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                // trackingId: ``,
            },
        },
        `gatsby-plugin-remove-trailing-slashes`,
        {
            resolve: `gatsby-plugin-canonical-urls`,
            options: {
                siteUrl: `https://dex-docs.netlify.app`,
            },
        },
        `gatsby-plugin-offline`,
    ],
};

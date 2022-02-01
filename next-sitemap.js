/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 */
module.exports = {
  siteUrl: 'https://schedular.theditor.xyz',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};

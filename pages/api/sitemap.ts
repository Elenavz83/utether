
// This is an example of how to access a session from an API route
import type { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {

  res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Encoding': 'gzip' });
  res.end(`
  
<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>https://qepal.com/api/sitemaps/fa</loc>
      </sitemap>
      <sitemap>
        <loc>https://qepal.com/api/sitemaps/en</loc>
      </sitemap>
      <sitemap>
        <loc>https://qepal.com/api/sitemaps/ar</loc>
      </sitemap>
      <sitemap>
        <loc>https://qepal.com/api/sitemaps/de</loc>
      </sitemap>
      <sitemap>
        <loc>https://qepal.com/api/sitemaps/fr</loc>
      </sitemap>
      <sitemap>
        <loc>https://qepal.com/api/sitemaps/es</loc>
      </sitemap>
      <sitemap>
        <loc>https://qepal.com/api/sitemaps/ko</loc>
      </sitemap>
      <sitemap>
        <loc>https://qepal.com/api/sitemaps/ja</loc>
      </sitemap>
      <sitemap>
        <loc>https://qepal.com/api/sitemaps/pt</loc>
      </sitemap>
      <sitemap>
        <loc>https://qepal.com/api/sitemaps/id</loc>
      </sitemap>
      <sitemap>
        <loc>https://qepal.com/api/sitemaps/ru</loc>
      </sitemap>
      <sitemap>
        <loc>https://qepal.com/api/sitemaps/tr</loc>
      </sitemap>
      <sitemap>
        <loc>https://qepal.com/api/sitemaps/ur</loc>
      </sitemap>
      <sitemap>
        <loc>https://qepal.com/api/sitemaps/zh</loc>
      </sitemap>
    </sitemapindex>

  `);


}





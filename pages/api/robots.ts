// This is an example of how to access a session from an API route
import type { NextApiRequest, NextApiResponse } from "next"



export default async (req: NextApiRequest, res: NextApiResponse) => {

  res.send(`
  sitemap: https://qepal.com/sitemap.xml

  User-agent: *
  Disallow: /admin/

  # Allow crawling of the homepage for all languages
  Allow: /


  User-agent: *
  Disallow: /ar/admin/
  Allow: /ar/

  User-agent: *
  Disallow: /fa/admin/
  Allow: /fa/

  User-agent: *
  Disallow: /en/admin/
  Allow: /en/

  User-agent: *
  Disallow: /de/admin/
  Allow: /de/

  User-agent: *
  Disallow: /fr/admin/
  Allow: /fr/

  User-agent: *
  Disallow: /es/admin/
  Allow: /es/

  User-agent: *
  Disallow: /id/admin/
  Allow: /id/

  User-agent: *
  Disallow: /ru/admin/
  Allow: /ru/

  User-agent: *
  Disallow: /tr/admin/
  Allow: /tr/

  User-agent: *
  Disallow: /pt/admin/
  Allow: /pt/

  User-agent: *
  Disallow: /ko/admin/
  Allow: /ko/

  User-agent: *
  Disallow: /ja/admin/
  Allow: /ja/

  User-agent: *
  Disallow: /ur/admin/
  Allow: /ur/

  User-agent: *
  Disallow: /zh/admin/
  Allow: /zh/
  `)
}

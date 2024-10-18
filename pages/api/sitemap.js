import groq from 'groq';
import client from '../../client';
import {slugToAbsUrl} from '../../utils/urls';

export default async function handler(req, res) {
  try {
    const {allRoutesSlugs, baseUrl} = await client.fetch(groq`
      {
        "allRoutesSlugs": *[
          _type == "route" &&
          !(_type in path("drafts.**")) &&
          includeInSitemap != false &&
          disallowRobots != true
        ].slug.current,
        "baseUrl": *[_type == "site-config"][0].url,
      }
    `);

    if (!allRoutesSlugs || !baseUrl) {
      throw new Error("Dados incompletos retornados da consulta GROQ");
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allRoutesSlugs
        .map(
          (slug) => `
      <url>
        <loc>${slugToAbsUrl(slug, baseUrl)}</loc>
      </url>
      `
        )
        .join('\n')}
    </urlset>`;

    res.status(200).send(sitemap);
  } catch (error) {
    console.error("Erro ao gerar o sitemap:", error);
    res.status(500).send("Erro ao gerar o sitemap");
  }
}

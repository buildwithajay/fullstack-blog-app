const API_BASE = 'https://fullstack-blog-app-l5ph.onrender.com';

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');

const parseImageUrls = (imageUrl, imageUrls) => {
  if (Array.isArray(imageUrls) && imageUrls.length > 0) {
    return imageUrls.filter(Boolean);
  }

  if (!imageUrl) return [];

  const raw = String(imageUrl).trim();
  if (!raw) return [];

  if (raw.startsWith('[') && raw.endsWith(']')) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.filter(Boolean);
      }
    } catch {
      return [raw];
    }
  }

  return [raw];
};

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    res.status(400).send('Missing blog id');
    return;
  }

  try {
    const blogResponse = await fetch(`${API_BASE}/blog/${id}`);
    if (!blogResponse.ok) {
      res.status(404).send('Blog not found');
      return;
    }

    const blog = await blogResponse.json();
    const articleUrl = `https://fullstack-blog-app-jade.vercel.app/blogdetails/${id}`;
    const imageUrls = parseImageUrls(blog.imageUrl, blog.imageUrls);
    const imageUrl = imageUrls[0] || 'https://fullstack-blog-app-jade.vercel.app/nepalniti-logo.svg';
    const title = escapeHtml(blog.title || 'Nepalniti Article');
    const description = escapeHtml((blog.content || 'Read this article on Nepalniti').slice(0, 180));
    const safeImageUrl = escapeHtml(imageUrl);
    const safeArticleUrl = escapeHtml(articleUrl);

    const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>

    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Nepalniti" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${safeImageUrl}" />
    <meta property="og:url" content="${safeArticleUrl}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${safeImageUrl}" />

    <meta http-equiv="refresh" content="0;url=${safeArticleUrl}" />
    <link rel="canonical" href="${safeArticleUrl}" />
  </head>
  <body>
    <script>window.location.replace(${JSON.stringify(articleUrl)});</script>
    <p>Redirecting to article...</p>
  </body>
</html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=86400');
    res.status(200).send(html);
  } catch (error) {
    res.status(500).send('Unable to generate social preview');
  }
}

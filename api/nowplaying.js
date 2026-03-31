export default async function handler(req, res) {
  const sourceUrl = 'https://radioconexionlatina.com/api/nowplaying_static/radio_conexion_latina_edmonton.json';

  try {
    const response = await fetch(sourceUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'RadioConexionLatinaVercelProxy/1.0'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({
        ok: false,
        error: `Upstream responded with ${response.status}`
      });
    }

    const data = await response.json();

    res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=30');
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: 'Proxy could not load now playing data.',
      details: error?.message || 'Unknown error'
    });
  }
}

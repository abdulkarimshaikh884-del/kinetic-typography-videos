# Thumbnails

YouTube thumbnails for the channel, designed in HTML/CSS and rendered to PNG with Puppeteer + headless Chromium.

## Files

- `claude-free-part2-thumbnail.png` — Final 1280×720 thumbnail for **"Get Claude AI Pro FREE with GitHub Student Pack 2026 — Part 2 / Full Video"**.
- `thumb.html` — Source design (edit text, colors, layout here).
- `render.mjs` — Puppeteer render script (screenshots `thumb.html` at 2× scale → PNG).

## Regenerate

```bash
# Install deps (puppeteer brings its own Chromium)
npm install puppeteer

# Render
node render.mjs
```

> Note: In some sandboxed Linux environments Chromium needs matching system
> libraries. If the render fails with an `nss`/`libnss3` error, prepend the
> matching library path, e.g.:
>
> ```bash
> LD_LIBRARY_PATH=/path/to/nsslibs/usr/lib64:/usr/lib64 node render.mjs
> ```

Output: `claude-free-part2-thumbnail.png` (1280×720).

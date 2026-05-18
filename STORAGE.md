# JARVIS Storage

JARVIS stores its local JSON database in `.jarvis-data/database.json` by default.

## Configuration order

1. `DATABASE_URL=file:/absolute/path/to/database.json`
2. `JARVIS_DATA_DIR=/absolute/path/to/folder`
3. Default project-local `.jarvis-data/database.json`

`DATABASE_URL` wins when both values are set.

## External SSD example

When the SSD is mounted, set one of these in `.env.local`:

```env
JARVIS_DATA_DIR=/Volumes/ExternalSSD/JARVIS
```

or:

```env
DATABASE_URL=file:/Volumes/ExternalSSD/JARVIS/database.json
```

The app creates the folder automatically and writes the database atomically to reduce the chance of corruption during interrupted writes.

## Health check

Use the storage health endpoint to confirm where data is being written:

```txt
GET /api/storage/health
```

Use the candidates endpoint to list safe storage targets JARVIS can see:

```txt
GET /api/storage/candidates
```

On macOS this reads `/Volumes`, basic filesystem capacity, and suggested `JARVIS/` folders only. It does not scan private documents or create folders until a path is configured/confirmed.

The system health endpoint also includes a `JARVIS Storage` service entry.

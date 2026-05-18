# JARVIS Remote Nodes

Remote nodes let one JARVIS dashboard see and communicate with another JARVIS runtime on a different computer.

## Safety model

Start with LAN, VPN, or a private tunnel only. Do not expose a JARVIS node directly to the public internet without auth.

Remote node support currently allows:
- reading configured node metadata
- health checks through `/api/system/health`
- chat handoff through `/api/chat/message`

Dangerous actions should stay approval-gated on the target node.

## Configure nodes

Set `JARVIS_REMOTE_NODES` in `.env.local` as JSON:

```env
JARVIS_REMOTE_NODES=[{"id":"studio-pc","name":"Studio PC","role":"remote","baseUrl":"http://192.168.1.50:3000","description":"Remote workstation","enabled":true,"requiresApprovalForActions":true,"tags":["lan","windows"]}]
```

Each node needs:
- `id` — stable machine id
- `name` — display name
- `baseUrl` — reachable JARVIS URL, preferably LAN/VPN/private tunnel

## Endpoints

```txt
GET /api/nodes
GET /api/nodes/:nodeId/health
POST /api/nodes/:nodeId/chat
```

Chat payload example:

```json
{
  "prompt": "What is your current system status?",
  "sessionTitle": "Remote node check"
}
```

## Next hardening steps

1. Add node pairing tokens.
2. Add signed requests between nodes.
3. Add per-node capability flags.
4. Add user approval before terminal/workflow actions on remote nodes.
5. Add UI for adding/removing nodes without hand-editing `.env.local`.

# 🧠 Mesh API

> Open-source problem-solving platform with AI-powered quality scoring — participating in [Drips Wave](https://www.drips.network/solutions/wave) funding cycles.

## What is Mesh?

A collaborative platform where communities solve real-world problems through:
- Structured problem discussions (MeshNodes)
- AI-assisted solution evaluation
- Quality-based rankings (not just popularity)
- Open-source implementation tracking

## 🌊 Drips Wave

This project participates in **Drips Wave** — on-chain, recurring open-source funding cycles. Contributors earn rewards by solving issues during active Waves. Browse the [Issues](https://github.com/ThinknetCollective/mesh-up_api/issues) for tasks tagged with complexity ratings.

## 🌟 Why Mesh Matters to Stellar Community

### The Problem
Communities worldwide face complex challenges that require collaborative solutions. Traditional platforms rely on popularity (upvotes), not quality. This leads to:
- Low-effort answers winning
- Gaming the system
- No transparent impact tracking
- Centralized control

### The Stellar Solution
Mesh uses **ethical quality metrics** and can integrate with Stellar blockchain for:

#### 🔐 Transparent Reputation
- Solution rankings stored on-chain
- Immutable contribution history
- Portable reputation across platforms
- Verifiable proof of impact

#### 💎 Token Rewards (Future)
- Quality contributors earn Stellar Lumens (XLM)
- Micro-payments for helpful solutions
- Low transaction fees (<$0.01)
- Global accessibility

#### 🌍 Financial Inclusion
- Reward problem-solvers in developing countries
- No intermediaries or payment processors
- Cross-border collaboration
- Programmable smart contracts for bounties

#### 📊 On-Chain Impact Tracking
- Prove solutions helped X people
- Transparent fund allocation
- NFT badges for top contributors
- DAO governance for platform decisions

### Integration Roadmap

**Phase 1** (Current): Off-chain quality scoring ✅  
**Phase 2** (Q2 2026): Stellar wallet integration  
**Phase 3** (Q3 2026): On-chain reputation & rewards  
**Phase 4** (Q4 2026): Smart contract bounties

### Why Stellar (Not Ethereum/Polygon)?

| Feature | Stellar | Ethereum | Polygon |
|---------|---------|----------|---------|
| Transaction fee | ~$0.00001 | ~$2-50 | ~$0.01-1 |
| Speed | 3-5 seconds | 15+ seconds | 2-3 seconds |
| Built for payments | ✅ Yes | ❌ No | ⚠️ Partial |
| Environmental | ✅ Low energy | ❌ High (PoW) | ⚠️ Medium |
| Global remittance | ✅ Native | ❌ Complex | ⚠️ Complex |

**Perfect for micro-rewards to problem-solvers globally!**

**SDK**: `@stellar/stellar-sdk`  
**Docs**: https://developers.stellar.org/

## Tech Stack

- **Backend**: NestJS (TypeScript)
- **Database**: PostgreSQL + TypeORM (planned)
- **AI**: OpenAI GPT-3.5 (optional, with keyword fallback)
- **Auth**: JWT (planned)
- **API Docs**: Swagger/OpenAPI (planned)

## Quick Start

```bash
git clone https://github.com/ThinknetCollective/mesh-up_api.git
cd mesh-up_api
npm install
cp .env.example .env
npm run start:dev
```

Visit: http://localhost:3000

## Contributing

We welcome contributions! Check our [Issues](https://github.com/ThinknetCollective/mesh-up_api/issues):

- 🟢 **Easy** (`good first issue`) — Perfect for beginners
- 🟡 **Medium** — Core features
- 🔴 **Hard** — Complex challenges
- ⭐ **Stellar** — Blockchain integration tasks

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Planned Project Structure

```
src/
├── mesh-nodes/     # Problems/discussions
├── solutions/      # Solution proposals
├── metrics/        # Quality scoring system
├── users/          # User management
├── auth/           # Authentication
└── tags/           # Tagging system
```

## License

[MIT](LICENSE)

## Community

- **Issues**: Bug reports & feature requests
- **Discussions**: Questions & ideas

---

**Built with ❤️ by [ThinknetCollective](https://github.com/ThinknetCollective)**

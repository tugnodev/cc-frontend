export interface Article {
    id: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    createdAt: string;
    updatedAt: string;
}

const STORAGE_KEY = "cc_articles";

export const demoArticles: Article[] = [
    {
        id: "art-001",
        name: "Riz parfumé 25kg",
        description: "Riz de qualité supérieure pour usage domestique et commercial",
        price: 18500,
        stock: 32,
        createdAt: "2025-01-10",
        updatedAt: "2025-01-10",
    },
    {
        id: "art-002",
        name: "Huile végétale 5L",
        description: "Huile végétale raffinée, idéale pour la cuisson",
        price: 7200,
        stock: 18,
        createdAt: "2025-01-11",
        updatedAt: "2025-01-11",
    },
    {
        id: "art-003",
        name: "Sucre en poudre 1kg",
        description: "Sucre blanc cristallisé",
        price: 850,
        stock: 120,
        createdAt: "2025-01-12",
        updatedAt: "2025-01-12",
    },
    {
        id: "art-004",
        name: "Lait en poudre 400g",
        description: "Lait instantané enrichi en vitamines",
        price: 2600,
        stock: 0,
        createdAt: "2025-01-12",
        updatedAt: "2025-01-12",
    },
    {
        id: "art-005",
        name: "Savon antiseptique",
        description: "Savon antibactérien pour usage quotidien",
        price: 500,
        stock: 75,
        createdAt: "2025-01-13",
        updatedAt: "2025-01-13",
    },
];

function readStore(): Article[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return demoArticles.slice();
        return JSON.parse(raw) as Article[];
    } catch {
        return demoArticles.slice();
    }
}

function writeStore(items: Article[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export async function listArticles(): Promise<Article[]> {
    // emulate async
    return Promise.resolve(readStore());
}

export async function createArticle(payload: Partial<Article>): Promise<Article> {
    const items = readStore();
    const id = `art-${Math.random().toString(36).slice(2, 9)}`;
    const now = new Date().toISOString().slice(0, 10);
    const article: Article = {
        id,
        name: payload.name || "",
        description: payload.description || "",
        price: Number(payload.price || 0),
        stock: Number(payload.stock || 0),
        createdAt: now,
        updatedAt: now,
    };
    items.unshift(article);
    writeStore(items);
    return Promise.resolve(article);
}

export async function updateArticle(id: string, patch: Partial<Article>): Promise<Article> {
    const items = readStore();
    const idx = items.findIndex((x) => x.id === id);
    if (idx === -1) throw new Error("Article not found");
    const now = new Date().toISOString().slice(0, 10);
    const updated = { ...items[idx], ...patch, updatedAt: now } as Article;
    items[idx] = updated;
    writeStore(items);
    return Promise.resolve(updated);
}

export async function deleteArticle(id: string): Promise<void> {
    const items = readStore().filter((x) => x.id !== id);
    writeStore(items);
    return Promise.resolve();
}

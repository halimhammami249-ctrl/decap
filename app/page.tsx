"use client"

import { useEffect, useMemo, useState } from "react"

type Product = {
  name: string
  price: number
  image: string
  description: string
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([])
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data.products ?? []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return products
    return products.filter((p) => p.name.toLowerCase().includes(q))
  }, [products, query])

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-mono text-sm font-bold">
              N
            </div>
            <span className="text-lg font-semibold tracking-tight">Nova Catalog</span>
          </div>
          <span className="text-sm text-muted-foreground">Product Catalog</span>
        </div>
      </header>

      <main className="flex-1">
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 py-16 text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
              Discover products built for the way you work
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              A curated selection of professional-grade hardware. Browse the catalog and find the
              right tools for your team.
            </p>
            <div className="mx-auto mt-8 max-w-md">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products by name..."
                aria-label="Search products by name"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none ring-ring/50 focus:ring-2"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12">
          {loading ? (
            <p className="text-center text-muted-foreground">Loading products...</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product) => (
                <article
                  key={product.name}
                  className="flex flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground"
                >
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      loading="lazy"
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="font-semibold leading-tight">{product.name}</h2>
                      <span className="shrink-0 font-mono text-sm font-medium">
                        ${product.price.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                      {product.description}
                    </p>
                    <button
                      type="button"
                      className="mt-3 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      View Details
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Nova Catalog. All rights reserved.</p>
          <p>A prototype for a future SaaS product catalog system.</p>
        </div>
      </footer>
    </div>
  )
}

import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import ProductGallery from "@/components/ProductGallery";
import { products } from "@/lib/products";
import { getProductGallery } from "@/lib/product-gallery";
import { ArrowLeft, Heart, Share2, ShoppingBag, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { getWhatsAppLink } from "@/lib/contact";

/**
 * Design: Artesanal Mágico
 * Página de detalhes do produto com galeria de múltiplos ângulos
 */

export default function ProductDetail() {
  const [match, params] = useRoute("/produto/:id");

  if (!match) return null;

  const product = products.find((p) => p.id === params?.id);
  const gallery = getProductGallery(params?.id || "");

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-primary">Produto não encontrado</h1>
          <p className="text-muted-foreground">O produto que procura não existe.</p>
          <Link href="/">
            <Button className="btn-magical">Voltar ao Catálogo</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price?: number, priceFrom?: number) => {
    if (priceFrom && !price) {
      return `desde ${priceFrom.toFixed(2)}€`;
    }
    if (price === 0) {
      return "sob orçamento";
    }
    return price ? `${price.toFixed(2)}€` : "sob consulta";
  };

  return (
    <div className="min-h-screen bg-background paper-texture">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-primary">{product.name}</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Product Detail */}
      <section className="container py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Gallery */}
          <div>
            {gallery && gallery.images.length > 0 ? (
              <ProductGallery
                images={gallery.images}
                productName={product.name}
              />
            ) : (
              <div className="w-full aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <ShoppingBag className="w-16 h-16 text-blue-400 opacity-50 mx-auto mb-4" />
                  <p className="text-muted-foreground">Imagens em breve</p>
                </div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Title and Category */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-orange-500 uppercase tracking-wide">
                {product.category}
              </p>
              <h1 className="text-4xl font-bold text-primary">{product.name}</h1>
              <p className="text-lg text-muted-foreground">{product.description}</p>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6">
              <p className="text-sm text-muted-foreground mb-2">Preço base</p>
              <p className="text-4xl font-bold text-orange-500">
                {formatPrice(product.price, product.priceFrom)}
              </p>
              <p className="text-xs text-muted-foreground mt-3">
                *Preços sujeitos a ajuste conforme personalização, quantidade, acabamento ou pedido especial.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-primary">Características</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Personalização completa com design único
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Qualidade premium e acabamento artesanal
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Entrega rápida e embalagem especial
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Ideal para presentes e ocasiões especiais
                  </span>
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <a href={getWhatsAppLink(`Olá! Tenho interesse no produto: ${product.name}`)} target="_blank" rel="noopener noreferrer" className="block">
                <Button className="btn-magical w-full gap-2 py-6 text-lg">
                  <MessageCircle className="w-5 h-5" />
                  Contactar via WhatsApp
                </Button>
              </a>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 gap-2"
                >
                  <Heart className="w-4 h-4" />
                  Guardar
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Partilhar
                </Button>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-3">
              <h4 className="font-bold text-primary">Dúvidas?</h4>
              <p className="text-sm text-muted-foreground">
                Entra em contacto connosco via WhatsApp para orçamentos especiais, encomendas de grupo ou personalizações customizadas.
              </p>
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Contactar via WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 section-divider">
          <h2 className="text-3xl font-bold text-primary mb-8">Produtos Relacionados</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {products
              .filter((p) => p.category === product.category && p.id !== product.id)
              .slice(0, 3)
              .map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/produto/${relatedProduct.id}`}>
                  <div className="card-magical p-6 space-y-4 cursor-pointer">
                    <div className="h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <ShoppingBag className="w-12 h-12 text-blue-400 opacity-50" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-primary">{relatedProduct.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {relatedProduct.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-lg font-bold text-orange-500">
                        {formatPrice(relatedProduct.price, relatedProduct.priceFrom)}
                      </span>
                      <Button size="sm" variant="outline">
                        Ver
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 mt-16">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-3">
              <h4 className="font-bold text-lg">Ninho do Dragão</h4>
              <p className="text-blue-100">Artigos personalizados com magia e qualidade.</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold">Contacto</h4>
              <p className="text-blue-100">WhatsApp: Disponível</p>
              <p className="text-blue-100">Email: contacto@ninhododragao.pt</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold">Informações</h4>
              <p className="text-blue-100">Sobre Nós</p>
              <p className="text-blue-100">Política de Privacidade</p>
            </div>
          </div>
          <div className="border-t border-blue-800 pt-8 text-center text-blue-100">
            <p>&copy; 2026 Ninho do Dragão. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

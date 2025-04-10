import { useState } from 'react';

const Chatbot = () => {
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };

    setDisplayedMessages((prev) => [...prev, `🧍 ${input}`, '🤖 ...']);
    setChatHistory((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `
Tu es ÉléganceBot, un expert en costumes sur mesure, chaussures de luxe et style masculin. Tu travailles pour la maison haut de gamme "L'Élégance" à Paris. Tu réponds aux clients comme un conseiller expérimenté.

Ta mission est de :
- Donner des conseils précis et utiles (style, taille, matières, occasions)
- Mettre en avant les produits de la boutique
- Ne jamais répéter la même phrase deux fois
- Être chaleureux, naturel et élégant (mais pas robotique)

Tu connais ces produits :
- Costume Italien Sur Mesure : 899€, tissu italien haut de gamme, coupe ajustée
- Oxford Classic Noir : 299€, cuir véritable, style chic et sobre
- Jean selvedge brut : 199€, denim japonais, coupe droite haut de gamme

Exemples de réponses :
- “Un costume italien est parfait pour une silhouette élancée, surtout si vous cherchez quelque chose de léger et structuré.”
- “Les chaussures Oxford sont idéales pour une cérémonie : élégantes, discrètes et indémodables.”
- “Pour entretenir votre veste en laine, utilisez une brosse douce après chaque port.”

Tu parles avec élégance, comme si tu recevais un client en boutique.
              `.trim(),
            },
            ...chatHistory,
            userMsg,
          ],
          temperature: 0.7,
          max_tokens: 300,
        }),
      });

      const data = await response.json();
      console.log("Réponse OpenAI 🔍", data);

      if (data?.error) {
        setDisplayedMessages((prev) => [...prev.slice(0, -1), `🤖 Erreur : ${data.error.message}`]);
        return;
      }

      const reply = data.choices?.[0]?.message?.content?.trim();

      if (!reply) {
        setDisplayedMessages((prev) => [...prev.slice(0, -1), "🤖 Réponse vide ou inattendue de l'IA."]);
        return;
      }

      setDisplayedMessages((prev) => [...prev.slice(0, -1), `🤖 ${reply}`]);
      setChatHistory((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error(err);
      setDisplayedMessages((prev) => [...prev.slice(0, -1), "🤖 Une erreur est survenue."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-lg mx-auto mt-10">
      <h2 className="text-lg font-bold mb-2">💬 ÉléganceBot</h2>
      <div className="h-64 overflow-y-auto border p-2 mb-3 text-sm rounded">
        {displayedMessages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
        {loading && <div>⏳ Réflexion en cours...</div>}
      </div>
      <input
        type="text"
        className="w-full border px-3 py-2 rounded mb-2"
        placeholder="Posez votre question sur les costumes, les matières ou l’entretien..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button
        className="w-full bg-black text-white py-2 rounded"
        onClick={sendMessage}
      >
        Envoyer
      </button>
    </div>
  );
};

export default Chatbot;

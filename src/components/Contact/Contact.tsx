import { useState } from "react";

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="flex flex-col gap-8">
      <div>
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-cyan-400">
          // Contato
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Vamos conversar
        </h2>

        <p className="mt-3 max-w-2xl leading-relaxed text-gray-400">
          Tem uma ideia, projeto ou oportunidade? Entre em contato.
        </p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
          
        }}
        className="flex max-w-3xl flex-col gap-5"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-sm text-gray-300"
            >
              Nome
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Seu nome"
              className="
                rounded-md border border-white/10
                bg-white/[0.02] px-4 py-3
                text-sm text-white outline-none
                placeholder:text-gray-600
                transition-colors
                focus:border-cyan-400/50
              "
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm text-gray-300"
            >
              E-mail
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="seu@email.com"
              className="
                rounded-md border border-white/10
                bg-white/[0.02] px-4 py-3
                text-sm text-white outline-none
                placeholder:text-gray-600
                transition-colors
                focus:border-cyan-400/50
              "
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="subject"
            className="text-sm text-gray-300"
          >
            Assunto
          </label>

          <input
            id="subject"
            name="subject"
            type="text"
            required
            placeholder="Assunto da mensagem"
            className="
              rounded-md border border-white/10
              bg-white/[0.02] px-4 py-3
              text-sm text-white outline-none
              placeholder:text-gray-600
              transition-colors
              focus:border-cyan-400/50
            "
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="message"
            className="text-sm text-gray-300"
          >
            Mensagem
          </label>

          <textarea
            id="message"
            name="message"
            required
            rows={6}
            placeholder="Escreva sua mensagem..."
            className="
              resize-none rounded-md border border-white/10
              bg-white/[0.02] px-4 py-3
              text-sm text-white outline-none
              placeholder:text-gray-600
              transition-colors
              focus:border-cyan-400/50
            "
          />
        </div>

        <button
          type="submit"
          className="
            w-fit rounded-md bg-cyan-400
            px-6 py-3 text-sm font-medium text-black
            transition-colors hover:bg-cyan-300
          "
        >
          Enviar mensagem
        </button>

        {submitted && (
          <p className="font-mono text-sm text-cyan-400">
            Mensagem preparada com sucesso.
          </p>
        )}
      </form>
    </section>
  );
}

export default Contact;
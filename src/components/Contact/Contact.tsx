import { useLanguage } from "../../i18n/useLanguage";
import { useState } from "react";

function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error("Falha ao enviar formulário");
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="flex flex-col gap-8">
      <div>
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent">{t("// Contato")}</p>

        <h2 className="mt-2 text-3xl font-bold">{t("Vamos conversar")}</h2>

        <p className="mt-3 max-w-2xl leading-relaxed text-muted">{t("Tem uma ideia, projeto ou oportunidade? Entre em contato.")}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex max-w-3xl flex-col gap-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm text-secondary">{t("Nome")}</label>

            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder={t("Seu nome")}
              className="
                rounded-md border border-line/10
                bg-card px-4 py-3
                text-sm text-foreground outline-none
                placeholder:text-subtle
                transition-colors
                focus:border-accent/50
              "
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm text-secondary">{t("E-mail")}</label>

            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder={t("seu@email.com")}
              className="
                rounded-md border border-line/10
                bg-card px-4 py-3
                text-sm text-foreground outline-none
                placeholder:text-subtle
                transition-colors
                focus:border-accent/50
              "
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="subject" className="text-sm text-secondary">{t("Assunto")}</label>

          <input
            id="subject"
            name="subject"
            type="text"
            required
            placeholder={t("Assunto da mensagem")}
            className="
              rounded-md border border-line/10
              bg-card px-4 py-3
              text-sm text-foreground outline-none
              placeholder:text-subtle
              transition-colors
              focus:border-accent/50
            "
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm text-secondary">{t("Mensagem")}</label>

          <textarea
            id="message"
            name="message"
            required
            rows={6}
            placeholder={t("Escreva sua mensagem...")}
            className="
              resize-none rounded-md border border-line/10
              bg-card px-4 py-3
              text-sm text-foreground outline-none
              placeholder:text-subtle
              transition-colors
              focus:border-accent/50
            "
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="
            w-fit rounded-md bg-action
            px-6 py-3 text-sm font-medium text-on-action
            transition-colors
            hover:bg-action-hover
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {t(status === "sending" ? "Enviando..." : "Enviar mensagem")}
        </button>

        {status === "success" && (
          <p className="font-mono text-sm text-accent">{t("Mensagem enviada com sucesso.")}</p>
        )}

        {status === "error" && (
          <p className="font-mono text-sm text-error">{t("Não foi possível enviar a mensagem. Tente novamente.")}</p>
        )}
      </form>
    </section>
  );
}

export default Contact;

function Contact() {
  return (
    <section
      id="contact"
      className="flex flex-col gap-6 border-t border-white/10 pt-12"
    >
      <div>
        <p className="mb-2 font-mono text-sm uppercase tracking-[0.2em] text-cyan-400">
          // Contato
        </p>

        <h2 className="text-2xl font-bold">Vamos conversar?</h2>
      </div>
      <p className="max-w-2xl text-gray-400">
        If you would like to get in touch, please feel free to reach out via
        email or connect with me on LinkedIn.
      </p>

      <div className="flex flex-wrap gap-4">
        <a
          href="mailto:jfelippeleite9@gmail.com"
          className="font-medium underline underline-offset-4 transition-colors hover:text-cyan-400"
        >
          Email
        </a>
        <a
          href="https://www.github.com/felippe-leite"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline underline-offset-4 transition-colors hover:text-cyan-400"
        >
          GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/felippeleite27/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline underline-offset-4 transition-colors hover:text-cyan-400"
        >
          LinkedIn
        </a>
      </div>
    </section>
  );
}

export default Contact;

interface HeroProps {
    name: string;
    role: string;
}

function Hero({ name, role }: HeroProps) {
    return (
        <section className="flex flex-col items-center">
            <p>// Olá</p>

            <h1>
                Olá, eu sou
                <br />
                {name}.
            </h1>

            <h2>{role}</h2>

            <p>
                Construindo aplicações robustas, escaláveis e eficientes
                com Java, Spring Boot e boas práticas de engenharia de software.
            </p>
        </section>
    );
}

export default Hero;
import { motion } from "framer-motion";
import { useState } from "react";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import Icon from "../components/Icon";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

export default function ContactSection({ heading, contactLinks }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");

    window.setTimeout(() => {
      setStatus("sent");
      setForm(initialForm);
      window.setTimeout(() => setStatus("idle"), 1800);
    }, 1200);
  }

  return (
    <section id="contact" data-section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={heading.eyebrow}
            title={heading.title}
            description={heading.description}
          />
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="space-y-4">
              {contactLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : "_self"}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="glass group flex items-center gap-4 rounded-[1.7rem] border-white/10 p-5 transition hover:-translate-y-1"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5 text-cyan-200 transition group-hover:bg-cyan-400/10">
                    <Icon name={item.icon} className="h-6 w-6 text-[22px]" alt={item.label} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">{item.label}</p>
                    <p className="mt-1 truncate text-sm font-medium text-white/80">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <motion.div
              whileHover={{ y: -4 }}
              className="glass-strong rounded-[2rem] border-white/10 p-6 sm:p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-white/75">Name</span>
                    <input
                      name="name"
                      value={form.name}
                      onChange={updateField}
                      placeholder="Your name"
                      className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-400/40"
                      required
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-white/75">Email</span>
                    <input
                      name="email"
                      value={form.email}
                      onChange={updateField}
                      placeholder="you@example.com"
                      type="email"
                      className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-400/40"
                      required
                    />
                  </label>
                </div>

                <label className="space-y-2 block">
                  <span className="text-sm font-medium text-white/75">Message</span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={updateField}
                    placeholder="Tell me about your project..."
                    rows="6"
                    className="w-full rounded-3xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-400/40"
                    required
                  />
                </label>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex min-w-44 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-80"
                >
                  {status === "sending" ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[20px]">
                        progress_activity
                      </span>
                      Sending
                    </>
                  ) : status === "sent" ? (
                    <>
                      <span className="material-symbols-outlined text-[20px]">check_circle</span>
                      Sent
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[20px]">send</span>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

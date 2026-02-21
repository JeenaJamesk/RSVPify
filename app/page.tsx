"use client";

import { useState, CSSProperties, FC } from "react";
import Image from "next/image";


const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyUy9qLf_8s5sn-DjxxaV4mc6hetHfVR5v22bP2t3pg8NqUC2fpy8cVuaVzgwhx4q6V_g/exec";


interface FloatingFruitProps {
  emoji: string;
  style: CSSProperties;
  duration: number;
}

interface FruitPosition {
  emoji: string;
  style: CSSProperties;
  duration: number;
}

interface FormState {
  name: string;
  guests: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";


const FloatingFruit: FC<FloatingFruitProps> = ({ emoji, style, duration }) => (
  <div
    className="absolute text-4xl select-none pointer-events-none"
    style={{
      ...style,
      animation: `float ${duration}s ease-in-out infinite alternate`,
    }}
  >
    {emoji}
  </div>
);


const BirthdayInvitation: FC = () => {
  const [form, setForm]     = useState<FormState>({ name: "", guests: "" });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSubmit = async (): Promise<void> => {
    if (!form.name.trim() || !form.guests) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ name: form.name.trim(), guests: form.guests }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = await res.json();
      if (json.success === false) throw new Error(json.error || "Unknown error");

      setStatus("success");
    } catch (err) {
      console.error("RSVP submission error:", err);
      setErrorMsg("Couldn't save your RSVP. Please try again.");
      setStatus("error");
    }
  };

  const handleReset = (): void => {
    setForm({ name: "", guests: "" });
    setStatus("idle");
    setErrorMsg("");
  };

  const floatingFruits: FruitPosition[] = [
    { emoji: "🥝", duration: 3.2, style: { top: "5%",     left:  "3%"  } },
    { emoji: "🍊", duration: 4.1, style: { top: "5%",     right: "18%" } },
    { emoji: "🍓", duration: 3.7, style: { top: "8%",     right: "4%"  } },
    { emoji: "🍇", duration: 4.5, style: { top: "18%",    left:  "2%"  } },
    { emoji: "🍍", duration: 3.4, style: { top: "35%",    left:  "2%"  } },
    { emoji: "🍌", duration: 4.8, style: { top: "18%",    right: "2%"  } },
    { emoji: "🍓", duration: 3.9, style: { top: "42%",    right: "2%"  } },
    { emoji: "🍉", duration: 4.3, style: { bottom: "28%", left:  "4%"  } },
    { emoji: "🌸", duration: 3.6, style: { bottom: "24%", left:  "0%"  } },
    { emoji: "🍐", duration: 4.7, style: { bottom: "22%", right: "4%"  } },
    { emoji: "🍊", duration: 3.3, style: { bottom: "20%", right: "14%" } },
    { emoji: "🍓", duration: 4.0, style: { bottom: "21%", right: "2%"  } },
    { emoji: "🍇", duration: 3.8, style: { bottom: "20%", left:  "30%" } },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800;900&display=swap');

        @keyframes float {
          from { transform: translateY(0px) rotate(-3deg); }
          to   { transform: translateY(-14px) rotate(3deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(230,57,70,0.4), 0 0 40px rgba(255,165,0,0.3); }
          50%       { box-shadow: 0 0 35px rgba(230,57,70,0.7), 0 0 60px rgba(255,165,0,0.5); }
        }
        @keyframes shimmer {
          0%   { background-position: 0%   50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes bounce-in {
          0%   { transform: scale(0.5); opacity: 0; }
          70%  { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .banner-shimmer {
          background: linear-gradient(90deg, #e63946, #ff6b35, #e63946);
          background-size: 200%;
          animation: shimmer 3s linear infinite;
        }
        .watermelon-ring {
          background: conic-gradient(
            #e63946 0deg,   #e63946 30deg,
            #1a1a1a 30deg,  #1a1a1a 40deg,
            #e63946 40deg,  #e63946 70deg,
            #1a1a1a 70deg,  #1a1a1a 80deg,
            #e63946 80deg,  #e63946 110deg,
            #1a1a1a 110deg, #1a1a1a 120deg,
            #e63946 120deg, #e63946 150deg,
            #1a1a1a 150deg, #1a1a1a 160deg,
            #e63946 160deg, #e63946 190deg,
            #1a1a1a 190deg, #1a1a1a 200deg,
            #e63946 200deg, #e63946 230deg,
            #1a1a1a 230deg, #1a1a1a 240deg,
            #e63946 240deg, #e63946 270deg,
            #1a1a1a 270deg, #1a1a1a 280deg,
            #e63946 280deg, #e63946 310deg,
            #1a1a1a 310deg, #1a1a1a 320deg,
            #e63946 320deg, #e63946 350deg,
            #1a1a1a 350deg, #1a1a1a 360deg
          );
        }
        .submit-btn { animation: pulse-glow 2s ease-in-out infinite; }
        .success-card { animation: bounce-in 0.4s cubic-bezier(0.175,0.885,0.32,1.275); }
        .spinner {
          width: 20px; height: 20px;
          border: 3px solid rgba(255,255,255,0.4);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }
      `}</style>

      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          background: "linear-gradient(180deg, #87ceeb 0%, #b8f0b8 50%, #6dbe6d 100%)",
        }}
      >
        <div
          className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background: "linear-gradient(180deg, #c8f5ff 0%, #e8ffe8 40%, #b8f0b0 100%)",
          }}
        >
          {floatingFruits.map((f, i) => (
            <FloatingFruit key={i} emoji={f.emoji} style={f.style} duration={f.duration} />
          ))}

          <div className="relative z-10 flex flex-col items-center pt-8 px-6 pb-8">

            {/* ── Header ── */}
            <p
              className="text-lg font-bold text-green-800 mb-1"
              style={{ fontFamily: "'Fredoka One', cursive" }}
            >
              Join Us For a
            </p>

            <div className="text-center mb-1">
              <span
                className="block leading-none"
                style={{
                  fontFamily: "'Fredoka One', cursive",
                  fontSize: "3.5rem",
                  color: "#ffd700",
                  WebkitTextStroke: "2px #e69500",
                  textShadow: "3px 3px 0 #c47900",
                } as CSSProperties}
              >
                Sweet
              </span>
              <span
                className="block leading-none"
                style={{
                  fontFamily: "'Fredoka One', cursive",
                  fontSize: "3.8rem",
                  color: "#e63946",
                  WebkitTextStroke: "2px #9b0000",
                  textShadow: "3px 3px 0 #7a0000",
                } as CSSProperties}
              >
                One!
              </span>
            </div>

            <div className="banner-shimmer rounded-full px-8 py-2 mb-4 shadow-lg">
              <p
                className="text-white font-extrabold text-sm tracking-widest text-center"
                style={{ fontFamily: "'Fredoka One', cursive" }}
              >
                ALANIS'S 1ST BIRTHDAY PARTY!
              </p>
            </div>

            <div className="relative mb-4" style={{ width: 210, height: 210 }}>
              <div className="absolute inset-0 rounded-full watermelon-ring" />
              <div className="absolute rounded-full bg-white" style={{ inset: 10 }} />
              <div className="absolute rounded-full" style={{ inset: 14, background: "#52b788" }} />
              <div className="absolute rounded-full overflow-hidden" style={{ inset: 22 }}>
                <Image
                  src="/birthday.png"
                  alt="Alanis"
                  fill
                  className="object-cover object-top"
                  style={{ transform: "scale(1.8) translateY(15%)" }}
                  priority
                />
              </div>
            </div>

            <div className="flex gap-2 text-3xl mb-4">
              {(["🍉", "🍇", "🍊", "🍓"] as const).map((f, i) => (
                <span
                  key={i}
                  style={{
                    animationDelay: `${i * 0.3}s`,
                    animation: "float 2s ease-in-out infinite alternate",
                  }}
                >
                  {f}
                </span>
              ))}
            </div>

            <div
              className="w-full rounded-2xl px-4 py-3 mb-4 text-center shadow"
              style={{ background: "rgba(255,255,255,0.75)", border: "2px dashed #b7e4c7" }}
            >
              <p
                className="text-base font-extrabold text-green-800 mb-1"
                style={{ fontFamily: "'Fredoka One', cursive" }}
              >
                🗓️ Sunday, 5th April 2026
              </p>
              <p
                className="text-base font-extrabold text-green-700 mb-1"
                style={{ fontFamily: "'Fredoka One', cursive" }}
              >
                🕦 11:30 AM
              </p>
              <p
                className="text-sm font-bold text-gray-700 leading-snug"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                📍 New Bradwell Community Centre
              </p>
              <p
                className="text-sm font-semibold text-gray-500"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Milton Keynes MK13 0DA
              </p>
            </div>

            {/* ── RSVP Card ── */}
            <div
              className="w-full rounded-3xl p-5 shadow-inner"
              style={{ background: "rgba(255,255,255,0.88)", border: "2px dashed #b7e4c7" }}
            >
              {status === "success" ? (
                /* ── Success state ── */
                <div className="text-center py-4 success-card">
                  <div className="text-5xl mb-3 animate-bounce">🎉</div>
                  <h3
                    className="text-2xl font-extrabold mb-2"
                    style={{ color: "#e63946", fontFamily: "'Fredoka One', cursive" }}
                  >
                    You're on the list!
                  </h3>
                  <p
                    className="text-green-700 font-semibold text-base mb-1"
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                  >
                    {form.name} &middot; {form.guests} guest
                    {Number(form.guests) > 1 ? "s" : ""} 🍓
                  </p>
                  <p
                    className="text-gray-500 text-sm mb-4"
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                  >
                    🍍 "You're one in a pineapple — see you there!"
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-6 py-2 rounded-full font-bold text-white shadow"
                    style={{
                      background: "linear-gradient(135deg, #2d6a4f, #52b788)",
                      fontFamily: "'Fredoka One', cursive",
                    }}
                  >
                    Add another RSVP
                  </button>
                </div>
              ) : (
                <>
                  <h2
                    className="text-2xl font-extrabold text-center mb-4"
                    style={{ color: "#e63946", fontFamily: "'Fredoka One', cursive" }}
                  >
                    🍎 RSVP Here!
                  </h2>

                  <div className="space-y-4">
                    {/* Name */}
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🍎</span>
                      <div className="flex-1">
                        <label
                          className="block font-bold text-gray-700 text-sm mb-1"
                          style={{ fontFamily: "'Nunito', sans-serif" }}
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Name"
                          value={form.name}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setForm((prev) => ({ ...prev, name: e.target.value }))
                          }
                          disabled={status === "loading"}
                          className="w-full border-2 border-green-200 rounded-xl px-3 py-2 text-gray-700 focus:outline-none focus:border-green-400 text-base bg-white disabled:opacity-50"
                          style={{ fontFamily: "'Nunito', sans-serif" }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🍋</span>
                      <div className="flex-1">
                        <label
                          className="block font-bold text-gray-700 text-sm mb-1"
                          style={{ fontFamily: "'Nunito', sans-serif" }}
                        >
                          Number Attending
                        </label>
                        <input
                          type="number"
                          placeholder="Number of Guests"
                          min="1"
                          value={form.guests}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setForm((prev) => ({ ...prev, guests: e.target.value }))
                          }
                          disabled={status === "loading"}
                          className="w-full border-2 border-green-200 rounded-xl px-3 py-2 text-gray-700 focus:outline-none focus:border-green-400 text-base bg-white disabled:opacity-50"
                          style={{ fontFamily: "'Nunito', sans-serif" }}
                        />
                      </div>
                    </div>

                    {status === "error" && (
                      <p
                        className="text-red-500 text-sm text-center font-semibold"
                        style={{ fontFamily: "'Nunito', sans-serif" }}
                      >
                        ⚠️ {errorMsg}
                      </p>
                    )}

                    <button
                      onClick={handleSubmit}
                      disabled={status === "loading"}
                      className="submit-btn w-full py-3 rounded-2xl font-extrabold text-white text-lg shadow-lg transition-transform active:scale-95 hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      style={{
                        background: "linear-gradient(135deg, #2d6a4f, #52b788)",
                        fontFamily: "'Fredoka One', cursive",
                      }}
                    >
                      {status === "loading" ? (
                        <>
                          <span className="spinner" />
                          Saving…
                        </>
                      ) : (
                        "Submit 🎉"
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BirthdayInvitation;